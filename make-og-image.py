"""Open Graph card: the hero, rendered as a still.

The card used to be a small-multiples chart in Georgia and Arial. Neither font
appears on the site: the CSS stack resolves to Iowan Old Style for display and
to SF Pro through -apple-system for everything else, so the card was set in
two typefaces no visitor ever sees. It now uses the fonts the page actually
renders with, and shows what the page actually opens with.

The particle field is the same construction as src/hero.js: one point per
consented applicant, 4,429 matched and 4,541 not, placed on a Fibonacci sphere
and interpolated toward two separated masses. Same golden angle, same radii,
same split distance, same perspective camera, so the still and the live hero
are the same picture.

Everything is drawn at SS times final size and downsampled, which is what gives
the dots and the type their edges.

    python3 make-og-image.py
"""
import math
import random
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
SS = 3                                   # supersample factor
CW, CH = W * SS, H * SS

BG       = (11, 12, 14)
INK      = (244, 242, 238)
INK_SUB  = (195, 192, 185)
INK_KEY  = (150, 147, 140)
INK_META = (166, 163, 155)
BLUE     = (92, 157, 255)
AMBER    = (240, 169, 46)

IOWAN = "/System/Library/Fonts/Supplemental/Iowan Old Style.ttc"
SFNS  = "/System/Library/Fonts/SFNS.ttf"


def serif(size):
    """Iowan Old Style Bold — first face in the site's --serif stack."""
    return ImageFont.truetype(IOWAN, int(size * SS), index=1)


def sans(size, weight="Regular"):
    """SF Pro, which is what -apple-system resolves to on the site."""
    f = ImageFont.truetype(SFNS, int(size * SS))
    try:
        f.set_variation_by_name(weight)
    except Exception:
        pass
    return f


# ───────────────────────── the particle field ─────────────────────────
N_MATCHED, N_UNMATCHED = 4429, 4541
N = N_MATCHED + N_UNMATCHED
SPLIT, R_ONE, R_TWO = 6.4, 7.8, 4.9
GOLDEN = 2.399963229728653
MIX = 0.58            # 0 = one mixed cloud, 1 = two separated masses
ROT_Y = 0.28          # a little turn, so it does not read as a flat disc


def fib(i, n, radius):
    y = 1 - (i / (n - 1)) * 2
    r = math.sqrt(max(0.0, 1 - y * y))
    th = i * GOLDEN
    return [math.cos(th) * r * radius, y * radius, math.sin(th) * r * radius]


def build_points():
    rnd = random.Random(20260809)
    flags = [1] * N_MATCHED + [0] * (N - N_MATCHED)
    rnd.shuffle(flags)

    pts = []
    mi = ui = 0
    for i in range(N):
        a = fib(i, N, R_ONE)
        if flags[i]:
            b = fib(mi, N_MATCHED, R_TWO); b[0] -= SPLIT; mi += 1
        else:
            b = fib(ui, N_UNMATCHED, R_TWO); b[0] += SPLIT; ui += 1
        p = [a[k] + (b[k] - a[k]) * MIX for k in range(3)]
        pts.append((p, flags[i], 0.7 + rnd.random() * 1.25))
    return pts


def draw_field(img):
    d = ImageDraw.Draw(img, "RGBA")      # RGBA mode makes ellipse() alpha-blend
    cam_z, fov = 17.5, 52.0
    f = 1.0 / math.tan(math.radians(fov) / 2)
    aspect = W / H
    cy, sy = math.cos(ROT_Y), math.sin(ROT_Y)

    projected = []
    for (p, matched, size) in build_points():
        x, y, z = p
        x, z = x * cy + z * sy, -x * sy + z * cy      # rotate about Y
        mvz = z - cam_z
        depth = -mvz
        if depth <= 0.2:
            continue
        sx = ((f / aspect) * x / depth * 0.5 + 0.5) * CW
        sy_ = (1 - (f * y / depth * 0.5 + 0.5)) * CH
        r = size * (118.0 / depth) * 0.5 * SS * 0.62
        t = min(max((depth - 6.0) / 22.0, 0.0), 1.0)
        alpha = int(255 * (0.58 + (0.13 - 0.58) * t))
        projected.append((depth, sx, sy_, r, matched, alpha))

    projected.sort(key=lambda q: -q[0])               # far to near
    for _, sx, sy_, r, matched, alpha in projected:
        col = BLUE if matched else AMBER
        d.ellipse([sx - r, sy_ - r, sx + r, sy_ + r], fill=col + (alpha,))


# ───────────────────────── the scrim ─────────────────────────
def scrim():
    """The hero's veil: a radial mask over the centre plus a top/bottom fade.

    Computed small and scaled up; both gradients are smooth so nothing is lost
    and it avoids evaluating six million pixels in Python.
    """
    sw, sh = 240, 126
    layer = Image.new("L", (sw, sh), 0)
    px = layer.load()
    for j in range(sh):
        v = j / (sh - 1)
        # vertical: .75 at the top, clear through the middle, .90 at the foot
        if v < 0.22:
            lin = 0.75 * (1 - v / 0.22)
        elif v > 0.60:
            lin = 0.94 * ((v - 0.60) / 0.40)
        else:
            lin = 0.0
        for i in range(sw):
            u = i / (sw - 1)
            dx = (u - 0.50) / 0.58
            dy = (v - 0.44) / 0.46
            rr = math.sqrt(dx * dx + dy * dy)
            if rr >= 1.0:
                rad = 0.0
            elif rr <= 0.38:
                rad = 0.93 - (0.93 - 0.78) * (rr / 0.38)
            elif rr <= 0.66:
                rad = 0.78 - (0.78 - 0.28) * ((rr - 0.38) / 0.28)
            else:
                rad = 0.28 * (1 - (rr - 0.66) / 0.34)
            px[i, j] = int(255 * min(1.0, max(lin, rad)))
    return layer.resize((CW, CH), Image.LANCZOS)


# ───────────────────────── compose ─────────────────────────
img = Image.new("RGB", (CW, CH), BG)
draw_field(img)
img = Image.composite(Image.new("RGB", (CW, CH), BG), img, scrim())
d = ImageDraw.Draw(img)


def centered(y, s, font, fill):
    w = d.textlength(s, font=font)
    d.text(((CW - w) / 2, y * SS), s, font=font, fill=fill)


HEAD = serif(62)
centered(126, "Two numbers", HEAD, INK)
centered(196, "out of eleven", HEAD, INK)

SUB = sans(19.5)
centered(300, "The 2026 Match recorded eleven measures for every non-U.S. IMG.", SUB, INK_SUB)
centered(328, "Two of them told the applicants who matched apart. Seven came out identical.", SUB, INK_SUB)

# cohort key, laid out as one centred row
KEY = sans(15)
items = [("4,429 matched", BLUE), ("4,541 did not match", AMBER)]
gap, dot, pad = 30, 9, 8
total = sum(dot + pad + d.textlength(t, font=KEY) / SS for t, _ in items) + gap
x = (W - total) / 2
for label, col in items:
    cy = 392 + 5
    d.ellipse([x * SS, cy * SS, (x + dot) * SS, (cy + dot) * SS], fill=col)
    d.text(((x + dot + pad) * SS, 390 * SS), label, font=KEY, fill=INK_KEY)
    x += dot + pad + d.textlength(label, font=KEY) / SS + gap

META = sans(15)
centered(480, "National Resident Matching Program, Charting Outcomes: Non-U.S. IMGs, July 2026",
         META, INK_META)

URL = sans(19, "Semibold")
centered(528, "match.saieesh.dev", URL, INK)

img = img.resize((W, H), Image.LANCZOS)
img.save("og-image.png", optimize=True)
print("og-image.png", img.size)
