Coffee Management — Simple Static Demo

This repository is a small static demo for a coffee shop front-end. It contains a simple storefront, cart, login flow and an admin order dashboard implemented with plain HTML, CSS and vanilla JavaScript (no build step required).

Quick start

- Open `index.html` from the repository root in your browser (double-click the file or serve the folder with a static server).
- Recommended for development: run a local server to ensure relative paths work consistently. From the project root you can run a basic Python server:

```powershell
# from repository root
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Credentials (local demo)

- Admin: `coffee@gmail.com` / `123` — redirects to the order dashboard (`html/order.html`).
- Regular user: `toiminh@gmail.com` / `123` — shows user avatar and account management.

Project layout (short)

- `index.html` — homepage (at project root)
- `html/` — secondary pages used by navigation (login, cart, order dashboard, etc.)
- `css/` — stylesheets: `style.css` is the main file; `order.css`, `cart.css`, etc. contain page-specific styles
- `js/` — JavaScript modules: `main.js` contains global helpers, `cart.js` handles cart UI, etc.
- `images/` — static images and icons
- `fontawesome-free-7.1.0-web/` — local copy of Font Awesome used by the UI

Developer notes

- The app uses `localStorage` for simple persistence:
  - `coffee_admin_session` — stores login session object
  - `cart` — cart contents
  - `t1_orders_v1` — orders for the admin dashboard
  - `user_profiles` — small user profile store used by the account page
- `js/main.js` exports global UI helpers (toasts, header rendering, language toggle).
- To test admin flows, login with admin creds and use the avatar → Dashboard link.

Known TODOs

- Move inline order JS in `html/order.html` into `js/order.js` for better modularity.
- Add cross-browser and responsive QA steps (see `css/` media queries for specifics).
