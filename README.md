# ☕ Coffee Cats - Hệ Thống Quản Lý Quán Cà Phê

Hệ thống quản lý quán cà phê hiện đại với giao diện thân thiện và tính năng đầy đủ cho việc vận hành quán cà phê.

## 🚀 Tính Năng Chính

- **🏠 Trang Chủ**: Giới thiệu quán cà phê với thiết kế đẹp mắt
- **📋 Menu**: Hiển thị danh sách đồ uống và món ăn với hình ảnh
- **🛒 Đặt Hàng**: Hệ thống đặt hàng trực tuyến
- **📞 Liên Hệ**: Thông tin liên hệ và hỗ trợ khách hàng
- **👥 Đăng Nhập**: Hệ thống xác thực người dùng
- **🎨 Responsive Design**: Tương thích với mọi thiết bị

## 📁 Cấu Trúc Dự Án

```
coffee-management/
├── 📄 index.html                 # Trang chủ (redirect đến src/pages/)
├── 📄 README.md                  # Tài liệu dự án
├── 📁 src/                       # Mã nguồn chính
│   ├── 📁 pages/                 # Các trang HTML
│   │   ├── 📄 index.html         # Trang chủ chính
│   │   ├── 📄 menu.html          # Trang menu
│   │   ├── 📄 cart.html          # Giỏ hàng
│   │   ├── 📄 order.html         # Đặt hàng
│   │   ├── 📄 login.html         # Đăng nhập
│   │   ├── 📄 hotro.html         # Hỗ trợ
│   │   ├── 📄 datban.html        # Đặt bàn
│   │   ├── 📄 dki.html           # Đăng ký
│   │   └── 📄 menufull.html      # Menu đầy đủ
│   └── 📁 assets/                # Tài nguyên
│       ├── 📁 css/               # File CSS
│       │   ├── 📄 style.css      # CSS chính
│       │   ├── 📄 menu.css       # CSS menu
│       │   ├── 📄 cart.css       # CSS giỏ hàng
│       │   ├── 📄 order.css      # CSS đặt hàng
│       │   ├── 📄 hotro.css      # CSS hỗ trợ
│       │   ├── 📄 dki.css        # CSS đăng ký
│       │   └── 📄 menufull.css   # CSS menu đầy đủ
│       ├── 📁 js/                # File JavaScript
│       │   ├── 📄 main.js        # JS chính
│       │   ├── 📄 menu.js        # JS menu
│       │   ├── 📄 cart.js        # JS giỏ hàng
│       │   ├── 📄 order.js       # JS đặt hàng
│       │   ├── 📄 datban.js      # JS đặt bàn
│       │   └── 📄 dki.js         # JS đăng ký
│       └── 📁 images/            # Hình ảnh
│           ├── 🐱 golocat.jpg    # Logo quán
│           ├── ☕ cfsuada.jpg     # Cà phê sữa đá
│           ├── 🥤 bacxiu.jpg     # Bạc xỉu
│           ├── 🍰 tiramisu.webp  # Tiramisu
│           └── ... (51+ images)  # Các hình ảnh khác
└── 📁 public/                    # Tài nguyên công khai
    └── 📁 fontawesome-free-7.1.0-web/  # Icon FontAwesome
        ├── 📁 css/
        ├── 📁 js/
        ├── 📁 webfonts/
        └── 📁 svgs/
```

## 🛠️ Công Nghệ Sử Dụng

- **HTML5**: Cấu trúc trang web semantic
- **CSS3**: Styling hiện đại với Flexbox và Grid
- **JavaScript (ES6+)**: Tương tác động và logic ứng dụng
- **FontAwesome**: Icon và biểu tượng
- **Google Fonts**: Typography (Be Vietnam Pro, League Spartan)
- **Responsive Design**: Bootstrap-like grid system

## 🎨 Thiết Kế

### Màu Sắc Chủ Đạo
- **Xanh Chính**: `#3c5e2c` (Accent color)
- **Xanh Đậm**: `#2d4620` (Accent strong)
- **Nền Chính**: `#f5f3eb` (Background)
- **Thẻ**: `#faf8f3` (Card background)
- **Văn Bản**: `#2b2f28` (Dark text)

### Font Chữ
- **Heading**: League Spartan (700-800 weight)
- **Body**: Be Vietnam Pro (400-600 weight)

## 🚀 Cách Chạy Dự Án

### Phương Pháp 1: Mở Trực Tiếp
1. Clone hoặc download dự án
2. Mở file `index.html` trong trình duyệt
3. Hoặc mở `src/pages/index.html` để vào thẳng trang chính

### Phương Pháp 2: Local Server (Khuyến nghị)
```bash
# Sử dụng Python
python -m http.server 8000

# Sử dụng Node.js
npx serve .

# Sử dụng PHP
php -S localhost:8000
```

Sau đó truy cập: `http://localhost:8000`

## 📱 Tương Thích Trình Duyệt

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers

## 📋 Danh Sách Tính Năng Chi Tiết

### 🏠 Trang Chủ (index.html)
- Hero section với slide ảnh
- Giới thiệu quán cà phê
- Menu nổi bật với signature drinks
- Phần story/tuyển dụng
- Footer với thông tin liên hệ

### 📋 Menu (menu.html)
- Hiển thị theo danh mục:
  - ☕ Cà Phê & Đồ Uống Nóng
  - 🥤 Sinh Tố & Đồ Uống Lạnh  
  - 🧁 Bánh Ngọt & Tráng Miệng
  - 🍟 Đồ Ăn Vặt
  - 🫖 Set Trà & Bánh
  - 🧊 Topping Đặc Biệt
- Sidebar navigation
- Thông tin chi tiết món ăn
- Giá cả và mô tả
- Nút thêm vào giỏ hàng

### 🛒 Giỏ Hàng (cart.html)
- Danh sách món đã chọn
- Tính tổng tiền
- Điều chỉnh số lượng
- Xóa món khỏi giỏ

### 📞 Hỗ Trợ (hotro.html)
- Form liên hệ
- Thông tin quán
- FAQ
- Chính sách

### 👥 Đăng Nhập (login.html)
- Form đăng nhập
- Validation
- Responsive design

## 🎯 Đặc Điểm Nổi Bật

1. **🎨 UI/UX Hiện Đại**: Thiết kế clean, thân thiện với người dùng
2. **📱 Responsive**: Hoạt động tốt trên mọi thiết bị
3. **⚡ Performance**: Load nhanh với lazy loading images
4. **🎭 Animations**: Smooth transitions và hover effects
5. **♿ Accessibility**: Tuân thủ các tiêu chuẩn web accessibility
6. **🔧 Maintainable**: Code được tổ chức rõ ràng, dễ bảo trì

## 📈 Hướng Phát Triển

- [ ] Tích hợp backend API
- [ ] Hệ thống thanh toán online
- [ ] Admin dashboard
- [ ] Real-time order tracking
- [ ] Push notifications
- [ ] PWA (Progressive Web App)
- [ ] Dark mode theme

## 👥 Đóng Góp

Dự án được phát triển và duy trì bởi team Coffee Cats. Mọi đóng góp và feedback đều được hoan nghênh!

## 📄 License

Dự án được phân phối dưới MIT License. Xem file `LICENSE` để biết thêm chi tiết.

---

**Coffee Cats** - *Hương vị Việt và không gian mang câu chuyện* ☕🐱