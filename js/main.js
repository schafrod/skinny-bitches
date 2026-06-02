/* ============================================================================
   SKINNY BITCHES — main.js
   Liest data.js (window.SKINNY) und rendert alles. Du musst hier NICHTS ändern.
   BMI, Fortschritt, Charts und Ranking rechnen sich aus den Wochenwerten.
   Personen ohne Messung (leere history) werden sauber als "noch nicht dabei"
   behandelt — Karte ja, aber keine Kurve, kein Ranking.
   ============================================================================ */
(function () {
  "use strict";

  const D = window.SKINNY;
  if (!D || !Array.isArray(D.people)) {
    console.error("SKINNY: data.js fehlt oder ist kaputt.");
    return;
  }

  /* ---- Tinten (müssen zu den CSS-Variablen passen) ---- */
  const INK = "#1c1a17";
  const BLOOD = "#8e2b1c";
  // Linienstil pro Person, in Reihenfolge von data.people:
  const SERIES_STYLES = [
    { color: BLOOD, dash: "" },     // 1 — Christian
    { color: BLOOD, dash: "7 5" },  // 2 — Severin
    { color: INK,   dash: "" },     // 3 — Lars
    { color: INK,   dash: "2 6" },  // 4 — Mika
  ];

  /* ---- Helfer ---- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const fmt = (n) => (Number.isInteger(n) ? String(n) : (Math.round(n * 10) / 10).toFixed(1));
  const de = (s) => String(s).replace(".", ",");           // Schweizer Komma
  const num = (n) => de(fmt(n));
  const bmiOf = (w, h) => w / Math.pow(h / 100, 2);
  const first = (full) => full.trim().split(/\s+/)[0];
  const hist = (p) => Array.isArray(p.history) ? p.history : [];
  const curr = (p) => hist(p).length ? hist(p)[hist(p).length - 1] : null;
  const start = (p) => hist(p).length ? hist(p)[0] : null;

  function longDate(iso) {
    const d = new Date(iso + "T00:00:00");
    return isNaN(d) ? iso : d.toLocaleDateString("de-CH", { day: "numeric", month: "long", year: "numeric" });
  }
  function shortDate(iso) {
    const d = new Date(iso + "T00:00:00");
    return isNaN(d) ? iso : d.toLocaleDateString("de-CH", { day: "2-digit", month: "2-digit" });
  }

  /* ===================== STAND-DATUM ===================== */
  function renderStand() {
    const s = "Stand: " + longDate(D.lastUpdate);
    const a = $("#hero-stand"); if (a) a.textContent = s;
    const f = $("#footer-stand"); if (f) f.textContent = s;
  }

  /* ===================== SPECS-KARTEN ===================== */
  function renderCards() {
    const host = $("#cards");
    if (!host) return;
    const year = parseInt(String(D.lastUpdate).slice(0, 4), 10);

    host.innerHTML = D.people.map((p) => {
      const c = curr(p), s0 = start(p);
      const has = !!c;
      const age = p.birthYear ? year - p.birthYear : null;
      const b = (has && p.heightCm) ? bmiOf(c.weightKg, p.heightCm) : null;
      const d = has ? c.weightKg - s0.weightKg : 0;       // < 0 = abgenommen
      const moved = Math.abs(d) >= 0.05;
      const wantsUp = p.weightTrend === "up";
      const success = wantsUp ? d > 0.05 : d < -0.05;

      let progCls, progTxt;
      if (!has) {
        progCls = "progress--flat";
        progTxt = "Beim Auftakt gefehlt";
      } else if (!moved) {
        progCls = "progress--flat";
        progTxt = "Noch sitzt der Speck";
      } else if (success) {
        progCls = "progress--down";
        progTxt = (wantsUp ? "+" : "−") + num(Math.abs(d)) + " kg " + (wantsUp ? "geerbt" : "weg");
      } else {
        progCls = "progress--up";
        progTxt = (d > 0 ? "+" : "−") + num(Math.abs(d)) + " kg " + (wantsUp ? "— Erben misslingt" : "— Buffet führt");
      }

      const roleCls = p.role === "coach" ? "card__role--coach" : "card__role--trainee";
      const roleTxt = p.role === "coach" ? "Coach" : "Opfer";
      const initials = p.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
      const portrait = p.photo
        ? `<img class="portrait" src="${p.photo}" alt="${p.name}">`
        : `<div class="portrait" role="img" aria-label="${p.name}"><span class="portrait__initial">${initials}</span></div>`;

      const km = has ? num(c.km) + " km" : "—";
      const gew = has ? `<strong>${num(c.weightKg)}</strong> kg` : "—";
      const bmi = b != null ? `<strong>${num(b)}</strong>` : "—";

      return `
      <article class="card${has ? "" : " card--idle"}">
        <span class="card__role ${roleCls}">${roleTxt}</span>
        ${portrait}
        <h3 class="card__name">${p.name}</h3>
        <p class="card__nick">${p.nick || ""}</p>
        <ul class="specs">
          <li><span class="k">Grösse</span><span class="dots"></span><span class="v">${p.heightCm ? num(p.heightCm) + " cm" : "—"}</span></li>
          <li><span class="k">Alter</span><span class="dots"></span><span class="v">${age != null ? age + " J." : "—"}</span></li>
          <li><span class="k">Kilometer</span><span class="dots"></span><span class="v">${km}</span></li>
          <li><span class="k">Gewicht</span><span class="dots"></span><span class="v">${gew}</span></li>
          <li><span class="k">BMI</span><span class="dots"></span><span class="v">${bmi}</span></li>
        </ul>
        <div class="progress ${progCls}"><b>${progTxt}</b></div>
        ${p.bio ? `<p class="card__bio">${p.bio}</p>` : ""}
      </article>`;
    }).join("");
  }

  /* ===================== STRECKE / OGI-WEG ===================== */
  function renderStrecke() {
    const host = $("#strecke-stats");
    const r = D.route || {};
    if (host) {
      host.innerHTML = `
        <div class="stat">
          <div class="stat__num">${num(r.laenge_km ?? 0)}<span class="unit"> km</span></div>
          <div class="stat__label">Eine Runde</div>
        </div>
        <div class="stat">
          <div class="stat__num">${num(r.hoehenmeter ?? 0)}<span class="unit"> hm</span></div>
          <div class="stat__label">Höhenmeter</div>
        </div>
        <div class="stat">
          <div class="stat__num">${num(r.hoehe_max ?? 0)}<span class="unit"> m</span></div>
          <div class="stat__label">Höchster Punkt</div>
        </div>`;
    }
    // Orte ins Höhenprofil (Start · via · Ziel)
    const orte = Array.isArray(r.orte) ? r.orte : [];
    ["#profile-o1", "#profile-o2", "#profile-o3"].forEach((sel, i) => {
      const el = $(sel);
      if (el && orte[i]) el.textContent = orte[i];
    });
    const link = $("#strecke-link");
    if (link && r.url) link.href = r.url;
  }

  /* ===================== CHARTS (custom SVG) ===================== */
  function buildChart(valueKey, fromZero) {
    const people = D.people;
    const dateSet = new Set();
    people.forEach((p) => hist(p).forEach((h) => dateSet.add(h.date)));
    const dates = [...dateSet].sort();
    const n = dates.length;
    const idxOf = (d) => dates.indexOf(d);

    const vals = [];
    people.forEach((p) => hist(p).forEach((h) => vals.push(h[valueKey])));
    if (!vals.length) vals.push(0, 1); // Sicherheitsnetz, falls noch gar nichts da ist

    let yMin = fromZero ? 0 : Math.min(...vals);
    let yMax = Math.max(...vals, fromZero ? 1 : -Infinity);
    if (yMin === yMax) { yMin -= 1; yMax += 1; }
    const pad = (yMax - yMin) * 0.12;
    yMax += pad;
    if (!fromZero) yMin -= pad; else yMin = 0;

    const VBW = 360, VBH = 200, padL = 42, padR = 16, padT = 18, padB = 30;
    const plotW = VBW - padL - padR, plotH = VBH - padT - padB;
    const xFor = (i) => padL + (n <= 1 ? plotW / 2 : (i / (n - 1)) * plotW);
    const yFor = (v) => padT + plotH - ((v - yMin) / (yMax - yMin)) * plotH;

    let svg = `<svg viewBox="0 0 ${VBW} ${VBH}" role="img" aria-label="Diagramm">`;

    // Gridlines + Y-Beschriftung
    [0, 0.5, 1].forEach((t) => {
      const v = yMin + t * (yMax - yMin);
      const y = yFor(v).toFixed(1);
      svg += `<line class="grid" x1="${padL}" y1="${y}" x2="${VBW - padR}" y2="${y}"/>`;
      svg += `<text class="tick-label" x="${padL - 6}" y="${(+y + 3).toFixed(1)}" text-anchor="end">${num(Math.round(v * 10) / 10)}</text>`;
    });

    // Achsen
    svg += `<line class="axis" x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + plotH}"/>`;
    svg += `<line class="axis" x1="${padL}" y1="${padT + plotH}" x2="${VBW - padR}" y2="${padT + plotH}"/>`;

    // X-Beschriftung
    const step = n <= 6 ? 1 : Math.ceil(n / 6);
    dates.forEach((d, i) => {
      if (i % step === 0 || i === n - 1) {
        svg += `<text class="tick-label" x="${xFor(i).toFixed(1)}" y="${padT + plotH + 16}" text-anchor="middle">${shortDate(d)}</text>`;
      }
    });

    // Linien + Punkte (Personen ohne Messung tragen nichts bei)
    people.forEach((p, si) => {
      const h = hist(p);
      if (!h.length) return;
      const st = SERIES_STYLES[si % SERIES_STYLES.length];
      const pts = h.map((row) => ({ x: xFor(idxOf(row.date)), y: yFor(row[valueKey]) }));
      if (pts.length >= 2) {
        const dAttr = pts.map((pt, i) => (i ? "L" : "M") + pt.x.toFixed(1) + "," + pt.y.toFixed(1)).join(" ");
        svg += `<path class="pline" d="${dAttr}" stroke="${st.color}"${st.dash ? ` stroke-dasharray="${st.dash}"` : ""}/>`;
      }
      pts.forEach((pt) => {
        svg += `<circle r="3.6" cx="${pt.x.toFixed(1)}" cy="${pt.y.toFixed(1)}" fill="${st.color}"/>`;
      });
    });

    svg += `</svg>`;
    return { svg, n };
  }

  function renderLegend(sel, n) {
    const host = $(sel);
    if (!host) return;
    let html = D.people.map((p, si) => {
      if (!hist(p).length) return "";   // ohne Messung kein Legenden-Eintrag
      const st = SERIES_STYLES[si % SERIES_STYLES.length];
      const style = `border-top-color:${st.color};border-top-style:${st.dash ? "dashed" : "solid"}`;
      return `<span class="legend__item"><span class="legend__swatch" style="${style}"></span>${first(p.name)}</span>`;
    }).join("");
    if (n < 2) {
      html += `<span class="legend__item" style="color:var(--ink-faint)">Erst ein Donnerstag — die Linie kommt.</span>`;
    }
    host.innerHTML = html;
  }

  function renderCharts() {
    const w = $("#chart-weight");
    if (w) { const r = buildChart("weightKg", false); w.innerHTML = r.svg; renderLegend("#legend-weight", r.n); }
    const k = $("#chart-km");
    if (k) { const r = buildChart("km", true); k.innerHTML = r.svg; renderLegend("#legend-km", r.n); }
  }

  /* ===================== HALL OF SHAME ===================== */
  function renderShame() {
    const host = $("#shame");
    if (!host) return;

    const rows = D.people.filter((p) => hist(p).length).map((p) => {
      const d = curr(p).weightKg - start(p).weightKg;  // < 0 abgenommen
      return { name: p.name, nick: p.nick, role: p.role, lost: -d }; // lost > 0 = abgenommen
    }).sort((a, b) => b.lost - a.lost);

    const maxAbs = Math.max(...rows.map((r) => Math.abs(r.lost)), 0);
    if (!rows.length || maxAbs < 0.05) {
      host.innerHTML = `<p class="shame__empty">Noch hat keiner was verloren ausser der Würde.<br>Komm am Donnerstag wieder.</p>`;
      return;
    }

    host.innerHTML = rows.map((r, i) => {
      const lead = i === 0 ? " shame__row--lead" : "";
      const w = maxAbs ? Math.round(Math.abs(r.lost) / maxAbs * 100) : 0;
      const sign = r.lost > 0.05 ? "−" : (r.lost < -0.05 ? "+" : "±");
      const tag = r.lost > 0.05 ? "abgenommen" : (r.lost < -0.05 ? "draufgepackt" : "nada");
      return `
      <div class="shame__row${lead}">
        <div class="shame__rank">${i + 1}</div>
        <div class="shame__who">
          <div class="shame__name">${r.name}</div>
          <div class="shame__sub">${r.nick || r.role}</div>
          <div class="shame__bar"><span style="width:${w}%"></span></div>
        </div>
        <div class="shame__delta">${sign}${num(Math.abs(r.lost))} kg<small>${tag}</small></div>
      </div>`;
    }).join("");
  }

  /* ===================== INIT ===================== */
  function init() {
    renderStand();
    renderCards();
    renderStrecke();
    renderCharts();
    renderShame();
  }
  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
