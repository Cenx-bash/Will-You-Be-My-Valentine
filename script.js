// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Create floating hearts background
  createFloatingHearts();

  // Initialize music player
  initMusicPlayer();

  // Initialize scroll animations
  initScrollAnimations();

  // Initialize secret heart button
  initSecretHeart();

  // Initialize countdown
  initCountdown();

  // Add interactive elements
  addInteractiveElements();

  // Start animations
  startLyricsAnimation();
});

// Music Player Functions
function initMusicPlayer() {
  const audio = document.getElementById("backgroundMusic");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const muteBtn = document.getElementById("muteBtn");
  const progress = document.getElementById("progress");
  const playingIndicator = document.getElementById("playingIndicator");

  // Try to play audio automatically (with user interaction)
  let audioPlayed = false;

  document.body.addEventListener("click", function () {
    if (!audioPlayed) {
      audio.play().catch((e) => {
        console.log("Autoplay prevented:", e);
      });
      audioPlayed = true;
      updatePlayButton();
    }
  });

  // Play/Pause functionality
  playPauseBtn.addEventListener("click", function () {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    updatePlayButton();
  });

  // Mute functionality
  muteBtn.addEventListener("click", function () {
    audio.muted = !audio.muted;
    updateMuteButton();
  });

  // Update progress bar
  audio.addEventListener("timeupdate", function () {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + "%";
  });

  // Update play button state
  function updatePlayButton() {
    const icon = playPauseBtn.querySelector("i");
    if (audio.paused) {
      icon.className = "fas fa-play";
      playingIndicator.style.display = "none";
    } else {
      icon.className = "fas fa-pause";
      playingIndicator.style.display = "inline-flex";
    }
  }

  // Update mute button state
  function updateMuteButton() {
    const icon = muteBtn.querySelector("i");
    icon.className = audio.muted ? "fas fa-volume-mute" : "fas fa-volume-up";
  }

  // Initialize buttons
  updatePlayButton();
  updateMuteButton();
}

// Enhanced scroll animations
function initScrollAnimations() {
  const messageTexts = document.querySelectorAll(".message-text, .signature");
  const timelineContents = document.querySelectorAll(".timeline-content");
  const qualityCards = document.querySelectorAll(".quality-card");

  // Show initial elements
  setTimeout(() => {
    messageTexts.forEach((text) => {
      text.classList.add("show");
    });
  }, 500);

  // Scroll event listener
  window.addEventListener("scroll", function () {
    // Message texts
    messageTexts.forEach((text) => {
      const elementTop = text.getBoundingClientRect().top;
      if (elementTop < window.innerHeight - 100) {
        text.classList.add("show");
      }
    });

    // Timeline items
    timelineContents.forEach((content, index) => {
      const elementTop = content.getBoundingClientRect().top;
      if (elementTop < window.innerHeight - 100) {
        setTimeout(() => {
          content.classList.add("show");
        }, index * 200);
      }
    });

    // Quality cards
    qualityCards.forEach((card, index) => {
      const elementTop = card.getBoundingClientRect().top;
      if (elementTop < window.innerHeight - 100) {
        setTimeout(() => {
          card.classList.add("show");
        }, index * 150);
      }
    });
  });

  // Trigger initial check
  window.dispatchEvent(new Event("scroll"));
}

// Countdown Timer
function initCountdown() {
  // Set the date when you first met or started liking her
  const startDate = new Date("2024-01-01"); // Change this date

  function updateCountdown() {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").textContent = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").textContent = seconds
      .toString()
      .padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Lyrics Animation
function startLyricsAnimation() {
  const lyricLines = document.querySelectorAll(".lyric-line");

  lyricLines.forEach((line, index) => {
    setTimeout(() => {
      line.classList.add("show");
    }, (index + 1) * 1500);
  });

  // Restart animation every 10 seconds
  setInterval(() => {
    lyricLines.forEach((line) => {
      line.classList.remove("show");
    });
    setTimeout(() => {
      startLyricsAnimation();
    }, 500);
  }, 15000);
}

// Create floating hearts in background
function createFloatingHearts() {
  const heartsContainer = document.querySelector(".hearts-container");
  const heartCount = 20;

  for (let i = 0; i < heartCount; i++) {
    createHeart(heartsContainer, i);
  }

  // Add more hearts periodically
  setInterval(() => {
    if (document.querySelectorAll(".heart").length < 30) {
      createHeart(heartsContainer, Math.random() * 1000);
    }
  }, 3000);
}

function createHeart(container, index) {
  const heart = document.createElement("div");
  heart.classList.add("heart");

  // Random properties
  const left = Math.random() * 100;
  const delay = Math.random() * 10;
  const duration = 15 + Math.random() * 15;
  const size = 8 + Math.random() * 20;

  heart.style.left = `${left}vw`;
  heart.style.animation = `float ${duration}s linear infinite`;
  heart.style.animationDelay = `${delay}s`;
  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;

  // Random color with pink variations
  const colors = ["#ff6b93", "#ff8fab", "#ffb3c6", "#ffcad4", "#ff4d7d"];
  const color = colors[Math.floor(Math.random() * colors.length)];

  heart.style.setProperty("--heart-color", color);

  container.appendChild(heart);
}

// Initialize secret heart button and modal
function initSecretHeart() {
  const secretHeart = document.getElementById("secretHeart");
  const modal = document.getElementById("secretModal");
  const closeBtn = document.querySelector(".close");

  secretHeart.addEventListener("click", function () {
    modal.style.display = "block";
    createSmallHearts();
    createConfetti();
  });

  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}

// Create small floating hearts in modal
function createSmallHearts() {
  const container = document.querySelector(".floating-hearts-small");
  container.innerHTML = "";

  for (let i = 0; i < 8; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.width = "12px";
    heart.style.height = "12px";
    heart.style.position = "absolute";
    heart.style.left = `${10 + i * 12}%`;
    heart.style.animation = `float 6s linear infinite`;
    heart.style.animationDelay = `${i * 0.3}s`;

    container.appendChild(heart);
  }
}

// Create confetti effect
function createConfetti() {
  const container = document.querySelector(".confetti-container");
  const colors = ["#ff6b93", "#ff8fab", "#ffb3c6", "#d23669", "#ff4d7d"];

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");

    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = 5 + Math.random() * 10;
    const left = Math.random() * 100;
    const animationDuration = 2 + Math.random() * 3;

    confetti.style.background = color;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.left = `${left}vw`;
    confetti.style.animation = `floatUp ${animationDuration}s linear forwards`;
    confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";

    container.appendChild(confetti);

    // Remove confetti after animation
    setTimeout(() => {
      confetti.remove();
    }, animationDuration * 1000);
  }
}

// Add additional interactive elements
function addInteractiveElements() {
  // Photo frames click effect
  const photoFrames = document.querySelectorAll(".photo-frame");
  photoFrames.forEach((frame) => {
    frame.addEventListener("click", function () {
      this.style.transform = "rotateY(20deg) scale(1.1)";
      setTimeout(() => {
        this.style.transform = "rotateY(0deg) scale(1)";
      }, 600);
    });
  });

  // Social buttons
  const socialBtns = document.querySelectorAll(".social-btn");
  socialBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      createConfetti();

      // Add temporary animation
      this.style.transform = "scale(1.3)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 300);
    });
  });

  // Title pulse animation
  setInterval(() => {
    const title = document.querySelector(".title");
    title.style.animation = "none";
    setTimeout(() => {
      title.style.animation = "gentlePulse 4s infinite";
    }, 10);
  }, 8000);

  // Background color transition
  let hue = 0;
  setInterval(() => {
    hue = (hue + 0.1) % 360;
    document.body.style.background = `linear-gradient(135deg, hsl(${hue}, 30%, 95%) 0%, hsl(${
      hue + 30
    }, 40%, 97%) 100%)`;
  }, 5000);
}

// Keyboard shortcuts
document.addEventListener("keydown", function (e) {
  // Press 'L' for love (secret message)
  if (e.key === "l" || e.key === "L") {
    const modal = document.getElementById("secretModal");
    modal.style.display = "block";
    createSmallHearts();
    createConfetti();
  }

  // Press 'M' to toggle music
  if (e.key === "m" || e.key === "M") {
    const audio = document.getElementById("backgroundMusic");
    const playPauseBtn = document.getElementById("playPauseBtn");
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    const icon = playPauseBtn.querySelector("i");
    icon.className = audio.paused ? "fas fa-play" : "fas fa-pause";
  }

  // Press 'Space' to create hearts
  if (e.key === " ") {
    createConfetti();
  }
});

// Console message
console.log(
  "%c 💖 You found the secret! This website is a love letter to someone very special. 💖",
  "color: #ff6b93; font-size: 16px; font-weight: bold;"
);
console.log(
  "%c 🎵 Now playing: Yakap - Figvres 🎵",
  "color: #667eea; font-size: 14px; font-style: italic;"
);
