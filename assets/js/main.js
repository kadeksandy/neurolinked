// header show menu
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  toggle.addEventListener("click", () => {
    nav.classList.toggle("show-menu");

    toggle.classList.toggle("show-icon");
  });
};

showMenu("nav-toggle", "nav-menu");

//  sroll header
function scrollHeader() {
  if (window.scrollY > 50) {
    header.classList.add("scroll-header");
  } else {
    header.classList.remove("scroll-header");
  }
}

window.addEventListener("scroll", scrollHeader);

// stats section
function animateStatsCounters() {
  const counters = document.querySelectorAll(".counter");
  const statsSection = document.querySelector(".stats-section");

  const observerOptions = {
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statItems = entry.target.querySelectorAll(".stat-item");
        statItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("animate-in");
          }, index * 150);
        });

        counters.forEach((counter, index) => {
          setTimeout(() => {
            animateCounter(counter);
          }, index * 200 + 300);
        });

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  if (statsSection) {
    observer.observe(statsSection);
  }
}

function animateCounter(counter) {
  const target = parseInt(counter.getAttribute("data-target"));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const updateCounter = () => {
    current += step;
    if (current < target) {
      counter.textContent = Math.floor(current).toLocaleString();
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = target.toLocaleString();
    }
  };

  updateCounter();
}

document.addEventListener("DOMContentLoaded", () => {
  animateStatsCounters();
});

// how it works section
class HowItWorksAnimation {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 3;
    this.autoPlayInterval = null;
    this.progressAnimationId = null;
    this.autoPlayDelay = 8000;
    this.isManualControl = false;
    this.startTime = null;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.startAutoPlay();
  }

  setupEventListeners() {
    document
      .querySelectorAll(".step-number, .progress-line")
      .forEach((element) => {
        element.addEventListener("click", (e) => {
          const step = Number.parseInt(e.target.getAttribute("data-step"));
          this.goToStep(step, true);
        });
      });

    const section = document.querySelector(".how-it-works-section");
    if (section) {
      section.addEventListener("mouseenter", () => this.pauseAutoPlay());
      section.addEventListener("mouseleave", () => {
        if (!this.isManualControl) {
          this.startAutoPlay();
        }
      });
    }
  }

  goToStep(stepNumber, isManual = false) {
    if (stepNumber === this.currentStep) return;

    this.isManualControl = isManual;
    this.currentStep = stepNumber;
    this.updateDisplay();

    if (isManual) {
      this.pauseAutoPlay();
      setTimeout(() => {
        this.isManualControl = false;
        this.startAutoPlay();
      }, 2000);
    }
  }

  updateDisplay() {
    document.querySelectorAll(".step-visual").forEach((visual, index) => {
      setTimeout(() => {
        visual.classList.remove("active");
      }, index * 100);
    });

    setTimeout(() => {
      document
        .querySelector(`.step-visual[data-step="${this.currentStep}"]`)
        .classList.add("active");
    }, 300);

    document.querySelectorAll(".progress-line").forEach((line) => {
      line.classList.remove("active");
    });
    document
      .querySelector(`.progress-line[data-step="${this.currentStep}"]`)
      .classList.add("active");

    document.querySelectorAll(".step-item").forEach((item) => {
      item.classList.remove("active");
    });
    document
      .querySelector(`.step-item[data-step="${this.currentStep}"]`)
      .classList.add("active");
  }

  startProgressBar() {
    const timerFill = document.getElementById("timer-fill");
    if (!timerFill) return;

    this.startTime = performance.now();
    timerFill.style.width = "0%";

    const animate = (currentTime) => {
      if (!this.startTime) this.startTime = currentTime;

      const elapsed = currentTime - this.startTime;
      const progress = Math.min((elapsed / this.autoPlayDelay) * 100, 100);

      timerFill.style.width = `${progress}%`;

      if (progress < 100 && !this.isManualControl) {
        this.progressAnimationId = requestAnimationFrame(animate);
      } else if (progress >= 100) {
        this.nextStep();
        this.resetProgress();
        this.startProgressBar();
      }
    };

    this.progressAnimationId = requestAnimationFrame(animate);
  }

  nextStep() {
    this.currentStep =
      this.currentStep >= this.totalSteps ? 1 : this.currentStep + 1;
    this.updateDisplay();
  }

  startAutoPlay() {
    this.pauseAutoPlay();
    this.resetProgress();
    this.startProgressBar();
  }

  pauseAutoPlay() {
    if (this.progressAnimationId) {
      cancelAnimationFrame(this.progressAnimationId);
      this.progressAnimationId = null;
    }
    this.startTime = null;
  }

  resetProgress() {
    const timerFill = document.getElementById("timer-fill");
    if (timerFill) timerFill.style.width = "0%";
    this.startTime = null;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new HowItWorksAnimation();
});

// swiper featured aspirations section
const swiper = new Swiper(".campaignSwiper", {
  slidesPerView: "3",
  spaceBetween: 1,
  loop: false,
  grabCursor: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    1440: {
      slidesPerView: 3,
    },
    1111: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    640: {
      slidesPerView: 2,
    },
    0: {
      slidesPerView: 1,
    },
  },
});

// faqs
const faqButtons = document.querySelectorAll(".faq-button");
let currentFaq = null;
let currentButton = null;

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const faqId = button.getAttribute("data-faq");
    const faqAnswer = document.querySelector(`.answer-${faqId}`);

    if (!faqAnswer) return;

    if (currentFaq === faqAnswer) {
      faqAnswer.style.maxHeight = null;
      const icon = button.querySelector("i");
      icon.classList.remove("bx-minus");
      icon.classList.add("bx-plus");
      currentFaq = null;
      currentButton = null;
    } else {
      if (currentFaq) {
        currentFaq.style.maxHeight = null;
        const previousIcon = currentButton.querySelector("i");
        previousIcon.classList.remove("bx-minus");
        previousIcon.classList.add("bx-plus");
      }

      faqAnswer.style.maxHeight = faqAnswer.scrollHeight + "px";
      const icon = button.querySelector("i");
      icon.classList.remove("bx-plus");
      icon.classList.add("bx-minus");

      currentFaq = faqAnswer;
      currentButton = button;
    }
  });
});
