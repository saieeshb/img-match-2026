# Non-U.S. IMG Match Outcomes 2026 — interactive explorer

A single self-contained HTML page presenting NRMP *Charting Outcomes: Non-U.S. IMGs*
(Main Residency Match, 2026 Appointment Year) as an explorable, exportable dataset.

## Files

| File | Purpose |
|---|---|
| `index.html` | The entire site. Data, CSS, JS and favicon are inlined. |
| `og-image.png` | 1200×630 social preview card. Must sit next to `index.html`. |

## Before the first deploy

`index.html` contains four copies of the placeholder
`https://REPLACE-WITH-YOUR-DOMAIN`, in the `og:url`, `og:image`, `twitter:image`
tags. Replace all four with the real origin:

```bash
sed -i '' 's|https://REPLACE-WITH-YOUR-DOMAIN|https://match.example.com|g' index.html
```

Facebook, X, LinkedIn and Slack all require `og:image` to be an absolute URL. A
relative path silently produces no preview card, which is why the placeholder is
deliberately obvious rather than a working-but-wrong relative path.

## Deploying

No build step, no dependencies, no external requests, so it works from any static
host and from `file://`.

**GitHub Pages** — commit the folder, enable Pages on the branch, and add a
`CNAME` file containing just the hostname (`match.example.com`). Point a DNS
CNAME record at `<username>.github.io`. Add an empty `.nojekyll` file so Pages
serves the directory as-is.

**Netlify / Vercel / Cloudflare Pages** — drag the folder in, or point the project
at this directory with no build command and this directory as the publish dir.

**Any web server / S3 / nginx** — copy both files to the document root.

To change the page title or the text in link previews, edit the `<title>`,
`<meta name="description">` and `og:`/`twitter:` tags at the top of `index.html`.

## What's in it

| Section | Contents |
|---|---|
| The two levers | Aggregate matched vs unmatched across all 11 measures |
| Specialty explorer | Sortable, searchable table of all 24 specialties; click a row for full distributions |
| Compare | Any measure charted across every specialty, matched vs unmatched |
| Competition | Match rate against overall applicant pressure, sized by IMG volume |
| Full data | All 432 rows — 24 specialties × 9 measures × 2 cohorts, with n/min/Q1/median/Q3/max/IQR/mean/SD |
| Caveats | What the data cannot support |

## Exports

Three buttons, all generated client-side:

- **Summary CSV** — one row per specialty: positions, applicant counts, match rate, key medians, degree percentages
- **Filtered CSV** — long/tidy format, one row per specialty × measure × cohort, respecting the current filters
- **Full JSON** — the complete structured dataset backing the page

## Data provenance

Extracted from the published PDF, then cross-validated: every median in the
nine detailed quartile tables was checked against the corresponding value in the
22 per-specialty summary tables, which are typeset separately in the report.
396 medians compared, zero mismatches.

Figures **derived** here rather than taken from the report:

- Per-specialty match rates (IMGs matched ÷ IMGs who ranked the specialty first)
- The applicant-weighted overall rate of **49.0%**. The report's headline 41.5%
  is the unweighted mean of the 24 specialty rates, which counts Vascular Surgery
  (28 applicants) equally with Internal Medicine (6,992).
- Correlations between applicant pressure and IMG match rate

## Attribution and reuse

Underlying data © 2026 National Resident Matching Program. The NRMP requires
permission for reuse and redistribution of its publications, and its terms also
restrict use of the data with machine learning or AI systems — contact
<datarequest@nrmp.org> before publishing this anywhere public.

This page is independent and is not affiliated with, endorsed by, or reviewed by
the NRMP.
