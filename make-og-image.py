"""Open Graph card: the finding itself, drawn as small multiples.

Two measures moved and seven did not. Each mover gets its own dot plot on its own
labelled scale — no shared axis, no truncated bars, so the visual claim stays the
honest one: these two separated, those seven landed on the same number.
"""
from PIL import Image, ImageDraw, ImageFont

W, H   = 1200, 630
BG     = (17, 18, 20)
PANEL  = (25, 27, 31)
INK    = (236, 238, 242)
INK2   = (176, 181, 192)
INK3   = (126, 133, 147)
ACCENT = (63, 191, 174)
BLUE   = (92, 157, 255)
AMBER  = (240, 169, 46)
RULE   = (44, 47, 54)

SUPP = "/System/Library/Fonts/Supplemental/"
serif = lambda s: ImageFont.truetype(SUPP + "Georgia Bold.ttf", s)
sans  = lambda s: ImageFont.truetype(SUPP + "Arial.ttf", s)
bold  = lambda s: ImageFont.truetype(SUPP + "Arial Bold.ttf", s)

img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img)


def tracking(xy, text, font, fill, extra=1.6):
    """Letter-spaced small caps; PIL has no tracking of its own."""
    x, y = xy
    for ch in text:
        d.text((x, y), ch, font=font, fill=fill)
        x += d.textlength(ch, font=font) + extra
    return x


# ─────────────────────────── left column ───────────────────────────
PAD = 64
tracking((PAD, 68), "NRMP CHARTING OUTCOMES 2026", bold(16), ACCENT, 2.0)

for i, line in enumerate(["What separated", "the IMGs who", "matched"]):
    d.text((PAD, 112 + i * 62), line, font=serif(50), fill=INK)

d.line([(PAD, 322), (PAD + 116, 322)], fill=ACCENT, width=3)

for i, line in enumerate([
    "Median values for 8,943 non-U.S.",
    "IMG applicants in the 2026 Match,",
    "matched against those who did not.",
]):
    d.text((PAD, 352 + i * 30), line, font=sans(19), fill=INK2)

for i, line in enumerate([
    "Each measure sits on its own scale.",
    "All 24 specialties pooled.",
]):
    d.text((PAD, 462 + i * 26), line, font=sans(16), fill=INK3)

d.text((PAD, 536), "match.saieesh.dev", font=bold(21), fill=ACCENT)

# ─────────────────────────── right panel ───────────────────────────
PX0, PY0, PX1, PY1 = 540, 56, 1136, 574
d.rounded_rectangle([PX0, PY0, PX1, PY1], radius=18, fill=PANEL)

IN = PX0 + 34
TRACK_W = 402
DOT = 9


def dotplot(y, label, lo, hi, not_matched, matched, fmt="{:g}"):
    """One measure on its own scale: amber = did not match, blue = matched."""
    d.text((IN, y), label, font=bold(17), fill=INK)

    ty = y + 42
    x0, x1 = IN, IN + TRACK_W
    d.line([(x0, ty), (x1, ty)], fill=RULE, width=2)

    pos = lambda v: x0 + (v - lo) / (hi - lo) * TRACK_W
    a, b = pos(not_matched), pos(matched)

    # the gap itself, drawn brighter than the track
    d.line([(a, ty), (b, ty)], fill=(70, 76, 88), width=4)

    for cx, col in ((a, AMBER), (b, BLUE)):
        d.ellipse([cx - DOT, ty - DOT, cx + DOT, ty + DOT], fill=col)

    # value labels, nudged apart so they never collide
    for cx, col, val, above in ((a, AMBER, not_matched, False), (b, BLUE, matched, True)):
        s = fmt.format(val)
        f = bold(19)
        w = d.textlength(s, font=f)
        d.text((cx - w / 2, ty - 36 if above else ty + 14), s, font=f, fill=col)

    # scale ends
    d.text((x0, ty + 44), fmt.format(lo), font=sans(13), fill=INK3)
    e = fmt.format(hi)
    d.text((x1 - d.textlength(e, font=sans(13)), ty + 44), e, font=sans(13), fill=INK3)


tracking((IN, PY0 + 32), "WHAT MOVED", bold(15), ACCENT, 2.2)

# colour key, right-aligned on the panel header row
lx = PX1 - 34
for label, col in (("did not match", AMBER), ("matched", BLUE)):
    lf = sans(14)
    lw = d.textlength(label, font=lf)
    d.text((lx - lw, PY0 + 32), label, font=lf, fill=INK3)
    d.ellipse([lx - lw - 20, PY0 + 35, lx - lw - 9, PY0 + 46], fill=col)
    lx -= lw + 34

dotplot(PY0 + 60,  "Programs ranked in-specialty", 0, 6, 2, 5)
dotplot(PY0 + 182, "USMLE Step 2 CK", 235, 255, 242, 248)

d.line([(IN, PY0 + 300), (PX1 - 34, PY0 + 300)], fill=RULE, width=1)
tracking((IN, PY0 + 322), "WHAT DIDN'T", bold(15), INK3, 2.2)

flat = [
    ("Research", 3), ("Publications", 3),
    ("Abstracts", 2), ("Work", 3),
    ("Presentations", 2), ("Volunteering", 3),
    ("Specialties ranked", 1),
]
col_w = 264
for i, (name, v) in enumerate(flat):
    cx = IN + (i % 2) * col_w
    cy = PY0 + 356 + (i // 2) * 30
    # both cohorts landed on the same number: amber ring, blue centre
    d.ellipse([cx, cy + 3, cx + 13, cy + 16], fill=AMBER)
    d.ellipse([cx + 3.5, cy + 6.5, cx + 9.5, cy + 12.5], fill=BLUE)
    d.text((cx + 22, cy), name, font=sans(15), fill=INK2)
    val = f"{v} = {v}"
    vf = bold(15)
    d.text((cx + col_w - 42 - d.textlength(val, font=vf), cy), val, font=vf, fill=INK3)

img.save("og-image.png", optimize=True)
print("og-image.png", img.size)
