// Wait for page to load
document.addEventListener("DOMContentLoaded", function() {
  
  console.log("Script loaded!");
  
  // 1) Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2) Mobile menu toggle - FIXED to not interfere with dropdown
  const hamburger = document.getElementById("mobileMenuToggle");
  const navMenu = document.getElementById("navMenu");
  
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function(e) {
      console.log("Hamburger clicked!");
      navMenu.classList.toggle("active");
    });
  }

  // 3) Services dropdown - FIXED with direct targeting
  const serviceToggle = document.querySelector(".nav-dropdown-toggle");
  const serviceDropdown = document.querySelector(".nav-dropdown");
  
  console.log("Service toggle found:", serviceToggle);
  console.log("Service dropdown found:", serviceDropdown);
  
  if (serviceToggle && serviceDropdown) {
    
    // Add click handler directly to the span
    serviceToggle.addEventListener("click", function(e) {
      console.log("=== SERVICE TOGGLE CLICKED ===");
      
      // Stop the event from going anywhere else
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      
      // Toggle the dropdown
      serviceDropdown.classList.toggle("active");
      
      console.log("Active class toggled. Is active now?", serviceDropdown.classList.contains("active"));
      
      return false;
    }, true); // Use capture phase
    
    // Also try with mousedown for better mobile support
    serviceToggle.addEventListener("mousedown", function(e) {
      console.log("=== SERVICE MOUSEDOWN ===");
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      
      serviceDropdown.classList.toggle("active");
      console.log("Toggled via mousedown. Active?", serviceDropdown.classList.contains("active"));
      
      return false;
    }, true);
    
    // And touchstart for mobile
    serviceToggle.addEventListener("touchstart", function(e) {
      console.log("=== SERVICE TOUCHSTART ===");
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      
      serviceDropdown.classList.toggle("active");
      console.log("Toggled via touch. Active?", serviceDropdown.classList.contains("active"));
      
      return false;
    }, true);
  }

  // 4) Sticky nav
  const mainNav = document.getElementById("mainNav");
  if (mainNav) {
    let lastScroll = 0;
    
    window.addEventListener("scroll", function() {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 200) {
        if (currentScroll > lastScroll) {
          mainNav.classList.add("hidden");
        } else {
          mainNav.classList.remove("hidden");
        }
      } else {
        mainNav.classList.remove("hidden");
      }
      
      lastScroll = currentScroll;
    });
  }

  // 5) Testimonial slider (if exists)
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");
  
  if (slides.length > 0 && nextBtn && prevBtn) {
    let currentSlide = 0;
    let timer;
    
    function showSlide(n) {
      slides.forEach(function(slide, i) {
        slide.classList.toggle("active", i === n);
      });
    }
    
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }
    
    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }
    
    function startTimer() {
      timer = setInterval(nextSlide, 4000);
    }
    
    function stopTimer() {
      clearInterval(timer);
    }
    
    nextBtn.addEventListener("click", function() {
      stopTimer();
      nextSlide();
      startTimer();
    });
    
    prevBtn.addEventListener("click", function() {
      stopTimer();
      prevSlide();
      startTimer();
    });
    
    showSlide(0);
    startTimer();
  }

  // 6) FAQ accordion
  window.toggleFAQ = function(questionEl) {
    if (!questionEl) return;
    
    const item = questionEl.closest(".faq-item");
    if (!item) return;
    
    const answer = item.querySelector(".faq-answer");
    if (!answer) return;
    
    questionEl.classList.toggle("active");
    answer.classList.toggle("active");
  };
  
  console.log("All scripts initialized!");
});
