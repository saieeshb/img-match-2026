# Progress log

Running state of this project so work can resume after a session ends.
Newest entries at the top.

**Live:** https://match.saieesh.dev · **Repo:** https://github.com/saieeshb/img-match-2026

---

## Current state

| Thing | Status |
|---|---|
| Data extraction from the NRMP PDF | Done, cross-validated |
| Interactive site (6 sections) | Done |
| Program view (PDWS recreation) | Done |
| CSV / JSON exports | Done |
| De-slop pass on all copy | Done, all gates pass |
| OG card | Done (small-multiples design) |
| Domain wiring + CNAME | Done (`match.saieesh.dev`) |
| GitHub repo + Pages | Done |
| Dark mode as default | Done |
| Centered Three.js hero | Done |
| Palette away from teal accent | Done |
| DNS record on `saieesh.dev` | **Waiting on Saieesh** |

## Next actions

1. Add the DNS record: `CNAME  match  saieeshb.github.io.` on `saieesh.dev`.
2. Pages is already enabled on `main` / root with the CNAME registered. Tick
   Enforce HTTPS once the certificate finishes provisioning.
3. After the first public share, force a refetch of the preview card via
   Facebook's Sharing Debugger and X's Card Validator; both cache aggressively.

---

## How to rebuild

The site is assembled from `src/`, not edited directly. `index.html` and
`program-view.html` are build artefacts; editing them by hand will be
overwritten. **This has already happened once.** The full-screen feature was
written straight into `program-view.html`, survived three commits, and was wiped
by the next `python3 build.py`. It was recovered from git and moved into `src/`.
If you change a built file directly, the change lives exactly until someone
rebuilds.

`build.py` writes two pages.

```
index.html            ← src/template.html
src/style.css         all styling
src/app.js            all interactivity (tables, charts, exports, theme)
src/hero.js           the WebGL particle field
src/data.js           the dataset, generated from the PDF — do not hand-edit

program-view.html     ← src/pdws.template.html
src/pdws.css          frame plus specimen styling
src/pdws-data.js      seeded synthetic applicant pool, filters, criteria catalog
src/pdws.js           the five views, routing, annotations
```

```bash
python3 build.py
```

`three.min.js` stays a separate same-origin file rather than being inlined; at
608 KB it caches better on its own. `make-og-image.py` regenerates the social
card and needs Pillow plus macOS system fonts.

---

## Decisions worth remembering

**The headline rate is 49.0%, not the 41.5% the NRMP report leads with.** Their
figure is the unweighted mean of 24 specialty rates, which counts Vascular
Surgery's 28 applicants equally with Internal Medicine's 6,992. The
applicant-weighted rate is 5,721 / 11,685 = 49.0%. Verified by reproducing
41.48 as the unweighted mean.

**Data was cross-validated, not just parsed once.** Every median in the nine
detailed quartile tables was checked against the separately typeset per-specialty
summary tables. 396 medians compared, zero mismatches.

**Suppressed cohorts are carried through as suppressed**, never dropped or
zeroed: Dermatology, Orthopaedics, Otolaryngology, Plastics, Vascular Surgery
(matched cohort under 5), plus Public Health and Thoracic Surgery (both cohorts).

**Each OG-card measure sits on its own scale.** A shared axis misrepresents the
data in either direction: as a percentage change, ranks is +150% and Step 2 CK
+2.5%, but in effect-size terms they are roughly 0.8 and 0.43 SD, genuinely
comparable. Separate labelled scales are the honest rendering.

**Copyright position.** Saieesh's call, made 2026-07-29: the underlying
statistics are published facts and facts are not copyrightable (*Feist v. Rural
Telephone*); this is an original presentation of them. NRMP asserts broader reuse
terms and restricts AI use of its data. Footer carries full attribution and a
non-affiliation disclaimer. Contact if ever needed: datarequest@nrmp.org.

---

## Log

### 2026-08-09 — OG card rebuilt as the hero, in the site's real fonts

- **The old card was set in two typefaces the site never renders.** It used
  Georgia and Arial, but `--serif` resolves to Iowan Old Style and `--sans`
  resolves to SF Pro through `-apple-system`. Georgia is fourth in the serif
  stack and Arial is seventh in the sans stack, so neither reached a visitor.
  Both are now loaded directly: `Iowan Old Style.ttc` index 1 for Bold, and
  `SFNS.ttf` with `set_variation_by_name` for Regular and Semibold.
- **The card is now the hero rather than a chart about it.** Same construction
  as `src/hero.js`: 8,970 points, one per consented applicant, Fibonacci sphere
  at the same golden angle and radii, interpolated to `MIX = 0.58` toward two
  masses split by 6.4, through the same 52-degree camera at z = 17.5. Headline
  updated to "Two numbers out of eleven".
- Drawn at 3x and downsampled. `ImageDraw.Draw(img, "RGBA")` is what makes 8,970
  overlapping dots alpha-blend instead of overwriting each other; the scrim is
  computed at 240x126 and scaled up, because evaluating it per pixel at 3600x1890
  in Python is not worth the seconds.
- The teal accent the rest of the build dropped in July is gone from the card too.
- `og:image:alt` rewrote: it still described the old dot plots.
- **Cache note.** The filename did not change, so anywhere the URL has already
  been shared will keep serving the old card until forced. LinkedIn Post
  Inspector, Facebook Sharing Debugger and X Card Validator each need a manual
  refetch.
- `program-view.html` still points at this same card. Its own title is "The
  screen on the other side", so the image and the headline do not agree. Left
  alone for now; a second card would fix it.


### 2026-08-09 — Fact-check against the source PDF, eleven measures, light hero, full screen

- **Fact-checked every published claim against the original 255-page NRMP PDF**
  (`~/Downloads/Non-US-IMG_Charting-Outcomes_FINAL.pdf`). Table 2 (printed p.7)
  matches `data.js` exactly on all eleven rows. Internal Medicine Step 2 range
  confirmed from Table 5 (p.17): matched 209-284 (n=2,649), unmatched 209-279
  (n=2,730). Table 1 totals confirm 5,721 / 11,685 = 49.0%, and the unweighted
  mean of the 24 specialty rates reproduces NRMP's headline at 41.48%.
  Pediatrics 68.5% and Vascular Surgery 14.3% match NRMP's stated high and low.
- **"Nine measures" was wrong and is now eleven.** Table 2's own header says
  "the 11 measures presented in this report" and numbers its rows 1-11. The nine
  framing counted only the median rows and silently dropped the two percentage
  rows, while the page rendered all eleven directly underneath. Headline, hero,
  OG title and the explorer intro all now say eleven. **`DATA.metrics` stays at
  9** and so does "432 rows = 24 x 9 x 2": the per-specialty quartile tables
  genuinely cover nine measures. Only Table 2 and the detail drawer carry eleven.
- New hero line records the real shape: two separate, seven identical, and one
  of the last two runs backwards (21.1% of matched hold another graduate degree
  against 24.3% of unmatched).
- **Absences verified by full-text scan, not assumption.** Zero occurrences
  across 255 pages of: visa, sponsorship, citizenship, clinical experience,
  USCE, observership, externship, year of graduation, ECFMG, Step 1, Step 3,
  signal. MSPE and reference letters appear exactly once each, in the
  Introduction, named as contributors and then never measured.
- **The hero now follows the theme.** Background, scrim, all five text colours
  and the two particle colours were hardcoded dark, so light mode left a
  near-black slab above a cream page. All are tokens now, with per-theme veil
  opacities because a mid-band that can be fully transparent over near-black
  cannot be over cream. Light hero contrast: h1 16.0, sub 9.5, meta/key/hint
  5.76. Dark unchanged.
- **Two ordering bugs found while testing that.** `hero.js` initialises before
  `app.js` restores the saved theme, so a light-mode load painted the field in
  the dark palette and never repainted; `app.js` now calls `__heroRepaint()`
  after restoring. Separately, several "the field is invisible" screenshots were
  me capturing during the 1.5s fade-in at opacity 0.008, not a real defect.
- **Full screen recovered and ported.** The feature existed only in the built
  `program-view.html` and my rebuild destroyed it. Restored from git and moved
  into `src/`, along with the copy revision that removed every "screenshots"
  reference. Two real bugs fixed while porting: the toolbar was appended to
  `<body>`, which is invisible in native fullscreen because only the fullscreen
  element's subtree paints, and the fallback had no Escape handler. Toolbar also
  moved to bottom-right, where it stops covering the program/user block.
- Verified: fallback fills 390x844 exactly on mobile with 44px targets and no
  overflow, nav dropdowns render inside the fullscreen host, Escape and "Tab
  out" both exit with focus landing outside the specimen, no console errors.
- Gates after the copy change: banned 0, structure clean at burstiness 0.556
  (0.544 before I split the hero's trailing clause, which is under the floor and
  blocking), silhouette clean, grade 9.9. Word repetition 45.6% is the same
  terminology trade recorded in the clarify pass.
- `PRODUCT.md` cadence question closed from source: NRMP was biennial and moves
  to annual.


### 2026-07-30 — Program view (second page)
- New page `program-view.html`, linked from the top bar as a distinct tab. It
  recreates the AAMC Program Director's WorkStation from screenshots Saieesh
  supplied: dashboard, applicant list, applicant record, Manage Filters and the
  New Criteria builder, plus a "not recreated" state for the sections the
  screenshots never showed.
- **Two visual worlds, deliberately unblended.** The frame is this site's own
  chrome (dark, serif); the specimen is light and dense and stays light in both
  themes, because restyling an enterprise grid to match this site would
  misrepresent what a program actually looks at.
- **732 invented applicants from a seeded PRNG, and every filter is a real
  predicate over them.** Total Items, the page count, the per-filter counts in
  Manage Filters and the live count under the criteria builder are all computed.
  Saving a criterion creates an ad-hoc filter and opens its result list.
- Reproduced verbatim from the screenshots: the nine nav sections, the two-column
  row-major filter lists (13 user-defined, 50 system-defined), the Geographic
  Preferences and Application Status field lists, the six Setting Preference
  values, Equals / Not equal to, the run-time toggle, and 732 → Page 1 of 8.
  Categories past the letter L are reconstructed from what ERAS collects, and the
  builder says so under any category it invented.
- **Non-impersonation is structural, not a footnote.** No AAMC logo or branding,
  a "PDWS recreation" wordmark, a disclosure block above the specimen, and a
  program named "Demo Program". Applicant names, IDs, scores and document states
  are generated; school names are real institutions because a filter on medical
  school is meaningless without them.
- **Applicant notes**, off by default so the default state is the recreation.
  Turning them on annotates the fields that decide most for a non-U.S. IMG:
  visa sponsorship (absent from the NRMP data, present as a filter here), ECFMG,
  Step 2 CK as a threshold, exam attempts, screened demographics.
- Defects found and fixed while building: every interaction rebuilt the view and
  dropped keyboard focus, so toggling two columns or typing a threshold was
  broken — now every control carries a `data-fkey` and `render()` restores focus
  and caret. On mobile, `MANAGE FILTERS` and `ACTIONS` overflowed their card
  headers and were clipped unreachable by `.pdws{overflow:hidden}`.
- Date criteria are deliberately not evaluated: the pool stores a formatted
  string, and Before/After over that would produce a confident wrong count. The
  builder reports honestly instead.
- Copy gates clean: banned 0, structure no flags (burstiness 0.586), silhouette
  penalty 0.0, grade 11.2. The one readability flag is word repetition at 34.4%
  on "filter", "program" and "medical", the same terminology trade recorded in
  the clarify pass.
- **Verification limit.** The browser pane delivers `Return` with `key:""`, so a
  native `<button>` ignores it too; keyboard activation is confirmed by
  dispatched events and by real `Tab` presses producing the focus ring.

### 2026-07-30 — Polish pass
- **Keyboard path was broken, not just imperfect.** Nothing on the page showed a
  focus ring: buttons, links and the `tabIndex=0` specialty rows all had
  `outline:none`, so a keyboard user navigated blind. One `:focus-visible`
  treatment now covers every reachable control. Sorting was also mouse-only —
  the `th` elements had no tabindex and no key handler — so it now takes Enter
  and Space, and hands focus back to the same column after the header rebuilds.
- **Column help was mouse-only too.** The tooltips explaining "Applicants /
  position" and the rest fired on `mousemove` alone. They now open on focus.
- **Mobile had no navigation at all.** `@media(max-width:820px){.navlinks{display:none}}`
  hid the six-section jump list below 820px, on a page that is six long tables,
  for an audience substantially on phones. The links now take their own
  full-width row and scroll sideways, with a mask fading the right edge.
  `.navlinks` already had `overflow-x:auto` — the affordance was built and then
  thrown away.
- **The callout was the only card on the page.** Everything else uses hairline
  rules and space (`.shead::before`, `.findings` border-top, `.caveatlist`
  border-bottom). The 41.5% note was a filled, rounded, amber-tinted box with a
  4px left border — both the detector's one finding and a genuine system
  outlier. Rebuilt as a hairline with an 88px accent segment, in the page's own
  grammar. `--warn-bg` and `--warn-rule` existed only for it and are gone.
- **Regression from the clarify pass, caught and fixed.** Setting
  `aria-sort="none"` on unsorted columns collided with
  `th[aria-sort] .arrow{opacity:1}`, so all nine sort arrows rendered as active.
  Selector now excludes `none`.
- Touch targets under `@media(pointer:coarse)` only, so a mouse does not get
  inflated controls: the theme button was 33×25.
- The hero hint told touch users to "move your pointer"; they now get the
  gesture they can actually perform.
- Mobile hero scrim widened. The field fills far more of a narrow frame, and
  the text was sitting on live particles.
- Detector: **0 findings** (was 1). Copy gates still clean.

### 2026-07-30 — Copy clarity pass
- **Terminology unified.** The page had six names for one concept (rank-list
  length / programs ranked in-specialty / contiguous ranks / Ranks / rank
  length). Canonical technical term is now **contiguous ranks** everywhere a
  label appears, matching NRMP and the CSV column, with a plain-language gloss
  in the aggregate table. "Not matched" / "Did not" / "unmatched" as *labels*
  are all now **Did not match**; prose still says "unmatched" as an adjective.
- **The subject is defined before it is used.** "Non-U.S. IMG" is now glossed in
  the hero. It was previously explained only in caveat #2, which is no good for
  the audience who arrives not knowing the term applies to them.
- **Two factual corrections.** The levers intro claimed the groups were
  "statistically indistinguishable"; no test was run and none is in the report,
  so it now says the medians are equal, which is what is actually shown. The
  verdict pill "No signal" became "No separation" for the same reason, and
  because it also has to cover the two degree rows, which are not identical.
- **The tier labels ignore sample size.** Public Health sorts second in the whole
  table wearing "Realistic" on three matches out of five. Said so in the legend,
  and moved the legend above the table where it can be read before the labels
  are. A sort-order or threshold fix is still open.
- Accessible names: theme button now says where it will take you, sort glyphs
  are `aria-hidden` with `aria-sort` on every sortable column, the compare and
  scatter charts have titles, and the hero's pointer hint is hidden from screen
  readers since it describes a canvas they cannot perceive.
- Export buttons: "Filtered CSV" lied when nothing was filtered, so it is now
  "Shown rows (CSV)" with the row count reading "18 of 432" when a filter is on.
- **Hero contrast.** Glossing *Charting Outcomes* in the hero meta line pushed it
  to three lines, down into the band where the scrim has faded, over dense
  particles. Reverted to the compact citation and moved the gloss into caveat 2,
  where a reader who needs it is actually looking. While measuring that, found
  `.hero-hint` at **3.17:1** against the hero's own background, under the 4.5:1
  floor and pre-dating this pass. Hero text now measures: sub 10.77, key 6.38,
  meta 5.59, hint 5.16.
- **Gate measurement note.** `sentence_burstiness` is highly sensitive to how
  headings are extracted: 0.549 with headings glued to the following sentence,
  0.552 with headings excluded, 0.615 with headings as their own units. The
  0.585 and 0.509 figures in the entry below were measured on the glued basis
  and are not comparable to these. Running prose only is the honest basis; all
  four gates pass on it (banned 0, structure clean, silhouette 0.412, grade 9.8).
  The one readability flag, word repetition at 39%, is a direct consequence of
  unifying terminology and is the correct trade.

### 2026-07-30 — Product record captured
- `PRODUCT.md` written: two primary audiences (applicants mid-decision and
  MBBS students orienting years early), the 49.0% and seven-identical-measures
  positioning, the rights position, and what the report does not contain and so
  must never be fabricated.
- Saieesh declined all four candidate hard constraints (zero external requests,
  a cheap-phone perf floor, traceable derivation, permanent exports). The build
  still does all four; they are incumbent behaviour, not commitments. The 608 KB
  three.js is therefore neither protected nor condemned.
- **Open question:** update cadence recorded as "bi-annually", which could mean
  twice a year or once every two years. NRMP publishes annually, so the two
  readings differ on whether a cycle gets skipped. Pin this before building a
  year switcher, archived editions, or dated URLs.
- `.impeccable/live/config.json` added for in-browser visual iteration, and
  `.impeccable/` gitignored. Note that live injects into `index.html`, which
  `build.py` overwrites; re-run live after any rebuild.

### 2026-07-29 — Hero redesign, dark default, repo live
- Second de-slop pass after the new hero copy: `sentence_burstiness` came in at
  0.513 against a 0.55 floor, which `--genre docs` does not excuse. Merged some
  mid-length sentence pairs and left short ones short; now 0.585 and clean.
  (This flag was present at 0.509 in the previous version too and was missed
  because structure_scan had been run on a flattened, single-paragraph extract.)
- Repo `saieeshb/img-match-2026` created and pushed; Pages configured with the
  CNAME already picked up.
- three.js r149 (MIT, UMD build) vendored locally as `three.min.js`, so the site
  still makes zero external requests. It is 608 KB, by far the heaviest thing
  here; a raw-WebGL point cloud would drop that to nothing if load time ever
  matters more than the convenience.
- Dark mode is now the default; light is opt-in via the toggle.
- Replaced the left-aligned hero with a centered WebGL particle field: one
  particle per analysed applicant (8,943), split 4,429 blue / 4,541 amber in the
  true matched / unmatched proportion.
- Dropped the teal uppercase eyebrow and the teal accent throughout. Palette is
  now near-black, cream, and the two data colours only.
- New headline: "Two numbers out of nine". Deliberately avoids a total count,
  because the report is internally inconsistent about it: the introduction says
  the sample was 8,943 while Table 2's cohorts sum to 8,970 (4,429 + 4,541). The
  particle field uses the two cohort figures, which are the ones actually drawn.
- Favicon recoloured off teal; no teal remains anywhere in the build.
- Hardened the hero against loading in a background tab: the fade-in now fires
  on the first frame that actually renders, and a ResizeObserver plus a
  visibilitychange handler catch the case where the canvas lays out at zero
  width and `resize()` bails.
- Sources moved into `src/` with `build.py`, so the project no longer depends on
  a scratchpad surviving between sessions.

### 2026-07-29 — De-slop pass
- Audit found 12 banned-phrase violations, 10 hard; em-dash density 16.3/1k.
- After rewrite: 0 violations, 0.0 em-dashes per 1k, structure clean,
  silhouette passes as `docs`.
- Verified no fact, guard word or negation was lost. Only "numbers" removed were
  the section-scaffold digits 01–06.
- Visual de-templating: numbered eyebrows, emoji favicon and uniform card grids
  all removed.

### 2026-07-29 — Build
- Extracted 432 rows (24 specialties × 9 measures × 2 cohorts) from the 255-page
  PDF using pypdf, plus Table 1 counts and per-specialty degree percentages.
- Built the six-section explorer with sortable tables, box plots, a cross-
  specialty comparison chart, a competitiveness scatter and three exports.
