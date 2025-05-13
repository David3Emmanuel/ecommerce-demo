document.addEventListener("DOMContentLoaded", function () {
  // Product data
  const products = [
    {
      id: 1,
      name: "Xiaomi Redmi A5",
      price: 299.99,
      description:
        "Latest smartphone with 64GB storage, 4GB RAM, and a stunning 6.5-inch display. Includes dual camera system.",
      image: "../assets/images/Xiaomi Redmi A5.jpg",
      category: "electronics",
    },
    {
      id: 2,
      name: "20000mAh Power Bank",
      price: 49.99,
      description:
        "Fast-charging 20000mAh power bank with dual USB ports. Enough capacity to charge your smartphone multiple times.",
      image: "../assets/images/20000mAh Power Bank.jpg",
      category: "electronics",
    },
    {
      id: 3,
      name: "Rechargeable Floor Standing Fan",
      price: 89.99,
      description:
        "Energy-efficient rechargeable fan with remote control. Features 3 speed settings and oscillation function.",
      image: "../assets/images/Rechargeable Floor Standing Fan.jpg",
      category: "appliances",
    },
    {
      id: 4,
      name: "Nivea Cocoa Body Lotion",
      price: 12.99,
      description:
        "Moisturizing body lotion with cocoa butter. Keeps your skin hydrated for up to 48 hours. Dermatologically tested.",
      image: "../assets/images/Nivea Cocoa Body Lotion.jpg",
      category: "health",
    },
    {
      id: 5,
      name: "Premium Phone Case",
      price: 24.99,
      description:
        "Durable protective case for Xiaomi Redmi A5. Shock-absorbing design with sleek finish.",
      image: "../assets/images/Phone Case.jpg",
      category: "accessories",
    },
    {
      id: 6,
      name: "Wireless Charging Pad",
      price: 35.99,
      description:
        "Fast wireless charging pad compatible with all Qi-enabled devices. Elegant design with LED indicator.",
      image: "../assets/images/Wireless Charging Pad.jpg",
      category: "accessories",
    },
  ];

  // Load products
  function loadProducts(filterCategory = "all") {
    const productGrid = document.getElementById("productGrid");
    productGrid.innerHTML = "";

    const filteredProducts =
      filterCategory === "all"
        ? products
        : products.filter((product) => product.category === filterCategory);

    filteredProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.dataset.category = product.category;

      productCard.innerHTML = `
                        <img src="${product.image}" alt="${
        product.name
      }" class="product-image">
                        <div class="product-info">
                            <h3 class="product-title">${product.name}</h3>
                            <p class="product-price">$${product.price.toFixed(
                              2
                            )}</p>
                            <p class="product-description">${
                              product.description
                            }</p>
                            <button class="add-to-cart" data-id="${
                              product.id
                            }">Add to Cart</button>
                        </div>
                    `;

      productGrid.appendChild(productCard);
    });

    // Add event listeners to Add to Cart buttons
    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = parseInt(this.dataset.id);
        const product = products.find((p) => p.id === productId);

        if (product) {
          cart.addItem(
            product.id,
            product.name,
            product.price,
            1,
            product.image
          );
        }
      });
    });
  }

  // Load all products initially
  loadProducts();

  // Filter buttons functionality
  document.querySelectorAll(".filter-btn").forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      document.querySelectorAll(".filter-btn").forEach((btn) => {
        btn.classList.remove("active");
      });

      // Add active class to clicked button
      this.classList.add("active");

      // Get filter value
      const filterValue = this.dataset.filter;

      // Load products based on filter
      loadProducts(filterValue);
    });
  });
});
