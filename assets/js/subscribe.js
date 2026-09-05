/* Newsletter opt-in — front-end only for now.
   The submit does NOT hit any backend yet: the endpoint is stubbed until the
   GoHighLevel subaccount exists. See data-integration="ghl-pending".
   TODO: replace the fake success with a real POST to the GHL form/webhook. */
(function () {
  "use strict";

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function init(form) {
    var note = form.querySelector(".form-note");
    var email = form.querySelector('input[type="email"]');

    function setNote(msg, kind) {
      if (!note) return;
      note.textContent = msg;
      note.classList.remove("is-error", "is-success");
      if (kind) note.classList.add("is-" + kind);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // honeypot: if a bot filled the hidden field, fake success and bail
      var hp = form.querySelector('input[name="company_website"]');
      if (hp && hp.value) {
        form.reset();
        setNote("Thanks. Check your inbox.", "success");
        return;
      }

      var value = (email && email.value ? email.value : "").trim();
      if (!EMAIL_RE.test(value)) {
        setNote("Please enter a valid work email.", "error");
        if (email) email.focus();
        return;
      }

      // --- STUB: no real integration yet -------------------------------------
      // When the GoHighLevel subaccount is ready, POST { name, email } to the
      // GHL form endpoint / webhook here and gate the success state on its
      // response. For now we simulate a successful opt-in in the UI only.
      var btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.textContent = "Subscribing...";
      }

      window.setTimeout(function () {
        form.reset();
        if (btn) {
          btn.textContent = "Subscribed";
        }
        setNote("Check your inbox to confirm your subscription.", "success");
      }, 500);
    });
  }

  document.querySelectorAll('form[data-integration="ghl-pending"]').forEach(init);
})();
