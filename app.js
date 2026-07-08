/* =========================================================
   PORTFOLIO — Jordan Métellus
   app.js : interactions front (aucune requête réseau)
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. Menu mobile (hamburger) ---------- */
  var navToggle = document.getElementById('navToggle');
  var primaryNav = document.getElementById('primaryNav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = primaryNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Ferme le menu automatiquement après un clic sur un lien (mobile)
    var navLinks = primaryNav.querySelectorAll('.nav-link');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        primaryNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- 2. Navigation active au scroll ---------- */
  var sections = document.querySelectorAll('main .section[id]');
  var links = document.querySelectorAll('.nav-link');

  function setActiveLink() {
    var scrollPos = window.scrollY + 120;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var bottom = top + section.offsetHeight;
      var id = section.getAttribute('id');
      var link = document.querySelector('.nav-link[href="#' + id + '"]');
      if (!link) return;
      if (scrollPos >= top && scrollPos < bottom) {
        links.forEach(function (l) { l.classList.remove('active'); });
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', setActiveLink);
  setActiveLink();

  /* ---------- 3. Effet "machine à écrire" pour le nom dans le hero ---------- */
  var typedEl = document.getElementById('typedName');
  if (typedEl) {
    var fullText = typedEl.textContent.trim();
    typedEl.textContent = '';
    var i = 0;
    function typeChar() {
      if (i <= fullText.length) {
        typedEl.textContent = fullText.slice(0, i);
        i++;
        setTimeout(typeChar, 70);
      }
    }
    // Respecte la préférence "reduced motion"
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      typedEl.textContent = fullText;
    } else {
      typeChar();
    }
  }

  /* ---------- 4. Validation du formulaire de contact ---------- */
  var form = document.getElementById('contactForm');
  var feedback = document.getElementById('formFeedback');

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function showError(inputId, errorId, message) {
    var input = document.getElementById(inputId);
    var errorSpan = document.getElementById(errorId);
    input.setAttribute('aria-invalid', 'true');
    errorSpan.textContent = message;
  }

  function clearError(inputId, errorId) {
    var input = document.getElementById(inputId);
    var errorSpan = document.getElementById(errorId);
    input.removeAttribute('aria-invalid');
    errorSpan.textContent = '';
  }

  function validateField(inputId, errorId, rule, message) {
    var input = document.getElementById(inputId);
    var value = input.value.trim();
    if (!rule(value)) {
      showError(inputId, errorId, message);
      return false;
    }
    clearError(inputId, errorId);
    return true;
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var nomOk = validateField(
        'nom', 'nomError',
        function (v) { return v.length >= 2; },
        'Merci d\'indiquer votre nom (2 caractères minimum).'
      );

      var emailOk = validateField(
        'email', 'emailError',
        function (v) { return emailRegex.test(v); },
        'Merci d\'entrer une adresse email valide (ex. nom@domaine.com).'
      );

      var messageOk = validateField(
        'message', 'messageError',
        function (v) { return v.length >= 10; },
        'Votre message doit contenir au moins 10 caractères.'
      );

      if (nomOk && emailOk && messageOk) {
        feedback.textContent = 'Merci ! Votre message a bien été validé (démonstration front uniquement, aucun envoi réel).';
        feedback.className = 'form-feedback success';
        form.reset();
      } else {
        feedback.textContent = 'Certains champs doivent être corrigés avant l\'envoi.';
        feedback.className = 'form-feedback error';
      }
    });

    // Validation en direct (au moment où l'utilisateur quitte un champ)
    document.getElementById('nom').addEventListener('blur', function () {
      validateField('nom', 'nomError', function (v) { return v.length >= 2; }, 'Merci d\'indiquer votre nom (2 caractères minimum).');
    });
    document.getElementById('email').addEventListener('blur', function () {
      validateField('email', 'emailError', function (v) { return emailRegex.test(v); }, 'Merci d\'entrer une adresse email valide (ex. nom@domaine.com).');
    });
    document.getElementById('message').addEventListener('blur', function () {
      validateField('message', 'messageError', function (v) { return v.length >= 10; }, 'Votre message doit contenir au moins 10 caractères.');
    });
  }

});
