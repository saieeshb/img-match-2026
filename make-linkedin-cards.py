"""Standalone table cards for sharing, rendered at 2x.

Four cards, each carrying one table from NRMP Charting Outcomes 2026 (Non-U.S.
IMGs) in the site's own visual language: near-black ground, serif display,
hairline rules, blue for matched and amber for did not match.

Every figure here is transcribed from the source PDF, not recomputed:
  Table 1 (p.3-4)  applicant and position counts, and the totals row
  Table 2 (p.7)    the eleven measures, matched against not matched
  Table 5 (p.17)   USMLE Step 2 CK quartiles by specialty

    python3 make-linkedin-cards.py

Writes cards/*.png at 2400px wide, which is 2x the 1200px LinkedIn renders at.
"""
import json
import pathlib
from PIL import Image, ImageDraw, ImageFont

S = 2                                  # render scale
OUT = pathlib.Path(__file__).parent / "cards"
OUT.mkdir(exist_ok=True)

BG      = (14, 15, 17)
PANEL   = (22, 24, 27)
INK     = (236, 233, 227)
INK2    = (174, 171, 164)
INK3    = (123, 121, 115)
RULE    = (38, 40, 44)
RULE2   = (55, 58, 63)
BLUE    = (92, 157, 255)
AMBER   = (240, 169, 46)
BLUE_D  = (22, 48, 79)
AMBER_D = (61, 44, 12)

SUPP = "/System/Library/Fonts/Supplemental/"
serif  = lambda s: ImageFont.truetype(SUPP + "Georgia Bold.ttf", int(s * S))
sans   = lambda s: ImageFont.truetype(SUPP + "Arial.ttf", int(s * S))
bold   = lambda s: ImageFont.truetype(SUPP + "Arial Bold.ttf", int(s * S))


def new(w, h):
    img = Image.new("RGB", (int(w * S), int(h * S)), BG)
    return img, ImageDraw.Draw(img)


def px(v):
    return int(v * S)


def text(d, xy, s, font, fill):
    d.text((px(xy[0]), px(xy[1])), s, font=font, fill=fill)


def rtext(d, xy, s, font, fill):
    """Right-aligned at x."""
    w = d.textlength(s, font=font)
    d.text((px(xy[0]) - w, px(xy[1])), s, font=font, fill=fill)


def ctext(d, xy, s, font, fill):
    w = d.textlength(s, font=font)
    d.text((px(xy[0]) - w / 2, px(xy[1])), s, font=font, fill=fill)


def rule(d, x0, y, x1, fill=RULE, w=1):
    d.line([(px(x0), px(y)), (px(x1), px(y))], fill=fill, width=max(1, int(w * S)))


def tracking(d, xy, s, font, fill, extra=1.8):
    """Letter-spaced small caps; PIL has no tracking of its own."""
    x, y = px(xy[0]), px(xy[1])
    for ch in s:
        d.text((x, y), ch, font=font, fill=fill)
        x += d.textlength(ch, font=font) + extra * S
    return x


def header(d, w, eyebrow, title_lines, sub=None, pad=64):
    tracking(d, (pad, 56), eyebrow, bold(15), AMBER, 2.2)
    y = 92
    for line in title_lines:
        text(d, (pad, y), line, serif(44), INK)
        y += 56
    if sub:
        y += 6
        for line in sub:
            text(d, (pad, y), line, sans(19), INK2)
            y += 28
    return y


def footer(d, w, h, note, pad=64):
    rule(d, pad, h - 78, w - pad, RULE)
    text(d, (pad, h - 62), note, sans(15), INK3)
    rtext(d, (w - pad, h - 62), "match.saieesh.dev", bold(16), INK2)


def legend(d, x, y, items):
    """items: [(label, colour)] laid out left to right."""
    cx = x
    for label, col in items:
        d.ellipse([px(cx), px(y + 4), px(cx + 11), px(y + 15)], fill=col)
        text(d, (cx + 19, y), label, sans(15), INK2)
        cx += 19 + d.textlength(label, font=sans(15)) / S + 26


# ══════════════════════════════════════════════════════════════════
# CARD 1 — the eleven measures
# ══════════════════════════════════════════════════════════════════
def card_measures():
    W, H = 1200, 1080
    img, d = new(W, H)
    PAD = 64

    header(d, W, "NRMP CHARTING OUTCOMES 2026 · NON-U.S. IMGs",
           ["Eleven measures.", "Two of them told anyone apart."],
           ["All 24 specialties pooled. Medians, except the last two rows,",
            "which are percentages."])

    y = 300
    legend(d, PAD, y, [("matched", BLUE), ("did not match", AMBER)])

    y = 344
    col_m, col_n = 700, 920
    text(d, (PAD, y), "MEASURE", bold(13), INK3)
    rtext(d, (col_m, y), "MATCHED", bold(13), BLUE)
    rtext(d, (col_n, y), "DID NOT MATCH", bold(13), AMBER)
    rtext(d, (W - PAD, y), "VERDICT", bold(13), INK3)
    y += 26
    rule(d, PAD, y, W - PAD, RULE2)

    rows = [
        ("Contiguous ranks",            "5.0",   "2.0",   "separates"),
        ("USMLE Step 2 CK",             "248",   "242",   "separates"),
        ("Research experiences",        "3.0",   "3.0",   "identical"),
        ("Abstracts",                   "2.0",   "2.0",   "identical"),
        ("Presentations",               "2.0",   "2.0",   "identical"),
        ("Publications",                "3.0",   "3.0",   "identical"),
        ("Work experiences",            "3.0",   "3.0",   "identical"),
        ("Volunteer experiences",       "3.0",   "3.0",   "identical"),
        ("Distinct specialties ranked", "1.0",   "1.0",   "identical"),
        ("Has a Ph.D.",                 "2.2%",  "2.0%",  "flat"),
        ("Has another graduate degree", "21.1%", "24.3%", "backwards"),
    ]
    RH = 48
    y += 10
    for name, m, n, verdict in rows:
        if verdict == "separates":
            d.rectangle([px(PAD - 18), px(y - 8), px(W - PAD + 18), px(y + RH - 14)],
                        fill=PANEL)
            d.rectangle([px(PAD - 18), px(y - 8), px(PAD - 14), px(y + RH - 14)],
                        fill=BLUE)
        name_font = bold(20) if verdict in ("separates", "backwards") else sans(20)
        name_col = INK if verdict in ("separates", "backwards") else INK2
        text(d, (PAD, y), name, name_font, name_col)

        vf = bold(21) if verdict == "separates" else sans(21)
        rtext(d, (col_m, y - 1), m, vf, BLUE if verdict == "separates" else INK2)
        rtext(d, (col_n, y - 1), n, vf, AMBER if verdict == "separates" else INK2)

        tag = {"separates": ("separates", BLUE),
               "identical": ("identical", INK3),
               "flat":      ("negligible", INK3),
               "backwards": ("runs backwards", AMBER)}[verdict]
        rtext(d, (W - PAD, y + 1), tag[0], bold(15), tag[1])

        y += RH
        rule(d, PAD, y - 12, W - PAD, RULE)

    y += 16
    text(d, (PAD, y),
         "Seven of the eleven land on the same number in both groups.",
         sans(19), INK)
    y += 30
    text(d, (PAD, y),
         "More unmatched applicants hold a second graduate degree than matched ones.",
         sans(19), INK2)

    footer(d, W, H,
           "Table 2, p.7. Consented applicants only: 4,429 matched, 4,541 not matched.")
    p = OUT / "01-eleven-measures.png"
    img.save(p, optimize=True)
    return p


# ══════════════════════════════════════════════════════════════════
# CARD 2 — Step 2 CK overlap, Internal Medicine
# ══════════════════════════════════════════════════════════════════
def card_step2():
    W, H = 1200, 790
    img, d = new(W, H)
    PAD = 64

    header(d, W, "USMLE STEP 2 CK · INTERNAL MEDICINE",
           ["Eight median points,", "and almost total overlap."],
           ["Pooled across all 24 specialties the medians are 248 and 242.",
            "This is Internal Medicine, which is 6,992 of the 11,685 applicants."])

    LO, HI = 200, 295
    X0, X1 = PAD + 20, W - PAD - 96
    span = X1 - X0
    pos = lambda v: X0 + (v - LO) / (HI - LO) * span

    y = 336
    for v in range(200, 300, 10):
        d.line([(px(pos(v)), px(y)), (px(pos(v)), px(y + 232))], fill=RULE, width=1)
        ctext(d, (pos(v), y + 244), str(v), sans(14), INK3)

    def box(yy, label, n, lo, q1, med, q3, hi, col, dark):
        text(d, (PAD, yy - 56), label, bold(19), col)
        rtext(d, (W - PAD, yy - 54), f"n = {n:,}", sans(16), INK3)
        # full range, min to max
        d.line([(px(pos(lo)), px(yy + 26)), (px(pos(hi)), px(yy + 26))],
               fill=RULE2, width=max(1, int(2 * S)))
        for v in (lo, hi):
            d.line([(px(pos(v)), px(yy + 14)), (px(pos(v)), px(yy + 38))],
                   fill=RULE2, width=max(1, int(2 * S)))
        # interquartile band
        d.rounded_rectangle([px(pos(q1)), px(yy + 8), px(pos(q3)), px(yy + 44)],
                            radius=px(5), fill=dark, outline=col, width=max(1, int(1.5 * S)))
        # median, labelled clear of the box
        d.line([(px(pos(med)), px(yy + 4)), (px(pos(med)), px(yy + 48))],
               fill=col, width=max(1, int(4 * S)))
        ctext(d, (pos(med), yy - 26), str(med), bold(21), col)

    box(y + 76, "Matched", 2649, 209, 240, 251, 259, 284, BLUE, BLUE_D)
    box(y + 192, "Did not match", 2730, 209, 233, 243, 253, 279, AMBER, AMBER_D)

    yy = 640
    text(d, (PAD, yy),
         "Both groups start at 209. The matched ceiling is 284, the unmatched 279.",
         sans(19), INK)
    text(d, (PAD, yy + 28),
         "A high score does not secure a match and a modest one does not disqualify.",
         sans(19), INK2)

    footer(d, W, H, "Table 5, p.17. Box spans Q1 to Q3, the bar is the median, whiskers are min and max.")
    p = OUT / "02-step2-overlap.png"
    img.save(p, optimize=True)
    return p


# ══════════════════════════════════════════════════════════════════
# CARD 3 — the two match rates
# ══════════════════════════════════════════════════════════════════
def card_rate():
    W, H = 1200, 760
    img, d = new(W, H)
    PAD = 64

    header(d, W, "MATCH RATE · TWO WAYS OF COUNTING",
           ["41.5% is the average of", "24 specialty rates."],
           ["It counts Vascular Surgery's 28 applicants the same as",
            "Internal Medicine's 6,992."])

    y = 330
    box_w = (W - PAD * 2 - 28) / 2

    def panel(x, big, label, detail, note, col):
        d.rounded_rectangle([px(x), px(y), px(x + box_w), px(y + 208)],
                            radius=px(12), fill=PANEL)
        d.rounded_rectangle([px(x), px(y), px(x + box_w), px(y + 4)],
                            radius=px(2), fill=col)
        text(d, (x + 30, y + 30), label, bold(15), INK3)
        text(d, (x + 30, y + 58), big, serif(62), col)
        text(d, (x + 30, y + 140), detail, sans(17), INK2)
        text(d, (x + 30, y + 166), note, sans(15), INK3)

    panel(PAD, "41.5%", "AS THE NRMP REPORTS IT",
          "Unweighted mean of 24 rates", "Reproduced here at 41.48%", AMBER)
    panel(PAD + box_w + 28, "49.0%", "PER APPLICANT",
          "5,721 matched of 11,685", "The odds an actual person faced", BLUE)

    yy = 592
    text(d, (PAD, yy),
         "Both numbers are correct. They answer different questions.",
         sans(19), INK)
    text(d, (PAD, yy + 28),
         "Only one of them describes a person's chance of matching.",
         sans(19), INK2)

    footer(d, W, H, "Table 1 totals, p.4, and Chart 3, p.5.")
    p = OUT / "03-match-rate.png"
    img.save(p, optimize=True)
    return p


# ══════════════════════════════════════════════════════════════════
# CARD 4 — all 24 specialties
# ══════════════════════════════════════════════════════════════════
def card_specialties(rows):
    W, H = 1200, 1590
    img, d = new(W, H)
    PAD = 64

    header(d, W, "NON-U.S. IMG MATCH RATE BY PREFERRED SPECIALTY",
           ["Twenty-four specialties,", "68.5% down to 14.3%."],
           ["Share of non-U.S. IMGs who ranked the specialty first",
            "and matched into it."])

    y = 320
    text(d, (PAD, y), "SPECIALTY", bold(13), INK3)
    rtext(d, (700, y), "MATCHED", bold(13), INK3)
    rtext(d, (790, y), "TOTAL", bold(13), INK3)
    rtext(d, (W - PAD, y), "RATE", bold(13), INK3)
    y += 24
    rule(d, PAD, y, W - PAD, RULE2)
    y += 14

    BAR_X, BAR_W = 830, 220
    RH = 44
    for name, m, nm, total, rate in rows:
        thin = total < 50
        col = BLUE if rate >= 50 else AMBER if rate >= 33 else INK3
        text(d, (PAD, y), name, sans(19), INK if not thin else INK2)
        rtext(d, (700, y), f"{m:,}", sans(18), INK2)
        rtext(d, (790, y), f"{total:,}", sans(18), INK3)

        d.rounded_rectangle([px(BAR_X), px(y + 6), px(BAR_X + BAR_W), px(y + 17)],
                            radius=px(5), fill=(30, 32, 36))
        fill_w = max(3, BAR_W * rate / 100)
        d.rounded_rectangle([px(BAR_X), px(y + 6), px(BAR_X + fill_w), px(y + 17)],
                            radius=px(5), fill=col)
        rtext(d, (W - PAD, y), f"{rate:.1f}%", bold(19), col)
        if thin:
            text(d, (PAD + d.textlength(name, font=sans(19)) / S + 10, y + 3),
                 "small n", sans(13), INK3)
        y += RH
        rule(d, PAD, y - 12, W - PAD, RULE)

    y += 14
    text(d, (PAD, y),
         "Internal Medicine takes 59.8% of all non-U.S. IMG first choices.",
         sans(19), INK)
    text(d, (PAD, y + 28),
         "Pediatrics has the best rate in the report and draws 6.8%.",
         sans(19), INK2)

    footer(d, W, H, "Table 1, p.3-4. Rate is IMGs matched divided by IMGs who ranked the specialty first.")
    p = OUT / "04-specialties.png"
    img.save(p, optimize=True)
    return p


if __name__ == "__main__":
    spec_path = pathlib.Path(__file__).parent / "src" / "data.js"
    src = spec_path.read_text()
    # pull the specialty rows straight from the built dataset
    import re, subprocess
    rows = json.loads(subprocess.run(
        ["node", "-e",
         "let s=require('fs').readFileSync('src/data.js','utf8')"
         ".replace(/^const DATA =/,'globalThis.DATA =');eval(s);"
         "console.log(JSON.stringify(DATA.specialties.map(x=>"
         "[x.short,x.imgMatched,x.imgNotMatched,x.imgTotal,x.matchRate])"
         ".sort((a,b)=>b[4]-a[4])))"],
        capture_output=True, text=True, cwd=str(pathlib.Path(__file__).parent),
        check=True).stdout)

    for p in (card_measures(), card_step2(), card_rate(), card_specialties(rows)):
        im = Image.open(p)
        print(f"{p.name:28} {im.size[0]}x{im.size[1]}")
