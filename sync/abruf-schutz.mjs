// Abruf-Schutz für den Portal-Abruf (wird per `node --import` vor fetch-tenders.core.mjs geladen).
// Rechtliche Vorgaben (Legal Weappon, 8.10.2026):
//  - nur öffentliche Bekanntmachungen, keine Vergabeunterlagen / Dateien / Datenblätter herunterladen
//  - robots.txt jedes Hosts beachten
//  - Sperrliste (sync/sperrliste.json) beachten
//  - langsam abrufen (Mindestabstand je Host)
import { readFileSync } from 'node:fs';

const MIN_ABSTAND_MS = Number(process.env.NEXUS_HOST_DELAY_MS || 1000);
const UA_TOKENS = ['nexusweb-sync', 'nexus', 'lvmania'];

let sperrHosts = [];
try {
  const s = JSON.parse(readFileSync(new URL('./sperrliste.json', import.meta.url), 'utf8'));
  sperrHosts = (s.hosts || []).map((h) => String(h.host || h).toLowerCase().replace(/^\.+/, '')).filter(Boolean);
} catch (e) {
  console.log('Abruf-Schutz: Sperrliste nicht lesbar –', e instanceof Error ? e.message : e);
}

// Alles, was nach Unterlagen-/Datei-Download, Anmeldung oder Bieterbereich aussieht, wird nicht abgerufen.
const VERBOTEN = [
  /download/i,
  /\.(pdf|zip|7z|rar|docx?|xlsx?|odt|ods|dwg|dxf|gaeb|[dxp]8[0-9])(?:[?#]|$)/i,
  /login|register|registrier|anmeld|forgotpassword|forgotusername/i,
  /thContext=participant/i,
  /(?:^|[?&])function=_?(?:Download|Documents|Zip)/i,
];

const original = globalThis.fetch.bind(globalThis);
const robotsCache = new Map();
const letzterAbruf = new Map();
const blockLog = new Set();

function gesperrt(host) {
  host = host.toLowerCase();
  return sperrHosts.find((h) => host === h || host.endsWith('.' + h));
}

function parseRobots(text) {
  // Gruppen: { agents:[], rules:[{allow:boolean, path}] }
  const groups = [];
  let cur = null;
  let lastWasAgent = false;
  for (let raw of text.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, '').trim();
    if (!line) continue;
    const m = /^([A-Za-z-]+)\s*:\s*(.*)$/.exec(line);
    if (!m) continue;
    const key = m[1].toLowerCase();
    const val = m[2].trim();
    if (key === 'user-agent') {
      if (!cur || !lastWasAgent) { cur = { agents: [], rules: [] }; groups.push(cur); }
      cur.agents.push(val.toLowerCase());
      lastWasAgent = true;
    } else if (key === 'allow' || key === 'disallow') {
      lastWasAgent = false;
      if (!cur) continue;
      if (key === 'disallow' && val === '') continue;
      cur.rules.push({ allow: key === 'allow', path: val });
    } else {
      lastWasAgent = false;
    }
  }
  const spezifisch = groups.filter((g) => g.agents.some((a) => a !== '*' && UA_TOKENS.some((t) => a.includes(t) || t.includes(a))));
  const wahl = spezifisch.length ? spezifisch : groups.filter((g) => g.agents.includes('*'));
  return wahl.flatMap((g) => g.rules);
}

function regelPasst(regelPfad, pfad) {
  let re = regelPfad.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*');
  if (re.endsWith('\\$')) re = re.slice(0, -2) + '$';
  return new RegExp('^' + re).test(pfad);
}

async function robotsErlaubt(u) {
  const origin = u.origin;
  if (!robotsCache.has(origin)) {
    robotsCache.set(origin, (async () => {
      try {
        const ctl = new AbortController();
        const t = setTimeout(() => ctl.abort(), 15000);
        const r = await original(origin + '/robots.txt', { signal: ctl.signal, headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NexusWeb-Sync/1.0; +https://github.com/networker-vt/nexus-web)' } });
        clearTimeout(t);
        if (r.status >= 400 && r.status < 500) return { rules: [] };          // keine robots.txt -> erlaubt
        if (!r.ok) return { fehler: `robots.txt HTTP ${r.status}` };            // 5xx -> vorsichtshalber gesperrt
        const ct = r.headers.get('content-type') || '';
        const text = await r.text();
        if (/html/i.test(ct) && /<html/i.test(text)) return { rules: [] };       // Fehlerseite statt robots.txt
        return { rules: parseRobots(text) };
      } catch (e) {
        return { fehler: 'robots.txt nicht erreichbar: ' + (e instanceof Error ? e.message : e) };
      }
    })());
  }
  const r = await robotsCache.get(origin);
  if (r.fehler) return { ok: false, grund: r.fehler };
  const pfad = u.pathname + u.search;
  let best = null;
  for (const rule of r.rules) {
    if (!rule.path || !regelPasst(rule.path, pfad)) continue;
    if (!best || rule.path.length > best.path.length || (rule.path.length === best.path.length && rule.allow)) best = rule;
  }
  return best && !best.allow ? { ok: false, grund: `robots.txt verbietet ${best.path}` } : { ok: true };
}

function blockiert(url, grund) {
  const key = new URL(url).host + ' ' + grund;
  if (!blockLog.has(key)) { blockLog.add(key); console.log(`Abruf-Schutz: ${new URL(url).host} übersprungen (${grund})`); }
  return Promise.reject(new Error(`Abruf-Schutz: ${grund}`));
}

globalThis.fetch = async function geschuetzterFetch(input, init) {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input?.url;
  let u;
  try { u = new URL(url); } catch { return original(input, init); }
  if (u.protocol !== 'https:' && u.protocol !== 'http:') return original(input, init);
  const sperre = gesperrt(u.hostname);
  if (sperre) return blockiert(url, `Sperrliste (${sperre})`);
  if (VERBOTEN.some((re) => re.test(u.pathname + u.search))) return blockiert(url, 'Unterlagen-/Datei-Download oder Anmeldebereich');
  const rob = await robotsErlaubt(u);
  if (!rob.ok) return blockiert(url, rob.grund);
  const jetzt = Date.now();
  const naechst = Math.max(jetzt, (letzterAbruf.get(u.host) || 0) + MIN_ABSTAND_MS);
  letzterAbruf.set(u.host, naechst);
  if (naechst > jetzt) await new Promise((r) => setTimeout(r, naechst - jetzt));
  return original(input, init);
};

export const _test = { parseRobots, regelPasst, gesperrt, VERBOTEN };
