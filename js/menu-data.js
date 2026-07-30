/* ============================================================
   Kusikuy Dark Kitchen — Datos del menú
   ------------------------------------------------------------
   ESTE ES EL ÚNICO ARCHIVO QUE NECESITAS EDITAR PARA EL MENÚ.

   PRECIOS:
   - Cambia MOSTRAR_PRECIOS a false para ocultar todos los precios.
   - Cada precio es un número (ej. precio: 19) o null (sin precio).

   CONTACTO / WHATSAPP:
   - Cambia WHATSAPP_NUMERO por el número real en formato
     internacional SIN "+", sin espacios (ej. Perú: 51987654321).

   IDIOMAS (ES / EN):
   - Cada categoría/plato puede tener su versión en inglés en los
     campos *_en (titulo_en, nota_en, desc_en). Si falta, se usa el
     español. Los nombres de los platos se mantienen igual en ambos.
   ============================================================ */

/* ---- Config general (EDITAR) ---- */
const MOSTRAR_PRECIOS = true;                  // ← precios visibles
const WHATSAPP_NUMERO = '51999999999';         // ← EDITAR: número real (51 + celular)
const MONEDA = 'S/';

/* Enlace de Google Maps del local (EDITAR si cambia) */
const MAPS_LINK = 'https://maps.app.goo.gl/ksJ84mwEpHF5Vq9p9';

/* ------------------------------------------------------------
   MENÚ
   Cada item: { nombre, desc?, desc_en?, precio, picante?, variantes? }
   ------------------------------------------------------------ */
const MENU = [
  {
    id: 'alitas',
    titulo: 'Alitas', titulo_en: 'Wings',
    icono: '🔥',
    nota: 'Todas nuestras alitas van acompañadas de papas fritas.',
    nota_en: 'All our wings come with a side of fries.',
    items: [
      { nombre: 'Alitas Kusikuy Acevichadas', desc: 'Deliciosas alitas en salsa acevichada + papas fritas.', desc_en: 'Wings in "acevichada" (ceviche-style) sauce + fries.', precio: 20, picante: true },
      { nombre: 'Alitas Kusikuy', desc: 'Sabor de la casa estilo parrillera + papas fritas.', desc_en: 'House flavor, grill style + fries.', precio: 19, picante: true },
      { nombre: 'Alitas Sauce', desc: 'Mostaza con miel + papas fritas.', desc_en: 'Honey mustard + fries.', precio: 19 },
      { nombre: 'Alitas BBQ', desc: 'Salsa agridulce + papas fritas.', desc_en: 'Sweet & sour BBQ + fries.', precio: 19 },
      { nombre: 'Alitas Maracuyá', desc: 'Salsa de maracuyá + papas fritas.', desc_en: 'Passion fruit sauce + fries.', precio: 19 },
    ],
  },
  {
    id: 'salchipapas',
    titulo: 'Salchipapas y Sándwich', titulo_en: 'Loaded Fries & Sandwich',
    icono: '🍟',
    items: [
      { nombre: 'Salchipapa', desc: 'Salchicha y papas fritas.', desc_en: 'Sausage and fries.', precio: 10 },
      { nombre: 'Nuggets (6)', desc: '6 nuggets crocantes.', desc_en: '6 crispy nuggets.', precio: 10 },
      { nombre: 'Salchi Huevo', desc: 'Salchipapa con huevo.', desc_en: 'Loaded fries with egg.', precio: 12 },
      { nombre: 'Salchi Acevichada', desc: 'En salsa acevichada.', desc_en: 'In acevichada sauce.', precio: 14, picante: true },
      { nombre: 'Salchi Nuggets (4)', desc: 'Con 4 nuggets.', desc_en: 'With 4 nuggets.', precio: 15 },
      { nombre: 'Salchi Nuggets Acevichada', desc: 'Nuggets en salsa acevichada.', desc_en: 'Nuggets in acevichada sauce.', precio: 19, picante: true },
      { nombre: 'Salchi Kusikuy', desc: 'Deliciosa salchicha y queso local + papas fritas.', desc_en: 'Sausage and local cheese + fries.', precio: 12 },
      { nombre: 'Sándwich', desc: 'Hamburguesa casera de carne o pollo con pan local + papas fritas.', desc_en: 'Homemade beef or chicken burger with local bread + fries.', precio: 8 },
    ],
  },
  {
    id: 'parrillas',
    titulo: 'Parrillas', titulo_en: 'Grills',
    icono: '🥩',
    nota: '+ acompañamiento a elección y ensalada fresca.',
    nota_en: '+ side of your choice and fresh salad.',
    items: [
      { nombre: 'Parrilla de Res', variantes: [ { etiqueta: 'Con papas', precio: 20 }, { etiqueta: 'Con arroz', precio: 22 } ] },
      { nombre: 'Chuleta de Cerdo', variantes: [ { etiqueta: 'Con papas', precio: 20 }, { etiqueta: 'Con arroz', precio: 22 } ] },
      { nombre: 'Filete de Pollo', variantes: [ { etiqueta: 'Con papas', precio: 20 }, { etiqueta: 'Con arroz', precio: 22 } ] },
      { nombre: 'Mollejas', precio: 18 },
      { nombre: 'Anticucho de Corazón', precio: 18 },
    ],
  },
  {
    id: 'extras',
    titulo: 'Extras', titulo_en: 'Extras',
    icono: '🍽️',
    items: [
      { nombre: 'Lomo Saltado', precio: 20 },
      { nombre: 'Pollo Saltado', precio: 22 },
      { nombre: 'Tallarín Saltado de Carne', precio: 20 },
      { nombre: 'Tallarín Saltado de Pollo', precio: 22 },
      { nombre: 'Lomo Saltado Montado', precio: 22 },
      { nombre: 'Sudado de Carne', precio: 18 },
    ],
  },
  {
    id: 'calientes',
    titulo: 'Bebidas Calientes', titulo_en: 'Hot Drinks',
    icono: '☕',
    items: [
      { nombre: 'Vino Caliente', desc: 'Vino, ron, especias y jugo de naranja.', desc_en: 'Wine, rum, spices and orange juice.', variantes: [ { etiqueta: 'Personal', precio: 12 }, { etiqueta: 'Jarra', precio: 35 } ] },
      { nombre: 'Huajsapata', desc: 'Vino, pisco, jugo de naranja y especias.', desc_en: 'Wine, pisco, orange juice and spices.', variantes: [ { etiqueta: 'Personal', precio: 12 }, { etiqueta: 'Jarra', precio: 35 } ] },
      { nombre: 'Calientito Kusikuy', desc: 'Frutas exóticas, especias y vodka.', desc_en: 'Exotic fruits, spices and vodka.', variantes: [ { etiqueta: 'Jarra', precio: 35 } ] },
      { nombre: 'Té Piteado', desc: 'Té con canela, clavo, cáscara de naranja, anisado y pisco. Clásico / Uva / Naranja / Durazno.', desc_en: 'Tea with cinnamon, clove, orange peel, anise and pisco. Classic / Grape / Orange / Peach.', variantes: [ { etiqueta: 'Jarra', precio: 35 } ] },
      { nombre: 'Té Frutado', desc: 'Té de fruta natural con canela y clavo. Fresa / Frutos rojos / Frutos del bosque.', desc_en: 'Natural fruit tea with cinnamon and clove. Strawberry / Red berries / Forest berries.', variantes: [ { etiqueta: 'Jarra', precio: 35 } ] },
    ],
  },
  {
    id: 'infusiones',
    titulo: 'Infusiones y Café', titulo_en: 'Teas & Coffee',
    icono: '🍵',
    items: [
      { nombre: 'Infusiones', desc: 'Té, manzanilla, hierba luisa, anís, coca, muña, té naranja, té durazno.', desc_en: 'Tea, chamomile, lemon verbena, anise, coca, muña, orange tea, peach tea.', precio: 4 },
      { nombre: 'Café Pasado', desc: 'Café de grano recién pasado.', desc_en: 'Freshly brewed coffee.', precio: 6 },
    ],
  },
  {
    id: 'jugos',
    titulo: 'Jugos', titulo_en: 'Juices',
    icono: '🧃',
    items: [
      { nombre: 'Limonada', variantes: [ { etiqueta: 'Vaso', precio: 10 }, { etiqueta: 'Jarra', precio: 20 } ] },
      { nombre: 'Maracuyá', variantes: [ { etiqueta: 'Vaso', precio: 8 }, { etiqueta: 'Jarra', precio: 15 } ] },
      { nombre: 'Chicha Morada', variantes: [ { etiqueta: 'Vaso', precio: 8 }, { etiqueta: 'Jarra', precio: 15 } ] },
      { nombre: 'Piña', variantes: [ { etiqueta: 'Vaso', precio: 8 }, { etiqueta: 'Jarra', precio: 15 } ] },
    ],
  },
  {
    id: 'gaseosas',
    titulo: 'Gaseosas y Agua', titulo_en: 'Sodas & Water',
    icono: '🥤',
    items: [
      { nombre: 'Coca Cola', variantes: [ { etiqueta: '500 ml', precio: 4 }, { etiqueta: '1 L', precio: 7 }, { etiqueta: '2.5 L', precio: 12 } ] },
      { nombre: 'Inca Kola', variantes: [ { etiqueta: '500 ml', precio: 4 }, { etiqueta: '1 L', precio: 7 }, { etiqueta: '2.5 L', precio: 12 } ] },
      { nombre: 'Fanta', variantes: [ { etiqueta: '500 ml', precio: 4 } ] },
      { nombre: 'Sprite', variantes: [ { etiqueta: '500 ml', precio: 4 } ] },
      { nombre: 'Agua', variantes: [ { etiqueta: '500 ml', precio: 3 } ] },
    ],
  },
];
