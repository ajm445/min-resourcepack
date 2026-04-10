const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getSettings: () => ipcRenderer.invoke('settings:get'),
  pickFolder: () => ipcRenderer.invoke('settings:pickFolder'),
  sync: () => ipcRenderer.invoke('sync:run'),
  openFolder: (dir) => ipcRenderer.invoke('shell:openFolder', dir),
  onProgress: (cb) => {
    const listener = (_e, payload) => cb(payload);
    ipcRenderer.on('progress', listener);
    return () => ipcRenderer.removeListener('progress', listener);
  },
});
