/* Bruno Ashford — global lead-capture modal, multi-step (wizard).
   Any element with [data-lead-modal] opens the single #lead-modal. Optional
   data-interest pre-selects the "what are you looking for" step; data-source
   records which CTA opened it.

   The modal walks 4 steps, one field per screen:
     0 First name (required)   1 Work email (required + valid)
     2 What are you looking for? (select)   3 Anything else? (optional)
   then submits. The FINAL POST is identical to before: it hits the same secure
   GHL proxy (bruno-leads-api on Hostinger, token server-side) with
   { name, email, interest, interest_label, detail, source }.

   NOTE: api.php currently whitelists { name, email, source } only, so we also
   fold interest + detail into `source` (<=118 chars) so the data reaches the
   CRM today. (A backend patch to give `interest` its own field is queued.) */
(function () {
  "use strict";

  var ENDPOINT = "https://mediagrowth.com.br/bruno-leads-api/api.php";
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  // Optional phone (US/UK). If provided, require 7-15 digits (after stripping
  // +, spaces, dashes and parentheses). Empty is allowed (low friction).
  var PHONE_RE = /^[0-9]{7,15}$/;
  var TOTAL = 5; // input steps: name, email, phone, interest, detail

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    var modal = document.querySelector("[data-lead-modal-root]");
    if (!modal) return;

    var dialog = modal.querySelector(".lead-modal-dialog");
    var form = modal.querySelector("[data-lead-modal-form]");
    var note = form.querySelector(".form-note");
    var steps = Array.prototype.slice.call(form.querySelectorAll(".lm-step"));
    var dots = Array.prototype.slice.call(modal.querySelectorAll(".lm-dot"));
    var countEl = modal.querySelector("[data-lm-count]");
    var progress = modal.querySelector("[data-lm-progress]");
    var successEl = form.querySelector("[data-lm-success]");
    var stepsWrap = form.querySelector(".lm-steps");
    var fineEl = form.querySelector(".form-fine");

    var nameEl = form.querySelector('input[name="name"]');
    var emailEl = form.querySelector('input[type="email"]');
    var phoneEl = form.querySelector('input[name="phone"]');
    var interestSel = form.querySelector('select[name="interest_choice"]');
    var detailEl = form.querySelector('textarea[name="detail"]');
    var sourceEl = form.querySelector('input[name="source"]');
    var interestHidden = form.querySelector('input[name="interest"]');

    var backBtn = form.querySelector("[data-lm-back]");
    var nextBtn = form.querySelector("[data-lm-next]");
    var submitBtn = form.querySelector("[data-lm-submit]");
    var submitLabel = submitBtn ? submitBtn.textContent : "Let's talk";

    var current = 0;
    var lastFocused = null;
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function setNote(msg, kind) {
      if (!note) return;
      note.textContent = msg || "";
      note.classList.remove("is-error", "is-success");
      if (kind) note.classList.add("is-" + kind);
    }

    function stepField(i) {
      var s = steps[i];
      return s ? s.querySelector("input, select, textarea") : null;
    }

    function render(animateDir) {
      steps.forEach(function (s, i) {
        var active = i === current;
        s.hidden = !active;
        if (active && !reduceMotion && typeof animateDir === "number") {
          s.classList.remove("lm-in-left", "lm-in-right");
          void s.offsetWidth; // reflow so the animation restarts
          s.classList.add(animateDir >= 0 ? "lm-in-right" : "lm-in-left");
        }
      });
      dots.forEach(function (d, i) {
        d.classList.toggle("is-active", i === current);
        d.classList.toggle("is-done", i < current);
      });
      if (countEl) countEl.textContent = "Step " + (current + 1) + " of " + TOTAL;

      var last = current === TOTAL - 1;
      if (backBtn) backBtn.hidden = current === 0;
      if (nextBtn) nextBtn.hidden = last;
      if (submitBtn) submitBtn.hidden = !last;
      setNote("", null);

      var f = stepField(current);
      if (f) window.setTimeout(function () { try { f.focus(); } catch (e) {} }, 60);
    }

    // per-step validation. Returns true if the current step may advance/submit.
    function validateStep(i) {
      if (i === 0) {
        if (!nameEl || !nameEl.value.trim()) {
          setNote("Please enter your first name.", "error");
          if (nameEl) nameEl.focus();
          return false;
        }
      } else if (i === 1) {
        var v = (emailEl && emailEl.value ? emailEl.value : "").trim();
        if (!EMAIL_RE.test(v)) {
          setNote("Please enter a valid work email.", "error");
          if (emailEl) emailEl.focus();
          return false;
        }
      } else if (i === 2) {
        // phone is optional; only validate when something was typed
        var pv = (phoneEl && phoneEl.value ? phoneEl.value : "").trim();
        if (pv) {
          var digits = pv.replace(/[\s()+\-.]/g, "");
          if (!PHONE_RE.test(digits)) {
            setNote("Please enter a valid phone number, or leave it blank.", "error");
            if (phoneEl) phoneEl.focus();
            return false;
          }
        }
      }
      // step 3 (select) always has a value; step 4 is optional
      return true;
    }

    function goNext() {
      if (!validateStep(current)) return;
      if (current < TOTAL - 1) { current++; render(1); }
    }
    function goBack() {
      if (current > 0) { current--; render(-1); }
    }

    function open(trigger) {
      lastFocused = trigger || document.activeElement;

      // reset wizard state
      current = 0;
      form.reset();
      if (successEl) successEl.hidden = true;
      if (stepsWrap) stepsWrap.hidden = false;
      if (progress) progress.hidden = false;
      if (fineEl) fineEl.hidden = false;
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = submitLabel; }

      // context from the trigger
      var interest = trigger ? trigger.getAttribute("data-interest") : "";
      var source = (trigger && trigger.getAttribute("data-source")) || "Popup: Lead modal";
      if (interestSel && interest) {
        for (var i = 0; i < interestSel.options.length; i++) {
          if (interestSel.options[i].value === interest) { interestSel.selectedIndex = i; break; }
        }
      }
      if (sourceEl) sourceEl.value = source;
      if (interestHidden) interestHidden.value = interest || (interestSel ? interestSel.value : "");

      modal.hidden = false;
      window.requestAnimationFrame(function () { modal.classList.add("is-open"); });
      document.documentElement.style.overflow = "hidden";
      render(0);
    }

    function close() {
      modal.classList.remove("is-open");
      document.documentElement.style.overflow = "";
      var done = function () { modal.hidden = true; dialog.removeEventListener("transitionend", done); };
      dialog.addEventListener("transitionend", done);
      window.setTimeout(function () { if (!modal.classList.contains("is-open")) modal.hidden = true; }, 400);
      if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
    }

    function focusables() {
      return Array.prototype.slice
        .call(dialog.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ))
        .filter(function (el) { return el.offsetParent !== null && !el.hidden; });
    }

    /* ---- open/close triggers ---- */
    document.addEventListener("click", function (e) {
      var t = e.target.closest ? e.target.closest("[data-lead-modal]") : null;
      if (t) { e.preventDefault(); open(t); }
    });
    modal.querySelectorAll("[data-modal-close]").forEach(function (el) {
      el.addEventListener("click", close);
    });

    /* ---- nav buttons ---- */
    if (nextBtn) nextBtn.addEventListener("click", goNext);
    if (backBtn) backBtn.addEventListener("click", goBack);

    /* ---- keyboard: Esc close, Tab trap, Enter advances (not inside textarea) ---- */
    document.addEventListener("keydown", function (e) {
      if (modal.hidden) return;
      if (e.key === "Escape") { close(); return; }
      if (e.key === "Tab") {
        var f = focusables();
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        return;
      }
      if (e.key === "Enter") {
        var tag = (document.activeElement && document.activeElement.tagName) || "";
        if (tag === "TEXTAREA") return; // Enter adds a newline in the optional note
        e.preventDefault();
        if (current < TOTAL - 1) goNext();
        else if (validateStep(current)) submit();
      }
    });

    /* ---- submit (final POST, identical to the single-screen version) ---- */
    function submit() {
      // honeypot
      var hp = form.querySelector('input[name="company_website"]');
      if (hp && hp.value) { showSuccess(); return; }

      var email = (emailEl && emailEl.value ? emailEl.value : "").trim();
      if (!EMAIL_RE.test(email)) { current = 1; render(-1); setNote("Please enter a valid work email.", "error"); return; }

      var interestVal = interestSel ? interestSel.value : "";
      var interestLabel = interestSel && interestSel.selectedIndex >= 0
        ? interestSel.options[interestSel.selectedIndex].text : "";
      var detail = detailEl && detailEl.value ? detailEl.value.trim() : "";
      var phone = phoneEl && phoneEl.value ? phoneEl.value.trim() : "";
      // `source` carries the CTA descriptor (which button opened the modal). The
      // backend records the GHL contact source as "website" and keeps this CTA
      // text in the note, so interest/detail no longer need to be folded in here.
      var source = sourceEl && sourceEl.value ? sourceEl.value : "Popup: Lead modal";
      if (source.length > 118) source = source.slice(0, 118);

      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Sending..."; }

      var payload = {
        name: nameEl && nameEl.value ? nameEl.value.trim() : "",
        email: email,
        phone: phone,
        interest: interestVal,
        interest_label: interestLabel,
        detail: detail,
        source: source
      };

      fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (res) { return res.json().catch(function () { return { ok: res.ok }; }); })
        .then(function (data) {
          if (data && data.ok) { showSuccess(); }
          else {
            if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = submitLabel; }
            setNote("Something went wrong. Please try again in a moment.", "error");
          }
        })
        .catch(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = submitLabel; }
          setNote("Network error. Please try again.", "error");
        });
    }

    function showSuccess() {
      if (stepsWrap) stepsWrap.hidden = true;
      if (progress) progress.hidden = true;
      if (fineEl) fineEl.hidden = true;
      if (backBtn) backBtn.hidden = true;
      if (nextBtn) nextBtn.hidden = true;
      if (submitBtn) submitBtn.hidden = true;
      setNote("", null);
      if (successEl) successEl.hidden = false;
      window.setTimeout(close, 2600);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (validateStep(current)) submit();
    });
  });
})();
