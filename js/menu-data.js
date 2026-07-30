/* ============================================================
   Kusikuy Dark Kitchen — Datos del menú
   ------------------------------------------------------------
   ESTE ES EL ÚNICO ARCHIVO QUE NECESITAS EDITAR PARA EL MENÚ.

   PRECIOS:
   - Todos los precios están como `null` a propósito.
   - Cuando quieras mostrar precios: cambia MOSTRAR_PRECIOS a true
     y reemplaza cada `null` por el número (ej. precio: 19).
   - Con MOSTRAR_PRECIOS = false, la web NO muestra precios ni
     subtotales en el carrito (queda todo "a consultar").

   CONTACTO / WHATSAPP:
   - Cambia WHATSAPP_NUMERO por el número real en formato
     internacional SIN "+", sin espacios (ej. Perú: 51987654321).
   ============================================================ */

/* ---- Config general (EDITAR) ---- */
const MOSTRAR_PRECIOS = false;                 // ← pon true cuando quieras mostrar precios
const WHATSAPP_NUMERO = '51999999999';         // ← EDITAR: número real (51 + celular)
const MONEDA = 'S/';

/* Enlace de Google Maps del local (EDITAR si cambia) */
const MAPS_LINK = 'https://maps.app.goo.gl/ksJ84mwEpHF5Vq9p9';

/* ------------------------------------------------------------
   MENÚ
   Cada categoría: { id, titulo, icono, nota?, items: [...] }
   Cada item:
     { nombre, desc?, precio, picante?, variantes? }
   - precio: número o null (null = sin precio visible)
   - variantes: [{ etiqueta, precio }]  (para papas/arroz, vaso/jarra, etc.)
   ------------------------------------------------------------ */
const MENU = [
  {
    id: 'alitas',
    titulo: 'Alitas',
    icono: '🔥',
    nota: 'Todas nuestras alitas van acompañadas de papas fritas.',
    items: [
      { nombre: 'Alitas Kusikuy Acevichadas', desc: 'Deliciosas alitas en salsa acevichada + papas fritas.', precio: null, picante: true },
      { nombre: 'Alitas Kusikuy', desc: 'Sabor de la casa estilo parrillera + papas fritas.', precio: null, picante: true },
      { nombre: 'Alitas Sauce', desc: 'Mostaza con miel + papas fritas.', precio: null },
      { nombre: 'Alitas BBQ', desc: 'Salsa agridulce + papas fritas.', precio: null },
      { nombre: 'Alitas Maracuyá', desc: 'Salsa de maracuyá + papas fritas.', precio: null },
    ],
  },
  {
    id: 'salchipapas',
    titulo: 'Salchipapas y Sándwich',
    icono: '🍟',
    items: [
      { nombre: 'Salchipapa', desc: 'Salchicha y papas fritas.', precio: null },
      { nombre: 'Nuggets (6)', desc: '6 nuggets crocantes.', precio: null },
      { nombre: 'Salchi Huevo', desc: 'Salchipapa con huevo.', precio: null },
      { nombre: 'Salchi Acevichada', desc: 'En salsa acevichada.', precio: null, picante: true },
      { nombre: 'Salchi Nuggets (4)', desc: 'Con 4 nuggets.', precio: null },
      { nombre: 'Salchi Nuggets Acevichada', desc: 'Nuggets en salsa acevichada.', precio: null, picante: true },
      { nombre: 'Salchi Kusikuy', desc: 'Deliciosa salchicha y queso local + papas fritas.', precio: null },
      { nombre: 'Sándwich', desc: 'Hamburguesa casera de carne o pollo con pan local + papas fritas.', precio: null },
    ],
  },
  {
    id: 'parrillas',
    titulo: 'Parrillas',
    icono: '🥩',
    nota: '+ acompañamiento a elección y ensalada fresca.',
    items: [
      { nombre: 'Parrilla de Res', variantes: [ { etiqueta: 'Con papas', precio: null }, { etiqueta: 'Con arroz', precio: null } ] },
      { nombre: 'Chuleta de Cerdo', variantes: [ { etiqueta: 'Con papas', precio: null }, { etiqueta: 'Con arroz', precio: null } ] },
      { nombre: 'Filete de Pollo', variantes: [ { etiqueta: 'Con papas', precio: null }, { etiqueta: 'Con arroz', precio: null } ] },
      { nombre: 'Mollejas', precio: null },
      { nombre: 'Anticucho de Corazón', precio: null },
    ],
  },
  {
    id: 'extras',
    titulo: 'Extras',
    icono: '🍽️',
    items: [
      { nombre: 'Lomo Saltado', precio: null },
      { nombre: 'Pollo Saltado', precio: null },
      { nombre: 'Tallarín Saltado de Carne', precio: null },
      { nombre: 'Tallarín Saltado de Pollo', precio: null },
      { nombre: 'Lomo Saltado Montado', precio: null },
      { nombre: 'Sudado de Carne', precio: null },
    ],
  },
  {
    id: 'calientes',
    titulo: 'Bebidas Calientes',
    icono: '☕',
    items: [
      { nombre: 'Vino Caliente', desc: 'Vino, ron, especias y jugo de naranja.', variantes: [ { etiqueta: 'Personal', precio: null }, { etiqueta: 'Jarra', precio: null } ] },
      { nombre: 'Huajsapata', desc: 'Vino, pisco, jugo de naranja y especias.', variantes: [ { etiqueta: 'Personal', precio: null }, { etiqueta: 'Jarra', precio: null } ] },
      { nombre: 'Calientito Kusikuy', desc: 'Frutas exóticas, especias y vodka.', variantes: [ { etiqueta: 'Jarra', precio: null } ] },
      { nombre: 'Té Piteado', desc: 'Té con canela, clavo, cáscara de naranja, anisado y pisco. Clásico / Uva / Naranja / Durazno.', variantes: [ { etiqueta: 'Jarra', precio: null } ] },
      { nombre: 'Té Frutado', desc: 'Té de fruta natural con canela y clavo. Fresa / Frutos rojos / Frutos del bosque.', variantes: [ { etiqueta: 'Jarra', precio: null } ] },
    ],
  },
  {
    id: 'infusiones',
    titulo: 'Infusiones y Café',
    icono: '🍵',
    items: [
      { nombre: 'Infusiones', desc: 'Té, manzanilla, hierba luisa, anís, coca, muña, té naranja, té durazno.', precio: null },
      { nombre: 'Café Pasado', desc: 'Café de grano recién pasado.', precio: null },
    ],
  },
  {
    id: 'jugos',
    titulo: 'Jugos',
    icono: '🧃',
    items: [
      { nombre: 'Limonada', variantes: [ { etiqueta: 'Vaso', precio: null }, { etiqueta: 'Jarra', precio: null } ] },
      { nombre: 'Maracuyá', variantes: [ { etiqueta: 'Vaso', precio: null }, { etiqueta: 'Jarra', precio: null } ] },
      { nombre: 'Chicha Morada', variantes: [ { etiqueta: 'Vaso', precio: null }, { etiqueta: 'Jarra', precio: null } ] },
      { nombre: 'Piña', variantes: [ { etiqueta: 'Vaso', precio: null }, { etiqueta: 'Jarra', precio: null } ] },
    ],
  },
  {
    id: 'gaseosas',
    titulo: 'Gaseosas y Agua',
    icono: '🥤',
    items: [
      { nombre: 'Coca Cola', variantes: [ { etiqueta: '500 ml', precio: null }, { etiqueta: '1 L', precio: null }, { etiqueta: '2.5 L', precio: null } ] },
      { nombre: 'Inca Kola', variantes: [ { etiqueta: '500 ml', precio: null }, { etiqueta: '1 L', precio: null }, { etiqueta: '2.5 L', precio: null } ] },
      { nombre: 'Fanta', variantes: [ { etiqueta: '500 ml', precio: null } ] },
      { nombre: 'Sprite', variantes: [ { etiqueta: '500 ml', precio: null } ] },
      { nombre: 'Agua', variantes: [ { etiqueta: '500 ml', precio: null } ] },
    ],
  },
];
