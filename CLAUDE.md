# Project notes

Penguins-themed Picolo-style drinking game. Static site, no build step, hosted on GitHub Pages from `main` (root) at https://bpc91.github.io/hockey-game/.

- Owner is a beginner-to-intermediate coder: explain changes briefly in plain language.
- `deck.js` holds all card content. Tokens: `{p}`, `{p2}`, `{s1}`–`{s3}`, `{finish}`, `{rival}`. Card types: luck ("Puck luck": setup + random `outcomes`, mostly bad), dare (shown as "In the crease": low-key questions; no dances, impressions or texting — the Mike Lange goal call is the one kept exception; say-a-phrase rules like "eh" and "Let's go Pens" are fine), trivia, group, versus, vote (always `min: 3`), rule, live. `now: true` marks season-specific cards.
- Player-specific or season-specific facts: look them up before writing cards (rosters change).
- History trivia must be accurate. Verify anything you're not certain of.
- The display name "Puckolo" is a placeholder. It appears in `index.html` (title, logo, apple-mobile-web-app-title), `manifest.webmanifest`, and the icon text (icons are generated PNGs).
- Do not rename the repo (that changes the Pages URL and breaks installed home screen apps).
- Offline: `sw.js` is cache-first with background refresh. If you add a new file the app needs, add it to `FILES` in `sw.js` and bump `CACHE`.
- No official Penguins/NHL logos.
- Run `python tests/playthrough.py` before every push. It must pass.
