# STAND — Skinny Bitches (skinny-bitches.ch)

> **Stichtag: 29.10.2026.** Nur der gültige Stand, max. ~150 Zeilen. Überschreiben statt anhängen; Erledigtes und Überholtes raus. Technik, Aufbau und Herleitungen: `ENTWICKLUNG.md`. Bei Widerspruch gilt STAND.md.

## Eckdaten
| Feld | Wert |
|---|---|
| Projekt | Privates Lauf-Spassprojekt «Skinny Bitches — In Kilo Veritas», Boltigen |
| Ziel | Wöchentlich Läufe + Wägungen erzählen (Logbuch, Kurven, Hall of Shame) |
| Ablage OneDrive | keine |
| Live | https://www.skinny-bitches.ch (GitHub Pages, Push auf `main` = live, Repo öffentlich) |

## Ablauf pro Eintrag
- **Mo Lauf** (km-only, +3,41 pro Ogi-Weg inkl. Anaconda-Loop) · **Do Wägung** (Gewicht, km gleich).
- Chrigu liefert Zahlen + Textfragmente → Claude macht Textvorschlag (3. Person, Chronisten-Stil) → Chrigu gibt Go oder eigene Version → eintragen in `data.js`, lokal prüfen (`.claude/launch.json` «skinny», Port 8088), committen, **sofort pushen** (Freigabe seit 24.09.2026).
- Im selben Commit nachführen: `STAND.md` (Zahlen unten) und `ENTWICKLUNG.md` («Stand der Zahlen», «Daten bis»).
- Fotos/Flyer: `assets/runs/JJJJ-MM-TT/<slug>.jpg` + `<slug>-t.jpg`, im Log-Eintrag `photoDir` + `photos`.

## Aktueller Stand (Daten bis 29.10.2026)
| Person | kg (Δ seit Start) | km total |
|---|---|---|
| Chrigu «El Gordo» | 156,0 (−9,3; Bestwert 155,1 am 1.10.) | 93,91 |
| Severin «Rocket-Man» | 146,0 (−3,0, Bestwert) | 66,47 |
| Lars «Mr. Sexybless» (Coach) | 82,0 (−2,5) | 22,61 |
| Mika (Gedenk-Karte, vermisst) | ≈81,2 | 3,41 |

- Logbuch: 45 Einträge (Juni 11 / Juli 10 / Aug 9 / Sep 8 / Okt 7).
- 26.10.: statt Lauf Dornen-Rodung in der Hausmatte (keine km), Eintrag mit 2 Fotos. Ältere Monate klappen automatisch ins Archiv.
- 12.10.: statt Ogi-Weg Gusti-Zügeln Bergblick → Beret (GPX 4,01 km, 315 hm abwärts), auch Lars gutgeschrieben; Eintrag mit 2 Fotos (`assets/runs/2026-10-12/`).
- Woche 05.–09.10.: keine Daten (Ferien).
- Versionen: `css/style.css?v=35`, `js/main.js?v=26` (bei CSS/JS-Änderung erhöhen).

## Pendenzen
- [ ] Nächster Lauf Mo 02.11., Wägung Do 05.11.2026.
- [ ] Google Search Console: Indexierungs-Status prüfen (Domain-Property `skinny-bitches.ch`, Sitemap als volle URL).

## Offene Ideen (angeboten, nicht entschieden)
- Medien-Pitch Lokalpresse, Sponsoren-One-Pager, Social-Content-System, Hero-Zeile für Erstbesucher.

## Wichtige Dateien
| Was | Repo |
|---|---|
| Wochendaten + Logbuch | `data.js` |
| Aufbau + Texte | `index.html` |
| Rendering (Karten, Charts, Logbuch, Ticker) | `js/main.js` |
| Übergabe/Technik | `ENTWICKLUNG.md` |
