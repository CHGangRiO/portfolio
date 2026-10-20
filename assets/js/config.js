// 사이트 전체에서 쓰는 링크와 연락처를 여기서 한 번에 관리합니다.
// 값이 빈 문자열("")이면 해당 버튼/링크는 화면에서 자동으로 숨겨집니다.
window.SITE_CONFIG = {
  name: "김창홍",
  nameEn: "KIM CHANG HONG",
  role: "게임 클라이언트 프로그래머",
  position: "Game Developer (Client)",
  birth: "1995.07.20",
  phone: "010-4720-0578",
  email: "1138aiie@gmail.com",
  github: "https://github.com/CHGangRiO",

  // 노션 포트폴리오 페이지 주소를 넣어 주세요.
  notion: "",

  // 프로젝트별 링크
  links: {
    p01Repo: "https://github.com/CHGangRiO/p-11u-mg-ps",
    p01Video: "",                                   // 유튜브 업로드 후 영상 ID 또는 주소
    p02Video: "https://youtu.be/BVLWR92e69k",
    p03Video: "https://youtu.be/ne0xWQ3QdaQ?t=1378",
    p04Video: "",
    // 플레이 가능한 Windows 빌드 (GitHub Releases). 새 빌드를 올리면 두 주소의 버전을 바꿔 주세요.
    gameDownload: "https://github.com/CHGangRiO/portfolio/releases/download/game-v0.1.0/CharacterSurvivors_v0.1.0_Win64.zip",
    gameRelease: "https://github.com/CHGangRiO/portfolio/releases/tag/game-v0.1.0"
  },

  // 문서 PDF 경로 (사이트 루트 기준). 비워 두면 PDF 버튼이 숨겨집니다.
  docs: {
    coverLetterPdf: "/assets/docs/cover-letter.pdf",
    applicationPdf: "",                             // 입사지원서 PDF는 주소·병역 사유가 있어 기본 비공개
    portfolioPdf: "/assets/docs/portfolio.pdf",
    techPdf: "/assets/docs/tech-intro.pdf"
  }
};
