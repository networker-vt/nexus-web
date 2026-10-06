# Automatischen Abruf einschalten (einmalig)

`portal-abruf.yml` ist der GitHub-Actions-Ablauf, der alle 3 Stunden die öffentlichen Ausschreibungen abruft
und `docs/data/tenders.json` aktualisiert. Er muss nach `.github/workflows/portal-abruf.yml` verschoben werden.

Im Browser auf github.com (angemeldet als networker-vt):
1. Datei `setup/portal-abruf.yml` öffnen → Stift (Bearbeiten).
2. Oben den Dateinamen ändern in `.github/workflows/portal-abruf.yml`.
3. „Commit changes“ klicken. Der erste Abruf startet sofort, danach alle 3 Stunden.
