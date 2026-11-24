(function () {
  var saved = localStorage.getItem("jsg-theme") || "dark";
  document.documentElement.setAttribute("data-theme", saved);

  function inject() {
    if (document.getElementById("site-toolbar")) return;
    var bar = document.createElement("div");
    bar.id = "site-toolbar";
    bar.className = "site-toolbar";
    bar.innerHTML =
      '<div id="google_translate_element"></div>' +
      '<button type="button" id="theme-toggle" aria-label="Toggle theme">' +
      (saved === "dark" ? "Light" : "Dark") +
      "</button>";
    document.body.appendChild(bar);

    document.getElementById("theme-toggle").onclick = function () {
      var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("jsg-theme", next);
      this.textContent = next === "dark" ? "Light" : "Dark";
    };

    var s = document.createElement("script");
    s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(s);
  }

  window.googleTranslateElementInit = function () {
    if (!window.google || !google.translate) return;
    new google.translate.TranslateElement(
      { pageLanguage: "en", autoDisplay: false, layout: google.translate.TranslateElement.InlineLayout.SIMPLE },
      "google_translate_element"
    );
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
