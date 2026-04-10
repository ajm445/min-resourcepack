const path = require('path');
const os = require('os');
const fs = require('fs-extra');
const { app } = require('electron');

// The standard vanilla .minecraft folder for each OS.
function getDefaultMinecraftDir() {
  if (process.platform === 'win32') {
    const appData = process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming');
    return path.join(appData, '.minecraft');
  }
  if (process.platform === 'darwin') {
    return path.join(os.homedir(), 'Library', 'Application Support', 'minecraft');
  }
  return path.join(os.homedir(), '.minecraft');
}

// Where the launcher stores its own state (clone cache, settings).
function getAppDataDir() {
  const base = app ? app.getPath('userData') : path.join(os.homedir(), '.min-resourcepack-sync');
  return base;
}

const appDataDir = getAppDataDir();
const settingsFile = path.join(appDataDir, 'settings.json');
const repoCacheDir = path.join(appDataDir, 'repo-cache');

async function loadSettings() {
  if (!(await fs.pathExists(settingsFile))) return {};
  try {
    return await fs.readJson(settingsFile);
  } catch {
    return {};
  }
}

async function saveSettings(settings) {
  await fs.ensureDir(appDataDir);
  await fs.writeJson(settingsFile, settings, { spaces: 2 });
}

async function getMinecraftDir() {
  const settings = await loadSettings();
  return settings.minecraftDir || getDefaultMinecraftDir();
}

async function setMinecraftDir(dir) {
  const settings = await loadSettings();
  settings.minecraftDir = dir;
  await saveSettings(settings);
}

module.exports = {
  getDefaultMinecraftDir,
  getMinecraftDir,
  setMinecraftDir,
  appDataDir,
  repoCacheDir,
};
