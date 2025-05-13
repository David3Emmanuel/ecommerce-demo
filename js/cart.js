// Shopping Cart functionality

class ShoppingCart {
  constructor() {
    this.items = [];
    this.total = 0;

    // Check if there's a cart in local storage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        this.items = cartData.items || [];
        this.updateTotal();
      } catch (e) {
        console.error("Error loading cart from local storage:", e);
      }
    }
  }

  // Add an item to the cart
  addItem(id, name, price, quantity = 1, image) {
    // Check if the item already exists in the cart
    const existingItem = this.items.find((item) => item.id === id);

    if (existingItem) {
      // If it exists, increase the quantity
      existingItem.quantity += quantity;
    } else {
      // Otherwise, add the new item
      this.items.push({
        id,
        name,
        price,
        quantity,
        image,
      });
    }

    // Update the cart
    this.updateCart();

    // Show a notification
    this.showNotification(`${name} added to cart`);
  }

  // Remove an item from the cart
  removeItem(id) {
    const index = this.items.findIndex((item) => item.id === id);

    if (index !== -1) {
      const name = this.items[index].name;
      this.items.splice(index, 1);

      // Update the cart
      this.updateCart();

      // Show a notification
      this.showNotification(`${name} removed from cart`);
    }
  }

  // Update item quantity
  updateQuantity(id, quantity) {
    const item = this.items.find((item) => item.id === id);

    if (item) {
      item.quantity = quantity;

      if (quantity <= 0) {
        this.removeItem(id);
      } else {
        this.updateCart();
      }
    }
  }

  // Calculate the total price
  updateTotal() {
    this.total = this.items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
  }

  // Update the cart display and save to local storage
  updateCart() {
    // Update the total
    this.updateTotal();

    // Update the cart icon count
    this.updateCartCount();

    // Save to local storage
    this.saveCart();

    // If the cart page is open, refresh the display
    if (window.location.href.includes("cart.html")) {
      this.displayCartItems();
    }
  }

  // Update the cart count in the navigation
  updateCartCount() {
    const cartCount = document.querySelector(".cart-count");
    if (cartCount) {
      // Calculate total quantity
      const totalItems = this.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      cartCount.textContent = totalItems;

      if (totalItems > 0) {
        cartCount.style.display = "flex";
      } else {
        cartCount.style.display = "none";
      }
    }
  }

  // Save the cart to local storage
  saveCart() {
    localStorage.setItem(
      "cart",
      JSON.stringify({
        items: this.items,
      })
    );
  }

  // Display the cart items in the cart page
  displayCartItems() {
    const cartContainer = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    if (cartContainer) {
      if (this.items.length === 0) {
        cartContainer.innerHTML =
          '<p class="empty-cart">Your cart is empty</p>';

        if (cartTotal) {
          cartTotal.textContent = "0.00";
        }
      } else {
        // Clear the container
        cartContainer.innerHTML = "";

        // Add each item
        this.items.forEach((item) => {
          const cartItem = document.createElement("div");
          cartItem.className = "cart-item";
          cartItem.innerHTML = `
                        <div class="cart-item-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="cart-item-details">
                            <h3>${item.name}</h3>
                            <p class="cart-item-price">$${item.price.toFixed(
                              2
                            )}</p>
                        </div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn minus" data-id="${
                              item.id
                            }">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn plus" data-id="${
                              item.id
                            }">+</button>
                        </div>
                        <div class="cart-item-subtotal">
                            $${(item.price * item.quantity).toFixed(2)}
                        </div>
                        <button class="remove-btn" data-id="${
                          item.id
                        }">✕</button>
                    `;

          cartContainer.appendChild(cartItem);
        });

        // Setup event listeners for the buttons
        document.querySelectorAll(".quantity-btn.minus").forEach((btn) => {
          btn.addEventListener("click", () => {
            this.updateQuantity(
              parseInt(btn.dataset.id),
              this.items.find((item) => item.id === parseInt(btn.dataset.id))
                .quantity - 1
            );
          });
        });

        document.querySelectorAll(".quantity-btn.plus").forEach((btn) => {
          btn.addEventListener("click", () => {
            this.updateQuantity(
              parseInt(btn.dataset.id),
              this.items.find((item) => item.id === parseInt(btn.dataset.id))
                .quantity + 1
            );
          });
        });

        document.querySelectorAll(".remove-btn").forEach((btn) => {
          btn.addEventListener("click", () => {
            this.removeItem(parseInt(btn.dataset.id));
          });
        });

        // Update the total
        if (cartTotal) {
          cartTotal.textContent = this.total.toFixed(2);
        }
      }
    }
  }

  // Show a notification
  showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;

    document.body.appendChild(notification);

    // Show the notification
    setTimeout(() => {
      notification.classList.add("show");
    }, 10);

    // Hide and remove the notification after 3 seconds
    setTimeout(() => {
      notification.classList.remove("show");

      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // Clear the cart
  clearCart() {
    this.items = [];
    this.updateCart();
  }
}

// Initialize the shopping cart
const cart = new ShoppingCart();

// Initialize the cart when the document is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Update the cart count in the UI
  cart.updateCartCount();

  // Display cart items if on the cart page
  if (window.location.href.includes("cart.html")) {
    cart.displayCartItems();
  }

  // Add event listener to the checkout button if it exists
  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      alert(
        "Thank you for your order! This would navigate to a payment gateway in a real store."
      );
      cart.clearCart();
      window.location.href = "../index.html";
    });
  }
});
