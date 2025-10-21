Coffee Management — File Structure (English)

This document summarizes where the main project files live and how to reference them from pages in different folders.

Repository layout

```
coffee-management/
├─ index.html        # Main homepage (root)
├─ html/             # Additional pages (login, cart, order, etc.)
├─ css/              # Stylesheets (style.css is the main file)
├─ js/               # JavaScript files (main.js, cart.js, ...)
├─ images/           # Images and media
└─ fontawesome-free-7.1.0-web/  # Local Font Awesome assets
```

Linking rules

- From root pages (e.g. `index.html`):
  - CSS: `href="css/filename.css"`
  - JS: `src="js/filename.js"`
  - Image: `src="images/filename.png"`
  - HTML: `href="html/filename.html"`

- From pages inside `html/` (e.g. `html/cart.html`):
  - CSS: `href="../css/filename.css"`
  - JS: `src="../js/filename.js"`
  - Image: `src="../images/filename.png"`
  - Back to home: `href="../index.html"`

Important files

- `index.html` — homepage
- `html/login.html` — login page
- `html/cart.html` — cart page
- `html/order.html` — admin order dashboard
- `css/style.css` — main stylesheet
- `js/main.js` — global helpers (toasts, header, i18n toggle)
- `js/cart.js` — shopping cart logic

Developer hints

- Run a simple HTTP server to avoid path issues (recommended):

```powershell
python -m http.server 8000
```

- LocalStorage keys used by the app: `coffee_admin_session`, `cart`, `t1_orders_v1`, `user_profiles`.
- If you need a full developer README (commands, debugging tips, testing guidance) I can add it next.
