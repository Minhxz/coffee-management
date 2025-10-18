// ===== COFFEE SHOP MAIN SCRIPT =====

// ===== LOGIN FUNCTIONALITY (CHỈ CHO TRANG LOGIN) =====
const ADMIN_CREDENTIALS = {
  email: 'coffee@gmail.com',
  password: '123',          
  displayName: 'Quản trị viên'
};

const SESSION_KEY = 'coffee_admin_session';

// Login form handlers (chỉ chạy nếu có form login)
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('auth-form');
  
  if (loginForm) {
    const errorBox = document.getElementById('error-message');
    const successBox = document.getElementById('success-message');
    const submitBtn = document.getElementById('submit-btn');
    const toggleBtn = document.getElementById('toggle-password');

    // Toggle password visibility
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

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showError('');
      showSuccess('');

      const email = loginForm.email.value.trim();
      const password = loginForm.password.value;

      if (!email || !password) {
        showError('Vui lòng nhập đủ email và mật khẩu.');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = .6;
      }

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
        
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.style.opacity = 1;
        }
      }, 550);
    });
  }
});

// ===== MAIN PAGE FUNCTIONALITY =====
document.addEventListener("DOMContentLoaded", function() {
  
  // ===== XỬ LÝ NÚT "XEM THÊM" MENU =====
  const showMoreBtn = document.getElementById("show-more");
  const extraCards = document.querySelectorAll(".card.extra");
  
  if (showMoreBtn && extraCards.length > 0) {
    let isExpanded = false;
    
    showMoreBtn.addEventListener("click", function(e) {
      e.preventDefault();
      
      if (!isExpanded) {
        // Hiện thêm món với stagger animation
        extraCards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add("show");
          }, index * 100);
        });
        showMoreBtn.textContent = "Thu gọn";
        
        // Scroll xuống cuối menu
        setTimeout(() => {
          const lastCard = extraCards[extraCards.length - 1];
          if (lastCard) {
            lastCard.scrollIntoView({ 
              behavior: "smooth", 
              block: "center" 
            });
          }
        }, 400);
      } else {
        // Ẩn các card extra
        extraCards.forEach(card => {
          card.classList.remove("show");
        });
        showMoreBtn.textContent = "Xem Thêm";
        
        // Scroll về đầu section
        setTimeout(() => {
          const signatureSection = document.getElementById("signature");
          if (signatureSection) {
            signatureSection.scrollIntoView({ 
              behavior: "smooth", 
              block: "start" 
            });
          }
        }, 300);
      }
      
      isExpanded = !isExpanded;
    });
  }

  // ===== XỬ LÝ GOOGLE MAPS =====
  const findBtn = document.getElementById("find-store");
  if (findBtn) {
    findBtn.addEventListener("click", function(event) {
      event.preventDefault();
      window.open("https://www.google.com/maps/search/CAT+CAFE+Hanoi/", "_blank");
    });
  }

  // ===== XỬ LÝ HERO SLIDER =====
  const heroSlider = document.querySelector('.hero-slider');
  if (heroSlider) {
    const slides = heroSlider.querySelectorAll('.hero');
    const prevBtn = heroSlider.querySelector('.slider-btn.prev');
    const nextBtn = heroSlider.querySelector('.slider-btn.next');
    
    if (slides.length > 0 && prevBtn && nextBtn) {
      let current = 0;
      let autoSlideInterval;
      let isTransitioning = false;

      // Khởi tạo slide đầu tiên
      slides.forEach((slide, index) => {
        slide.classList.remove('active', 'exit-left', 'exit-right');
        if (index === 0) {
          slide.classList.add('active');
        }
      });

      function goToSlide(newIndex, direction) {
        if (newIndex === current || isTransitioning) return;
        
        isTransitioning = true;
        const currentSlide = slides[current];
        const nextSlide = slides[newIndex];

        // Transition animation
        currentSlide.classList.remove('active');
        currentSlide.classList.add(direction === 'next' ? 'exit-left' : 'exit-right');
        
        nextSlide.classList.remove('exit-left', 'exit-right');
        nextSlide.classList.add('active');

        // Cleanup after animation
        setTimeout(() => {
          currentSlide.classList.remove('exit-left', 'exit-right');
          isTransitioning = false;
        }, 800);

        current = newIndex;
      }

  function nextSlide() {
    let newIndex = current + 1;
    if (newIndex >= slides.length) newIndex = 0; // ✅ Quay vòng mượt
    goToSlide(newIndex, 'next');
  }

      function prevSlide() {
        const newIndex = current === 0 ? slides.length - 1 : current - 1;
        goToSlide(newIndex, 'prev');
      }

      function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 6000);
      }

      function restartAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
      }

      // Event listeners cho navigation
      nextBtn.addEventListener('click', () => {
        nextSlide();
        restartAutoSlide();
      });

      prevBtn.addEventListener('click', () => {
        prevSlide();
        restartAutoSlide();
      });

      // Pause auto slide khi hover
      heroSlider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
      });
      
      heroSlider.addEventListener('mouseleave', () => {
        startAutoSlide();
      });

      // Bắt đầu auto slide
      startAutoSlide();
    }
  }

  // ===== XỬ LÝ REVEAL ANIMATIONS =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .fade-in').forEach(el => {
    observer.observe(el);
  });

});

// ===== NGÔN NGỮ / LANGUAGE TOGGLE =====
document.addEventListener('DOMContentLoaded', () => {
  const langBtn = document.getElementById('lang-toggle');
  if (!langBtn) return;
  
  let currentLang = localStorage.getItem('lang') || 'vi';

  const translations = {
    vi: {
      home: "Trang Chủ",
      menu: "Menu", 
      jobs: "Tuyển Dụng",
      feedback: "Cảm Nhận",
      contact: "Liên Hệ-Hỗ Trợ",
      heroTitle: "CAT CAFE",
      heroSubtitle: "Thưởng thức cà phê đậm đà, đồ uống tươi mới và làm bạn cùng những chú mèo đáng yêu – tất cả đều có ở Cat Cafe.",
      exploreMenu: "Khám phá menu",
      findStore: "Cửa hàng gần bạn",
      bestSellers: "MÓN BÁN CHẠY",
      bestSellersIntro: "Một số thức uống nổi bật",
      showMore: "Xem Thêm",
      showLess: "Thu gọn",
      storeTitle: "Tìm kiếm cửa hàng gần nhất",
      storeText: "Chúng tôi có nhiều cơ sở tại Hà Nội — hãy tìm cửa hàng gần bạn để trải nghiệm.",
      viewMap: "Xem bản đồ",
      items: [
        { name: "Cà phê sữa đá", desc: "Đậm đà, ngọt béo, hương truyền thống.", price: "60.000đ" },
        { name: "Nâu kem muối", desc: "Cà phê mặn ngọt, béo thơm lạ.", price: "65.000đ" },
        { name: "Bạc xỉu", desc: "Ngọt nhẹ, sữa nhiều, vị dịu, đậm đà.", price: "70.000đ" },
        { name: "Vani-Latte", desc: "Hương vani dịu, cà phê ấm áp, thanh ngọt.", price: "70.000đ" }
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
      showMore: "Show More",
      showLess: "Show Less",
      storeTitle: "Find the Nearest Store",
      storeText: "We have several locations across Hanoi — find one near you and drop by.",
      viewMap: "View Map",
      items: [
        { name: "Vietnamese Iced Coffee", desc: "Bold flavor with balanced sweetness.", price: "₫60,000" },
        { name: "Salted Cream Coffee", desc: "Rich coffee with smooth salted cream.", price: "₫65,000" },
        { name: "Bac Xiu (Milk Coffee)", desc: "Sweet, creamy, and light in coffee flavor.", price: "₫70,000" },
        { name: "Vanilla Latte", desc: "Mild vanilla aroma blended with espresso.", price: "₫70,000" }
      ]
    }
  };

  function switchLang() {
    currentLang = currentLang === 'vi' ? 'en' : 'vi';
    const t = translations[currentLang];

    // Update navigation menu
    const menuLinks = document.querySelectorAll('.main-menu a');
    if (menuLinks.length >= 5) {
      menuLinks[0].textContent = t.home;
      menuLinks[1].textContent = t.menu;
      menuLinks[2].textContent = t.jobs;
      menuLinks[3].textContent = t.feedback;
      menuLinks[4].textContent = t.contact;
    }

    // Update hero section
    const heroTitle = document.querySelector('.hero__title');
    const heroSubtitle = document.querySelector('.hero__subtitle');
    if (heroTitle) heroTitle.innerHTML = `${t.heroTitle}<br><span class="hero__title-accent">Cơ sở đầu tiên ở Hà Nội</span>`;
    if (heroSubtitle) heroSubtitle.textContent = t.heroSubtitle;

    // Update buttons
    const exploreBtn = document.querySelector('.hero__cta .btn.primary');
    const storeBtn = document.querySelector('.hero__cta .btn.secondary');
    if (exploreBtn) exploreBtn.textContent = t.exploreMenu;
    if (storeBtn) storeBtn.textContent = t.findStore;

    // Món bán chạy
    const sectionTitle = document.querySelector('.section-title');
    if (sectionTitle) sectionTitle.innerHTML = `<span class="accent-bar"></span> ${t.bestSellers}`;
    const sectionIntro = document.querySelector('.section-intro');
    if (sectionIntro) sectionIntro.textContent = t.bestSellersIntro;

    // Cập nhật từng món
    const cards = document.querySelectorAll('.signature-grid .card');
    cards.forEach((card, i) => {
      if (t.items && t.items[i]) {
        const nameEl = card.querySelector('h3');
        const descEl = card.querySelector('p.muted');
        const priceEl = card.querySelector('.price-tag');
        if (nameEl) nameEl.textContent = t.items[i].name;
        if (descEl) descEl.textContent = t.items[i].desc;
        if (priceEl) priceEl.textContent = t.items[i].price;
      }
    });

    // Store section
    const storeTitle = document.querySelector('#store h2');
    if (storeTitle) storeTitle.innerHTML = `<span class="accent-bar"></span> ${t.storeTitle}`;
    const storeText = document.querySelector('#store p');
    if (storeText) storeText.textContent = t.storeText;
    const mapBtn = document.querySelector('#store .btn.primary');
    if (mapBtn) mapBtn.textContent = t.viewMap;

    // Nút xem thêm
    const showMoreBtn = document.getElementById('show-more');
    if (showMoreBtn) {
      const isExpanded = showMoreBtn.textContent.includes('Thu gọn') || showMoreBtn.textContent.includes('Show Less');
      showMoreBtn.textContent = isExpanded ? t.showLess : t.showMore;
    }

    // Update language toggle button
    langBtn.textContent = currentLang === 'vi' ? 'EN' : 'VI';
    
    // Save language preference
    localStorage.setItem('lang', currentLang);
  }

  langBtn.addEventListener('click', switchLang);
  
  // Initialize language on page load
  if (currentLang === 'en') switchLang();
});