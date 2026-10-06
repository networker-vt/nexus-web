// src/web/sync/fetchTenders.ts
import { writeFileSync, mkdirSync } from "fs";
import { dirname } from "path";

// src/main/seed.ts
function daysFromNow(days) {
  const d = /* @__PURE__ */ new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}
function daysAgo(days) {
  const d = /* @__PURE__ */ new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}
var now = (/* @__PURE__ */ new Date()).toISOString();
var SEED_TENDERS = [
  {
    id: "t-001",
    title: "Neubau und Einrichtung Museumsdepot Nordrhein \u2013 Regalsysteme und Klimatechnik",
    reference: "VG-NRW-2026-0847",
    description: "\xD6ffentliche Ausschreibung f\xFCr den Neubau eines zentralen Museumsdepots inkl. Hochregallager, Klima- und Sicherheitstechnik sowie fachspezifischer Depotm\xF6blierung f\xFCr Kunst- und Kulturgut.",
    leistungsgegenstand: "Lieferung und Montage von Museums-Regalsystemen (Kompaktanlage), Klima- und L\xFCftungstechnik nach Museumsstandard, Brandmelde- und Einbruchmeldeanlage, sowie Planung der Depotlogistik.",
    contractingAuthority: "Landschaftsverband Rheinland (LVR)",
    bundesland: "Nordrhein-Westfalen",
    city: "K\xF6ln",
    publishedAt: daysAgo(12),
    deadline: daysFromNow(5),
    submissionDeadline: daysFromNow(5),
    estimatedValue: 185e4,
    currency: "EUR",
    tags: ["Museum", "Bau", "Technik", "TGA", "Sicherheitstechnik", "M\xF6bel / Vitrinen"],
    source: "Vergabe.NRW",
    sourceUrl: "https://www.evergabe.nrw.de",
    cpvCodes: ["39151000", "45331200", "45212313"],
    pipelineStatus: "interessant",
    notes: "Passt gut zu Depot-Referenzen. Klimatechnik-Partner pr\xFCfen.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "t-002",
    title: "Ausstellungsbau Sonderausstellung \u201EIndustriegeschichte Ruhr\u201C \u2013 Szenografie & Bau",
    reference: "RUHR-MUSEUM-2026-112",
    description: "Konzeption, Planung und Realisierung des Ausstellungsbaus f\xFCr eine Sonderausstellung inkl. Vitrinen, Grafikfl\xE4chen, Medienstationen und Besucherf\xFChrung.",
    leistungsgegenstand: "Ausstellungsbau: Raumgestaltung, Vitrinenbau, Podeste, Lichtkonzept, Medienintegration, Montage und Abbau nach Ausstellungslaufzeit.",
    contractingAuthority: "Ruhr Museum / Stiftung Zollverein",
    bundesland: "Nordrhein-Westfalen",
    city: "Essen",
    publishedAt: daysAgo(8),
    deadline: daysFromNow(18),
    submissionDeadline: daysFromNow(18),
    estimatedValue: 42e4,
    currency: "EUR",
    tags: ["Museum", "Ausstellungsbau", "Content", "Contenterstellung", "Medientechnik", "Beleuchtung", "M\xF6bel / Vitrinen"],
    source: "DTVP",
    sourceUrl: "https://www.dtvp.de",
    cpvCodes: ["45212350", "92521000"],
    pipelineStatus: "in Arbeit",
    notes: "Konzeptskizze in Vorbereitung. Holzbau-Gewerk priorisieren.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "t-003",
    title: "Sanierung Museumsfassade und barrierefreier Zugang \u2013 Historisches Museum",
    reference: "BAY-MUC-2026-0331",
    description: "Baudurchf\xFChrung zur Sanierung der Au\xDFenfassade sowie Errichtung eines barrierefreien Haupteingangs inkl. Aufzug und Leitsystem.",
    leistungsgegenstand: "Fassadensanierung (Naturstein), Stahl-Glas-Konstruktion Eingang, Aufzugsanlage, taktiles Leitsystem, Brandschutzert\xFCchtigung.",
    contractingAuthority: "Freistaat Bayern / Staatliches Bauamt M\xFCnchen",
    bundesland: "Bayern",
    city: "M\xFCnchen",
    publishedAt: daysAgo(20),
    deadline: daysFromNow(3),
    submissionDeadline: daysFromNow(3),
    estimatedValue: 31e5,
    currency: "EUR",
    tags: ["Museum", "Bau", "Innenausbau"],
    source: "eVergabe Bayern",
    sourceUrl: "https://www.evergabe.bayern.de",
    cpvCodes: ["45443000", "45212300"],
    pipelineStatus: "neu",
    notes: "",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "t-004",
    title: "AV-Medientechnik Dauerausstellung Naturkunde \u2013 Displays, Audio, Steuerung",
    reference: "BER-NKM-2026-078",
    description: "Erneuerung der AV- und Medientechnik in der Dauerausstellung inkl. Projektion, Touchdisplays, Audioguide-Infrastruktur und zentrale Steuerung.",
    leistungsgegenstand: "Lieferung und Installation von Displays, Projektoren, Audioanlagen, Media-Server, Show-Control sowie Wartungsvertrag 3 Jahre.",
    contractingAuthority: "Museum f\xFCr Naturkunde Berlin",
    bundesland: "Berlin",
    city: "Berlin",
    publishedAt: daysAgo(5),
    deadline: daysFromNow(25),
    submissionDeadline: daysFromNow(25),
    estimatedValue: 68e4,
    currency: "EUR",
    tags: ["Museum", "Technik", "Medientechnik", "AV-Technik", "Multimedia"],
    source: "TED",
    sourceUrl: "https://ted.europa.eu",
    cpvCodes: ["32322000", "50340000"],
    pipelineStatus: "interessant",
    notes: "Technik-Schwerpunkt \u2013 gute Eignung.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "t-005",
    title: "Ausstellungsbau Wanderausstellung \u201EDigitale Gesellschaft\u201C \u2013 Modulsystem",
    reference: "HH-MK-2026-019",
    description: "Entwicklung und Bau eines transportablen Modulsystems f\xFCr eine bundesweite Wanderausstellung inkl. Verpackungs- und Logistikkonzept.",
    leistungsgegenstand: "Modulares Ausstellungssystem (Aluminium/Holz), Grafiktr\xE4ger, Medienmodule, Transportkisten, Aufbauanleitung und Schulung.",
    contractingAuthority: "Museum f\xFCr Kommunikation Hamburg",
    bundesland: "Hamburg",
    city: "Hamburg",
    publishedAt: daysAgo(15),
    deadline: daysFromNow(11),
    submissionDeadline: daysFromNow(11),
    estimatedValue: 295e3,
    currency: "EUR",
    tags: ["Ausstellungsbau", "Technik", "Content", "Medientechnik", "Grafik", "Multimedia"],
    source: "DTVP",
    sourceUrl: "https://www.dtvp.de",
    cpvCodes: ["45212350", "39154000"],
    pipelineStatus: "angeboten",
    notes: "Angebot eingereicht am 01.09.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "t-006",
    title: "Rohbau und TGA Museumsanbau \u2013 Erweiterungsbau Landesmuseum",
    reference: "BW-STM-2026-441",
    description: "Erweiterungsbau des Landesmuseums: Rohbau, Dach, Fassade und technische Geb\xE4udeausr\xFCstung.",
    leistungsgegenstand: "Stahlbetonbau, Dachabdichtung, Vorhangfassade, Heizungs-/L\xFCftungs-/Sanit\xE4rtechnik, Elektroinstallation Starkstrom.",
    contractingAuthority: "Land Baden-W\xFCrttemberg / Verm\xF6gen und Bau",
    bundesland: "Baden-W\xFCrttemberg",
    city: "Stuttgart",
    publishedAt: daysAgo(30),
    deadline: daysFromNow(40),
    submissionDeadline: daysFromNow(40),
    estimatedValue: 125e5,
    currency: "EUR",
    tags: ["Bau", "Museum", "Technik", "TGA"],
    source: "TED",
    sourceUrl: "https://ted.europa.eu",
    cpvCodes: ["45210000", "45300000"],
    pipelineStatus: "abgesagt",
    notes: "Volumen zu gro\xDF \u2013 abgesagt.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "t-007",
    title: "Content-Produktion und Ausstellungsgrafik \u2013 Sonderausstellung Design",
    reference: "NS-HMT-2026-055",
    description: "Redaktionelle und gestalterische Leistungen: Texte, Grafikdesign, Illustrationen und digitale Begleitmedien f\xFCr eine Design-Sonderausstellung.",
    leistungsgegenstand: "Konzept, Texterstellung DE/EN, Typografie, Plakate, Katalogbeitrag, Screen-Content und Barrierefreiheit (WCAG).",
    contractingAuthority: "Sprengel Museum Hannover",
    bundesland: "Niedersachsen",
    city: "Hannover",
    publishedAt: daysAgo(4),
    deadline: daysFromNow(21),
    submissionDeadline: daysFromNow(21),
    estimatedValue: 85e3,
    currency: "EUR",
    tags: ["Content", "Contenterstellung", "Grafik", "Museum", "Digitalisierung"],
    source: "Vergabeplattform",
    sourceUrl: "https://vergabe.niedersachsen.de",
    cpvCodes: ["79822500", "92312211"],
    pipelineStatus: "neu",
    notes: "",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "t-008",
    title: "Beleuchtungstechnik und LED-Umr\xFCstung Dauerausstellung Kunsthalle",
    reference: "SH-KH-2026-009",
    description: "Umr\xFCstung der Ausstellungsbeleuchtung auf LED inkl. Schienensystem, Steuerung und Lichtplanung nach Konservierungsvorgaben.",
    leistungsgegenstand: "Demontage Altanlage, Lieferung LED-Spotlights, DALI-Steuerung, Lichtmessung, Inbetriebnahme und Dokumentation.",
    contractingAuthority: "Kunsthalle zu Kiel",
    bundesland: "Schleswig-Holstein",
    city: "Kiel",
    publishedAt: daysAgo(10),
    deadline: daysFromNow(8),
    submissionDeadline: daysFromNow(8),
    estimatedValue: 21e4,
    currency: "EUR",
    tags: ["Technik", "Museum", "Beleuchtung"],
    source: "bund.de / eVergabe",
    sourceUrl: "https://www.evergabe-online.de",
    cpvCodes: ["31520000", "45311200"],
    pipelineStatus: "interessant",
    notes: "Lichtpartner anfragen.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "t-009",
    title: "Vitrinenbau und Objektschutz \u2013 Historische Sammlung",
    reference: "SN-SKD-2026-203",
    description: "Anfertigung und Aufstellung klimatisierter Ausstellungvitrinen sowie Objektschutzsysteme f\xFCr empfindliche Exponate.",
    leistungsgegenstand: "Ma\xDFgefertigte Klimavitrinen, Sicherheitsglas, LED-Innenlicht, Sensorik Feuchte/Temp., Montage vor Ort.",
    contractingAuthority: "Staatliche Kunstsammlungen Dresden",
    bundesland: "Sachsen",
    city: "Dresden",
    publishedAt: daysAgo(7),
    deadline: daysFromNow(14),
    submissionDeadline: daysFromNow(14),
    estimatedValue: 54e4,
    currency: "EUR",
    tags: ["Ausstellungsbau", "Museum", "Technik", "M\xF6bel / Vitrinen", "Beleuchtung"],
    source: "DTVP",
    sourceUrl: "https://www.dtvp.de",
    cpvCodes: ["39151100", "92521000"],
    pipelineStatus: "in Arbeit",
    notes: "Referenzprojekte Vitrinen sammeln.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "t-010",
    title: "Brandschutzsanierung und Fluchtwegkonzept Museumsgeb\xE4ude",
    reference: "HE-MMK-2026-088",
    description: "Planung und Umsetzung brandschutztechnischer Ma\xDFnahmen inkl. Nachr\xFCstung Brandschutzt\xFCren, Entrauchung und Beschilderung.",
    leistungsgegenstand: "Brandschutzt\xFCren EI30/EI90, Entrauchungsanlage, Notbeleuchtung, Fluchtwegbeschilderung, Dokumentation und Abnahme.",
    contractingAuthority: "MMK Museum f\xFCr Moderne Kunst Frankfurt",
    bundesland: "Hessen",
    city: "Frankfurt am Main",
    publishedAt: daysAgo(18),
    deadline: daysFromNow(6),
    submissionDeadline: daysFromNow(6),
    estimatedValue: 39e4,
    currency: "EUR",
    tags: ["Bau", "Technik", "Museum", "Sicherheitstechnik"],
    source: "Vergabeplattform",
    sourceUrl: "https://www.had.de",
    cpvCodes: ["45223200", "45343000"],
    pipelineStatus: "neu",
    notes: "",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "t-011",
    title: "Interaktive Medienstationen und Apps \u2013 KinderMuseum",
    reference: "RP-KM-2026-014",
    description: "Entwicklung und Installation interaktiver Medienstationen inkl. Software, Hardware und redaktionellem Content f\xFCr ein Kindermuseum.",
    leistungsgegenstand: "UX/UI, Softwareentwicklung, Touch-Hardware, Content-Produktion, Wartung und Updates f\xFCr 24 Monate.",
    contractingAuthority: "Landesmuseum Mainz / KinderMuseum",
    bundesland: "Rheinland-Pfalz",
    city: "Mainz",
    publishedAt: daysAgo(3),
    deadline: daysFromNow(28),
    submissionDeadline: daysFromNow(28),
    estimatedValue: 175e3,
    currency: "EUR",
    tags: ["Content", "Contenterstellung", "Technik", "Museum", "Medientechnik", "Multimedia", "Digitalisierung"],
    source: "TED",
    sourceUrl: "https://ted.europa.eu",
    cpvCodes: ["72212000", "32321200"],
    pipelineStatus: "interessant",
    notes: "Content + Technik Kombi \u2013 starkes Match.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "t-012",
    title: "Innenausbau und Bodenbel\xE4ge Ausstellungshallen",
    reference: "MV-SMS-2026-061",
    description: "Erneuerung der Bodenbel\xE4ge und teilweiser Innenausbau in den Ausstellungshallen des Staatlichen Museums.",
    leistungsgegenstand: "Demontage Altboden, Estricharbeiten, Museumsboden (elastisch/holz), Sockelleisten, Teilfl\xE4chen Wandverkleidung.",
    contractingAuthority: "Stiftung Deutsches Meeresmuseum",
    bundesland: "Mecklenburg-Vorpommern",
    city: "Stralsund",
    publishedAt: daysAgo(22),
    deadline: daysFromNow(2),
    submissionDeadline: daysFromNow(2),
    estimatedValue: 26e4,
    currency: "EUR",
    tags: ["Bau", "Ausstellungsbau", "Innenausbau"],
    source: "bund.de / eVergabe",
    sourceUrl: "https://www.evergabe-online.de",
    cpvCodes: ["45432100", "45212350"],
    pipelineStatus: "neu",
    notes: "Frist sehr knapp!",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "t-013",
    title: "Sicherheitstechnik und Zutrittssystem Depot und Ausstellung",
    reference: "TH-TKM-2026-027",
    description: "Modernisierung der elektronischen Sicherheitstechnik inkl. Zutrittskontrolle, Video\xFCberwachung und Alarmweiterleitung.",
    leistungsgegenstand: "Zutrittssystem, Video\xFCberwachung, Einbruchmeldeanlage, Schnittstelle zur Leitstelle, Schulung Personal.",
    contractingAuthority: "Th\xFCringer Landesmuseum Heidecksburg",
    bundesland: "Th\xFCringen",
    city: "Rudolstadt",
    publishedAt: daysAgo(9),
    deadline: daysFromNow(16),
    submissionDeadline: daysFromNow(16),
    estimatedValue: 145e3,
    currency: "EUR",
    tags: ["Technik", "Museum", "Sicherheitstechnik"],
    source: "DTVP",
    sourceUrl: "https://www.dtvp.de",
    cpvCodes: ["35120000", "32231000"],
    pipelineStatus: "neu",
    notes: "",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "t-014",
    title: "Ausstellungsbau und Szenografie Gedenkst\xE4ttenausstellung",
    reference: "BB-GS-2026-041",
    description: "Gestaltung und Bau einer dauerhaften Gedenkst\xE4ttenausstellung inkl. Rauminszenierung, Medien und Grafik.",
    leistungsgegenstand: "Szenografie, Ausstellungsbau, Medienproduktion, Grafik, Montage, barrierefreie Gestaltung.",
    contractingAuthority: "Stiftung Brandenburgische Gedenkst\xE4tten",
    bundesland: "Brandenburg",
    city: "Oranienburg",
    publishedAt: daysAgo(14),
    deadline: daysFromNow(9),
    submissionDeadline: daysFromNow(9),
    estimatedValue: 78e4,
    currency: "EUR",
    tags: ["Ausstellungsbau", "Content", "Contenterstellung", "Museum", "Grafik", "Medientechnik"],
    source: "Vergabe Brandenburg",
    sourceUrl: "https://vergabemarktplatz.brandenburg.de",
    cpvCodes: ["45212350", "92312213"],
    pipelineStatus: "interessant",
    notes: "Sensibles Thema \u2013 Content-Partner mit Erfahrung n\xF6tig.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "t-015",
    title: "TGA und Klimatisierung Ausstellungss\xE4le \u2013 Bestandssanierung",
    reference: "SL-SM-2026-007",
    description: "Erneuerung der raumlufttechnischen Anlagen in den Ausstellungss\xE4len zur Einhaltung museumsgerechter Klimawerte.",
    leistungsgegenstand: "Planung und Ausf\xFChrung RLT-Anlage, Regelungstechnik, Schallschutz, Probebetrieb und Einregulierung.",
    contractingAuthority: "Saarl\xE4ndisches Museum",
    bundesland: "Saarland",
    city: "Saarbr\xFCcken",
    publishedAt: daysAgo(6),
    deadline: daysFromNow(22),
    submissionDeadline: daysFromNow(22),
    estimatedValue: 92e4,
    currency: "EUR",
    tags: ["Technik", "Bau", "Museum", "TGA"],
    source: "TED",
    sourceUrl: "https://ted.europa.eu",
    cpvCodes: ["45331210", "71314000"],
    pipelineStatus: "neu",
    notes: "",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "t-016",
    title: "Medientechnik und Show-Control \u2013 Planetarium Sonderprojektion",
    reference: "HH-PLA-2026-033",
    description: "Lieferung und Integration von Medienservern, Projektionstechnik und Show-Control f\xFCr ein Planetariums-Sonderprogramm.",
    leistungsgegenstand: "Laser-/LED-Projektion, Medienserver, Timecode-Steuerung, Kalibrierung, Schulung und 24-Monats-Wartung.",
    contractingAuthority: "Planetarium Hamburg",
    bundesland: "Hamburg",
    city: "Hamburg",
    publishedAt: daysAgo(2),
    deadline: daysFromNow(30),
    submissionDeadline: daysFromNow(30),
    estimatedValue: 41e4,
    currency: "EUR",
    tags: ["Museum", "Medientechnik", "AV-Technik", "Multimedia", "Technik"],
    source: "Metropolregion Hamburg",
    sourceUrl: "https://fbhh-vergabe.hamburg.de",
    cpvCodes: ["32322000", "50342000"],
    pipelineStatus: "neu",
    notes: "Starkes Medientechnik-Match.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "t-017",
    title: "Contenterstellung und Digitalisierung \u2013 Online-Katalog Museumsstiftung",
    reference: "BY-DIG-2026-118",
    description: "Redaktionelle Aufbereitung, Objektdigitalisierung und Contenterstellung f\xFCr einen barrierefreien Online-Katalog.",
    leistungsgegenstand: "Objektfotografie, Metadaten, Texte DE/EN, CMS-Einpflege, WCAG-Pr\xFCfung und Schulung der Redaktion.",
    contractingAuthority: "Bayerische Staatsgem\xE4ldesammlungen",
    bundesland: "Bayern",
    city: "M\xFCnchen",
    publishedAt: daysAgo(1),
    deadline: daysFromNow(35),
    submissionDeadline: daysFromNow(35),
    estimatedValue: 125e3,
    currency: "EUR",
    tags: ["Museum", "Content", "Contenterstellung", "Digitalisierung", "Grafik"],
    source: "eVergabe Bayern",
    sourceUrl: "https://www.evergabe.bayern.de",
    cpvCodes: ["79995100", "72310000"],
    pipelineStatus: "interessant",
    notes: "",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "t-018",
    title: "AV-Technik und Besucherleitsystem \u2013 Museumsneubau Rheinland",
    reference: "NRW-AV-2026-221",
    description: "Ausstattung eines Museumsneubaus mit AV-Technik, digitalem Besucherleitsystem und Multimedia-Stationen.",
    leistungsgegenstand: "Displays, Kiosksysteme, Audiof\xFChrungen, Netzwerktechnik, Content-Player und zentrale Verwaltung.",
    contractingAuthority: "Stadt K\xF6ln / Kulturamt",
    bundesland: "Nordrhein-Westfalen",
    city: "K\xF6ln",
    publishedAt: daysAgo(6),
    deadline: daysFromNow(19),
    submissionDeadline: daysFromNow(19),
    estimatedValue: 355e3,
    currency: "EUR",
    tags: ["Museum", "AV-Technik", "Medientechnik", "Multimedia", "Technik", "Digitalisierung"],
    source: "Vergabe.NRW",
    sourceUrl: "https://www.evergabe.nrw.de",
    cpvCodes: ["32321200", "50340000"],
    pipelineStatus: "neu",
    notes: "",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "t-019",
    title: "Multimedia-Inszenierung und Contenterstellung \u2013 Technikmuseum",
    reference: "BW-TM-2026-077",
    description: "Konzeption und Realisierung multimedialer Inszenierungen inkl. Filmproduktion, Animation und interaktiver Stationen.",
    leistungsgegenstand: "Drehbuch, Film/Animation, Sounddesign, Touch-Anwendungen, Hardware-Integration und Abnahme.",
    contractingAuthority: "Technoseum Mannheim",
    bundesland: "Baden-W\xFCrttemberg",
    city: "Mannheim",
    publishedAt: daysAgo(11),
    deadline: daysFromNow(12),
    submissionDeadline: daysFromNow(12),
    estimatedValue: 265e3,
    currency: "EUR",
    tags: ["Museum", "Multimedia", "Contenterstellung", "Content", "Medientechnik", "AV-Technik"],
    source: "Vergabe Baden-W\xFCrttemberg",
    sourceUrl: "https://www.vergabe.landbw.de",
    cpvCodes: ["92111200", "72212000"],
    pipelineStatus: "interessant",
    notes: "Content + AV Kombi.",
    createdAt: now,
    updatedAt: now
  },
  {
    id: "t-020",
    title: "Beleuchtung und Medientechnik Sonderausstellung \u2013 Kunstmuseum",
    reference: "BE-KM-2026-052",
    description: "Tempor\xE4re Licht- und Medientechnik f\xFCr eine Sonderausstellung inkl. Steuerung und Content-Zuspielung.",
    leistungsgegenstand: "Miet-/Kaufbeleuchtung, Media-Player, Synchronisation, Aufbau/Abbau und technische Betreuung.",
    contractingAuthority: "Berlinische Galerie",
    bundesland: "Berlin",
    city: "Berlin",
    publishedAt: daysAgo(4),
    deadline: daysFromNow(17),
    submissionDeadline: daysFromNow(17),
    estimatedValue: 98e3,
    currency: "EUR",
    tags: ["Museum", "Beleuchtung", "Medientechnik", "AV-Technik", "Technik"],
    source: "Berlin Vergabeportal",
    sourceUrl: "https://www.berlin.de/vergabeplattform",
    cpvCodes: ["31520000", "32322000"],
    pipelineStatus: "neu",
    notes: "",
    createdAt: now,
    updatedAt: now
  }
];
var SEED_SOURCES = [
  {
    id: "ted",
    name: "TED (EU-Bekanntmachungen)",
    description: "Live-Sync: TED Search API (POST /v3/notices/search) \u2013 \xF6ffentliche Notices DE + Keywords, ohne API-Key. \u201EIm Portal \xF6ffnen\u201C f\xFChrt zur TED-Suche.",
    url: "https://ted.europa.eu/de/search/result",
    status: "aktiv",
    lastSync: null
  },
  {
    id: "ted-api",
    name: "TED \u2013 \xF6ffentliche Suche (Link)",
    description: "Gleicher Datenstrom wie TED Live. Hier nur der menschliche Suchlink \u2014 Abruf \xFCber den TED-Adapter.",
    url: "https://ted.europa.eu/de/search/result",
    status: "geplant",
    lastSync: null
  },
  {
    id: "evergabe-de",
    name: "evergabe.de",
    description: "Verkn\xFCpfung / Link: evergabe.de (AI). Kein Live-Listenabruf ohne Login \u2014 Portal im Browser \xF6ffnen.",
    url: "https://www.evergabe.de",
    status: "geplant",
    lastSync: null
  },
  {
    id: "bund",
    name: "eVergabe-Online (Bund)",
    description: "Verkn\xFCpfung / Link: eVergabe-Online des Bundes. Verkn\xFCpfen \xF6ffnet das Portal \u2014 kein Fake-Live-Sync.",
    url: "https://www.evergabe-online.de",
    status: "geplant",
    lastSync: null
  },
  {
    id: "service-bund",
    name: "Bekanntmachungsservice bund.de",
    description: "service.bund.de \u2013 Bekanntmachungen und Hinweise zu \xF6ffentlichen Auftr\xE4gen des Bundes.",
    url: "https://www.service.bund.de",
    status: "geplant",
    lastSync: null
  },
  {
    id: "dtvp",
    name: "DTVP (Deutsches Vergabeportal)",
    description: "Verkn\xFCpfung / Link: nationale cosinex-Plattform. Suche/Unterlagen hinter Login \u2014 nur Verkn\xFCpfung in Nexus.",
    url: "https://www.dtvp.de",
    status: "geplant",
    lastSync: null
  },
  {
    id: "meinauftrag-rib",
    name: "meinauftrag (RIB / iTWO)",
    description: "Verkn\xFCpfung / Link: RIB meinauftrag \u2014 h\xE4ufig Bau/AVA/GAEB-nah. Kein Login-Scraper in Nexus.",
    url: "https://meinauftrag.rib.de",
    status: "geplant",
    lastSync: null
  },
  {
    id: "subreport",
    name: "subreport ELViS",
    description: "Verkn\xFCpfung / Link: subreport/ELViS. Bieterzugang im Portal \u2014 Nexus speichert nur die Verkn\xFCpfung.",
    url: "https://www.subreport.de",
    status: "geplant",
    lastSync: null
  },
  {
    id: "vergabe24",
    name: "Cosinex / Vergabe24",
    description: "Vergabe24 / Cosinex \u2013 Vergabeplattform und Bieterportal f\xFCr \xF6ffentliche Ausschreibungen.",
    url: "https://www.vergabe24.de",
    status: "geplant",
    lastSync: null
  },
  {
    id: "bi-vergabe",
    name: "bi-medien / bi-vergabe",
    description: "Brancheninformationsdienst und Vergabe\xFCbersichten (bi-medien) \u2013 Aggregator-Hinweis.",
    url: "https://www.bi-medien.de",
    status: "geplant",
    lastSync: null
  },
  {
    id: "ausschreibungen-de",
    name: "Ausschreibungen Deutschland (Aggregator)",
    description: "Aggregator-Portale (z. B. ausschreibungen-deutschland.de / Auftragsb\xF6rse-\xE4hnlich) \u2013 Hinweise auf \xF6ffentliche Ausschreibungen.",
    url: "https://www.ausschreibungen-deutschland.de",
    status: "geplant",
    lastSync: null
  },
  {
    id: "evergabe-bayern",
    name: "eVergabe Bayern",
    description: "Vergabeplattform des Freistaats Bayern (evergabe.bayern.de).",
    url: "https://www.evergabe.bayern.de",
    status: "geplant",
    lastSync: null
  },
  {
    id: "vergabe-nrw",
    name: "Vergabe.NRW",
    description: "Elektronische Vergabeplattform Nordrhein-Westfalen (evergabe.nrw.de).",
    url: "https://www.evergabe.nrw.de",
    status: "geplant",
    lastSync: null
  },
  {
    id: "vergabe-bw",
    name: "Vergabe Baden-W\xFCrttemberg",
    description: "Live-Sync: \xF6ffentliche Bekanntmachungssuche auf vergabe.landbw.de (HTML-Tabelle). Dokument-Download/Login sp\xE4ter mit Zugangsdaten \u2014 nicht Teil dieses Adapters.",
    url: "https://vergabe.landbw.de/NetServer/PublicationSearchControllerServlet?function=SearchPublications&Category=InvitationToTender&Gesetzesgrundlage=All&Max=100&Start=0&thContext=publications",
    status: "aktiv",
    lastSync: null
  },
  {
    id: "vergabe-brandenburg",
    name: "Vergabeplattform Brandenburg",
    description: "Nur Link: Vergabemarktplatz Brandenburg (kein \xF6ffentliches NetServer-PublicationSearch). Verkn\xFCpfen \xF6ffnet das Portal.",
    url: "https://vergabemarktplatz.brandenburg.de",
    status: "geplant",
    lastSync: null
  },
  {
    id: "vergabe-rlp",
    name: "Vergabe Rheinland-Pfalz",
    description: "Nur Link: VMP Rheinland-Pfalz. \xD6ffentliche Oberfl\xE4che ohne NetServer-Listen-HTML \u2014 Verkn\xFCpfen \xF6ffnet das Portal.",
    url: "https://www.vergabe.rlp.de",
    status: "geplant",
    lastSync: null
  },
  {
    id: "vergabe-niedersachsen",
    name: "Vergabe Niedersachsen",
    description: "Nur Link: Landesportal Niedersachsen. Kein \xF6ffentliches NetServer-HTML \u2014 Teilnahme im Portal vorbereiten.",
    url: "https://vergabe.niedersachsen.de",
    status: "geplant",
    lastSync: null
  },
  {
    id: "vergabe-hamburg",
    name: "Metropolregion Hamburg Vergabeplattform",
    description: "Vergabeportal der Freien und Hansestadt Hamburg / Metropolregion.",
    url: "https://fbhh-vergabe.hamburg.de",
    status: "geplant",
    lastSync: null
  },
  {
    id: "vergabe-bremen",
    name: "Vergabe Bremen",
    description: "Live-Sync: \xF6ffentliche Bekanntmachungssuche auf vergabe.bremen.de (NetServer HTML-Tabelle).",
    url: "https://vergabe.bremen.de/NetServer/PublicationSearchControllerServlet?function=SearchPublications&Category=InvitationToTender&Gesetzesgrundlage=All&Max=100&Start=0&thContext=publications",
    status: "aktiv",
    lastSync: null
  },
  {
    id: "vergabe-berlin",
    name: "Vergabekooperation Berlin",
    description: "Live-Sync: \xF6ffentliche Bekanntmachungssuche auf vergabekooperation.berlin (NetServer HTML-Tabelle).",
    url: "https://vergabekooperation.berlin/NetServer/PublicationSearchControllerServlet?function=SearchPublications&Category=InvitationToTender&Gesetzesgrundlage=All&Max=100&Start=0&thContext=publications",
    status: "aktiv",
    lastSync: null
  },
  {
    id: "vergabe-sachsen",
    name: "eVergabe Sachsen",
    description: "Live-Sync: \xF6ffentliche Bekanntmachungssuche auf evergabe.sachsen.de (NetServer HTML-Tabelle).",
    url: "https://www.evergabe.sachsen.de/NetServer/PublicationSearchControllerServlet?function=SearchPublications&Category=InvitationToTender&Gesetzesgrundlage=All&Max=100&Start=0&thContext=publications",
    status: "aktiv",
    lastSync: null
  },
  {
    id: "vergabe-hessen",
    name: "Vergabeplattform Land Hessen",
    description: "Live-Sync: \xF6ffentliche Bekanntmachungssuche auf vergabe.hessen.de (NetServer Listen-Karten).",
    url: "https://vergabe.hessen.de/NetServer/PublicationSearchControllerServlet?function=SearchPublications&Category=InvitationToTender&Gesetzesgrundlage=All&Max=100&Start=0&thContext=publications",
    status: "aktiv",
    lastSync: null
  },
  {
    id: "vergabe-mv",
    name: "Vergabe Mecklenburg-Vorpommern",
    description: "Live-Sync: \xF6ffentliche Bekanntmachungssuche auf vergabe.mv-regierung.de (NetServer HTML-Tabelle).",
    url: "https://vergabe.mv-regierung.de/NetServer/PublicationSearchControllerServlet?function=SearchPublications&Category=InvitationToTender&Gesetzesgrundlage=All&Max=100&Start=0&thContext=publications",
    status: "aktiv",
    lastSync: null
  },
  {
    id: "vergabe-duesseldorf",
    name: "Vergabe D\xFCsseldorf",
    description: "Live-Sync: \xF6ffentliche Bekanntmachungssuche auf vergabe.duesseldorf.de (NetServer HTML-Tabelle). evergabe.nrw.de bleibt Nur-Link.",
    url: "https://vergabe.duesseldorf.de/NetServer/PublicationSearchControllerServlet?function=SearchPublications&Category=InvitationToTender&Gesetzesgrundlage=All&Max=100&Start=0&thContext=publications",
    status: "aktiv",
    lastSync: null
  },
  {
    id: "vergabe-koeln",
    name: "Vergabe Stadt K\xF6ln",
    description: "Live-Sync: \xF6ffentliche Bekanntmachungssuche auf vergabeplattform.stadt-koeln.de (NetServer HTML-Tabelle). evergabe.nrw.de bleibt Nur-Link.",
    url: "https://vergabeplattform.stadt-koeln.de/NetServer/PublicationSearchControllerServlet?function=SearchPublications&Category=InvitationToTender&Gesetzesgrundlage=All&Max=100&Start=0&thContext=publications",
    status: "aktiv",
    lastSync: null
  },
  {
    id: "vergabe-lvr",
    name: "Vergabe LVR",
    description: "Live-Sync: \xF6ffentliche Bekanntmachungssuche auf vergabe.lvr.de (NetServer HTML-Tabelle, Landschaftsverband Rheinland).",
    url: "https://vergabe.lvr.de/NetServer/PublicationSearchControllerServlet?function=SearchPublications&Category=InvitationToTender&Gesetzesgrundlage=All&Max=100&Start=0&thContext=publications",
    status: "aktiv",
    lastSync: null
  },
  {
    id: "vergabe-frankfurt",
    name: "Vergabe Stadt Frankfurt",
    description: "Live-Sync: \xF6ffentliche Bekanntmachungssuche auf vergabe.stadt-frankfurt.de (NetServer HTML-Tabelle).",
    url: "https://vergabe.stadt-frankfurt.de/NetServer/PublicationSearchControllerServlet?function=SearchPublications&Category=InvitationToTender&Gesetzesgrundlage=All&Max=100&Start=0&thContext=publications",
    status: "aktiv",
    lastSync: null
  },
  {
    id: "vergabescout",
    name: "VergabeScout / Deutsches Vergabeportal (Hinweis)",
    description: "Aggregator- und Recherchehinweise (VergabeScout u. a.) \u2013 kein eigener Live-Abruf, Roadmap-Eintrag.",
    url: "https://www.dtvp.de",
    status: "geplant",
    lastSync: null
  },
  {
    id: "simap",
    name: "SIMAP (Schweiz)",
    description: "Schweizer Ausschreibungsplattform SIMAP \u2013 optional f\xFCr grenznahe DE/CH-Projekte.",
    url: "https://www.simap.ch",
    status: "geplant",
    lastSync: null
  },
  {
    id: "usp-at",
    name: "USP / Lieferanzeiger (\xD6sterreich)",
    description: "Unternehmensserviceportal / Lieferanzeiger AT \u2013 relevant f\xFCr DE-Grenzregionen und DACH-Arbeit.",
    url: "https://www.usp.gv.at",
    status: "geplant",
    lastSync: null
  },
  {
    id: "mock-seed",
    name: "Mock-Seed-Adapter",
    description: "Lokaler Seed-Adapter mit realistischen Beispieldaten f\xFCr Entwicklung und Demo (Medientechnik, Contenterstellung, AV u. a.).",
    url: "local://seed",
    status: "aktiv",
    lastSync: now
  }
];

// src/main/portalAdapters/netServerAdapter.ts
import { createHash } from "crypto";

// src/main/portalAdapters/netServerParse.ts
function decodeHtmlEntities(input) {
  return input.replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&quot;/gi, '"').replace(/&#39;/gi, "'").replace(/&apos;/gi, "'").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&uuml;/gi, "\xFC").replace(/&Uuml;/gi, "\xDC").replace(/&auml;/gi, "\xE4").replace(/&Auml;/gi, "\xC4").replace(/&ouml;/gi, "\xF6").replace(/&Ouml;/gi, "\xD6").replace(/&szlig;/gi, "\xDF").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n))).replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16))).replace(/\s+/g, " ").trim();
}
function stripTags(html) {
  return decodeHtmlEntities(html.replace(/<[^>]+>/g, " "));
}
function parseGermanDate(raw) {
  const m = raw.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})(?:\s+(\d{1,2}):(\d{2}))?/);
  if (!m) {
    const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    return { date: today, dateTime: today };
  }
  const dd = m[1].padStart(2, "0");
  const mm = m[2].padStart(2, "0");
  const yyyy = m[3];
  const date = `${yyyy}-${mm}-${dd}`;
  let hh = m[4] ? m[4].padStart(2, "0") : "00";
  let min = m[5] || "00";
  if (hh === "24") {
    hh = "23";
    min = "59";
  }
  return { date, dateTime: `${date}T${hh}:${min}:00` };
}
function extractReference(title) {
  const m = title.match(/\((\d{2}-\d{4,})\)\s*$/) || title.match(/\b(\d{2}-\d{4,})\b/) || title.match(/\(?(VG-[A-Z0-9_-]+-\d{4}-\d+)\)?/i) || title.match(/\b(VG-[A-Z0-9_-]+-\d{4}-\d+)\b/i);
  return m ? m[1] : null;
}
function netBase(host) {
  const prefix = host.pathPrefix ?? "/NetServer";
  return `${host.origin.replace(/\/$/, "")}${prefix}`;
}
function buildDetailUrl(host, oid, category = "InvitationToTender") {
  const params = new URLSearchParams({
    function: "Detail",
    TOID: oid,
    Category: category
  });
  return `${netBase(host)}/PublicationControllerServlet?${params.toString()}`;
}
function buildSearchUrl(host, opts = {}) {
  const max = opts.max ?? 100;
  const start = opts.start ?? 0;
  const category = opts.category ?? "InvitationToTender";
  const gesetz = opts.gesetzesgrundlage ?? "All";
  return `${netBase(host)}/PublicationSearchControllerServlet?function=SearchPublications&Category=${encodeURIComponent(category)}&Gesetzesgrundlage=${encodeURIComponent(gesetz)}&Max=${max}&Start=${start}&thContext=publications`;
}
function parseNetServerTableHtml(html, host) {
  const rows = [];
  const seen = /* @__PURE__ */ new Set();
  const rowRe = /<(?:tr|tbody)[^>]*class="[^"]*publicationDetail[^"]*"[^>]*data-oid="([^"]+)"[^>]*(?:data-category="([^"]*)")?[^>]*>([\s\S]*?)<\/(?:tr|tbody)>/gi;
  let m;
  while ((m = rowRe.exec(html)) !== null) {
    const oid = decodeHtmlEntities(m[1]);
    const category = decodeHtmlEntities(m[2] || "InvitationToTender");
    const body = m[3];
    const tenderCell = body.match(/<td[^>]*class="[^"]*\btender\b[^"]*"[^>]*>([\s\S]*?)<\/td>/i);
    if (!tenderCell) continue;
    const tds = [...body.matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map((x) => stripTags(x[1]));
    if (tds.length < 5) continue;
    const publishedAtRaw = tds[0];
    const title = stripTags(tenderCell[1]);
    const authorityCell = body.match(
      /<td[^>]*class="[^"]*\btenderAuthority\b[^"]*"[^>]*>([\s\S]*?)<\/td>/i
    );
    let contractingAuthority = "";
    let procedureType = "";
    let legalFramework = "";
    let deadlineRaw = "";
    if (tds.length >= 6) {
      contractingAuthority = authorityCell ? stripTags(authorityCell[1]) : tds[2];
      procedureType = tds[3];
      legalFramework = tds[4];
      deadlineRaw = tds[5];
    } else if (authorityCell) {
      contractingAuthority = stripTags(authorityCell[1]);
      procedureType = tds[3] || "";
      legalFramework = tds[3] || "";
      deadlineRaw = tds[4] || "";
    } else {
      contractingAuthority = "";
      procedureType = tds[2];
      legalFramework = tds[3];
      deadlineRaw = tds[4];
    }
    const reference = extractReference(title);
    if (seen.has(oid)) continue;
    seen.add(oid);
    rows.push({
      oid,
      category,
      publishedAtRaw,
      title,
      reference,
      contractingAuthority,
      procedureType,
      legalFramework,
      deadlineRaw,
      detailUrl: buildDetailUrl(host, oid, category)
    });
  }
  return rows;
}
function parseNetServerListItemHtml(html, host) {
  const rows = [];
  const seen = /* @__PURE__ */ new Set();
  const itemRe = /<div[^>]*role="listitem"[^>]*data-oid="([^"]+)"[^>]*(?:data-category="([^"]*)")?[^>]*>([\s\S]*?)(?=<div[^>]*role="listitem"|$)/gi;
  let m;
  while ((m = itemRe.exec(html)) !== null) {
    const oid = decodeHtmlEntities(m[1]);
    const category = decodeHtmlEntities(m[2] || "InvitationToTender");
    const body = m[3];
    const text = stripTags(body);
    let title = "";
    const strongs = [...body.matchAll(/<strong[^>]*>([\s\S]*?)<\/strong>/gi)].map((x) => stripTags(x[1]));
    if (strongs.length) title = strongs[0];
    if (!title) {
      const bezeich = text.match(/Bezeichnung\s+(.+?)\s+Vergabenummer/i);
      title = bezeich ? bezeich[1].trim() : text.slice(0, 180);
    }
    let reference = extractReference(title) || (() => {
      const vm = text.match(/Vergabenummer\s*\(?\s*(VG-[A-Z0-9_-]+-\d{4}-\d+)\s*\)?/i);
      return vm ? vm[1] : null;
    })();
    const art = text.match(/Art:\s*([^]+?)(?:Vergabestelle:|Abgabefrist:|$)/i);
    const authority = text.match(/Vergabestelle:\s*([^]+?)(?:Abgabefrist:|Art:|$)/i);
    const deadline = text.match(/Abgabefrist:\s*(\d{1,2}\.\d{1,2}\.\d{4}(?:\s+\d{1,2}:\d{2})?)/i);
    const procedureRaw = art ? art[1].trim() : "";
    const parts = procedureRaw.split(",").map((p) => p.trim()).filter(Boolean);
    const publishedAtRaw = "";
    if (seen.has(oid) || !title) continue;
    seen.add(oid);
    const href = body.match(/PublicationControllerServlet\?function=Detail[^"'\s]*/i);
    const detailUrl = href ? `${netBase(host)}/${href[0].replace(/&amp;/g, "&")}` : buildDetailUrl(host, oid, category);
    rows.push({
      oid,
      category,
      publishedAtRaw,
      title,
      reference,
      contractingAuthority: authority ? authority[1].trim() : "",
      procedureType: parts[1] || parts[0] || procedureRaw || "",
      legalFramework: parts[0] || "",
      deadlineRaw: deadline ? deadline[1] : "",
      detailUrl
    });
  }
  return rows;
}
function parseNetServerPublicationHtml(html, host) {
  if (/publicationDetail/i.test(html) && /\btender\b/i.test(html)) {
    return parseNetServerTableHtml(html, host);
  }
  if (/role="listitem"/i.test(html) && /data-oid=/i.test(html)) {
    return parseNetServerListItemHtml(html, host);
  }
  const table = parseNetServerTableHtml(html, host);
  if (table.length) return table;
  return parseNetServerListItemHtml(html, host);
}

// src/main/portalAdapters/tagInfer.ts
var RULES = [
  {
    tag: "Medientechnik",
    patterns: [/medientechnik/i, /\bmedia\b/i, /medienanlage/i, /mediensteuerung/i, /\bmedien\b/i]
  },
  {
    tag: "Multimedia",
    patterns: [/multimedia/i, /interaktiv/i]
  },
  {
    tag: "AV-Technik",
    patterns: [/\bav[- ]?technik\b/i, /\bav\b/i, /audiovisuell/i, /beschallung/i, /konferenztechnik/i]
  },
  {
    tag: "Technik",
    patterns: [/display/i, /led[- ]?wand/i, /beamer/i, /projektor/i, /monitor/i, /touch/i]
  },
  {
    tag: "Content",
    patterns: [/content/i, /contenterstellung/i, /filmproduktion/i, /videoproduktion/i]
  },
  {
    tag: "Contenterstellung",
    patterns: [/contenterstellung/i, /medienproduktion/i]
  },
  {
    tag: "Beleuchtung",
    patterns: [/beleuchtung/i, /lichttechnik/i, /lichtkonzept/i]
  },
  {
    tag: "Digitalisierung",
    patterns: [/digitalisierung/i, /digital signage/i, /\bsignage\b/i]
  },
  {
    tag: "Museum",
    patterns: [/museum/i, /ausstellung/i, /museal/i]
  },
  {
    tag: "Ausstellungsbau",
    patterns: [/ausstellungsbau/i, /szenografie/i, /vitrine/i]
  },
  {
    tag: "Bau",
    patterns: [/\bbau\b/i, /hochbau/i, /tiefbau/i, /neubau/i, /umbau/i, /sanierung/i]
  },
  {
    tag: "TGA",
    patterns: [/\btga\b/i, /heizung/i, /lüftung/i, /lueftung/i, /sanitär/i, /sanitaer/i, /kälte/i, /kaelte/i]
  },
  {
    tag: "Sicherheitstechnik",
    patterns: [/sicherheitstechnik/i, /brandmelde/i, /einbruchmelde/i, /zutrittskontrolle/i]
  },
  {
    tag: "Innenausbau",
    patterns: [/innenausbau/i, /trockenbau/i, /fliesen/i]
  },
  {
    tag: "Grafik",
    patterns: [/grafik/i, /beschriftung/i, /wayfinding/i]
  },
  {
    tag: "M\xF6bel / Vitrinen",
    patterns: [/möbel/i, /moebel/i, /vitrine/i, /einrichtung/i]
  }
];
function inferTagsFromTitle(title, extras = []) {
  const hay = [title, ...extras].join(" ");
  const found = [];
  for (const rule of RULES) {
    if (rule.patterns.some((p) => p.test(hay))) found.push(rule.tag);
  }
  if (!found.length) {
    if (/ingenieur|architekt|hoai|planung/i.test(hay)) found.push("Bau");
    else if (/elektro|technik|anlage/i.test(hay)) found.push("Technik");
    else found.push("Bau");
  }
  return [...new Set(found)];
}
var DEFAULT_MEDIA_KEYWORDS = [
  "Medientechnik",
  "Multimedia",
  "AV",
  "Display",
  "Ausstellung",
  "Museum",
  "Medien",
  "LED",
  "Beamer",
  "Projektor",
  "Touch",
  "Content",
  "Digital Signage",
  "Konferenztechnik",
  "Audiovisuell"
];

// src/main/portalAdapters/syncErrors.ts
function formatPortalSyncError(err, context) {
  const raw = err instanceof Error ? err.message : String(err);
  const label = context?.sourceLabel ? `${context.sourceLabel}: ` : "";
  if (/AbortError|aborted|Zeitüberschreitung|ETIMEDOUT|timeout/i.test(raw)) {
    return `${label}Zeit\xFCberschreitung \u2013 Portal antwortet nicht. Bitte sp\xE4ter erneut versuchen.`;
  }
  if (/ENOTFOUND|getaddrinfo|EAI_AGAIN|DNS/i.test(raw)) {
    return `${label}Portal nicht erreichbar (DNS/Netzwerk). Internetverbindung pr\xFCfen.`;
  }
  if (/ECONNREFUSED|ECONNRESET|EHOSTUNREACH|ENETUNREACH|socket hang up/i.test(raw)) {
    return `${label}Netzwerkfehler beim Erreichen des Portals. Bitte erneut versuchen.`;
  }
  if (/HTTP 503|HTTP 502|HTTP 504/i.test(raw)) {
    return `${label}Portal vor\xFCbergehend nicht verf\xFCgbar (Serverfehler). Sp\xE4ter erneut abrufen.`;
  }
  if (/HTTP 429/i.test(raw)) {
    return `${label}Zu viele Anfragen \u2013 bitte kurz warten und erneut abrufen.`;
  }
  if (/HTTP 403|HTTP 401/i.test(raw)) {
    return `${label}Zugriff verweigert \u2013 \xF6ffentliche Suche ggf. blockiert oder umgeleitet.`;
  }
  if (/HTTP 404/i.test(raw)) {
    return `${label}Such-URL nicht gefunden \u2013 Portal-Pfad hat sich m\xF6glicherweise ge\xE4ndert.`;
  }
  if (/HTTP 4\d\d/i.test(raw)) {
    return `${label}Portal antwortete mit Client-Fehler (${raw.match(/HTTP \d+/)?.[0] || "4xx"}).`;
  }
  if (/HTTP 5\d\d/i.test(raw)) {
    return `${label}Portal-Serverfehler (${raw.match(/HTTP \d+/)?.[0] || "5xx"}). Sp\xE4ter erneut versuchen.`;
  }
  if (/Leere Antwort|empty response|keine Zeilen|0 Zeilen|nicht parsbar|Layout/i.test(raw)) {
    return `${label}Keine Bekanntmachungen gelesen \u2013 Portal leer oder HTML-Layout ge\xE4ndert.`;
  }
  if (/fetch failed|Failed to fetch|network/i.test(raw)) {
    return `${label}Netzwerkanfrage fehlgeschlagen. Verbindung pr\xFCfen und erneut versuchen.`;
  }
  if (/Unbekannt|Stub|nicht freigeschaltet/i.test(raw)) {
    return raw;
  }
  if (label && !raw.startsWith(context.sourceLabel)) return `${label}${raw}`;
  return raw;
}

// src/main/portalAdapters/netServerAdapter.ts
var USER_AGENT = "Nexus/1.7.17 (+https://github.com/networker-vt/ausschreibungen-hub; public publication search only)";
var FETCH_TIMEOUT_MS = 45e3;
function stableId(prefix, row) {
  const hash = createHash("sha1").update(row.oid).digest("hex").slice(0, 12);
  return `${prefix}-oid-${hash}`;
}
function mapNetServerRowToTender(row, cfg, now2 = (/* @__PURE__ */ new Date()).toISOString()) {
  const published = parseGermanDate(row.publishedAtRaw);
  const deadline = parseGermanDate(row.deadlineRaw);
  const tags = inferTagsFromTitle(row.title, [row.procedureType, row.legalFramework]);
  const reference = row.reference || row.oid.slice(0, 32);
  const description = [
    row.title,
    `Verfahrensart: ${row.procedureType}`,
    `Rechtsrahmen: ${row.legalFramework}`,
    `Quelle: \xF6ffentliche Bekanntmachungssuche ${cfg.sourceLabel}`
  ].join("\n");
  return {
    id: stableId(cfg.idPrefix, row),
    title: row.title,
    reference,
    description,
    leistungsgegenstand: row.title,
    contractingAuthority: row.contractingAuthority,
    bundesland: cfg.bundesland,
    city: "",
    publishedAt: published.date,
    deadline: deadline.date,
    submissionDeadline: deadline.date,
    estimatedValue: null,
    currency: "EUR",
    tags,
    source: cfg.sourceLabel,
    sourceUrl: row.detailUrl,
    cpvCodes: [],
    pipelineStatus: "neu",
    notes: "",
    createdAt: now2,
    updatedAt: now2
  };
}
function matchesKeywords(title, keywords, any = true) {
  if (!keywords?.length) return true;
  const hay = title.toLowerCase();
  const hits = keywords.map((k) => hay.includes(k.toLowerCase()));
  return any ? hits.some(Boolean) : hits.every(Boolean);
}
function decodeNetServerHtml(buf) {
  const utf8 = buf.toString("utf8");
  const replacements = (utf8.match(/\uFFFD/g) || []).length;
  const proper = (utf8.match(/[äöüÄÖÜß]/g) || []).length;
  if (replacements > proper) {
    return buf.toString("latin1");
  }
  return utf8;
}
async function fetchNetServerHtml(url, sourceLabel) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    let res;
    try {
      res = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "de-DE,de;q=0.9,en;q=0.5",
          "User-Agent": USER_AGENT
        },
        redirect: "follow",
        signal: controller.signal
      });
    } catch (err) {
      throw new Error(formatPortalSyncError(err, { sourceLabel, url }));
    }
    if (!res.ok) {
      throw new Error(
        formatPortalSyncError(new Error(`NetServer HTTP ${res.status} f\xFCr ${url}`), {
          sourceLabel,
          url
        })
      );
    }
    const buf = Buffer.from(await res.arrayBuffer());
    if (!buf.length) {
      throw new Error(
        formatPortalSyncError(new Error("Leere Antwort vom Portal"), { sourceLabel, url })
      );
    }
    return decodeNetServerHtml(buf);
  } finally {
    clearTimeout(timer);
  }
}
var NetServerPortalAdapter = class {
  id;
  name;
  sourceLabel;
  bundesland;
  status = "live";
  syncable = true;
  linkable = true;
  description;
  searchUrl;
  cfg;
  constructor(cfg) {
    this.cfg = cfg;
    this.id = cfg.id;
    this.name = cfg.name;
    this.sourceLabel = cfg.sourceLabel;
    this.bundesland = cfg.bundesland;
    this.description = cfg.description || `Live: \xF6ffentliche Bekanntmachungssuche auf ${cfg.sourceLabel} (NetServer HTML). Nur PublicationSearch \u2013 kein Dokument-Download, kein Login, kein Bid-Upload.`;
    this.searchUrl = buildSearchUrl(cfg.host, { max: 100, start: 0 });
  }
  async fetchPublications(opts = {}) {
    const max = opts.max ?? 100;
    const pages = Math.max(1, opts.pages ?? 1);
    const start0 = opts.start ?? 0;
    const warnings = [
      "Nur \xF6ffentliche PublicationSearch. Unterlagen-Download/Login ben\xF6tigt sp\xE4ter Zugangsdaten.",
      "Kein automatisches Scraping von gesch\xFCtzten Bereichen."
    ];
    const all = [];
    let fetched = 0;
    try {
      for (let p = 0; p < pages; p++) {
        const start = start0 + p * max;
        const url = buildSearchUrl(this.cfg.host, { max, start });
        const html = await fetchNetServerHtml(url, this.sourceLabel);
        const pageRows = parseNetServerPublicationHtml(html, this.cfg.host);
        fetched += pageRows.length;
        if (!pageRows.length && p === 0) {
          warnings.push(
            "Keine Zeilen geparst \u2013 Portal leer oder HTML-Layout ge\xE4ndert. Sync speichert 0 neue Eintr\xE4ge."
          );
        }
        const now2 = (/* @__PURE__ */ new Date()).toISOString();
        for (const row of pageRows) {
          if (!matchesKeywords(row.title, opts.keywords, opts.keywordAny !== false)) continue;
          all.push(mapNetServerRowToTender(row, this.cfg, now2));
        }
        if (pageRows.length < max) break;
      }
    } catch (err) {
      throw new Error(formatPortalSyncError(err, { sourceLabel: this.sourceLabel }));
    }
    const byId = /* @__PURE__ */ new Map();
    for (const t of all) byId.set(t.id, t);
    return {
      tenders: [...byId.values()],
      fetched,
      filtered: byId.size,
      warnings,
      sourceId: this.id,
      sourceLabel: this.sourceLabel
    };
  }
};
function createNetServerAdapter(cfg) {
  return new NetServerPortalAdapter(cfg);
}
var NETSERVER_LIVE_CONFIGS = [
  {
    id: "vergabe-bw",
    name: "Vergabe Baden-W\xFCrttemberg",
    sourceLabel: "vergabe.landbw.de",
    bundesland: "Baden-W\xFCrttemberg",
    idPrefix: "bw",
    host: { origin: "https://vergabe.landbw.de" }
  },
  {
    id: "vergabe-berlin",
    name: "Vergabekooperation Berlin",
    sourceLabel: "vergabekooperation.berlin",
    bundesland: "Berlin",
    idPrefix: "be",
    host: { origin: "https://vergabekooperation.berlin" }
  },
  {
    id: "vergabe-sachsen",
    name: "eVergabe Sachsen",
    sourceLabel: "evergabe.sachsen.de",
    bundesland: "Sachsen",
    idPrefix: "sn",
    host: { origin: "https://www.evergabe.sachsen.de" }
  },
  {
    id: "vergabe-bremen",
    name: "Vergabe Bremen",
    sourceLabel: "vergabe.bremen.de",
    bundesland: "Bremen",
    idPrefix: "hb",
    host: { origin: "https://vergabe.bremen.de" }
  },
  {
    id: "vergabe-hessen",
    name: "Vergabeplattform Land Hessen",
    sourceLabel: "vergabe.hessen.de",
    bundesland: "Hessen",
    idPrefix: "he",
    host: { origin: "https://vergabe.hessen.de" },
    description: "Live: \xF6ffentliche Bekanntmachungssuche auf vergabe.hessen.de (NetServer Listen-Karten). Nur PublicationSearch \u2013 kein Dokument-Download, kein Login, kein Bid-Upload."
  },
  {
    id: "vergabe-mv",
    name: "Vergabe Mecklenburg-Vorpommern",
    sourceLabel: "vergabe.mv-regierung.de",
    bundesland: "Mecklenburg-Vorpommern",
    idPrefix: "mv",
    host: { origin: "https://vergabe.mv-regierung.de" }
  },
  {
    id: "vergabe-duesseldorf",
    name: "Vergabe D\xFCsseldorf",
    sourceLabel: "vergabe.duesseldorf.de",
    bundesland: "Nordrhein-Westfalen",
    idPrefix: "dd",
    host: { origin: "https://vergabe.duesseldorf.de" }
  },
  {
    id: "vergabe-koeln",
    name: "Vergabe Stadt K\xF6ln",
    sourceLabel: "vergabeplattform.stadt-koeln.de",
    bundesland: "Nordrhein-Westfalen",
    idPrefix: "kn",
    host: { origin: "https://vergabeplattform.stadt-koeln.de" }
  },
  {
    id: "vergabe-lvr",
    name: "Vergabe LVR",
    sourceLabel: "vergabe.lvr.de",
    bundesland: "Nordrhein-Westfalen",
    idPrefix: "lvr",
    host: { origin: "https://vergabe.lvr.de" }
  },
  {
    id: "vergabe-frankfurt",
    name: "Vergabe Stadt Frankfurt",
    sourceLabel: "vergabe.stadt-frankfurt.de",
    bundesland: "Hessen",
    idPrefix: "ffm",
    host: { origin: "https://vergabe.stadt-frankfurt.de" }
  }
];

// src/main/portalAdapters/landBwParse.ts
var LANDBW_HOST = {
  origin: "https://vergabe.landbw.de"
};
function buildSearchUrl2(opts = {}) {
  return buildSearchUrl(LANDBW_HOST, opts);
}

// src/main/portalAdapters/landBw.ts
var LANDBW_SOURCE_ID = "vergabe-bw";
var LANDBW_SOURCE_LABEL = "vergabe.landbw.de";
var LANDBW_BUNDESLAND = "Baden-W\xFCrttemberg";
var CFG = {
  id: LANDBW_SOURCE_ID,
  name: "Vergabe Baden-W\xFCrttemberg",
  sourceLabel: LANDBW_SOURCE_LABEL,
  bundesland: LANDBW_BUNDESLAND,
  idPrefix: "bw",
  host: { origin: "https://vergabe.landbw.de" },
  description: "Live: \xF6ffentliche Bekanntmachungssuche auf vergabe.landbw.de (HTML-Tabelle). Nur PublicationSearch \u2013 kein Dokument-Download, kein Login, kein Bid-Upload."
};
var LandBwPortalAdapter = class {
  inner = createNetServerAdapter(CFG);
  id = this.inner.id;
  name = this.inner.name;
  sourceLabel = this.inner.sourceLabel;
  bundesland = this.inner.bundesland;
  status = "live";
  syncable = true;
  linkable = true;
  description = this.inner.description;
  searchUrl = buildSearchUrl2({ max: 100, start: 0 });
  fetchPublications(opts) {
    return this.inner.fetchPublications(opts);
  }
};
function createLandBwAdapter() {
  return new LandBwPortalAdapter();
}

// src/main/portalAdapters/ted.ts
var TED_SOURCE_ID = "ted";
var TED_SOURCE_LABEL = "ted.europa.eu";
var TED_SEARCH_URL = "https://api.ted.europa.eu/v3/notices/search";
var USER_AGENT2 = "Nexus/1.7.17 (+https://github.com/networker-vt/ausschreibungen-hub; TED public search only)";
var FETCH_TIMEOUT_MS2 = 45e3;
var DEFAULT_FIELDS = ["ND", "TI", "PD", "CY", "DT", "AA", "OJ"];
function pickTitle(ti) {
  if (!ti) return "";
  if (typeof ti === "string") return ti;
  if (typeof ti === "object" && ti) {
    const o = ti;
    return o.deu || o.eng || o.ger || Object.values(o)[0] || "";
  }
  return String(ti);
}
function pickDeadline(dt) {
  if (!dt) return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const raw = Array.isArray(dt) ? dt[0] : dt;
  const s = String(raw);
  const m = s.match(/(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function pickAuthority(aa) {
  if (!aa) return "TED / EU";
  if (Array.isArray(aa)) return aa.map(String).join(", ");
  return String(aa);
}
function publicationDate(pd) {
  const s = String(pd || "");
  const m = s.match(/(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function buildExpertQuery(keywords) {
  const kws = keywords?.length ? keywords : DEFAULT_MEDIA_KEYWORDS.slice(0, 8);
  const ft = kws.map((k) => `FT ~ "${k.replace(/"/g, "")}"`).join(" OR ");
  const since = /* @__PURE__ */ new Date();
  since.setMonth(since.getMonth() - 9);
  const y = since.getUTCFullYear();
  const m = String(since.getUTCMonth() + 1).padStart(2, "0");
  const d = String(since.getUTCDate()).padStart(2, "0");
  return `CY = DEU AND PD >= ${y}${m}${d} AND (${ft})`;
}
function mapNotice(n, now2) {
  const nd = String(n.ND || n["publication-number"] || "");
  const title = pickTitle(n.TI) || `TED-Bekanntmachung ${nd}`;
  const publishedAt = publicationDate(n.PD);
  const deadline = pickDeadline(n.DT);
  const tags = inferTagsFromTitle(title);
  const noticeUrl = nd ? `https://ted.europa.eu/en/notice/-/detail/${encodeURIComponent(nd)}` : "https://ted.europa.eu";
  return {
    id: `ted-${nd || createFallbackId(title)}`,
    title,
    reference: nd || title.slice(0, 40),
    description: [
      title,
      `TED publication-number: ${nd}`,
      `Quelle: TED Search API (\xF6ffentlich, ohne API-Key)`
    ].join("\n"),
    leistungsgegenstand: title,
    contractingAuthority: pickAuthority(n.AA),
    bundesland: "",
    city: "",
    publishedAt,
    deadline,
    submissionDeadline: deadline,
    estimatedValue: null,
    currency: "EUR",
    tags,
    source: TED_SOURCE_LABEL,
    sourceUrl: noticeUrl,
    cpvCodes: [],
    pipelineStatus: "neu",
    notes: "",
    createdAt: now2,
    updatedAt: now2
  };
}
function createFallbackId(title) {
  let h = 0;
  for (let i = 0; i < title.length; i++) h = h * 31 + title.charCodeAt(i) >>> 0;
  return `anon-${h.toString(16)}`;
}
var TedPortalAdapter = class {
  id = TED_SOURCE_ID;
  name = "TED (EU-Bekanntmachungen)";
  sourceLabel = TED_SOURCE_LABEL;
  bundesland = "";
  status = "live";
  syncable = true;
  linkable = true;
  description = "Live: \xF6ffentliche TED-Bekanntmachungen (Deutschland, Medientechnik/AV). Kein API-Key. Verkn\xFCpfen \xF6ffnet die menschliche Suche, nicht die Maschinen-API.";
  searchUrl = "https://ted.europa.eu/de/search/result";
  async fetchPublications(opts = {}) {
    const limit = Math.min(100, opts.max ?? 50);
    const pages = Math.max(1, opts.pages ?? 1);
    const warnings = [
      "TED Search API: nur ver\xF6ffentlichte Notices (anonymous). Kein API-Key.",
      `Fetch: POST ${TED_SEARCH_URL} mit Expert-Query CY=DEU + FT~Keywords.`,
      "Dokument-/XML-Bulk und unpublished endpoints ben\xF6tigen ggf. API-Key \u2014 hier nicht genutzt."
    ];
    const all = [];
    let fetched = 0;
    const query = buildExpertQuery(opts.keywords);
    try {
      for (let page = 1; page <= pages; page++) {
        const body = {
          query,
          fields: [...DEFAULT_FIELDS],
          limit,
          scope: "ACTIVE",
          paginationMode: "PAGE_NUMBER",
          page,
          checkQuerySyntax: false
        };
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS2);
        let res;
        try {
          res = await fetch(TED_SEARCH_URL, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "User-Agent": USER_AGENT2
            },
            body: JSON.stringify(body),
            signal: controller.signal
          });
        } catch (err) {
          throw new Error(formatPortalSyncError(err, { sourceLabel: this.sourceLabel }));
        } finally {
          clearTimeout(timer);
        }
        if (!res.ok) {
          const errText = await res.text().catch(() => "");
          throw new Error(
            formatPortalSyncError(new Error(`TED HTTP ${res.status}: ${errText.slice(0, 200)}`), {
              sourceLabel: this.sourceLabel
            })
          );
        }
        const data = await res.json();
        if (data.timedOut) {
          warnings.push("TED meldete timedOut=true \u2014 Ergebnisse ggf. unvollst\xE4ndig.");
        }
        const notices = data.notices || [];
        fetched += notices.length;
        const now2 = (/* @__PURE__ */ new Date()).toISOString();
        for (const n of notices) {
          all.push(mapNotice(n, now2));
        }
        if (notices.length < limit) break;
      }
    } catch (err) {
      throw new Error(formatPortalSyncError(err, { sourceLabel: this.sourceLabel }));
    }
    const byId = /* @__PURE__ */ new Map();
    for (const t of all) byId.set(t.id, t);
    return {
      tenders: [...byId.values()],
      fetched,
      filtered: byId.size,
      warnings,
      sourceId: this.id,
      sourceLabel: this.sourceLabel
    };
  }
};
function createTedAdapter() {
  return new TedPortalAdapter();
}

// src/main/portalAdapters/stubs.ts
function stub(id, name, sourceLabel, bundesland, searchUrl, description) {
  return {
    id,
    name,
    sourceLabel,
    bundesland,
    status: "stub",
    syncable: false,
    linkable: true,
    description,
    searchUrl,
    async fetchPublications(_opts) {
      return {
        tenders: [],
        fetched: 0,
        filtered: 0,
        warnings: [
          `${name}: Verkn\xFCpfung / Link \u2014 kein Live-Abruf ohne Login. Bitte \u201EVerkn\xFCpfen\u201C / \u201EIm Portal \xF6ffnen\u201C. Teilnahme vorbereiten; Upload erst nach Freigabe im Portal.`
        ],
        sourceId: id,
        sourceLabel
      };
    }
  };
}
function getStubPortalAdapters() {
  return [
    // —— Meist genutzte nationale Portale (Link) ——
    stub(
      "evergabe-de",
      "evergabe.de",
      "evergabe.de",
      "",
      "https://www.evergabe.de",
      "Verkn\xFCpfung / Link: gro\xDFe Abwicklungsplattform (AI). Kein Live-Listenabruf in Nexus \u2014 Portal im Browser \xF6ffnen."
    ),
    stub(
      "bund",
      "eVergabe-Online (Bund)",
      "evergabe-online.de",
      "",
      "https://www.evergabe-online.de",
      "Verkn\xFCpfung / Link: eVergabe-Online des Bundes. Bekanntmachungen oft hinter Anmeldung \u2014 kein Fake-Live-Sync."
    ),
    stub(
      "dtvp",
      "DTVP (Deutsches Vergabeportal)",
      "dtvp.de",
      "",
      "https://www.dtvp.de",
      "Verkn\xFCpfung / Link: nationale cosinex-Plattform. Suche/Unterlagen hinter Login \u2014 nur Verkn\xFCpfung in Nexus."
    ),
    stub(
      "meinauftrag-rib",
      "meinauftrag (RIB / iTWO)",
      "meinauftrag.rib.de",
      "",
      "https://meinauftrag.rib.de",
      "Verkn\xFCpfung / Link: RIB meinauftrag \u2014 h\xE4ufig Bau/AVA/GAEB-nah. Kein Login-Scraper in Nexus."
    ),
    stub(
      "subreport",
      "subreport ELViS",
      "subreport.de",
      "",
      "https://www.subreport.de",
      "Verkn\xFCpfung / Link: subreport/ELViS. Bieterzugang im Portal \u2014 Nexus speichert nur die Verkn\xFCpfung."
    ),
    stub(
      "service-bund",
      "service.bund.de (Bekanntmachungen)",
      "service.bund.de",
      "",
      "https://www.service.bund.de",
      "Verkn\xFCpfung / Link: amtliche Bekanntmachungs\xFCbersicht. Kein maschineller Listen-Abruf in Nexus."
    ),
    stub(
      "vergabe24",
      "Vergabe24 / Cosinex",
      "vergabe24.de",
      "",
      "https://www.vergabe24.de",
      "Verkn\xFCpfung / Link: Vergabe24. Einzelne L\xE4nder-/Stadt-NetServer (BW, Berlin, MV, \u2026) sind separat live."
    ),
    stub(
      "vergabe-hamburg",
      "Vergabe Hamburg",
      "fbhh-vergabe.hamburg.de",
      "Hamburg",
      "https://fbhh-vergabe.hamburg.de",
      "Verkn\xFCpfung / Link: Hamburg-Vergabeplattform (kein \xF6ffentliches NetServer-HTML)."
    ),
    stub(
      "vergabe-nrw",
      "evergabe.NRW",
      "evergabe.nrw.de",
      "Nordrhein-Westfalen",
      "https://www.evergabe.nrw.de",
      "Verkn\xFCpfung / Link: evergabe.nrw.de. \xD6ffentliche Suche im Portal \u2014 kein Login in Nexus."
    ),
    stub(
      "evergabe-bayern",
      "eVergabe Bayern",
      "evergabe.bayern.de",
      "Bayern",
      "https://www.evergabe.bayern.de",
      "Verkn\xFCpfung / Link: Bayern-Portal. Teilnahme und Unterlagen dort \u2014 Nexus nur Verweis."
    ),
    stub(
      "vergabe-brandenburg",
      "Vergabe Brandenburg",
      "vergabemarktplatz.brandenburg.de",
      "Brandenburg",
      "https://vergabemarktplatz.brandenburg.de",
      "Verkn\xFCpfung / Link: Vergabemarktplatz Brandenburg (kein \xF6ffentliches NetServer-PublicationSearch)."
    ),
    stub(
      "vergabe-rlp",
      "Vergabe Rheinland-Pfalz",
      "vergabe.rlp.de",
      "Rheinland-Pfalz",
      "https://www.vergabe.rlp.de",
      "Verkn\xFCpfung / Link: VMP Rheinland-Pfalz (Welcome/Login-Oberfl\xE4che, kein \xF6ffentliches NetServer-HTML)."
    ),
    stub(
      "vergabe-niedersachsen",
      "Vergabe Niedersachsen",
      "vergabe.niedersachsen.de",
      "Niedersachsen",
      "https://vergabe.niedersachsen.de",
      "Verkn\xFCpfung / Link: Landesportal Niedersachsen. Kein \xF6ffentliches NetServer-Listen-HTML."
    ),
    stub(
      "bi-vergabe",
      "bi-medien / bi-vergabe",
      "bi-medien.de",
      "",
      "https://www.bi-medien.de",
      "Verkn\xFCpfung / Link: Branchen-Aggregator. Kein eigener Live-Abruf."
    ),
    stub(
      "ausschreibungen-de",
      "Ausschreibungen Deutschland",
      "ausschreibungen-deutschland.de",
      "",
      "https://www.ausschreibungen-deutschland.de",
      "Verkn\xFCpfung / Link: Aggregator. Offizielle Verfahren weiter \xFCber das jeweilige Portal."
    ),
    stub(
      "vergabescout",
      "VergabeScout (Hinweis)",
      "dtvp.de",
      "",
      "https://www.dtvp.de",
      "Verkn\xFCpfung / Link / Hinweis. Live-Suche \xFCber DTVP oder die L\xE4nder-Portale."
    ),
    stub(
      "simap",
      "SIMAP (Schweiz)",
      "simap.ch",
      "",
      "https://www.simap.ch",
      "Verkn\xFCpfung / Link: Schweizer Plattform (DACH). Kein DE-NetServer."
    ),
    stub(
      "usp-at",
      "USP / Lieferanzeiger (\xD6sterreich)",
      "usp.gv.at",
      "",
      "https://www.usp.gv.at",
      "Verkn\xFCpfung / Link: \xF6sterreichisches Unternehmensserviceportal."
    ),
    stub(
      "ted-api",
      "TED \u2013 \xF6ffentliche Suche (Link)",
      "ted.europa.eu",
      "",
      "https://ted.europa.eu/de/search/result",
      "Alias zum Live-Adapter \u201ETED\u201C: hier nur der menschliche Suchlink. Abruf l\xE4uft \xFCber TED Search API."
    )
  ];
}

// src/main/portalAdapters/priority.ts
var PORTAL_SORT_PRIORITY = {
  // Top link portals (Mirco + research)
  "evergabe-de": 10,
  bund: 11,
  dtvp: 20,
  "meinauftrag-rib": 30,
  subreport: 40,
  // Live discovery
  ted: 50,
  // NetServer Länder (keep live; after top national portals)
  "vergabe-bw": 100,
  "vergabe-berlin": 101,
  "vergabe-sachsen": 102,
  "vergabe-bremen": 103,
  "vergabe-hessen": 104,
  "vergabe-mv": 105,
  "vergabe-duesseldorf": 106,
  "vergabe-koeln": 107,
  "vergabe-lvr": 108,
  "vergabe-frankfurt": 109,
  // Other link-only
  "service-bund": 200,
  vergabe24: 210,
  "vergabe-nrw": 220,
  "evergabe-bayern": 230,
  "vergabe-hamburg": 240,
  "vergabe-brandenburg": 250,
  "vergabe-rlp": 260,
  "vergabe-niedersachsen": 270,
  "bi-vergabe": 280,
  "ausschreibungen-de": 290,
  vergabescout: 300,
  simap: 310,
  "usp-at": 320,
  "ted-api": 330
};
function portalSortPriority(id) {
  return PORTAL_SORT_PRIORITY[id] ?? 500;
}
function comparePortalPriority(aId, bId) {
  const d = portalSortPriority(aId) - portalSortPriority(bId);
  if (d !== 0) return d;
  return aId.localeCompare(bId, "de");
}

// src/main/portalAdapters/registry.ts
var cached = null;
function getPortalListAdapters() {
  if (!cached) {
    const landBw = createLandBwAdapter();
    const otherNet = NETSERVER_LIVE_CONFIGS.filter((c) => c.id !== LANDBW_SOURCE_ID).map(
      (c) => createNetServerAdapter(c)
    );
    cached = [landBw, ...otherNet, createTedAdapter(), ...getStubPortalAdapters()].sort(
      (a, b) => comparePortalPriority(a.id, b.id)
    );
  }
  return cached;
}

// src/main/sources.ts
var FUTURE_ADAPTER_IDS = SEED_SOURCES.filter((s) => s.id !== "mock-seed").map((s) => s.id);
function listPortalAdapters() {
  return getPortalListAdapters();
}

// src/main/deadline.ts
function daysUntilDeadline(dateStr, now2 = Date.now()) {
  if (dateStr == null) return null;
  const raw = String(dateStr).trim();
  if (!raw) return null;
  const iso = raw.length === 10 ? `${raw}T23:59:59` : raw;
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return null;
  return Math.ceil((t - now2) / 864e5);
}

// src/web/sync/fetchTenders.ts
var PUBLIC_FIELDS = [
  "id",
  "title",
  "reference",
  "description",
  "leistungsgegenstand",
  "contractingAuthority",
  "bundesland",
  "city",
  "publishedAt",
  "deadline",
  "submissionDeadline",
  "estimatedValue",
  "currency",
  "tags",
  "source",
  "sourceUrl",
  "cpvCodes",
  "createdAt",
  "updatedAt"
];
function publicOnly(t, sourceId) {
  const o = {};
  for (const k of PUBLIC_FIELDS) o[k] = t[k];
  o.pipelineStatus = "neu";
  o.notes = "";
  o.sourceId = sourceId;
  return o;
}
function isCurrent(t) {
  const d = daysUntilDeadline(t.submissionDeadline || t.deadline);
  return d == null || d >= 0;
}
async function main() {
  const outPath = process.argv[2] || "site/data/tenders.json";
  const previousUrl = process.argv[3] || "";
  const adapters = listPortalAdapters();
  const reports = [];
  const byId = /* @__PURE__ */ new Map();
  let expiredDropped = 0;
  for (const a of adapters) {
    const live = a.status === "live" && a.syncable;
    const base = {
      id: a.id,
      name: a.name,
      sourceLabel: a.sourceLabel,
      bundesland: a.bundesland,
      status: a.status,
      live,
      ok: false,
      fetched: 0,
      count: 0,
      fetchedAt: null,
      warnings: [],
      searchUrl: a.searchUrl,
      description: a.description,
      sortPriority: portalSortPriority(a.id)
    };
    if (!live) {
      reports.push({
        ...base,
        error: "Stub / Verkn\xFCpfung \u2013 kein \xF6ffentlicher Live-Abruf. Bitte im Portal selbst suchen."
      });
      continue;
    }
    const started = Date.now();
    try {
      const res = await a.fetchPublications({ max: 100, pages: 2, start: 0 });
      let count = 0;
      for (const t of res.tenders) {
        if (!isCurrent(t)) {
          expiredDropped++;
          continue;
        }
        byId.set(t.id, publicOnly(t, a.id));
        count++;
      }
      reports.push({
        ...base,
        ok: true,
        fetched: res.fetched,
        count,
        fetchedAt: (/* @__PURE__ */ new Date()).toISOString(),
        warnings: res.warnings.slice(0, 5)
      });
      console.log(`OK   ${a.id}: ${count} aktuell (${res.fetched} abgerufen, ${Date.now() - started} ms)`);
    } catch (err) {
      const error = formatPortalSyncError(err, { sourceLabel: a.sourceLabel });
      reports.push({ ...base, error });
      console.log(`FAIL ${a.id}: ${error}`);
    }
  }
  const liveOk = reports.filter((r) => r.live && r.ok).length;
  let stale = false;
  let tenders = [...byId.values()];
  if (liveOk === 0 && previousUrl) {
    try {
      const prev = await (await fetch(previousUrl)).json();
      tenders = (prev.tenders || []).filter(isCurrent);
      stale = true;
      console.log(`Alle Live-Abrufe fehlgeschlagen \u2014 behalte ${tenders.length} Verfahren vom letzten Stand.`);
    } catch (err) {
      console.log("Vorheriger Stand nicht ladbar:", err instanceof Error ? err.message : err);
    }
  }
  tenders.sort(
    (x, y) => String(x.submissionDeadline || x.deadline || "9999").localeCompare(String(y.submissionDeadline || y.deadline || "9999"))
  );
  const payload = {
    schema: 1,
    generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    stale,
    schedule: "alle 3 Stunden (GitHub Actions) + manuell",
    note: "Nur \xF6ffentliche Bekanntmachungen aktueller Verfahren. Abgelaufene Fristen werden entfernt.",
    liveAdapters: reports.filter((r) => r.live).length,
    liveAdaptersOk: liveOk,
    expiredDropped,
    adapters: reports,
    tenders
  };
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify(payload));
  console.log(`
${tenders.length} Verfahren \u2192 ${outPath} (${liveOk}/${payload.liveAdapters} Live-Portale ok)`);
  if (liveOk === 0 && !stale) process.exitCode = 1;
}
void main();
