# Pens drinking game

A Picolo-style party game for pregame and intermissions. It works offline once it's been opened once.
The display name, currently **Puckolo**, is a placeholder.

**Play it:** https://bpc91.github.io/hockey-game/

## Files
- `index.html`: the app
- `deck.js`: **all the cards. This is the file to edit.** Instructions are at the top.
- `sw.js`: the service worker, which saves the app on your phone so it works with no signal
- `manifest.webmanifest` + `icons/`: the home screen name and icon
- `tests/playthrough.py`: an automated play-through test (see below)

## Add it to your phone
- **iPhone:** open the link in **Safari** → Share → **Add to Home Screen**.
- **Android:** open it in Chrome → ⋮ → **Add to Home screen** (or **Install app**).

Open it once while you have signal. After that it runs with none.

## Updating
Push to `main` and GitHub Pages redeploys in about a minute. Phones pick up the new version in the background the next time the app is opened with signal, so it can take two opens to show up.

Cards marked `now: true` reference the current season. Refresh them each fall.

## Testing
```
pip install playwright && python -m playwright install chromium
python tests/playthrough.py
```
The test checks the deck for mistakes (missing answers, typo'd `{tokens}`), plays full Pregame and Intermission rounds at phone size, and confirms the app works offline.

## How the game works
- **Pregame:** 40 cards. Rules (red cards) last a few cards, then a "Rule over" card ends them.
- **Puck luck** (gold cards): a game situation, then tap to see what happened to you. Usually bad, sometimes good.
- **Vote** cards only show up with 3+ players.
- **Intermission:** 15 cards, including 3 **live rules** tied to the game that last until the next intermission. You can see them on the setup screen at any time.
- **↷** skips a card. **✕** (tap twice) quits.
- The game remembers which cards you've seen and deals fresh ones first.
