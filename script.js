// Initialize AOS (if not already initialized elsewhere)
AOS.init({
  duration: 800,
  easing: "ease-out",
  once: false,
})

// Page loader
window.addEventListener("load", () => {
  const loader = document.querySelector(".page-loader")
  setTimeout(() => {
    loader.classList.add("hidden")
    // Initialize AOS after loader is hidden
    AOS.refresh() // Refresh AOS after loader is hidden to re-apply animations
  }, 1500)
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

function toggleMenu() {
  const mobileMenu = document.querySelector(".mobile-menu")
  mobileMenu.classList.toggle("show")
}

// Video player functionality
document.addEventListener("DOMContentLoaded", () => {
  const videoCard = document.querySelector(".ads .video-card")
  const playButton = document.querySelector(".ads .play-button")
  const video = document.querySelector(".ads .video-element")

  if (videoCard && playButton && video) {
    playButton.addEventListener("click", () => {
      if (video.paused) {
        video.play()
        playButton.style.opacity = "0"
      } else {
        video.pause()
        playButton.style.opacity = "1"
      }
    })

    video.addEventListener("play", () => {
      playButton.style.opacity = "0"
    })

    video.addEventListener("pause", () => {
      playButton.style.opacity = "1"
    })

    video.addEventListener("ended", () => {
      playButton.style.opacity = "1"
    })
  }
})

// Accordion functionality
function toggleAccordion(element) {
  const accordionItem = element.parentElement
  const isActive = accordionItem.classList.contains("active")

  document.querySelectorAll(".accordion-item").forEach((item) => {
    item.classList.remove("active")
  })

  if (!isActive) {
    accordionItem.classList.add("active")
  }
}

// Mobile slider functionality
document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth <= 768) {
    initMobileSliders()
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth <= 768) {
      initMobileSliders()
    }
  })

  function initMobileSliders() {
    const sliders = document.querySelectorAll(".mobile-slider")

    sliders.forEach((slider) => {
      const prevBtn = slider.parentElement.querySelector(".prev-btn")
      const nextBtn = slider.parentElement.querySelector(".next-btn")

      if (prevBtn && nextBtn) {
        const slideWidth = slider.querySelector("*").offsetWidth

        prevBtn.addEventListener("click", () => {
          slider.scrollBy({
            left: -slideWidth,
            behavior: "smooth",
          })
        })

        nextBtn.addEventListener("click", () => {
          slider.scrollBy({
            left: slideWidth,
            behavior: "smooth",
          })
        })
      }
    })
  }
})

// Product slider functionality
document.addEventListener("DOMContentLoaded", () => {
  initProductSliders()

  function initProductSliders() {
    const sliders = document.querySelectorAll(".slider")

    sliders.forEach((slider) => {
      const prevBtn = slider.parentElement.querySelector(".prev")
      const nextBtn = slider.parentElement.querySelector(".next")
      const slides = slider.querySelectorAll(".product-card")
      const slideWidth = slides.length > 0 ? slides[0].offsetWidth + 25 : 0 // 25 is the gap
      let currentIndex = 0

      if (prevBtn && nextBtn && slides.length > 0) {
        // Set initial position
        updateSliderPosition()

        prevBtn.addEventListener("click", () => {
          if (currentIndex > 0) {
            currentIndex--
            updateSliderPosition()
            updatePaginationDots()
          }
        })

        nextBtn.addEventListener("click", () => {
          if (currentIndex < Math.ceil(slides.length / 3) - 1) {
            currentIndex++
            updateSliderPosition()
            updatePaginationDots()
          }
        })

        function updateSliderPosition() {
          const offset = -currentIndex * (slideWidth * 3)
          slider.style.transform = `translateX(${offset}px)`
        }

        function updatePaginationDots() {
          const dots = document.querySelectorAll(".pagination-dots .dot")
          if (dots.length > 0) {
            dots.forEach((dot, index) => {
              dot.classList.toggle("active", index === currentIndex)
            })
          }
        }

        // Add click event to pagination dots
        const dots = document.querySelectorAll(".pagination-dots .dot")
        dots.forEach((dot, index) => {
          dot.addEventListener("click", () => {
            currentIndex = index
            updateSliderPosition()
            updatePaginationDots()
          })
        })
      }
    })
  }
})

// Update the pagination dots to account for more slides
document.addEventListener("DOMContentLoaded", () => {
  // Update pagination dots for Best Sellers section
  const dots = document.querySelectorAll(".pagination-dots .dot")
  if (dots.length > 0) {
    // Make sure we have 3 dots for pagination
    const dotsContainer = document.querySelector(".pagination-dots")
    if (dotsContainer && dots.length < 3) {
      for (let i = dots.length; i < 3; i++) {
        const newDot = document.createElement("span")
        newDot.className = "dot"
        newDot.setAttribute("data-slide", i)
        dotsContainer.appendChild(newDot)
      }
    }

    // Add click event to pagination dots
    document.querySelectorAll(".pagination-dots .dot").forEach((dot, index) => {
      dot.addEventListener("click", () => {
        const slider = document.getElementById("bestsellers-slider")
        if (slider) {
          const slideWidth = slider.querySelector(".product-card").offsetWidth + 25 // 25 is the gap
          const offset = -index * (slideWidth * 3)
          slider.style.transform = `translateX(${offset}px)`

          // Update active dot
          document.querySelectorAll(".pagination-dots .dot").forEach((d, i) => {
            d.classList.toggle("active", i === index)
          })
        }
      })
    })
  }

  // Add newsletter form submission handler
  const newsletterForm = document.querySelector(".newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const emailInput = newsletterForm.querySelector('input[type="email"]')
      if (emailInput && emailInput.value) {
        showToast(`Thank you for subscribing to our newsletter!`)
        emailInput.value = ""
      }
    })
  }
})

// Product card hover effects
document.addEventListener("DOMContentLoaded", () => {
  const productCards = document.querySelectorAll(".product-card")

  productCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px)"
      card.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.1)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)"
      card.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.05)"
    })
  })
})

// Category filter functionality
document.addEventListener("DOMContentLoaded", () => {
  const categoryBtns = document.querySelectorAll(".category-btn")
  const productItems = document.querySelectorAll("[data-category]")

  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      categoryBtns.forEach((b) => b.classList.remove("active"))

      // Add active class to clicked button
      btn.classList.add("active")

      const category = btn.getAttribute("data-category")

      // Show/hide products based on category
      productItems.forEach((item) => {
        if (category === "all" || item.getAttribute("data-category") === category) {
          item.style.display = "block"
        } else {
          item.style.display = "none"
        }
      })
    })
  })
})

// Wishlist functionality
function toggleWishlist(button) {
  button.classList.toggle("active")

  const productName = button.closest(".product-card").querySelector("h3").textContent

  if (button.classList.contains("active")) {
    showToast(`${productName} added to wishlist!`)
  } else {
    showToast(`${productName} removed from wishlist!`)
  }
}

// Add to cart functionality
function addToCart(productName, price) {
  // Get current cart count
  const cartCount = document.querySelector(".cart-count")
  const count = Number.parseInt(cartCount.textContent)

  // Increment cart count
  cartCount.textContent = count + 1

  // Save to localStorage for persistence
  saveCartItem(productName, price)

  // Show toast notification
  showToast(`${productName} added to cart!`)
}

function saveCartItem(name, price) {
  const cart = JSON.parse(localStorage.getItem("cart")) || []

  // Check if item already exists in cart
  const existingItem = cart.find((item) => item.name === name)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1,
    })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
}

// Toast notification
function showToast(message) {
  const toast = document.getElementById("cart-toast")
  const toastMessage = toast.querySelector(".toast-message")

  toastMessage.textContent = message
  toast.classList.add("show")

  setTimeout(() => {
    toast.classList.remove("show")
  }, 3000)
}

function closeToast() {
  const toast = document.getElementById("cart-toast")
  toast.classList.remove("show")
}

