# 🔥 Kusikuy Dark Kitchen — Web

Sitio web estático (sin servidor) para **Kusikuy Dark Kitchen**: menú por categorías,
pedidos por **WhatsApp** con carrito, formulario de **reservas** por WhatsApp e
información del **local presencial** con Google Maps.

## 📂 Estructura

```
index.html          # La página (una sola página con secciones)
css/styles.css      # Estilos (tema oscuro neón/fuego, responsive)
js/menu-data.js     # ← EDITA AQUÍ el menú, precios y datos de contacto
js/app.js           # Lógica: render del menú, carrito, WhatsApp, reservas
```

## ✏️ Cómo editar (todo lo importante está en `js/menu-data.js`)

### 1) Número de WhatsApp
```js
const WHATSAPP_NUMERO = '51999999999'; // 51 (Perú) + celular, sin +, sin espacios
```

### 2) Mostrar los precios
Por pedido del cliente, **los precios están ocultos**. Para activarlos:
```js
const MOSTRAR_PRECIOS = true; // cambia false → true
```
Luego reemplaza cada `precio: null` por el número real, por ejemplo:
```js
{ nombre: 'Alitas BBQ', desc: '...', precio: 19 },
// y en variantes:
{ nombre: 'Parrilla de Res', variantes: [
  { etiqueta: 'Con papas', precio: 20 },
  { etiqueta: 'Con arroz', precio: 22 },
]},
```
Con `MOSTRAR_PRECIOS = false` no se muestra ningún precio ni el total del carrito
(todo queda “a consultar por WhatsApp”), aunque hayas llenado los números.

### 3) Datos del local (en `index.html`, busca los comentarios `EDITAR`)
- **Dirección** y **horario** (sección "Local").
- **Redes sociales**: reemplaza los `href="#"` de Instagram / Facebook / TikTok.
- **Mapa**: en el `<iframe>` reemplaza el `src` por el *embed* real de tu local
  (Google Maps → **Compartir** → **Insertar un mapa** → copia el enlace del `src`).
- El botón **“Cómo llegar”** ya usa tu enlace de Google Maps.

## ▶️ Probar en local
```bash
# Opción 1: abrir index.html directo en el navegador
# Opción 2 (recomendada):
python3 -m http.server 8000
# y abre http://localhost:8000
```

## 🚀 Publicar gratis (GitHub Pages)
1. Sube el repo a GitHub.
2. **Settings → Pages → Build and deployment → Deploy from a branch**.
3. Elige la rama y carpeta `/root`, guarda. En 1–2 min tendrás una URL pública.

## ✅ Funciona así
- **Pedido:** el cliente toca “Agregar”, arma su carrito y pulsa
  **“Enviar pedido por WhatsApp”** → se abre WhatsApp con el mensaje listo.
- **Reservas:** el formulario arma un mensaje con nombre, fecha, hora y personas,
  y lo envía por WhatsApp.
- Todo sucede en el navegador; no se guardan datos en ningún servidor.
