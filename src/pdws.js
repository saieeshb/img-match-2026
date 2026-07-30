/* ============================================================
   Program-view recreation — the interface.

   Five views, routed off one state object: dashboard, applicant list,
   applicant detail, manage filters, criteria builder. Every filter is a
   predicate run over the synthetic pool, so every count on the page,
   including "Total Items" and the page count, is computed rather than
   written down.
   ============================================================ */
(function () {
  "use strict";

  var A = PD.applicants;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  function el(tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function on(node, ev, fn) { node.addEventListener(ev, fn); return node; }
  function n0(v) { return v == null ? "" : String(v); }
  /* Every interaction rebuilds the view, which would otherwise throw focus back
     to the document on each keystroke or checkbox. Anything reachable carries a
     stable key so render() can put focus back where it was. */
  function fk(node, key) { node.dataset.fkey = key; return node; }

  /* ---------------- annotations ----------------
     Kept in one place so the recreation and the commentary stay separable.
     Each is written to describe what the interface makes possible, not to
     assert what any particular program does with it. */
  var NOTES = {
    filterbar: "Nobody opens 732 applications. A reviewer opens a saved filter, and the "
      + "list below is whatever survived it. The name of that filter is the only visible "
      + "trace of what was excluded.",
    school: "Medical school is a sortable column here, and a filterable field under Medical "
      + "Education, alongside Country of Medical School and LCME Accredited. Those three "
      + "separate graduates of U.S. medical schools from everyone else in one operation.",
    signals: "A program signal is a token an applicant spends to tell a program they are "
      + "genuinely interested. Gold and Silver are tiers. A saved filter can require one, "
      + "which turns the signal into a threshold rather than a tiebreak.",
    total: "The gap between this number and the size of the whole pool is the part of the "
      + "process that leaves no record. An applicant filtered out at this step is not "
      + "rejected; they are never displayed.",
    reviewed: "Applications received and applications reviewed are counted separately. The "
      + "difference is not idleness. It is the share of the pool that a filter never "
      + "surfaced.",
    screened: "Gender, date of birth and self-identification are withheld from the program "
      + "by default and shown here as Screened. They are still listed as filter fields "
      + "under Demographics.",
    step2: "Step 2 CK is a number, so it takes a threshold. This is the measure the NRMP "
      + "data on the main site does separate on: a median of 248 among non-U.S. IMGs who "
      + "matched against 242 among those who did not. The distributions overlap almost "
      + "entirely, and a threshold cuts straight through that overlap.",
    step1: "Step 1 has been reported Pass/Fail since 2022, so as a filter it has two "
      + "values. A single Fail is permanent and visible here for every cycle afterward.",
    attempts: "Number of attempts is filterable independently of the score. Passing on a "
      + "second attempt and passing on the first are the same result and different rows.",
    ecfmg: "ECFMG certification is the credential that makes an IMG eligible to enter U.S. "
      + "graduate medical education. As a filter it is a yes-or-no gate applied before "
      + "anything else about the application is read.",
    visa: "Visa status does not appear anywhere in the NRMP's Charting Outcomes report. The "
      + "main site lists it among the variables the published data cannot measure. It is "
      + "a filter field here, which is the asymmetry worth understanding: invisible in the "
      + "outcome statistics, available at the first step of screening.",
    type: "Applicant Type is a single dropdown. Non-U.S. IMG is one of its values, and the "
      + "main site's whole dataset is the population that value selects.",
    couples: "Couples in the Match submit paired rank lists and must be considered together. "
      + "It is a yes/no field like any other.",
    docs: "A missing document is indistinguishable from a weak one at this stage, because "
      + "the filter runs on whether the file arrived, not on what it says. Documents "
      + "arrive on different schedules and from different offices.",
    school_country: "Country of Medical School reduces every international medical school to "
      + "one of three values.",
    runtime: "Ask for Value at Filter Run Time turns a saved filter into a reusable template: "
      + "the criterion is fixed, the threshold is typed in fresh each time it runs.",
    english: "Self-reported. The applicant answers this on the application; nothing verifies it.",
    usce: "U.S. clinical experience is among the variables the main site names as plausibly "
      + "decisive for non-U.S. IMGs and absent from the published outcome data."
  };
  function anno(key, extraClass) {
    if (!NOTES[key]) return null;
    var d = el("div", "pd-anno" + (extraClass ? " " + extraClass : ""));
    d.innerHTML = "<b>What this means for an applicant.</b> " + esc(NOTES[key]);
    return d;
  }
  function annoInto(parent, key) {
    var a = anno(key);
    if (a) parent.appendChild(a);
    return parent;
  }

  /* ---------------- state ---------------- */
  var byName = {};
  PD.userFilters.concat(PD.systemFilters).forEach(function (f) { byName[f.name] = f; });

  var state = {
    view: "dashboard",
    filter: byName["All Applicants"],
    page: 0,
    perPage: 100,
    search: "",
    sortKey: null,
    sortDir: 1,
    cursor: 0,
    tab: "Personal",
    cols: { type: false, step2: false, visa: false, ecfmg: false, tier: false },
    showHide: false,
    infoOpen: true,
    /* opens on Applicants Type, whose dropdown carries "Non-U.S. IMG" — the one
       value that selects the population the rest of this site is about */
    crit: { cat: 1, field: 0, op: 0, value: null, runtime: false },
    favs: {}
  };

  /* ---------------- result set ---------------- */
  function results() {
    var out = A.filter(state.filter.fn);
    if (state.search) {
      var q = state.search.toLowerCase();
      out = out.filter(function (a) { return a.last.toLowerCase().indexOf(q) === 0; });
    }
    if (state.sortKey) {
      var k = state.sortKey, d = state.sortDir;
      out = out.slice().sort(function (x, y) {
        var a = x[k], b = y[k];
        if (a == null) return 1;
        if (b == null) return -1;
        if (typeof a === "string") return d * a.localeCompare(b);
        return d * (a - b);
      });
    }
    return out;
  }
  function pageCount(total) { return Math.max(1, Math.ceil(total / state.perPage)); }

  /* ============================================================
     CHROME
     ============================================================ */
  var NAV = [
    { label: "Dashboard", view: "dashboard" },
    { label: "Applications", menu: [
      { label: "All Applicants", go: function () { setFilter("All Applicants"); } },
      { label: "Manage Filters", go: function () { state.view = "filters"; render(); } },
      { label: "Bulk Print Requests", go: function () { stub("Bulk Print Requests"); } }
    ] },
    { label: "Rankings", stub: 1 },
    { label: "Reports", stub: 1 },
    { label: "Archives", stub: 1 },
    { label: "Program Management", menu: [
      { label: "Program Profile", go: function () { stub("Program Profile"); } },
      { label: "Users", go: function () { stub("Users"); } }
    ] },
    { label: "Setup", stub: 1 },
    { label: "Program Messages", stub: 1 },
    { label: "Thalamus", menu: [
      { label: "Interview Scheduling", go: function () { stub("Interview Scheduling"); } }
    ] }
  ];
  var stubName = "";
  function stub(name) { stubName = name; state.view = "stub"; render(); }
  function setFilter(name) {
    state.filter = byName[name];
    state.page = 0; state.search = ""; state.sortKey = null;
    state.view = "list";
    render();
  }

  function navFor() {
    if (state.view === "dashboard") return "Dashboard";
    if (state.view === "list" || state.view === "applicant" ||
        state.view === "filters" || state.view === "criteria") return "Applications";
    return stubName === "Program Profile" || stubName === "Users" ? "Program Management" : stubName;
  }

  var openMenu = null;
  function closeMenu() {
    if (openMenu) { openMenu.remove(); openMenu = null; }
  }
  document.addEventListener("click", function (e) {
    if (openMenu && !openMenu.contains(e.target) && !e.target.closest(".pd-nav button")) closeMenu();
  });

  function buildNav() {
    var nav = el("nav", "pd-nav");
    nav.setAttribute("aria-label", "Recreated program workstation sections");
    var active = navFor();
    NAV.forEach(function (item) {
      var b = fk(el("button", null), "nav-" + item.label);
      b.textContent = item.label;
      if (item.menu) {
        var c = el("span", "caret", "▾");
        c.setAttribute("aria-hidden", "true");
        b.appendChild(c);
        b.setAttribute("aria-haspopup", "true");
      }
      if (item.label === active) b.setAttribute("aria-current", "page");
      on(b, "click", function (e) {
        e.stopPropagation();
        closeMenu();
        if (item.view) { state.view = item.view; render(); return; }
        if (item.stub) { stub(item.label); return; }
        var m = el("div", "pd-menu");
        m.style.cssText = "position:absolute;background:#fff;border:1px solid #dcdcdc;"
          + "box-shadow:0 8px 24px -8px rgba(0,0,0,.35);z-index:40;min-width:200px;padding:4px 0";
        item.menu.forEach(function (mi) {
          var mb = el("button", null, mi.label);
          mb.style.cssText = "display:block;width:100%;text-align:left;background:none;border:0;"
            + "padding:9px 15px;font-size:13.5px;cursor:pointer;color:#1d1d1d";
          on(mb, "mouseenter", function () { mb.style.background = "#f0f0f0"; });
          on(mb, "mouseleave", function () { mb.style.background = "none"; });
          on(mb, "click", function () { closeMenu(); mi.go(); });
          m.appendChild(mb);
        });
        var r = b.getBoundingClientRect();
        m.style.left = (r.left + window.scrollX) + "px";
        m.style.top = (r.bottom + window.scrollY) + "px";
        document.body.appendChild(m);
        openMenu = m;
      });
      nav.appendChild(b);
    });
    return nav;
  }

  function buildChrome() {
    var root = el("div", "pdws");

    var util = el("div", "pd-util");
    var mark = el("div", "pd-mark", "PDWS");
    var ms = el("span", null, "recreation");
    mark.appendChild(ms);
    util.appendChild(mark);
    util.appendChild(el("div", "sp"));
    var help = fk(el("button", "pd-help", "?"), "help");
    help.setAttribute("aria-label", "Help (not recreated)");
    on(help, "click", function () { stub("Help"); });
    util.appendChild(help);
    var sw = el("div", "pd-search");
    var si = el("input");
    si.type = "search";
    si.placeholder = "Search Applicants";
    si.setAttribute("aria-label", "Search applicants by last name");
    si.value = state.search;
    fk(si, "utilsearch");
    on(si, "input", function () {
      state.search = si.value.trim();
      state.page = 0;
      if (state.view !== "list") state.view = "list";
      render();
    });
    sw.appendChild(si);
    util.appendChild(sw);
    var user = el("div", "pd-user");
    var who = el("div", "who");
    who.innerHTML = "<b>Internal Medicine (Categorical)</b>Demo Program · Coordinator";
    user.appendChild(who);
    user.appendChild(el("div", "pd-avatar"));
    util.appendChild(user);
    root.appendChild(util);

    root.appendChild(buildNav());

    var sub = el("div", "pd-subbar");
    sub.innerHTML = '<a href="#" role="button">Bulk Print Requests</a>'
      + '<a href="#" role="button">History</a>';
    sub.querySelectorAll("a").forEach(function (a) {
      on(a, "click", function (e) { e.preventDefault(); stub(a.textContent); });
    });
    root.appendChild(sub);

    var body = el("div", "pd-body");
    body.id = "pdBody";
    root.appendChild(body);
    return { root: root, body: body };
  }

  /* ============================================================
     VIEW — dashboard
     ============================================================ */
  function viewDashboard(body) {
    var total = A.length;
    var reviewed = A.filter(function (a) { return a.reviewed; }).length;
    var inactive = A.filter(function (a) { return a.inactive; }).length;

    var grid = el("div", "pd-dash");

    var qwrap = el("div", "pd-quickwrap");
    qwrap.appendChild(el("h3", null, "Quick Links"));
    var ul = el("ul");
    [["Manage Filters", 0], ["PDWS User Guide", 1], ["Job Aids & Training Videos", 1],
     ["Contact Support", 1], ["PDWS Terms and Conditions", 0], ["About", 0]]
      .forEach(function (p) {
        var li = el("li");
        var a = el("a", null, p[0]);
        a.href = "#";
        if (p[1]) { var x = el("span", "ext", "↗"); x.setAttribute("aria-hidden", "true"); a.appendChild(x); }
        on(a, "click", function (e) {
          e.preventDefault();
          if (p[0] === "Manage Filters") { state.view = "filters"; render(); }
          else stub(p[0]);
        });
        li.appendChild(a);
        ul.appendChild(li);
      });
    qwrap.appendChild(ul);
    grid.appendChild(qwrap);

    var stats = el("div", "pd-card");
    var sh = el("div", "pd-card-hd");
    sh.appendChild(el("h3", null, "Stats"));
    stats.appendChild(sh);
    var sb = el("div", "pd-card-bd");
    var sg = el("div", "pd-stats");
    var sl = el("div", "pd-statlist");
    [[total, "Applications Received"], [reviewed, "Applications Reviewed"],
     [inactive, "No Longer Under Consideration"]].forEach(function (p) {
      var row = el("div", "pd-statrow");
      row.appendChild(el("div", "n", p[0].toLocaleString()));
      var t = el("div", "t");
      var a = el("a", null, p[1]);
      a.href = "#";
      on(a, "click", function (e) { e.preventDefault(); setFilter("All Applicants"); });
      t.appendChild(a);
      row.appendChild(t);
      sl.appendChild(row);
    });
    sg.appendChild(sl);
    var big = el("div", "pd-bigstat");
    big.appendChild(el("div", "n", (total - inactive).toLocaleString()));
    big.appendChild(el("div", "t", "Total Applicants Active"));
    sg.appendChild(big);
    sb.appendChild(sg);
    annoInto(sb, "reviewed");
    stats.appendChild(sb);
    grid.appendChild(stats);

    var act = el("div", "pd-card");
    var ah = el("div", "pd-card-hd");
    ah.appendChild(el("h3", null, "Application Activity"));
    act.appendChild(ah);
    var ab = el("div", "pd-card-bd");
    var dr = el("div", "pd-daterow");
    ["Start", "End"].forEach(function (lab) {
      var f = el("div", "pd-datefield");
      var id = "pd-date-" + lab;
      var l = el("label", null, lab);
      l.setAttribute("for", id);
      f.appendChild(l);
      var inp = el("input");
      inp.type = "text"; inp.id = id; inp.placeholder = "";
      f.appendChild(inp);
      f.appendChild(el("div", "hint", "MMM DD, YYYY"));
      dr.appendChild(f);
    });
    var upd = el("button", "pd-btn plain", "Update");
    on(upd, "click", function () { stub("Application Activity"); });
    dr.appendChild(upd);
    ab.appendChild(dr);
    var at = el("table", "pd-table");
    at.innerHTML = "<thead><tr><th>Applicant Name</th><th>Change</th><th>Date Updated</th></tr></thead>";
    ab.appendChild(at);
    ab.appendChild(el("div", "pd-noresult", "No results displayed"));
    act.appendChild(ab);
    grid.appendChild(act);

    [["Favorite Filters", "You have not set any favorites.", "row2a"],
     ["Reports", "You have not set any reports.", "row2b"]].forEach(function (p) {
      var c = el("div", "pd-card " + p[2]);
      var h = el("div", "pd-card-hd");
      h.appendChild(el("h3", null, p[0]));
      c.appendChild(h);
      var b = el("div", "pd-card-bd");
      var favs = Object.keys(state.favs);
      if (p[0] === "Favorite Filters" && favs.length) {
        favs.forEach(function (nm) {
          var row = el("div", "pd-filterrow");
          var st = el("button", "star on", "★");
          st.setAttribute("aria-label", "Remove " + nm + " from favorites");
          on(st, "click", function () { delete state.favs[nm]; render(); });
          row.appendChild(st);
          var b2 = el("button", "nm pd-link", nm);
          on(b2, "click", function () { setFilter(nm); });
          row.appendChild(b2);
          row.appendChild(el("span", "cnt", A.filter(byName[nm].fn).length.toLocaleString()));
          b.appendChild(row);
        });
      } else {
        b.appendChild(el("p", null, p[1])).style.cssText = "margin:0;font-size:13.5px;color:#4f4f4f";
      }
      c.appendChild(b);
      grid.appendChild(c);
    });

    body.appendChild(grid);
  }

  /* ============================================================
     VIEW — applicant list
     ============================================================ */
  var COLS = [
    { key: "name", label: "Applicant Name", cls: "name" },
    { key: "aamcId", label: "AAMC ID" },
    { key: "school", label: "Most Recent Medical School", cls: "school", anno: "school" },
    { key: "applied", label: "Applicant Applied Date", get: function (a) { return a.appliedStr; } },
    { key: "signal", label: "Program Signals", anno: "signals",
      get: function (a) { return a.signal === "None" ? "No" : "Yes"; } },
    { key: "divisionPref", label: "Division Preference" }
  ];
  var OPTCOLS = [
    { id: "tier", key: "signal", label: "Signal Tier" },
    { id: "type", key: "type", label: "Applicant Type", anno: "type" },
    { id: "step2", key: "step2", label: "Step 2 CK", anno: "step2",
      get: function (a) { return a.step2 == null ? "—" : a.step2; } },
    { id: "ecfmg", key: "ecfmg", label: "ECFMG Certified", anno: "ecfmg",
      get: function (a) { return a.ecfmg == null ? "N/A" : a.ecfmg ? "Yes" : "No"; } },
    { id: "visa", key: "visaRequired", label: "Visa Sponsorship Required", anno: "visa",
      get: function (a) { return a.visaRequired ? "Yes" : "No"; } }
  ];
  function activeCols() {
    return COLS.concat(OPTCOLS.filter(function (c) { return state.cols[c.id]; }));
  }

  function viewList(body) {
    var all = results();
    var pages = pageCount(all.length);
    if (state.page >= pages) state.page = pages - 1;
    var slice = all.slice(state.page * state.perPage, (state.page + 1) * state.perPage);

    if (state.infoOpen) {
      var info = el("div", "pd-info");
      var ic = el("div", "i", "i");
      ic.setAttribute("aria-hidden", "true");
      info.appendChild(ic);
      info.appendChild(el("div", null, "As part of our Thalamus integration, we request that you "
        + "utilize the Action button to grant authorization for any data to Thalamus, "
        + "particularly if your intention is to use Thalamus."));
      var x = el("button", "x", "×");
      x.setAttribute("aria-label", "Dismiss notice");
      on(x, "click", function () { state.infoOpen = false; render(); });
      info.appendChild(x);
      body.appendChild(info);
    }

    /* filter criteria bar */
    var fc = el("div", "pd-card");
    var fh = el("div", "pd-card-hd");
    fh.appendChild(el("h3", null, "Filter Criteria"));
    fh.appendChild(el("div", "sp"));
    var nb = fk(el("button", "pd-btn", "New Criteria"), "newcrit");
    on(nb, "click", function () { state.view = "criteria"; render(); });
    fh.appendChild(nb);
    var mf = fk(el("button", "pd-btn plain", "Manage Filters"), "managefilters");
    on(mf, "click", function () { state.view = "filters"; render(); });
    fh.appendChild(mf);
    var chev = el("button", "pd-chev", "⌄");
    chev.setAttribute("aria-label", "Filter criteria detail");
    on(chev, "click", function () { stub("Filter Criteria detail"); });
    fh.appendChild(chev);
    fc.appendChild(fh);
    body.appendChild(fc);

    var card = el("div", "pd-card");
    var head = el("div", "pd-listtools");
    head.style.cssText += ";display:block;padding-bottom:0";
    var title = el("h3", null, state.filter.name);
    title.style.cssText = "margin:0;font-size:19px;font-weight:600;letter-spacing:-.012em";
    if (state.filter.name !== "All Applicants") title.setAttribute("data-anno", "1");
    head.appendChild(title);
    head.appendChild(el("div", "pd-updated", "Last updated on Sep 24, 2025 at 3:24 PM EST"));
    var fa = anno("filterbar");
    if (fa) head.appendChild(fa);
    card.appendChild(head);

    var tools = el("div", "pd-listtools");
    var sw = el("div", "pd-inputsearch");
    var si = el("input");
    si.type = "search";
    si.placeholder = "Search by last name";
    si.setAttribute("aria-label", "Search by last name");
    si.value = state.search;
    fk(si, "listsearch");
    on(si, "input", function () {
      state.search = si.value.trim(); state.page = 0; render();
    });
    sw.appendChild(si);
    tools.appendChild(sw);
    var shb = fk(el("button", "pd-link", "👁 Show / Hide"), "showhide");
    shb.setAttribute("aria-expanded", state.showHide ? "true" : "false");
    on(shb, "click", function () { state.showHide = !state.showHide; render(); });
    tools.appendChild(shb);
    tools.appendChild(el("div", "sp"));
    var rb = fk(el("button", "pd-btn", "Refresh"), "refresh");
    on(rb, "click", function () { render(); });
    tools.appendChild(rb);
    var acb = fk(el("button", "pd-btn", "Actions ▾"), "actions");
    on(acb, "click", function (e) {
      e.stopPropagation();
      closeMenu();
      var m = el("div", "pd-menu");
      m.style.cssText = "position:absolute;background:#fff;border:1px solid #dcdcdc;"
        + "box-shadow:0 8px 24px -8px rgba(0,0,0,.35);z-index:40;min-width:220px;padding:4px 0";
      [["Export to Excel (CSV)", function () { exportCsv(all); }],
       ["Assign Applicants", null], ["Add to Custom Status", null],
       ["Grant Thalamus Authorization", null], ["Bulk Print", null]]
        .forEach(function (p) {
          var mb = el("button", null, p[0]);
          mb.style.cssText = "display:block;width:100%;text-align:left;background:none;border:0;"
            + "padding:9px 15px;font-size:13.5px;cursor:pointer;color:"
            + (p[1] ? "#1d1d1d" : "#9b9b9b");
          if (p[1]) {
            on(mb, "mouseenter", function () { mb.style.background = "#f0f0f0"; });
            on(mb, "mouseleave", function () { mb.style.background = "none"; });
            on(mb, "click", function () { closeMenu(); p[1](); });
          }
          m.appendChild(mb);
        });
      var r = acb.getBoundingClientRect();
      m.style.left = (r.right - 220 + window.scrollX) + "px";
      m.style.top = (r.bottom + window.scrollY) + "px";
      document.body.appendChild(m);
      openMenu = m;
    });
    tools.appendChild(acb);
    card.appendChild(tools);

    if (state.showHide) {
      var sh = el("div", "pd-card-bd");
      sh.style.cssText = "border-top:1px solid #dcdcdc;background:#fafafa";
      sh.appendChild(el("div", "pd-critlab", "Additional columns"));
      var row = el("div");
      row.style.cssText = "display:flex;flex-wrap:wrap;gap:8px 20px";
      OPTCOLS.forEach(function (c) {
        var lab = el("label");
        lab.style.cssText = "display:inline-flex;align-items:center;gap:7px;font-size:13.5px;cursor:pointer";
        var cb = fk(el("input"), "col-" + c.id);
        cb.type = "checkbox"; cb.className = "pd-check"; cb.checked = !!state.cols[c.id];
        on(cb, "change", function () { state.cols[c.id] = cb.checked; render(); });
        lab.appendChild(cb);
        lab.appendChild(document.createTextNode(c.label));
        row.appendChild(lab);
      });
      sh.appendChild(row);
      card.appendChild(sh);
    }

    var cols = activeCols();
    var wrap = el("div", "pd-tablewrap");
    var t = el("table", "pd-table");
    var cap = el("caption", "vis-hidden",
      "Recreated applicant list, filter " + state.filter.name + ", " + all.length + " results");
    t.appendChild(cap);
    var thead = el("thead");
    var htr = el("tr");
    var chall = el("th", "selectall");
    var cba = el("input");
    cba.type = "checkbox"; cba.className = "pd-check";
    cba.setAttribute("aria-label", "Select all rows on this page");
    chall.appendChild(cba);
    var cbc = el("span", "caret", "▾");
    cbc.setAttribute("aria-hidden", "true");
    chall.appendChild(cbc);
    htr.appendChild(chall);
    cols.forEach(function (c) {
      var th = fk(el("th", "sortable"), "sort-" + c.key);
      th.tabIndex = 0;
      th.appendChild(document.createTextNode(c.label));
      var g = el("span", "sortglyph", state.sortKey === c.key ? (state.sortDir < 0 ? "▼" : "▲") : "⇅");
      g.setAttribute("aria-hidden", "true");
      th.appendChild(g);
      th.setAttribute("aria-sort", state.sortKey !== c.key ? "none"
        : state.sortDir < 0 ? "descending" : "ascending");
      if (c.anno) th.setAttribute("data-anno", "1");
      var sort = function () {
        if (state.sortKey === c.key) state.sortDir = -state.sortDir;
        else { state.sortKey = c.key; state.sortDir = 1; }
        state.page = 0;
        render();
      };
      on(th, "click", sort);
      on(th, "keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); sort(); }
      });
      htr.appendChild(th);
    });
    thead.appendChild(htr);
    t.appendChild(thead);

    var tb = el("tbody");
    if (!slice.length) {
      var etr = el("tr");
      var etd = el("td");
      etd.colSpan = cols.length + 1;
      etd.appendChild(el("div", "pd-empty",
        state.search ? 'No applicants in "' + state.filter.name + '" have a last name starting "'
          + state.search + '".'
          : 'The filter "' + state.filter.name + '" returned no applicants.'));
      etr.appendChild(etd);
      tb.appendChild(etr);
    }
    slice.forEach(function (a) {
      var tr = el("tr", "pd-row");
      tr.tabIndex = 0;
      var open = function () {
        state.cursor = all.indexOf(a);
        state.view = "applicant";
        state.tab = "Personal";
        render();
      };
      on(tr, "click", function (e) { if (e.target.type !== "checkbox") open(); });
      on(tr, "keydown", function (e) {
        if (e.key === "Enter") { e.preventDefault(); open(); }
      });
      var ctd = el("td");
      var cb = el("input");
      cb.type = "checkbox"; cb.className = "pd-check";
      cb.setAttribute("aria-label", "Select " + a.name);
      on(cb, "click", function (e) { e.stopPropagation(); });
      ctd.appendChild(cb);
      tr.appendChild(ctd);
      cols.forEach(function (c) {
        var v = c.get ? c.get(a) : a[c.key];
        var td = el("td", c.cls || (v === "" ? "cellmuted" : null), n0(v));
        tr.appendChild(td);
      });
      tb.appendChild(tr);
    });

    /* the note about the result count sits at the foot of the rows, next to the
       Total Items line it is talking about */
    if (slice.length) {
      var atr = el("tr", "pd-annocell");
      var atd = el("td");
      atd.colSpan = cols.length + 1;
      var box = anno("total", "inrow");
      if (box) atd.appendChild(box);
      atr.appendChild(atd);
      tb.appendChild(atr);
    }
    t.appendChild(tb);
    wrap.appendChild(t);
    card.appendChild(wrap);

    var pager = el("div", "pd-pager");
    var tot = el("div", null, "Total Items: " + all.length.toLocaleString());
    tot.setAttribute("data-anno", "1");
    pager.appendChild(tot);
    pager.appendChild(el("div", "sp"));
    var ppl = el("label", null, "Items per page:");
    ppl.style.marginRight = "6px";
    ppl.setAttribute("for", "pdPerPage");
    pager.appendChild(ppl);
    var ps = fk(el("select"), "perpage");
    ps.id = "pdPerPage";
    [25, 50, 100].forEach(function (v) {
      var o = new Option(String(v), String(v));
      ps.appendChild(o);
    });
    ps.value = String(state.perPage);
    on(ps, "change", function () { state.perPage = +ps.value; state.page = 0; render(); });
    pager.appendChild(ps);
    pager.appendChild(el("div", null, "Page " + (state.page + 1) + " of " + pages));
    [["|‹", 0, "First page"], ["‹", state.page - 1, "Previous page"],
     ["›", state.page + 1, "Next page"], ["›|", pages - 1, "Last page"]]
      .forEach(function (p) {
        var b = fk(el("button", null, p[0]), "page-" + p[2]);
        b.setAttribute("aria-label", p[2]);
        if (p[1] < 0 || p[1] > pages - 1 || p[1] === state.page) b.disabled = true;
        on(b, "click", function () { state.page = p[1]; render(); window.scrollTo({ top: stageTop() }); });
        pager.appendChild(b);
      });
    card.appendChild(pager);
    body.appendChild(card);
  }

  function exportCsv(rows) {
    var cols = activeCols();
    var head = ["Applicant Name"].concat(cols.slice(1).map(function (c) { return c.label; }));
    var lines = [head.join(",")];
    rows.forEach(function (a) {
      lines.push(cols.map(function (c) {
        var v = c.get ? c.get(a) : a[c.key];
        v = n0(v);
        return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
      }).join(","));
    });
    var blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = el("a");
    a.href = url;
    a.download = "recreated-applicant-list.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  /* ============================================================
     VIEW — applicant detail
     ============================================================ */
  var TABS = ["Personal", "Geo Preferences", "Education", "Experience", "Publications",
              "Exams/Licences", "Limiting Factors", "Documents"];

  function field(dl, label, value, note) {
    var dt = el("dt", null, label);
    dl.appendChild(dt);
    var dd = el("dd");
    if (value === null) {
      var r = el("span", "pd-redact");
      r.style.width = (70 + (label.length * 3) % 90) + "px";
      r.setAttribute("aria-label", "redacted");
      dd.appendChild(r);
    } else {
      dd.textContent = value;
    }
    if (note) dd.setAttribute("data-anno", "1");
    dl.appendChild(dd);
    return dd;
  }

  function viewApplicant(body) {
    var all = results();
    if (!all.length) { state.view = "list"; return viewList(body); }
    if (state.cursor >= all.length) state.cursor = all.length - 1;
    var a = all[state.cursor];

    var bar = el("div", "pd-detailbar");
    var back = el("button", "pd-link", "‹ Back to " + state.filter.name);
    on(back, "click", function () { state.view = "list"; render(); });
    bar.appendChild(back);
    bar.appendChild(el("div", "sp"));
    var prev = fk(el("button", "pd-link", "‹ PREVIOUS"), "prev");
    prev.disabled = state.cursor === 0;
    if (prev.disabled) prev.style.color = "#bdbdbd";
    on(prev, "click", function () { if (state.cursor > 0) { state.cursor--; render(); } });
    bar.appendChild(prev);
    bar.appendChild(el("div", "pd-count",
      "Applicant " + (state.cursor + 1) + " of " + all.length.toLocaleString()));
    var next = fk(el("button", "pd-link", "NEXT ›"), "next");
    next.disabled = state.cursor >= all.length - 1;
    if (next.disabled) next.style.color = "#bdbdbd";
    on(next, "click", function () { if (state.cursor < all.length - 1) { state.cursor++; render(); } });
    bar.appendChild(next);
    var act = el("button", "pd-btn", "Actions ▾");
    on(act, "click", function () { stub("Applicant actions"); });
    bar.appendChild(act);
    body.appendChild(bar);

    var grid = el("div", "pd-detail");

    /* left rail */
    var rail = el("div", "pd-card");
    var ph = el("div", "pd-photo", "photo not shown");
    rail.appendChild(ph);
    var idb = el("div", "pd-idblock");
    if (a.signal !== "None") {
      var badge = el("div", "badge " + a.signal.toLowerCase());
      var bi = el("span", null, "✦");
      bi.setAttribute("aria-hidden", "true");
      badge.appendChild(bi);
      badge.appendChild(document.createTextNode("Signaled " + a.signal));
      badge.setAttribute("data-anno", "1");
      idb.appendChild(badge);
    }
    [["AAMC ID", a.aamcId], ["Applied Date", a.appliedStr],
     ["Most Recent Medical School", a.school]].forEach(function (p) {
      idb.appendChild(el("div", "pd-fieldlab", p[0]));
      idb.appendChild(el("div", "pd-fieldval", p[1]));
    });
    rail.appendChild(idb);

    var scoreHd = el("div", "pd-card-hd");
    scoreHd.appendChild(el("h3", null, "Scores"));
    scoreHd.appendChild(el("div", "sp"));
    var sc = el("button", "pd-chev", "⌃");
    sc.setAttribute("aria-label", "Collapse Scores");
    scoreHd.appendChild(sc);
    rail.appendChild(scoreHd);

    var acc = el("div", "pd-acc");
    ["Composite Score", "Board Scores", "Document Scores", "Interview Scores",
     "Reviewer Scores", "Post-Review Scores", "Custom Scores"].forEach(function (nm) {
      var b = el("button", null);
      b.appendChild(document.createTextNode(nm));
      var c = el("span", "chev", "›");
      c.setAttribute("aria-hidden", "true");
      b.appendChild(c);
      on(b, "click", function () { stub(nm); });
      acc.appendChild(b);
    });
    rail.appendChild(acc);
    var notes = el("div", "pd-notes");
    notes.appendChild(el("span", null, "Notes (0)"));
    var nc = el("span", null, "⌃");
    nc.setAttribute("aria-hidden", "true");
    notes.appendChild(nc);
    rail.appendChild(notes);
    grid.appendChild(rail);

    /* right column */
    var right = el("div");

    if (state.infoOpen) {
      var info = el("div", "pd-info");
      var ic = el("div", "i", "i");
      ic.setAttribute("aria-hidden", "true");
      info.appendChild(ic);
      info.appendChild(el("div", null, "As part of our Thalamus integration, we request that you "
        + "utilize the Action button to grant authorization for any data to Thalamus, "
        + "particularly if your intention is to use Thalamus."));
      var x = el("button", "x", "×");
      x.setAttribute("aria-label", "Dismiss notice");
      on(x, "click", function () { state.infoOpen = false; render(); });
      info.appendChild(x);
      right.appendChild(info);
    }

    var glance = el("div", "pd-card pd-glance");
    var gh = el("div", "pd-card-hd");
    gh.appendChild(el("h3", null, "At-a-Glance"));
    gh.appendChild(el("div", "sp"));
    var gc = el("button", "pd-chev", "⌃");
    gc.setAttribute("aria-label", "Collapse At-a-Glance");
    gh.appendChild(gc);
    glance.appendChild(gh);
    var gb = el("div", "pd-card-bd");
    var gdl = el("dl");
    field(gdl, "Assigned To", "");
    field(gdl, "Tracks Applied by Applicant", a.track);
    field(gdl, "Tracks Considered by Program", a.track);
    gb.appendChild(gdl);
    glance.appendChild(gb);
    right.appendChild(glance);

    var stc = el("div", "pd-card");
    var sth = el("div", "pd-card-hd");
    sth.appendChild(el("h3", null, "Statuses"));
    var pen = el("button", "pd-pencil", "✎");
    pen.setAttribute("aria-label", "Edit statuses");
    on(pen, "click", function () { stub("Statuses"); });
    sth.appendChild(pen);
    stc.appendChild(sth);
    right.appendChild(stc);

    var tc = el("div", "pd-card");
    var tabs = el("div", "pd-tabs");
    tabs.setAttribute("role", "tablist");
    TABS.forEach(function (nm) {
      var label = nm === "Documents" ? "Documents (" + a.docs + ")" : nm;
      var b = fk(el("button", null, label), "tab-" + nm);
      b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", state.tab === nm ? "true" : "false");
      on(b, "click", function () { state.tab = nm; render(); });
      tabs.appendChild(b);
    });
    tc.appendChild(tabs);
    var panel = el("div", "pd-panel");
    panel.setAttribute("role", "tabpanel");
    renderPanel(panel, a);
    tc.appendChild(panel);
    right.appendChild(tc);

    grid.appendChild(right);
    body.appendChild(grid);
  }

  function renderPanel(panel, a) {
    var cols, dl;
    function pair(title) {
      panel.appendChild(el("h4", null, title));
      dl = el("dl");
      return dl;
    }
    if (state.tab === "Personal") {
      cols = el("div", "pd-cols2");
      var left = el("div");
      left.appendChild(el("h4", null, "Personal"));
      var d1 = el("dl");
      d1.className = "";
      var wrapDl = el("div", "pd-glance");
      field(d1, "Preferred Name", "");
      field(d1, "Previous Last Name", "");
      field(d1, "Gender", "Screened", 1);
      field(d1, "Designated Pronouns", a.pronouns || "Not provided");
      field(d1, "Birth Date", "Screened", 1);
      field(d1, "Self-identification", "Screened", 1);
      field(d1, "Do you meet or exceed the Advanced level of proficiency in English?", a.english, 1);
      wrapDl.appendChild(d1);
      left.appendChild(wrapDl);
      var sa = anno("screened");
      if (sa) left.appendChild(sa);
      var ea = anno("english");
      if (ea) left.appendChild(ea);
      cols.appendChild(left);

      var right = el("div");
      right.appendChild(el("h4", null, "Contact"));
      var d2 = el("dl");
      var w2 = el("div", "pd-glance");
      field(d2, "Preferred Phone", null);
      field(d2, "Email", null);
      w2.appendChild(d2);
      right.appendChild(w2);
      right.appendChild(el("h4", null, "Address")).style.marginTop = "20px";
      var d3 = el("dl");
      var w3 = el("div", "pd-glance");
      field(d3, "Street", null);
      field(d3, "City", null);
      field(d3, "Country", a.country === "United States" ? "United States" : null);
      w3.appendChild(d3);
      right.appendChild(w3);
      cols.appendChild(right);
      panel.appendChild(cols);
      return;
    }
    var box = el("div", "pd-glance");
    var d = el("dl");
    if (state.tab === "Geo Preferences") {
      panel.appendChild(el("h4", null, "Geographic Preferences"));
      field(d, "Division Preference", a.divisionPref === "Yes" ? a.division : "No Preference");
      field(d, "Setting Preference", a.setting);
    } else if (state.tab === "Education") {
      panel.appendChild(el("h4", null, "Medical Education"));
      field(d, "Most Recent Medical School", a.school, 1);
      field(d, "Country of Medical School", a.country, 1);
      field(d, "LCME Accredited", a.lcme ? "Yes" : "No");
      field(d, "Degree", a.osteopathic ? "DO" : a.country === "United States" ? "MD" : "MBBS");
      field(d, "Graduation Year", String(a.gradYear));
      field(d, "Applicant Type", a.type, 1);
    } else if (state.tab === "Experience") {
      panel.appendChild(el("h4", null, "Experience"));
      field(d, "Research Experiences", String(a.research));
      field(d, "Work Experiences", String(a.work));
      field(d, "Volunteer Experiences", String(a.volunteer));
      field(d, "U.S. Clinical Experience", "Not collected as a discrete field", 1);
    } else if (state.tab === "Publications") {
      panel.appendChild(el("h4", null, "Publications"));
      field(d, "Peer-Reviewed Publications", String(a.pubs));
      field(d, "Peer-Reviewed Abstracts", String(a.abstracts));
      field(d, "Poster Presentations", String(a.presentations));
    } else if (state.tab === "Exams/Licences") {
      panel.appendChild(el("h4", null, "Exams and Licences"));
      field(d, "USMLE Step 1 Result", a.step1, 1);
      field(d, "USMLE Step 2 CK Score", a.step2 == null ? "Not reported" : String(a.step2), 1);
      field(d, "COMLEX-USA Level 2 CE", a.comlex == null ? "N/A" : String(a.comlex));
      field(d, "Number of Attempts", String(a.attempts), 1);
      field(d, "ECFMG Certified", a.ecfmg == null ? "N/A" : a.ecfmg ? "Yes" : "No", 1);
    } else if (state.tab === "Limiting Factors") {
      panel.appendChild(el("h4", null, "Limiting Factors"));
      field(d, "Visa Sponsorship Required", a.visaRequired ? "Yes" : "No", 1);
      field(d, "Current Work Authorization",
        a.workAuth ? (a.country === "United States" ? "U.S. Citizen" : "Permanent Resident") : "None");
      field(d, "Couples Match", a.couples ? "Yes" : "No", 1);
      field(d, "Felony Conviction", "No");
      field(d, "Misdemeanor Conviction", "No");
    } else {
      panel.appendChild(el("h4", null, "Documents (" + a.docs + ")"));
      [["MSPE", a.mspe], ["Medical School Transcript", a.transcript],
       ["Personal Statement", a.personalStatement], ["Photo", a.photo],
       ["USMLE Transcript", a.usmleTranscript], ["COMLEX-USA Transcript", a.comlexTranscript],
       ["Dept. Chair Letter of Recommendation", a.chairLor]].forEach(function (p) {
        field(d, p[0], p[1] ? "Received" : "Not received", 1);
      });
      field(d, "Letters of Recommendation", a.lors + " received", 1);
    }
    box.appendChild(d);
    panel.appendChild(box);
    var key = { "Exams/Licences": "step2", "Documents": "docs", "Limiting Factors": "visa",
                "Education": "school", "Experience": "usce" }[state.tab];
    if (key) annoInto(panel, key);
    if (state.tab === "Exams/Licences") {
      annoInto(panel, "step1");
      annoInto(panel, "attempts");
      annoInto(panel, "ecfmg");
    }
  }

  /* ============================================================
     VIEW — manage filters
     ============================================================ */
  function filterSection(body, title, list, editable) {
    var card = el("div", "pd-card");
    var hd = el("div", "pd-card-hd");
    hd.appendChild(el("h3", null, title + " (" + list.length + ")"));
    hd.appendChild(el("div", "sp"));
    var c = el("button", "pd-chev", "⌃");
    c.setAttribute("aria-label", "Collapse " + title);
    hd.appendChild(c);
    card.appendChild(hd);
    var bd = el("div", "pd-card-bd");
    var grid = el("div", "pd-filtergrid");
    var sorted = list.slice().sort(function (x, y) {
      return x.name.toLowerCase().localeCompare(y.name.toLowerCase());
    });
    sorted.forEach(function (f) {
      var row = el("div", "pd-filterrow");
      var star = fk(el("button", "star" + (state.favs[f.name] ? " on" : ""),
        state.favs[f.name] ? "★" : "☆"), "star-" + f.name);
      star.setAttribute("aria-label", (state.favs[f.name] ? "Unfavorite " : "Favorite ") + f.name);
      on(star, "click", function () {
        if (state.favs[f.name]) delete state.favs[f.name]; else state.favs[f.name] = 1;
        render();
      });
      row.appendChild(star);
      var nm = el("button", "nm pd-link", f.name);
      on(nm, "click", function () { setFilter(f.name); });
      row.appendChild(nm);
      row.appendChild(el("span", "cnt", A.filter(f.fn).length.toLocaleString()));
      if (editable) {
        [["✎", "Edit"], ["🗑", "Delete"]].forEach(function (p) {
          var b = el("button", "act", p[0]);
          b.setAttribute("aria-label", p[1] + " " + f.name);
          on(b, "click", function () { stub(p[1] + " filter"); });
          row.appendChild(b);
        });
      }
      grid.appendChild(row);
    });
    bd.appendChild(grid);
    card.appendChild(bd);
    body.appendChild(card);
  }

  function viewFilters(body) {
    var bar = el("div", "pd-detailbar");
    var h = el("h3", null, "Manage Filters");
    h.style.cssText = "margin:0;font-size:19px;font-weight:600";
    bar.appendChild(h);
    bar.appendChild(el("div", "sp"));
    var nb = el("button", "pd-btn solid", "New Criteria");
    on(nb, "click", function () { state.view = "criteria"; render(); });
    bar.appendChild(nb);
    body.appendChild(bar);

    var note = anno("filterbar");
    if (note) body.appendChild(note);

    filterSection(body, "User-Defined Filters", PD.userFilters, true);
    filterSection(body, "System-Defined Filters", PD.systemFilters, false);

    var foot = el("p");
    foot.style.cssText = "font-size:12.5px;color:#767676;margin:2px 0 0";
    foot.textContent = "The count beside each filter is how many of the "
      + A.length.toLocaleString() + " invented applicants it returns. In the real product no "
      + "count is shown until the filter is run.";
    body.appendChild(foot);
  }

  /* ============================================================
     VIEW — criteria builder
     ============================================================ */
  var OPS = {
    list: ["Equals", "Not equal to"],
    yesno: ["Equals"],
    number: ["Equals", "Greater than", "Less than"],
    date: ["Equals", "Before", "After"],
    text: ["Contains", "Equals"]
  };

  /* field name → how to read it off an applicant. Fields absent here have no
     backing value in the invented pool and say so when saved. */
  var READ = {
    "Applicant Type": function (a) { return a.type; },
    "Previous Graduate": function (a) { return a.type === "Previous Graduate"; },
    "Application Reviewed": function (a) { return a.reviewed; },
    "Inactive": function (a) { return a.inactive; },
    "Couples match": function (a) { return a.couples; },
    /* date fields are deliberately absent: the pool stores a formatted string,
       and Before/After over that would produce a confident wrong count */
    "Designated Pronouns": function (a) { return a.pronouns || "Not provided"; },
    "Division Preference": function (a) { return a.divisionPref === "Yes" ? a.division : "No Preference"; },
    "Setting Preference": function (a) { return a.setting; },
    "MSPE Received": function (a) { return a.mspe; },
    "Medical School Transcript Received": function (a) { return a.transcript; },
    "Personal Statement Received": function (a) { return a.personalStatement; },
    "Photo Received": function (a) { return a.photo; },
    "Number of LoRs Received": function (a) { return a.lors; },
    "Dept. Chair LoR Received": function (a) { return a.chairLor; },
    "USMLE Step 1 Result": function (a) { return a.step1; },
    "USMLE Step 2 CK Score": function (a) { return a.step2; },
    "COMLEX-USA Level 2 CE Score": function (a) { return a.comlex; },
    "Number of Exam Attempts": function (a) { return a.attempts; },
    "ECFMG Certified": function (a) { return a.ecfmg; },
    "Advanced English Proficiency": function (a) { return a.english === "Yes"; },
    "Most Recent Medical School": function (a) { return a.school; },
    "Country of Medical School": function (a) { return a.country; },
    "LCME Accredited": function (a) { return a.lcme; },
    "Graduation Year": function (a) { return a.gradYear; },
    "Program Signal Received": function (a) { return a.signal !== "None"; },
    "Signal Tier": function (a) { return a.signal; },
    "Peer-Reviewed Publications": function (a) { return a.pubs; },
    "Peer-Reviewed Abstracts": function (a) { return a.abstracts; },
    "Poster Presentations": function (a) { return a.presentations; },
    "Research Experiences": function (a) { return a.research; },
    "Visa Sponsorship Required": function (a) { return a.visaRequired; },
    "U.S. or Canadian Citizen": function (a) { return a.country === "United States"; },
    "Work Experiences": function (a) { return a.work; },
    "Volunteer Experiences": function (a) { return a.volunteer; }
  };

  function currentField() {
    var cat = PD.categories[state.crit.cat];
    return cat.fields[Math.min(state.crit.field, cat.fields.length - 1)];
  }
  function opsFor(f) { return OPS[f.spec.type] || OPS.text; }
  function defaultValue(f) {
    if (f.spec.type === "yesno") return "Yes";
    if (f.spec.type === "list") return f.spec.values[0];
    return "";
  }

  function buildPredicate(f, op, value) {
    var read = READ[f.name];
    if (!read) return null;
    var t = f.spec.type;
    return function (a) {
      var v = read(a);
      if (t === "yesno") {
        var want = value === "Yes";
        return !!v === want;
      }
      if (t === "list") {
        return op === "Not equal to" ? String(v) !== value : String(v) === value;
      }
      if (t === "number") {
        var num = parseFloat(value);
        if (isNaN(num) || v == null) return false;
        if (op === "Greater than") return v > num;
        if (op === "Less than") return v < num;
        return v === num;
      }
      if (t === "text") {
        if (!value) return true;
        var s = String(v).toLowerCase(), q = value.toLowerCase();
        return op === "Equals" ? s === q : s.indexOf(q) >= 0;
      }
      return String(v) === value;
    };
  }

  var savedMsg = null;

  function viewCriteria(body) {
    var cat = PD.categories[state.crit.cat];
    var f = currentField();
    var ops = opsFor(f);
    if (state.crit.op >= ops.length) state.crit.op = 0;
    if (state.crit.value == null) state.crit.value = defaultValue(f);

    var card = el("div", "pd-card");
    var hd = el("div", "pd-crithd");
    hd.appendChild(el("b", null, "New Criteria"));
    hd.appendChild(el("div", "sp"));
    var cancel = el("button", "pd-btn plain", "Cancel");
    on(cancel, "click", function () { savedMsg = null; state.view = "filters"; render(); });
    hd.appendChild(cancel);
    var save = el("button", "pd-btn solid", "Save Criteria");
    on(save, "click", function () {
      var pred = buildPredicate(f, ops[state.crit.op], state.crit.value);
      var label = f.name + " " + ops[state.crit.op].toLowerCase() + " "
        + (f.spec.type === "text" && !state.crit.value ? "(anything)" : state.crit.value);
      if (!pred) {
        savedMsg = { ok: false, label: label };
        render();
        return;
      }
      var name = "Ad hoc: " + label;
      byName[name] = { name: name, fn: pred };
      savedMsg = null;
      setFilter(name);
    });
    hd.appendChild(save);
    card.appendChild(hd);

    var cols = el("div", "pd-critcols");

    /* categories */
    var c1 = el("div", "pd-critcol");
    var cs = el("div", "pd-critsearch");
    var csi = el("input");
    csi.type = "search";
    csi.placeholder = "Search categories";
    csi.setAttribute("aria-label", "Search categories");
    csi.value = catQuery;
    fk(csi, "catsearch");
    on(csi, "input", function () { catQuery = csi.value; render(); });
    cs.appendChild(csi);
    c1.appendChild(cs);
    var cl = el("div", "pd-critlist");
    cl.setAttribute("role", "listbox");
    cl.setAttribute("aria-label", "Criteria categories");
    PD.categories.forEach(function (c, i) {
      if (catQuery && c.name.toLowerCase().indexOf(catQuery.toLowerCase()) < 0) return;
      var b = fk(el("button", null, c.name), "cat-" + i);
      b.setAttribute("role", "option");
      b.setAttribute("aria-selected", i === state.crit.cat ? "true" : "false");
      on(b, "click", function () {
        state.crit.cat = i; state.crit.field = 0; state.crit.op = 0;
        state.crit.value = null; savedMsg = null; render();
      });
      cl.appendChild(b);
    });
    c1.appendChild(cl);
    cols.appendChild(c1);

    /* fields */
    var c2 = el("div", "pd-critcol");
    var fs = el("div", "pd-critsearch");
    var fsi = el("input");
    fsi.type = "search";
    fsi.placeholder = "Search fields";
    fsi.setAttribute("aria-label", "Search fields");
    fsi.value = fieldQuery;
    fk(fsi, "fieldsearch");
    on(fsi, "input", function () { fieldQuery = fsi.value; render(); });
    fs.appendChild(fsi);
    c2.appendChild(fs);
    var fl = el("div", "pd-critlist");
    fl.setAttribute("role", "listbox");
    fl.setAttribute("aria-label", "Fields in " + cat.name);
    cat.fields.forEach(function (fd, i) {
      if (fieldQuery && fd.name.toLowerCase().indexOf(fieldQuery.toLowerCase()) < 0) return;
      var b = fk(el("button", null, fd.name), "field-" + i);
      b.setAttribute("role", "option");
      b.setAttribute("aria-selected", fd === f ? "true" : "false");
      on(b, "click", function () {
        state.crit.field = i; state.crit.op = 0; state.crit.value = null;
        savedMsg = null; render();
      });
      fl.appendChild(b);
    });
    c2.appendChild(fl);
    cols.appendChild(c2);

    /* operators */
    var c3 = el("div", "pd-critcol");
    var ol = el("div", "pd-critlist");
    ol.setAttribute("role", "listbox");
    ol.setAttribute("aria-label", "Operator");
    ops.forEach(function (o, i) {
      var b = fk(el("button", null, o), "op-" + i);
      b.setAttribute("role", "option");
      b.setAttribute("aria-selected", i === state.crit.op ? "true" : "false");
      on(b, "click", function () { state.crit.op = i; render(); });
      ol.appendChild(b);
    });
    c3.appendChild(ol);
    cols.appendChild(c3);

    /* value */
    var c4 = el("div", "pd-critcol pd-critval");
    c4.appendChild(el("div", "pd-critlab", "Value"));
    if (f.spec.type === "yesno") {
      var radio = el("div", "pd-radio");
      ["Yes", "No"].forEach(function (v) {
        var lab = el("label");
        var inp = fk(el("input"), "critvalue-" + v);
        inp.type = "radio"; inp.name = "pdval";
        inp.checked = state.crit.value === v;
        on(inp, "change", function () { state.crit.value = v; render(); });
        lab.appendChild(inp);
        lab.appendChild(document.createTextNode(v));
        radio.appendChild(lab);
      });
      c4.appendChild(radio);
    } else if (f.spec.type === "list") {
      var sel = fk(el("select"), "critvalue");
      sel.setAttribute("aria-label", "Value for " + f.name);
      f.spec.values.forEach(function (v) { sel.appendChild(new Option(v, v)); });
      sel.value = state.crit.value;
      on(sel, "change", function () { state.crit.value = sel.value; render(); });
      c4.appendChild(sel);
    } else {
      var inp2 = fk(el("input"), "critvalue");
      inp2.type = f.spec.type === "number" ? "number" : "text";
      inp2.placeholder = f.spec.type === "date" ? "MMM DD, YYYY"
        : f.spec.type === "number" ? "Enter a number" : "Enter a value";
      inp2.setAttribute("aria-label", "Value for " + f.name);
      inp2.value = state.crit.value;
      /* re-render on each keystroke so the count under the builder tracks what
         you are typing; focus is restored by key in render() */
      on(inp2, "input", function () { state.crit.value = inp2.value; render(); });
      c4.appendChild(inp2);
    }
    var rt = el("div", "pd-runtime");
    var sw = fk(el("button", "pd-switch"), "runtime");
    sw.setAttribute("aria-pressed", state.crit.runtime ? "true" : "false");
    sw.setAttribute("aria-label", "Ask for Value at Filter Run Time");
    on(sw, "click", function () { state.crit.runtime = !state.crit.runtime; render(); });
    rt.appendChild(sw);
    rt.appendChild(el("span", null, "Ask for Value at Filter Run Time"));
    rt.setAttribute("data-anno", "1");
    c4.appendChild(rt);
    annoInto(c4, "runtime");
    cols.appendChild(c4);
    card.appendChild(cols);

    var foot = el("div", "pd-critfoot");
    if (savedMsg) {
      foot.appendChild(el("span", null, "Saved: " + savedMsg.label
        + " — the invented pool carries no value for this field, so the list is unchanged."));
    } else if (f.spec.type === "number" && isNaN(parseFloat(state.crit.value))) {
      foot.appendChild(el("span", null, "Enter a number to see how many of the "
        + A.length.toLocaleString() + " invented applicants come through."));
    } else {
      var pred = buildPredicate(f, ops[state.crit.op], state.crit.value);
      if (pred) {
        var hits = A.filter(pred).length;
        var pct = (hits / A.length * 100).toFixed(1);
        foot.appendChild(el("strong", null, hits.toLocaleString() + " of " + A.length.toLocaleString()));
        foot.appendChild(el("span", null, " invented applicants match this criterion (" + pct + "%). "
          + "Save it to open the list."));
      } else {
        foot.appendChild(el("span", null, "This field has no value in the invented pool, so it "
          + "cannot be counted here. The category and field names are the point."));
      }
    }
    card.appendChild(foot);
    body.appendChild(card);

    if (f.note) {
      var na = anno(f.note);
      if (na) body.appendChild(na);
    }
    if (!cat.seen) {
      var p = el("p");
      p.style.cssText = "font-size:12.5px;color:#767676;margin:8px 0 0";
      p.textContent = "“" + cat.name + "” is a reconstructed category. The screenshots this "
        + "page was built from show the category list only where it was scrolled to, so categories "
        + "past the letter L are inferred from what ERAS collects.";
      body.appendChild(p);
    }
  }
  var catQuery = "", fieldQuery = "";

  /* ============================================================
     VIEW — not recreated
     ============================================================ */
  function viewStub(body) {
    var c = el("div", "pd-card");
    var b = el("div", "pd-card-bd");
    b.style.padding = "40px 22px";
    var h = el("h3", null, stubName);
    h.style.cssText = "margin:0 0 10px;font-size:18px;font-weight:600";
    b.appendChild(h);
    var p = el("p");
    p.style.cssText = "margin:0;font-size:14px;color:#4f4f4f;max-width:62ch;line-height:1.55";
    p.textContent = "Not recreated. This page was built from screenshots of the applicant "
      + "list, the applicant record, the filter manager and the criteria builder. Nothing was "
      + "seen of this section, so inventing it would be a guess dressed as a fact.";
    b.appendChild(p);
    var back = el("button", "pd-btn");
    back.textContent = "Back to applicants";
    back.style.marginTop = "18px";
    on(back, "click", function () { setFilter(state.filter.name); });
    b.appendChild(back);
    c.appendChild(b);
    body.appendChild(c);
  }

  /* ============================================================
     RENDER
     ============================================================ */
  var root = $("#pdwsRoot");
  function stageTop() {
    return root.getBoundingClientRect().top + window.scrollY - 60;
  }
  function render() {
    closeMenu();
    var ae = document.activeElement;
    var fkey = ae && ae.dataset ? ae.dataset.fkey : null;
    var caret = ae && typeof ae.selectionStart === "number" ? ae.selectionStart : null;

    root.innerHTML = "";
    var chrome = buildChrome();
    root.appendChild(chrome.root);
    var body = chrome.body;
    if (state.view === "dashboard") viewDashboard(body);
    else if (state.view === "list") viewList(body);
    else if (state.view === "applicant") viewApplicant(body);
    else if (state.view === "filters") viewFilters(body);
    else if (state.view === "criteria") viewCriteria(body);
    else viewStub(body);

    if (fkey) {
      var back = root.querySelector('[data-fkey="' + fkey + '"]');
      if (back) {
        back.focus();
        if (caret != null && typeof back.selectionStart === "number") {
          try { back.setSelectionRange(caret, caret); } catch (e) {}
        }
      }
    }
  }

  /* ---------------- annotation toggle ---------------- */
  var annoBtn = $("#annoBtn");
  function paintAnno() {
    var on_ = document.body.classList.contains("anno-on");
    annoBtn.setAttribute("aria-pressed", on_ ? "true" : "false");
    annoBtn.lastChild.textContent = on_ ? "Applicant notes on" : "Applicant notes off";
  }
  on(annoBtn, "click", function () {
    document.body.classList.toggle("anno-on");
    paintAnno();
    try {
      localStorage.setItem("img2026-anno",
        document.body.classList.contains("anno-on") ? "1" : "0");
    } catch (e) {}
  });
  try {
    if (localStorage.getItem("img2026-anno") === "1") document.body.classList.add("anno-on");
    var th = localStorage.getItem("img2026-theme");
    if (th) document.documentElement.setAttribute("data-theme", th);
  } catch (e) {}
  paintAnno();

  render();
})();
