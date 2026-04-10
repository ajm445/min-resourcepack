# Min Resourcepack

Minecraft 1.20.1 Forge 서버용 **모드와 리소스팩** 묶음입니다. 사용자는 압축 파일 하나만 받아 풀면 서버 접속 준비가 끝납니다.

---

## 사용자 가이드 (서버에 접속하려는 분)

### 준비물

| 항목 | 다운로드 |
|---|---|
| **마인크래프트 정품** | https://www.minecraft.net/ko-kr/download |
| **Java 17** (Forge 1.20.1 필수) | https://adoptium.net/temurin/releases/?version=17 |
| **Forge 1.20.1-47.4.10 Installer** | https://maven.minecraftforge.net/net/minecraftforge/forge/1.20.1-47.4.10/forge-1.20.1-47.4.10-installer.jar |
| **모드 + 리소스팩 묶음** | **[⬇ min-resourcepack.zip 다운로드](https://github.com/ajm445/min-resourcepack/releases/latest/download/min-resourcepack.zip)** |

> Forge 다른 버전 보기: https://files.minecraftforge.net/net/minecraftforge/forge/index_1.20.1.html

### 설치 순서

1. **마인크래프트를 한 번 실행**해서 `.minecraft` 폴더를 만든다 (한 번만)
2. **Forge installer** 를 실행 → "Install client" 선택 → 설치
3. 마인크래프트 런처를 다시 열어 **`forge` 또는 `1.20.1-forge-47.4.10` 프로필**이 생겼는지 확인
4. **`min-resourcepack.zip`** 을 다운로드하고 압축 해제
5. 압축을 풀면 나오는 `mods/`, `resourcepacks/` 두 폴더를 본인의 `.minecraft` 폴더 안에 그대로 복사 (덮어쓰기)
   - Windows: `%APPDATA%\.minecraft` (탐색기 주소창에 그대로 입력)
   - macOS: `~/Library/Application Support/minecraft`
6. 마인크래프트 런처에서 **Forge 1.20.1 프로필**로 게임 실행
7. 멀티플레이 → 서버 주소 입력 → 접속!

### 모드가 업데이트되면

같은 다운로드 링크에서 다시 받아 압축을 풀고 `.minecraft\mods` 와 `.minecraft\resourcepacks` 폴더에 덮어쓰기 하시면 됩니다.

> ⚠️ **빠진 모드 정리**: 서버에서 어떤 모드가 빠진 경우, 본인 `.minecraft\mods` 폴더에서 해당 .jar 파일을 직접 지워야 합니다. (자동 정리되지 않음) 가장 안전한 방법은 `.minecraft\mods` 폴더 안 모든 파일을 지우고 새 zip 의 mods 를 다시 넣는 것입니다.

### 문제 해결

- **Forge 프로필이 안 보임** → Forge installer 를 관리자 권한으로 다시 실행
- **모드 충돌 / 누락** → `.minecraft\mods` 폴더를 비우고 zip 의 `mods/` 를 다시 통째로 복사
- **접속 시 "modded server" 에러** → 모드 버전이 안 맞는 것. 최신 zip 을 다시 받기

---

## 개발자 가이드 (이 repo 를 관리하는 사람)

### 동작 방식

이 repo 의 `mods/` 와 `resourcepacks/` 폴더에 변화가 생겨 push 할 때마다, GitHub Actions 가 자동으로 두 폴더를 묶어 `min-resourcepack.zip` 을 만들고 **`latest` Release** 에 업로드합니다. 사용자는 항상 같은 다운로드 링크에서 최신 묶음을 받게 됩니다.

워크플로 파일: [`.github/workflows/release.yml`](.github/workflows/release.yml)

### 폴더 구조

```
mods/             ← 서버용 Forge 모드 .jar 를 여기에 추가
resourcepacks/    ← 리소스팩 .zip 을 여기에 추가
.github/workflows/release.yml  ← 자동 release 워크플로
```

### 모드/리소스팩 추가 워크플로

```bash
# 서버 mods 폴더의 .jar 들을 D:\min-resourcepack\mods\ 로 복사
# 리소스팩 .zip 을 D:\min-resourcepack\resourcepacks\ 로 복사
git add mods/ resourcepacks/
git commit -m "update server mods"
git push
```

push 가 끝나면 GitHub Actions 탭에서 빌드 진행 상황을 볼 수 있고, 1~2 분 뒤 Releases 페이지의 `latest` 릴리스가 새 zip 으로 갱신됩니다.

### 첫 release 트리거

워크플로는 `mods/` 또는 `resourcepacks/` 에 변경이 생겨야 자동 실행됩니다. 폴더가 비어있는 상태라면 GitHub repo → Actions 탭 → "Build mods release" → "Run workflow" 버튼으로 수동 실행할 수도 있습니다.
