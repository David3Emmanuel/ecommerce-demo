// Testimonials Slider & FAQ functionality

document.addEventListener("DOMContentLoaded", function () {
  // Initialize testimonial slider
  initTestimonialSlider();

  // Initialize FAQ accordion
  initFAQ();
});

// Testimonial slider functionality
function initTestimonialSlider() {
  const testimonials = document.querySelectorAll(".testimonial");
  const dots = document.querySelectorAll(".dot");
  const prevButton = document.querySelector(".slider-prev");
  const nextButton = document.querySelector(".slider-next");

  if (!testimonials.length) return;

  // Set the first testimonial as active
  testimonials[0].classList.add("active");

  // Current slide index
  let currentSlide = 0;
  const totalSlides = testimonials.length;

  // Function to show a specific slide
  function showSlide(index) {
    // Hide all testimonials
    testimonials.forEach((testimonial) => {
      testimonial.classList.remove("active");
    });

    // Remove active class from all dots
    dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    // Show the selected testimonial
    testimonials[index].classList.add("active");

    // Add active class to the corresponding dot
    dots[index].classList.add("active");

    // Update current slide index
    currentSlide = index;
  }

  // Event listeners for dot navigation
  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const slideIndex = parseInt(this.dataset.index);
      showSlide(slideIndex);
    });
  });

  // Event listener for previous button
  if (prevButton) {
    prevButton.addEventListener("click", function () {
      let newIndex = currentSlide - 1;
      if (newIndex < 0) {
        newIndex = totalSlides - 1;
      }
      showSlide(newIndex);
    });
  }

  // Event listener for next button
  if (nextButton) {
    nextButton.addEventListener("click", function () {
      let newIndex = currentSlide + 1;
      if (newIndex >= totalSlides) {
        newIndex = 0;
      }
      showSlide(newIndex);
    });
  }

  // Auto-rotate slides every 5 seconds
  setInterval(function () {
    let newIndex = currentSlide + 1;
    if (newIndex >= totalSlides) {
      newIndex = 0;
    }
    showSlide(newIndex);
  }, 5000);
}

// FAQ accordion functionality
function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", function () {
      // Toggle the active class on the clicked item
      item.classList.toggle("active");

      // Optional: Close other open items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
        }
      });
    });
  });
}
