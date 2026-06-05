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

**Logbuch:** nach jedem Lauf (Mo) und jeder Wägung (Do) unten im `log`-Array einen Eintrag anhängen: `{ date: "JJJJ-MM-TT", typ: "lauf" | "waage", text: "dein Kommentar" }`. Neuester erscheint zuoberst. Das ist der erzählerische Teil — kurz, frech, mit Zahlen.

## Wichtig bei Design-Änderungen
CSS und JS sind in `index.html` mit `?v=N` versioniert (aktuell `style.css?v=19`, `main.js?v=12`). **Wer CSS oder JS ändert, muss die Nummer erhöhen** — sonst zeigt der Browser die alte Datei. (`data.js` braucht das nicht.)

## Die Crew (alle Werte echt)
| Person | Nick | Rolle | Grösse | Jg. | Start-kg |
|---|---|---|---|---|---|
| Chrigu Schafroth | El Gordo | Opfer | 187 | 1983 | 165,3 |
| Severin Matti | Rocket-Man | Opfer | 185 | 1998 | 149 |
| Lars Klossner | Mr. Sexybless | Coach (erbt auch) | 176 | 1999 | 84,5 |
| Mika Klossner | Mother²-Mikl | Coach (nimmt zu) | 182 | 1997 | 81 |

Mika war am 1.6. nicht beim Lauf (km 0). „Opfer" = Trainee-Rolle. Auf der Seite werden nur Vornamen gezeigt. (Lars-Start am 4.6. von 83 auf **84,5** korrigiert.)

**Daten-Flags in `data.js`:** `weightTrend` `"up"` = soll/darf zunehmen (Mika **und Lars** — „Erben"; abnehmen liest dann als „Erben misslingt"). `estimated: true` bei Mika (keine Waage) → Karte zeigt „≈" vor Gewicht/BMI, Notiz „Schätzung", und im Chart hohle statt volle Punkte (`main.js` nutzt `PAPER`).

**Hall of Shame** wertet den **Fortschritt Richtung eigenes Ziel, relativ zum Ausgangsgewicht (%)** (Opfer = abgenommen, Coach = zugenommen/„geerbt"). Anzeige: % gross, kg + Tag klein darunter. Ein gemeinsames Ranking; Lager via Trenner „die Abnehmer" / „die Erber" + Rollen-Tag getrennt. Coaches landen realistisch auf 3/4. (JS rendert ins `#shame-list`-Div — **nicht** in die `<section id="shame">`; die Sektion-ID dient nur dem Nav-Anker. Vorher kollidierten beide IDs und das Ranking wurde ohne `.wrap`/Titel full-bleed gerendert — behoben.) Die „Erben"-Regel (beide Coaches) ist in Mission + Kurven-Text erklärt (separate FAQ dazu wurde wieder entfernt). **Charts:** Hover/Tap auf die Punkte zeigt einen interaktiven Tooltip (Name, Datum, Wert) — grosse transparente Hit-Kreise + `.charttip`-Div, gesteuert in `main.js`/`wireChartTooltips`. Distanzen werden überall auf 1 Kommastelle gerundet angezeigt (2,79 km → „2,8 km").

## Stand der Zahlen
Erste Wägung **Do 4.6.2026**: Chrigu 164,1 (−1,2) · Severin 148,5 (−0,5) · Lars 84,1 (−0,4) · Mika 81,2 (+0,2, erbt brav). Kilometer unverändert (kein Lauf seit Mo 1.6.).

## Strecke (aus echter GPX)
Rundkurs Schinti → Boltigen → Schinti, **2,79 km, 159 hm, höchster Punkt 855 m**. Höhenprofil ist aus der echten GPX gezeichnet (`Skinny-Bitch-Track.gpx`, liegt auf Christians Desktop), im flachen SchweizMobil-Maßstab mit beschrifteten Achsen.

## Offen / nächste Schritte
1. Wöchentlich: Zahlen (`history`) **und** Logbuch-Eintrag pflegen (Mo Lauf, Do Wägung).
2. Mikas erste echte Lauf-Messung eintragen, sobald er mitläuft.
3. Wachstums-Motor (noch offen): Medien-Pitch, Sponsoren-One-Pager, Social-Content-System — siehe Memory.

**Erledigt:** Go-Live auf www.skinny-bitches.ch inkl. **HTTPS aktiv** (Enforce HTTPS, Apex→www-Redirect). Sponsoren-Sektion „Die Komplizen", dunkle Fusszeile mit Kontakt-CTA (info@simmental.digital), Crew-Vornamen, SEO-Hygiene (JSON-LD/sitemap/robots/Favicon), Social-Vorschaubild, **Logbuch** (Timeline aus `data.js`), erste Wägung 4.6. eingetragen.

## Eine neue Session fortsetzen
Im Ordner `/Users/Shared/CC_Git/Skinny Bitches` eine neue Claude-Session starten — das Projektgedächtnis lädt automatisch. Einfach sagen: *„Mach bei den Skinny Bitches weiter, lies ENTWICKLUNG.md und das Memory."*
