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

// Pagination dots functionality
document.addEventListener("DOMContentLoaded", () => {
  const dots = document.querySelectorAll(".pagination-dots .dot")

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      // Remove active class from all dots
      dots.forEach((d) => d.classList.remove("active"))

      // Add active class to clicked dot
      dot.classList.add("active")

      // Here you would typically change the displayed products
      // For demonstration purposes, we'll just log the index
      console.log(`Showing product set ${index + 1}`)
    })
  })
})

