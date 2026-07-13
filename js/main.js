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
  const PAPER = "#e9e0cd";
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
  const escAttr = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const bmiOf = (w, h) => w / Math.pow(h / 100, 2);
  const first = (full) => full.trim().split(/\s+/)[0];
  const hist = (p) => Array.isArray(p.history) ? p.history : [];
  const curr = (p) => hist(p).length ? hist(p)[hist(p).length - 1] : null;
  const start = (p) => hist(p).length ? hist(p)[0] : null;
  // letzter / erster Eintrag MIT Gewicht (Lauf-Tage können nur km haben)
  const currW = (p) => { const h = hist(p); for (let i = h.length - 1; i >= 0; i--) if (h[i].weightKg != null) return h[i]; return null; };
  const startW = (p) => { const h = hist(p); for (let i = 0; i < h.length; i++) if (h[i].weightKg != null) return h[i]; return null; };

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
      const cw = currW(p), s0 = startW(p);   // Gewicht/BMI/Fortschritt
      const ck = curr(p);                    // letzter Eintrag (für km)
      const has = !!cw;
      const age = p.birthYear ? year - p.birthYear : null;
      const b = (has && p.heightCm) ? bmiOf(cw.weightKg, p.heightCm) : null;
      const d = has ? cw.weightKg - s0.weightKg : 0;       // < 0 = abgenommen
      const moved = Math.abs(d) >= 0.05;
      const wantsUp = p.weightTrend === "up";
      const success = wantsUp ? d > 0.05 : d < -0.05;

      let progCls, progTxt;
      if (!has) {
        progCls = "progress--flat";
        progTxt = "Beim Auftakt gefehlt";
      } else if (!moved) {
        progCls = "progress--flat";
        progTxt = p.role === "coach" ? "Noch sieht man die Knochen" : "Noch sitzt der Speck";
      } else if (success) {
        progCls = "progress--down";
        progTxt = (wantsUp ? "+" : "−") + num(Math.abs(d)) + " kg " + (wantsUp ? "geerbt" : "weg");
      } else {
        progCls = "progress--up";
        progTxt = (d > 0 ? "+" : "−") + num(Math.abs(d)) + " kg " + (wantsUp ? "— Erben misslingt" : "— Buffet führt");
      }

      const fadeCls = p.fadeStage ? ` card--fade card--fade-${p.fadeStage}` : "";
      const roleCls = p.role === "coach" ? "card__role--coach" : "card__role--trainee";
      const roleTxt = p.role === "coach" ? "Coach" : "Opfer";
      const initials = p.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
      const portrait = p.photo
        ? `<img class="portrait" src="${p.photo}" alt="${p.name}">`
        : `<div class="portrait" role="img" aria-label="${p.name}"><span class="portrait__initial">${initials}</span></div>`;

      const km = ck ? num(ck.km) + " km" : "—";
      const gew = has ? `${p.estimated ? "≈ " : ""}<strong>${num(cw.weightKg)}</strong> kg` : "—";
      const bmi = b != null ? `${p.estimated ? "≈ " : ""}<strong>${num(b)}</strong>` : "—";

      return `
      <article class="card${has ? "" : " card--idle"}${fadeCls}">
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
        ${p.estimated ? '<p class="card__note">Schätzung – Mika hat noch keine Waage</p>' : ""}
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
  // Wählt runde Achsen-Grenzen + Schrittweite (1/2/2.5/5/10 × 10^n), Ziel ~5 Linien.
  function niceBounds(min, max, fromZero) {
    if (fromZero) min = 0;
    if (!isFinite(min) || !isFinite(max)) { min = 0; max = 1; }
    if (max <= min) max = min + 1;
    const rawStep = (max - min) / 5;
    const mag = Math.pow(10, Math.floor(Math.log10(rawStep)));
    const norm = rawStep / mag;
    const s = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10;
    const step = s * mag;
    return { min: fromZero ? 0 : Math.floor(min / step) * step, max: Math.ceil(max / step) * step, step };
  }

  function buildChart(valueKey, fromZero, unit) {
    const people = D.people;
    const dateSet = new Set();
    people.forEach((p) => hist(p).forEach((h) => { if (h[valueKey] != null) dateSet.add(h.date); }));
    const dates = [...dateSet].sort();
    const n = dates.length;
    const idxOf = (d) => dates.indexOf(d);

    const vals = [];
    people.forEach((p) => hist(p).forEach((h) => { if (h[valueKey] != null) vals.push(h[valueKey]); }));
    if (!vals.length) vals.push(0, 1); // Sicherheitsnetz, falls noch gar nichts da ist

    const nb = niceBounds(Math.min(...vals), Math.max(...vals), fromZero);
    const yMin = nb.min, yMax = nb.max;

    const VBW = 360, VBH = 200, padL = 42, padR = 16, padT = 18, padB = 30;
    const plotW = VBW - padL - padR, plotH = VBH - padT - padB;
    const xFor = (i) => padL + (n <= 1 ? plotW / 2 : (i / (n - 1)) * plotW);
    const yFor = (v) => padT + plotH - ((v - yMin) / (yMax - yMin)) * plotH;

    let svg = `<svg viewBox="0 0 ${VBW} ${VBH}" role="img" aria-label="Diagramm">`;

    // Gridlines + Y-Beschriftung (runde Schritte, ganze Zahlen)
    const tickCount = Math.round((yMax - yMin) / nb.step);
    for (let i = 0; i <= tickCount; i++) {
      const v = yMin + i * nb.step;
      const y = yFor(v).toFixed(1);
      svg += `<line class="grid" x1="${padL}" y1="${y}" x2="${VBW - padR}" y2="${y}"/>`;
      const lbl = (Number.isInteger(nb.step) && Number.isInteger(v)) ? String(v) : num(Math.round(v * 10) / 10);
      svg += `<text class="tick-label" x="${padL - 6}" y="${(+y + 3).toFixed(1)}" text-anchor="end">${lbl}</text>`;
    }

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
      const h = hist(p).filter((row) => row[valueKey] != null);
      if (!h.length) return;
      const st = SERIES_STYLES[si % SERIES_STYLES.length];
      const pts = h.map((row) => ({ x: xFor(idxOf(row.date)), y: yFor(row[valueKey]), v: row[valueKey], date: row.date }));
      if (pts.length >= 2) {
        const dAttr = pts.map((pt, i) => (i ? "L" : "M") + pt.x.toFixed(1) + "," + pt.y.toFixed(1)).join(" ");
        svg += `<path class="pline" d="${dAttr}" stroke="${st.color}"${st.dash ? ` stroke-dasharray="${st.dash}"` : ""}/>`;
      }
      pts.forEach((pt) => {
        const label = `${first(p.name)}, ${shortDate(pt.date)}: ${p.estimated ? "≈ " : ""}${num(pt.v)} ${unit}`;
        svg += p.estimated
          ? `<circle r="3.4" cx="${pt.x.toFixed(1)}" cy="${pt.y.toFixed(1)}" fill="${PAPER}" stroke="${st.color}" stroke-width="1.6"><title>${label}</title></circle>`
          : `<circle r="3.6" cx="${pt.x.toFixed(1)}" cy="${pt.y.toFixed(1)}" fill="${st.color}"><title>${label}</title></circle>`;
        // unsichtbare, grosse Trefferfläche für Hover/Tap
        svg += `<circle class="hit" r="13" cx="${pt.x.toFixed(1)}" cy="${pt.y.toFixed(1)}" data-label="${label}"/>`;
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
    if (w) { const r = buildChart("weightKg", false, "kg"); w.innerHTML = r.svg; renderLegend("#legend-weight", r.n); }
    const k = $("#chart-km");
    if (k) { const r = buildChart("km", true, "km"); k.innerHTML = r.svg; renderLegend("#legend-km", r.n); }
    wireChartTooltips();
  }

  // Interaktive Tooltips auf den Diagramm-Punkten (Hover + Tap)
  function wireChartTooltips() {
    document.querySelectorAll(".chart-card").forEach((card) => {
      const chart = card.querySelector(".chart");
      if (!chart) return;
      let tip = card.querySelector(".charttip");
      if (!tip) { tip = document.createElement("div"); tip.className = "charttip"; card.appendChild(tip); }
      const show = (el, cx, cy) => {
        const label = el.getAttribute("data-label");
        if (!label) return;
        tip.textContent = label;
        const r = card.getBoundingClientRect();
        tip.style.left = (cx - r.left) + "px";
        tip.style.top = (cy - r.top) + "px";
        tip.classList.add("is-on");
      };
      const hide = () => tip.classList.remove("is-on");
      chart.addEventListener("pointermove", (e) => {
        const el = e.target.closest("[data-label]");
        if (el) show(el, e.clientX, e.clientY); else hide();
      });
      chart.addEventListener("pointerleave", hide);
      chart.addEventListener("click", (e) => {
        const el = e.target.closest("[data-label]");
        if (el) show(el, e.clientX, e.clientY); else hide();
      });
    });
  }

  /* ===================== HALL OF SHAME ===================== */
  function renderShame() {
    const host = $("#shame-list");
    if (!host) return;

    // Gewertet wird der Fortschritt Richtung EIGENES Ziel:
    // Opfer (down) zählt das Abgenommene, Coaches (up) das Zugenommene ("erben").
    const rows = D.people.filter((p) => currW(p)).map((p) => {
      const s0 = startW(p).weightKg;
      const d = currW(p).weightKg - s0;            // < 0 = abgenommen
      const pct = s0 ? (d / s0) * 100 : 0;        // vorzeichenbehaftet, % vom Ausgangsgewicht
      const wantsUp = p.weightTrend === "up";
      // Wertung = Fortschritt Richtung Ziel, relativ zum Ausgangsgewicht
      return { name: p.name, nick: p.nick, role: p.role, d, pct, wantsUp, score: wantsUp ? pct : -pct };
    }).sort((a, b) => b.score - a.score);

    const maxScore = Math.max(...rows.map((r) => Math.abs(r.score)), 0);
    const movedAny = rows.some((r) => Math.abs(r.d) >= 0.05);
    if (!rows.length || !movedAny) {
      host.innerHTML = `<p class="shame__empty">Noch hat keiner was bewegt ausser der Würde.<br>Komm am Donnerstag wieder.</p>`;
      return;
    }

    let prevRole = null;
    host.innerHTML = rows.map((r, i) => {
      const lead = i === 0 ? " shame__row--lead" : "";
      const w = maxScore ? Math.max(0, Math.round(r.score / maxScore * 100)) : 0;
      const sign = r.d < -0.05 ? "−" : (r.d > 0.05 ? "+" : "±");
      const tag = r.wantsUp
        ? (r.d > 0.05 ? "geerbt" : (r.d < -0.05 ? "Erben misslingt" : "nix geerbt"))
        : (r.d < -0.05 ? "abgenommen" : (r.d > 0.05 ? "draufgepackt" : "nada"));
      const roleTxt = r.role === "coach" ? "Coach" : "Opfer";
      // Lager-Trenner: Label vor dem ersten Eintrag und bei jedem Rollenwechsel
      const showLabel = (i === 0) || (prevRole !== r.role);
      prevRole = r.role;
      const divider = showLabel
        ? `<div class="shame__divider"><span>${r.role === "coach" ? "die Erber" : "die Abnehmer"}</span></div>`
        : "";
      return `${divider}
      <div class="shame__row${lead}">
        <div class="shame__rank">${i + 1}</div>
        <div class="shame__who">
          <div class="shame__name">${r.name} <span class="shame__role">${roleTxt}</span></div>
          <div class="shame__sub">${r.nick || ""}</div>
          <div class="shame__bar"><span style="width:${w}%"></span></div>
        </div>
        <div class="shame__delta">${sign}${num(Math.abs(r.pct))} %<small>${sign}${num(Math.abs(r.d))} kg · ${tag}</small></div>
      </div>`;
    }).join("");
  }

  /* ===================== LOGBUCH ===================== */
  function renderLog() {
    const host = $("#logbuch-list");
    if (!host) return;
    const entries = Array.isArray(D.log) ? D.log.slice() : [];
    if (!entries.length) {
      host.innerHTML = `<p class="log__empty">Noch nichts protokolliert. Der erste Montag kommt bestimmt.</p>`;
      return;
    }
    // neuester Eintrag zuoberst
    entries.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
    host.innerHTML = entries.map((e, i) => {
      const isLauf = e.typ === "lauf";
      const tag = isLauf ? "Lauf" : "Wägung";
      const tagCls = isLauf ? "log__tag--lauf" : "log__tag--waage";
      const title = escAttr(e.title || tag);
      const body = String(e.text || "").trim()
        .split(/\n{2,}/)
        .map((para) => `<p class="log__text">${para.replace(/\n/g, "<br>")}</p>`)
        .join("");
      let photos = "";
      if (Array.isArray(e.photos) && e.photos.length) {
        const dir = e.photoDir ? e.photoDir.replace(/\/+$/, "") + "/" : "";
        photos = `<div class="log__photos">` + e.photos.map((ph) => {
          const cap = escAttr(ph.caption || "");
          return `<button type="button" class="log__photo" data-full="${dir}${ph.file}.jpg" data-cap="${cap}"><img src="${dir}${ph.file}-t.jpg" alt="${cap}" loading="lazy"></button>`;
        }).join("") + `</div>`;
      }
      // Nur der neueste Eintrag (i === 0) ist aufgeklappt, die älteren zu.
      return `
      <details class="log__entry"${i === 0 ? " open" : ""}>
        <summary class="log__head">
          <div class="log__meta">
            <time class="log__date" datetime="${e.date}">${longDate(e.date)}</time>
            <span class="log__tag ${tagCls}">${tag}</span>
          </div>
          <h3 class="log__title">${title}</h3>
        </summary>
        <div class="log__body">
          ${body}
          ${photos}
        </div>
      </details>`;
    }).join("");

    wireLightbox(host);
  }

  // Schlichtes Lightbox-Overlay für die Lauf-Fotos (Hover/Klick/Tap, Esc schliesst)
  function wireLightbox(host) {
    let box = document.getElementById("lightbox");
    if (!box) {
      box = document.createElement("div");
      box.id = "lightbox";
      box.className = "lightbox";
      box.innerHTML = '<button type="button" class="lightbox__close" aria-label="Schliessen">&times;</button>' +
        '<figure class="lightbox__fig"><img class="lightbox__img" alt=""><figcaption class="lightbox__cap"></figcaption></figure>';
      document.body.appendChild(box);
      const hide = () => box.classList.remove("is-on");
      box.addEventListener("click", (e) => { if (e.target === box || e.target.closest(".lightbox__close")) hide(); });
      document.addEventListener("keydown", (e) => { if (e.key === "Escape") hide(); });
    }
    const img = box.querySelector(".lightbox__img");
    const cap = box.querySelector(".lightbox__cap");
    host.querySelectorAll(".log__photo").forEach((btn) => {
      btn.addEventListener("click", () => {
        img.src = btn.getAttribute("data-full");
        const c = btn.getAttribute("data-cap") || "";
        img.alt = c; cap.textContent = c;
        box.classList.add("is-on");
      });
    });
  }

  /* ===================== TICKER ===================== */
  // Telegramm-Laufband unter der Nav: die letzten 3 Logbuch-Einträge (Datum,
  // Typ, Titel), automatisch aus data.js — beim Wochenupdate ist nichts extra
  // zu pflegen. Inhalt wird verdoppelt für den nahtlosen Endlos-Loop.
  function renderTicker() {
    const track = $("#ticker-track");
    if (!track) return;
    const entries = (Array.isArray(D.log) ? D.log.slice() : [])
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .slice(0, 3);
    if (!entries.length) { $("#ticker").style.display = "none"; return; }
    const items = entries.map((e) =>
      `<span class="ticker__item">+++ ${shortDate(e.date)} <b>${e.typ === "lauf" ? "Lauf" : "Wägung"}:</b> ${escAttr(e.title || "")}</span>`
    ).join("");
    track.innerHTML = items + items; // 2x für nahtlosen Loop (translateX -50%)
    // Tempo an Inhaltslänge koppeln (~60 px/s), sonst rast kurzer Inhalt
    const half = track.scrollWidth / 2;
    track.style.setProperty("--ticker-dur", Math.max(15, Math.round(half / 60)) + "s");
  }

  /* ===================== ANKER-OFFSET ===================== */
  // Hält die Sektions-Überschrift unter der Sticky-Nav frei, wenn man einen
  // Nav-Link anklickt. Die Nav ist auf Mobile höher (umgebrochene Links), darum
  // messen wir ihre echte Höhe und setzen scroll-padding-top live (auch bei resize).
  function fitScrollPad() {
    const nav = $(".nav");
    if (!nav) return;
    const set = () => { document.documentElement.style.scrollPaddingTop = (nav.offsetHeight + 10) + "px"; };
    set();
    window.addEventListener("resize", set, { passive: true });
  }

  /* ===================== NAV AUTO-HIDE ===================== */
  // Nav verschwindet beim Runterscrollen (spart Platz, v.a. mobil) und kommt
  // beim Hochscrollen zurück. Nahe ganz oben immer sichtbar.
  function wireNavAutohide() {
    const nav = $(".nav");
    if (!nav) return;
    let lastY = window.scrollY;
    let ticking = false;
    const THRESH = 6;   // kleine Bewegungen ignorieren (ruhiger)
    const update = () => {
      const y = Math.max(0, window.scrollY);
      const dy = y - lastY;
      if (Math.abs(dy) >= THRESH) {
        if (y <= nav.offsetHeight || dy < 0) nav.classList.remove("nav--hidden"); // oben oder hoch -> zeigen
        else nav.classList.add("nav--hidden");                                    // runter -> weg
        lastY = y;
      }
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
  }

  /* ===================== INIT ===================== */
  function init() {
    renderStand();
    renderCards();
    renderStrecke();
    renderCharts();
    renderShame();
    renderLog();
    renderTicker();
    fitScrollPad();
    wireNavAutohide();
  }
  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
