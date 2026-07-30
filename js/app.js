/* ============================================================
   Kusikuy Dark Kitchen — Lógica de la web
   - Render del menú desde MENU (menu-data.js)
   - Carrito con localStorage
   - Pedido y reservas por WhatsApp (deep link wa.me)
   Depende de: MENU, MOSTRAR_PRECIOS, WHATSAPP_NUMERO, MONEDA, MAPS_LINK
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Utilidades ---------- */
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const fmt = (n) => `${MONEDA} ${Number(n).toFixed(2)}`;
  const waLink = (texto) => `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;

  // ID estable por item/variante para el carrito
  const keyFor = (catId, itemIdx, varIdx) =>
    `${catId}:${itemIdx}${varIdx == null ? '' : ':' + varIdx}`;

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
      b.textContent = `${cat.icono} ${cat.titulo}`;
      b.dataset.target = cat.id;
      b.addEventListener('click', () => {
        $$('.menu-tab').forEach((t) => t.classList.remove('is-active'));
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

      const note = cat.nota ? `<p class="menu-cat-note">${cat.nota}</p>` : '';
      section.innerHTML = `
        <div class="menu-cat-head">
          <span class="menu-cat-ico">${cat.icono}</span>
          <h3>${cat.titulo}</h3>
        </div>
        ${note}
        <div class="menu-grid"></div>
      `;
      const grid = $('.menu-grid', section);

      cat.items.forEach((item, itemIdx) => {
        const card = document.createElement('article');
        card.className = 'dish';

        const spicy = item.picante ? '<span class="dish-spicy">🌶️ picante</span>' : '';
        const desc  = item.desc ? `<p class="dish-desc">${item.desc}</p>` : '';

        // Precio mostrado en la cabecera solo si es item simple con precio
        const headPrice = (!item.variantes) ? priceTag(item.precio) : '';

        // Botones de acción (uno por variante, o uno simple)
        let actions = '';
        if (item.variantes && item.variantes.length) {
          actions = item.variantes.map((v, vIdx) => {
            const vp = (MOSTRAR_PRECIOS && v.precio != null) ? ` <span class="v-price">${fmt(v.precio)}</span>` : '';
            return `<button class="dish-add" type="button"
                      data-key="${keyFor(cat.id, itemIdx, vIdx)}"
                      data-name="${escapeAttr(item.nombre + ' — ' + v.etiqueta)}"
                      data-price="${v.precio == null ? '' : v.precio}">
                      + ${escapeHtml(v.etiqueta)}${vp}
                    </button>`;
          }).join('');
        } else {
          actions = `<button class="dish-add" type="button"
                      data-key="${keyFor(cat.id, itemIdx)}"
                      data-name="${escapeAttr(item.nombre)}"
                      data-price="${item.precio == null ? '' : item.precio}">
                      + Agregar
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

    // Delegación: agregar al carrito
    $$('.dish-add', menuRoot).forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.key;
        const name = btn.dataset.name;
        const price = btn.dataset.price === '' ? null : Number(btn.dataset.price);
        addToCart(key, name, price);
        toast(`Agregado: ${name}`);
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

    // Contador flotante
    cartCountEl.textContent = count;
    fabCart.classList.toggle('is-empty', count === 0);

    // Lista
    cartItemsEl.innerHTML = '';
    cartEmptyEl.hidden = count > 0;

    entries.forEach(([key, it]) => {
      const li = document.createElement('li');
      li.className = 'cart-item';
      const priceLine = (MOSTRAR_PRECIOS && it.price != null)
        ? `<div class="cart-item-price">${fmt(it.price)} c/u</div>` : '';
      li.innerHTML = `
        <div class="cart-item-info">
          <div class="cart-item-name">${escapeHtml(it.name)}</div>
          ${priceLine}
        </div>
        <div class="cart-qty">
          <button type="button" aria-label="Quitar uno" data-dec>−</button>
          <span>${it.qty}</span>
          <button type="button" aria-label="Agregar uno" data-inc>+</button>
        </div>
      `;
      $('[data-dec]', li).addEventListener('click', () => changeQty(key, -1));
      $('[data-inc]', li).addEventListener('click', () => changeQty(key, +1));
      cartItemsEl.appendChild(li);
    });

    // Total
    const showTotal = cartHasPrices();
    cartTotalEl.hidden = !showTotal;
    if (showTotal) cartTotalValueEl.textContent = fmt(cartTotal());
    cartHintEl.textContent = showTotal
      ? 'El total puede variar según acompañamientos.'
      : 'Confirmamos el total contigo por WhatsApp.';

    // Botón enviar
    cartSendBtn.disabled = count === 0;
  }

  function buildOrderMessage() {
    const lines = ['¡Hola Kusikuy! 🔥 Quiero hacer este pedido:', ''];
    cartEntries().forEach(([, it]) => {
      const sub = (MOSTRAR_PRECIOS && it.price != null) ? `  (${fmt(it.price * it.qty)})` : '';
      lines.push(`• ${it.qty}x ${it.name}${sub}`);
    });
    if (cartHasPrices()) { lines.push('', `Total aprox.: ${fmt(cartTotal())}`); }
    lines.push('', '¿Me confirman disponibilidad y tiempo? ¡Gracias!');
    return lines.join('\n');
  }

  cartSendBtn.addEventListener('click', () => {
    if (cartCount() === 0) return;
    window.open(waLink(buildOrderMessage()), '_blank', 'noopener');
  });

  /* ---------- Panel del carrito (abrir/cerrar) ---------- */
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
      reservaError.textContent = 'Completa nombre, fecha, hora y número de personas.';
      reservaError.hidden = false;
      return;
    }
    reservaError.hidden = true;

    const fechaFmt = formatFecha(fecha);
    const msg = [
      '¡Hola Kusikuy! 🔥 Quiero reservar una mesa:',
      '',
      `• Nombre: ${nombre}`,
      `• Fecha: ${fechaFmt}`,
      `• Hora: ${hora}`,
      `• Personas: ${pers}`,
      tel ? `• Teléfono: ${tel}` : null,
      notas ? `• Notas: ${notas}` : null,
      '',
      '¿Me confirman la reserva? ¡Gracias!',
    ].filter(Boolean).join('\n');

    window.open(waLink(msg), '_blank', 'noopener');
  });

  function formatFecha(iso) {
    try {
      const [y, m, d] = iso.split('-').map(Number);
      const dt = new Date(y, m - 1, d);
      return dt.toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    } catch { return iso; }
  }

  /* ---------- Enlaces de WhatsApp / contacto ---------- */
  const genericMsg = '¡Hola Kusikuy! 🔥 Quisiera más información.';
  const fabWhatsapp = $('#fabWhatsapp');
  const localWhatsapp = $('#localWhatsapp');
  if (fabWhatsapp)  fabWhatsapp.href = waLink(genericMsg);
  if (localWhatsapp) localWhatsapp.href = waLink(genericMsg);

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
  renderTabs();
  renderMenu();
  renderCart();
})();
