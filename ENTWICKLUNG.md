# Skinny Bitches — Stand & Übergabe

Kurzbrief für die Weiterentwicklung (Mensch + KI). Stand: Juni 2026.

## Was ist das?
Statische Vintage-Website (HTML/CSS/JS, **kein Build, kein Framework**) für das Lauf-Spassprojekt „Skinny Bitches" in Boltigen. Vier Personen werden wöchentlich gewogen, BMI/Kurven/Ranking rechnen sich aus den Daten. Ton: Billy-Hill-Outlaw (derb, Schweizerdeutsch). Look: Holzschnitt/Letterpress, schwarz/creme + Oxblood, dunkler Hero.

## Wo läuft's?
- **Repo:** github.com/schafrod/skinny-bitches (öffentlich, Branch `main`)
- **Live:** https://www.skinny-bitches.ch (GitHub Pages, baut bei jedem Push). Apex `skinny-bitches.ch` leitet per 301 auf `www`.
- **GitHub-URL:** https://schafrod.github.io/skinny-bitches/ (leitet auf die Custom Domain um)
- **Custom Domain:** `CNAME`-Datei im Repo (`www.skinny-bitches.ch`); DNS bei Hosttech (Apex A/AAAA auf GitHub-Pages-IPs, `www` CNAME auf `schafrod.github.io`).
- **Lokal ansehen:** `python3 -m http.server 8000` im Projektordner → http://localhost:8000
- **Besucher-Statistik:** GoatCounter — Dashboard **https://skinny-bitches.goatcounter.com** (gratis, kein Cookie, ignoriert localhost). Snippet steht am Ende von `index.html` vor `</body>`.

## Aufbau
`index.html` (Struktur + Texte, inkl. JSON-LD Structured Data im `<head>`) · `css/style.css` (Stil) · `js/main.js` (rendert Karten/Charts/Ranking **und das Logbuch** aus den Daten) · `data.js` (**die Wochen-Datei**: `people` mit `history` + `log`-Array) · `assets/` (Logo, freigestellte Porträts, Ziel-Foto, `og-image.jpg` für Social-Vorschau, `favicon-32/180.png`) · `robots.txt` + `sitemap.xml` (SEO).

Seiten-Reihenfolge: Hero (dunkel) → Mission → Crew (4 Karten) → Ogi-Weg (Strecke + echtes Höhenprofil) → Kurven → **Logbuch** (Timeline) → Hall of Shame → Das Ziel → Sponsoren → **FAQ** (Akkordeon) → Footer (dunkel).

Social-Vorschaubild (Open Graph) `assets/og-image.jpg` (1200×630, absolute URL in den Meta-Tags). Bei Bild-Änderung den `?v=N` an der og:image-URL erhöhen, damit WhatsApp/Facebook den Cache neu zieht.

## Wöchentliches Update (das Einzige, was regelmässig zu tun ist)
In `data.js` bei jeder Person unten im `history`-Array einen Eintrag anhängen:
```js
{ date: "2026-06-04", weightKg: 163.1, km: 10.4 }
```
(Komma als **Punkt**; `km` = Total kumuliert, +2.79 pro Runde — an einem reinen Wäge-Donnerstag ohne Lauf bleibt km gleich.) Oben `lastUpdate` setzen. Dann committen + pushen. BMI, Fortschritt, Charts, Ranking rechnen sich selbst. `data.js` wird per Zeitstempel geladen → Updates sofort sichtbar (kein Cache-Problem).

**Montag = Lauftag (km-only):** An einem reinen Lauftag NICHT wägen → Eintrag mit `km`, **ohne** `weightKg`, z.B. `{ date: "2026-06-08", km: 6.20 }`. `main.js` behandelt das sauber (km-Punkt im km-Chart, kein Punkt im Gewichts-Chart; Karte nimmt Gewicht/BMI aus dem letzten Wäge-Eintrag via `currW`/`startW`). Nur Läufer kriegen einen Eintrag. `lastUpdate` darf auch auf einen Montag gesetzt werden (Stand = letzte Datenänderung).

**Logbuch:** nach jedem Lauf (Mo) und jeder Wägung (Do) unten im `log`-Array einen Eintrag anhängen: `{ date: "JJJJ-MM-TT", typ: "lauf" | "waage", title: "Knappe Überschrift", text: "dein Kommentar" }`. **`title` ist Pflicht** (3–6 Wörter): die Einträge sind ein Akkordeon (`<details>`) — nur der neueste ist offen, die älteren zugeklappt; zugeklappt sieht man Datum + Tag + `title`. Neuester erscheint zuoberst. Das ist der erzählerische Teil — kurz, frech, mit Zahlen. Längere Einträge: Absätze mit `\n\n` im `text` trennen (renderLog macht daraus mehrere `<p>`).

**Lauf-Fotos:** Ein Logbuch-Eintrag kann `photoDir` + `photos: [{ file, caption }]` haben → Thumbnail-Reihe unter dem Text, Klick öffnet ein Lightbox-Overlay (`wireLightbox` in main.js; Esc/Klick schliesst). Bilder liegen in `assets/runs/JJJJ-MM-TT/`: pro Foto `<slug>.jpg` (Vollbild ~1600px) **und** `<slug>-t.jpg` (Thumb ~440px). Original-Fotos kommen nach `Fotos/` (gitignored) und werden mit PIL verkleinert/komprimiert (EXIF-Drehung via `ImageOps.exif_transpose`), Vintage-Sepia per CSS-`filter`.

## Wichtig bei Design-Änderungen
CSS und JS sind in `index.html` mit `?v=N` versioniert (aktuell `style.css?v=31`, `main.js?v=25`). km-Chart zeichnet Punkte nur bei echtem Lauf (km gestiegen) — Wäge-Einträge tragen km zwar mit, erzeugen aber keinen Knoten. **Ticker:** Telegramm-Laufband unter der Nav zeigt automatisch die letzten 3 Logbuch-Titel (`renderTicker` in main.js) — beim Wochenupdate nichts extra zu pflegen. **Wer CSS oder JS ändert, muss die Nummer erhöhen** — sonst zeigt der Browser die alte Datei. (`data.js` braucht das nicht.)

## Die Crew (alle Werte echt)
| Person | Nick | Rolle | Grösse | Jg. | Start-kg |
|---|---|---|---|---|---|
| Chrigu Schafroth | El Gordo | Opfer | 187 | 1983 | 165,3 |
| Severin Matti | Rocket-Man | Opfer | 185 | 1998 | 149 |
| Lars Klossner | Mr. Sexybless | Coach (erbt auch) | 176 | 1999 | 84,5 |
| Mika Klossner | Mother²-Mikl | Coach (nimmt zu) | 182 | 1997 | 81 |

Mika war am 1.6. nicht beim Lauf (km 0). „Opfer" = Trainee-Rolle. Auf der Seite werden nur Vornamen gezeigt. (Lars-Start am 4.6. von 83 auf **84,5** korrigiert.)

**Daten-Flags in `data.js`:** `weightTrend` `"up"` = soll/darf zunehmen (Mika **und Lars** — „Erben"; abnehmen liest dann als „Erben misslingt"). `estimated: true` bei Mika (keine Waage) → Karte zeigt „≈" vor Gewicht/BMI, Notiz „Schätzung", und im Chart hohle statt volle Punkte (`main.js` nutzt `PAPER`).

**Hall of Shame** wertet den **Fortschritt Richtung eigenes Ziel, relativ zum Ausgangsgewicht (%)** (Opfer = abgenommen, Coach = zugenommen/„geerbt"). Anzeige: % gross, kg + Tag klein darunter. Ein gemeinsames Ranking; Lager via Trenner „die Abnehmer" / „die Erber" + Rollen-Tag getrennt. Coaches landen realistisch auf 3/4. (JS rendert ins `#shame-list`-Div — **nicht** in die `<section id="shame">`; die Sektion-ID dient nur dem Nav-Anker. Vorher kollidierten beide IDs und das Ranking wurde ohne `.wrap`/Titel full-bleed gerendert — behoben.) Die „Erben"-Regel (beide Coaches) ist in Mission + Kurven-Text erklärt (separate FAQ dazu wurde wieder entfernt). **Charts:** Y-Achsen nutzen `niceBounds()` — runde Grenzen + Schrittweite (1/2/2.5/5/10 × 10^n), ganzzahlige Beschriftung, mehrere Gitterlinien (statt nur Min/Mitte/Max). Hover/Tap auf die Punkte zeigt einen interaktiven Tooltip (Name, Datum, Wert) — grosse transparente Hit-Kreise + `.charttip`-Div, gesteuert in `main.js`/`wireChartTooltips`. Distanzen werden überall auf 1 Kommastelle gerundet angezeigt (2,79 km → „2,8 km").

## Stand der Zahlen (Stand 29.6.2026)
Läufe bis **29.6.**: 1.6. Auftakt · 8.6. Chrigu solo (Anaconda) · 9.6. Crew komplett (+3,41) · 15.6./22.6. Chrigu+Severin Ogi-Weg · 17.6./25.6. Chrigu solo · 23.6. Chrigu+Severin+Lars (Lars zurück) · 29.6. Chrigu+Severin+Lars (erster Anaconda-Feindkontakt, Severin rettet Lars). Wägungen: **4.6. · 11.6. · 18.6. · 25.6.** (Chrigu unter 160!).

| Person | kg (Δ seit Start) | km total |
|---|---|---|
| Chrigu | 159,6 (−5,7) | 26,35 |
| Severin | 147,3 (−1,7) | 18,75 |
| Lars | 83,5 (−1,0, „Erben misslingt") | 11,78 |
| Mika | ≈81,2 (+0,2, geschätzt) | 3,41 |

**Mika = MISSED IN ACTION (seit 20.7.):** Nachruf-Logbucheintrag „Missed in Action: Mother²-Mikl" (eigener `typ: "nachruf"` mit gefülltem Badge + s/w-Todesanzeigen-Foto). Sein `people`-Objekt ist seit 23.7. wieder aktiv als **Gedenk-Karte** (`memorial: true`): erscheint in der Crew (s/w-Porträt mit Trauerrand, Badge „Vermisst", Bilanz eingefroren, Box „Vermisst seit 9.6.26 — zuletzt gesehen vor dem Volg"), zählt aber **nicht** in Kurven/Hall of Shame/Legende. Rückkehr = `memorial` entfernen, history normal weiterführen, Seiten-Texte zurückdrehen (Mission/Crew/Kurven/Shame/FAQ sprechen von 3er-Crew + Vermisstem). `.card--fade-1..4`-CSS bleibt für künftige Verblass-Fälle.

## Strecke (aus echter GPX)
Rundkurs Schinti → Boltigen → Schinti, **2,79 km, 159 hm, höchster Punkt 855 m**. Höhenprofil ist aus der echten GPX gezeichnet (`Skinny-Bitch-Track.gpx`, liegt auf Christians Desktop), im flachen SchweizMobil-Maßstab mit beschrifteten Achsen. (Anzeige rundet auf 1 Kommastelle → „2,8 km".)

**Anaconda-Loop:** erweiterter Rundkurs (Ogi-Weg + Helsana-Trails der Simme entlang) = **3,41 km, 200 hm**. Gibt pro Lauf **+3,41 km**. SchweizMobil-Tracks: Ogi-Weg `372593981` (2,79 km) · Ogi+Anaconda `1341889130` (3,41 km). Seit 27.7. in der Strecken-Sektion sichtbar: Anaconda-Werte farblich (Oxblood) in den km/hm-Stat-Kacheln (`route.anaconda` in data.js), und das Höhenprofil zeigt **zwei überlagerte Profile** (beide aus der SchweizMobil-API, gemeinsame X-Achse 0–3,4 km): Ogi = Ink-Linie + Schraffur-Fill, **endet sichtbar bei 2,8 km** mit Endpunkt-Marker; Anaconda = **gestrichelte Oxblood-Linie** bis 3,4 km mit eigenem Endpunkt (auf gemeinsamen Abschnitten scheint Ink durch die Strichlücken). + Legende mit beiden Enden + zweiter SchweizMobil-Link. (Frühere Varianten — zwei solide Voll-Linien bzw. Ein-Linien-Profil mit Blood-Segment — wurden verworfen.) API-Hinweis: `https://map.schweizmobil.ch/api/4/tracks/<id>` (mit `-L`, Redirect!) liefert `properties.profile` als **JSON-String** ([E, N, Höhe, Distanz]-Tupel) + `meta` (length/totalup/elemax). Y-Kalibrierung des Profil-SVG: h=850→y=34.4, h=800→y=115.7.

## Offen / nächste Schritte
1. Wöchentlich pflegen: **Mo Lauf** = km-only-Eintrag(e) + Logbuch (typ „lauf"), **Do Wägung** = Gewicht + Logbuch (typ „waage"). Fotos optional an den Eintrag.
2. Wachstums-Motor (angeboten, noch nicht gebaut): Medien-Pitch, Sponsoren-One-Pager/Media-Kit, Social-Content-System — siehe Memory.
3. **Google Search Console:** Einrichtung gestartet (Domain-Property `skinny-bitches.ch`, DNS-TXT bei Hosttech; Sitemap als VOLLE URL einreichen → `https://www.skinny-bitches.ch/sitemap.xml`). Indexierungs-Status prüfen — Seite war Mitte Juni noch nicht indexiert (normal für neue Domain). **Hero-Klarheit für Erstbesucher** (Orientierungs-Zeile) lag als Vorschlag vor, wurde verschoben.

**Erledigt:** Go-Live www.skinny-bitches.ch inkl. **HTTPS** (Apex→www). Sponsoren-Sektion „Die Komplizen" + Kontakt-CTA (info@simmental.digital), dunkle Fusszeile, Crew-Vornamen, SEO-Hygiene (JSON-LD/sitemap/robots/Favicon), Social-Vorschaubild, **GoatCounter-Statistik**, **Logbuch** mit **Lauf-Fotos + Lightbox**, km-only-Lauftage, Hall-of-Shame-Wertung in **% vom Start** (Lager getrennt), lesbare **Chart-Achsen** (`niceBounds`) + Hover-Tooltips, **Logbuch-Akkordeon** (nur neuester offen, `title` pro Eintrag), **Nav-Autohide** beim Scrollen, Hero-Logo-Puls. Daten bis **Lauf 23.6.** eingetragen.

## Eine neue Session fortsetzen
Im Ordner `/Users/Shared/CC_Git/Skinny Bitches` eine neue Claude-Session starten — das Projektgedächtnis lädt automatisch. Einfach sagen: *„Mach bei den Skinny Bitches weiter, lies ENTWICKLUNG.md und das Memory."*
