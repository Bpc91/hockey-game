// PUCKOLO deck — edit freely.
//
// Tokens the app fills in:
//   {p}   a player (the app rotates fairly so nobody gets picked on)
//   {p2}  a different player
//   {s1} {s2} {s3}  sip amounts — scaled by the Easy / Normal / Heavy setting
//   {finish}        "finish your drink" (Easy mode softens it to 3 sips)
//
// Card types:
//   dare    — one person does something or drinks
//   trivia  — question; tap once to reveal the answer (put it in `a`)
//   group   — everyone plays
//   versus  — two players go head to head
//   vote    — everyone points at someone
//   rule    — a temporary rule; `end` is shown after `len` [min, max] cards
//   live    — game-event rule (Intermission mode only); lasts until the next intermission
//
// Optional: min: 3  → only used when at least 3 players are in the game.
// Cards tagged `now: true` reference the current season — refresh them each fall.

const DECK = [
  // ───────────────────────── TRIVIA: HISTORY ─────────────────────────
  { type: "trivia", text: "{p}, name all five Penguins Stanley Cup years. Drink {s1} for every one you miss.", a: "1991, 1992, 2009, 2016, 2017" },
  { type: "trivia", text: "{p}, name the team the Pens beat in each Cup Final. Drink {s1} per miss.", a: "1991 North Stars · 1992 Blackhawks · 2009 Red Wings · 2016 Sharks · 2017 Predators" },
  { type: "trivia", text: "{p}, who scored both Penguins goals in Game 7 of the 2009 Final? Wrong = {s2}.", a: "Max Talbot" },
  { type: "trivia", text: "{p}, who scored the Cup-winning goal in Game 6 against San Jose in 2016? Wrong = {s2}.", a: "Kris Letang" },
  { type: "trivia", text: "{p}, who scored the Cup winner in Nashville in 2017 — banked off Pekka Rinne? Wrong = {s2}.", a: "Patric Hornqvist" },
  { type: "trivia", text: "{p}, name all three players on the 2016 HBK line. Drink {s1} per miss.", a: "Carl Hagelin, Nick Bonino, Phil Kessel" },
  { type: "trivia", text: "{p}, which HBK line member is now behind the Pens bench as an assistant coach? Wrong = {s2}.", a: "Nick Bonino" },
  { type: "trivia", text: "{p}, whose shot did Fleury stone in the final seconds of in Game 7 of the 2009 Final? Wrong = {s2}.", a: "Nicklas Lidstrom" },
  { type: "trivia", text: "{p}, who won the Conn Smythe in 2009? Wrong = {s2}.", a: "Evgeni Malkin" },
  { type: "trivia", text: "{p}, who won the Conn Smythe in 2016 AND 2017? Wrong = {finish}.", a: "Sidney Crosby — back-to-back" },
  { type: "trivia", text: "{p}, why does Mario wear 66? Wrong = {s2}.", a: "It's Gretzky's 99 flipped upside down" },
  { type: "trivia", text: "{p}, Jagr wore 68 to honor an event from that year. What was it? Wrong = {s2}.", a: "The 1968 Prague Spring / Soviet invasion of Czechoslovakia" },
  { type: "trivia", text: "{p}, why does Sid wear 87? Wrong = {s1}.", a: "Born 8/7/87 — August 7, 1987" },
  { type: "trivia", text: "{p}, what were the five ways Mario scored five goals on New Year's Eve 1988? Drink {s1} per miss.", a: "Even strength, power play, shorthanded, penalty shot, empty net" },
  { type: "trivia", text: "{p}, what did everyone call Mellon Arena? Wrong = {finish}. (Come on.)", a: "The Igloo" },
  { type: "trivia", text: "{p}, what was PPG Paints Arena called when it opened? Wrong = {s2}.", a: "Consol Energy Center" },
  { type: "trivia", text: "{p}, what year did the Penguins play their first NHL season? Within 2 years is safe. Otherwise {s2}.", a: "1967–68 (1967 expansion)" },
  { type: "trivia", text: "{p}, which coach led the 1991 Cup team and always said 'It's a great day for hockey'? Wrong = {s2}.", a: "'Badger' Bob Johnson" },
  { type: "trivia", text: "{p}, which Hall of Fame coach was behind the bench for the 1992 Cup? Wrong = {s2}.", a: "Scotty Bowman" },
  { type: "trivia", text: "{p}, finish the Mike Lange call: 'Elvis has just...' Wrong = {s2}.", a: "'...left the building!'" },
  { type: "trivia", text: "{p}, name any two other Mike Lange catchphrases. Drink {s1} per miss.", a: "e.g. 'Scratch my back with a hacksaw', 'Buy Sam a drink and get his dog a bone', 'He beat him like a rented mule', 'Michael, Michael, Motorcycle'" },
  { type: "trivia", text: "{p}, what year did Mario come out of retirement? Wrong = {s2}.", a: "2000 (December 27, 2000)" },
  { type: "trivia", text: "{p}, what year did Mario become the team's owner? Within 1 year is safe. Otherwise {s2}.", a: "1999" },
  { type: "trivia", text: "{p}, the Pens hold the NHL record for longest win streak. How many games? Wrong = {s2}.", a: "17 straight (1992–93)" },
  { type: "trivia", text: "{p}, which goalie won back-to-back Cups while still technically a rookie? Wrong = {s2}.", a: "Matt Murray (2016 & 2017)" },
  { type: "trivia", text: "{p}, who scored the 'Golden Goal' at the 2010 Olympics, and against which goalie? Drink {s1} per miss.", a: "Sidney Crosby, past Ryan Miller (USA)" },
  { type: "trivia", text: "{p}, which 1992 Cup-winning Penguin is now the Flyers' head coach? Wrong = {s2}.", a: "Rick Tocchet" },
  { type: "trivia", text: "{p}, name the Pens' mascot. Wrong = {finish}.", a: "Iceburgh" },
  { type: "trivia", text: "{p}, who is the Penguins' all-time leader in coaching wins? Wrong = {s2}.", a: "Mike Sullivan" },
  { type: "trivia", text: "{p}, what number does Kris Letang wear? Wrong = {s1}.", a: "58" },
  { type: "trivia", text: "{p}, what number did Marc-André Fleury wear in Pittsburgh? Wrong = {s1}.", a: "29" },
  { type: "trivia", text: "{p}, the Pens and Red Wings met in back-to-back Finals. Which years? Wrong = {s2}.", a: "2008 (Detroit won) and 2009 (Pens won)" },
  { type: "trivia", text: "{p}, how many Norris Trophies has Erik Karlsson won? Wrong = {s2}.", a: "3" },

  // ───────────────────────── TRIVIA: CURRENT ─────────────────────────
  { type: "trivia", now: true, text: "{p}, who's the Pens' head coach, and which team was he an assistant for before? Drink {s1} per miss.", a: "Dan Muse — New York Rangers" },
  { type: "trivia", now: true, text: "{p}, which ex-Pens coach is now running the Rangers' bench? Wrong = {s2}.", a: "Mike Sullivan" },
  { type: "trivia", now: true, text: "{p}, who knocked the Pens out of the 2026 playoffs — and who scored the OT series winner? Drink {s1} per miss. Everyone drinks {s1} regardless. Too soon.", a: "The Flyers. Cam York, Game 6 OT." },
  { type: "trivia", now: true, text: "{p}, Geno came back for this season. What number season is it for him in Pittsburgh? Wrong = {s2}.", a: "His 21st" },
  { type: "trivia", now: true, text: "{p}, name the two goalies on the Pens' 2026–27 opening night roster. Drink {s1} per miss.", a: "Sergei Murashov and Arturs Silovs" },
  { type: "trivia", now: true, text: "{p}, which goalie did the Pens trade to Edmonton in December 2025? Wrong = {s2}.", a: "Tristan Jarry" },
  { type: "trivia", now: true, text: "{p}, who's the Pens' GM? Wrong = {s2}.", a: "Kyle Dubas" },
  { type: "trivia", now: true, text: "{p}, how many points did the Pens finish with in 2025–26? Within 4 is safe. Otherwise {s2}.", a: "98" },

  // ───────────────────────── DARES ─────────────────────────
  { type: "dare", text: "{p}, give us your best Mike Lange goal call. {p2} rates it. Under a 6? Drink {s2}." },
  { type: "dare", text: "{p}, say one genuinely nice thing about the Flyers. Can't do it? {finish}." },
  { type: "dare", text: "{p}, name 5 current Penguins in 10 seconds. {p2} counts. Drink {s1} for each one you miss." },
  { type: "dare", text: "{p}, rank Mario, Sid, Geno and Jagr. If {p2} disagrees with any spot, you both drink {s1}." },
  { type: "dare", text: "{p}, do your best Iceburgh dance for 10 seconds or drink {s2}." },
  { type: "dare", text: "{p}, you're Sid at a press conference. {p2} asks a question — answer in the most boring way possible. Say anything interesting? Drink {s2}." },
  { type: "dare", text: "{p}, hum the Pens goal song. {p2} has to get it in 5 seconds or {p2} drinks {s2}." },
  { type: "dare", text: "{p}, text someone 'Let's go Pens' with zero context. Or drink {s3}." },
  { type: "dare", text: "{p}, defend the most underrated Penguin ever for 20 seconds. Stall or stammer and drink {s2}." },
  { type: "dare", text: "{p}, you're the GM. Trade {p2} for anything in the room. If {p2} accepts the deal, {p2} drinks {s2}. If not, you do." },
  { type: "dare", text: "{p}, explain icing like you're a TV analyst in 15 seconds. {p2} judges. Fail = {s2}." },
  { type: "dare", text: "{p}, show us your Geno celly. Full commitment or drink {s2}." },
  { type: "dare", text: "{p}, what's your worst hockey take of all time? Confess it or drink {s2}." },
  { type: "dare", text: "{p}, recreate the Fleury save on Lidstrom. {p2} rates 1–10. Under 5? Drink {s2}." },
  { type: "dare", text: "{p}, give {p2} a hockey pep talk like it's Game 7. Weak speech? You drink {s2}. Good speech? {p2} drinks {s1} from the hype." },
  { type: "dare", text: "{p}, what's your earliest Pens memory? Tell it in 30 seconds or drink {s2}." },
  { type: "dare", text: "{p}, name a Pen from every decade: 70s, 80s, 90s, 00s, 10s, 20s. Drink {s1} per gap." },
  { type: "dare", text: "{p}, impersonate Malkin's English for one full sentence. Refuse = {s2}." },
  { type: "dare", text: "{p}, swap a sip of your drink with {p2}'s. No complaints allowed." },
  { type: "dare", text: "{p}, if you could have a beer with any Penguin ever, who? {p2} has to approve your answer or you drink {s1}." },

  // ───────────────────────── EVERYONE ─────────────────────────
  { type: "group", text: "Everyone who owns a Crosby jersey drinks {s1}. Own a Malkin jersey? Hand out {s2}." },
  { type: "group", text: "Everyone who saw a game at the Igloo, raise a glass to the roof and drink {s2}." },
  { type: "group", text: "Toast to Geno's 21st season. Everyone drinks {s2}." , now: true },
  { type: "group", text: "Last one to touch something black and gold drinks {s2}." },
  { type: "group", text: "Everyone wearing Pens gear right now hands out {s1}. Not wearing any? Drink {s2}, bandwagoner." },
  { type: "group", text: "Category: Penguins goalies, all-time. {p} starts, go back and forth. First to blank or repeat drinks {s2}." },
  { type: "group", text: "Category: Pens with a Cup ring. {p} starts. First to blank drinks {s2}." },
  { type: "group", text: "Category: current Penguins. {p} starts. First to blank drinks {s2}." , now: true },
  { type: "group", text: "Category: Penguins nicknames (Geno, Flower, Tanger...). {p} starts. First to blank drinks {s2}." },
  { type: "group", text: "Category: Flyers you can't stand. {p} starts. First to blank drinks {s2}." },
  { type: "group", text: "Category: Penguins defensemen, any era. {p} starts. First to blank drinks {s2}." },
  { type: "group", text: "Category: Pittsburgh sports legends, any sport. {p} starts. First to blank drinks {s2}." },
  { type: "group", text: "Everyone who's ever caught a puck or a t-shirt at a game hands out {s2}." },
  { type: "group", text: "Waterfall for Mario's comeback. {p} starts drinking, and nobody can stop until the person before them stops." , min: 3 },
  { type: "group", text: "Everyone who has ever cried over the Penguins drinks {s1}. Be honest." },
  { type: "group", text: "Everyone who was alive for the '91 Cup drinks {s1}. Everyone who wasn't, hand out {s1}." },
  { type: "group", text: "Quiet 'Let's go Pens' chant, then loud. Whoever is loudest hands out {s2}. Quietest drinks {s2}." },
  { type: "group", text: "Everyone drinks {s1} for Badger Bob. It's a great day for hockey." },
  { type: "group", text: "Cheers to the 2009 Cup. Everyone drinks {s1}, and {p} drinks one more for each of Max Talbot's two Game 7 goals." },

  // ───────────────────────── FACEOFF (head to head) ─────────────────────────
  { type: "versus", text: "Faceoff: {p} vs {p2}. Rock-paper-scissors, best of 3 like a shootout. Loser drinks {s2}." },
  { type: "versus", text: "Faceoff: {p} vs {p2}. Name Pens players A to Z, alternating letters. First to blank drinks {s2}." },
  { type: "versus", text: "Faceoff: {p} vs {p2}. Thumb war. Loser drinks {s1}, winner is Faceoff King until the next faceoff." },
  { type: "versus", text: "Faceoff: {p} vs {p2}. Staring contest — Fleury focus. First to blink drinks {s2}." },
  { type: "versus", text: "Faceoff: {p} vs {p2}. Who can name more players from the 2009 Cup team? Alternate. First to blank drinks {s2}." },
  { type: "versus", text: "Faceoff: {p} vs {p2}. Guess Crosby's career goal total. Look it up — farther guess drinks {s2}." },
  { type: "versus", text: "Faceoff: {p} vs {p2}. Guess how many games Geno has played as a Penguin. Look it up — farther guess drinks {s2}." },
  { type: "versus", text: "Faceoff: {p} vs {p2}. Guess Mario's career points. Look it up — farther guess drinks {s2}." },
  { type: "versus", text: "Faceoff: {p} vs {p2}. Best Iceburgh impression. Everyone else votes — or if it's just you two, the one who laughs first loses. Loser drinks {s2}." },
  { type: "versus", text: "Faceoff: {p} vs {p2}. Name Stanley Cup winning goal scorers for any NHL team. First to blank drinks {s2}." },

  // ───────────────────────── VOTE ─────────────────────────
  { type: "vote", text: "On 3, point at who's most likely to end up on the Jumbotron. Most fingers drinks {s2}. Tie? Everyone drinks." },
  { type: "vote", text: "On 3, point at who'd cry first when Sid retires. Most fingers drinks {s2}." },
  { type: "vote", text: "On 3, point at who's most likely to spill a beer in the upper deck. Most fingers drinks {s2}." },
  { type: "vote", text: "On 3, point at who's most likely to start a 'Let's go Pens' chant in a random bar. Most fingers hands out {s2}." },
  { type: "vote", text: "On 3, point at who'd be the worst ref. Most fingers drinks {s2}." },
  { type: "vote", text: "On 3, point at who's most likely to buy a jersey of a guy who gets traded a week later. Most fingers drinks {s2}." },
  { type: "vote", text: "On 3, point at who'd last longest arguing with a Flyers fan. Most fingers hands out {s2}." },
  { type: "vote", text: "On 3, point at who's the bigger bandwagoner. Most fingers drinks {s2}." },
  { type: "vote", text: "On 3, point at who'd make a better Penguins enforcer. Most fingers hands out {s2}." },
  { type: "vote", text: "On 3, point at who'd get kicked out of the arena first. Most fingers drinks {s2}." },

  // ───────────────────────── RULES (last a few cards) ─────────────────────────
  { type: "rule", len: [5, 9], text: "Flyers swear jar: anyone who says 'Flyers' or 'Philly' drinks {s1}.", end: "The swear jar is closed. Say 'Flyers' freely (but why would you)." },
  { type: "rule", len: [4, 7], text: "{p} is in the penalty box. No talking. Every word costs {s1}.", end: "{p}'s penalty is over — they're back on the ice and can talk again." },
  { type: "rule", len: [6, 10], text: "{p} gives everyone a hockey nickname. Use anyone's real name and drink {s1}.", end: "Nicknames are retired. Real names are back." },
  { type: "rule", len: [5, 8], text: "Canada rule: {p} has to end every sentence with 'eh'. Each miss = {s1}.", end: "{p} has left Canada. No more 'eh'." },
  { type: "rule", len: [4, 7], text: "{p} has to narrate everything {p2} does like Mike Lange. Silence = {s1}.", end: "{p} is off the broadcast." },
  { type: "rule", len: [5, 9], text: "Shootout hands: everyone drinks with their non-dominant hand. Slip up = {s1}.", end: "Dominant hands are back." },
  { type: "rule", len: [5, 9], text: "{p} wears the C. Whenever {p} drinks, everyone drinks.", end: "{p} hands back the C." },
  { type: "rule", len: [5, 8], text: "Cap space: nobody can say a number. Each slip = {s1}.", end: "Numbers are back. The cap is cleared." },
  { type: "rule", len: [4, 7], text: "{p} has to waddle like a penguin any time they get up.", end: "{p} can walk like a human again." },
  { type: "rule", len: [5, 9], text: "Ref's whistle: nobody can say the word 'drink'. Slip = {s1}.", end: "The whistle's done. Say 'drink' all you want." },
  { type: "rule", len: [5, 9], text: "Power play: {p} is on the man advantage — every time {p} drinks, {p2} drinks too.", end: "The power play is over. {p2} is off the hook." },
  { type: "rule", len: [4, 7], text: "Before every sip, you have to say 'Let's go Pens'. Forget it and drink {s1} extra.", end: "The chant requirement is lifted." },

  // ───────────────────────── LIVE (Intermission mode — last until next intermission) ─────────────────────────
  { type: "live", text: "Every Pens goal: {p} hands out {s3}." },
  { type: "live", text: "Every Pens penalty: {p} drinks {s1}." },
  { type: "live", text: "Every time Crosby gets a point: everyone drinks {s1}." },
  { type: "live", text: "If Malkin scores: everyone {finish}." },
  { type: "live", text: "Every icing call: {p2} drinks {s1}." },
  { type: "live", text: "Every time the goal song plays: {p} and {p2} cheers and drink {s1}." },
  { type: "live", text: "Other team scores: {p} drinks {s2}. Pens score: {p} hands out {s2}." },
  { type: "live", text: "Puck hits the post or crossbar: everyone drinks {s2}." },
  { type: "live", text: "Every TV timeout: {p2} picks a dare for {p}." },
  { type: "live", text: "Fight on the ice: everyone {finish}." },
  { type: "live", text: "Every point by Letang or Karlsson: everyone drinks {s1}." },
  { type: "live", text: "{p} picks a Penguin now. Every time the PA announces that player's name, {p2} drinks {s1}." },
  { type: "live", text: "Pens power-play goal: {p} hands out {s3}." },
  { type: "live", text: "Every kiss cam or fan cam: {p} drinks {s1}." },
  { type: "live", text: "Prediction: {p} calls the score at the end of next period. Exactly right? Hand out {s3}. Wrong? Drink {s1}." },
  { type: "live", text: "Pens go a man down on a penalty kill and kill it off: {p} hands out {s2}." },
  { type: "live", text: "Every big hit that gets the crowd going: {p2} drinks {s1}." },
  { type: "live", text: "Goalie gets pulled or a goal gets reviewed: everyone drinks {s2}." },
];
