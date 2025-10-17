
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
