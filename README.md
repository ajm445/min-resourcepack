# Min Resourcepack Sync

Minecraft 1.20.1 Forge 서버 접속에 필요한 **모드와 리소스팩**을 GitHub repo에서 자동으로 받아 사용자의 `.minecraft` 폴더에 동기화하는 작은 데스크톱 도구.

사용자는 정품 마인크래프트와 Forge 1.20.1 프로필을 본인 런처에서 그대로 쓰고, 이 도구는 서버에 필요한 파일만 따로 관리합니다.

## 동작 방식

1. 사용자가 다운로드 버튼을 클릭
2. 이 repo의 `mods/`, `resourcepacks/` 폴더를 GitHub에서 git clone (이후 실행에서는 pull)
3. 사용자의 `.minecraft\mods`, `.minecraft\resourcepacks`로 복사
4. 이전에 이 도구가 넣어둔 파일 중 repo에서 사라진 것은 자동 삭제 (사용자가 직접 넣은 다른 mod/리소스팩은 건드리지 않음 — `managed.json` 으로 추적)

## 폴더 구조

```
mods/             ← 서버용 Forge 모드 .jar 를 여기에 추가하고 push
resourcepacks/    ← 리소스팩 .zip 를 여기에 추가하고 push
src/              ← Electron 앱 소스
```

## 개발 실행

```bash
npm install
npm start
```

## 배포 빌드

```bash
npm run dist
```

`dist/` 에 Windows installer 가 생성됩니다. 이 installer 를 사용자에게 배포하면 됨.

## 설정

`package.json` 의 `launcher` 섹션:

```json
{
  "launcher": {
    "modsRepo": "https://github.com/<USER>/min-resourcepack.git",
    "modsBranch": "main"
  }
}
```

GitHub repo 를 만든 뒤 `modsRepo` URL 을 본인 것으로 바꾸고 다시 빌드.

## 사용자 사용 흐름

1. 도구 실행 → 자동으로 `%APPDATA%\.minecraft` 탐지 (다르면 "변경" 버튼으로 직접 지정)
2. **다운로드 / 업데이트** 클릭
3. 정품 마인크래프트 런처에서 Forge 1.20.1 프로필로 실행
4. 멀티플레이 → 서버 접속

서버 모드가 업데이트되면 사용자는 다시 이 도구를 열고 버튼만 누르면 됩니다.
