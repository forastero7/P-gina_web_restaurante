/* =========================================================================
   La Casa de las Sopas — interacciones
   Sin dependencias. Todo se degrada con gracia si el JS no carga.
   ========================================================================= */
(function () {
  "use strict";

  /* ---- Año en el footer ---- */
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Menú móvil ---- */
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    const closeMenu = () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menú");
    };
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });
    // Cerrar al elegir un enlace o al presionar Escape
    menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  /* ---- Sopa del día: resalta el día actual y actualiza el hero ---- */
  const today = new Date().getDay(); // 0 = domingo … 6 = sábado
  const todayCard = document.querySelector('.week__day[data-day="' + today + '"]');
  if (todayCard) {
    todayCard.classList.add("week__day--today");
    todayCard.setAttribute("aria-current", "date");
    const dish = todayCard.querySelector(".week__s");
    const heroDish = document.querySelector("[data-today-dish]");
    if (dish && heroDish) heroDish.textContent = dish.textContent;
  }

  /* ---- Reveal al hacer scroll ---- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---- Formulario de reserva ---- */
  const form = document.querySelector(".rform");
  if (!form) return;

  const status = form.querySelector("[data-form-status]");
  const fields = {
    name: form.querySelector("#r-name"),
    phone: form.querySelector("#r-phone"),
    date: form.querySelector("#r-date"),
    time: form.querySelector("#r-time"),
  };

  // La fecha mínima es hoy
  if (fields.date) {
    const d = new Date();
    const iso = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    fields.date.min = iso;
    if (!fields.date.value) fields.date.value = iso;
  }

  const setError = (input, message) => {
    const slot = form.querySelector('[data-error-for="' + input.id + '"]');
    if (slot) slot.textContent = message || "";
    input.setAttribute("aria-invalid", message ? "true" : "false");
  };

  const validators = {
    name: (v) => (v.trim().length >= 2 ? "" : "Escribe tu nombre."),
    phone: (v) =>
      /^[0-9+\s()-]{6,}$/.test(v.trim()) ? "" : "Deja un teléfono válido.",
    date: (v) => (v ? "" : "Elige una fecha."),
    time: (v) => (v ? "" : "Elige una hora."),
  };

  const validateField = (key) => {
    const input = fields[key];
    if (!input) return true;
    const msg = validators[key](input.value);
    setError(input, msg);
    return !msg;
  };

  // Valida al salir del campo, y limpia el error mientras se corrige
  Object.keys(fields).forEach((key) => {
    const input = fields[key];
    if (!input) return;
    input.addEventListener("blur", () => validateField(key));
    input.addEventListener("input", () => {
      if (input.getAttribute("aria-invalid") === "true") validateField(key);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const results = Object.keys(fields).map(validateField);
    const ok = results.every(Boolean);

    if (!ok) {
      status.textContent = "Revisa los campos marcados.";
      status.classList.remove("rform__note--ok");
      const firstBad = form.querySelector('[aria-invalid="true"]');
      if (firstBad) firstBad.focus();
      return;
    }

    const data = new FormData(form);
    const nombre = String(data.get("name")).trim().split(" ")[0];
    const personas = data.get("guests");
    const fecha = data.get("date");
    const hora = data.get("time");

    status.textContent =
      "¡Gracias, " + nombre + "! Recibimos tu solicitud para " + personas +
      " el " + fecha + " a las " + hora + ". Te confirmamos pronto.";
    status.classList.add("rform__note--ok");

    form.reset();
    Object.values(fields).forEach((i) => i && i.setAttribute("aria-invalid", "false"));

    // NOTA PARA EL DUEÑO: aquí no hay servidor todavía. Para recibir las
    // reservas de verdad, conecta este formulario a tu correo/WhatsApp o a un
    // servicio como Formspree. Ver README.md.
  });
})();
