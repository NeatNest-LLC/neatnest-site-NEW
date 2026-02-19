// Wait for page to load
document.addEventListener("DOMContentLoaded", function() {
  
  console.log("Script loaded!"); // You should see this immediately
  
  // 1) Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2) Mobile menu toggle
  const hamburger = document.getElementById("mobileMenuToggle");
  const navMenu = document.getElementById("navMenu");
  
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function(e) {
      console.log("Hamburger clicked!");
      
      // Only toggle if clicking the hamburger itself, not its children
      if (e.target === hamburger || e.target.closest('#mobileMenuToggle')) {
        e.stopPropagation();
        navMenu.classList.toggle("active");
      }
    });
  }

  // 3) Services dropdown - MULTIPLE EVENT APPROACH
  const dropdowns = document.querySelectorAll(".nav-dropdown");
  
  console.log("Found dropdowns:", dropdowns.length);
  
  if (dropdowns.length > 0) {
    dropdowns.forEach(function(dropdown) {
      const toggle = dropdown.querySelector(".nav-dropdown-toggle");
      const menu = dropdown.querySelector(".nav-dropdown-menu");
      
      if (toggle && menu) {
        console.log("Setup dropdown listener");
        
        // Function to handle the toggle
        function handleToggle(e) {
          console.log("=== SERVICES ACTIVATED ===");
          console.log("Event type:", e.type);
          console.log("Window width:", window.innerWidth);
          
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          
          console.log("Toggling dropdown NOW");
          
          // Close others
          dropdowns.forEach(function(other) {
            if (other !== dropdown) {
              other.classList.remove("active");
            }
          });
          
          // Toggle this one
          dropdown.classList.toggle("active");
          
          const isOpen = dropdown.classList.contains("active");
          console.log("Dropdown is now:", isOpen ? "OPEN" : "CLOSED");
          console.log("Dropdown classes:", dropdown.className);
          
          return false;
        }
        
        // Try multiple event types
        toggle.addEventListener("mousedown", handleToggle, true);
        toggle.addEventListener("touchstart", handleToggle, true);
        toggle.addEventListener("click", handleToggle, true);
      }
    });
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
