document.addEventListener("DOMContentLoaded", () => {
    loadCartItems()
    updateCartSummary()
  })
  
  function loadCartItems() {
    const cartItemsContainer = document.getElementById("cart-items")
    const cart = JSON.parse(localStorage.getItem("cart")) || []
  
    // Show empty cart message if cart is empty
    if (cart.length === 0) {
      document.querySelector(".cart-empty").style.display = "block"
      return
    }
  
    // Clear existing items
    cartItemsContainer.innerHTML = ""
  
    // Add each item to the cart
    cart.forEach((item, index) => {
      const cartItem = document.createElement("div")
      cartItem.className = "cart-item"
      cartItem.innerHTML = `
        <div class="cart-item-image">
          <img src="./img/main.png" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <h3 class="cart-item-title">${item.name}</h3>
          <p class="cart-item-subtitle">Sweet delights bakery</p>
          <p class="cart-item-price">$${item.price.toFixed(2)}</p>
        </div>
        <div class="cart-item-quantity">
          <button class="quantity-btn minus" onclick="updateQuantity(${index}, -1)">-</button>
          <input type="number" class="quantity-input" value="${item.quantity}" min="1" onchange="updateQuantityInput(${index}, this.value)">
          <button class="quantity-btn plus" onclick="updateQuantity(${index}, 1)">+</button>
        </div>
        <div class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</div>
        <div class="cart-item-remove" onclick="removeCartItem(${index})">×</div>
      `
  
      cartItemsContainer.appendChild(cartItem)
    })
  }
  
  function updateQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem("cart")) || []
  
    if (cart[index]) {
      cart[index].quantity += change
  
      // Ensure quantity is at least 1
      if (cart[index].quantity < 1) {
        cart[index].quantity = 1
      }
  
      localStorage.setItem("cart", JSON.stringify(cart))
      loadCartItems()
      updateCartSummary()
    }
  }
  
  function updateQuantityInput(index, value) {
    const cart = JSON.parse(localStorage.getItem("cart")) || []
  
    if (cart[index]) {
      cart[index].quantity = Number.parseInt(value) || 1
      localStorage.setItem("cart", JSON.stringify(cart))
      loadCartItems()
      updateCartSummary()
    }
  }
  
  function removeCartItem(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || []
  
    if (cart[index]) {
      cart.splice(index, 1)
      localStorage.setItem("cart", JSON.stringify(cart))
  
      // Update cart count in header
      const cartCount = document.querySelector(".cart-count")
      let count = 0
      cart.forEach((item) => {
        count += item.quantity
      })
      cartCount.textContent = count
  
      loadCartItems()
      updateCartSummary()
  
      // Show empty cart message if cart is empty
      if (cart.length === 0) {
        document.querySelector(".cart-empty").style.display = "block"
      }
    }
  }
  
  function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    let subtotal = 0
  
    cart.forEach((item) => {
      subtotal += item.price * item.quantity
    })
  
    const shipping = subtotal > 0 ? 10 : 0
    const tax = subtotal * 0.08
    const total = subtotal + shipping + tax
  
    document.getElementById("cart-subtotal").textContent = `$${subtotal.toFixed(2)}`
    document.getElementById("cart-shipping").textContent = `$${shipping.toFixed(2)}`
    document.getElementById("cart-tax").textContent = `$${tax.toFixed(2)}`
    document.getElementById("cart-total").textContent = `$${total.toFixed(2)}`
  }
  
  