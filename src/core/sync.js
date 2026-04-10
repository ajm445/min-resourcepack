const fs = require('fs-extra');
const path = require('path');
const simpleGit = require('simple-git');
const paths = require('./paths');

// Mirrors srcDir into destDir: every file under srcDir overwrites destDir,
// and any file in destDir that no longer exists in srcDir is removed.
// Only touches files we manage (tracked via a manifest) so unrelated mods/packs survive.
async function mirrorTracked(srcDir, destDir, manifestKey, manifestPath) {
  await fs.ensureDir(destDir);

  let manifest = {};
  if (await fs.pathExists(manifestPath)) {
    try {
      manifest = await fs.readJson(manifestPath);
    } catch {
      manifest = {};
    }
  }
  const previouslyManaged = new Set(manifest[manifestKey] || []);

  let srcEntries = [];
  if (await fs.pathExists(srcDir)) {
    srcEntries = await fs.readdir(srcDir);
  }
  const nowManaged = new Set(srcEntries);

  // Remove files we placed previously that are no longer in the repo.
  for (const name of previouslyManaged) {
    if (!nowManaged.has(name)) {
      await fs.remove(path.join(destDir, name));
    }
  }

  // Copy current set
  for (const name of srcEntries) {
    await fs.copy(path.join(srcDir, name), path.join(destDir, name), { overwrite: true });
  }

  manifest[manifestKey] = [...nowManaged];
  await fs.writeJson(manifestPath, manifest, { spaces: 2 });
}

async function syncRepo({ repoUrl, branch }, onProgress) {
  await fs.ensureDir(paths.appDataDir);
  const cache = paths.repoCacheDir;

  if (!(await fs.pathExists(path.join(cache, '.git')))) {
    onProgress?.({ message: 'Cloning resource pack repository...' });
    await fs.remove(cache);
    await simpleGit().clone(repoUrl, cache, ['--depth', '1', '--branch', branch]);
  } else {
    onProgress?.({ message: 'Updating resource pack repository...' });
    const git = simpleGit(cache);
    await git.fetch(['--depth', '1', 'origin', branch]);
    await git.reset(['--hard', `origin/${branch}`]);
  }

  const minecraftDir = await paths.getMinecraftDir();
  if (!(await fs.pathExists(minecraftDir))) {
    throw new Error(
      `Minecraft folder not found at: ${minecraftDir}\n마인크래프트를 한 번 이상 실행했는지 확인하거나, 폴더 위치를 수동으로 지정하세요.`,
    );
  }

  const modsDest = path.join(minecraftDir, 'mods');
  const packsDest = path.join(minecraftDir, 'resourcepacks');
  const manifestPath = path.join(paths.appDataDir, 'managed.json');

  onProgress?.({ message: 'Syncing mods...' });
  await mirrorTracked(path.join(cache, 'mods'), modsDest, 'mods', manifestPath);

  onProgress?.({ message: 'Syncing resource packs...' });
  await mirrorTracked(
    path.join(cache, 'resourcepacks'),
    packsDest,
    'resourcepacks',
    manifestPath,
  );

  onProgress?.({ message: '완료! 마인크래프트를 실행하고 서버에 접속하세요.' });
  return { minecraftDir };
}

module.exports = { syncRepo };
