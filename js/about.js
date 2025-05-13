// About page JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Animate elements when they come into view
  const animatedElements = document.querySelectorAll(
    ".team-member, .company-values .value-card, .about-content h2"
  );

  // Remove default animations that are handled by the scroll observer
  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.animation = "none";
  });

  // Create an intersection observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // If element is in view
        if (entry.isIntersecting) {
          // Add animation class
          entry.target.style.animation = "fadeInUp 0.8s forwards";

          // Different delay for team members
          if (entry.target.classList.contains("team-member")) {
            const index = Array.from(
              document.querySelectorAll(".team-member")
            ).indexOf(entry.target);
            entry.target.style.animationDelay = `${0.2 * (index + 1)}s`;
          }

          // Different delay for value cards
          if (entry.target.classList.contains("value-card")) {
            const index = Array.from(
              document.querySelectorAll(".value-card")
            ).indexOf(entry.target);
            entry.target.style.animationDelay = `${0.2 * (index + 1)}s`;
          }

          // Stop observing after animation
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1, // Trigger when at least 10% of the element is visible
    }
  );

  // Observe all animated elements
  animatedElements.forEach((element) => {
    observer.observe(element);
  });
});
