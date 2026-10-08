// Nachbereitung nach jedem Portal-Abruf (und einzeln aufrufbar: node sync/nachbereitung.mjs docs/data/tenders.json).
// Rechtliche Vorgaben (Legal Weappon, 8.10.2026):
//  - öffentlich nur Kerndaten + Links; keine Texte/Dateien aus Vergabeunterlagen, keine Datenblatt-Kopien
//  - E-Mail-Adressen und Telefonnummern aus Beschreibungstexten entfernen
//  - TED: Quellenangabe „Quelle: TED, © Europäische Union“
import { readFileSync, writeFileSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export const TED_QUELLE = 'Quelle: TED, © Europäische Union';
const VERBOTENE_ORDNER = ['docs', 'datenblaetter', 'unterlagen', 'volltexte'];
const DOCS_ERLAUBT = ['status', 'reason', 'portalUrl', 'fetchedAt'];
const TEXTFELDER = ['title', 'description', 'leistungsgegenstand', 'notes', 'contractingAuthority', 'city'];

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

export function tendersBereinigen(data) {
  if (!data || !Array.isArray(data.tenders)) return data;
  const summary = {};
  for (const t of data.tenders) {
    for (const k of TEXTFELDER) if (typeof t[k] === 'string') t[k] = kontakteEntfernen(t[k]);
    if (t.docs) t.docs = docsBereinigen(t.docs);
    if (t.docs?.status) summary[t.docs.status] = (summary[t.docs.status] || 0) + 1;
    if (t.sourceId === 'ted' || /ted\.europa\.eu/i.test(t.source || '')) t.quellenhinweis = TED_QUELLE;
  }
  if (data.docsSummary) data.docsSummary = summary;
  data.quellenhinweise = { ted: TED_QUELLE };
  return data;
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
  jsonUmschreiben(tendersFile, tendersBereinigen);
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
    try { execSync(`git add -- ${JSON.stringify(resolve(tendersFile))} ${JSON.stringify(join(dataDir, 'produktbibliothek.json'))}`, { stdio: 'ignore' }); } catch {}
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  nachbereiten(process.argv[2] || 'docs/data/tenders.json');
}
