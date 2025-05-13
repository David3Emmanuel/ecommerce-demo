// Main JavaScript file

document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation Toggle
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");

  burger.addEventListener("click", function () {
    nav.classList.toggle("active");

    // Animation for burger menu
    burger.classList.toggle("toggle");
  });

  // Load Featured Items
  loadFeaturedItems();

  // Add event listener to CTA button
  document.querySelector(".cta-button").addEventListener("click", function () {
    alert("Welcome! Thank you for your interest!");
  });

  // Hero Slideshow
  initHeroSlideshow();
});

// Function to load featured items
function loadFeaturedItems() {
  const featuredItems = [
    {
      title: "Xiaomi Redmi A5",
      description:
        "Latest smartphone with excellent features at an affordable price. Get the best mobile experience.",
      image: "assets/images/Xiaomi Redmi A5.jpg",
    },
    {
      title: "20000mAh Power Bank",
      description:
        "High-capacity power bank to keep your devices charged on the go. Perfect for travel and everyday use.",
      image: "assets/images/20000mAh Power Bank.jpg",
    },
    {
      title: "Rechargeable Floor Standing Fan",
      description:
        "Stay cool with this energy-efficient rechargeable fan. Ideal for homes and offices.",
      image: "assets/images/Rechargeable Floor Standing Fan.jpg",
    },
  ];

  const featuredContainer = document.querySelector(".featured-items");

  // Clear container
  featuredContainer.innerHTML = "";

  // Add items to container
  featuredItems.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.className = "item";
    itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="item-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <a href="#" class="button">Learn More</a>
            </div>
        `;

    featuredContainer.appendChild(itemElement);
  });
}

// Function to handle hero slideshow
function initHeroSlideshow() {
  const slides = document.querySelectorAll(".hero-slide");
  let currentSlide = 0;

  // Initially set the first slide as active
  slides[0].classList.add("active");

  // Function to change slides
  function nextSlide() {
    // Remove active class from current slide
    slides[currentSlide].classList.remove("active");

    // Move to next slide or loop back to first
    currentSlide = (currentSlide + 1) % slides.length;

    // Add active class to new current slide
    slides[currentSlide].classList.add("active");
  }

  // Set interval for automatic slideshow
  setInterval(nextSlide, 5000);
}
