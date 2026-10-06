# Nexus (Web)

Nexus im Browser: öffentliche Ausschreibungen für Medientechnik finden, übernehmen, Leistungsverzeichnis auswerten (Marktpreis mit Quelle, Preis inkl. Marge, Produkt- und Datenblatt-Links) und als Excel oder GAEB (WinGAEB) exportieren.

**App öffnen:** https://networker-vt.github.io/nexus-web/

- Ihre Daten bleiben in Ihrem Browser (IndexedDB). Mit „Daten sichern“ / „Daten laden“ sichern Sie sie als Datei.
- Ausschreibungen kommen aus öffentlichen Bekanntmachungen der Vergabeportale. Der Abruf läuft hier per GitHub Actions alle 3 Stunden (und manuell über „Run workflow“) und schreibt `data/tenders.json`.
- Kein Login in Portale, keine automatische Angebotsabgabe. Verbindliche Abgabe immer selbst im Vergabeportal – erst nach Freigabe.

Dieses Repository enthält nur die fertig gebaute Webseite (`docs/`, über GitHub Pages veröffentlicht), die Ausschreibungsdaten (`docs/data/tenders.json`) und den gebündelten Abruf (`sync/fetch-tenders.mjs`). Der Quellcode liegt im privaten Repository.

[Impressum](https://networker-vt.github.io/nexus-web/impressum.html) · [Datenschutz](https://networker-vt.github.io/nexus-web/datenschutz.html)
