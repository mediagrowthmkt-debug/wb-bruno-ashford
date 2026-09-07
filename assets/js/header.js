/* Bruno Ashford — header behaviour
   1) toggles .is-scrolled on the sticky header past a small scroll offset
      (glass + compact state), rAF-throttled.
   2) marks the current section's nav link with aria-current="page".
   3) drives the mobile drawer (open/close, backdrop, Esc, focus, scroll lock). */
(function () {
  "use strict";

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    var header = document.querySelector("[data-header]");

    /* --- scrolled state --------------------------------------------------- */
    if (header) {
      var ticking = false;
      var setState = function () {
        header.classList.toggle("is-scrolled", window.scrollY > 12);
        ticking = false;
      };
      window.addEventListener(
        "scroll",
        function () {
          if (!ticking) {
            window.requestAnimationFrame(setState);
            ticking = true;
          }
        },
        { passive: true }
      );
      setState();
    }

    /* --- active nav item -------------------------------------------------- */
    var path = window.location.pathname.replace(/index\.html$/, "").replace(/\/+$/, "/");
    document.querySelectorAll(".nav-link").forEach(function (a) {
      var href = a.getAttribute("href") || "";
      var seg = href.replace(/^(\.\.\/)+/, "").split("#")[0].replace(/index\.html$/, "");
      if (!seg) return;
      var key = "/" + seg.replace(/\/+$/, "");
      if (key.length > 1 && path.indexOf(key) !== -1) {
        a.setAttribute("aria-current", "page");
      }
    });

    /* --- mobile drawer ---------------------------------------------------- */
    var toggle = document.querySelector(".nav-toggle");
    var drawer = document.querySelector("[data-drawer]");
    if (!toggle || !drawer) return;

    var open = function () {
      drawer.hidden = false;
      // next frame so the transition runs from the hidden state
      window.requestAnimationFrame(function () {
        drawer.classList.add("is-open");
      });
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close menu");
      document.documentElement.style.overflow = "hidden";
      var first = drawer.querySelector(".drawer-link, .drawer-close");
      if (first) first.focus();
    };

    var close = function () {
      drawer.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      document.documentElement.style.overflow = "";
      var done = function () {
        drawer.hidden = true;
        drawer.removeEventListener("transitionend", done);
      };
      // fall back in case transitionend never fires (reduced motion)
      var panel = drawer.querySelector(".mobile-drawer-panel");
      if (panel) panel.addEventListener("transitionend", done);
      window.setTimeout(function () {
        if (!drawer.classList.contains("is-open")) drawer.hidden = true;
      }, 400);
    };

    toggle.addEventListener("click", function () {
      if (drawer.hidden) open();
      else close();
    });

    drawer.querySelectorAll("[data-drawer-close], .drawer-link").forEach(function (el) {
      el.addEventListener("click", close);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !drawer.hidden) {
        close();
        toggle.focus();
      }
    });
  });
})();
