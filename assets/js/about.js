// About Page JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Contact form handling
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", handleContactSubmit);
  }

  // Smooth scroll for contact section link
  const contactLinks = document.querySelectorAll('a[href="#contact"]');
  contactLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Animate elements on scroll
  observeElements();
});

function handleContactSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const contactData = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  // Basic validation
  if (
    !contactData.name ||
    !contactData.email ||
    !contactData.subject ||
    !contactData.message
  ) {
    showContactNotification("Please fill in all required fields.", "error");
    return;
  }

  if (!isValidEmail(contactData.email)) {
    showContactNotification("Please enter a valid email address.", "error");
    return;
  }

  // Show loading state
  const submitButton = e.target.querySelector('button[type="submit"]');
  const originalText = submitButton.innerHTML;
  submitButton.innerHTML =
    '<i class="bx bx-loader-alt animate-spin mr-2"></i>Sending...';
  submitButton.disabled = true;

  // Simulate form submission
  setTimeout(() => {
    // Reset button
    submitButton.innerHTML = originalText;
    submitButton.disabled = false;

    // Show success message
    showContactNotification(
      "Thank you for your message! We'll get back to you soon.",
      "success"
    );

    // Reset form
    e.target.reset();
  }, 2000);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showContactNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `fixed top-4 right-4 p-4 rounded-lg text-white z-50 transition-all duration-300 transform translate-x-full ${
    type === "success" ? "bg-green-600" : "bg-red-600"
  }`;
  notification.innerHTML = `
        <div class="flex items-center gap-3">
            <i class="bx ${
              type === "success" ? "bx-check-circle" : "bx-error-circle"
            } text-xl"></i>
            <span>${message}</span>
        </div>
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Animate out and remove
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 5000);
}

function observeElements() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe cards and sections
  const elementsToObserve = document.querySelectorAll(
    ".mission-card, .vision-card, .feature-card, .audience-card, .contact-info-card"
  );

  elementsToObserve.forEach((element) => {
    observer.observe(element);
  });
}

// Add loading animation for map
document.addEventListener("DOMContentLoaded", () => {
  const mapContainer = document.querySelector(".map-container");
  if (mapContainer) {
    const iframe = mapContainer.querySelector("iframe");
    if (iframe) {
      iframe.addEventListener("load", () => {
        mapContainer.style.opacity = "1";
      });
    }
  }
});
