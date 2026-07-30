#!/usr/bin/env python3
"""Assemble src/ into the single-file index.html.

    python3 build.py

three.min.js stays a separate same-origin file: it is 608 KB and benefits from
being cached on its own rather than re-downloaded with every content edit.
"""
import pathlib, sys

ROOT = pathlib.Path(__file__).parent
SRC = ROOT / "src"

PAGES = [
    ("template.html", "index.html", {
        "/*__CSS__*/":  "style.css",
        "/*__HERO__*/": "hero.js",
        "/*__DATA__*/": "data.js",
        "/*__APP__*/":  "app.js",
    }),
    ("pdws.template.html", "program-view.html", {
        "/*__PDCSS__*/":  "pdws.css",
        "/*__PDDATA__*/": "pdws-data.js",
        "/*__PDAPP__*/":  "pdws.js",
    }),
]

for template, target, parts in PAGES:
    html = (SRC / template).read_text()
    for token, name in parts.items():
        if token not in html:
            sys.exit(f"placeholder {token} missing from {template}")
        html = html.replace(token, (SRC / name).read_text())
    out = ROOT / target
    out.write_text(html)
    print(f"wrote {out.relative_to(ROOT)}  ({len(html) / 1024:.1f} KB)")
