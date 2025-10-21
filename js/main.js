// ===== COFFEE SHOP MAIN SCRIPT =====

// ===== PAGE TRANSITION =====
function initPageTransition() {
  // Tạo overlay transition
  const overlay = document.createElement('div');
  overlay.className = 'page-transition-overlay';
  document.body.appendChild(overlay);

  // Xử lý tất cả các link navigation
  const links = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="javascript:"]):not([target="_blank"])');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Bỏ qua các link đặc biệt
      if (!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return;
      }

      e.preventDefault();
      
      // Hiện overlay với hiệu ứng mượt
      document.body.classList.add('page-loading');
      overlay.classList.add('active');
      
      // Thêm hiệu ứng fade out cho content hiện tại
      document.body.style.transition = 'opacity 0.3s ease';
      document.body.style.opacity = '0.7';
      
      // Chuyển trang sau 600ms để có thời gian animation
      setTimeout(() => {
        window.location.href = href;
      }, 600);
    });
  });
}

// ===== LOGIN FUNCTIONALITY (CHỈ CHO TRANG LOGIN) =====
const ADMIN_CREDENTIALS = {
  email: 'coffee@gmail.com',
  password: '123',          
  displayName: 'Quản trị viên'
};

// Additional regular user
const USER_TMINH = {
  email: 'toiminh@gmail.com',
  password: '123',
  displayName: 'Minh'
};

const SESSION_KEY = 'coffee_admin_session';

// Ensure all login button links point to the correct login page depending on current path
function normalizeLoginHref() {
  const loginAnchors = document.querySelectorAll('a.btn.login-btn');
  loginAnchors.forEach(a => {
    try {
      const inHtml = location.pathname.includes('/html/');
      // if we're inside the html/ folder, use relative 'login.html', otherwise point to 'html/login.html'
      a.setAttribute('href', inHtml ? 'login.html' : 'html/login.html');
    } catch (e) {}
  });
}

// Header scroll effect
function initHeaderScrollEffect() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
  });
}

// Scroll-spy: highlight nav links when their section is in view and smooth-scroll on anchor clicks
function initScrollSpy() {
  const nav = document.querySelector('.main-menu');
  if (!nav) return;

  const links = Array.from(nav.querySelectorAll('a[href*="#"]'));
  if (!links.length) return;

  // collect unique target sections
  const sections = links
    .map(l => {
      try {
        const url = new URL(l.href, location.href);
        const hash = url.hash.replace('#', '');
        return hash ? document.getElementById(hash) : null;
      } catch (e) {
        return null;
      }
    })
    .filter(Boolean);

  function setActiveHash(hash) {
    links.forEach(l => {
      try {
        const url = new URL(l.href, location.href);
        const h = url.hash.replace('#', '');
        if (h === hash) l.classList.add('active'); else l.classList.remove('active');
      } catch (e) {}
    });
  }

  // click handler: smooth-scroll when link target is on same page
  links.forEach(link => {
    link.addEventListener('click', (ev) => {
      const href = link.getAttribute('href');
      if (!href || !href.includes('#')) return; // not an anchor

      const url = new URL(link.href, location.href);
      const targetId = url.hash.replace('#', '');
      const targetEl = document.getElementById(targetId);

      // if target exists and the link points to the current page, smooth scroll and prevent full navigation
      if (targetEl && url.pathname === location.pathname) {
        ev.preventDefault();
        // compute header offset so content isn't hidden under fixed header
        const header = document.querySelector('.site-header');
        const offset = header ? header.getBoundingClientRect().height + 12 : 96;
        const top = window.scrollY + targetEl.getBoundingClientRect().top - offset;
        window.scrollTo({ top, behavior: 'smooth' });
        // update hash without jumping
        try { history.replaceState(null, '', '#' + targetId); } catch (e) {}
        // ensure active state matches immediately
        setActiveHash(targetId);
      }
    });
  });

  // use IntersectionObserver to update active link when scrolling
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        if (id) setActiveHash(id);
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(s => io.observe(s));

  // on load, if there's a hash, set active and scroll smoothly a tiny bit to ensure visibility
  if (location.hash) {
    const h = location.hash.replace('#','');
    const el = document.getElementById(h);
    if (el) {
      setTimeout(() => {
        const header = document.querySelector('.site-header');
        const offset = header ? header.getBoundingClientRect().height + 12 : 96;
        const top = window.scrollY + el.getBoundingClientRect().top - offset;
        window.scrollTo({ top, behavior: 'smooth' });
        setActiveHash(h);
      }, 120);
    }
  }
}

// Login form handlers (chỉ chạy nếu có form login)
document.addEventListener('DOMContentLoaded', () => {
  // Khởi tạo page transition cho tất cả trang
  initPageTransition();
  
  // Khởi tạo header scroll effect
  initHeaderScrollEffect();
  // Khởi tạo scroll-spy để highlight menu khi cuộn và xử lý click anchor
  initScrollSpy();
  // normalize login anchor hrefs for current location
  normalizeLoginHref();
  
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
        // Admin login -> order dashboard
        if (
          email.toLowerCase() === ADMIN_CREDENTIALS.email.toLowerCase() &&
          password === ADMIN_CREDENTIALS.password
        ) {
          const sessionObj = {
            role: 'admin',
            email: ADMIN_CREDENTIALS.email,
            displayName: ADMIN_CREDENTIALS.displayName,
            loginAt: Date.now()
          };
          localStorage.setItem(SESSION_KEY, JSON.stringify(sessionObj));
          showSuccess('Đăng nhập thành công. Đang chuyển hướng...');
          setTimeout(() => {
            window.location.href = 'order.html';
          }, 600);
        }
        // Regular user (Minh) -> go to homepage and show avatar + logout
        else if (email.toLowerCase() === USER_TMINH.email.toLowerCase() && password === USER_TMINH.password) {
          const sessionObj = {
            role: 'user',
            email: USER_TMINH.email,
            displayName: USER_TMINH.displayName,
            loginAt: Date.now()
          };
          localStorage.setItem(SESSION_KEY, JSON.stringify(sessionObj));
          showSuccess('Đăng nhập thành công. Đang chuyển hướng về trang chủ...');
          setTimeout(() => {
            window.location.href = '../index.html';
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

// Render header user state across pages (avatar + logout)
function renderHeaderUser() {
  const session = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
  const headerRight = document.querySelector('.header-right');
  if (!headerRight) return;

  // remove existing avatar/logout added previously
  const existingAvatar = headerRight.querySelector('.user-avatar');
  const existingLogout = headerRight.querySelector('.btn.logout-inline');
  existingAvatar?.remove();
  existingLogout?.remove();

  // hide original login button if present when session exists
  const origLogin = document.querySelector('.btn.login-btn');
  // hide original login button when signed in, show when logged out
  if (session) {
    if (origLogin) origLogin.style.display = 'none';
  } else {
    if (origLogin) origLogin.style.display = '';
  }

  if (session && session.role === 'user') {
    // create a small custom dropdown menu for the user
    const menu = document.createElement('div');
    menu.className = 'user-menu';

    const avatar = document.createElement('button');
    avatar.className = 'user-avatar';
    avatar.type = 'button';
    avatar.textContent = session.displayName ? session.displayName.charAt(0).toUpperCase() : 'U';
    avatar.title = session.displayName || session.email;
    menu.appendChild(avatar);

    const dropdown = document.createElement('div');
    dropdown.className = 'user-menu-dropdown';

    const profile = document.createElement('a');
    profile.className = 'dropdown-item menu-profile';
  profile.href = 'account.html';
    profile.textContent = session.displayName || session.email;
    dropdown.appendChild(profile);

    const sep = document.createElement('div');
    sep.className = 'dropdown-divider';
    dropdown.appendChild(sep);

    const logout = document.createElement('button');
    logout.className = 'dropdown-item logout-btn-inline menu-logout';
    logout.type = 'button';
    logout.textContent = 'Đăng xuất';
    logout.addEventListener('click', () => {
      // sign out: remove session and re-render header so the original login button returns
      localStorage.removeItem(SESSION_KEY);
      renderHeaderUser();
      normalizeLoginHref();
      showToast('Đã đăng xuất');
    });
    dropdown.appendChild(logout);

    menu.appendChild(dropdown);
    headerRight.insertBefore(menu, headerRight.firstChild);

    // toggle and outside click
    avatar.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('open');
    });
    document.addEventListener('click', () => menu.classList.remove('open'));
    // stop clicks inside dropdown from closing when clicking on items
    dropdown.addEventListener('click', (e) => e.stopPropagation());
  }
  // admin case: show logout too
  else if (session && session.role === 'admin') {
    // admin also gets a small dropdown with dashboard + logout
    const menu = document.createElement('div');
    menu.className = 'user-menu';

    const avatar = document.createElement('button');
    avatar.className = 'user-avatar';
    avatar.type = 'button';
    avatar.textContent = session.displayName ? session.displayName.charAt(0).toUpperCase() : 'A';
    avatar.title = session.displayName || session.email;
    menu.appendChild(avatar);

    const dropdown = document.createElement('div');
    dropdown.className = 'user-menu-dropdown';

    const dash = document.createElement('a');
    dash.className = 'dropdown-item menu-dashboard';
    // ensure correct relative path depending on current location
    dash.href = location.pathname.includes('/html/') ? 'order.html' : 'html/order.html';
    dash.textContent = 'Dashboard';
    dropdown.appendChild(dash);

  const acct = document.createElement('a');
  acct.className = 'dropdown-item menu-account';
  acct.href = location.pathname.includes('/html/') ? 'account.html' : 'html/account.html';
  acct.textContent = 'Quản lý tài khoản';
  dropdown.appendChild(acct);

    const sep = document.createElement('div');
    sep.className = 'dropdown-divider';
    dropdown.appendChild(sep);

    const logout = document.createElement('button');
    logout.className = 'dropdown-item logout-btn-inline';
    logout.type = 'button';
    logout.textContent = 'Đăng xuất';
    logout.addEventListener('click', () => {
      // sign out: remove session and re-render header so the original login button returns
      localStorage.removeItem(SESSION_KEY);
      renderHeaderUser();
      normalizeLoginHref();
      showToast('Đã đăng xuất');
    });
    dropdown.appendChild(logout);

    menu.appendChild(dropdown);
    headerRight.appendChild(menu);

    avatar.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('open');
    });
    document.addEventListener('click', () => menu.classList.remove('open'));
    dropdown.addEventListener('click', (e) => e.stopPropagation());
  }
}

// ensure header is rendered on initial load
document.addEventListener('DOMContentLoaded', renderHeaderUser);

// Logout confirmation modal helper
function showLogoutConfirm() {
  // if modal exists reuse
  let modal = document.getElementById('logout-confirm-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'logout-confirm-modal';
    modal.className = 'logout-modal';
    modal.innerHTML = `
      <div class="logout-card">
        <h3>Bạn có muốn đăng xuất?</h3>
        <p class="small">Bạn sẽ phải đăng nhập lại để tiếp tục.</p>
        <div style="display:flex;gap:10px;margin-top:18px;justify-content:flex-end;">
          <button id="logout-cancel" class="btn secondary">Hủy</button>
          <button id="logout-confirm" class="btn primary">Đăng xuất</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // wire buttons
    modal.querySelector('#logout-cancel').addEventListener('click', () => {
      modal.classList.remove('active');
    });
    modal.querySelector('#logout-confirm').addEventListener('click', () => {
      localStorage.removeItem(SESSION_KEY);
      modal.classList.remove('active');
      renderHeaderUser();
      normalizeLoginHref();
      showToast('Bạn đã đăng xuất');
      // redirect to home
      const inHtml = location.pathname.includes('/html/');
      window.location.href = inHtml ? 'login.html' : 'html/login.html';
    });
  }

  // show modal
  setTimeout(() => modal.classList.add('active'), 30);
}

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
  
  // ===== XỬ LÝ NÚT "XEM THÊM" SIGNATURE DRINKS =====
  const showMoreDrinksBtn = document.getElementById("show-more-drinks");
  const hiddenDrinks = document.querySelectorAll(".hidden-drink");
  
  if (showMoreDrinksBtn && hiddenDrinks.length > 0) {
    let isExpanded = false;
    
    showMoreDrinksBtn.addEventListener("click", function(e) {
      e.preventDefault();
      
      if (!isExpanded) {
        // Show hidden drinks
        hiddenDrinks.forEach((drink, index) => {
          setTimeout(() => {
            drink.style.display = "block";
            setTimeout(() => {
              drink.classList.add("show");
            }, 50);
          }, index * 100);
        });
        
        showMoreDrinksBtn.innerHTML = '<span>Thu gọn</span><i class="fas fa-chevron-up"></i>';
        showMoreDrinksBtn.classList.add("expanded");
        isExpanded = true;
        
      } else {
        // Hide drinks
        hiddenDrinks.forEach((drink, index) => {
          setTimeout(() => {
            drink.classList.remove("show");
            setTimeout(() => {
              drink.style.display = "none";
            }, 400);
          }, index * 50);
        });
        
        showMoreDrinksBtn.innerHTML = '<span>Xem thêm món</span><i class="fas fa-chevron-down"></i>';
        showMoreDrinksBtn.classList.remove("expanded");
        isExpanded = false;
      }
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
    const slides = heroSlider.querySelectorAll('.hero.hero--layered');
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

  // Cập nhật nút lang-toggle để phản ánh ngôn ngữ hiện tại
  langBtn.textContent = currentLang === "vi" ? "EN" : "VI";

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
      ],

      // --- Hotro page ---
      addressTitle: "📍 Address Info",
      hoursTitle: "🕐 Opening Hours",
      contactTitle: "✉️ Contact Info",
      hoursText: "Monday – Friday: 9h30-22:00\nSaturday, Sunday: 9h30-23:00",
      emailText: "CatCaFe2025@gmail.com\nHotline: 0378093269-0965299505",
      namePlaceholder: "Your Name:",
      emailPlaceholder: "Gmail:",
      messagePlaceholder: "Comment:",
      submitBtn: "Submit",
      successMsg: "✅ Sent successfully! Thank you for contacting Cat Cafe ❤️",

      // --- Datban page ---
      bookingTitle: "Reserve Your Table",
      nameLabel: "Full Name",
      emailLabel: "Email",
      phoneLabel: "Phone Number",
      dateLabel: "Date",
      timeLabel: "Time",
      guestsLabel: "Number of Guests",
      noteLabel: "Notes (Optional)",
      selectGuests: "-- Select number of guests --",
      bookingBtn: "Reserve Now",
      backBtn: "Back to Home",
      closeBtn: "Close",
      viewMenuBtn: "View Menu",
      bookingSuccess: "✅ Booking confirmed! We'll see you soon!",

      // --- Cart page ---
      cartTitle: "Giỏ hàng",
      emptyCart: "Giỏ hàng trống",
      backToMenu: "Quay lại thực đơn",
      subtotal: "Tạm tính",
      shipping: "Phí giao hàng",
      total: "Tổng cộng",
      checkout: "Thanh toán",
      clearCart: "Xóa tất cả",
      quantity: "Số lượng",

      // --- Menu page ---
      searchPlaceholder: "Tìm kiếm món ăn, đồ uống...",
      addToCart: "Thêm vào giỏ",
      price: "Giá"
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
    ],

    // --- Hotro page ---
    addressTitle: "📍 Address Info",
    hoursTitle: "🕐 Opening Hours",
    contactTitle: "✉️ Contact Info",
    hoursText: "Monday – Friday: 9:30 AM - 10:00 PM\nSaturday, Sunday: 9:30 AM - 11:00 PM",
    emailText: "CatCaFe2025@gmail.com\nHotline: 0378093269-0965299505",
    nameLabel: "Your Name:",
    emailLabel: "Email:",
    messagePlaceholder: "Your Message:",
    submitBtn: "Submit",
    successMsg: "✅ Sent successfully! Thank you for contacting Cat Cafe ❤️",

    // --- Datban page ---
    bookingTitle: "Reserve Your Table",
    fullNameLabel: "Full Name",
    emailLabel: "Email",
    phoneLabel: "Phone Number",
    dateLabel: "Date",
    timeLabel: "Time",
    guestsLabel: "Number of Guests",
    reserveBtn: "Reserve",
    bookingSuccess: "✅ Booking confirmed! We'll see you soon!",

    // --- Cart page ---
    cartTitle: "Shopping Cart",
    emptyCart: "Your cart is empty",
    backToMenu: "Back to Menu",
    subtotal: "Subtotal",
    shipping: "Shipping Fee",
    total: "Total",
    checkout: "Checkout",
    clearCart: "Clear Cart",
    quantity: "Quantity",

    // --- Menu page ---
    searchPlaceholder: "Search menu...",
    addToCart: "Add to Cart",
    price: "Price"
  }
};

// ========================================
// HÀM GENERIC: DỊCH TOÀN BỘ TRANG
// ========================================
function applyGenericTranslations(lang) {
  // Dịch tất cả element có data-translate attribute
  document.querySelectorAll("[data-translate]").forEach((el) => {
    const key = el.getAttribute("data-translate");
    const t = translations[lang];
    
    // Hỗ trợ nested keys (ví dụ: "menu.home")
    const keys = key.split(".");
    let value = t;
    for (const k of keys) {
      value = value?.[k];
    }
    
    if (value) {
      // Nếu là attribute như placeholder, title, etc.
      const attr = el.getAttribute("data-translate-attr");
      if (attr) {
        el.setAttribute(attr, value);
      } else {
        // Nếu không, cập nhật textContent
        el.textContent = value;
      }
    }
  });
}

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

    // --- Dịch các element có data-translate attribute (dành cho tất cả trang) ---
    applyGenericTranslations(currentLang);
  
    // Lưu lại lựa chọn vào localStorage
    localStorage.setItem("lang", currentLang);
  }

  // Khi bấm nút đổi ngôn ngữ thì gọi hàm switchLang
  langBtn.addEventListener("click", switchLang);

  // Áp dụng ngôn ngữ đã lưu khi tải trang
  // Nếu lần trước người dùng chọn tiếng Anh → tự động chuyển khi tải lại trang
  if (currentLang === "en") {
    const t = translations.en;
    const menuLinks = document.querySelectorAll(".main-menu a");
    if (menuLinks.length >= 5) {
      menuLinks[0].textContent = t.home;
      menuLinks[1].textContent = t.menu;
      menuLinks[2].textContent = t.jobs;
      menuLinks[3].textContent = t.feedback;
      menuLinks[4].textContent = t.contact;
    }
  }
});

// ===== CART FUNCTIONALITY =====
// Hàm cập nhật số lượng giỏ hàng
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const cartBtn = document.getElementById("cart-btn");
  if (cartBtn) {
    let badge = cartBtn.querySelector('.mini-badge');
    if (!badge && totalItems > 0) {
      badge = document.createElement('span');
      badge.className = 'mini-badge';
      cartBtn.appendChild(badge);
    }
    
    if (badge) {
      if (totalItems > 0) {
        badge.textContent = totalItems;
        badge.style.display = 'block';
      } else {
        badge.style.display = 'none';
      }
    }
  }
}

// Thêm vào giỏ hàng
function addToCart(name, price) {
  const item = {
    name: name,
    price: price,
    quantity: 1,
    note: ""
  };

  // Lấy giỏ hàng cũ
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Kiểm tra món đã có trong giỏ chưa
  let existing = cart.find(x => x.name === item.name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push(item);
  }

  // Lưu lại vào localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Cập nhật hiển thị
  updateCartCount();

  // Hiện thông báo
  showToast("Đã thêm vào giỏ hàng!");
}

// Toast notification
function showToast(message, opts = {}) {
  // opts: { type: 'success'|'error'|'info', duration: ms, actionText: string, actionHandler: fn }
  const { type = 'info', duration = 3000, actionText, actionHandler } = opts;
  let toast = document.createElement('div');
  toast.className = 'custom-toast';
  if (type) toast.classList.add('custom-toast--' + type);

  const content = document.createElement('div');
  content.className = 'custom-toast__content';
  content.textContent = message;
  toast.appendChild(content);

  if (actionText && typeof actionHandler === 'function') {
    const actionBtn = document.createElement('button');
    actionBtn.className = 'custom-toast__action';
    actionBtn.textContent = actionText;
    actionBtn.addEventListener('click', (e) => {
      try { actionHandler(e); } catch (e) { console.error(e); }
      // remove toast immediately after action
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 260);
    });
    toast.appendChild(actionBtn);
  }

  document.body.appendChild(toast);
  // trigger enter
  setTimeout(() => toast.classList.add('show'), 60);

  // auto-dismiss
  const auto = setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 260);
  }, duration + 60);

  // allow manual close on click outside action (clicking toast hides it)
  toast.addEventListener('click', (e) => {
    if (e.target.classList.contains('custom-toast__action')) return; // ignore action button clicks
    clearTimeout(auto);
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 180);
  });

  return toast;
}

// Khởi tạo cart khi DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log("Index.html cart initialized"); // Debug
  // Cập nhật cart count
  updateCartCount();
  
  // Xử lý click vào nút giỏ hàng
  const cartBtn = document.getElementById("cart-btn");
  if (cartBtn) {
    cartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'html/cart.html';
    });
  }

  // Cart popup elements
  const popup = document.getElementById("cart-popup");
  const popupName = document.getElementById("popup-name");
  const popupPrice = document.getElementById("popup-price");
  const quantityInput = document.getElementById("quantity-input");
  const noteInput = document.getElementById("note-input");
  const btnCancel = document.getElementById("cancel-cart");
  const btnConfirm = document.getElementById("confirm-cart");
  const btnDecrease = document.getElementById("decrease-qty");
  const btnIncrease = document.getElementById("increase-qty");

  // Xử lý các nút "Thêm đồ" - mở popup
  const addCartBtns = document.querySelectorAll('.btn-add-cart');
  addCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = btn.getAttribute('data-name');
      const price = parseInt(btn.getAttribute('data-price'));
      
      // Cập nhật popup
      if (popupName) popupName.textContent = name;
      if (popupPrice) popupPrice.textContent = `Giá: ${price.toLocaleString()}đ`;
      if (quantityInput) quantityInput.value = 1;
      if (noteInput) noteInput.value = "";
      
      // Hiện popup
      if (popup) popup.style.display = "block";
    });
  });

  // Xử lý quantity controls
  if (btnDecrease) {
    btnDecrease.addEventListener('click', () => {
      const current = parseInt(quantityInput.value);
      if (current > 1) quantityInput.value = current - 1;
    });
  }

  if (btnIncrease) {
    btnIncrease.addEventListener('click', () => {
      const current = parseInt(quantityInput.value);
      if (current < 10) quantityInput.value = current + 1;
    });
  }

  // Hủy popup
  if (btnCancel) {
    btnCancel.addEventListener('click', () => {
      popup.style.display = "none";
    });
  }

  // Xác nhận thêm vào giỏ
  if (btnConfirm) {
    btnConfirm.addEventListener('click', () => {
      const item = {
        name: popupName.textContent,
        price: Number(popupPrice.textContent.replace(/\D/g, "")),
        quantity: Number(quantityInput.value),
        note: noteInput.value
      };

      // Lấy giỏ hàng cũ
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Kiểm tra món đã có trong giỏ chưa
      let existing = cart.find(x => x.name === item.name);
      if (existing) {
        existing.quantity = Number(existing.quantity) + Number(item.quantity);
        if (item.note && item.note !== existing.note) {
          existing.note = existing.note ? existing.note + "; " + item.note : item.note;
        }
      } else {
        cart.push(item);
      }

      // Lưu lại vào localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Cập nhật hiển thị
      updateCartCount();

      // Hiện thông báo
      showToast("Đã thêm vào giỏ hàng!");

      // Đóng popup
      popup.style.display = "none";
    });
  }

  // Click outside popup để đóng
  if (popup) {
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.style.display = "none";
      }
    });
  }
});
