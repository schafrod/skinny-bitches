# STAND — Skinny Bitches (skinny-bitches.ch)

> **Stichtag: 12.11.2026.** Nur der gültige Stand, max. ~150 Zeilen. Überschreiben statt anhängen; Erledigtes und Überholtes raus. Technik, Aufbau und Herleitungen: `ENTWICKLUNG.md`. Bei Widerspruch gilt STAND.md.

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

## Aktueller Stand (Daten bis 12.11.2026)
| Person | kg (Δ seit Start) | km total |
|---|---|---|
| Chrigu «El Gordo» | 153,7 (−11,6; Bestwert 153,6 am 5.11.) | 97,32 |
| Severin «Rocket-Man» | 145,5 (−3,5, Bestwert) | 66,47 |
| Lars «Mr. Sexybless» (Coach) | 81,8 (−2,7) | 22,61 |
| Mika (Gedenk-Karte, vermisst) | ≈81,2 | 3,41 |

- Logbuch: 49 Einträge (Juni 11 / Juli 10 / Aug 9 / Sep 8 / Okt 7 / Nov 4).
- 02.11.: kein Lauf (El Gordo Männergrippe), Scherz-Eintrag «Einen Bären aufbinden» mit 3 KI-Fotos, keine km.
- 26.10.: statt Lauf Dornen-Rodung in der Hausmatte (keine km), Eintrag mit 2 Fotos. Ältere Monate klappen automatisch ins Archiv.
- 12.10.: statt Ogi-Weg Gusti-Zügeln Bergblick → Beret (GPX 4,01 km, 315 hm abwärts), auch Lars gutgeschrieben; Eintrag mit 2 Fotos (`assets/runs/2026-10-12/`).
- Woche 05.–09.10.: keine Daten (Ferien).
- Versionen: `css/style.css?v=35`, `js/main.js?v=26` (bei CSS/JS-Änderung erhöhen).

## Pendenzen
- [ ] Nächster Lauf Mo 16.11. (Chrigu fehlen 2,68 km zur 100-km-Marke), Wägung Do 19.11.2026.
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
