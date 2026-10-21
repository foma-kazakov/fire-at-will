// Gives the game (fire-at-will.html) access to the DLC folder. In a browser this is missing,
// and the game falls back to DLC files dropped on its DLC screen.
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('fireAtWillDesktop', {
  dlcFolder: ipcRenderer.sendSync('dlc:folder'),
  listDLC: () => ipcRenderer.invoke('dlc:list'),
  saveDLC: (name, text) => ipcRenderer.invoke('dlc:save', name, text),
  openFolder: () => ipcRenderer.invoke('dlc:open'),
  onChange: (fn) => ipcRenderer.on('dlc:changed', () => fn()),
});
