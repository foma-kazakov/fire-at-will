// Desktop wrapper for Fire at Will. The game itself is ../fire-at-will.html,
// copied into the app at build time, so the HTML stays the single source.
const { app, BrowserWindow, shell, ipcMain, net } = require('electron');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function bundledFile() {
  const packed = path.join(__dirname, 'fire-at-will.html');
  return fs.existsSync(packed) ? packed : path.join(__dirname, '..', 'fire-at-will.html');
}

// Self-update: the app downloads the newest fire-at-will.html from UPDATE_URL into its own data folder and plays
// that copy from then on. Only the game file is replaced (the app around it stays), so no reinstall is needed,
// and progress is kept because every file:// page shares the same saved data.
const UPDATE_URL = 'https://raw.githubusercontent.com/foma-kazakov/fire-at-will/main/fire-at-will.html';
const updDir = path.join(app.getPath('userData'), 'update');
const updFile = path.join(updDir, 'fire-at-will.html');
const updInfo = path.join(updDir, 'info.json');
const sha = (text) => crypto.createHash('sha256').update(text).digest('hex');
const readText = (f) => { try { return fs.readFileSync(f, 'utf8'); } catch (e) { return null; } };
let runningSha = null, readySha = null;

// The downloaded copy is used only while the app itself is unchanged: after a fresh download of the app,
// its own (newer) game file wins again.
function gameFile() {
  const bundled = bundledFile(), bundledSha = sha(readText(bundled) || '');
  let info = null; try { info = JSON.parse(readText(updInfo)); } catch (e) {}
  const cached = readText(updFile);
  if (info && cached && info.bundledSha === bundledSha && sha(cached) === info.sha) { runningSha = info.sha; return updFile; }
  try { fs.rmSync(updDir, { recursive: true, force: true }); } catch (e) {}
  runningSha = bundledSha; return bundled;
}
// 'latest', 'ready' (a new version is downloaded and starts on the next launch) or 'offline'
async function checkUpdate() {
  try {
    const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), 20000);
    const res = await net.fetch(UPDATE_URL + '?t=' + Date.now(), { signal: ctl.signal, cache: 'no-store' });
    clearTimeout(t);
    if (!res.ok) return 'offline';
    const text = await res.text();
    if (text.length < 100000 || !text.includes('<title>Fire at Will</title>')) return 'offline';
    const s = sha(text);
    if (s === runningSha) return 'latest';
    if (s === readySha) return 'ready';
    fs.mkdirSync(updDir, { recursive: true });
    fs.writeFileSync(updFile, text);
    fs.writeFileSync(updInfo, JSON.stringify({ sha: s, bundledSha: sha(readText(bundledFile()) || ''), at: new Date().toISOString() }));
    readySha = s;
    return 'ready';
  } catch (e) { return 'offline'; }
}
let autoCheck = null;
ipcMain.handle('update:check', () => checkUpdate());
ipcMain.handle('update:auto', () => autoCheck || 'offline');
ipcMain.handle('update:restart', () => { app.relaunch(); app.exit(0); });

// DLC folder: Documents/Fire at Will/DLC. Every .json or .fawdlc file in it shows up on the game's DLC screen.
const dlcDir = path.join(app.getPath('documents'), 'Fire at Will', 'DLC');
const isDLCFile = (f) => /\.(json|fawdlc)$/i.test(f);
const README = 'Put Fire at Will DLC files (.json or .fawdlc) in this folder.\n' +
  'They appear on the DLC screen of the game by themselves, even while it is running.\n' +
  'To remove a DLC, delete its file from here.\n';

function ensureDLCDir() {
  try {
    fs.mkdirSync(dlcDir, { recursive: true });
    const readme = path.join(dlcDir, 'README.txt');
    if (!fs.existsSync(readme)) fs.writeFileSync(readme, README);
  } catch (e) {}
}

ipcMain.handle('dlc:list', () => {
  ensureDLCDir();
  let files = [];
  try { files = fs.readdirSync(dlcDir).filter(isDLCFile).sort(); } catch (e) {}
  return files.flatMap((file) => {
    try {
      const full = path.join(dlcDir, file);
      if (fs.statSync(full).size > 5e6) return [];
      return [{ file, text: fs.readFileSync(full, 'utf8') }];
    } catch (e) { return []; }
  });
});
ipcMain.handle('dlc:save', (e, name, text) => {
  ensureDLCDir();
  let file = path.basename(String(name)).replace(/[^\w .()-]/g, '_');
  if (!isDLCFile(file)) file += '.json';
  fs.writeFileSync(path.join(dlcDir, file), String(text));
});
ipcMain.handle('dlc:open', () => { ensureDLCDir(); return shell.openPath(dlcDir); });
ipcMain.on('dlc:folder', (e) => { e.returnValue = dlcDir; });

// Tell the game when files in the DLC folder change, so a dropped-in DLC appears straight away.
function watchDLC(win) {
  ensureDLCDir();
  let timer = null;
  try {
    const w = fs.watch(dlcDir, () => {
      clearTimeout(timer);
      timer = setTimeout(() => { if (!win.isDestroyed()) win.webContents.send('dlc:changed'); }, 300);
    });
    win.on('closed', () => w.close());
  } catch (e) {}
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 480,
    minHeight: 480,
    title: 'Fire at Will',
    backgroundColor: '#22261c',
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'build', 'icon.png'),
    webPreferences: { preload: path.join(__dirname, 'preload.js') },
  });
  win.removeMenu();
  win.loadFile(gameFile());
  watchDLC(win);

  // Links to other sites open in the normal browser, not inside the game.
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (e, url) => {
    if (/^https?:/.test(url)) { e.preventDefault(); shell.openExternal(url); }
  });

  // F11 toggles full screen, as in a browser.
  win.webContents.on('before-input-event', (e, input) => {
    if (input.type === 'keyDown' && input.key === 'F11') {
      win.setFullScreen(!win.isFullScreen());
      e.preventDefault();
    }
  });
}

app.whenReady().then(() => { createWindow(); autoCheck = checkUpdate(); });
app.on('window-all-closed', () => app.quit());
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
