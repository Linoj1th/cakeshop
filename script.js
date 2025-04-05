function toggleMenu() {
    document.querySelector(".mobile-menu").classList.toggle("show")
  }
  // Toggle mobile menu
function toggleMenu() {
  const mobileMenu = document.querySelector(".mobile-menu")
  mobileMenu.classList.toggle("show")
}

// Video play functionality for the Quality Plants section
document.addEventListener("DOMContentLoaded", () => {
  const videoCard = document.querySelector(".quality-plants-section .video-card")
  const playButton = document.querySelector(".quality-plants-section .play-button")
  const video = document.querySelector(".quality-plants-section .video-element")

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

    // Hide play button when video ends (if it's looping, this won't matter)
    video.addEventListener("ended", () => {
      playButton.style.opacity = "1"
    })
  }
})

