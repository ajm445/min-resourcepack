# Min Resourcepack Sync

Minecraft 1.20.1 Forge 서버 접속에 필요한 **모드와 리소스팩**을 자동으로 받아 사용자의 `.minecraft` 폴더에 동기화하는 작은 데스크톱 도구입니다.

사용자는 정품 마인크래프트와 Forge 1.20.1 프로필을 본인 런처에서 그대로 쓰고, 이 도구는 서버에 필요한 파일만 따로 관리합니다.

---

## 사용자 가이드 (서버에 접속하려는 분)

### 준비물

| 항목 | 다운로드 |
|---|---|
| **마인크래프트 정품** | https://www.minecraft.net/ko-kr/download |
| **Java 17** (Forge 1.20.1 필수) | https://adoptium.net/temurin/releases/?version=17 |
| **Forge 1.20.1-47.4.10 Installer** | https://maven.minecraftforge.net/net/minecraftforge/forge/1.20.1-47.4.10/forge-1.20.1-47.4.10-installer.jar |
| **Min Resourcepack Sync (이 도구)** | [Releases 페이지](https://github.com/ajm445/min-resourcepack/releases) 에서 최신 `.exe` 다운로드 |

> Forge 다른 버전 보기: https://files.minecraftforge.net/net/minecraftforge/forge/index_1.20.1.html

### 설치 순서

1. **마인크래프트를 한 번 실행**해서 `.minecraft` 폴더를 만든다 (한 번만)
2. **Forge installer** 를 실행 → "Install client" 선택 → 설치
3. 마인크래프트 런처를 다시 열어 **`forge` 또는 `1.20.1-forge-47.4.10` 프로필**이 생겼는지 확인
4. **Min Resourcepack Sync** 를 설치하고 실행
5. "다운로드 / 업데이트" 버튼 클릭 → 서버 모드와 리소스팩이 자동으로 들어감
6. 마인크래프트 런처에서 **Forge 1.20.1 프로필**로 게임 실행
7. 멀티플레이 → 서버 주소 입력 → 접속!

### 서버 모드가 업데이트되면

이 도구를 다시 열어서 **다운로드 / 업데이트** 버튼만 누르면 됩니다. 추가된 모드는 받아지고, 빠진 모드는 자동으로 정리됩니다. 사용자가 직접 넣은 다른 모드는 건드리지 않습니다.

### 문제 해결

- **".minecraft 폴더를 찾을 수 없다" 오류** → 마인크래프트를 한 번이라도 실행했는지 확인. CurseForge/MultiMC 등 다른 런처를 쓴다면 "변경" 버튼으로 해당 인스턴스의 폴더를 직접 지정하세요.
- **게임 실행 시 모드 충돌/누락** → 도구에서 다시 "다운로드 / 업데이트" 한 번 더 실행
- **Forge 프로필이 안 보임** → Forge installer 를 관리자 권한으로 다시 실행

---

## 개발자 가이드 (이 repo 를 관리하는 사람)

### 동작 방식

1. 사용자가 다운로드 버튼 클릭
2. 이 repo 의 `mods/`, `resourcepacks/` 폴더를 GitHub 에서 clone (이후 실행은 pull)
3. 사용자의 `.minecraft\mods`, `.minecraft\resourcepacks` 로 복사
4. 이전에 이 도구가 넣어둔 파일 중 repo 에서 사라진 것은 자동 삭제. 사용자가 직접 넣은 다른 mod/리소스팩은 `managed.json` 으로 추적해서 건드리지 않음

### 폴더 구조

```
mods/             ← 서버용 Forge 모드 .jar 를 여기에 추가하고 push
resourcepacks/    ← 리소스팩 .zip 를 여기에 추가하고 push
src/              ← Electron 앱 소스
```

### 개발 실행

```bash
npm install
npm start
```

### 배포 빌드

```bash
npm run dist
```

`dist/` 에 Windows installer (`.exe`) 가 생성됩니다. 이 파일을 GitHub Releases 에 업로드하면 사용자가 README 의 Releases 링크에서 받을 수 있습니다.

### Releases 업로드 방법

1. `npm run dist` 로 `dist\Min Resourcepack Sync Setup x.y.z.exe` 생성
2. GitHub repo → Releases → Draft a new release
3. 태그 `v0.1.0` 같이 입력 → installer `.exe` 를 드래그해서 첨부 → Publish

### 모드/리소스팩 추가 워크플로

```bash
# 서버 mods 폴더에서 .jar 들을 D:\min-resourcepack\mods\ 로 복사
# 리소스팩 .zip 을 D:\min-resourcepack\resourcepacks\ 로 복사
git add mods/ resourcepacks/
git commit -m "update server mods"
git push
```

사용자가 도구에서 버튼만 누르면 자동 반영됩니다.

### 설정

`package.json` 의 `launcher` 섹션:

```json
{
  "launcher": {
    "modsRepo": "https://github.com/ajm445/min-resourcepack.git",
    "modsBranch": "main"
  }
}
```
