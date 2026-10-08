# Verbesserungsvorschläge aus LV Mania

In LV Mania gibt es in der Seitenleiste den Knopf **„Vorschlag senden“**. Der Dialog fragt nach einem Bereich
(Markt, Meine Ausschreibungen, LV-Auswertung, Preise, Export, Sonstiges – freiwillig) und nach dem Text
„Was sollen wir verbessern?“.

So kommen die Vorschläge an:

- **„Absenden“** öffnet ein fertig ausgefülltes neues Issue in
  [networker-vt/nexus-web](https://github.com/networker-vt/nexus-web/issues?q=label%3Avorschlag)
  (Titel „Vorschlag: <Bereich>: <Anfang des Textes>“, Text mit Bereich, Seite und App-Version).
  Fehlermeldungen bekommen das Label **`fehler`** (Vorlage `.github/ISSUE_TEMPLATE/fehler.md`), Vorschläge das Label **`vorschlag`** (Vorlage `.github/ISSUE_TEMPLATE/vorschlag.md`).
  Der Nutzer braucht dafür ein GitHub-Konto und muss auf GitHub noch „Submit new issue“ klicken.
- **„Per E-Mail senden“** öffnet das E-Mail-Programm mit derselben Nachricht an die Impressum-Adresse
  (mk@rentalmania.de). Auch hier muss der Nutzer selbst auf „Senden“ klicken.

LV Mania hat dafür keinen Server und speichert keine Zugangsdaten. Die App zeigt deshalb nur „Danke, Vorschlag
geöffnet“ – nicht „gesendet“. Eine Liste „Meine Vorschläge“ bleibt lokal im Browser (IndexedDB) des Nutzers.

Alle Vorschläge ansehen: https://github.com/networker-vt/nexus-web/issues?q=label%3Avorschlag
