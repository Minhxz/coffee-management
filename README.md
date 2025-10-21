# Coffee Management - File Structure

## Organized File Structure

```
coffee-management/
├── index.html                 # Main homepage (root level for easy access)
├── css/                       # All CSS files
│   ├── style.css             # Main stylesheet
│   ├── order.css             # Order modal styles
│   ├── menu.css              # Menu page styles
│   ├── hotro.css             # Support page styles
│   ├── cart.css              # Shopping cart styles
│   ├── dki.css               # Registration styles
│   ├── index.css             # Index-specific styles
│   └── menufull.css          # Full menu styles
├── html/                      # All HTML pages (except index.html)
│   ├── menu.html             # Menu page
│   ├── login.html            # Login page
│   ├── hotro.html            # Support/Contact page
│   ├── cart.html             # Shopping cart page
│   ├── datban.html           # Table reservation page
│   ├── dki.html              # Registration page
│   ├── order.html            # Order page
│   └── menufull.html         # Full menu page
├── js/                        # All JavaScript files
│   ├── main.js               # Main functionality
│   ├── order.js              # Order handling
│   ├── menu.js               # Menu functionality
│   ├── cart.js               # Cart functionality
│   ├── datban.js             # Table reservation
│   └── dki.js                # Registration functionality
├── images/                    # All images
│   ├── logo files
│   ├── product images
│   ├── background images
│   └── social media icons
└── fontawesome-free-7.1.0-web/  # Font Awesome icons
    ├── css/
    ├── js/
    └── webfonts/
```

## Updated Link Paths

### Root index.html:
- CSS: `href="css/filename.css"`
- JS: `src="js/filename.js"`
- Images: `src="images/filename.jpg"`
- HTML pages: `href="html/filename.html"`

### HTML folder files:
- CSS: `href="../css/filename.css"`
- JS: `src="../js/filename.js"`
- Images: `src="../images/filename.jpg"`
- Back to index: `href="../index.html"`
- Other HTML: `href="filename.html"`

## Navigation Structure

- **Homepage**: `/index.html` (root level)
- **Menu**: `/html/menu.html`
- **Login**: `/html/login.html`
- **Support**: `/html/hotro.html`
- **Cart**: `/html/cart.html`

