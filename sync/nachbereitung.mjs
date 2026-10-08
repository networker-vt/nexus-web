// Nachbereitung nach jedem Portal-Abruf (und einzeln aufrufbar: node sync/nachbereitung.mjs docs/data/tenders.json).
// Rechtliche Vorgaben (Legal Weappon, 8.10.2026):
//  - öffentlich nur Kerndaten + Links; keine Texte/Dateien aus Vergabeunterlagen, keine Datenblatt-Kopien
//  - E-Mail-Adressen und Telefonnummern aus Beschreibungstexten entfernen
//  - TED: Quellenangabe „Quelle: TED, © Europäische Union“
// Ergänzt (Legal Weappon, verbindlich 08.10.2026, gilt für GitHub Pages UND rentalmania.de):
//  - Portale aus sync/portale-aus.json (Köln, Frankfurt, Berlin) komplett raus – auch Altbestand und KI-Embeddings
//  - Beschreibung NUR bei TED: Kontakt-Teil ab „Ansprechpartner“, „Kontakt“, „z. Hd.“, „Herr(n) “, „Frau “ abschneiden,
//    dann auf 300 Zeichen kürzen (Wortgrenze, „…“). Nationale Portale: description leer (nur Fakten + Portal-Link)
//  - Einträge 30 Tage nach Ablauf der Frist (submissionDeadline bzw. deadline) löschen
import { readFileSync, writeFileSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export const TED_QUELLE = 'Quelle: TED, © Europäische Union';
const VERBOTENE_ORDNER = ['docs', 'datenblaetter', 'unterlagen', 'volltexte'];
const DOCS_ERLAUBT = ['status', 'reason', 'portalUrl', 'fetchedAt'];
const TEXTFELDER = ['title', 'description', 'leistungsgegenstand', 'notes', 'contractingAuthority', 'city'];
export const FRIST_LOESCHEN_TAGE = 30;
const PORTALE_AUS_DATEI = fileURLToPath(new URL('./portale-aus.json', import.meta.url));

const EMAIL = /[A-Za-z0-9._%+-]+\s?(?:@|\(at\)|\[at\])\s?[A-Za-z0-9.-]+\.[A-Za-z]{2,}/gi;
// Telefon/Fax mit Kennwort davor, oder internationale Schreibweise (+49 / 0049), oder (0xxx) xxxx
const TEL_KENNWORT = /\b(?:Tel(?:efon)?|Fon|Phone|Fax|Telefax|Mobil|Handy|Rufnummer)\b\.?\s*(?:Nr\.?)?\s*:?\s*\+?[\d][\d\s()\/.-]{5,}\d/gi;
const TEL_INTL = /(?:\+49|(?<![\w-])0049)[\s()\/.-]*\d[\d\s()\/.-]{5,}\d/g;
const TEL_KLAMMER = /\(0\d{2,5}\)\s*[\d][\d\s\/.-]{3,}\d/g;

export function kontakteEntfernen(s) {
  if (typeof s !== 'string' || !s) return s;
  return s
    .replace(EMAIL, '[Kontakt entfernt]')
    .replace(TEL_KENNWORT, '[Kontakt entfernt]')
    .replace(TEL_INTL, '[Kontakt entfernt]')
    .replace(TEL_KLAMMER, '[Kontakt entfernt]');
}

/*
 * Beschreibung kürzen – 1:1 aus dem Hub übernommen (src/web/sync/kerndaten.ts › kuerzeBeschreibung/ENDE_RE, Stand 08.10.2026, gleiche Regel wie
 * marktdaten-kern.php › kuerze_beschreibung): höchstens 300 Unicode-Zeichen (Codepoints) INKL. „…“, an der letzten
 * Wortgrenze (Leerzeichen/Tab/Zeilenumbruch) im letzten 40-%-Fenster, Satzzeichen am Ende weg, Zeilenumbrüche davor bleiben.
 */
export const BESCHREIBUNG_MAX = 300;
const WORTGRENZE = new Set([' ', '\t', '\n', '\r']);
const ENDE_RE = /[ \t\n\r,;:.\-–…]+$/u;

export function kuerzeBeschreibung(text, max = BESCHREIBUNG_MAX) {
  if (typeof text !== 'string') return text;
  const cp = Array.from(text);
  if (cp.length <= max) return text;
  let n = max - 1;
  for (let i = max - 1; i > Math.floor(max * 0.6); i--)
    if (WORTGRENZE.has(cp[i])) {
      n = i;
      break;
    }
  return cp.slice(0, n).join('').replace(ENDE_RE, '') + '…';
}

// Ab dem ersten Kontakt-Muster abschneiden (Legal 08.10.2026). Wortgrenze VOR dem Muster (Unicode: kein Buchstabe/Ziffer
// davor → „Bauherr “ zählt nicht). „Kontakt“ nur als eigenes Wort oder in Kontakt-Zusammensetzungen (Kontaktdaten,
// Kontaktperson, Kontaktstelle, Kontaktieren …) – nicht „Kontaktlinsen“, „Kontaktgrill“. „Herr“/„Herrn“/„Frau“ nur mit
// Leerraum danach (nicht „Frauenhaus“, „Herrenberg“).
export const KONTAKT_AB = /(?<![\p{L}\p{N}])(?:Ansprechpartner(?:in|innen)?|Ansprechperson(?:en)?|Kontakt(?:e|en|person|personen|stelle|stellen|daten|angaben|adresse|ieren)?(?![\p{L}])|z\.\s?Hd\.?|zu\s+Händen|Herrn?\s|Frau\s)/iu;

export function kontaktTeilAbschneiden(text) {
  if (typeof text !== 'string' || !text) return text;
  const m = KONTAKT_AB.exec(text);
  if (!m) return text;
  const kopf = text.slice(0, m.index).replace(ENDE_RE, '');
  return kopf ? kopf + '…' : '';
}

export const istTed = (t) => t?.sourceId === 'ted' || /ted\.europa\.eu/i.test(t?.source || '');

const hostVon = (u) => {
  if (typeof u !== 'string' || !u) return '';
  try { return new URL(/^[a-z]+:\/\//i.test(u) ? u : 'https://' + u).hostname.toLowerCase(); } catch { return ''; }
};

/** sync/portale-aus.json lesen → { ids:Set, hosts:string[], eintraege:[] }. Fehlt die Datei: nichts abgeschaltet. */
export function portaleAusLaden(datei = process.env.NEXUS_PORTALE_AUS || PORTALE_AUS_DATEI) {
  if (!existsSync(datei)) return { ids: new Set(), hosts: [], eintraege: [] };
  const j = JSON.parse(readFileSync(datei, 'utf8'));
  const eintraege = (j.aus || []).map((e) => (typeof e === 'string' ? { id: e } : e)).filter((e) => e && (e.id || e.host));
  return {
    ids: new Set(eintraege.map((e) => String(e.id || '').trim()).filter(Boolean)),
    hosts: eintraege.map((e) => String(e.host || '').toLowerCase().replace(/^\.+/, '')).filter(Boolean),
    eintraege,
  };
}

export function portalAbgeschaltet(t, aus) {
  if (!aus || (!aus.ids.size && !aus.hosts.length)) return false;
  if (aus.ids.has(t?.sourceId)) return true;
  for (const h of [hostVon(t?.source), hostVon(t?.sourceUrl)]) {
    if (h && aus.hosts.some((a) => h === a || h.endsWith('.' + a))) return true;
  }
  return false;
}

/** Tage seit Fristende (negativ = Frist läuft noch, null = keine Frist). Datum ohne Uhrzeit = Ende des Tages (wie im Abruf). */
export function tageSeitFrist(t, jetzt = Date.now()) {
  const f = String(t?.submissionDeadline || t?.deadline || '').trim();
  if (!f) return null;
  const x = new Date(f.length === 10 ? `${f}T23:59:59` : f).getTime();
  return Number.isNaN(x) ? null : (jetzt - x) / 864e5;
}

function docsBereinigen(d) {
  if (!d || typeof d !== 'object') return d;
  const out = {};
  for (const k of DOCS_ERLAUBT) if (d[k] !== undefined) out[k] = d[k];
  if (out.status === 'auto') {
    out.status = 'portal';
    out.reason = 'Unterlagen frei im Portal – bitte dort herunterladen und hier importieren.';
  }
  return out;
}

export function tendersBereinigen(data, { jetzt = Date.now(), aus = portaleAusLaden() } = {}) {
  if (!data || !Array.isArray(data.tenders)) return data;
  const summary = {};
  const vorher = data.tenders.length;
  let entferntPortale = 0;
  let entferntFrist = 0;
  data.tenders = data.tenders.filter((t) => {
    if (portalAbgeschaltet(t, aus)) { entferntPortale++; return false; }
    const tage = tageSeitFrist(t, jetzt);
    if (tage != null && tage > FRIST_LOESCHEN_TAGE) { entferntFrist++; return false; }
    return true;
  });
  for (const t of data.tenders) {
    for (const k of TEXTFELDER) if (typeof t[k] === 'string') t[k] = kontakteEntfernen(t[k]);
    if (istTed(t)) {
      // erst Kontakt-Teil abschneiden, dann kürzen (Limit bleibt sicher eingehalten)
      if (typeof t.description === 'string') {
        const kurz = kuerzeBeschreibung(kontaktTeilAbschneiden(t.description));
        if (kurz !== t.description) { t.description = kurz; t.descriptionGekuerzt = true; }
      }
    } else {
      // nationale Portale: keine Beschreibung, nur Fakten + Portal-Link (Feld bleibt als leerer Text, die App erwartet string)
      t.description = '';
      delete t.descriptionGekuerzt;
    }
    if (t.docs) t.docs = docsBereinigen(t.docs);
    if (t.docs?.status) summary[t.docs.status] = (summary[t.docs.status] || 0) + 1;
    if (istTed(t)) t.quellenhinweis = TED_QUELLE;
  }
  if (Array.isArray(data.adapters) && aus.eintraege.length) {
    data.adapters = data.adapters.map((a) => {
      if (!aus.ids.has(a.id) && !aus.hosts.some((h) => hostVon(a.sourceLabel) === h || hostVon(a.sourceLabel).endsWith('.' + h))) return a;
      return {
        ...a, status: 'stub', live: false, ok: false, fetched: 0, count: 0, fetchedAt: null, warnings: [],
        keywordHits: 0, keywordPass: '', abgeschaltet: true,
        description: `Verknüpfung / Link: ${a.sourceLabel || a.name}. Kein automatischer Abruf (Nutzungsbedingungen des Portals) – bitte im Portal selbst suchen.`,
        error: 'Abgeschaltet – kein automatischer Abruf (Nutzungsbedingungen des Portals). Bitte im Portal selbst suchen.',
      };
    });
    data.liveAdapters = data.adapters.filter((a) => a.live).length;
    data.liveAdaptersOk = data.adapters.filter((a) => a.live && a.ok).length;
  }
  if (data.docsSummary) data.docsSummary = summary;
  data.quellenhinweise = { ted: TED_QUELLE };
  data.nachbereitung = {
    portaleAus: [...aus.ids],
    entferntPortale,
    entferntFrist,
    fristLoeschenTage: FRIST_LOESCHEN_TAGE,
    beschreibung: `nur TED, höchstens ${BESCHREIBUNG_MAX} Zeichen, ohne Kontakt-Teil`,
  };
  if (entferntPortale || entferntFrist) console.log(`Nachbereitung: ${vorher} → ${data.tenders.length} Einträge (abgeschaltete Portale −${entferntPortale}, Frist > ${FRIST_LOESCHEN_TAGE} Tage −${entferntFrist})`);
  return data;
}

/** KI-Embeddings nur für Einträge, die in tenders.json stehen (abgeschaltete Portale / alte Fristen raus). */
export function embeddingsAbgleichen(emb, ids) {
  if (!emb || typeof emb.items !== 'object' || !emb.items) return emb;
  for (const k of Object.keys(emb.items)) if (!ids.has(k)) delete emb.items[k];
  return emb;
}

function datenblattVerweiseEntfernen(o) {
  if (Array.isArray(o)) { o.forEach(datenblattVerweiseEntfernen); return o; }
  if (o && typeof o === 'object') {
    delete o.datenblattDatei;
    for (const v of Object.values(o)) datenblattVerweiseEntfernen(v);
  }
  return o;
}

function jsonUmschreiben(file, fn) {
  if (!existsSync(file)) return;
  const raw = readFileSync(file, 'utf8');
  const neu = JSON.stringify(fn(JSON.parse(raw)));
  if (neu !== JSON.stringify(JSON.parse(raw))) writeFileSync(file, neu);
}

export function nachbereiten(tendersFile) {
  const dataDir = dirname(resolve(tendersFile));
  let ids = null;
  jsonUmschreiben(tendersFile, (d) => {
    const r = tendersBereinigen(d);
    if (Array.isArray(r?.tenders)) ids = new Set(r.tenders.map((t) => t.id));
    return r;
  });
  if (ids) jsonUmschreiben(join(dataDir, 'ki-embeddings.json'), (e) => embeddingsAbgleichen(e, ids));
  jsonUmschreiben(join(dataDir, 'produktbibliothek.json'), datenblattVerweiseEntfernen);
  const pr = join(dataDir, 'produktrecherche');
  if (existsSync(pr)) for (const f of readdirSync(pr)) if (f.endsWith('.json')) jsonUmschreiben(join(pr, f), datenblattVerweiseEntfernen);
  for (const o of VERBOTENE_ORDNER) {
    const p = join(dataDir, o);
    if (existsSync(p)) { rmSync(p, { recursive: true, force: true }); console.log(`Nachbereitung: ${o}/ entfernt (darf nicht öffentlich sein)`); }
  }
  if (process.env.GITHUB_ACTIONS) {
    // Sicherstellen, dass nichts davon im Commit landet (der Workflow committet alles, was vorgemerkt ist).
    for (const o of VERBOTENE_ORDNER) {
      try { execSync(`git rm -r -q --cached --ignore-unmatch ${JSON.stringify(join(dataDir, o))}`, { stdio: 'inherit' }); } catch {}
    }
    // ki-embeddings.json wurde vom Abruf schon vorgemerkt – nach dem Abgleich erneut vormerken
    for (const f of [resolve(tendersFile), join(dataDir, 'produktbibliothek.json'), join(dataDir, 'ki-embeddings.json')]) {
      if (existsSync(f)) try { execSync(`git add -- ${JSON.stringify(f)}`, { stdio: 'ignore' }); } catch {}
    }
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  nachbereiten(process.argv[2] || 'docs/data/tenders.json');
}
