(function () {
  "use strict";

  var cfg = window.SITE_CONFIG || {};
  var root = document.body.getAttribute("data-root") || "";
  var page = document.body.getAttribute("data-page") || "";

  // ---------- 공통 헤더 / 푸터 ----------
  var nav = [
    { id: "home", label: "홈", href: "index.html" },
    { id: "about", label: "자기소개", href: "about.html" },
    { id: "resume", label: "이력", href: "resume.html" },
    { id: "projects", label: "프로젝트", href: "index.html#projects" },
    { id: "videos", label: "영상", href: "index.html#videos" }
  ];

  var header = document.getElementById("site-header");
  if (header) {
    header.className = "site-header";
    header.innerHTML =
      '<div class="container header-inner">' +
      '<a class="brand" href="' + root + 'index.html"><span class="brand-mark">KCH</span><span class="brand-name">' + cfg.name + '</span></a>' +
      '<button class="nav-toggle" type="button" aria-label="메뉴 열기" aria-expanded="false"><span></span><span></span><span></span></button>' +
      '<nav class="site-nav" aria-label="주 메뉴"><ul>' +
      nav.map(function (n) {
        return '<li><a href="' + root + n.href + '"' + (n.id === page ? ' aria-current="page"' : "") + ">" + n.label + "</a></li>";
      }).join("") +
      '<li><a class="nav-cta" href="' + root + 'index.html#contact">연락하기</a></li>' +
      "</ul></nav></div>";

    var toggle = header.querySelector(".nav-toggle");
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    header.querySelectorAll(".site-nav a").forEach(function (a) {
      a.addEventListener("click", function () { header.classList.remove("is-open"); });
    });

    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  var footer = document.getElementById("site-footer");
  if (footer) {
    footer.className = "site-footer";
    footer.innerHTML =
      '<div class="container footer-inner">' +
      '<div><strong>' + cfg.name + "</strong> · " + cfg.role + "</div>" +
      '<div class="footer-links">' +
      '<a data-link="email">Email</a><a data-link="github">GitHub</a><a data-link="notion">Notion</a>' +
      "</div>" +
      '<div class="footer-copy">© ' + new Date().getFullYear() + " " + cfg.nameEn + "</div>" +
      "</div>";
  }

  // ---------- data-link 채우기 (비어 있으면 숨김) ----------
  function resolveLink(key) {
    if (key === "email") return cfg.email ? "mailto:" + cfg.email : "";
    if (key === "github") return cfg.github || "";
    if (key === "notion") return cfg.notion || "";
    if (cfg.links && key in cfg.links) {
      var v = cfg.links[key] || "";
      if (key === "playGame" && v && v.charAt(0) === "/") return root + v.slice(1);
      return v;
    }
    if (cfg.docs && key in cfg.docs) {
      var d = cfg.docs[key] || "";
      return d && d.charAt(0) === "/" ? root + d.slice(1) : d;
    }
    return "";
  }

  document.querySelectorAll("[data-link]").forEach(function (el) {
    var url = resolveLink(el.getAttribute("data-link"));
    if (!url) {
      if (el.hasAttribute("data-fallback")) {
        el.classList.add("is-disabled");
        el.removeAttribute("href");
        el.setAttribute("aria-disabled", "true");
        el.textContent = el.getAttribute("data-fallback");
      } else {
        el.hidden = true;
      }
      return;
    }
    el.setAttribute("href", url);
    if (/^https?:/.test(url)) {
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    }
  });

  document.querySelectorAll("[data-text]").forEach(function (el) {
    var v = cfg[el.getAttribute("data-text")];
    if (v) el.textContent = v;
  });

  // ---------- 유튜브 (클릭 시 로드) ----------
  function parseYouTube(value) {
    if (!value) return null;
    var id = "", start = 0;
    var m = value.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
    id = m ? m[1] : (/^[\w-]{11}$/.test(value) ? value : "");
    var t = value.match(/[?&](?:t|start)=(\d+)/);
    if (t) start = parseInt(t[1], 10);
    return id ? { id: id, start: start } : null;
  }

  document.querySelectorAll("[data-youtube]").forEach(function (box) {
    var key = box.getAttribute("data-youtube");
    var raw = cfg.links && key in cfg.links ? cfg.links[key] : key;
    var yt = parseYouTube(raw);
    var title = box.getAttribute("data-title") || "플레이 영상";

    if (!yt) {
      box.classList.add("video-empty");
      box.innerHTML = '<div class="video-empty-inner"><span class="video-empty-icon" aria-hidden="true">▶</span><p>영상 준비 중입니다</p></div>';
      return;
    }

    box.innerHTML =
      '<button type="button" class="video-poster" aria-label="' + title + ' 재생">' +
      '<img loading="lazy" alt="" src="https://i.ytimg.com/vi/' + yt.id + '/hqdefault.jpg">' +
      '<span class="video-play" aria-hidden="true"></span></button>';

    box.querySelector("button").addEventListener("click", function () {
      var src = "https://www.youtube-nocookie.com/embed/" + yt.id + "?autoplay=1&rel=0" + (yt.start ? "&start=" + yt.start : "");
      box.innerHTML = '<iframe src="' + src + '" title="' + title + '" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe>';
    });
  });

  // ---------- 이미지 확대 보기 ----------
  var zoomables = document.querySelectorAll("img[data-zoom]");
  if (zoomables.length) {
    var box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "이미지 확대 보기");
    box.innerHTML = '<button type="button" class="lightbox-close" aria-label="닫기">×</button><img alt="">';
    document.body.appendChild(box);
    var big = box.querySelector("img");
    var lastFocus = null;

    var close = function () {
      box.classList.remove("is-open");
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    };
    box.addEventListener("click", function (e) { if (e.target !== big) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && box.classList.contains("is-open")) close(); });

    zoomables.forEach(function (img) {
      img.setAttribute("tabindex", "0");
      img.setAttribute("role", "button");
      var open = function () {
        lastFocus = img;
        big.src = img.currentSrc || img.src;
        big.alt = img.alt;
        big.classList.toggle("is-wide", img.naturalWidth > img.naturalHeight * 1.8);
        box.classList.add("is-open");
        document.body.style.overflow = "hidden";
        box.querySelector(".lightbox-close").focus();
      };
      img.addEventListener("click", open);
      img.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    });
  }

  // ---------- 스크롤 등장 효과 ----------
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
