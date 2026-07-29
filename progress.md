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

The site is assembled from `src/`, not edited directly. `index.html` is a build
artefact; editing it by hand will be overwritten.

```
src/template.html   markup, with the /*__CSS__*/ /*__HERO__*/ /*__DATA__*/ /*__APP__*/ slots
src/style.css       all styling
src/app.js          all interactivity (tables, charts, exports, theme)
src/hero.js         the WebGL particle field
src/data.js         the dataset, generated from the PDF — do not hand-edit
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
