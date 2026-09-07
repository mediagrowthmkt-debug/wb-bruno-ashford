/* Newsletter / lead opt-in — posts to the secure server-side proxy.
   The GoHighLevel token lives ONLY on the backend (bruno-leads-api on
   Hostinger). This script sends { name, email, source } to that proxy, which
   validates, rate-limits, checks the honeypot and upserts the contact in the
   GHL CRM. The site never sees the token. See data-integration="ghl-live". */
(function () {
  "use strict";

  var ENDPOINT = "https://mediagrowth.com.br/bruno-leads-api/api.php";
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function init(form) {
    var note = form.querySelector(".form-note");
    var email = form.querySelector('input[type="email"]');
    var nameEl = form.querySelector('input[name="name"]');
    var sourceEl = form.querySelector('input[name="source"]');

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

      var btn = form.querySelector('button[type="submit"]');
      var btnLabel = btn ? btn.textContent : "";
      if (btn) {
        btn.disabled = true;
        btn.textContent = "Sending...";
      }

      var payload = {
        name: nameEl && nameEl.value ? nameEl.value.trim() : "",
        email: value,
        source: sourceEl && sourceEl.value ? sourceEl.value : "Blog"
      };

      fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          return res.json().catch(function () { return { ok: res.ok }; });
        })
        .then(function (data) {
          if (data && data.ok) {
            form.reset();
            if (btn) btn.textContent = "Subscribed";
            setNote("You're in. Check your inbox to confirm.", "success");
          } else {
            if (btn) { btn.disabled = false; btn.textContent = btnLabel; }
            setNote("Something went wrong. Please try again in a moment.", "error");
          }
        })
        .catch(function () {
          if (btn) { btn.disabled = false; btn.textContent = btnLabel; }
          setNote("Network error. Please try again.", "error");
        });
    });
  }

  // The lead modal form is handled by lead-modal.js (open/close + submit), so
  // skip it here to avoid binding submit twice.
  document
    .querySelectorAll('form[data-integration="ghl-live"]:not([data-lead-modal-form])')
    .forEach(init);
})();
