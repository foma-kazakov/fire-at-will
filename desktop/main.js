// Desktop wrapper for Fire at Will. The game itself is ../fire-at-will.html,
// copied into the app at build time, so the HTML stays the single source.
const { app, BrowserWindow, shell, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

function gameFile() {
  const packed = path.join(__dirname, 'fire-at-will.html');
  return fs.existsSync(packed) ? packed : path.join(__dirname, '..', 'fire-at-will.html');
}

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

app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
