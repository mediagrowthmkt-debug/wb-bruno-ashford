/* Lite YouTube facade — swaps the poster for the real iframe on click.
   No hardcoded origin (avoids the "player configuration / error 153" that
   happens with a stale or wrong &origin=). youtube-nocookie for privacy.
   Works in production (https) and on http://localhost; the poster alone
   renders even under file:// so the block is never blank. */
(function () {
  "use strict";

  function activate(box) {
    var id = box.getAttribute("data-yt");
    if (!id || box.dataset.loaded === "1") return;
    box.dataset.loaded = "1";

    var iframe = document.createElement("iframe");
    // autoplay so the click that dismissed the poster also starts playback
    iframe.src =
      "https://www.youtube-nocookie.com/embed/" +
      encodeURIComponent(id) +
      "?autoplay=1&rel=0&modestbranding=1&playsinline=1";
    iframe.title = box.querySelector(".lite-yt-btn")
      ? box.querySelector(".lite-yt-btn").getAttribute("aria-label") || "YouTube video"
      : "YouTube video";
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute(
      "allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    );
    iframe.setAttribute("allowfullscreen", "");
    iframe.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;border:0";

    box.innerHTML = "";
    box.appendChild(iframe);
  }

  document.querySelectorAll(".lite-yt[data-yt]").forEach(function (box) {
    var btn = box.querySelector(".lite-yt-btn");
    (btn || box).addEventListener("click", function () {
      activate(box);
    });
  });
})();
