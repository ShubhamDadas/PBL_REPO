
window.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
    function showSlide() {
      slides[currentSlide].classList.add("active");
    }
    function hideSlide() {
      slides[currentSlide].classList.remove("active");
    }
    function nextSlide() {
      hideSlide();
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide();
    }
    setInterval(nextSlide, 3000); // Change slide every 5 seconds
    showSlide();
  });