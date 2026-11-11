"""
Play-through test for the game. Run from the repo root:

    pip install playwright && python -m playwright install chromium
    python tests/playthrough.py

What it checks:
  1. Deck file: every card has a valid type, trivia has answers, rules have end text,
     and no unknown {tokens}.
  2. Plays a full Pregame and an Intermission round at phone size with 2 players
     (and a 3-player round), failing on any JS error or a card with an unfilled {token}.
  3. Offline: the service worker installs, then the app reloads and starts with the network cut.
"""
import asyncio, os, re, shutil, socket, subprocess, sys, time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TOKENS = {"{p}", "{p2}", "{s1}", "{s2}", "{s3}", "{finish}"}
TYPES = {"dare", "trivia", "group", "versus", "vote", "rule", "live"}
failures = []

def fail(msg):
    failures.append(msg)
    print("  FAIL:", msg)

def check_deck():
    print("Deck check")
    src = open(os.path.join(ROOT, "deck.js"), encoding="utf-8").read()
    node = shutil.which("node")
    if not node:
        print("  (node not found — skipping deck structure check)")
        return
    js = src + "\nconsole.log(JSON.stringify(DECK));"
    out = subprocess.run([node, "-e", js], capture_output=True, text=True)
    if out.returncode:
        return fail("deck.js has a syntax error:\n" + out.stderr)
    import json
    deck = json.loads(out.stdout)
    for i, c in enumerate(deck):
        where = f"card #{i + 1} ({c.get('text', '')[:40]}...)"
        if c.get("type") not in TYPES: fail(f"{where}: unknown type {c.get('type')!r}")
        if not c.get("text"): fail(f"{where}: missing text")
        if c.get("type") == "trivia" and not c.get("a"): fail(f"{where}: trivia card has no answer (a)")
        if c.get("type") == "rule" and not c.get("end"): fail(f"{where}: rule card has no end text")
        for t in re.findall(r"\{[^}]*\}", c.get("text", "") + c.get("end", "")):
            if t not in TOKENS: fail(f"{where}: unknown token {t}")
    counts = {}
    for c in deck: counts[c["type"]] = counts.get(c["type"], 0) + 1
    print(f"  {len(deck)} cards: {counts}")

def free_port():
    s = socket.socket(); s.bind(("", 0)); p = s.getsockname()[1]; s.close(); return p

def find_chrome():
    for p in ["/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser"]:
        if os.path.exists(p): return p
    return None  # let Playwright use its own download

async def play(page, mode, label):
    await page.click(f"#modeSeg button[data-v={mode}]")
    await page.click("#startBtn")
    cards = 0
    for _ in range(150):
        cls = await page.get_attribute("#game", "class")
        if "t-over" in cls: break
        txt = await page.inner_text("#text")
        if re.search(r"\{[^}]*\}", txt): fail(f"{label}: unfilled token on card: {txt}")
        if not txt.strip(): fail(f"{label}: blank card ({cls})")
        cards += 1
        await page.mouse.click(195, 420)
    else:
        fail(f"{label}: game never reached the end")
    print(f"  {label}: {cards} taps, reached the end")
    await page.click("[data-act=home]")

async def browser_tests():
    from playwright.async_api import async_playwright
    port = free_port()
    srv = subprocess.Popen([sys.executable, "-m", "http.server", str(port), "-d", ROOT],
                           stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(1)
    try:
        async with async_playwright() as p:
            chrome = find_chrome()
            browser = await p.chromium.launch(executable_path=chrome, args=["--no-sandbox"]) if chrome else await p.chromium.launch()
            ctx = await browser.new_context(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True)
            page = await ctx.new_page()
            page.on("pageerror", lambda e: fail(f"JS error: {e}"))
            page.on("console", lambda m: m.type == "error" and fail(f"console error: {m.text}"))

            print("Play-through (phone size)")
            await page.goto(f"http://localhost:{port}/")
            for name in ["Brett", "Becca"]:
                await page.fill("#nameInput", name); await page.click("#addForm button")
            await play(page, "pregame", "Pregame, 2 players")
            await play(page, "intermission", "Intermission #1, 2 players")
            await play(page, "intermission", "Intermission #2, 2 players")
            await page.fill("#nameInput", "Guest"); await page.click("#addForm button")
            await play(page, "pregame", "Pregame, 3 players")

            print("Offline check")
            await page.wait_for_timeout(1500)
            if not await page.evaluate("!!navigator.serviceWorker.controller"):
                fail("service worker is not controlling the page")
            srv.terminate(); srv.wait()
            await ctx.set_offline(True)
            await page.reload()
            await page.click("#startBtn")
            cls = await page.get_attribute("#game", "class")
            if "on" not in cls: fail("game didn't start offline")
            else: print("  app reloaded and started with no network")
            await browser.close()
    finally:
        if srv.poll() is None: srv.terminate()

if __name__ == "__main__":
    check_deck()
    asyncio.run(browser_tests())
    print()
    if failures:
        print(f"{len(failures)} problem(s) found."); sys.exit(1)
    print("All checks passed.")
