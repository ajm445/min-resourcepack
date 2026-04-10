const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const pkg = require('../package.json');

const sync = require('./core/sync');
const paths = require('./core/paths');

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 720,
    height: 520,
    resizable: false,
    autoHideMenuBar: true,
    title: 'Min Resourcepack Sync',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

function emitProgress(payload) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('progress', payload);
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('settings:get', async () => {
  return {
    minecraftDir: await paths.getMinecraftDir(),
    defaultMinecraftDir: paths.getDefaultMinecraftDir(),
    repoUrl: pkg.launcher.modsRepo,
    branch: pkg.launcher.modsBranch,
  };
});

ipcMain.handle('settings:pickFolder', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: 'Select your .minecraft folder',
    properties: ['openDirectory'],
    defaultPath: await paths.getMinecraftDir(),
  });
  if (result.canceled || result.filePaths.length === 0) return null;
  const picked = result.filePaths[0];
  await paths.setMinecraftDir(picked);
  return picked;
});

ipcMain.handle('sync:run', async () => {
  const cfg = pkg.launcher;
  const result = await sync.syncRepo(
    { repoUrl: cfg.modsRepo, branch: cfg.modsBranch },
    emitProgress,
  );
  return result;
});

ipcMain.handle('shell:openFolder', async (_e, dir) => {
  await shell.openPath(dir);
});
