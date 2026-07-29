/* ============================================================
   Non-U.S. IMG Match Outcomes 2026 — interactive explorer
   Data: NRMP Charting Outcomes, 2026 Main Residency Match.
   ============================================================ */
(function () {
  "use strict";

  var S = DATA.specialties, M = DATA.metrics, O = DATA.overall;
  var metricByKey = {};
  M.forEach(function (m) { metricByKey[m.key] = m; });

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var el = function (tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  };
  var fmt = function (v, dp) {
    if (v == null) return "—";
    return dp === 0 ? String(Math.round(v)) : Number(v).toFixed(dp == null ? 1 : dp);
  };
  var esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  };

  /* Step 2 CK is a score, everything else is a count — controls decimals. */
  function dpFor(key) { return key === "step2ck" ? 0 : 1; }

  function tier(rate) {
    if (rate >= 50) return { cls: "viable", label: "Realistic" };
    if (rate >= 33) return { cls: "contested", label: "Contested" };
    return { cls: "closed", label: "Long shot" };
  }

  /* ---------------- theme ---------------- */
  var themeBtn = $("#themeBtn");
  function currentTheme() {
    /* dark is the site default; light is opt-in and remembered */
    return document.documentElement.getAttribute("data-theme") || "dark";
  }
  /* The button names where it will take you, not where you are. */
  function paintThemeBtn() {
    var dark = currentTheme() === "dark";
    themeBtn.textContent = dark ? "☀︎" : "☾";
    themeBtn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  }
  themeBtn.addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    paintThemeBtn();
    try { localStorage.setItem("img2026-theme", next); } catch (e) {}
    redrawCharts();
  });
  try {
    var saved = localStorage.getItem("img2026-theme");
    if (saved) document.documentElement.setAttribute("data-theme", saved);
  } catch (e) {}
  paintThemeBtn();

  /* ---------------- tooltip ---------------- */
  var tip = el("div", "tip");
  document.body.appendChild(tip);
  function showTip(evt, html) {
    tip.innerHTML = html;
    tip.classList.add("on");
    var pad = 14, w = tip.offsetWidth, h = tip.offsetHeight;
    var x = evt.clientX + pad, y = evt.clientY + pad;
    if (x + w > window.innerWidth - 8) x = evt.clientX - w - pad;
    if (y + h > window.innerHeight - 8) y = evt.clientY - h - pad;
    tip.style.left = x + "px";
    tip.style.top = y + "px";
  }
  function hideTip() { tip.classList.remove("on"); }

  /* ============================================================
     1. Headline aggregate — the two levers
     ============================================================ */
  /* Labels a first-time reader cannot be expected to decode. The other rows
     say what they are. Keyed on the label used in the aggregate table. */
  var GLOSS = {
    "Contiguous ranks":
      "Programs ranked in one specialty before a program from another specialty appears on the list.",
    "Publications":
      "Peer-reviewed articles, book chapters, monographs and case reports. Counted separately from abstracts for the first time in 2026.",
    "Abstracts":
      "Conference abstracts later published in a peer-reviewed journal.",
    "Presentations":
      "Posters and talks at conferences or school research days."
  };

  function renderAggregate() {
    var tb = $("#aggBody");
    O.aggregate.forEach(function (r) {
      var tr = el("tr");
      var td0 = el("td", "name");
      td0.appendChild(document.createTextNode(r.measure));
      if (r.measure === "USMLE Step 2 CK") {
        var p = el("span", "pill tiny viable", "verified");
        p.style.marginLeft = "8px";
        td0.appendChild(p);
      }
      if (GLOSS[r.measure]) td0.appendChild(el("span", "gloss", GLOSS[r.measure]));
      tr.appendChild(td0);
      tr.appendChild(el("td", "num", r.matched));
      tr.appendChild(el("td", "num", r.notMatched));
      var verdict = el("td");
      /* "No separation" rather than "no signal": what the row shows is that the
         two groups land in the same place, not that the measure is meaningless. */
      var pill = el("span", "pill " + (r.separates ? "viable" : "closed"),
        r.separates ? "Separates" : "No separation");
      verdict.appendChild(pill);
      tr.appendChild(verdict);
      tb.appendChild(tr);
    });
  }

  /* ============================================================
     2. Specialty explorer — sortable table with expandable detail
     ============================================================ */
  var sortKey = "matchRate", sortDir = -1, openSpec = null, filterText = "";

  var COLS = [
    { k: "short",          label: "Specialty",            t: "text" },
    { k: "matchRate",      label: "IMG match rate",       t: "rate", help: "Share of non-U.S. IMGs who ranked this specialty first and matched into it." },
    { k: "imgTotal",       label: "IMGs who tried",       t: "int",  help: "Non-U.S. IMGs who ranked this specialty first." },
    { k: "imgMatched",     label: "Matched",              t: "int",  help: "Non-U.S. IMGs who ranked this specialty first and got in." },
    { k: "imgNotMatched",  label: "Did not match",        t: "int",  help: "Non-U.S. IMGs who ranked this specialty first and did not get in." },
    { k: "positions",      label: "Positions",            t: "int",  help: "Total positions offered in the specialty (all applicant types)." },
    { k: "allPerPos",      label: "Applicants / position", t: "dec", help: "All applicants preferring the specialty per position offered. Above 1.0 means oversubscribed." },
    { k: "step2Matched",   label: "Step 2 CK (matched)",  t: "score", help: "Median USMLE Step 2 CK of the IMGs who matched into this specialty." },
    { k: "ranksMatched",   label: "Contiguous ranks (matched)", t: "dec1", help: "Median number of programs the matched IMGs ranked inside this specialty before a program from another specialty appeared on their list." }
  ];

  function derived(s, k) {
    if (k === "step2Matched") return med(s, "step2ck", "matched");
    if (k === "ranksMatched") return med(s, "contiguous_ranks", "matched");
    return s[k];
  }
  function med(s, metric, cohort) {
    var m = s.metrics[metric];
    return m && m[cohort] ? m[cohort].median : null;
  }
  function cell(s, c) {
    var v = derived(s, c.k);
    if (c.t === "int") return v == null ? "—" : v.toLocaleString();
    if (c.t === "dec") return fmt(v, 2);
    if (c.t === "dec1") return fmt(v, 1);
    if (c.t === "score") return v == null ? "—" : String(Math.round(v));
    return v;
  }

  function buildHead() {
    var tr = $("#specHead");
    tr.innerHTML = "";
    COLS.forEach(function (c) {
      var th = el("th", "sortable");
      th.appendChild(document.createTextNode(c.label));
      /* the glyph is decoration; aria-sort carries the meaning */
      var arrow = el("span", "arrow", sortKey === c.k ? (sortDir < 0 ? "▼" : "▲") : "↕");
      arrow.setAttribute("aria-hidden", "true");
      th.appendChild(arrow);
      th.setAttribute("aria-sort",
        sortKey !== c.k ? "none" : sortDir < 0 ? "descending" : "ascending");
      if (c.help) {
        th.style.cursor = "help";
        th.addEventListener("mousemove", function (e) { showTip(e, "<b>" + esc(c.label) + "</b><br>" + esc(c.help)); });
        th.addEventListener("mouseleave", hideTip);
      }
      th.addEventListener("click", function () {
        if (sortKey === c.k) sortDir = -sortDir;
        else { sortKey = c.k; sortDir = c.k === "short" ? 1 : -1; }
        buildHead(); buildBody();
      });
      tr.appendChild(th);
    });
  }

  function sortedSpecs() {
    var list = S.filter(function (s) {
      return !filterText || s.name.toLowerCase().indexOf(filterText) >= 0 ||
        s.short.toLowerCase().indexOf(filterText) >= 0;
    });
    return list.slice().sort(function (a, b) {
      var x = derived(a, sortKey), y = derived(b, sortKey);
      if (x == null && y == null) return 0;
      if (x == null) return 1;       /* suppressed values always sink */
      if (y == null) return -1;
      if (typeof x === "string") return sortDir * x.localeCompare(y);
      return sortDir * (x - y);
    });
  }

  function buildBody() {
    var tb = $("#specBody");
    tb.innerHTML = "";
    var list = sortedSpecs();
    if (!list.length) {
      var tr0 = el("tr"), td0 = el("td", "", "No specialty matches that search. Clear the box to see all 24.");
      td0.colSpan = COLS.length; td0.style.textAlign = "center"; td0.style.color = "var(--ink-3)";
      tr0.appendChild(td0); tb.appendChild(tr0); return;
    }
    list.forEach(function (s) {
      var tr = el("tr", "clickable" + (openSpec === s.name ? " open" : ""));
      tr.tabIndex = 0;
      COLS.forEach(function (c) {
        var td = el("td", c.t === "text" ? "name" : "num");
        if (c.k === "short") {
          td.appendChild(document.createTextNode(s.short));
          var t = tier(s.matchRate);
          var p = el("span", "pill tiny " + t.cls, t.label);
          p.style.marginLeft = "8px";
          td.appendChild(p);
        } else if (c.t === "rate") {
          var box = el("div", "ratebar");
          box.appendChild(el("span", "num", fmt(s.matchRate, 1) + "%"));
          var track = el("div", "track"), fill = el("div", "fill");
          fill.style.width = s.matchRate + "%";
          fill.style.background = s.matchRate >= 50 ? "var(--matched)"
            : s.matchRate >= 33 ? "var(--unmatched)" : "var(--ink-3)";
          track.appendChild(fill); box.appendChild(track);
          td.appendChild(box);
        } else {
          td.textContent = cell(s, c);
        }
        tr.appendChild(td);
      });
      var toggle = function () {
        openSpec = openSpec === s.name ? null : s.name;
        buildBody();
      };
      tr.addEventListener("click", toggle);
      tr.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
      });
      tb.appendChild(tr);

      if (openSpec === s.name) {
        var dr = el("tr", "detailrow");
        var dtd = el("td");
        dtd.colSpan = COLS.length;
        dtd.appendChild(buildDetail(s));
        dr.appendChild(dtd);
        tb.appendChild(dr);
      }
    });
  }

  /* ---- per-specialty detail with box plots ---- */
  function buildDetail(s) {
    var box = el("div", "detail");

    var hd = el("div", "detail-hd");
    var h = el("h3", null, s.name);
    hd.appendChild(h);
    hd.appendChild(el("span", "sub",
      s.imgMatched.toLocaleString() + " of " + s.imgTotal.toLocaleString() +
      " non-U.S. IMGs matched (" + fmt(s.matchRate, 1) + "%) · " +
      s.positions.toLocaleString() + " positions · " +
      fmt(s.allPerPos, 2) + " applicants per position"));
    box.appendChild(hd);

    var nM = (s.metrics.step2ck && s.metrics.step2ck.matched) ? s.metrics.step2ck.matched.n : 0;
    var nN = (s.metrics.step2ck && s.metrics.step2ck.not_matched) ? s.metrics.step2ck.not_matched.n : 0;
    var note = el("p", "detail-note");
    note.innerHTML = "Each bar reads left to right. The box covers the middle 50% of applicants (25th to 75th " +
      "percentile), the vertical line inside it is the median, and the thin line running out either side reaches " +
      "the lowest and highest reported values. Based on <b>" + nM + "</b> matched and <b>" + nN +
      "</b> unmatched applicants who consented to research use of their data.";
    box.appendChild(note);

    var leg = el("div", "legend");
    leg.innerHTML = '<span><i class="sw-m"></i>Matched into this specialty</span>' +
      '<span><i class="sw-n"></i>Did not match into this specialty</span>';
    box.appendChild(leg);

    var grid = el("div", "metricgrid");
    M.forEach(function (m) {
      grid.appendChild(metricCard(s, m));
    });
    grid.appendChild(degreeCard(s));
    box.appendChild(grid);
    return box;
  }

  function metricCard(s, m) {
    var card = el("div", "mcard");
    var data = s.metrics[m.key] || {};
    var a = data.matched, b = data.not_matched;

    var hd = el("div", "mcard-hd");
    var t = el("span", "t", m.label);
    if (m.verified) {
      var vp = el("span", "pill tiny viable", "verified");
      vp.style.marginLeft = "6px";
      t.appendChild(vp);
    }
    hd.appendChild(t);

    var dp = dpFor(m.key);
    if (a && b && a.median != null && b.median != null) {
      var diff = a.median - b.median;
      var cls = Math.abs(diff) < (m.key === "step2ck" ? 1 : 0.05) ? "flat" : (diff > 0 ? "up" : "down");
      var sign = diff > 0 ? "+" : "";
      hd.appendChild(el("span", "d " + cls, "median " + sign + fmt(diff, dp)));
    }
    card.appendChild(hd);
    card.appendChild(el("p", "why", m.desc));

    if (!a || a.median == null || !b || b.median == null) {
      var only = (a && a.median != null) ? a : (b && b.median != null) ? b : null;
      if (only) {
        card.appendChild(boxplot([{ label: (a && a.median != null) ? "Matched" : "Did not match", s: only, color: "var(--unmatched)" }], m));
      }
      card.appendChild(el("div", "suppressed",
        "NRMP withheld one of the two groups here. Fewer than five of its applicants consented to research use of their data, so no median was published."));
      return card;
    }

    card.appendChild(boxplot([
      { label: "Matched", s: a, color: "var(--matched)" },
      { label: "Did not match", s: b, color: "var(--unmatched)" }
    ], m));
    return card;
  }

  /* box-and-whisker rows on a shared scale */
  function boxplot(rows, m) {
    var W = 300, LEFT = 4, RIGHT = 46, rowH = 34, H = rows.length * rowH + 20;
    var lo = Infinity, hi = -Infinity;
    rows.forEach(function (r) {
      lo = Math.min(lo, r.s.min); hi = Math.max(hi, r.s.max);
    });
    if (hi === lo) { hi = lo + 1; }
    var pad = (hi - lo) * 0.04;
    lo -= pad; hi += pad;
    var x = function (v) { return LEFT + (v - lo) / (hi - lo) * (W - LEFT - RIGHT); };

    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", H);
    svg.setAttribute("role", "img");

    var dp = dpFor(m.key);
    var labels = rows.map(function (r) {
      return r.label + ": median " + fmt(r.s.median, dp) + ", middle 50% " +
        fmt(r.s.q1, dp) + " to " + fmt(r.s.q3, dp) + ", range " + fmt(r.s.min, dp) + " to " + fmt(r.s.max, dp);
    });
    var title = document.createElementNS(ns, "title");
    title.textContent = m.label + ". " + labels.join(". ");
    svg.appendChild(title);

    rows.forEach(function (r, i) {
      var cy = 12 + i * rowH + rowH / 2 - 6;
      var g = document.createElementNS(ns, "g");

      var whisk = document.createElementNS(ns, "line");
      whisk.setAttribute("x1", x(r.s.min)); whisk.setAttribute("x2", x(r.s.max));
      whisk.setAttribute("y1", cy); whisk.setAttribute("y2", cy);
      whisk.setAttribute("stroke", r.color); whisk.setAttribute("stroke-width", "1.25");
      whisk.setAttribute("opacity", ".5");
      g.appendChild(whisk);

      [r.s.min, r.s.max].forEach(function (v) {
        var c = document.createElementNS(ns, "line");
        c.setAttribute("x1", x(v)); c.setAttribute("x2", x(v));
        c.setAttribute("y1", cy - 4); c.setAttribute("y2", cy + 4);
        c.setAttribute("stroke", r.color); c.setAttribute("stroke-width", "1.25");
        c.setAttribute("opacity", ".5");
        g.appendChild(c);
      });

      var bw = Math.max(2, x(r.s.q3) - x(r.s.q1));
      var rect = document.createElementNS(ns, "rect");
      rect.setAttribute("x", x(r.s.q1)); rect.setAttribute("y", cy - 9);
      rect.setAttribute("width", bw); rect.setAttribute("height", 18);
      rect.setAttribute("rx", "3");
      rect.setAttribute("fill", r.color); rect.setAttribute("opacity", ".22");
      rect.setAttribute("stroke", r.color); rect.setAttribute("stroke-width", "1");
      g.appendChild(rect);

      var mid = document.createElementNS(ns, "line");
      mid.setAttribute("x1", x(r.s.median)); mid.setAttribute("x2", x(r.s.median));
      mid.setAttribute("y1", cy - 10); mid.setAttribute("y2", cy + 10);
      mid.setAttribute("stroke", r.color); mid.setAttribute("stroke-width", "2.5");
      mid.setAttribute("stroke-linecap", "round");
      g.appendChild(mid);

      var lbl = document.createElementNS(ns, "text");
      lbl.setAttribute("x", W - RIGHT + 8); lbl.setAttribute("y", cy + 4);
      lbl.setAttribute("font-size", "12"); lbl.setAttribute("font-weight", "600");
      lbl.setAttribute("fill", r.color);
      lbl.setAttribute("font-family", "ui-monospace,Menlo,monospace");
      lbl.textContent = fmt(r.s.median, dp);
      g.appendChild(lbl);

      g.style.cursor = "help";
      g.addEventListener("mousemove", function (e) {
        showTip(e, "<b>" + esc(r.label) + "</b> (n=" + r.s.n + ")<br>" +
          "median <b>" + fmt(r.s.median, dp) + "</b><br>" +
          "middle 50%: " + fmt(r.s.q1, dp) + "–" + fmt(r.s.q3, dp) + "<br>" +
          "range: " + fmt(r.s.min, dp) + "–" + fmt(r.s.max, dp) + "<br>" +
          "mean " + fmt(r.s.mean, dp) + " · SD " + fmt(r.s.sd, dp));
      });
      g.addEventListener("mouseleave", hideTip);
      svg.appendChild(g);
    });

    var axis = document.createElementNS(ns, "g");
    [lo, hi].forEach(function (v, i) {
      var tx = document.createElementNS(ns, "text");
      tx.setAttribute("x", i === 0 ? LEFT : x(hi));
      tx.setAttribute("y", H - 3);
      tx.setAttribute("font-size", "10.5");
      tx.setAttribute("text-anchor", i === 0 ? "start" : "end");
      tx.setAttribute("opacity", ".65");
      tx.textContent = fmt(v, dp);
      axis.appendChild(tx);
    });
    svg.appendChild(axis);
    return svg;
  }

  function degreeCard(s) {
    var card = el("div", "mcard");
    var hd = el("div", "mcard-hd");
    hd.appendChild(el("span", "t", "Ph.D. and other graduate degrees"));
    card.appendChild(hd);
    card.appendChild(el("p", "why",
      "Share of each cohort holding the degree. Across most specialties a non-Ph.D. graduate degree is more common among applicants who did not match."));
    var rows = [
      { label: "Has a Ph.D.", d: s.phd },
      { label: "Has another graduate degree", d: s.gradDegree }
    ];
    var tbl = el("table");
    tbl.style.fontSize = "13px";
    var tb = el("tbody");
    rows.forEach(function (r) {
      var tr = el("tr");
      tr.appendChild(el("td", "name", r.label));
      var m = el("td", "num", r.d.matched == null ? "—" : fmt(r.d.matched, 1) + "%");
      m.style.color = "var(--matched)"; m.style.fontWeight = "600";
      var n = el("td", "num", r.d.not_matched == null ? "—" : fmt(r.d.not_matched, 1) + "%");
      n.style.color = "var(--unmatched)"; n.style.fontWeight = "600";
      tr.appendChild(m); tr.appendChild(n);
      tb.appendChild(tr);
    });
    tbl.appendChild(tb);
    card.appendChild(tbl);
    return card;
  }

  /* ============================================================
     3. Cross-specialty metric comparison
     ============================================================ */
  var cmpMetric = "contiguous_ranks", cmpSort = "gap";

  function renderCompare() {
    var host = $("#cmpChart");
    host.innerHTML = "";
    var m = metricByKey[cmpMetric];
    $("#cmpDesc").textContent = m.desc;

    var rows = S.map(function (s) {
      var d = s.metrics[cmpMetric] || {};
      var a = d.matched && d.matched.median, b = d.not_matched && d.not_matched.median;
      return { s: s, a: a == null ? null : a, b: b == null ? null : b,
               gap: (a != null && b != null) ? a - b : null };
    }).filter(function (r) { return r.a != null || r.b != null; });

    rows.sort(function (p, q) {
      if (cmpSort === "gap") {
        if (p.gap == null) return 1; if (q.gap == null) return -1;
        return q.gap - p.gap;
      }
      if (cmpSort === "matched") {
        if (p.a == null) return 1; if (q.a == null) return -1;
        return q.a - p.a;
      }
      return q.s.matchRate - p.s.matchRate;
    });

    var maxV = 0;
    rows.forEach(function (r) { maxV = Math.max(maxV, r.a || 0, r.b || 0); });
    var isScore = cmpMetric === "step2ck";
    var lo = isScore ? 200 : 0, hi = isScore ? Math.ceil(maxV / 10) * 10 + 5 : maxV * 1.1 || 1;

    var ns = "http://www.w3.org/2000/svg";
    var LABEL = 190, RIGHT = 60, rowH = 30, TOP = 34;
    var W = Math.max(620, host.clientWidth || 800);
    var H = rows.length * rowH + TOP + 26;
    var plotW = W - LABEL - RIGHT;
    var x = function (v) { return LABEL + (v - lo) / (hi - lo) * plotW; };

    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", H);
    svg.setAttribute("role", "img");
    svg.style.minWidth = "620px";
    var cmpTitle = document.createElementNS(ns, "title");
    cmpTitle.textContent = m.label + ", median for every specialty, matched against did not match. " +
      "The same figures are listed in the full data table below.";
    svg.appendChild(cmpTitle);

    var ticks = 5, dp = dpFor(cmpMetric);
    for (var i = 0; i <= ticks; i++) {
      var v = lo + (hi - lo) * i / ticks;
      var gx = x(v);
      var ln = document.createElementNS(ns, "line");
      ln.setAttribute("x1", gx); ln.setAttribute("x2", gx);
      ln.setAttribute("y1", TOP - 8); ln.setAttribute("y2", H - 24);
      ln.setAttribute("class", "gridline");
      svg.appendChild(ln);
      var tx = document.createElementNS(ns, "text");
      tx.setAttribute("x", gx); tx.setAttribute("y", TOP - 14);
      tx.setAttribute("font-size", "11"); tx.setAttribute("text-anchor", "middle");
      tx.setAttribute("opacity", ".7");
      tx.textContent = fmt(v, isScore ? 0 : (hi <= 12 ? 0 : 0));
      svg.appendChild(tx);
    }

    rows.forEach(function (r, i) {
      var y = TOP + i * rowH;
      var g = document.createElementNS(ns, "g");

      var lbl = document.createElementNS(ns, "text");
      lbl.setAttribute("x", LABEL - 12); lbl.setAttribute("y", y + 15);
      lbl.setAttribute("font-size", "12.5"); lbl.setAttribute("text-anchor", "end");
      lbl.textContent = r.s.short;
      g.appendChild(lbl);

      [[r.b, "var(--unmatched)", 1], [r.a, "var(--matched)", 0]].forEach(function (pair) {
        if (pair[0] == null) return;
        var bar = document.createElementNS(ns, "rect");
        var bw = Math.max(1.5, x(pair[0]) - x(lo));
        bar.setAttribute("x", x(lo));
        bar.setAttribute("y", y + 3 + pair[2] * 10);
        bar.setAttribute("width", bw);
        bar.setAttribute("height", 9);
        bar.setAttribute("rx", "2");
        bar.setAttribute("fill", pair[1]);
        bar.setAttribute("opacity", pair[2] ? ".62" : "1");
        g.appendChild(bar);
      });

      var val = document.createElementNS(ns, "text");
      val.setAttribute("x", W - RIGHT + 10); val.setAttribute("y", y + 16);
      val.setAttribute("font-size", "11.5");
      val.setAttribute("font-family", "ui-monospace,Menlo,monospace");
      val.textContent = (r.a == null ? "—" : fmt(r.a, dp)) + " / " + (r.b == null ? "—" : fmt(r.b, dp));
      g.appendChild(val);

      var hit = document.createElementNS(ns, "rect");
      hit.setAttribute("x", 0); hit.setAttribute("y", y);
      hit.setAttribute("width", W); hit.setAttribute("height", rowH);
      hit.setAttribute("fill", "transparent");
      hit.style.cursor = "pointer";
      hit.addEventListener("mousemove", function (e) {
        showTip(e, "<b>" + esc(r.s.name) + "</b><br>" +
          "Matched: <b>" + (r.a == null ? "withheld" : fmt(r.a, dp)) + "</b><br>" +
          "Did not match: <b>" + (r.b == null ? "withheld" : fmt(r.b, dp)) + "</b><br>" +
          (r.gap != null ? "Gap: " + (r.gap > 0 ? "+" : "") + fmt(r.gap, dp) + "<br>" : "") +
          "IMG match rate " + fmt(r.s.matchRate, 1) + "%");
      });
      hit.addEventListener("mouseleave", hideTip);
      hit.addEventListener("click", function () {
        openSpec = r.s.name; buildBody();
        document.getElementById("explorer").scrollIntoView({ behavior: "smooth", block: "start" });
      });
      g.appendChild(hit);
      svg.appendChild(g);
    });

    host.appendChild(svg);
  }

  /* ============================================================
     4. Competitiveness scatter
     ============================================================ */
  function renderScatter() {
    var host = $("#scatter");
    host.innerHTML = "";
    var ns = "http://www.w3.org/2000/svg";
    var W = Math.max(640, host.clientWidth || 820), H = 460;
    var L = 58, R = 24, T = 22, B = 58;

    var xs = S.map(function (s) { return s.allPerPos; });
    var xlo = 0.7, xhi = Math.max.apply(null, xs) + 0.1;
    var ylo = 0, yhi = 75;
    var X = function (v) { return L + (v - xlo) / (xhi - xlo) * (W - L - R); };
    var Y = function (v) { return T + (1 - (v - ylo) / (yhi - ylo)) * (H - T - B); };

    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.setAttribute("width", "100%"); svg.setAttribute("height", H);
    svg.setAttribute("role", "img");
    svg.style.minWidth = "640px";
    var scTitle = document.createElementNS(ns, "title");
    scTitle.textContent = "Scatter plot of non-U.S. IMG match rate against all applicants per position, " +
      "one circle per specialty, sized by how many IMGs ranked it first. Match rate falls as applicants " +
      "per position rises. Every value is listed in the specialty table above.";
    svg.appendChild(scTitle);

    for (var gy = 0; gy <= 70; gy += 10) {
      var ln = document.createElementNS(ns, "line");
      ln.setAttribute("x1", L); ln.setAttribute("x2", W - R);
      ln.setAttribute("y1", Y(gy)); ln.setAttribute("y2", Y(gy));
      ln.setAttribute("class", gy === 0 ? "axisline" : "gridline");
      svg.appendChild(ln);
      var t = document.createElementNS(ns, "text");
      t.setAttribute("x", L - 10); t.setAttribute("y", Y(gy) + 4);
      t.setAttribute("font-size", "11"); t.setAttribute("text-anchor", "end");
      t.setAttribute("opacity", ".7");
      t.textContent = gy + "%";
      svg.appendChild(t);
    }
    for (var gx = 0.8; gx <= xhi; gx += 0.2) {
      var vl = document.createElementNS(ns, "line");
      vl.setAttribute("x1", X(gx)); vl.setAttribute("x2", X(gx));
      vl.setAttribute("y1", T); vl.setAttribute("y2", Y(0));
      vl.setAttribute("class", "gridline");
      svg.appendChild(vl);
      var xt = document.createElementNS(ns, "text");
      xt.setAttribute("x", X(gx)); xt.setAttribute("y", Y(0) + 18);
      xt.setAttribute("font-size", "11"); xt.setAttribute("text-anchor", "middle");
      xt.setAttribute("opacity", ".7");
      xt.textContent = gx.toFixed(1);
      svg.appendChild(xt);
    }

    /* 1.0 applicants-per-position reference: supply equals demand */
    var one = document.createElementNS(ns, "line");
    one.setAttribute("x1", X(1)); one.setAttribute("x2", X(1));
    one.setAttribute("y1", T); one.setAttribute("y2", Y(0));
    one.setAttribute("stroke", "var(--ink-3)"); one.setAttribute("stroke-dasharray", "4 4");
    one.setAttribute("opacity", ".55");
    svg.appendChild(one);
    var oneT = document.createElementNS(ns, "text");
    oneT.setAttribute("x", X(1) + 6); oneT.setAttribute("y", T + 12);
    oneT.setAttribute("font-size", "10.5"); oneT.setAttribute("opacity", ".7");
    oneT.textContent = "1 applicant per position";
    svg.appendChild(oneT);

    var xlab = document.createElementNS(ns, "text");
    xlab.setAttribute("x", (L + W - R) / 2); xlab.setAttribute("y", H - 12);
    xlab.setAttribute("font-size", "12"); xlab.setAttribute("text-anchor", "middle");
    xlab.setAttribute("font-weight", "600");
    xlab.textContent = "All applicants per position  →  more competitive";
    svg.appendChild(xlab);

    var ylab = document.createElementNS(ns, "text");
    ylab.setAttribute("transform", "rotate(-90)");
    ylab.setAttribute("x", -(T + H - B) / 2); ylab.setAttribute("y", 15);
    ylab.setAttribute("font-size", "12"); ylab.setAttribute("text-anchor", "middle");
    ylab.setAttribute("font-weight", "600");
    ylab.textContent = "Non-U.S. IMG match rate";
    svg.appendChild(ylab);

    var maxN = Math.max.apply(null, S.map(function (s) { return s.imgTotal; }));
    var radius = function (s) { return 5 + Math.sqrt(s.imgTotal / maxN) * 26; };
    /* seeded with the reference-line annotation so no bubble label lands on it */
    var placed = [{ x1: X(1) + 4, x2: X(1) + 132, y1: T + 2, y2: T + 16 }];
    var overlaps = function (a, b) {
      return !(a.x2 < b.x1 || b.x2 < a.x1 || a.y2 < b.y1 || b.y2 < a.y1);
    };
    /* every mark's footprint, so labels never sit on top of a circle */
    var circles = S.map(function (s) {
      var r = radius(s);
      return { x1: X(s.allPerPos) - r, x2: X(s.allPerPos) + r,
               y1: Y(s.matchRate) - r, y2: Y(s.matchRate) + r };
    });

    S.slice().sort(function (a, b) { return b.imgTotal - a.imgTotal; }).forEach(function (s) {
      var r = radius(s);
      var c = document.createElementNS(ns, "circle");
      c.setAttribute("cx", X(s.allPerPos)); c.setAttribute("cy", Y(s.matchRate));
      c.setAttribute("r", r);
      var t = tier(s.matchRate);
      c.setAttribute("fill", t.cls === "viable" ? "var(--matched)" : t.cls === "contested" ? "var(--unmatched)" : "var(--ink-3)");
      c.setAttribute("opacity", ".42");
      c.setAttribute("stroke", t.cls === "viable" ? "var(--matched)" : t.cls === "contested" ? "var(--unmatched)" : "var(--ink-3)");
      c.setAttribute("stroke-width", "1.5");
      c.setAttribute("class", "dot");
      c.addEventListener("mousemove", function (e) {
        showTip(e, "<b>" + esc(s.name) + "</b><br>" +
          "IMG match rate <b>" + fmt(s.matchRate, 1) + "%</b><br>" +
          s.imgMatched.toLocaleString() + " of " + s.imgTotal.toLocaleString() + " IMGs matched<br>" +
          fmt(s.allPerPos, 2) + " applicants per position<br>" +
          s.positions.toLocaleString() + " positions offered");
      });
      c.addEventListener("mouseleave", hideTip);
      c.addEventListener("click", function () {
        openSpec = s.name; buildBody();
        document.getElementById("explorer").scrollIntoView({ behavior: "smooth", block: "start" });
      });
      svg.appendChild(c);

      /* Label the specialties worth naming, skipping any that would collide.
         Bubbles are drawn largest-first, so the biggest cohorts win the space. */
      if (s.imgTotal >= 130 || s.matchRate >= 58 || s.matchRate <= 20) {
        var cx = X(s.allPerPos), cy = Y(s.matchRate);
        var w = s.short.length * 5.9 + 4, h = 13;
        var cands = [
          { x: cx,             y: cy - r - 6,     anchor: "middle" },
          { x: cx,             y: cy + r + 13,    anchor: "middle" },
          { x: cx + r + 6,     y: cy + 4,         anchor: "start"  },
          { x: cx - r - 6,     y: cy + 4,         anchor: "end"    }
        ];
        /* A bubble big enough to hold its own name keeps it inside, so the
           largest cohorts never go unlabelled in a crowded neighbourhood. */
        if (w < r * 1.9) cands.unshift({ x: cx, y: cy + 4, anchor: "middle", overMark: true });
        /* Last resort for the biggest cohorts: sit over a neighbouring mark,
           on a background plate that keeps the text readable. */
        if (s.imgTotal >= 300) cands.push({ x: cx, y: cy - r - 6, anchor: "middle", overMark: true, plate: true });

        for (var ci = 0; ci < cands.length; ci++) {
          var p = cands[ci];
          var x1 = p.anchor === "middle" ? p.x - w / 2 : p.anchor === "start" ? p.x : p.x - w;
          var bx = { x1: x1, x2: x1 + w, y1: p.y - h + 3, y2: p.y + 3 };
          if (bx.x1 < L || bx.x2 > W - R || bx.y1 < T || bx.y2 > Y(0)) continue;
          if (placed.some(function (q) { return overlaps(bx, q); })) continue;
          if (!p.overMark && circles.some(function (q) { return overlaps(bx, q); })) continue;
          if (p.plate) {
            var plate = document.createElementNS(ns, "rect");
            plate.setAttribute("x", bx.x1 - 3); plate.setAttribute("y", bx.y1 - 1);
            plate.setAttribute("width", w + 6); plate.setAttribute("height", h + 2);
            plate.setAttribute("rx", "3");
            plate.setAttribute("fill", "var(--bg-elev)");
            plate.setAttribute("opacity", ".82");
            plate.setAttribute("pointer-events", "none");
            svg.appendChild(plate);
          }
          var lb = document.createElementNS(ns, "text");
          lb.setAttribute("x", p.x); lb.setAttribute("y", p.y);
          lb.setAttribute("font-size", "11"); lb.setAttribute("text-anchor", p.anchor);
          lb.setAttribute("font-weight", "600");
          lb.setAttribute("pointer-events", "none");
          lb.textContent = s.short;
          svg.appendChild(lb);
          placed.push(bx);
          break;
        }
      }
    });
    host.appendChild(svg);
  }

  /* ============================================================
     5. Full data browser
     ============================================================ */
  var dbMetric = "all", dbSpec = "all";

  function tidyRows() {
    var out = [];
    S.forEach(function (s) {
      if (dbSpec !== "all" && s.name !== dbSpec) return;
      M.forEach(function (m) {
        if (dbMetric !== "all" && m.key !== dbMetric) return;
        var d = s.metrics[m.key] || {};
        ["matched", "not_matched"].forEach(function (c) {
          var v = d[c];
          if (!v) return;
          out.push({
            specialty: s.name, metric: m.label, metric_key: m.key,
            cohort: c === "matched" ? "Matched" : "Did not match",
            n: v.n, min: v.min, q1: v.q1, median: v.median, q3: v.q3,
            max: v.max, iqr: v.iqr, mean: v.mean, sd: v.sd,
            specialty_match_rate: s.matchRate, positions: s.positions,
            img_total: s.imgTotal, img_matched: s.imgMatched, img_not_matched: s.imgNotMatched,
            all_applicants_per_position: s.allPerPos
          });
        });
      });
    });
    return out;
  }

  /* computed while both filters are still "all", so it is the true total */
  var TOTAL_ROWS = tidyRows().length;

  function renderDb() {
    var rows = tidyRows();
    /* say "18 of 432" when filtered, so the filter's effect is legible */
    var filtered = dbSpec !== "all" || dbMetric !== "all";
    $("#dbCount").textContent = filtered
      ? rows.length.toLocaleString() + " of " + TOTAL_ROWS.toLocaleString() + " rows"
      : rows.length.toLocaleString() + " rows";
    var tb = $("#dbBody");
    tb.innerHTML = "";
    var frag = document.createDocumentFragment();
    rows.forEach(function (r) {
      var tr = el("tr");
      var dp = dpFor(r.metric_key);
      [["name", r.specialty], ["", r.metric],
       ["", r.cohort], ["num", r.n], ["num", fmt(r.min, dp)], ["num", fmt(r.q1, dp)],
       ["num", fmt(r.median, dp)], ["num", fmt(r.q3, dp)], ["num", fmt(r.max, dp)],
       ["num", fmt(r.iqr, dp)], ["num", fmt(r.mean, dp)], ["num", fmt(r.sd, dp)]
      ].forEach(function (c, i) {
        var td = el("td", c[0], c[1] == null ? "—" : String(c[1]));
        if (i === 2) {
          td.innerHTML = "";
          var p = el("span", "pill tiny " + (r.cohort === "Matched" ? "viable" : "contested"), r.cohort);
          td.appendChild(p);
        }
        tr.appendChild(td);
      });
      frag.appendChild(tr);
    });
    tb.appendChild(frag);
  }

  /* ---------------- export ---------------- */
  function toCSV(rows, cols) {
    var head = cols.join(",");
    var body = rows.map(function (r) {
      return cols.map(function (c) {
        var v = r[c];
        if (v == null) return "";
        v = String(v);
        return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
      }).join(",");
    }).join("\n");
    return head + "\n" + body + "\n";
  }
  function download(name, text, mime) {
    var blob = new Blob([text], { type: (mime || "text/csv") + ";charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
  }
  var TIDY_COLS = ["specialty", "metric", "metric_key", "cohort", "n", "min", "q1", "median", "q3",
    "max", "iqr", "mean", "sd", "specialty_match_rate", "positions", "img_total",
    "img_matched", "img_not_matched", "all_applicants_per_position"];

  function summaryRows() {
    return S.map(function (s) {
      return {
        specialty: s.name, positions: s.positions, all_applicants: s.allApplicants,
        all_applicants_per_position: s.allPerPos, img_total: s.imgTotal,
        img_matched: s.imgMatched, img_not_matched: s.imgNotMatched,
        img_match_rate_pct: s.matchRate, img_per_position: s.imgPerPos,
        step2ck_median_matched: med(s, "step2ck", "matched"),
        step2ck_median_not_matched: med(s, "step2ck", "not_matched"),
        contiguous_ranks_median_matched: med(s, "contiguous_ranks", "matched"),
        contiguous_ranks_median_not_matched: med(s, "contiguous_ranks", "not_matched"),
        publications_median_matched: med(s, "publications", "matched"),
        publications_median_not_matched: med(s, "publications", "not_matched"),
        phd_pct_matched: s.phd.matched, phd_pct_not_matched: s.phd.not_matched,
        grad_degree_pct_matched: s.gradDegree.matched, grad_degree_pct_not_matched: s.gradDegree.not_matched
      };
    });
  }
  var SUM_COLS = Object.keys(summaryRows()[0]);

  $("#dlTidy").addEventListener("click", function () {
    download("nrmp-2026-nonus-img-rows.csv", toCSV(tidyRows(), TIDY_COLS));
  });
  $("#dlSummary").addEventListener("click", function () {
    download("nrmp-2026-nonus-img-specialty-summary.csv", toCSV(summaryRows(), SUM_COLS));
  });
  $("#dlJson").addEventListener("click", function () {
    download("nrmp-2026-nonus-img.json", JSON.stringify(DATA, null, 1), "application/json");
  });

  /* ---------------- wiring ---------------- */
  $("#specSearch").addEventListener("input", function (e) {
    filterText = e.target.value.trim().toLowerCase();
    buildBody();
  });
  $("#cmpMetric").addEventListener("change", function (e) {
    cmpMetric = e.target.value; renderCompare();
  });
  document.querySelectorAll("#cmpSort button").forEach(function (b) {
    b.addEventListener("click", function () {
      cmpSort = b.dataset.sort;
      document.querySelectorAll("#cmpSort button").forEach(function (x) {
        x.setAttribute("aria-pressed", x === b ? "true" : "false");
      });
      renderCompare();
    });
  });
  $("#dbMetric").addEventListener("change", function (e) { dbMetric = e.target.value; renderDb(); });
  $("#dbSpec").addEventListener("change", function (e) { dbSpec = e.target.value; renderDb(); });

  function populateSelects() {
    var cm = $("#cmpMetric"), dm = $("#dbMetric"), ds = $("#dbSpec");
    M.forEach(function (m) {
      cm.appendChild(new Option(m.label, m.key));
      dm.appendChild(new Option(m.label, m.key));
    });
    cm.value = cmpMetric;
    S.slice().sort(function (a, b) { return a.name.localeCompare(b.name); })
      .forEach(function (s) { ds.appendChild(new Option(s.short, s.name)); });
  }

  var rt;
  function redrawCharts() { renderCompare(); renderScatter(); }
  window.addEventListener("resize", function () {
    clearTimeout(rt); rt = setTimeout(redrawCharts, 180);
  });

  populateSelects();
  renderAggregate();
  buildHead();
  buildBody();
  renderCompare();
  renderScatter();
  renderDb();
})();
