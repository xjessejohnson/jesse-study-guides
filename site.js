(function () {
  var saved = localStorage.getItem("jsg-theme") || "dark";
  document.documentElement.setAttribute("data-theme", saved);

  var LANGS = [
    ["en", "English"],
    ["es", "Español"],
    ["fr", "Français"],
    ["de", "Deutsch"],
    ["pt", "Português"],
    ["zh-CN", "中文"],
    ["ja", "日本語"],
    ["ko", "한국어"],
    ["ar", "العربية"],
    ["hi", "हिन्दी"],
    ["vi", "Tiếng Việt"],
    ["tl", "Filipino"],
    ["ru", "Русский"],
    ["it", "Italiano"],
    ["pl", "Polski"],
    ["uk", "Українська"],
    ["tr", "Türkçe"],
    ["nl", "Nederlands"],
    ["id", "Bahasa Indonesia"],
    ["th", "ไทย"]
  ];

  function currentLang() {
    var m = document.cookie.match(/googtrans=\/en\/([^;]+)/);
    return m ? m[1] : "en";
  }

  function setLang(code) {
    var val = code === "en" ? "" : "/en/" + code;
    document.cookie = "googtrans=" + val + ";path=/";
    document.cookie = "googtrans=" + val + ";path=/;domain=" + location.hostname;
    location.reload();
  }

  function inject() {
    if (document.getElementById("site-toolbar")) return;
    var bar = document.createElement("div");
    bar.id = "site-toolbar";
    bar.className = "site-toolbar";

    var cur = currentLang();
    var label = "English";
    LANGS.forEach(function (p) { if (p[0] === cur) label = p[1]; });

    bar.innerHTML =
      '<div class="lang-wrap">' +
        '<button type="button" class="lang-btn" id="lang-btn" aria-expanded="false">' + label + ' ▾</button>' +
        '<div class="lang-list" id="lang-list" hidden></div>' +
      '</div>' +
      '<button type="button" id="theme-toggle" aria-label="Toggle theme">' +
        (saved === "dark" ? "Light" : "Dark") +
      "</button>";
    document.body.appendChild(bar);

    var list = document.getElementById("lang-list");
    LANGS.forEach(function (p) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "lang-item" + (p[0] === cur ? " on" : "");
      b.textContent = p[1];
      b.onclick = function () { setLang(p[0]); };
      list.appendChild(b);
    });

    document.getElementById("lang-btn").onclick = function (e) {
      e.stopPropagation();
      var open = list.hasAttribute("hidden");
      if (open) list.removeAttribute("hidden");
      else list.setAttribute("hidden", "");
      this.setAttribute("aria-expanded", open ? "true" : "false");
    };
    document.addEventListener("click", function () {
      list.setAttribute("hidden", "");
    });

    document.getElementById("theme-toggle").onclick = function () {
      var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("jsg-theme", next);
      this.textContent = next === "dark" ? "Light" : "Dark";
    };

    // Load Google Translate so the cookie actually translates the page
    window.googleTranslateElementInit = function () {
      if (!window.google || !google.translate) return;
      new google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false },
        "gt-hidden"
      );
    };
    var hidden = document.createElement("div");
    hidden.id = "gt-hidden";
    hidden.style.display = "none";
    document.body.appendChild(hidden);
    var s = document.createElement("script");
    s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(s);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
