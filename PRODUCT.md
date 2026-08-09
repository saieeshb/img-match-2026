# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, both confirmed as primary, arriving at the same page in different
gears:

- **Applicants mid-decision.** A non-U.S. IMG in or near an application cycle,
  choosing a specialty or sizing up their own odds. They arrive with a specific
  question about themselves and want their specialty in front of them quickly.
- **Students orienting early.** MBBS students years out from applying, before
  ECFMG or Step, building a mental model of what the Match actually rewards.
  They browse rather than look something up, and nothing on the page can assume
  they already know what Charting Outcomes is.

The page has to serve a lookup and a read without picking one.

## Product Purpose

Turn the NRMP's *Charting Outcomes: Non-U.S. IMGs* (Main Residency Match, 2026
Appointment Year) — a 255-page PDF of static tables — into a dataset a person
can actually interrogate, and take away.

Success is a reader who leaves knowing three things: where their specialty sits,
which of the nine measured characteristics actually separated matched applicants
from unmatched ones, and which questions this data cannot answer at all.

## Positioning

Two claims a neighbouring page could not truthfully copy:

- **The headline rate here is 49.0%, not the 41.5% the report leads with.** The
  NRMP figure is the unweighted mean of 24 specialty rates, counting Vascular
  Surgery's 28 applicants equally with Internal Medicine's 6,992. The
  applicant-weighted rate — the one that describes a real person's odds — is
  5,721 / 11,685.
- **The extraction was cross-validated, not merely parsed.** Every median in the
  nine detailed quartile tables was checked against the separately typeset
  per-specialty summary tables in the same report: 396 comparisons, zero
  mismatches.

The substantive finding the page is built around: of nine measured
characteristics, seven produce identical medians for matched and unmatched
applicants. Only rank-list length and Step 2 CK move.

## Operating Context

Read on phones and laptops, frequently while someone is in the middle of
deciding what to do about their own career. Reaches people as a shared link —
WhatsApp, Reddit, X, student groups — so the social preview card is part of the
product, not decoration.

Hosted as a static page at `match.saieesh.dev`, a subdomain of Saieesh's own
site, on GitHub Pages from `saieeshb/img-match-2026`.

## Capabilities and Constraints

**What exists.** Six sections (aggregate comparison, sortable specialty table
with per-specialty distributions, cross-specialty measure comparison,
competitiveness scatter, the full data table, caveats). 432 rows — 24
specialties × 9 measures × 2 cohorts, each with n / min / Q1 / median / Q3 / max
/ IQR / mean / SD. Three client-side exports: summary CSV, filtered tidy CSV,
full JSON.

**How it is built.** Sources live in `src/`; `python3 build.py` substitutes them
into a single self-contained `index.html`. Editing `index.html` by hand is
overwritten. `src/data.js` is generated from the PDF and is not hand-edited.
`three.min.js` (r149, MIT) is vendored locally as a separate same-origin file.

**Suppressed cohorts are carried through as suppressed**, never dropped or
zeroed: Dermatology, Orthopaedics, Otolaryngology, Plastics and Vascular Surgery
(matched cohort under 5), plus Public Health and Thoracic Surgery (both
cohorts).

**Update cadence — the source side is settled.** The 2026 report's Introduction
states: "Historically a biennial report, Charting Outcomes ... will now be
released annually." So NRMP published every two years up to now and moves to
annual from here. Saieesh's own "bi-annually" for updating the site is still
his call, but there is now a fixed upstream cadence to hang it on: one new
report per year. Safe to build archived years, a year switcher or dated URLs
against an annual source.

**No binding technical constraints have been declared.** Asked directly whether
zero-external-requests, a cheap-phone performance floor, traceable derivation,
or permanent data export should be treated as non-negotiable, Saieesh declined
all four. The current build does all four things; treat that as incumbent
behaviour that may be traded away deliberately, not as a commitment. In
particular the 608 KB `three.js` above the fold is not protected by a
performance budget, and equally is not under an order to go.

**Rights position.** NRMP asserts that reuse and redistribution of its
publications require permission, and its terms separately restrict use of its
data with machine learning or AI systems. Saieesh's decision, made 2026-07-29:
the underlying statistics are published facts, facts are not copyrightable
(*Feist v. Rural Telephone*), and this is an original presentation of them. The
footer must continue to carry full attribution, the suggested citation, and the
non-affiliation disclaimer. Contact if ever needed: datarequest@nrmp.org.

## Brand Commitments

- Lives at `match.saieesh.dev`, under Saieesh's personal domain.
- Voice is plain and factual, with no marketing register. All copy has been
  through a de-slop pass and passes banned-phrase, structure, silhouette and
  readability gates; regenerated copy is expected to clear them too.
- **It must not read as an AI-generated site.** Standing instruction, stated
  more than once. Specifically ruled out by name: the small uppercase coloured
  eyebrow label above a heading, uniform card grids, and a left-aligned hero
  with the visual to one side.
- Dark is the default theme; light is opt-in and remembered.

## Evidence on Hand

- Source PDF: `~/Downloads/Non-US-IMG_Charting-Outcomes_FINAL.pdf`, 255 pages,
  published July 2026.
- `src/data.js` — the complete extracted dataset, cross-validated as above.
- `og-image.png` (1200×630) and `make-og-image.py`, which regenerates it and
  requires Pillow plus macOS system fonts.
- `progress.md` — running decision log, newest entries first.

**Absences future work must not fill in.** The report contains no data on visa
status, year of graduation, U.S. clinical experience, letters of recommendation
or the MSPE, which are plausibly the strongest determinants for this population.
Only Step 2 CK is verified; everything else is self-reported at registration and
unaudited. There are no testimonials, no traffic or usage figures, no citations
of this page by anyone, and no relationship of any kind with the NRMP.

## Product Principles

1. **Serve both gears.** Someone hunting one specialty and someone reading
   start to finish are equally the audience; a change that speeds up one at the
   other's expense is a regression.
2. **Derived numbers announce themselves.** Match rates, the weighted 49.0%,
   and the correlations are computed here, not quoted, and say so where they
   appear.
3. **Absence is data.** Suppressed cohorts stay visibly suppressed. The
   variables the report never measured stay named.
4. **What the data cannot support gets equal billing** with what it can. The
   caveats are load-bearing, not a disclaimer to shrink.
5. **It has to look like a person made it.**
