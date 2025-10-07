// === SLIDESHOW TỰ ĐỘNG ===
const slides = document.querySelectorAll('.slide');
let currentIndex = 0;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

document.querySelector('.next').onclick = () => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
};

document.querySelector('.prev').onclick = () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
};

// Tự động đổi ảnh sau 5 giây
setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}, 5000);
