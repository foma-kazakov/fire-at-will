// Desktop wrapper for Fire at Will. The game itself is ../fire-at-will.html,
// copied into the app at build time, so the HTML stays the single source.
const { app, BrowserWindow, shell } = require('electron');
const fs = require('fs');
const path = require('path');

function gameFile() {
  const packed = path.join(__dirname, 'fire-at-will.html');
  return fs.existsSync(packed) ? packed : path.join(__dirname, '..', 'fire-at-will.html');
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
  });
  win.removeMenu();
  win.loadFile(gameFile());

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
