// Animations and scroll effects

document.addEventListener("DOMContentLoaded", function () {
  // Initialize animations for elements in viewport on page load
  animateElementsInViewport();

  // Add scroll listener to animate elements as they come into view
  window.addEventListener("scroll", animateElementsInViewport);
});

// Function to check if an element is in the viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <=
      (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
    rect.bottom >= 0
  );
}

// Function to animate elements when they enter the viewport
function animateElementsInViewport() {
  const animatedElements = document.querySelectorAll(".animate");

  animatedElements.forEach((element) => {
    if (isInViewport(element) && !element.classList.contains("animated")) {
      element.classList.add("animated");

      // Apply the appropriate animation class
      if (element.classList.contains("fade-in")) {
        element.style.animationName = "fadeIn";
      } else if (element.classList.contains("slide-up")) {
        element.style.animationName = "slideInFromBottom";
      } else if (element.classList.contains("slide-left")) {
        element.style.animationName = "slideInFromLeft";
      } else if (element.classList.contains("slide-right")) {
        element.style.animationName = "slideInFromRight";
      } else if (element.classList.contains("scale-up")) {
        element.style.animationName = "scaleUp";
      }
    }
  });
}
