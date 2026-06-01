# Skinny Bitches — In Kilo Veritas

Statische Website fürs Herzinfarkt-Duo und seine Coaches. Kein Build, kein Framework,
keine Ausreden. Reines HTML/CSS/JS — du änderst **eine Datei** pro Woche und pushst.

🌐 Später live unter **https://www.skinny-bitches.ch**

---

## 📅 Wöchentliches Update (jeden Donnerstag)

Alles, was sich ändert, steht in **`data.js`**. Sonst nichts anfassen.

1. Öffne `data.js`.
2. Setz oben `lastUpdate` auf das heutige Datum: `"2026-06-04"`.
3. Häng bei **jeder Person** unten im `history`-Array **einen neuen Eintrag** an:

   ```js
   { date: "2026-06-04", weightKg: 103.4, km: 10.4 }
   ```

   - `date`     — Datum der Messung (`"JJJJ-MM-TT"`)
   - `weightKg` — aktuelles Gewicht, **Punkt statt Komma** (`103.4`, nicht `103,4`)
   - `km`       — **total** gelaufene Kilometer (kumuliert, nicht nur diese Woche)

4. Speichern → committen → pushen. Fertig.

Der Rest rechnet sich von selbst: **BMI, Fortschritt («−2,3 kg»), die Kurven und das
Hall-of-Shame-Ranking** werden aus den Zahlen erzeugt. Du tippst nie einen BMI.

> 💡 Kein Bock auf Terminal? Du kannst `data.js` auch direkt auf github.com im Browser
> bearbeiten (Stift-Symbol → ändern → «Commit changes»). Pages baut automatisch neu.

### Foto statt Initialen (optional)
Leg ein Bild in `assets/` und ergänz bei der Person in `data.js`:
`photo: "assets/severin.jpg"`. Quadratisch sieht am besten aus.

---

## 🚀 Erstmaliges Deployment (GitHub Pages)

1. Repo auf GitHub anlegen und pushen.
2. **Settings → Pages → Build and deployment → Source: «Deploy from a branch»**,
   Branch `main`, Ordner `/ (root)`, speichern.
3. Die Datei **`CNAME`** (Inhalt `www.skinny-bitches.ch`) sorgt für die eigene Domain.

### DNS bei deinem .ch-Registrar
- `www` → **CNAME** auf `DEIN-GITHUB-USER.github.io`
- Apex `skinny-bitches.ch` → **A-Records** auf:
  `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- In GitHub **Settings → Pages → Custom domain** `www.skinny-bitches.ch` eintragen
  und **«Enforce HTTPS»** aktivieren (kann nach DNS-Umstellung ein paar Stunden dauern).

---

## 🗂 Struktur

```
index.html      # Aufbau & alle Texte
css/style.css   # Vintage-Letterpress-Look
js/main.js      # rechnet & rendert (BMI, Charts, Ranking) — nicht nötig anzufassen
data.js         # ← DIE wöchentliche Datei
assets/logo.png # das Emblem
CNAME           # Domain für GitHub Pages
```

## 🔎 Lokal anschauen

```bash
cd "Skinny Bitches"
python3 -m http.server 8080
# dann http://localhost:8080 im Browser
```

---

*Ein bisschen dick ist nicht so slim.*
