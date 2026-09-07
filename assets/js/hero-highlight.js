/* Hero sub highlight — Rough Notation "marker pen" on "Let AI do the machine work".
   Cycle: draw (~800ms) -> visible 10s -> slow fade-out ~2.7s (ink drying) ->
   pause 1s -> redraw -> repeat.
   Respects prefers-reduced-motion: draws once and stops (no loop). */
(function () {
  "use strict";

  function init() {
    var target = document.getElementById("hero-highlight");
    if (!target || !window.RoughNotation || !window.RoughNotation.annotate) return;

    var reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Bronze marker behind the cream text. Multi-stroke + slight iterations give
    // the hand-drawn feel; opacity kept moderate so the text stays legible.
    var annotation = window.RoughNotation.annotate(target, {
      type: "highlight",
      color: "rgba(184, 115, 51, 0.55)", // #B87333 copper, translucent
      animationDuration: 800,
      iterations: 2,
      multiline: true,
      padding: [2, 4],
    });

    var VISIBLE_MS = 10000; // hold fully drawn ~10s before it starts drying
    var FADE_MS = 2700; // slow ease-out fade of the ink ~2.7s
    var PAUSE_MS = 1000; // stay invisible ~1s before redraw
    var timers = [];
    var running = false;

    function clearTimers() {
      timers.forEach(clearTimeout);
      timers = [];
    }

    // The Rough Notation SVG(s) sit right after the target. Grab them so we can
    // fade their opacity (ink evaporating) instead of hiding abruptly.
    function annotationSvgs() {
      return document.querySelectorAll("svg.rough-annotation");
    }
    function setSvgOpacity(v, withTransition) {
      annotationSvgs().forEach(function (svg) {
        svg.style.transition = withTransition
          ? "opacity " + FADE_MS + "ms ease-out"
          : "none";
        svg.style.opacity = v;
      });
    }

    function cycle() {
      // fully visible for VISIBLE_MS, then dry out slowly
      timers.push(
        setTimeout(function () {
          setSvgOpacity(1, false); // make sure we start the fade from solid
          // next frame: kick the CSS transition toward 0
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              setSvgOpacity(0, true);
            });
          });
          // after the fade completes, reset the annotation and redraw
          timers.push(
            setTimeout(function () {
              annotation.hide(); // remove faded SVG so the redraw is clean
              timers.push(
                setTimeout(function () {
                  annotation.show(); // sketch back in over ~800ms
                  setSvgOpacity(1, false); // ensure full opacity on the fresh draw
                  cycle();
                }, PAUSE_MS)
              );
            }, FADE_MS + 60)
          );
        }, VISIBLE_MS)
      );
    }

    function start() {
      if (running) return;
      running = true;
      annotation.show(); // first draw (animated, 800ms)
      setSvgOpacity(1, false);
      if (!reduceMotion) cycle();
    }

    // Draw when the phrase scrolls into view.
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              start();
              io.disconnect();
            }
          });
        },
        { threshold: 0.6 }
      );
      io.observe(target);
    } else {
      start();
    }

    // Pause the loop when the tab is hidden; resume on return (avoids drift/jank).
    document.addEventListener("visibilitychange", function () {
      if (reduceMotion || !running) return;
      if (document.hidden) {
        clearTimers();
      } else {
        annotation.hide();
        annotation.show();
        setSvgOpacity(1, false);
        cycle();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
