// Makes fire-at-will-testing.html, the separate Fire at Will Testing app, from fire-at-will.html.
// It is the same game with TESTING_APP switched on, so every change to the game reaches it too.
// Run after every change to fire-at-will.html:  node scripts/make-testing.js
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
for (const [from, to] of swaps) {
  if (!html.includes(from)) throw new Error('fire-at-will.html no longer contains: ' + from);
  html = html.replace(from, to);
}
fs.writeFileSync(path.join(root, 'fire-at-will-testing.html'), html);
console.log('fire-at-will-testing.html is up to date');
