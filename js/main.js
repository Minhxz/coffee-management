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
  
  // ===== SEARCH BAR FUNCTIONALITY =====
  const searchToggle = document.getElementById("search-toggle");
  const searchBar = document.getElementById("search-bar");
  const searchOverlay = document.getElementById("search-overlay");
  const searchClose = document.getElementById("search-close");
  const searchInput = document.getElementById("search-input");
  
  if (searchToggle && searchBar && searchOverlay && searchClose && searchInput) {
    // Open search bar
    searchToggle.addEventListener("click", function(e) {
      e.preventDefault();
      searchBar.classList.add("active");
      searchOverlay.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent background scrolling
      setTimeout(() => {
        searchInput.focus();
      }, 200);
    });
    
    // Close search bar function
    function closeSearch() {
      searchBar.classList.remove("active");
      searchOverlay.classList.remove("active");
      document.body.style.overflow = ""; // Restore scrolling
      searchInput.value = "";
    }
    
    // Close search bar
    searchClose.addEventListener("click", function(e) {
      e.preventDefault();
      closeSearch();
    });
    
    // Close search when clicking overlay
    searchOverlay.addEventListener("click", function(e) {
      closeSearch();
    });
    
    // Close search on Escape key
    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape" && searchBar.classList.contains("active")) {
        closeSearch();
      }
    });
    
    // Handle search input (you can customize this for actual search functionality)
    searchInput.addEventListener("keydown", function(e) {
      if (e.key === "Enter") {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
          // Here you can add actual search functionality
          console.log("Searching for:", query);
          // For now, just show an alert
          alert(`Tìm kiếm: "${query}"`);
          closeSearch();
        }
      }
    });
  }
  
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
// Chức năng: Chuyển đổi giữa Tiếng Việt (vi) và Tiếng Anh (en) cho toàn bộ trang web

document.addEventListener('DOMContentLoaded', () => {
  // Chờ cho trang web tải xong nội dung HTML mới thực thi code

  const langBtn = document.getElementById('lang-toggle'); // Lấy nút đổi ngôn ngữ (EN/VI)
  if (!langBtn) return; // Nếu không có nút thì dừng

  // Lấy ngôn ngữ hiện tại từ localStorage hoặc mặc định là 'vi' (tiếng Việt)
  let currentLang = localStorage.getItem('lang') || 'vi';

  // ========================================
  // DỮ LIỆU DỊCH SONG NGỮ (VI & EN)
  // ========================================
  const translations = {
    vi: {
      // --- Menu ---
      home: "Trang Chủ",
      menu: "Menu",
      jobs: "Tuyển Dụng",
      feedback: "Cảm Nhận",
      contact: "Liên Hệ-Hỗ Trợ",

      // --- Slide giới thiệu ---
      slides: [
        {
          title: "CAT CAFE",
          accent: "Cơ sở đầu tiên ở Hà Nội",
          subtitle:
            "Thưởng thức cà phê đậm đà, đồ uống tươi mới và làm bạn cùng những chú mèo đáng yêu – tất cả đều có ở Cat Cafe.",
          primary: "Khám phá menu",
          secondary: "Cửa hàng gần bạn"
        },
        {
          title: "Ghé Cat Cafe,",
          accent: "tim tan ngay từ cửa",
          subtitle:
            "Quán siêu xinh, ánh sáng siêu ấm. Ghế êm, nhạc nhẹ, mèo lười đáng yêu. Tâm trạng auto tốt",
          primary: "Xem không gian",
          secondary: "Đặt bàn ngay"
        },
        {
          title: "Mèo ngoan",
          accent: "Cà phê chill, sen vui phơi phới",
          subtitle:
            "Ngồi nhâm nhi một ly, boss nhào tới nũng nịu Ai mà chịu nổi độ đáng yêu này chứ",
          primary: "Khám phá menu",
          secondary: "Liên hệ"
        }
      ],

      // --- Phần món bán chạy ---
      bestSellers: "MÓN BÁN CHẠY",
      bestSellersIntro: "Một số thức uống nổi bật",
      showMore: "Xem Thêm",
      showLess: "Thu gọn",

      // --- Cửa hàng ---
      storeTitle: "Tìm kiếm cửa hàng gần nhất",
      storeText:
        "Chúng tôi có nhiều cơ sở tại Hà Nội — hãy tìm cửa hàng gần bạn để trải nghiệm.",
      viewMap: "Xem bản đồ",

      // --- Cảm nhận khách hàng ---
      testimonialTitle: "Cảm nhận khách hàng",
      testimonialIntro:
        "Hãy chia sẻ cảm nhận của bạn sau khi thưởng thức thức uống tại quán — mỗi góp ý đều giúp chúng tôi hoàn thiện hơn mỗi ngày.",
      testimonialSub: "Một số đánh giá mới",

      // --- Danh sách món ---
      items: [
        { name: "Cà phê sữa đá", desc: "Đậm đà, ngọt béo, hương truyền thống.", price: "60.000đ" },
        { name: "Nâu kem muối", desc: "Cà phê mặn ngọt, béo thơm lạ.", price: "65.000đ" },
        { name: "Bạc xỉu", desc: "Ngọt nhẹ, sữa nhiều, vị dịu, đậm đà.", price: "70.000đ" },
        { name: "Vani-Latte", desc: "Hương vani dịu, cà phê ấm áp, thanh ngọt.", price: "70.000đ" },
        { name: "Chanh leo tuyết", desc: "Chua thanh, mát lạnh, sảng khoái.", price: "55.000đ" },
        { name: "Sữa chua cà phê", desc: "Chua ngọt, béo thơm, mát lạnh, thơm nồng.", price: "70.000đ" },
        { name: "Atiso muối mơ", desc: "Thanh mát, chua nhẹ, giải nhiệt.", price: "65.000đ" },
        { name: "Trà sữa kem trứng", desc: "Béo ngậy, mịn màng, thơm dịu.", price: "60.000đ" }
      ]
    },

    en: {
      // --- Menu ---
      home: "Home",
      menu: "Menu",
      jobs: "Careers",
      feedback: "Feedback",
      contact: "Contact & Support",

      // --- Slides ---
      slides: [
        {
          title: "CAT CAFE",
          accent: "The first branch in Hanoi",
          subtitle:
            "Enjoy rich coffee, fresh drinks, and make friends with adorable cats — all at Cat Cafe.",
          primary: "Explore Menu",
          secondary: "Find a Store"
        },
        {
          title: "Visit Cat Cafe,",
          accent: "Love at First Sight",
          subtitle:
            "Cozy lights, soft music, lazy cats, and perfect vibes.",
          primary: "View Space",
          secondary: "Reserve Now"
        },
        {
          title: "Sweet Cats",
          accent: "Chill Coffee, Happy You",
          subtitle:
            "Sip your coffee while cats snuggle up — impossible not to smile!",
          primary: "Explore Menu",
          secondary: "Contact"
        }
      ],

      // --- Best sellers ---
      bestSellers: "BEST SELLERS",
      bestSellersIntro: "Some of our signature drinks",
      showMore: "Show More",
      showLess: "Show Less",

      // --- Store ---
      storeTitle: "Find the Nearest Store",
      storeText:
        "We have several locations across Hanoi — find one near you and drop by.",
      viewMap: "View Map",

      // --- Testimonials ---
      testimonialTitle: "Customer Feedback",
      testimonialIntro:
        "Share your thoughts after enjoying our drinks — every comment helps us improve every day.",
      testimonialSub: "Recent Reviews",

      // --- Drink items ---
      items: [
        { name: "Vietnamese Iced Coffee", desc: "Bold flavor with balanced sweetness.", price: "₫60,000" },
        { name: "Salted Cream Coffee", desc: "Rich coffee with smooth salted cream.", price: "₫65,000" },
        { name: "Bac Xiu (Milk Coffee)", desc: "Sweet, creamy, and light in coffee flavor.", price: "₫70,000" },
        { name: "Vanilla Latte", desc: "Mild vanilla aroma blended with espresso.", price: "₫70,000" },
        { name: "Passionfruit Ice Blend", desc: "Refreshing and tangy tropical flavor.", price: "₫55,000" },
        { name: "Coffee Yogurt", desc: "Sweet-sour, creamy, and perfectly chilled.", price: "₫70,000" },
        { name: "Artichoke Plum Tea", desc: "Lightly sour, soothing and cooling.", price: "₫65,000" },
        { name: "Egg Cream Milk Tea", desc: "Rich, smooth, and lightly sweet.", price: "₫60,000" }
      ]
    }
  };

  // ========================================
  // HÀM CHÍNH: CHUYỂN NGÔN NGỮ
  // ========================================
  function switchLang() {
    // Đổi ngôn ngữ: nếu hiện tại là 'vi' thì chuyển sang 'en', ngược lại
    currentLang = currentLang === "vi" ? "en" : "vi";
    const t = translations[currentLang]; // Dữ liệu của ngôn ngữ mới

    // --- Menu điều hướng ---
    const menuLinks = document.querySelectorAll(".main-menu a");
    if (menuLinks.length >= 5) {
      menuLinks[0].textContent = t.home;
      menuLinks[1].textContent = t.menu;
      menuLinks[2].textContent = t.jobs;
      menuLinks[3].textContent = t.feedback;
      menuLinks[4].textContent = t.contact;
    }

    // --- Slides đầu trang ---
    const slideEls = document.querySelectorAll(".hero-slider .hero");
    slideEls.forEach((slide, i) => {
      const data = t.slides[i];
      if (!data) return;
      // Cập nhật tiêu đề và phụ đề
      slide.querySelector(".hero__title").innerHTML =
        `${data.title}<br><span class="hero__title-accent">${data.accent}</span>`;
      slide.querySelector(".hero__subtitle").textContent = data.subtitle;
      // Cập nhật nút trong slide
      const btns = slide.querySelectorAll(".hero__cta .btn");
      if (btns[0]) btns[0].textContent = data.primary;
      if (btns[1]) btns[1].textContent = data.secondary;
    });

    // --- Mục "Món bán chạy" ---
    const sectionTitle = document.querySelector(".section-title");
    if (sectionTitle) sectionTitle.innerHTML = `<span class="accent-bar"></span> ${t.bestSellers}`;
    const sectionIntro = document.querySelector(".section-intro");
    if (sectionIntro) sectionIntro.textContent = t.bestSellersIntro;

    // --- Phần cảm nhận khách hàng ---
    const testSection = document.querySelector("#testimonials");
    if (testSection) {
      const title = testSection.querySelector("h2.section-title");
      const intro = testSection.querySelector("p.section-intro");
      const sub = testSection.querySelector("h3");
      if (title) title.innerHTML = `<span class="accent-bar"></span> ${t.testimonialTitle}`;
      if (intro) intro.textContent = t.testimonialIntro;
      if (sub) sub.textContent = t.testimonialSub;
    }

    // --- Cập nhật danh sách sản phẩm ---
    const cards = document.querySelectorAll(".signature-grid .card");
    cards.forEach((card, i) => {
      if (!t.items[i]) return;
      const nameEl = card.querySelector("h3");
      const descEl = card.querySelector("p.muted");
      const priceEl = card.querySelector(".price-tag");
      if (nameEl) nameEl.textContent = t.items[i].name;
      if (descEl) descEl.textContent = t.items[i].desc;
      if (priceEl) priceEl.textContent = t.items[i].price;
    });

    // --- Cập nhật phần cửa hàng ---
    const storeTitle = document.querySelector("#store h2");
    if (storeTitle)
      storeTitle.innerHTML = `<span class="accent-bar"></span> ${t.storeTitle}`;
    const storeText = document.querySelector("#store p");
    if (storeText) storeText.textContent = t.storeText;
    const mapBtn = document.querySelector("#store .btn.primary");
    if (mapBtn) mapBtn.textContent = t.viewMap;

    // --- Nút “Xem thêm / Thu gọn” ---
    const showMoreBtn = document.getElementById("show-more");
    if (showMoreBtn) {
      const isExpanded =
        showMoreBtn.textContent.includes("Thu gọn") ||
        showMoreBtn.textContent.includes("Show Less");
      showMoreBtn.textContent = isExpanded ? t.showLess : t.showMore;
    }

    // --- Phần “Tuyển dụng” ---
    const storySection = document.querySelector("#story");
    if (storySection) {
      // Dữ liệu song ngữ riêng cho phần tuyển dụng
      const storyTexts = {
        vi: {
          title: "🐾 CAT CAFE TUYỂN NHÂN VIÊN 🐾",
          position: "Vị trí: Full-time / Part-time - Số lượng: 8 bạn",
          job: "•💼 CÔNG VIỆC: Order, phục vụ đồ uống, dọn dẹp khu vực làm việc, hỗ trợ chăm sóc và chơi cùng mèo 🐱",
          light: "👉 Công việc nhẹ nhàng, sạch sẽ – phù hợp sinh viên muốn làm thêm.",
          timeTitle: "•⏰ THỜI GIAN LÀM VIỆC",
          morning: "Ca sáng: 6h30 – 12h00",
          afternoon: "Ca chiều: 12h00 – 17h30",
          evening: "Ca tối: 17h30 – 23h00",
          flexible: "•📅 Có thể linh hoạt đổi ca theo lịch học.",
          benefitTitle: "•💰 QUYỀN LỢI:",
          benefit1: "Lương + thưởng theo trách nhiệm công việc",
          benefit2: "Hỗ trợ tiền ăn giữa ca 🍽️",
          benefit3: "Môi trường làm việc thân thiện, vui vẻ, nhiều cơ hội học hỏi.",
          requireTitle: "•🌟 YÊU CẦU",
          require: "Nhanh nhẹn, nhiệt tình, tự giác. Ham học hỏi, có tinh thần trách nhiệm.",
          learnMore: "Tìm hiểu thêm"
        },
        en: {
          title: "🐾 CAT CAFE IS HIRING 🐾",
          position: "Position: Full-time / Part-time - Quantity: 8 staff",
          job: "•💼 JOB: Take orders, serve drinks, clean work area, and help care for cats 🐱",
          light: "👉 Easy and clean job – suitable for students looking for part-time work.",
          timeTitle: "•⏰ WORKING HOURS",
          morning: "Morning shift: 6:30 AM – 12:00 PM",
          afternoon: "Afternoon shift: 12:00 PM – 5:30 PM",
          evening: "Evening shift: 5:30 PM – 11:00 PM",
          flexible: "•📅 Flexible schedule to match your study timetable.",
          benefitTitle: "•💰 BENEFITS:",
          benefit1: "Salary + performance bonus",
          benefit2: "Meal allowance 🍽️",
          benefit3: "Friendly, fun, and learning-oriented environment.",
          requireTitle: "•🌟 REQUIREMENTS",
          require: "Energetic, responsible, willing to learn, and self-motivated.",
          learnMore: "Learn More"
        }
      };

      const langData = storyTexts[currentLang]; // Lấy dữ liệu theo ngôn ngữ
      const story = storySection.querySelector(".story-content");

      // Cập nhật từng đoạn văn bản theo thứ tự
      if (story) {
        const map = {
          "h2.section-title": "title",
          "p:nth-of-type(1)": "position",
          "p:nth-of-type(2)": "job",
          "p:nth-of-type(3)": "light",
          "p:nth-of-type(4)": "timeTitle",
          "p:nth-of-type(5)": "morning",
          "p:nth-of-type(6)": "afternoon",
          "p:nth-of-type(7)": "evening",
          "p:nth-of-type(8)": "flexible",
          "p:nth-of-type(9)": "benefitTitle",
          "p:nth-of-type(10)": "benefit1",
          "p:nth-of-type(11)": "benefit2",
          "p:nth-of-type(12)": "benefit3",
          "p:nth-of-type(13)": "requireTitle",
          "p:nth-of-type(14)": "require"
        };
        // Lặp qua danh sách và thay nội dung
        for (const selector in map) {
          const el = story.querySelector(selector);
          if (el) el.textContent = langData[map[selector]];
        }
        // Cập nhật nút “Tìm hiểu thêm / Learn More”
        const learnMoreBtn = story.querySelector(".btn");
        if (learnMoreBtn) learnMoreBtn.textContent = langData.learnMore;
      }
    }
// --- Nút “Đăng nhập / Login” ---
const loginBtn = document.querySelector(".btn.login-btn span");
if (loginBtn) {
  loginBtn.textContent = currentLang === "vi" ? "Đăng nhập" : "Login";
}

    // --- Cập nhật nút chuyển ngôn ngữ ---
    langBtn.textContent = currentLang === "vi" ? "EN" : "VI";

  
    // Lưu lại lựa chọn vào localStorage
    localStorage.setItem("lang", currentLang);
  }

  // Khi bấm nút đổi ngôn ngữ thì gọi hàm switchLang
  langBtn.addEventListener("click", switchLang);

  // Nếu lần trước người dùng chọn tiếng Anh → tự động chuyển khi tải lại trang
  if (currentLang === "en") switchLang();
});
