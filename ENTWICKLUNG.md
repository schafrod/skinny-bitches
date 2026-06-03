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
`index.html` (Struktur + Texte) · `css/style.css` (Stil) · `js/main.js` (rendert aus den Daten) · `data.js` (**die Wochen-Datei**) · `assets/` (Logo, freigestellte Porträts, Ziel-Foto).

Seiten-Reihenfolge: Hero (dunkel) → Mission → Crew (4 Karten) → Ogi-Weg (Strecke + echtes Höhenprofil) → Kurven → Hall of Shame → Das Ziel → Footer.

## Wöchentliches Update (das Einzige, was regelmässig zu tun ist)
In `data.js` bei jeder Person unten im `history`-Array einen Eintrag anhängen:
```js
{ date: "2026-06-04", weightKg: 163.1, km: 10.4 }
```
(Komma als **Punkt**; `km` = Total kumuliert, +2.79 pro Runde.) Oben `lastUpdate` setzen. Dann committen + pushen. BMI, Fortschritt, Charts, Ranking rechnen sich selbst. `data.js` wird per Zeitstempel geladen → Updates sofort sichtbar (kein Cache-Problem).

## Wichtig bei Design-Änderungen
CSS und JS sind in `index.html` mit `?v=N` versioniert (aktuell `style.css?v=11`, `main.js?v=5`). **Wer CSS oder JS ändert, muss die Nummer erhöhen** — sonst zeigt der Browser die alte Datei. (`data.js` braucht das nicht.)

## Die Crew (alle Werte echt)
| Person | Nick | Rolle | Grösse | Jg. | Start-kg |
|---|---|---|---|---|---|
| Chrigu Schafroth | El Gordo | Opfer | 187 | 1983 | 165,3 |
| Severin Matti | Rocket-Man | Opfer | 185 | 1998 | 149 |
| Lars Klossner | Mr. Sexybless | Coach | 176 | 1999 | 83 |
| Mika Klossner | Mother²-Mikl | Coach (nimmt zu) | 182 | 1997 | 81 |

Mika war am 1.6. nicht beim Lauf (km 0). „Opfer" = Trainee-Rolle.

## Strecke (aus echter GPX)
Rundkurs Schinti → Boltigen → Schinti, **2,79 km, 159 hm, höchster Punkt 855 m**. Höhenprofil ist aus der echten GPX gezeichnet (`Skinny-Bitch-Track.gpx`, liegt auf Christians Desktop), im flachen SchweizMobil-Maßstab mit beschrifteten Achsen.

## Offen / nächste Schritte
1. **«Enforce HTTPS»** in GitHub → Settings → Pages anhaken, sobald das TLS-Zertifikat ausgestellt ist (passiert automatisch nach dem DNS-/Custom-Domain-Setup). Danach ist der Go-Live komplett.
2. Mikas erste echte Lauf-Messung eintragen, sobald er mitläuft.

**Erledigt:** Go-Live auf www.skinny-bitches.ch (Domain bei Hosttech, DNS gesetzt, `CNAME` im Repo, Apex→www-Redirect aktiv). Sponsoren-Sektion „Die Komplizen" mit Boltig-Metzg + Platzhaltern, dunkle Fusszeile mit Kontakt-CTA (info@simmental.digital), Crew-Namen auf Vornamen gekürzt.

## Eine neue Session fortsetzen
Im Ordner `/Users/Shared/CC_Git/Skinny Bitches` eine neue Claude-Session starten — das Projektgedächtnis lädt automatisch. Einfach sagen: *„Mach bei den Skinny Bitches weiter, lies ENTWICKLUNG.md und das Memory."*
