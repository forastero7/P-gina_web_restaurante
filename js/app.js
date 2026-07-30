/* ============================================================
   Kusikuy Dark Kitchen — Lógica de la web
   - Render del menú desde MENU (menu-data.js)
   - Carrito con localStorage
   - Pedido y reservas por WhatsApp (deep link wa.me)
   - Traducción ES / EN (botón de idioma)
   Depende de: MENU, MOSTRAR_PRECIOS, WHATSAPP_NUMERO, MONEDA, MAPS_LINK
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Utilidades ---------- */
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const fmt = (n) => `${MONEDA} ${Number(n).toFixed(2)}`;
  const waLink = (texto) => `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;

  const keyFor = (catId, itemIdx, varIdx) =>
    `${catId}:${itemIdx}${varIdx == null ? '' : ':' + varIdx}`;

  /* ============================================================
     TRADUCCIÓN (i18n)
     ============================================================ */
  const LANG_KEY = 'kusikuy_lang';
  let LANG = (function () {
    try { return localStorage.getItem(LANG_KEY) || 'es'; } catch { return 'es'; }
  })();

  const I18N = {
    es: {
      'nav.menu': 'Menú', 'nav.reservas': 'Reservas', 'nav.local': 'Local', 'nav.pedir': 'Pedir 🛒',
      'hero.eyebrow': '🔥 Dark Kitchen · Local presencial',
      'hero.tagline': 'Pide tus <strong>alitas favoritas picantes</strong> 🔥 · Parrillas, salchipapas y bebidas para llevar o disfrutar en el local.',
      'hero.cta.menu': 'Ver el menú', 'hero.cta.order': 'Pedir por WhatsApp',
      'hero.badge.1': '🍗 Alitas en 5 salsas', 'hero.badge.2': '🥩 Parrillas',
      'hero.badge.3': '🚴 Delivery por WhatsApp', 'hero.badge.4': '🍽️ Local presencial',
      'menu.title': 'Nuestro <span class="accent">Menú</span>',
      'menu.desc': 'Toca <strong>Agregar</strong> en lo que quieras y arma tu pedido. Al final lo envías por WhatsApp. 🔥',
      'reservas.title': 'Reserva tu <span class="accent">mesa</span>',
      'reservas.desc': '¿Vienes al local? Reserva y te esperamos con todo listo. Completa el formulario y se envía directo a nuestro WhatsApp.',
      'reservas.point.1': '✅ Confirmación rápida por WhatsApp',
      'reservas.point.2': '👨‍👩‍👧‍👦 Ideal para grupos y celebraciones',
      'reservas.point.3': '🔥 Pide tus alitas picantes con anticipación',
      'form.nombre': 'Nombre', 'form.nombre.ph': 'Tu nombre',
      'form.fecha': 'Fecha', 'form.hora': 'Hora', 'form.personas': 'N.º de personas',
      'form.telefono': 'Tu teléfono <span class="opt">(opcional)</span>',
      'form.notas': 'Notas <span class="opt">(opcional)</span>',
      'form.notas.ph': 'Cumpleaños, mesa cerca a la ventana, etc.',
      'form.submit': 'Reservar por WhatsApp',
      'form.error': 'Completa nombre, fecha, hora y número de personas.',
      'local.title': 'Visítanos en el <span class="accent">local</span>',
      'local.address': 'Dirección', 'local.hours': 'Horario',
      'local.hours.value': 'Lun a Dom · 4:30 p.m. – 11:00 p.m.',
      'local.whatsapp': 'WhatsApp / Pedidos', 'local.whatsapp.link': 'Escríbenos por WhatsApp',
      'local.follow': 'Síguenos', 'local.directions': 'Cómo llegar 🗺️',
      'footer.note': '🔥 Pide tus alitas favoritas picantes', 'footer.order': 'Pedir',
      'footer.made': 'Hecho con 🔥 para los amantes de las alitas.',
      'cart.title': 'Tu pedido 🛒', 'cart.empty': 'Tu pedido está vacío. Agrega algo del menú 🔥',
      'cart.total': 'Total', 'cart.send': 'Enviar pedido por WhatsApp',
      'cart.hint': 'Confirmamos el total contigo por WhatsApp.',
      'cart.hint.prices': 'El total puede variar según acompañamientos.',
      'cart.each': 'c/u',
      'dish.add': '+ Agregar', 'toast.added': 'Agregado',
      'wa.order.greeting': '¡Hola Kusikuy! 🔥 Quiero hacer este pedido:',
      'wa.order.total': 'Total aprox.:', 'wa.order.confirm': '¿Me confirman disponibilidad y tiempo? ¡Gracias!',
      'wa.generic': '¡Hola Kusikuy! 🔥 Quisiera más información.',
      'wa.reserva.greeting': '¡Hola Kusikuy! 🔥 Quiero reservar una mesa:',
      'wa.reserva.name': 'Nombre', 'wa.reserva.date': 'Fecha', 'wa.reserva.time': 'Hora',
      'wa.reserva.people': 'Personas', 'wa.reserva.phone': 'Teléfono', 'wa.reserva.notes': 'Notas',
      'wa.reserva.confirm': '¿Me confirman la reserva? ¡Gracias!',
    },
    en: {
      'nav.menu': 'Menu', 'nav.reservas': 'Reservations', 'nav.local': 'Location', 'nav.pedir': 'Order 🛒',
      'hero.eyebrow': '🔥 Dark Kitchen · Dine-in',
      'hero.tagline': 'Order your <strong>favorite spicy wings</strong> 🔥 · Grills, loaded fries and drinks — takeout or dine-in.',
      'hero.cta.menu': 'See the menu', 'hero.cta.order': 'Order on WhatsApp',
      'hero.badge.1': '🍗 Wings in 5 sauces', 'hero.badge.2': '🥩 Grills',
      'hero.badge.3': '🚴 Delivery via WhatsApp', 'hero.badge.4': '🍽️ Dine-in',
      'menu.title': 'Our <span class="accent">Menu</span>',
      'menu.desc': 'Tap <strong>Add</strong> on whatever you like and build your order. Send it via WhatsApp at the end. 🔥',
      'reservas.title': 'Book your <span class="accent">table</span>',
      'reservas.desc': 'Coming to the restaurant? Book ahead and we’ll have everything ready. Fill out the form and it goes straight to our WhatsApp.',
      'reservas.point.1': '✅ Quick confirmation via WhatsApp',
      'reservas.point.2': '👨‍👩‍👧‍👦 Great for groups and celebrations',
      'reservas.point.3': '🔥 Order your spicy wings ahead of time',
      'form.nombre': 'Name', 'form.nombre.ph': 'Your name',
      'form.fecha': 'Date', 'form.hora': 'Time', 'form.personas': 'Number of people',
      'form.telefono': 'Your phone <span class="opt">(optional)</span>',
      'form.notas': 'Notes <span class="opt">(optional)</span>',
      'form.notas.ph': 'Birthday, table near the window, etc.',
      'form.submit': 'Book via WhatsApp',
      'form.error': 'Please fill in name, date, time and number of people.',
      'local.title': 'Visit our <span class="accent">location</span>',
      'local.address': 'Address', 'local.hours': 'Hours',
      'local.hours.value': 'Mon–Sun · 4:30 p.m. – 11:00 p.m.',
      'local.whatsapp': 'WhatsApp / Orders', 'local.whatsapp.link': 'Message us on WhatsApp',
      'local.follow': 'Follow us', 'local.directions': 'Get directions 🗺️',
      'footer.note': '🔥 Order your favorite spicy wings', 'footer.order': 'Order',
      'footer.made': 'Made with 🔥 for wing lovers.',
      'cart.title': 'Your order 🛒', 'cart.empty': 'Your order is empty. Add something from the menu 🔥',
      'cart.total': 'Total', 'cart.send': 'Send order via WhatsApp',
      'cart.hint': 'We’ll confirm the total with you via WhatsApp.',
      'cart.hint.prices': 'The total may vary depending on sides.',
      'cart.each': 'ea.',
      'dish.add': '+ Add', 'toast.added': 'Added',
      'wa.order.greeting': 'Hi Kusikuy! 🔥 I’d like to place this order:',
      'wa.order.total': 'Approx. total:', 'wa.order.confirm': 'Could you confirm availability and time? Thanks!',
      'wa.generic': 'Hi Kusikuy! 🔥 I’d like more information.',
      'wa.reserva.greeting': 'Hi Kusikuy! 🔥 I’d like to book a table:',
      'wa.reserva.name': 'Name', 'wa.reserva.date': 'Date', 'wa.reserva.time': 'Time',
      'wa.reserva.people': 'People', 'wa.reserva.phone': 'Phone', 'wa.reserva.notes': 'Notes',
      'wa.reserva.confirm': 'Could you confirm the reservation? Thanks!',
    },
  };

  const t = (key) => (I18N[LANG] && I18N[LANG][key] != null) ? I18N[LANG][key] : (I18N.es[key] || key);

  // Etiquetas de variantes (papas/arroz, personal/jarra, etc.)
  const VARIANT_I18N = {
    'Con papas': 'With fries', 'Con arroz': 'With rice',
    'Personal': 'Single', 'Jarra': 'Pitcher', 'Vaso': 'Glass',
  };
  const varLabel = (etq) => (LANG === 'en' && VARIANT_I18N[etq]) ? VARIANT_I18N[etq] : etq;

  // Campos localizados del menú
  const catTitle = (c) => (LANG === 'en' && c.titulo_en) ? c.titulo_en : c.titulo;
  const catNote  = (c) => (LANG === 'en' && c.nota_en) ? c.nota_en : c.nota;
  const itemDesc = (i) => (LANG === 'en' && i.desc_en) ? i.desc_en : i.desc;

  function applyStaticI18n() {
    $$('[data-i18n]').forEach((el) => { el.textContent = t(el.getAttribute('data-i18n')); });
    $$('[data-i18n-html]').forEach((el) => { el.innerHTML = t(el.getAttribute('data-i18n-html')); });
    $$('[data-i18n-ph]').forEach((el) => { el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph'))); });
  }

  function setLang(lang) {
    LANG = (lang === 'en') ? 'en' : 'es';
    try { localStorage.setItem(LANG_KEY, LANG); } catch {}
    document.documentElement.lang = LANG;
    const label = $('#langLabel');
    if (label) label.textContent = (LANG === 'es') ? 'EN' : 'ES';
    applyStaticI18n();
    renderTabs();
    renderMenu();
    renderCart();
    updateWaLinks();
  }

  /* ---------- Estado del carrito ---------- */
  const STORE_KEY = 'kusikuy_cart_v1';
  let cart = load();

  function load() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
    catch { return {}; }
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(cart)); } catch {}
  }

  /* ---------- Render del menú ---------- */
  const menuRoot = $('#menuRoot');
  const menuTabs = $('#menuTabs');

  function renderTabs() {
    menuTabs.innerHTML = '';
    MENU.forEach((cat, i) => {
      const b = document.createElement('button');
      b.className = 'menu-tab' + (i === 0 ? ' is-active' : '');
      b.type = 'button';
      b.textContent = `${cat.icono} ${catTitle(cat)}`;
      b.dataset.target = cat.id;
      b.addEventListener('click', () => {
        $$('.menu-tab').forEach((tb) => tb.classList.remove('is-active'));
        b.classList.add('is-active');
        const el = document.getElementById('cat-' + cat.id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      menuTabs.appendChild(b);
    });
  }

  function priceTag(precio) {
    if (!MOSTRAR_PRECIOS || precio == null) return '';
    return `<span class="dish-price">${fmt(precio)}</span>`;
  }

  function renderMenu() {
    menuRoot.innerHTML = '';
    MENU.forEach((cat) => {
      const section = document.createElement('div');
      section.className = 'menu-cat';
      section.id = 'cat-' + cat.id;

      const nota = catNote(cat);
      const note = nota ? `<p class="menu-cat-note">${nota}</p>` : '';
      section.innerHTML = `
        <div class="menu-cat-head">
          <span class="menu-cat-ico">${cat.icono}</span>
          <h3>${catTitle(cat)}</h3>
        </div>
        ${note}
        <div class="menu-grid"></div>
      `;
      const grid = $('.menu-grid', section);

      cat.items.forEach((item, itemIdx) => {
        const card = document.createElement('article');
        card.className = 'dish';

        const spicy = item.picante ? `<span class="dish-spicy">🌶️ ${LANG === 'en' ? 'spicy' : 'picante'}</span>` : '';
        const dsc = itemDesc(item);
        const desc = dsc ? `<p class="dish-desc">${dsc}</p>` : '';
        const headPrice = (!item.variantes) ? priceTag(item.precio) : '';

        let actions = '';
        if (item.variantes && item.variantes.length) {
          actions = item.variantes.map((v, vIdx) => {
            const vp = (MOSTRAR_PRECIOS && v.precio != null) ? ` <span class="v-price">${fmt(v.precio)}</span>` : '';
            return `<button class="dish-add" type="button"
                      data-key="${keyFor(cat.id, itemIdx, vIdx)}"
                      data-name="${escapeAttr(item.nombre + ' — ' + varLabel(v.etiqueta))}"
                      data-price="${v.precio == null ? '' : v.precio}">
                      + ${escapeHtml(varLabel(v.etiqueta))}${vp}
                    </button>`;
          }).join('');
        } else {
          actions = `<button class="dish-add" type="button"
                      data-key="${keyFor(cat.id, itemIdx)}"
                      data-name="${escapeAttr(item.nombre)}"
                      data-price="${item.precio == null ? '' : item.precio}">
                      ${escapeHtml(t('dish.add'))}
                    </button>`;
        }

        card.innerHTML = `
          <div class="dish-top">
            <h4 class="dish-name">${escapeHtml(item.nombre)} ${spicy}</h4>
            ${headPrice}
          </div>
          ${desc}
          <div class="dish-actions">${actions}</div>
        `;
        grid.appendChild(card);
      });

      menuRoot.appendChild(section);
    });

    $$('.dish-add', menuRoot).forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        const name = btn.dataset.name;
        const price = btn.dataset.price === '' ? null : Number(btn.dataset.price);
        addToCart(key, name, price);
        toast(`${t('toast.added')}: ${name}`);
      });
    });
  }

  /* ---------- Operaciones del carrito ---------- */
  function addToCart(key, name, price) {
    if (cart[key]) cart[key].qty += 1;
    else cart[key] = { name, price, qty: 1 };
    save(); renderCart();
  }
  function changeQty(key, delta) {
    if (!cart[key]) return;
    cart[key].qty += delta;
    if (cart[key].qty <= 0) delete cart[key];
    save(); renderCart();
  }

  const cartItemsEl = $('#cartItems');
  const cartEmptyEl = $('#cartEmpty');
  const cartCountEl = $('#cartCount');
  const cartTotalEl = $('#cartTotal');
  const cartTotalValueEl = $('#cartTotalValue');
  const cartSendBtn = $('#cartSend');
  const cartHintEl = $('#cartHint');
  const fabCart = $('#fabCart');

  function cartEntries() { return Object.entries(cart); }
  function cartCount() { return cartEntries().reduce((s, [, it]) => s + it.qty, 0); }
  function cartHasPrices() {
    return MOSTRAR_PRECIOS && cartEntries().some(([, it]) => it.price != null);
  }
  function cartTotal() {
    return cartEntries().reduce((s, [, it]) => s + (it.price != null ? it.price * it.qty : 0), 0);
  }

  function renderCart() {
    const entries = cartEntries();
    const count = cartCount();

    cartCountEl.textContent = count;
    fabCart.classList.toggle('is-empty', count === 0);

    cartItemsEl.innerHTML = '';
    cartEmptyEl.hidden = count > 0;

    entries.forEach(([key, it]) => {
      const li = document.createElement('li');
      li.className = 'cart-item';
      const priceLine = (MOSTRAR_PRECIOS && it.price != null)
        ? `<div class="cart-item-price">${fmt(it.price)} ${t('cart.each')}</div>` : '';
      li.innerHTML = `
        <div class="cart-item-info">
          <div class="cart-item-name">${escapeHtml(it.name)}</div>
          ${priceLine}
        </div>
        <div class="cart-qty">
          <button type="button" aria-label="-" data-dec>−</button>
          <span>${it.qty}</span>
          <button type="button" aria-label="+" data-inc>+</button>
        </div>
      `;
      $('[data-dec]', li).addEventListener('click', () => changeQty(key, -1));
      $('[data-inc]', li).addEventListener('click', () => changeQty(key, +1));
      cartItemsEl.appendChild(li);
    });

    const showTotal = cartHasPrices();
    cartTotalEl.hidden = !showTotal;
    if (showTotal) cartTotalValueEl.textContent = fmt(cartTotal());
    cartHintEl.textContent = showTotal ? t('cart.hint.prices') : t('cart.hint');

    cartSendBtn.disabled = count === 0;
  }

  function buildOrderMessage() {
    const lines = [t('wa.order.greeting'), ''];
    cartEntries().forEach(([, it]) => {
      const sub = (MOSTRAR_PRECIOS && it.price != null) ? `  (${fmt(it.price * it.qty)})` : '';
      lines.push(`• ${it.qty}x ${it.name}${sub}`);
    });
    if (cartHasPrices()) { lines.push('', `${t('wa.order.total')} ${fmt(cartTotal())}`); }
    lines.push('', t('wa.order.confirm'));
    return lines.join('\n');
  }

  cartSendBtn.addEventListener('click', () => {
    if (cartCount() === 0) return;
    window.open(waLink(buildOrderMessage()), '_blank', 'noopener');
  });

  /* ---------- Panel del carrito ---------- */
  const cartPanel = $('#cartPanel');
  const cartOverlay = $('#cartOverlay');

  function openCart() {
    cartPanel.classList.add('is-open');
    cartPanel.setAttribute('aria-hidden', 'false');
    cartOverlay.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    cartPanel.classList.remove('is-open');
    cartPanel.setAttribute('aria-hidden', 'true');
    cartOverlay.hidden = true;
    document.body.style.overflow = '';
  }
  $$('[data-open-cart]').forEach((el) =>
    el.addEventListener('click', (e) => { e.preventDefault(); openCart(); }));
  $('#cartClose').addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeCart(); });

  /* ---------- Reservas por WhatsApp ---------- */
  const reservaForm = $('#reservaForm');
  const reservaError = $('#reservaError');

  reservaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = $('#rName').value.trim();
    const fecha  = $('#rDate').value;
    const hora   = $('#rTime').value;
    const pers   = $('#rPeople').value;
    const tel    = $('#rPhone').value.trim();
    const notas  = $('#rNotes').value.trim();

    if (!nombre || !fecha || !hora || !pers) {
      reservaError.textContent = t('form.error');
      reservaError.hidden = false;
      return;
    }
    reservaError.hidden = true;

    const msg = [
      t('wa.reserva.greeting'),
      '',
      `• ${t('wa.reserva.name')}: ${nombre}`,
      `• ${t('wa.reserva.date')}: ${formatFecha(fecha)}`,
      `• ${t('wa.reserva.time')}: ${hora}`,
      `• ${t('wa.reserva.people')}: ${pers}`,
      tel ? `• ${t('wa.reserva.phone')}: ${tel}` : null,
      notas ? `• ${t('wa.reserva.notes')}: ${notas}` : null,
      '',
      t('wa.reserva.confirm'),
    ].filter(Boolean).join('\n');

    window.open(waLink(msg), '_blank', 'noopener');
  });

  function formatFecha(iso) {
    try {
      const [y, m, d] = iso.split('-').map(Number);
      const dt = new Date(y, m - 1, d);
      return dt.toLocaleDateString(LANG === 'en' ? 'en-US' : 'es-PE',
        { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    } catch { return iso; }
  }

  /* ---------- Enlaces de WhatsApp / contacto ---------- */
  const fabWhatsapp = $('#fabWhatsapp');
  const localWhatsapp = $('#localWhatsapp');
  function updateWaLinks() {
    const href = waLink(t('wa.generic'));
    if (fabWhatsapp) fabWhatsapp.href = href;
    if (localWhatsapp) localWhatsapp.href = href;
  }

  /* ---------- Idioma ---------- */
  const langToggle = $('#langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => setLang(LANG === 'es' ? 'en' : 'es'));
  }

  /* ---------- Navegación móvil ---------- */
  const navToggle = $('#navToggle');
  const nav = $('#nav');
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  $$('.nav-link', nav).forEach((l) =>
    l.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }));

  /* ---------- Toast ---------- */
  const toastEl = $('#toast');
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('is-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-show'), 1800);
  }

  /* ---------- Helpers de escape ---------- */
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));
  }
  function escapeAttr(s) { return escapeHtml(s); }

  /* ---------- Año del footer ---------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Init ---------- */
  setLang(LANG); // aplica idioma + renderiza tabs, menú y carrito
})();
