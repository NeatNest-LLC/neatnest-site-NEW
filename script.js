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

  // 3) Services dropdown - SIMPLIFIED
const serviceToggle = document.querySelector(".nav-dropdown-toggle");
const serviceDropdown = document.querySelector(".nav-dropdown");

if (serviceToggle && serviceDropdown) {
  // Single unified handler
  serviceToggle.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    // On mobile only (when hamburger is visible)
    if (window.innerWidth <= 768) {
      serviceDropdown.classList.toggle("active");
      console.log("Services dropdown toggled:", serviceDropdown.classList.contains("active"));
    }
  });
  
  // Close dropdown when clicking outside
  document.addEventListener("click", function(e) {
    if (!serviceDropdown.contains(e.target)) {
      serviceDropdown.classList.remove("active");
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

  // 7) Walkthrough style helper text (show note when "User-Sent Video" is selected)
  const walkthroughStyle = document.getElementById("walkthroughStyle");
  const videoNote = document.getElementById("videoWalkthroughNote");

  function updateWalkthroughNote() {
    if (!walkthroughStyle || !videoNote) return;

    const val = walkthroughStyle.value || "";
    const isUserSentVideo = val.toLowerCase().includes("user-sent video");
    videoNote.style.display = isUserSentVideo ? "block" : "none";
  }

  if (walkthroughStyle && videoNote) {
    walkthroughStyle.addEventListener("change", updateWalkthroughNote);
    updateWalkthroughNote(); // run once on page load
  }
