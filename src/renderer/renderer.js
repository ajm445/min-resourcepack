const folderPath = document.getElementById('folderPath');
const pickBtn = document.getElementById('pickBtn');
const openBtn = document.getElementById('openBtn');
const syncBtn = document.getElementById('syncBtn');
const statusEl = document.getElementById('statusMsg');

async function refreshSettings() {
  const s = await window.api.getSettings();
  folderPath.value = s.minecraftDir;
}

pickBtn.addEventListener('click', async () => {
  const picked = await window.api.pickFolder();
  if (picked) {
    folderPath.value = picked;
    statusEl.textContent = `폴더 변경: ${picked}`;
  }
});

openBtn.addEventListener('click', async () => {
  if (folderPath.value) await window.api.openFolder(folderPath.value);
});

syncBtn.addEventListener('click', async () => {
  syncBtn.disabled = true;
  pickBtn.disabled = true;
  statusEl.textContent = '시작 중...';
  try {
    const result = await window.api.sync();
    statusEl.textContent = `완료: ${result.minecraftDir}`;
  } catch (err) {
    statusEl.textContent = `오류: ${err.message}`;
  } finally {
    syncBtn.disabled = false;
    pickBtn.disabled = false;
  }
});

window.api.onProgress((p) => {
  if (p?.message) statusEl.textContent = p.message;
});

refreshSettings();
