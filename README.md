# 김창홍 포트폴리오 사이트

정적 HTML 사이트입니다. 빌드 과정 없이 폴더 그대로 cafe24 웹호스팅에 올리면 됩니다.

## 폴더 구성

```
index.html          메인 (소개 · 프로젝트 · 영상 · 기술 · 연락처)
about.html          자기소개서
resume.html         이력
projects/p01~p04    프로젝트 상세
assets/css          스타일 (색상은 style.css 맨 위 :root 에서 변경)
assets/js/config.js 링크 · 연락처 설정  ← 자주 고치는 파일
assets/js/site.js   공통 헤더/푸터, 유튜브, 이미지 확대
assets/img          이미지
.htaccess           cafe24(Apache) 서버 설정
```

## 자주 하는 수정

- **노션 / 유튜브 / 게임 링크**: `assets/js/config.js`의 값을 채우면 됩니다. 비어 있으면 버튼이 자동으로 숨겨지고, 영상은 "준비 중"으로 표시됩니다.
  - 유튜브는 `https://youtu.be/영상ID` 형식 그대로 넣으면 됩니다. `?t=초`를 붙이면 그 시점부터 재생됩니다.
- **CSS/JS를 고친 뒤 업로드할 때**: 각 HTML의 `style.css?v=3`, `site.js?v=2`, `config.js?v=1` 숫자를 올려야 방문자 브라우저에 바로 반영됩니다.

## 로컬에서 미리 보기

`index.html`을 더블클릭해도 열리지만, 실제 서버와 같게 보려면:

```bash
python -m http.server 8765
```

브라우저에서 `http://localhost:8765` 접속.

## 배포 (GitHub Pages + cafe24 도메인)

- GitHub 저장소(Public)에 push → Settings → Pages에서 `main` 브랜치 / `(root)` 배포
- `CNAME` 파일에 `devkim.cloud`가 들어 있어 커스텀 도메인이 자동으로 설정됩니다.
- cafe24 DNS 관리에 A 레코드 4개(185.199.108.153 / 109.153 / 110.153 / 111.153)와
  `www` CNAME(`CHGangRiO.github.io`)를 등록합니다.
- 이후에는 수정 → 커밋 → push만 하면 1~2분 안에 사이트에 반영됩니다.
- GitHub Pages에서는 `.htaccess`가 동작하지 않습니다(무시됨).

## (참고) cafe24 웹호스팅으로 배포하는 경우

1. cafe24에서 **웹호스팅 상품을 신청**하고, 구매한 도메인을 호스팅에 연결합니다.
   (나의서비스관리 → 도메인 연결, 반영까지 최대 하루 정도 걸릴 수 있습니다)
2. FTP 프로그램(예: FileZilla)으로 접속합니다.
   - 호스트: `아이디.cafe24.com` · 포트 21 · 아이디/비밀번호: 호스팅 FTP 계정
3. 서버의 `www` 폴더 안에 이 폴더의 **내용물 전체**를 올립니다.
   (`www/index.html`이 되도록. `README.md`는 올리지 않아도 됩니다)
   - `.htaccess`는 숨김 파일이라 FileZilla에서 안 보일 수 있습니다. 서버 → "숨김 파일 강제 표시"를 켜세요.
4. 도메인으로 접속해 확인합니다. `.htaccess` 때문에 500 오류가 나면 해당 파일만 지우고 알려 주세요.

## 나중에: Unity WebGL 게임 올리기

1. Unity WebGL 빌드 결과물을 `play/character-survivors/` 폴더에 넣어 업로드합니다.
2. `config.js`의 `playGame`에 `"/play/character-survivors/"`를 넣으면 메인 페이지의 "플레이하기" 버튼이 켜집니다.
3. 압축(Gzip/Brotli) 설정은 `.htaccess`에 미리 들어 있습니다.
4. 빌드 용량이 큰 만큼 호스팅의 일일 트래픽 한도를 확인하세요.
