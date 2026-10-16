# STAND — Skinny Bitches (skinny-bitches.ch)

> **Stichtag: 16.10.2026.** Nur der gültige Stand, max. ~150 Zeilen. Überschreiben statt anhängen; Erledigtes und Überholtes raus. Technik, Aufbau und Herleitungen: `ENTWICKLUNG.md`. Bei Widerspruch gilt STAND.md.

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

## Aktueller Stand (Daten bis Wägung 15.10.2026)
| Person | kg (Δ seit Start) | km total |
|---|---|---|
| Chrigu «El Gordo» | 158,3 (−7,0; Bestwert 155,1 am 1.10., +3,2 nach Italien-Urlaub) | 90,50 |
| Severin «Rocket-Man» | 147,0 (−2,0) | 63,06 |
| Lars «Mr. Sexybless» (Coach) | 82,3 (−2,2; am 15.10. erste Wägung seit 20.8.) | 19,20 |
| Mika (Gedenk-Karte, vermisst) | ≈81,2 | 3,41 |

- Logbuch: 41 Einträge (Juni 11 / Juli 10 / Aug 9 / Sep 8 / Okt 3). Ältere Monate klappen automatisch ins Archiv.
- 12.10.: statt Ogi-Weg Gusti-Zügeln Bergblick → Beret (GPX 4,01 km, 315 hm abwärts), auch Lars gutgeschrieben.
- Woche 05.–09.10.: keine Daten (Ferien).
- Versionen: `css/style.css?v=35`, `js/main.js?v=26` (bei CSS/JS-Änderung erhöhen).

## Pendenzen
- [ ] Nächster Lauf Mo 19.10., Wägung Do 22.10.2026.
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
