/* ============================================================
   Program-view recreation — synthetic applicant pool and filter catalog.

   EVERY APPLICANT RECORD BELOW IS INVENTED. Names, AAMC IDs, scores,
   dates and document states are generated from a seeded PRNG so the
   page is stable between loads. Nothing here came from a real
   application, a real program, or a real person.

   Medical school names are real institutions, used because a filter
   on "Most Recent Medical School" is meaningless without them. No
   record is attached to anyone who attended one.

   The interface being recreated is the AAMC Program Director's
   WorkStation (PDWS). Category and field names marked OBSERVED are
   transcribed from screenshots of the live product. The rest are
   reconstructed and marked as such in the page's own disclosure.
   ============================================================ */
var PD = (function () {
  "use strict";

  /* mulberry32 — small, seeded, good enough for stable fixtures */
  function rng(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  var r = rng(20260924);
  function pick(a) { return a[Math.floor(r() * a.length)]; }
  function chance(p) { return r() < p; }
  function intBetween(lo, hi) { return lo + Math.floor(r() * (hi - lo + 1)); }

  /* ---------------- name pools ---------------- */
  /* Invented surnames and given names. Deliberately common-shaped so the
     table reads naturally, deliberately not drawn from any roster. */
  var GIVEN = [
    "Aditi", "Ahmed", "Alina", "Amara", "Anand", "Andrea", "Anjali", "Arun",
    "Benedict", "Bijan", "Camille", "Carlos", "Chidi", "Clara", "Daniel",
    "Divya", "Elena", "Emeka", "Farah", "Gabriel", "Grace", "Hana", "Hassan",
    "Ines", "Ismail", "Jacob", "Jasmin", "Javier", "Julia", "Karan", "Katrin",
    "Kavya", "Kwame", "Laila", "Leon", "Lucia", "Maria", "Mariam", "Marcus",
    "Mateo", "Meera", "Miguel", "Nadia", "Naveen", "Nikhil", "Nina", "Omar",
    "Paulo", "Priya", "Rahul", "Rania", "Ravi", "Rosa", "Ruth", "Salma",
    "Samuel", "Sanjay", "Sara", "Simone", "Sofia", "Tarek", "Thomas", "Tobias",
    "Vera", "Vikram", "Yasmin", "Yusuf", "Zainab", "Zara"
  ];
  var FAMILY = [
    "Abadi", "Achebe", "Ademola", "Aguirre", "Almeida", "Ansari", "Arbogast",
    "Balogun", "Bhandari", "Cardoso", "Castellan", "Chatterjee", "Cortez",
    "Dagher", "Delacroix", "Deshmukh", "Duarte", "Eze", "Faridi", "Ferreira",
    "Gadkari", "Ghorbani", "Halloran", "Haruna", "Iyengar", "Jozwiak",
    "Kalvani", "Kapadia", "Khoury", "Kovalenko", "Lindqvist", "Machado",
    "Madubuike", "Mahfouz", "Marchetti", "Mbeki", "Mendonca", "Nakamura",
    "Narayan", "Nkemdirim", "Okonkwo", "Oyelaran", "Pahlavi", "Pandit",
    "Petrossian", "Quiroga", "Rahimi", "Ramaswamy", "Rasmussen", "Rebello",
    "Salvatierra", "Sandoval", "Sarkissian", "Sepulveda", "Shirazi", "Sindhu",
    "Tarrant", "Thackeray", "Tolentino", "Uwakwe", "Vaidya", "Valdivia",
    "Varghese", "Vasquez", "Whitmore", "Yilmaz", "Zabriskie", "Zeleke"
  ];

  /* ---------------- school pools (real institutions) ---------------- */
  var US_MD = [
    "University of Michigan Medical School",
    "Vanderbilt University School of Medicine",
    "Pennsylvania State University College of Medicine",
    "University of Louisville School of Medicine",
    "Meharry Medical College",
    "Sidney Kimmel Medical College at Thomas Jefferson University",
    "University of Missouri-Kansas City School of Medicine",
    "University of Arizona College of Medicine - Phoenix",
    "Texas A&M Health Science Center College of Medicine",
    "University of Illinois College of Medicine - Rockford",
    "University of Illinois College of Medicine",
    "Wayne State University School of Medicine",
    "Indiana University School of Medicine",
    "Ohio State University College of Medicine",
    "The University of Texas Southwestern Medical School",
    "Wright State University Boonshoft School of Medicine",
    "University of Alabama at Birmingham Marnix E. Heersink School of Medicine",
    "The University of Toledo College of Medicine and Life Sciences",
    "Northwestern University The Feinberg School of Medicine",
    "Medical College of Wisconsin",
    "University of Iowa Roy J. and Lucille A. Carver College of Medicine",
    "Saint Louis University School of Medicine"
  ];
  var US_DO = [
    "Rowan-Virtua School of Osteopathic Medicine",
    "Kansas City University College of Osteopathic Medicine",
    "Des Moines University College of Osteopathic Medicine",
    "Philadelphia College of Osteopathic Medicine",
    "Midwestern University Chicago College of Osteopathic Medicine",
    "Lake Erie College of Osteopathic Medicine",
    "A.T. Still University Kirksville College of Osteopathic Medicine"
  ];
  var CARIB = [
    "American University of Antigua College of Medicine",
    "St. George's University School of Medicine",
    "Ross University School of Medicine",
    "Saba University School of Medicine",
    "American University of the Caribbean School of Medicine"
  ];
  var INTL = [
    "Mashhad University of Medical Sciences",
    "Nepal Medical College",
    "Nnamdi Azikiwe University College of Health Sciences",
    "Kasturba Medical College, Manipal",
    "Grant Government Medical College",
    "Dow Medical College",
    "Aga Khan University Medical College",
    "Cairo University Faculty of Medicine",
    "University of Lagos College of Medicine",
    "Universidad Nacional Autonoma de Mexico Faculty of Medicine",
    "Shahid Beheshti University of Medical Sciences",
    "Ain Shams University Faculty of Medicine",
    "Jordan University of Science and Technology Faculty of Medicine",
    "Osmania Medical College",
    "Bangalore Medical College and Research Institute",
    "University of Damascus Faculty of Medicine",
    "Sechenov First Moscow State Medical University",
    "Chinese University of Hong Kong Faculty of Medicine",
    "University of Santo Tomas Faculty of Medicine and Surgery",
    "Lviv National Medical University",
    "Tbilisi State Medical University",
    "Universidad Central del Caribe School of Medicine",
    "Christian Medical College, Vellore",
    "King Edward Medical University"
  ];
  var CANADA = [
    "University of Toronto Faculty of Medicine",
    "McGill University Faculty of Medicine",
    "University of British Columbia Faculty of Medicine"
  ];

  /* US census divisions — the values behind "Division Preference" */
  var DIVISIONS = [
    "New England", "Middle Atlantic", "South Atlantic", "East North Central",
    "East South Central", "West North Central", "West South Central",
    "Mountain", "Pacific"
  ];
  var SETTINGS = [
    "No Preference", "Rural", "Rural or Suburban", "Suburban",
    "Suburban or Urban", "Urban"
  ];
  var PRONOUNS = ["He/Him/His", "She/Her/Hers", "They/Them/Theirs", ""];
  var TRACKS = ["Categorical", "Primary Care", "Research Pathway"];

  /* ---------------- the pool ---------------- */
  /* Mix is invented. It leans IMG-heavy the way a large Internal Medicine
     pool does, which is the whole reason this page exists; it is not a
     measurement of any real program's applicants. */
  var TYPE_MIX = [
    ["Non-U.S. IMG", 0.45], ["U.S. MD Senior", 0.19], ["U.S. DO Senior", 0.12],
    ["U.S. IMG", 0.11], ["Previous Graduate", 0.13]
  ];
  function drawType() {
    var x = r(), acc = 0;
    for (var i = 0; i < TYPE_MIX.length; i++) {
      acc += TYPE_MIX[i][1];
      if (x < acc) return TYPE_MIX[i][0];
    }
    return "Non-U.S. IMG";
  }

  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function fmtDate(d) {
    return MONTHS[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
  }
  /* ERAS releases every application to programs on one day, so most rows
     share a date and the stragglers trail in behind it. */
  function drawApplied() {
    if (chance(0.68)) return new Date(2025, 8, 24);
    return new Date(2025, 8, 24 + intBetween(1, 52));
  }

  var applicants = [];
  var usedIds = {};
  for (var i = 0; i < 732; i++) {
    var type = drawType();
    var isDO = type === "U.S. DO Senior";
    var school, country;
    if (type === "U.S. MD Senior") { school = pick(US_MD); country = "United States"; }
    else if (isDO) { school = pick(US_DO); country = "United States"; }
    else if (type === "U.S. IMG") {
      school = chance(0.72) ? pick(CARIB) : pick(INTL);
      country = "Other";
    } else if (type === "Previous Graduate") {
      school = chance(0.45) ? pick(US_MD) : pick(INTL);
      country = school.indexOf("University of Michigan") === 0 ? "United States" : "Other";
    } else {
      school = chance(0.06) ? pick(CANADA) : pick(INTL);
      country = "Other";
    }
    var lcme = US_MD.indexOf(school) >= 0;
    var nonUsImg = type === "Non-U.S. IMG";

    var id;
    do { id = String(intBetween(10000000, 19999999)); } while (usedIds[id]);
    usedIds[id] = 1;

    /* Step 2 CK medians track the main site's figures: 248 for matched
       non-U.S. IMGs, 242 for unmatched. The spread here is invented. */
    var base = nonUsImg ? 244 : type === "U.S. MD Senior" ? 250 : 245;
    var step2 = chance(0.11) ? null : Math.max(196, Math.min(285,
      Math.round(base + (r() + r() + r() - 1.5) * 13)));

    var signal = chance(0.137) ? "Gold" : chance(0.19) ? "Silver" : "None";
    var lors = chance(0.05) ? 2 : chance(0.08) ? 4 : 3;
    var reviewed = chance(0.0);   /* the demo program has reviewed nothing yet */

    applicants.push({
      idx: i,
      last: pick(FAMILY),
      first: pick(GIVEN),
      aamcId: id,
      school: school,
      country: country,
      lcme: lcme,
      osteopathic: isDO,
      type: type,
      applied: drawApplied(),
      signal: signal,
      divisionPref: chance(0.42) ? "Yes" : chance(0.55) ? "No Preference" : "",
      division: pick(DIVISIONS),
      setting: pick(SETTINGS),
      pronouns: pick(PRONOUNS),
      track: chance(0.82) ? "Categorical" : pick(TRACKS),
      couples: chance(0.043),
      step1: chance(0.965) ? "Pass" : "Fail",
      step2: step2,
      comlex: isDO ? intBetween(480, 720) : null,
      attempts: chance(0.9) ? 1 : intBetween(2, 3),
      ecfmg: nonUsImg || type === "U.S. IMG" ? chance(0.71) : null,
      visaRequired: nonUsImg ? chance(0.88) : type === "U.S. IMG" ? false : false,
      workAuth: nonUsImg ? chance(0.12) : true,
      gradYear: type.indexOf("Senior") > 0 ? 2026 : intBetween(2016, 2025),
      lors: lors,
      chairLor: chance(0.38),
      mspe: chance(0.86),
      transcript: chance(0.91),
      personalStatement: chance(0.98),
      photo: chance(0.94),
      usmleTranscript: !isDO && chance(0.93),
      comlexTranscript: isDO && chance(0.9),
      reviewed: reviewed,
      inactive: chance(0.0),
      interview: chance(0.0),
      ranked: false,
      pubs: intBetween(0, 9),
      abstracts: intBetween(0, 12),
      presentations: intBetween(0, 10),
      research: intBetween(0, 7),
      volunteer: intBetween(1, 9),
      work: intBetween(0, 6),
      docs: 0
    });
  }
  applicants.forEach(function (a) {
    a.name = a.last + ", " + a.first;
    a.appliedStr = fmtDate(a.applied);
    a.docs = 5 + a.lors + (a.chairLor ? 1 : 0) + (a.mspe ? 1 : 0) +
             (a.usmleTranscript || a.comlexTranscript ? 1 : 0);
    a.english = a.country === "United States" ? "Yes" : chance(0.93) ? "Yes" : "No";
  });

  /* ---------------- filter predicates ---------------- */
  /* Each named filter is a real predicate over the pool, so the counts,
     the pagination and the "Total Items" line are all computed, never typed. */
  function has(n) { return function (a) { return a.lors >= n; }; }
  var P = {
    all: function () { return true; },
    active: function (a) { return !a.inactive; },
    gold: function (a) { return a.signal === "Gold"; },
    silver: function (a) { return a.signal === "Silver"; },
    signalled: function (a) { return a.signal !== "None"; },
    couplesGold: function (a) { return a.couples && a.signal === "Gold"; },
    couples: function (a) { return a.couples; },
    notReviewed: function (a) { return !a.reviewed; },
    reviewed: function (a) { return a.reviewed; },
    noUsRes: function (a) { return a.country !== "United States"; },
    usRes: function (a) { return a.country === "United States"; },
    workAuth: function (a) { return a.workAuth; },
    visa: function (a) { return a.visaRequired; },
    foreign: function (a) { return !a.lcme && !a.osteopathic; },
    canadian: function (a) { return a.school.indexOf("Toronto") > 0 || a.school.indexOf("McGill") >= 0 || a.school.indexOf("British Columbia") > 0; },
    lcme: function (a) { return a.lcme; },
    nonLcme: function (a) { return !a.lcme; },
    osteo: function (a) { return a.osteopathic; },
    ecfmg: function (a) { return a.ecfmg === true; },
    noEcfmg: function (a) { return a.ecfmg === false; },
    prevGrad: function (a) { return a.type === "Previous Graduate"; },
    mspe: function (a) { return a.mspe; },
    noMspe: function (a) { return !a.mspe; },
    tx: function (a) { return a.transcript; },
    noTx: function (a) { return !a.transcript; },
    ps: function (a) { return a.personalStatement; },
    noPs: function (a) { return !a.personalStatement; },
    photo: function (a) { return a.photo; },
    noPhoto: function (a) { return !a.photo; },
    usmle: function (a) { return a.usmleTranscript; },
    noUsmle: function (a) { return !a.usmleTranscript; },
    comlex: function (a) { return a.comlexTranscript; },
    noComlex: function (a) { return !a.comlexTranscript; },
    chair: function (a) { return a.chairLor; },
    noChair: function (a) { return !a.chairLor; },
    lor3: has(3),
    lorMissing: function (a) { return a.lors < 3; },
    east: function (a) { return ["New England", "Middle Atlantic", "South Atlantic"].indexOf(a.division) >= 0; },
    midwest: function (a) { return a.division.indexOf("North Central") > 0; },
    south: function (a) { return a.division.indexOf("South") >= 0; },
    west: function (a) { return a.division === "Mountain" || a.division === "Pacific"; },
    none: function () { return false; }
  };
  function and() {
    var fns = [].slice.call(arguments);
    return function (a) { return fns.every(function (f) { return f(a); }); };
  }

  /* Row-major alphabetical, matching how PDWS lays the two columns out. */
  var userFilters = [
    { name: "All Gold Signals", fn: P.gold },
    { name: "Couples Match Gold", fn: P.couplesGold },
    { name: "east", fn: P.east },
    { name: "Interviewed", fn: P.none },
    { name: "Invite to Interview", fn: and(P.gold, P.lor3) },
    { name: "Max", fn: and(P.signalled, P.mspe, P.lor3) },
    { name: "midwest central", fn: P.midwest },
    { name: "Program signal Silver", fn: P.silver },
    { name: "Program signals Gold", fn: P.gold },
    { name: "Reviewed and on Hold", fn: P.none },
    { name: "south", fn: P.south },
    { name: "west", fn: P.west },
    { name: "zxc", fn: and(P.gold, P.usRes) }
  ];

  var systemFilters = [
    { name: "2 LoRs and COMLEX-USA Transcript", fn: and(has(2), P.comlex) },
    { name: "2 LoRs and USMLE Transcript", fn: and(has(2), P.usmle) },
    { name: "3 LoRs and COMLEX-USA Transcript", fn: and(has(3), P.comlex) },
    { name: "3 LoRs and USMLE Transcript", fn: and(has(3), P.usmle) },
    { name: "3 LoRs Missing", fn: P.lorMissing },
    { name: "3 LoRs Received", fn: P.lor3 },
    { name: "3 LoRs, MSPE, COMLEX-USA Transcript", fn: and(has(3), P.mspe, P.comlex) },
    { name: "3 LoRs, MSPE, USMLE Transcript", fn: and(has(3), P.mspe, P.usmle) },
    { name: "Active Applicants", fn: P.active },
    { name: "All Applicants", fn: P.all },
    { name: "Applicant Applied Date", fn: P.all },
    { name: "Applicants Assigned", fn: P.none },
    { name: "Applicants Not Reviewed", fn: P.notReviewed },
    { name: "Applicants Where Date Reviewed Precedes Date of Latest Document", fn: P.none },
    { name: "Applicants with Interview Scheduled", fn: P.none },
    { name: "Applicants with No US or Canadian Residency", fn: P.noUsRes },
    { name: "Applicants with US or Canadian Residency", fn: P.usRes },
    { name: "Authorized to Work in the US", fn: P.workAuth },
    { name: "Canadian Graduates", fn: P.canadian },
    { name: "COMLEX-USA Missing", fn: P.noComlex },
    { name: "COMLEX-USA Received", fn: P.comlex },
    { name: "Composite Score", fn: P.all },
    { name: "Couples Match Applicants", fn: P.couples },
    { name: "Dept. Chair LoR Missing", fn: P.noChair },
    { name: "Dept. Chair LoR Received", fn: P.chair },
    { name: "ECFMG Certified", fn: P.ecfmg },
    { name: "ECFMG Not Certified", fn: P.noEcfmg },
    { name: "Foreign Graduates", fn: P.foreign },
    { name: "Last Name (Active Applicants)", fn: P.active },
    { name: "LCME Accredited School", fn: P.lcme },
    { name: "Medical School Transcript Missing", fn: P.noTx },
    { name: "Medical School Transcript Received", fn: P.tx },
    { name: "MSPE Missing", fn: P.noMspe },
    { name: "MSPE Received", fn: P.mspe },
    { name: "No Longer Under Consideration", fn: P.none },
    { name: "Non-LCME Accredited School", fn: P.nonLcme },
    { name: "Osteopathic Recognition", fn: P.osteo },
    { name: "Personal Statement Missing", fn: P.noPs },
    { name: "Personal Statement Received", fn: P.ps },
    { name: "Photo Missing", fn: P.noPhoto },
    { name: "Photo Received", fn: P.photo },
    { name: "Previous Graduates", fn: P.prevGrad },
    { name: "Program Signal - Gold", fn: P.gold },
    { name: "Program Signal - Silver", fn: P.silver },
    { name: "Program Signals Received", fn: P.signalled },
    { name: "Ranked Applicants", fn: P.none },
    { name: "Requires Visa Sponsorship", fn: P.visa },
    { name: "Reviewed Applicants", fn: P.reviewed },
    { name: "USMLE Transcript Missing", fn: P.noUsmle },
    { name: "USMLE Transcript Received", fn: P.usmle }
  ];

  /* ---------------- criteria catalog ----------------
     `seen: true` marks a category or field transcribed from a screenshot
     of the real product. Everything else is reconstructed, and the page
     says so where a reader can see it. */
  var YESNO = { type: "yesno" };
  var DATE = { type: "date" };
  var NUM = { type: "number" };
  var TEXT = { type: "text" };
  function list() { return { type: "list", values: [].slice.call(arguments) }; }

  var categories = [
    { name: "Applicant Ranking", seen: true, fields: [
      { name: "Rank Order", spec: NUM },
      { name: "Ranked", spec: YESNO },
      { name: "Rank List Certified", spec: YESNO }
    ] },
    { name: "Applicants Type", seen: true, fields: [
      { name: "Applicant Type", spec: list("U.S. MD Senior", "U.S. DO Senior", "U.S. IMG", "Non-U.S. IMG", "Previous Graduate", "Canadian Graduate"), note: "type" },
      { name: "Currently Enrolled", spec: YESNO },
      { name: "Previous Graduate", spec: YESNO }
    ] },
    { name: "Application Status", seen: true, fields: [
      { name: "Applicant Applied Date", seen: true, spec: DATE },
      { name: "Application Reviewed", seen: true, spec: YESNO },
      { name: "Application Reviewed Date", seen: true, spec: DATE },
      { name: "Complete Application", seen: true, spec: YESNO },
      { name: "Complete Application Date", seen: true, spec: DATE },
      { name: "Couples match", seen: true, spec: YESNO, note: "couples" },
      { name: "Inactive", seen: true, spec: YESNO },
      { name: "Inactive Date", seen: true, spec: DATE },
      { name: "Incomplete Application", seen: true, spec: YESNO },
      { name: "Incomplete Application Date", seen: true, spec: DATE }
    ] },
    { name: "Assignment Information", seen: true, fields: [
      { name: "Assigned To", spec: TEXT },
      { name: "Assignment Date", spec: DATE },
      { name: "Unassigned", spec: YESNO }
    ] },
    { name: "Communication", seen: true, fields: [
      { name: "Message Sent", spec: YESNO },
      { name: "Message Sent Date", spec: DATE },
      { name: "Interview Invitation Sent", spec: YESNO }
    ] },
    { name: "Composite Score", seen: true, fields: [
      { name: "Composite Score", spec: NUM },
      { name: "Composite Score Entered", spec: YESNO }
    ] },
    { name: "Custom Scores", seen: true, fields: [
      { name: "Custom Score 1", spec: NUM },
      { name: "Custom Score 2", spec: NUM },
      { name: "Custom Score Entered", spec: YESNO }
    ] },
    { name: "Custom Status", seen: true, fields: [
      { name: "Custom Status", spec: list("On Hold", "Invite to Interview", "Do Not Interview", "No Longer Under Consideration") }
    ] },
    { name: "Demographics", seen: true, fields: [
      { name: "Gender", spec: list("Man", "Woman", "Another Gender Identity", "Choose not to disclose"), note: "screened" },
      { name: "Date of Birth", spec: DATE, note: "screened" },
      { name: "Self-Identification", spec: list("American Indian or Alaska Native", "Asian", "Black or African American", "Hispanic, Latino or of Spanish Origin", "Native Hawaiian or Other Pacific Islander", "White", "Choose not to disclose"), note: "screened" },
      { name: "Designated Pronouns", spec: list("He/Him/His", "She/Her/Hers", "They/Them/Theirs", "Not provided") }
    ] },
    { name: "Document Scores", seen: true, fields: [
      { name: "Document Score", spec: NUM },
      { name: "Document Score Entered", spec: YESNO }
    ] },
    { name: "Documents", seen: true, fields: [
      { name: "MSPE Received", spec: YESNO, note: "docs" },
      { name: "Medical School Transcript Received", spec: YESNO },
      { name: "Personal Statement Received", spec: YESNO },
      { name: "Photo Received", spec: YESNO },
      { name: "Number of LoRs Received", spec: NUM },
      { name: "Dept. Chair LoR Received", spec: YESNO }
    ] },
    { name: "Exams", seen: true, fields: [
      { name: "USMLE Step 1 Result", spec: list("Pass", "Fail"), note: "step1" },
      { name: "USMLE Step 2 CK Score", spec: NUM, note: "step2" },
      { name: "USMLE Step 3 Score", spec: NUM },
      { name: "COMLEX-USA Level 1 Result", spec: list("Pass", "Fail") },
      { name: "COMLEX-USA Level 2 CE Score", spec: NUM },
      { name: "Number of Exam Attempts", spec: NUM, note: "attempts" },
      { name: "ECFMG Certified", spec: YESNO, note: "ecfmg" },
      { name: "ECFMG Certification Date", spec: DATE }
    ] },
    { name: "Felony/Misdemeanor", seen: true, fields: [
      { name: "Felony Conviction", spec: YESNO },
      { name: "Misdemeanor Conviction", spec: YESNO },
      { name: "Military Discharge Other Than Honorable", spec: YESNO }
    ] },
    { name: "Geographic Preferences", seen: true, fields: [
      { name: "Division Preference", seen: true, spec: list.apply(null, ["No Preference"].concat(DIVISIONS)) },
      { name: "Setting Preference", seen: true, spec: list.apply(null, SETTINGS) }
    ] },
    { name: "Higher Education", seen: true, fields: [
      { name: "Undergraduate Institution", spec: TEXT },
      { name: "Undergraduate Degree", spec: list("BA", "BS", "BSc", "Other") },
      { name: "Graduate Degree", spec: list("MPH", "MS", "PhD", "MBA", "None") }
    ] },
    { name: "Honors & Awards", seen: true, fields: [
      { name: "Alpha Omega Alpha", spec: YESNO },
      { name: "Gold Humanism Honor Society", spec: YESNO },
      { name: "Sigma Sigma Phi", spec: YESNO }
    ] },
    { name: "Interview Scores", seen: true, fields: [
      { name: "Interview Score", spec: NUM },
      { name: "Interview Completed", spec: YESNO },
      { name: "Interview Date", spec: DATE }
    ] },
    { name: "Language", seen: true, fields: [
      { name: "Language Spoken", spec: list("Arabic", "French", "Hindi", "Mandarin", "Russian", "Spanish", "Urdu", "Other") },
      { name: "Language Fluency", spec: list("Native", "Advanced", "Good", "Basic") },
      { name: "Advanced English Proficiency", spec: YESNO, note: "english" }
    ] },
    { name: "Licenses/Certifications", seen: true, fields: [
      { name: "Medical License", spec: YESNO },
      { name: "License State", spec: TEXT },
      { name: "ACLS Certified", spec: YESNO },
      { name: "BLS Certified", spec: YESNO }
    ] },
    { name: "Medical Education", fields: [
      { name: "Most Recent Medical School", spec: TEXT, note: "school" },
      { name: "Country of Medical School", spec: list("United States", "Canada", "Other"), note: "country" },
      { name: "LCME Accredited", spec: YESNO, note: "lcme" },
      { name: "Graduation Year", spec: NUM, note: "gradyear" },
      { name: "Degree", spec: list("MD", "DO", "MBBS", "MBChB", "Other") },
      { name: "Medical School Honors", spec: YESNO }
    ] },
    { name: "Membership", fields: [
      { name: "Professional Society Member", spec: YESNO },
      { name: "Society Name", spec: TEXT }
    ] },
    { name: "Military Service", fields: [
      { name: "Military Obligation", spec: YESNO },
      { name: "Branch of Service", spec: list("Army", "Navy", "Air Force", "Public Health Service", "None") }
    ] },
    { name: "Post-Review Scores", fields: [
      { name: "Post-Review Score", spec: NUM },
      { name: "Post-Review Score Entered", spec: YESNO }
    ] },
    { name: "Program Signals", fields: [
      { name: "Program Signal Received", spec: YESNO, note: "signal" },
      { name: "Signal Tier", spec: list("Gold", "Silver", "None"), note: "signal" },
      { name: "Geographic Preference Signal", spec: YESNO }
    ] },
    { name: "Publications", fields: [
      { name: "Peer-Reviewed Publications", spec: NUM, note: "pubs" },
      { name: "Peer-Reviewed Abstracts", spec: NUM },
      { name: "Poster Presentations", spec: NUM },
      { name: "Research Experiences", spec: NUM }
    ] },
    { name: "Reviewer Scores", fields: [
      { name: "Reviewer Score", spec: NUM },
      { name: "Number of Reviews", spec: NUM }
    ] },
    { name: "Tracks", fields: [
      { name: "Tracks Applied by Applicant", spec: list.apply(null, TRACKS) },
      { name: "Tracks Considered by Program", spec: list.apply(null, TRACKS) }
    ] },
    { name: "Visa/Citizenship", fields: [
      { name: "Current Work Authorization", spec: list("U.S. Citizen", "Permanent Resident", "J-1 Visa", "H-1B Visa", "F-1 / OPT", "Other", "None"), note: "visa" },
      { name: "Visa Sponsorship Required", spec: YESNO, note: "visa" },
      { name: "U.S. or Canadian Citizen", spec: YESNO },
      { name: "Country of Citizenship", spec: TEXT }
    ] },
    { name: "Work Experience", fields: [
      { name: "U.S. Clinical Experience", spec: YESNO, note: "usce" },
      { name: "Work Experiences", spec: NUM },
      { name: "Volunteer Experiences", spec: NUM }
    ] }
  ];

  return {
    applicants: applicants,
    userFilters: userFilters,
    systemFilters: systemFilters,
    categories: categories,
    divisions: DIVISIONS,
    settings: SETTINGS,
    fmtDate: fmtDate
  };
})();
