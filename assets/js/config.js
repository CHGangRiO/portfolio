// 사이트 전체에서 쓰는 링크와 연락처를 여기서 한 번에 관리합니다.
// 값이 빈 문자열("")이면 해당 버튼/링크는 화면에서 자동으로 숨겨집니다.
window.SITE_CONFIG = {
  name: "김창홍",
  nameEn: "KIM CHANG HONG",
  role: "게임 클라이언트 프로그래머",
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
    playGame: ""                                    // WebGL 포팅 후 "/play/character-survivors/" 등
  },

  // PDF를 서버에 올려 내려받게 하려면 경로를 넣으세요. (예: "/assets/docs/portfolio.pdf")
  // 개인정보(전화번호·주소 등)가 포함된 파일은 올리지 않는 것을 권장합니다.
  docs: {
    portfolioPdf: "",
    techPdf: ""
  }
};
