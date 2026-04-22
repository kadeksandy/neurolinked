document.addEventListener("DOMContentLoaded", function () {
  const scrollToTopBtn = document.getElementById("scrollToTop");

  if (scrollToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.remove("opacity-0", "invisible", "scale-90");
        scrollToTopBtn.classList.add("opacity-100", "visible", "scale-100");
      } else {
        scrollToTopBtn.classList.remove("opacity-100", "visible", "scale-100");
        scrollToTopBtn.classList.add("opacity-0", "invisible", "scale-90");
      }
    });

    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
