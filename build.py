#!/usr/bin/env python3
"""Monta index.html a partir de src/. Uso: python3 build.py"""
import re, pathlib, sys

R = pathlib.Path(__file__).parent
S = R / "src"

def merge_dup_style(html):
    """Junta dois atributos style na mesma tag (o segundo seria ignorado pelo parser)."""
    pat = re.compile(r'(<[a-zA-Z][^>]*?)style="([^"]*)"([^>]*?)style="([^"]*)"')
    while True:
        m = pat.search(html)
        if not m:
            return html
        html = html[:m.start()] + m.group(1) + m.group(3).rstrip() + \
               ' style="' + m.group(2).rstrip('; ') + ';' + m.group(4) + '"' + html[m.end():]

CHROME = """
<svg style="display:none" aria-hidden="true"><defs>
<symbol id="ar" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
<symbol id="lt" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></symbol>
<symbol id="gt" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></symbol>
</defs></svg>
<div id="cur"></div><div id="dot"></div>
<main id="deck"><div id="stage">
<div id="prog" style="width:9%"></div>
<header id="top">
  <div class="brand">
    <span class="ftw"><i>FTW</i><s></s></span><span class="x">&times;</span>
    <img class="l75" src="__LOGO75__" alt="75LAB">
  </div>
  <div class="sp"></div>
  <span class="part" id="partlbl"></span>
  <button class="chip" id="bMenu">Índice</button>
</header>
__SLIDES__
<svg id="grain" aria-hidden="true"><filter id="gf"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3"/></filter><rect width="100%" height="100%" filter="url(#gf)"/></svg>
<footer id="bot">
  <span class="part">Proposta de projetos · 25.set.2026</span>
  <div class="sp"></div>
  <button class="chip" id="bPrint">Baixar PDF</button>
  <button class="nb" id="prev" aria-label="Anterior"><svg><use href="#lt"/></svg></button>
  <span id="count"></span>
  <button class="nb" id="next" aria-label="Próximo"><svg><use href="#gt"/></svg></button>
</footer>
<div class="hint" id="hint">Setas ou espaço para navegar · M abre o índice</div>
</div></main>
<div id="menu">
  <div style="display:flex;align-items:center;gap:16px">
    <span class="eyebrow" style="color:rgba(242,241,233,.6)"><i>(**)</i> Índice da apresentação</span>
    <div class="sp"></div><button class="chip" id="bClose" style="border-color:rgba(242,241,233,.3)">Fechar</button>
  </div>
  <ol id="mlist"></ol>
</div>
"""

def main():
    head = (S / "head.html").read_text()
    comp = (S / "comp.css").read_text()
    assert head.count("<style>") == 1 and head.count("</style>") == 1, "src/head.html: tag <style> desbalanceada"
    head = head.replace("</style>", comp + "\n</style>")
    assert ".ficha{" in head, "comp.css nao entrou no <style>"

    slides = "".join((S / "slides" / f"{n:02d}.html").read_text() + "\n" for n in range(1, 13))
    html = head + CHROME.replace("__SLIDES__", slides) + \
           "\n<script>\n" + (S / "app.js").read_text() + "\n</script>\n"

    for token, fname in [("__LOGO75__", "logo75.txt"), ("__TOTEM__", "totem.txt"), ("__LOJA__", "loja.txt"), ("__QR__", "qr-vitrine.txt")]:
        html = html.replace(token, (S / "assets" / fname).read_text().strip())

    html = merge_dup_style(html)

    leftover = re.findall(r"__[A-Z0-9_]+__", html)
    assert not leftover, f"tokens nao substituidos: {leftover}"
    dash = html.count("—") + html.count("–")
    assert dash == 0, f"{dash} travessao(oes) no HTML final"
    n = len(re.findall(r'<section class="slide\b', html))
    assert n == 12, f"esperava 12 telas, achei {n}"

    (R / "index.html").write_text(html)
    print(f"index.html: {len(html)//1024} KB · {n} telas · 0 travessoes")

if __name__ == "__main__":
    main()
