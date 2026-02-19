document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // 1) Footer year (all pages)
  // =========================
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ==========================================
  // 2) Mobile nav toggle + dropdowns (all pages)
  // ==========================================
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const navMenu = document.getElementById("navMenu");

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // FIXED: Mobile dropdown with proper event handling
  const navDropdowns = document.querySelectorAll(".nav-dropdown");
  if (navDropdowns.length) {
    navDropdowns.forEach((dropdown) => {
      const toggle = dropdown.querySelector(".nav-dropdown-toggle");
      if (!toggle) return;

      toggle.addEventListener("click", (e) => {
        // Only handle clicks on mobile
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();
          
          // Close other dropdowns (accordion behavior)
          navDropdowns.forEach((otherDropdown) => {
            if (otherDropdown !== dropdown) {
              otherDropdown.classList.remove("active");
            }
          });
          
          // Toggle current dropdown
          dropdown.classList.toggle("active");
        }
      });
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      const isClickInsideNav = e.target.closest(".main-nav");
      const isClickOnToggle = e.target.closest(".mobile-menu-toggle");
      
      if (!isClickInsideNav && !isClickOnToggle && navMenu) {
        navMenu.classList.remove("active");
        navDropdowns.forEach(dropdown => dropdown.classList.remove("active"));
      }
    }
  });

  // ==================================
  // 3) Sticky nav hide/show (all pages)
  // ==================================
  const mainNav = document.getElementById("mainNav");
  if (mainNav) {
    let lastScrollTop = 0;
    const scrollThreshold = 200;

    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > scrollThreshold) {
        if (scrollTop > lastScrollTop) {
          mainNav.classList.add("hidden");
        } else {
          mainNav.classList.remove("hidden");
        }
      } else {
        mainNav.classList.remove("hidden");
      }

      lastScrollTop = scrollTop;
    });
  }

  // ======================================
  // 4) Testimonials slider (home page only)
  // ======================================
  const slides = Array.from(document.querySelectorAll(".slide"));
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");
  const slider = document.querySelector(".slider");

  if (slides.length && nextBtn && prevBtn && slider) {
    let idx = 0;
    let autoRotateTimer;

    const show = (i) => {
      slides.forEach((s, n) => s.classList.toggle("active", n === i));
    };

    const nextSlide = () => {
      idx = (idx + 1) % slides.length;
      show(idx);
    };

    const prevSlide = () => {
      idx = (idx - 1 + slides.length) % slides.length;
      show(idx);
    };

    const startAutoRotate = () => {
      autoRotateTimer = setInterval(nextSlide, 4000);
    };

    const stopAutoRotate = () => {
      if (autoRotateTimer) clearInterval(autoRotateTimer);
    };

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

  // ==========================================
  // 5) Services popup modals (only pages w/ it)
  // ==========================================
  const serviceItems = document.querySelectorAll(".services li[data-service]");
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".close");

  if (serviceItems.length && modals.length) {
    serviceItems.forEach((item) => {
      item.addEventListener("click", () => {
        const service = item.getAttribute("data-service");
        const modal = document.getElementById(`${service}-modal`);
        if (modal) modal.style.display = "block";
      });
    });

    closeButtons.forEach((closeBtn) => {
      closeBtn.addEventListener("click", () => {
        const modal = closeBtn.closest(".modal");
        if (modal) modal.style.display = "none";
      });
    });

    window.addEventListener("click", (event) => {
      modals.forEach((modal) => {
        if (event.target === modal) modal.style.display = "none";
      });
    });
  }

  // =========================
  // 6) FAQ accordion (pages w/ FAQ)
  // =========================
  // This function is called by inline onclick="toggleFAQ(this)" in HTML
  window.toggleFAQ = function (questionEl) {
    if (!questionEl) return;

    const item = questionEl.closest(".faq-item");
    if (!item) return;

    const answer = item.querySelector(".faq-answer");
    if (!answer) return;

    // Toggle current FAQ
    questionEl.classList.toggle("active");
    answer.classList.toggle("active");
  };
});
