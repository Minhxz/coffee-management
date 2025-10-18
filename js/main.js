
const ADMIN_CREDENTIALS = {
  email: 'coffee@gmail.com',
  password: '123',          
  displayName: 'Quản trị viên'
};


const SESSION_KEY = 'coffee_admin_session';


const form = document.getElementById('auth-form');
const errorBox = document.getElementById('error-message');
const successBox = document.getElementById('success-message');
const submitBtn = document.getElementById('submit-btn');
const toggleBtn = document.getElementById('toggle-password');


toggleBtn?.addEventListener('click', () => {
  const pw = document.getElementById('password');
  if (!pw) return;
  const hidden = pw.type === 'password';
  pw.type = hidden ? 'text' : 'password';
  toggleBtn.innerHTML = hidden
    ? '<i class="fa-regular fa-eye"></i>'
    : '<i class="fa-regular fa-eye-slash"></i>';
  toggleBtn.setAttribute('aria-label', hidden ? 'Ẩn mật khẩu' : 'Hiện mật khẩu');
});

function showError(msg) {
  if (!errorBox) return;
  errorBox.style.display = msg ? 'block' : 'none';
  errorBox.textContent = msg || '';
  if (successBox) successBox.style.display = 'none';
}

function showSuccess(msg) {
  if (!successBox) return;
  successBox.style.display = msg ? 'block' : 'none';
  successBox.textContent = msg || '';
  if (errorBox) errorBox.style.display = 'none';
}




form?.addEventListener('submit', (e) => {
  e.preventDefault();
  showError('');
  showSuccess('');

  const email = form.email.value.trim();
  const password = form.password.value;

  if (!email || !password) {
    showError('Vui lòng nhập đủ email và mật khẩu.');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.style.opacity = .6;


  setTimeout(() => {
    if (
      email.toLowerCase() === ADMIN_CREDENTIALS.email.toLowerCase() &&
      password === ADMIN_CREDENTIALS.password
    ) {
      const sessionObj = {
        isAdmin: true,
        email: ADMIN_CREDENTIALS.email,
        displayName: ADMIN_CREDENTIALS.displayName,
        loginAt: Date.now()
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionObj));
      showSuccess('Đăng nhập thành công. Đang chuyển hướng...');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 600);
    } else {
      showError('Email hoặc mật khẩu không đúng.');
    }
    submitBtn.disabled = false;
    submitBtn.style.opacity = 1;
  }, 550);
});


document.addEventListener("DOMContentLoaded", function() {
  const showMoreBtn = document.getElementById("show-more");
  const extraCards = document.querySelectorAll(".card.extra");

  let isExpanded = false;

  if (showMoreBtn) {
    showMoreBtn.addEventListener("click", function(e) {
      e.preventDefault(); // Ngăn nhảy lên đầu trang

      // Nếu đang ẩn → hiện thêm món
      if (!isExpanded) {
        extraCards.forEach(card => {
          card.classList.add("show");
        });

        showMoreBtn.textContent = "Thu gọn";

        // ✅ Cuộn mượt xuống phần cuối menu
        setTimeout(() => {
          const lastCard = extraCards[extraCards.length - 1];
          lastCard.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 300);
      } 
      // Nếu đang hiện → ẩn lại
      else {
        extraCards.forEach(card => {
          card.classList.remove("show");
        });

        showMoreBtn.textContent = "Xem đầy đủ menu";

        // ✅ Cuộn mượt trở lại đầu phần signature
        setTimeout(() => {
          document.getElementById("signature").scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
      }

      isExpanded = !isExpanded;
    });
  }
});

// 🗺️ Mở Google Maps khi nhấn "Xem bản đồ"
document.addEventListener("DOMContentLoaded", function() {
  const findBtn = document.getElementById("find-store");
  if (findBtn) {
    findBtn.addEventListener("click", function(event) {
      event.preventDefault(); // Ngăn không cuộn lên đầu trang
      window.open("https://www.google.com/maps/search/CAT+CAFE/", "_blank");
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.hero-slider .hero');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  let current = 0;
  let autoSlideInterval;

  if (slides.length === 0) return;

  // Gán class active cho slide đầu
  slides[current].classList.add('active');

  function goToSlide(newIndex, direction) {
    if (newIndex === current) return;

    const currentSlide = slides[current];
    const nextSlide = slides[newIndex];

    // Reset transform cho slide mới trước khi animate
    nextSlide.classList.remove('exit-left', 'exit-right', 'active');
    nextSlide.style.transition = 'none'; // ngắt animation để set vị trí ban đầu

    if (direction === 'next') {
      nextSlide.style.transform = 'translateX(100%)';
    } else {
      nextSlide.style.transform = 'translateX(-100%)';
    }

    // Kích hoạt lại transition để chạy animation
    requestAnimationFrame(() => {
      nextSlide.style.transition = '';
      currentSlide.classList.remove('active');
      currentSlide.classList.add(direction === 'next' ? 'exit-left' : 'exit-right');

      nextSlide.classList.add('active');
      nextSlide.style.transform = 'translateX(0)';
    });

    current = newIndex;
  }

  function nextSlide() {
    let newIndex = current + 1;
    if (newIndex >= slides.length) newIndex = 0; // ✅ Quay vòng mượt
    goToSlide(newIndex, 'next');
  }

  function prevSlide() {
    let newIndex = current - 1;
    if (newIndex < 0) newIndex = slides.length - 1;
    goToSlide(newIndex, 'prev');
  }

  nextBtn.addEventListener('click', () => {
    nextSlide();
    restartAutoSlide();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    restartAutoSlide();
  });

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 6000);
  }

  function restartAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  startAutoSlide();
});
// ====== NÚT ĐỔI NGÔN NGỮ ======
const langBtn = document.getElementById('lang-toggle');
let currentLang = localStorage.getItem('lang') || 'vi';

// ====== TỪ ĐIỂN DỊCH SONG NGỮ ======
const translations = {
  vi: {
    home: "Trang Chủ",
    menu: "Menu",
    jobs: "Tuyển Dụng",
    feedback: "Cảm Nhận",
    contact: "Liên Hệ - Hỗ Trợ",

    heroTitle: "CAT CAFE",
    heroSubtitle: "Thưởng thức cà phê đậm đà, đồ uống tươi mới và làm bạn cùng những chú mèo đáng yêu – tất cả đều có ở Cat Cafe.",
    exploreMenu: "Khám phá menu",
    findStore: "Cửa hàng gần bạn",

    bestSellers: "MÓN BÁN CHẠY",
    bestSellersIntro: "Một số thức uống nổi bật",

    items: [
      { name: "Cà phê sữa đá", desc: "Đậm vị – ngọt béo cân bằng.", price: "60.000đ" },
      { name: "Nâu kem muối", desc: "Hương vị đậm đà, lớp kem muối mặn ngọt hòa quyện.", price: "65.000đ" },
      { name: "Bạc xỉu", desc: "Ngọt dịu, sữa béo và cà phê nhẹ nhàng.", price: "70.000đ" },
      { name: "Vani Latte", desc: "Vị vani thanh nhẹ pha cùng espresso thơm nồng.", price: "70.000đ" },
      { name: "Chanh leo tuyết", desc: "Mát lạnh, chua nhẹ, tươi mới mỗi ngày.", price: "55.000đ" },
      { name: "Atiso muối mơ", desc: "Giải khát thanh mát, tốt cho sức khỏe.", price: "75.000đ" },
      { name: "Sữa chua cà phê", desc: "Kết hợp độc đáo giữa sữa chua và cà phê Việt.", price: "80.000đ" },
      { name: "Trà sữa kem trứng", desc: "Béo mịn, thơm ngậy, đậm đà hương trà.", price: "65.000đ" }
    ],

    storeTitle: "Tìm kiếm cửa hàng gần nhất",
    storeText: "Chúng tôi có nhiều cơ sở tại Hà Nội — hãy tìm cửa hàng gần bạn để trải nghiệm.",
    viewMap: "Xem bản đồ",

    showMore: "Xem đầy đủ menu",
    showLess: "Thu gọn",
    footerText: "© 2025 Cat Cafe. Mọi quyền được bảo lưu.",

    // 🐾 Thêm phần SLIDES GIỚI THIỆU
    slides: [
      {
        title: "Giới thiệu",
        text: "Cat Cafe là không gian thư giãn độc đáo, kết hợp giữa cà phê và tình yêu dành cho những chú mèo đáng yêu."
      },
      {
        title: "Không gian",
        text: "Không gian ấm cúng, nhẹ nhàng và thân thiện – nơi bạn có thể thưởng thức cà phê, đọc sách hoặc làm việc cùng những người bạn bốn chân dễ thương."
      },
      {
        title: "Tuyển dụng",
        text: "Chúng tôi luôn chào đón những bạn trẻ yêu mèo, thân thiện và muốn làm việc trong môi trường sáng tạo và vui vẻ."
      }
    ]
  },

  en: {
    home: "Home",
    menu: "Menu",
    jobs: "Careers",
    feedback: "Feedback",
    contact: "Contact & Support",

    heroTitle: "CAT CAFE",
    heroSubtitle: "Enjoy rich coffee, fresh drinks, and make friends with adorable cats — all at Cat Cafe.",
    exploreMenu: "Explore Menu",
    findStore: "Find a Store Near You",

    bestSellers: "BEST SELLERS",
    bestSellersIntro: "Some of our signature drinks",

    items: [
      { name: "Vietnamese Iced Coffee", desc: "Bold flavor with balanced sweetness.", price: "₫60,000" },
      { name: "Salted Cream Coffee", desc: "Rich coffee with smooth salted cream.", price: "₫65,000" },
      { name: "Bac Xiu (Milk Coffee)", desc: "Sweet, creamy, and light in coffee flavor.", price: "₫70,000" },
      { name: "Vanilla Latte", desc: "Mild vanilla aroma blended with espresso.", price: "₫70,000" },
      { name: "Passionfruit Ice Blend", desc: "Refreshing and tangy tropical flavor.", price: "₫55,000" },
      { name: "Artichoke Apricot Tea", desc: "Cooling, healthy, and uniquely floral.", price: "₫75,000" },
      { name: "Coffee Yogurt", desc: "A perfect mix of yogurt tartness and coffee.", price: "₫80,000" },
      { name: "Milk Tea with Egg Cream", desc: "Creamy, smooth, and rich tea aroma.", price: "₫65,000" }
    ],

    storeTitle: "Find the Nearest Store",
    storeText: "We have several locations across Hanoi — find one near you and drop by.",
    viewMap: "View Map",

    showMore: "Show Full Menu",
    showLess: "Show Less",
    footerText: "© 2025 Cat Cafe. All rights reserved.",

    slides: [
      {
        title: "About Us",
        text: "Cat Cafe is a unique relaxing space that blends coffee culture with a love for adorable cats."
      },
      {
        title: "Our Space",
        text: "A cozy, peaceful, and friendly environment where you can enjoy coffee, read, or work alongside our lovely feline friends."
      },
      {
        title: "Careers",
        text: "We’re always looking for passionate, cat-loving people who want to work in a creative and joyful environment."
      }
    ]
  }
};

// ====== HÀM CHUYỂN NGÔN NGỮ ======
function switchLang() {
  currentLang = currentLang === 'vi' ? 'en' : 'vi';
  const t = translations[currentLang];

  // Menu
  const menuLinks = document.querySelectorAll('.main-menu a');
  if (menuLinks.length >= 5) {
    menuLinks[0].textContent = t.home;
    menuLinks[1].textContent = t.menu;
    menuLinks[2].textContent = t.jobs;
    menuLinks[3].textContent = t.feedback;
    menuLinks[4].textContent = t.contact;
  }

  // Hero section
  document.querySelector('.hero__title').innerHTML = t.heroTitle;
  document.querySelector('.hero__subtitle').textContent = t.heroSubtitle;
  document.querySelector('.hero__cta .btn.primary').textContent = t.exploreMenu;
  document.querySelector('.hero__cta .btn.secondary').textContent = t.findStore;

  // Món bán chạy
  const sectionTitle = document.querySelector('.section-title');
  if (sectionTitle) sectionTitle.textContent = t.bestSellers;
  const sectionIntro = document.querySelector('.section-intro');
  if (sectionIntro) sectionIntro.textContent = t.bestSellersIntro;

  // Cập nhật từng món
  const cards = document.querySelectorAll('.signature-grid .card');
  cards.forEach((card, i) => {
    if (t.items[i]) {
      const nameEl = card.querySelector('h3');
      const descEl = card.querySelector('p.muted');
      const priceEl = card.querySelector('.price-tag');
      if (nameEl) nameEl.textContent = t.items[i].name;
      if (descEl) descEl.textContent = t.items[i].desc;
      if (priceEl) priceEl.textContent = t.items[i].price;
    }
  });

  // Store
  const storeTitle = document.querySelector('#store h2');
  if (storeTitle) storeTitle.textContent = t.storeTitle;
  const storeText = document.querySelector('#store p');
  if (storeText) storeText.textContent = t.storeText;
  const mapBtn = document.querySelector('#store .btn.primary');
  if (mapBtn) mapBtn.textContent = t.viewMap;

  // 🐾 Cập nhật 3 SLIDE GIỚI THIỆU
  const slides = document.querySelectorAll('.slide');
  slides.forEach((slide, i) => {
    if (t.slides && t.slides[i]) {
      const title = slide.querySelector('h3');
      const text = slide.querySelector('p');
      if (title) title.textContent = t.slides[i].title;
      if (text) text.textContent = t.slides[i].text;
    }
  });

  // Nút xem thêm
  const showMoreBtn = document.getElementById('show-more');
  if (showMoreBtn) {
    showMoreBtn.textContent = (currentLang === 'vi') ? t.showMore : t.showMore;
  }

  // Footer
  const footerText = document.querySelector('footer p');
  if (footerText) footerText.textContent = t.footerText;

  // Nút ngôn ngữ
  langBtn.textContent = (currentLang === 'vi') ? 'EN' : 'VI';

  // Lưu lại
  localStorage.setItem('lang', currentLang);
}

// ====== SỰ KIỆN CLICK ======
langBtn.addEventListener('click', switchLang);

// ====== KHỞI TẠO NGÔN NGỮ BAN ĐẦU ======
if (currentLang === 'en') switchLang();
