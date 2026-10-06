# Nexus (Web)

Nexus im Browser: öffentliche Ausschreibungen für Medientechnik finden, die Unterlagen auswerten, das Leistungsverzeichnis kalkulieren und das Angebot vorbereiten – als Excel, GAEB (WinGAEB) und geordneter Abgabe-Ordner.

**App öffnen:** https://networker-vt.github.io/nexus-web/

## Was Nexus macht

- **Ausschreibungen finden:** aus öffentlichen Bekanntmachungen der Vergabeportale, gefiltert nach Ihrem Fachgebiet.
- **Unterlagen laden:** Wo ein Portal die Vergabeunterlagen ohne Anmeldung anbietet, lädt Nexus sie mit einem Klick. Andere Dateien importieren Sie selbst (Datei, Ordner oder ZIP). Was im Portal bleibt, steht mit direktem Link da.
- **Struktur:** Leistungsverzeichnis (auch GAEB), Anforderungen (wörtlich aus den Unterlagen, gleiche Aussagen nur einmal, mit Quelle und LV-Position), Formblätter mit „mit dem Angebot einreichen: ja / nein / bitte prüfen“ samt Begründung, Pläne und weitere Informationen.
- **Kalkulation:** Marktpreise nur mit Quelle und Datum; wo keiner vorliegt, steht „Preis prüfen“. Marge und Brutto rechnet Nexus aus.
- **Produktvorschläge:** Nexus prüft jedes Kriterium des Leistungstextes gegen das Herstellerdatenblatt (✓ belegt, ✗ widerspricht, ? nicht angegeben). „Treffer“ heißt nur: alle Kriterien belegt. Sonst zeigt Nexus den „Nächstbesten Vorschlag – x von y belegt“. Fabrikat/Typ trägt Nexus erst ein, wenn Sie den Vorschlag übernehmen.
- **Bieterakte & Abgabe:** geordneter Ordner (Bekanntmachung, Vergabeunterlagen, Nachrichten, Kalkulation, Datenblätter, Nachweise, Abgabe) mit Checkliste: was einzureichen ist, was ausgefüllt und unterschrieben ist.
- **Abgabeform und Signatur:** Nexus übernimmt die Abgabeform und Signaturform nur aus den Unterlagen – mit Datei, Seite und Zitat. Angekreuzte Kästchen in Formblättern liest Nexus aus dem Seitenbild; ist ein Kästchen nicht sicher erkennbar, bleibt es „unklar“. Widersprüche (z. B. Formblatt „schriftlich“, Portal elektronisch) zeigt Nexus rot an, mit einem Vorschlag für eine Bieterfrage.

## Was Nexus nicht macht

- Kein Login in Portale, kein Versand von Bieterfragen, keine Angebotsabgabe. Die verbindliche Abgabe machen Sie immer selbst im Vergabeportal.
- Keine erfundenen Angaben: Was nicht in den Unterlagen oder im Datenblatt steht, zeigt Nexus als offen an.

## Daten und Technik

- Ihre Daten bleiben in Ihrem Browser (IndexedDB). Mit „Daten sichern“ / „Daten laden“ sichern Sie sie als Datei.
- Der Abruf der Bekanntmachungen läuft per GitHub Actions alle 3 Stunden (und manuell über „Run workflow“) und schreibt `docs/data/tenders.json`.
- Dieses Repository enthält nur die fertig gebaute Webseite (`docs/`, über GitHub Pages veröffentlicht), die Ausschreibungsdaten und den gebündelten Abruf (`sync/`). Der Quellcode liegt im privaten Repository; jede Veröffentlichung läuft erst nach bestandenen Regressionstests.

Verbesserungsvorschläge aus der App („Vorschlag senden“) kommen als Issues mit dem Label `vorschlag` an – siehe [docs/feedback.md](docs/feedback.md).

[Impressum](https://networker-vt.github.io/nexus-web/impressum.html) · [Datenschutz](https://networker-vt.github.io/nexus-web/datenschutz.html)
