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

## 면책 / 저작권 안내

- 이 저장소는 **개인/지인 서버 운영용 비공식 모음**입니다. Mojang Studios, Microsoft, MinecraftForge, 그리고 포함된 모드 · 리소스팩 제작자와 무관하며 후원받지 않습니다.
- 포함된 모든 모드 (`mods/*.jar`) 와 리소스팩 (`resourcepacks/*`) 의 저작권은 각 원저작자에게 있습니다. 본 저장소는 원작자의 권리를 주장하지 않으며 어떠한 라이선스도 부여하지 않습니다.
- 각 모드/리소스팩의 사용 조건은 원배포처 (CurseForge / Modrinth / 제작자 사이트) 의 라이선스를 따르며, 사용자는 본인이 직접 해당 라이선스를 확인할 책임이 있습니다.
- 본 저장소의 zip 묶음은 사용자 편의를 위한 단순 모음일 뿐이며, **재배포 권한을 부여하지 않습니다**. 권리자가 삭제를 요청하면 즉시 해당 파일을 제거합니다. 문의: GitHub Issues
- Minecraft 는 Mojang Studios / Microsoft 의 등록 상표입니다.
