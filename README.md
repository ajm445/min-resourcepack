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
