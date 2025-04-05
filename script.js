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

