// Einstieg für den Workflow .github/workflows/portal-abruf.yml (Aufruf unverändert:
//   node sync/fetch-tenders.mjs docs/data/tenders.json <vorheriger-stand-url>)
// 1. startet den eigentlichen Abruf (fetch-tenders.core.mjs) mit Abruf-Schutz (robots.txt, Sperrliste,
//    keine Downloads, Mindestabstand) und OHNE Unterlagen-Abruf (NEXUS_SKIP_DOCS=1, fest)
// 2. bereinigt danach die Daten (nachbereitung.mjs): keine Unterlagen/Datenblätter, Kontakt-Filter, TED-Quelle
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { nachbereiten } from './nachbereitung.mjs';

const core = fileURLToPath(new URL('./fetch-tenders.core.mjs', import.meta.url));
const schutz = new URL('./abruf-schutz.mjs', import.meta.url).href;
const args = process.argv.slice(2);
const r = spawnSync(process.execPath, ['--import', schutz, core, ...args], {
  stdio: 'inherit',
  env: { ...process.env, NEXUS_SKIP_DOCS: '1' },
});
try {
  nachbereiten(args[0] || 'docs/data/tenders.json');
} catch (e) {
  console.log('Nachbereitung fehlgeschlagen:', e instanceof Error ? e.message : e);
  process.exit(1);
}
process.exit(r.status ?? 1);
