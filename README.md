# TeatroCR + cartelera web

Incluye el sitio estático y una API Node.js para buscar funciones por fecha.

## Arquitectura
- `index.html`: GitHub Pages. Conserva directorio, artistas, escuelas, ES/EN, accesibilidad y dark/light mode; añade Cartelera.
- `api/`: Express. Consulta fuentes públicas, normaliza resultados, aplica caché y devuelve JSON.
- Fuente en vivo incluida: Teatro Nacional de Costa Rica.
- Semillas verificadas: funciones concretas publicadas por la boletería del Teatro Popular Melico Salazar.
- Descubrimiento web opcional: Google Programmable Search JSON API. Requiere `GOOGLE_CSE_API_KEY` y `GOOGLE_CSE_ID`.

## Ejecutar local
1. Node.js 20+.
2. `cd api && npm install`
3. Copiar `.env.example` a `.env` si usa un cargador de variables o exportar las variables en el sistema.
4. `npm start`
5. Servir la raíz con `python -m http.server 5500` y abrir `http://localhost:5500`.

## Publicación
1. Publique `index.html` en GitHub Pages.
2. Publique la carpeta `api` en Render/Railway/Fly.io u otro host Node.
3. En `index.html`, cambie `https://TU-API-TEATROCR.onrender.com` por la URL real del backend.
4. Configure `ALLOWED_ORIGINS=https://USUARIO.github.io` en el backend.
5. Opcional: configure Google CSE para descubrimiento web. Restrinja la búsqueda a fuentes de confianza cuando sea posible.

## API
`GET /api/shows?date=2026-09-25&province=San%20José&type=teatro`

Respuesta: `{ date, items, errors, notice, cached }`.

## Seguridad y calidad de datos
No se ejecuta HTML de las fuentes. El frontend escapa los textos recibidos. Helmet y CORS están habilitados. La API usa timeout y caché. Los resultados enlazan a la fuente original porque horarios, precios y disponibilidad pueden cambiar.

## Importante
El scraping depende de la estructura de sitios de terceros y puede romperse cuando cambian. Para producción, lo ideal es conseguir feeds/APIs o acuerdos con teatros y mantener adaptadores por fuente. Respete robots.txt, términos de uso y límites de cada sitio. No almacene ni redistribuya contenido protegido más allá de metadatos necesarios.
