# 배포 구조 전환 계획

현재는 public GitHub repo + GitHub Releases 로 zip 을 배포 중. 사용자 규모가 커지거나 외부 노출이 늘어날 경우, 소스/작업 이력을 숨기고 zip 만 공개로 두는 구조로 전환한다.

## 전환 트리거 (이 중 하나라도 발생하면 진행)

- 서버를 외부에 공개 모집/홍보하기 시작했을 때
- 모드 작가 또는 권리자로부터 takedown 연락이 왔을 때
- Google 검색에서 mod 이름으로 본인 repo 가 노출되는 게 확인됐을 때
- 사용자 수가 단순한 지인 범위(약 10~20명)를 넘어섰을 때
- 본인이 노출에 부담을 느끼게 됐을 때

## 현재 상태 (2026-04-10 기준)

- repo: `ajm445/min-resourcepack` (public)
- 사용자: 지인 한정, GitHub 계정 없음 (Discord 로 안내)
- mods/ 19개 jar, LFS 추적, 총 ~270MB
- workflow: push 시 zip 만들어 `latest` release 에 업로드, LFS 캐시 적용
- README 에 면책 disclaimer 추가됨

## 두 가지 전환 옵션

### Path A. Private 소스 repo + Public release-only repo

**구조**
- `min-resourcepack` → private 전환 (mods/, workflow, README, 모든 작업)
- 새 public repo `min-files` (또는 비슷한 이름) 생성, 코드 0줄, release 만 보관
- private repo 의 workflow 가 zip 만든 후 GitHub API 로 public repo 에 release 업로드
- 사용자 다운로드 URL: `https://github.com/ajm445/min-files/releases/latest/download/min-resourcepack.zip`

**장점**
- GitHub 안에서 끝남, 추가 서비스 가입 불필요
- 무료
- 본인의 작업 과정/커밋 메시지/README/workflow 완전히 숨겨짐
- 사용자 경험 그대로 (링크 클릭 → 다운로드)

**단점**
- release 페이지 자체는 검색 가능. mod 작가가 jar 이름으로 GitHub 검색하면 발견 가능 (현 수준과 동일)
- LFS 한도(월 1GB 대역폭)는 그대로 적용 (단, release 다운로드는 LFS 대역폭에 안 잡힘)

**작업 단계**
1. 사용자 작업
   - GitHub 웹에서 새 빈 public repo 생성 (예: `min-files`)
   - Settings → Developer settings → Personal access token (fine-grained) 발급
     - scope: 새 repo 의 `Contents: read/write`
   - 현재 repo Settings → Secrets and variables → Actions → `RELEASE_REPO_TOKEN` 으로 토큰 저장
   - 현재 repo Settings → General → Danger Zone → private 으로 전환
2. 코드 작업
   - `release.yml` 수정: `softprops/action-gh-release` 의 `repository:` 옵션으로 `ajm445/min-files` 지정, `token: ${{ secrets.RELEASE_REPO_TOKEN }}` 사용
   - README 의 다운로드 링크를 새 repo URL 로 교체
3. 정리
   - 현재 public repo 의 기존 release / `latest` 태그 삭제 (private 전환 후에도 보존됨)
   - Discord 공지에 새 다운로드 링크 안내
4. 검증
   - push → 새 repo 에 release 생성 확인
   - anonymous 브라우저로 다운로드 URL 동작 확인

### Path B. Private repo + Cloudflare R2

**구조**
- `min-resourcepack` → private 전환
- Cloudflare R2 버킷 생성, 공개 액세스 또는 커스텀 도메인 연결
- workflow 가 zip 만들어 R2 에 업로드 (S3 호환 API)
- 사용자 다운로드 URL: `https://files.<도메인>/min-resourcepack.zip` 또는 R2 dev 도메인

**장점**
- GitHub 에 jar 가 외부 노출 0 (private repo 안에만 존재)
- mod 작가가 GitHub 검색해도 발견 안 됨
- Cloudflare 무료 한도: 저장 10GB / 대역폭 무제한 / Class A 100만 회·월
- URL 이 본인 도메인이라 깔끔, robots.txt 로 검색엔진 인덱싱 차단 가능
- 향후 통계/접근 제어/CDN 캐시 등 확장 가능

**단점**
- Cloudflare 계정 필요 (무료, 5분)
- 도메인 1개 권장 (없으면 R2 dev 도메인 사용 — URL 이 못생김)
- 초기 설정이 Path A 보다 약간 복잡 (버킷 생성, API 토큰, secrets 등록)

**작업 단계**
1. 사용자 작업
   - Cloudflare 계정 생성 (없으면)
   - R2 활성화 (무료 플랜으로 충분)
   - 버킷 생성 (예: `min-resourcepack`)
   - 버킷을 public access 또는 커스텀 도메인 연결
   - R2 API token 발급 (해당 버킷 read/write)
   - 현재 repo Secrets 에 등록:
     - `R2_ACCESS_KEY_ID`
     - `R2_SECRET_ACCESS_KEY`
     - `R2_ACCOUNT_ID`
     - `R2_BUCKET`
   - 현재 repo private 전환
2. 코드 작업
   - `release.yml` 의 `softprops/action-gh-release` step 제거
   - 대신 `aws-actions/configure-aws-credentials` + `aws s3 cp` (R2 는 S3 호환) 또는 `cloudflare/wrangler-action` 사용해서 R2 에 zip 업로드
   - 업로드 후 캐시 무효화 step 추가 (R2 + CF CDN 사용 시)
   - README 다운로드 링크를 R2 URL 로 교체
3. 정리
   - 현재 public repo 의 기존 release / 태그 삭제
   - robots.txt 또는 CF 페이지 룰로 검색엔진 인덱싱 차단 설정
   - Discord 공지 갱신
4. 검증
   - push → R2 에 새 zip 업로드 확인
   - anonymous 브라우저로 다운로드 동작 확인
   - `site:files.도메인` Google 검색으로 인덱싱 안 되는지 확인

## 의사결정 기준

- **간단함 우선** → Path A
- **노출 최소화 우선** → Path B
- **둘 다 미래에 가능**: 먼저 A 로 전환했다가, 나중에 부족하면 B 로 한 번 더 옮길 수 있음. 데이터/소스는 그대로 살아있어 손실 0.

## 전환 시 잊지 말 것

- 기존 다운로드 URL 을 사용 중인 사용자에게 충분한 안내 기간 (Discord 공지 + 핀)
- 기존 release / 태그 삭제는 새 URL 동작 검증 후
- LFS 캐시 키가 그대로면 GitHub Actions 캐시 재사용 가능
- README 의 다운로드 링크/면책 안내도 함께 갱신
