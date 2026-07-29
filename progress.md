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
2. In the repo: Settings → Pages → deploy from `main`, root. Tick Enforce HTTPS
   once the certificate appears.
3. After the first public share, force a refetch of the preview card via
   Facebook's Sharing Debugger and X's Card Validator; both cache aggressively.

---

## How to rebuild

The site is assembled from four sources in the scratchpad, not edited directly:

```
template.html   markup, with /*__CSS__*/ /*__DATA__*/ /*__APP__*/ placeholders
style.css       all styling
app.js          all interactivity
data.js         the dataset (generated from the PDF, do not hand-edit)
```

Build = substitute the three placeholders into `template.html`, write
`index.html`. `make-og-image.py` regenerates the social card and needs Pillow
plus macOS system fonts.

**If the scratchpad is gone**, `index.html` is self-contained and still the
source of truth; the four parts can be split back out of it.

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
- Repo `saieeshb/img-match-2026` created and pushed; Pages configured.
- Dark mode is now the default; light is opt-in via the toggle.
- Replaced the left-aligned hero with a centered WebGL particle field: one
  particle per analysed applicant (8,943), split 4,429 blue / 4,514 amber in the
  true matched / unmatched proportion.
- Dropped the teal uppercase eyebrow and the teal accent throughout. Palette is
  now near-black, cream, and the two data colours only.
- New headline: "Two numbers separated 8,943 IMG applicants".

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
