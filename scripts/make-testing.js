// Makes fire-at-will-testing.html, the separate Fire at Will Testing app, from fire-at-will.html.
// It is the same game with TESTING_APP switched on and every DLC from dlc/ built in, so every change reaches it too.
// Run after every change to fire-at-will.html or dlc/:  node scripts/make-testing.js
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
let html = fs.readFileSync(path.join(root, 'fire-at-will.html'), 'utf8');
const swaps = [
  ['const TESTING_APP=false;', 'const TESTING_APP=true;'],
  ['<title>Fire at Will</title>', '<title>Fire at Will Testing</title>'],
  ['<meta name="apple-mobile-web-app-title" content="Fire at Will">', '<meta name="apple-mobile-web-app-title" content="FaW Testing">'],
  ['<meta name="theme-color" content="#c1442d">', '<meta name="theme-color" content="#123a63">'],
];
// every DLC in dlc/ is built into the Testing app
const dlcDir = path.join(root, 'dlc');
const packs = fs.readdirSync(dlcDir).filter((f) => f.endsWith('.json')).sort()
  .map((f) => JSON.stringify(JSON.parse(fs.readFileSync(path.join(dlcDir, f), 'utf8'))));
swaps.push(['const BUILTIN_DLC=[];', 'const BUILTIN_DLC=' + JSON.stringify(packs) + ';']);
for (const [from, to] of swaps) {
  if (!html.includes(from)) throw new Error('fire-at-will.html no longer contains: ' + from);
  html = html.replace(from, to);
}
fs.writeFileSync(path.join(root, 'fire-at-will-testing.html'), html);
console.log('fire-at-will-testing.html is up to date');
