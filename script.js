document.addEventListener("DOMContentLoaded", function () {
  // =========================
  // Footer year (safe)
  // =========================
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // =========================
  // Mobile menu + dropdown (safe)
  // =========================
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const navMenu = document.getElementById("navMenu");
  const navDropdowns = document.querySelectorAll(".nav-dropdown");

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
    });
  }

  navDropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".nav-dropdown-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        if (window.innerWidth <= 768) {
          dropdown.classList.toggle("active");
        }
      });
    }
  });

  // =========================
  // Sticky nav show/hide (safe)
  // =========================
  const mainNav = document.getElementById("mainNav");
  if (mainNav) {
    let lastScrollTop = 0;
    const scrollThreshold = 200;

    window.addEventListener("scroll", function () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > scrollThreshold) {
        if (scrollTop > lastScrollTop) {
          mainNav.classList.add("hidden");
        } else {
          mainNav.classList.remove("hidden");
        }
      }

      lastScrollTop = scrollTop;
    });
  }

  // =========================
  // Testimonial slider (safe)
  // Only runs if slider + slides exist
  // =========================
  const slides = Array.from(document.querySelectorAll(".slide"));
  const slider = document.querySelector(".slider");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");

  if (slides.length > 0 && slider && nextBtn && prevBtn) {
    let idx = 0;
    let autoRotateTimer;

    function show(i) {
      slides.forEach((s, n) => s.classList.toggle("active", n === i));
    }

    function nextSlide() {
      idx = (idx + 1) % slides.length;
      show(idx);
    }

    function prevSlide() {
      idx = (idx - 1 + slides.length) % slides.length;
      show(idx);
    }

    function startAutoRotate() {
      autoRotateTimer = setInterval(nextSlide, 4000);
    }

    function stopAutoRotate() {
      clearInterval(autoRotateTimer);
    }

    nextBtn.addEventListener("click", () => {
      stopAutoRotate();
      nextSlide();
      startAutoRotate();
    });

    prevBtn.addEventListener("click", () => {
      stopAutoRotate();
      prevSlide();
      startAutoRotate();
    });

    slider.addEventListener("mouseenter", stopAutoRotate);
    slider.addEventListener("mouseleave", startAutoRotate);

    show(idx);
    startAutoRotate();
  }

  // =========================
  // Service popups / modals (safe)
  // Only runs if those elements exist
  // =========================
  const serviceItems = document.querySelectorAll(".services li[data-service]");
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".close");

  if (serviceItems.length > 0 && modals.length > 0) {
    serviceItems.forEach((item) => {
      item.addEventListener("click", () => {
        const service = item.getAttribute("data-service");
        const modal = document.getElementById(`${service}-modal`);
        if (modal) modal.style.display = "block";
      });
    });

    closeButtons.forEach((closeBtn) => {
      closeBtn.addEventListener("click", () => {
        const m = closeBtn.closest(".modal");
        if (m) m.style.display = "none";
      });
    });

    window.addEventListener("click", (event) => {
      modals.forEach((modal) => {
        if (event.target === modal) {
          modal.style.display = "none";
        }
      });
    });
  }
});
