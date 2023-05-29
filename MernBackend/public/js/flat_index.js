let currentSlide = 0;
let timer;

function showSlide(n) {
  const slides = document.querySelectorAll('.slide');
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
}

function startSlideShow() {
  timer = setInterval(() => {
    showSlide(1);
  }, 3000); // Change slide every 3 seconds (adjust as needed)
}

function stopSlideShow() {
  clearInterval(timer);
}

function changeSlide(n) {
  stopSlideShow();
  showSlide(n);
}

document.querySelector('.prev-btn').addEventListener('click', () => {
  changeSlide(-1);
});

document.querySelector('.next-btn').addEventListener('click', () => {
  changeSlide(1);
});

startSlideShow();
