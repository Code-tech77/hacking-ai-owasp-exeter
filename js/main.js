/* Hacking AI site: dark mode, search, back-to-top. No dependencies. */
(function () {
  var root = document.documentElement.getAttribute("data-root") || "./";

  /* ---------- Dark / light toggle ---------- */
  var toggle = document.querySelector(".scheme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-scheme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-scheme", next);
      try { localStorage.setItem("scheme", next); } catch (e) {}
    });
  }

  /* ---------- Search ---------- */
  var input = document.querySelector(".search input");
  var box = document.querySelector(".search-results");
  var index = window.SEARCH_INDEX || [];

  function escapeHtml(s) {
    return s.replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function snippet(text, q) {
    var i = text.toLowerCase().indexOf(q);
    if (i < 0) return escapeHtml(text.slice(0, 120)) + (text.length > 120 ? "…" : "");
    var start = Math.max(0, i - 40);
    var part = text.slice(start, i + q.length + 80);
    var j = part.toLowerCase().indexOf(q);
    return (start > 0 ? "…" : "") + escapeHtml(part.slice(0, j)) +
      "<mark>" + escapeHtml(part.slice(j, j + q.length)) + "</mark>" +
      escapeHtml(part.slice(j + q.length)) + "…";
  }

  function run() {
    var q = input.value.trim().toLowerCase();
    if (q.length < 2) { box.hidden = true; box.innerHTML = ""; return; }
    var hits = index
      .map(function (e) {
        var t = e.t.toLowerCase(), x = e.x.toLowerCase(), score = 0;
        if (t.indexOf(q) >= 0) score += 10;
        if (x.indexOf(q) >= 0) score += 1;
        return { e: e, score: score };
      })
      .filter(function (h) { return h.score > 0; })
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, 8);
    box.innerHTML = hits.length
      ? hits.map(function (h) {
          return '<a href="' + root + h.e.u + '"><strong>' + escapeHtml(h.e.t) +
            "</strong><span>" + snippet(h.e.x, q) + "</span></a>";
        }).join("")
      : '<div class="empty">No results</div>';
    box.hidden = false;
  }

  if (input && box) {
    input.addEventListener("input", run);
    input.addEventListener("focus", run);
    document.addEventListener("click", function (ev) {
      if (!ev.target.closest(".search")) box.hidden = true;
    });
    input.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape") { box.hidden = true; input.blur(); }
      if (ev.key === "Enter") {
        var first = box.querySelector("a");
        if (first) window.location.href = first.getAttribute("href");
      }
    });
  }

  /* ---------- Back to top ---------- */
  var top = document.querySelector(".to-top");
  if (top) {
    window.addEventListener("scroll", function () { top.hidden = window.scrollY < 600; }, { passive: true });
    top.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  }

  /* ---------- Highlight current section in table of contents ---------- */
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll(".toc a"));
  if (tocLinks.length && "IntersectionObserver" in window) {
    var map = {};
    tocLinks.forEach(function (a) { map[decodeURIComponent(a.hash.slice(1))] = a; });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          tocLinks.forEach(function (a) { a.classList.remove("active"); });
          map[en.target.id].classList.add("active");
        }
      });
    }, { rootMargin: "-80px 0px -70% 0px" });
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) obs.observe(el);
    });
  }
})();
