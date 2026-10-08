// Test für sync/nachbereitung.mjs (Legal Weappon, 08.10.2026):  node sync/test-nachbereitung.mjs [docs/data/tenders.json]
// Prüft Kürzung (300, Wortgrenze, „…“), Kontakt-Muster, 30-Tage-Regel, Portal-Abschaltung und – auf einer KOPIE der
// echten tenders.json + ki-embeddings.json – die Zahlen vorher/nachher mit leerer und mit der echten portale-aus.json.
// Schreibt nur in ein temporäres Verzeichnis.
import assert from 'node:assert/strict';
import { mkdtempSync, copyFileSync, readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  kuerzeBeschreibung, kontaktTeilAbschneiden, tageSeitFrist, portalAbgeschaltet, portaleAusLaden,
  tendersBereinigen, nachbereiten, BESCHREIBUNG_MAX, FRIST_LOESCHEN_TAGE, istTed,
} from './nachbereitung.mjs';

const hier = dirname(fileURLToPath(import.meta.url));
let ok = 0;
const fall = (name, fn) => { fn(); ok++; console.log(`  ✓ ${name}`); };
const len = (s) => Array.from(s || '').length;

console.log('Kürzung');
fall('kurz bleibt unverändert', () => assert.equal(kuerzeBeschreibung('Kurzer Text'), 'Kurzer Text'));
fall('genau 300 bleibt', () => { const s = 'a'.repeat(300); assert.equal(kuerzeBeschreibung(s), s); });
fall('lang → ≤ 300 inkl. „…“, an Wortgrenze', () => {
  const s = ('Wort ' .repeat(100)).trim();
  const k = kuerzeBeschreibung(s);
  assert.ok(len(k) <= BESCHREIBUNG_MAX, `Länge ${len(k)}`);
  assert.ok(k.endsWith('Wort…'), k.slice(-10));
});
fall('Unicode-sicher (Emoji/Umlaute zählen als 1 Zeichen, nichts zerbrochen)', () => {
  const s = 'ä😀 '.repeat(150);
  const k = kuerzeBeschreibung(s);
  assert.ok(len(k) <= 300);
  assert.ok(!/[\uD800-\uDBFF](?![\uDC00-\uDFFF])/.test(k), 'halbes Surrogat');
});
fall('ohne Wortgrenze → harter Schnitt bei 299 + „…“', () => assert.equal(len(kuerzeBeschreibung('x'.repeat(500))), 300));

console.log('Kontakt-Muster (TED)');
const treffer = [
  ['Lieferung Beamer\nAnsprechpartner: Max Muster, Raum 3', 'Lieferung Beamer…'],
  ['Lieferung Beamer. Ansprechpartnerin Erika Muster', 'Lieferung Beamer…'],
  ['Medientechnik Aula\nKontakt: Vergabestelle, Erika Muster', 'Medientechnik Aula…'],
  ['Medientechnik Aula – Kontaktdaten siehe unten: E. Muster', 'Medientechnik Aula…'],
  ['Medientechnik Aula, KONTAKTPERSON Erika Muster', 'Medientechnik Aula…'],
  ['Bitte kontaktieren Sie uns', 'Bitte…'],
  ['Angebote z. Hd. Herrn Muster', 'Angebote…'],
  ['Angebote z.Hd. Vergabestelle', 'Angebote…'],
  ['Angebote zu Händen der Vergabestelle', 'Angebote…'],
  ['Rückfragen an Herrn Muster', 'Rückfragen an…'],
  ['Rückfragen an Herr Muster', 'Rückfragen an…'],
  ['Rückfragen an Frau Muster', 'Rückfragen an…'],
  ['Kontakt: alles weg', ''],
];
for (const [ein, aus] of treffer) fall(`„${ein.replace(/\n/g, '⏎')}“ → „${aus}“`, () => assert.equal(kontaktTeilAbschneiden(ein), aus));
const keineTreffer = [
  'Lieferung von Kontaktlinsen für die Augenklinik',
  'Kontaktgrill und Küchentechnik',
  'Bauherr ist die Stadt; Bauherrin Gemeinde',
  'Sanierung Frauenhaus und Herrenberg-Schule',
  'Herrentoilette, Damen-WC',
  'Unkontaktierte Kabel',
  'Ohne Muster im Text',
];
for (const s of keineTreffer) fall(`kein Treffer: „${s}“`, () => assert.equal(kontaktTeilAbschneiden(s), s));
fall('erst abschneiden, dann kürzen (Muster nach Zeichen 300 wird auch entfernt)', () => {
  const d = { tenders: [{ id: 't1', sourceId: 'ted', source: 'ted.europa.eu', description: 'Lang '.repeat(80) + 'Kontakt: Erika Muster' }] };
  tendersBereinigen(d, { aus: { ids: new Set(), hosts: [], eintraege: [] } });
  assert.ok(!/Muster|Kontakt/.test(d.tenders[0].description));
  assert.ok(len(d.tenders[0].description) <= 300);
});

console.log(`${FRIST_LOESCHEN_TAGE}-Tage-Regel`);
const jetzt = Date.parse('2026-10-08T12:00:00');
const tag = (offset) => new Date(jetzt + offset * 864e5).toISOString().slice(0, 10);
fall('tageSeitFrist: ohne Frist → null', () => assert.equal(tageSeitFrist({}, jetzt), null));
fall('Frist läuft noch → negativ', () => assert.ok(tageSeitFrist({ deadline: tag(+3) }, jetzt) < 0));
fall('submissionDeadline hat Vorrang vor deadline', () => assert.ok(tageSeitFrist({ submissionDeadline: tag(-40), deadline: tag(+3) }, jetzt) > 30));
fall('29 Tage abgelaufen bleibt, 31 Tage wird gelöscht, ohne Frist bleibt', () => {
  const d = { tenders: [
    { id: 'a', sourceId: 'ted', submissionDeadline: tag(-29) },
    { id: 'b', sourceId: 'ted', submissionDeadline: tag(-31) },
    { id: 'c', sourceId: 'ted', deadline: tag(-45) },
    { id: 'd', sourceId: 'ted' },
    { id: 'e', sourceId: 'ted', submissionDeadline: tag(+10) },
  ] };
  tendersBereinigen(d, { jetzt, aus: { ids: new Set(), hosts: [], eintraege: [] } });
  assert.deepEqual(d.tenders.map((t) => t.id), ['a', 'd', 'e']);
  assert.equal(d.nachbereitung.entferntFrist, 2);
});

console.log('Portal-Abschaltung');
const aus = portaleAusLaden(join(hier, 'portale-aus.json'));
fall('portale-aus.json: Köln, Frankfurt, Berlin aus', () => assert.deepEqual([...aus.ids].sort(), ['vergabe-berlin', 'vergabe-frankfurt', 'vergabe-koeln']));
fall('Treffer per sourceId', () => assert.ok(portalAbgeschaltet({ sourceId: 'vergabe-koeln' }, aus)));
fall('Treffer per Host (source/sourceUrl, auch Subdomain)', () => {
  assert.ok(portalAbgeschaltet({ sourceId: 'x', source: 'vergabe.stadt-frankfurt.de' }, aus));
  assert.ok(portalAbgeschaltet({ sourceId: 'x', sourceUrl: 'https://www.vergabekooperation.berlin/NetServer/x' }, aus));
});
fall('andere Portale nicht betroffen', () => {
  assert.ok(!portalAbgeschaltet({ sourceId: 'ted', source: 'ted.europa.eu' }, aus));
  assert.ok(!portalAbgeschaltet({ sourceId: 'vergabe-bw', source: 'vergabe.landbw.de' }, aus));
  assert.ok(!portalAbgeschaltet({ sourceId: 'vergabe-x', source: 'berlin.de' }, aus));
});

// ---- echte Daten (Kopie) ----
const quelle = resolve(process.argv[2] || join(hier, '..', 'docs/data/tenders.json'));
if (!existsSync(quelle)) { console.log(`\n${ok} Tests ok (keine echten Daten unter ${quelle})`); process.exit(0); }
const embQuelle = join(dirname(quelle), 'ki-embeddings.json');
const zaehlen = (d) => {
  const proQuelle = {};
  for (const t of d.tenders) proQuelle[t.sourceId] = (proQuelle[t.sourceId] || 0) + 1;
  const mitDesc = d.tenders.filter((t) => typeof t.description === 'string' && t.description.trim());
  return {
    gesamt: d.tenders.length,
    koeln: proQuelle['vergabe-koeln'] || 0, frankfurt: proQuelle['vergabe-frankfurt'] || 0, berlin: proQuelle['vergabe-berlin'] || 0,
    mitBeschreibung: mitDesc.length,
    mitBeschreibungNichtTed: mitDesc.filter((t) => !istTed(t)).length,
    ueber300: mitDesc.filter((t) => len(t.description) > 300).length,
    maxLaenge: Math.max(0, ...mitDesc.map((t) => len(t.description))),
    mitKontaktMuster: mitDesc.filter((t) => kontaktTeilAbschneiden(t.description.replace(/…$/, '')) !== t.description.replace(/…$/, '')).length,
  };
};
const original = JSON.parse(readFileSync(quelle, 'utf8'));
const vorher = zaehlen(original);
const jetztEcht = Date.now();
const abgelaufen30 = original.tenders.filter((t) => { const x = tageSeitFrist(t, jetztEcht); return x != null && x > FRIST_LOESCHEN_TAGE; }).length;
console.log(`\nEchte Daten (Kopie von ${quelle})\n  vorher: ${JSON.stringify(vorher)}  (Frist > ${FRIST_LOESCHEN_TAGE} Tage abgelaufen: ${abgelaufen30})`);

const lauf = (name, ausJson) => {
  const dir = mkdtempSync(join(tmpdir(), 'nachbereitung-'));
  try {
    copyFileSync(quelle, join(dir, 'tenders.json'));
    if (existsSync(embQuelle)) copyFileSync(embQuelle, join(dir, 'ki-embeddings.json'));
    writeFileSync(join(dir, 'portale-aus.json'), JSON.stringify(ausJson));
    process.env.NEXUS_PORTALE_AUS = join(dir, 'portale-aus.json');
    delete process.env.GITHUB_ACTIONS;
    nachbereiten(join(dir, 'tenders.json'));
    const d = JSON.parse(readFileSync(join(dir, 'tenders.json'), 'utf8'));
    const z = zaehlen(d);
    const emb = existsSync(join(dir, 'ki-embeddings.json')) ? Object.keys(JSON.parse(readFileSync(join(dir, 'ki-embeddings.json'), 'utf8')).items || {}).length : null;
    console.log(`  ${name}: ${JSON.stringify(z)} embeddings=${emb}`);
    return { d, z, emb };
  } finally {
    delete process.env.NEXUS_PORTALE_AUS;
    rmSync(dir, { recursive: true, force: true });
  }
};

const leer = lauf('(a) leere Liste', { aus: [] });
const tedVorher = original.tenders.filter(istTed).length;
fall(`(a) Anzahl = vorher − Frist>30 (${vorher.gesamt - abgelaufen30})`, () => assert.equal(leer.z.gesamt, vorher.gesamt - abgelaufen30));
fall('(a) nur TED hat Beschreibung', () => assert.equal(leer.z.mitBeschreibungNichtTed, 0));
fall('(a) max. Beschreibung ≤ 300 (inkl. „…“)', () => assert.ok(leer.z.maxLaenge <= 300, String(leer.z.maxLaenge)));
fall('(a) kein Kontakt-Muster mehr in Beschreibungen', () => assert.equal(leer.z.mitKontaktMuster, 0));
fall('(a) TED-Einträge alle noch da', () => assert.equal(leer.d.tenders.filter(istTed).length, tedVorher - original.tenders.filter((t) => istTed(t) && tageSeitFrist(t, jetztEcht) > FRIST_LOESCHEN_TAGE).length));

const echt = lauf('(b) Köln/Frankfurt/Berlin aus', JSON.parse(readFileSync(join(hier, 'portale-aus.json'), 'utf8')));
const kfb = vorher.koeln + vorher.frankfurt + vorher.berlin;
const kfbAbgelaufen = original.tenders.filter((t) => portalAbgeschaltet(t, aus) && tageSeitFrist(t, jetztEcht) > FRIST_LOESCHEN_TAGE).length;
fall(`(b) Anzahl = ${vorher.gesamt} − ${kfb} (K/F/B) − ${abgelaufen30 - kfbAbgelaufen} (Frist) = ${vorher.gesamt - kfb - (abgelaufen30 - kfbAbgelaufen)}`, () => assert.equal(echt.z.gesamt, vorher.gesamt - kfb - (abgelaufen30 - kfbAbgelaufen)));
fall('(b) Köln/Frankfurt/Berlin = 0', () => assert.deepEqual([echt.z.koeln, echt.z.frankfurt, echt.z.berlin], [0, 0, 0]));
fall('(b) nur TED mit Beschreibung, ≤ 300', () => { assert.equal(echt.z.mitBeschreibungNichtTed, 0); assert.ok(echt.z.maxLaenge <= 300); });
fall('(b) Adapter K/F/B als abgeschaltet markiert', () => {
  for (const id of aus.ids) { const a = echt.d.adapters?.find((x) => x.id === id); if (a) assert.ok(a.abgeschaltet && !a.live && a.count === 0, id); }
});
if (echt.emb != null) fall('(b) KI-Embeddings nur noch für vorhandene Einträge', () => assert.equal(echt.emb, echt.z.gesamt));
fall('(b) zweiter Lauf ändert nichts mehr (idempotent)', () => {
  const d2 = JSON.parse(JSON.stringify(echt.d));
  const vorherJson = JSON.stringify(d2.tenders);
  tendersBereinigen(d2, { aus });
  assert.equal(JSON.stringify(d2.tenders), vorherJson);
});
console.log(`\n${ok} Tests ok`);
