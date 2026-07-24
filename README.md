# La Casa de las Sopas

Sitio web de una sola página para **La Casa de las Sopas**, caldos y sopas
caseras en San Miguel, Lima.

> Av. de la Marina 1541, San Miguel 15086 · Lima, Perú

Hecho con **HTML, CSS y JavaScript puro** — sin frameworks, sin paso de
compilación. Se abre en cualquier navegador y se publica en cualquier hosting.

---

## Ver el sitio

Abre `index.html` en tu navegador, o levanta un servidor local:

```bash
python3 -m http.server 8000
# luego abre http://localhost:8000
```

## Estructura

```
index.html    → contenido y secciones
styles.css    → todo el diseño (colores y tipografías al inicio, en :root)
script.js     → menú móvil, sopa del día, validación de la reserva, animaciones
assets/       → aquí van tus fotos
```

## Cómo personalizar

Busca la palabra **`REEMPLAZAR`** dentro de `index.html`: marca cada dato que
debes cambiar por el real.

- **Teléfono / WhatsApp** → sección *Visítanos* y *Footer*.
- **Horarios** → sección *Visítanos* y *Footer* (ahora dice Lun–Dom 8:00–17:00;
  confírmalo).
- **Redes sociales** → enlaces del *Footer*.
- **Carta y precios** → sección `<!-- CARTA -->`. Los precios están en soles.
- **Sopa del día** → sección `<!-- SOPA DEL DÍA -->`. El día actual se resalta
  solo, según la fecha del visitante.

### Cambiar colores y tipografías

Todo está en la parte de arriba de `styles.css`, en `:root`:

```css
--enamel:   #123b57;  /* azul de la olla de peltre  */
--caldo:    #e8a83a;  /* dorado del caldo (acento)  */
--culantro: #567d3e;  /* verde                      */
--rocoto:   #c6472f;  /* rojo ají                   */
```

Las fuentes son **Fraunces** (títulos) y **Hanken Grotesk** (texto), cargadas
desde Google Fonts en el `<head>`.

### Poner fotos reales

Las fotos son marcadores de color (`<div class="dish-photo">`). Para usar una
foto real, reemplaza el bloque por una imagen:

```html
<img class="dish-photo dish-photo--a" src="assets/caldo-de-gallina.jpg"
     alt="Caldo de gallina humeante">
```

Usa fotos horizontales de buena calidad (idealmente 1200 px de ancho o más) y
guárdalas en `assets/`.

## El formulario de reservas

Ahora el formulario **valida los datos y muestra una confirmación**, pero todavía
**no envía la reserva a ningún lado** (no hay servidor). Para recibir las
reservas de verdad tienes dos caminos fáciles:

1. **Correo con [Formspree](https://formspree.io)** (gratis para empezar):
   crea un formulario, copia tu URL y añádela al `<form>`:
   ```html
   <form class="rform" action="https://formspree.io/f/TU_ID" method="POST">
   ```
   y quita la línea `e.preventDefault();` de `script.js`.

2. **WhatsApp:** puedo cambiar el botón para que arme un mensaje con los datos
   y lo abra en tu WhatsApp. Solo dime el número.

## El mapa

El mapa de la sección *Visítanos* se carga desde Google Maps con la dirección
del local. No necesita clave ni configuración.

## Publicar (gratis)

Cualquiera de estos sirve, subiendo los archivos tal cual:

- **GitHub Pages** — activa Pages en la rama del repositorio.
- **Netlify** o **Vercel** — arrastra la carpeta o conecta el repo.

---

Hecho con caldo en San Miguel.
