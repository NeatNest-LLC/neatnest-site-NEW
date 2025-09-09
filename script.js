// year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// testimonial slider with auto-rotation
const slides = Array.from(document.querySelectorAll('.slide'));
let idx = 0;
let autoRotateTimer;

function show(i) { 
  slides.forEach((s,n) => s.classList.toggle('active', n===i)); 
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
  autoRotateTimer = setInterval(nextSlide, 4000); // 4 seconds
}

function stopAutoRotate() {
  clearInterval(autoRotateTimer);
}

// Manual navigation
document.getElementById('next').onclick = () => { 
  stopAutoRotate();
  nextSlide();
  startAutoRotate(); // restart timer after manual interaction
};

document.getElementById('prev').onclick = () => { 
  stopAutoRotate();
  prevSlide(); 
  startAutoRotate(); // restart timer after manual interaction
};

// Pause on hover for better UX
const slider = document.querySelector('.slider');
slider.addEventListener('mouseenter', stopAutoRotate);
slider.addEventListener('mouseleave', startAutoRotate);

// Initialize testimonial slider
show(idx);
startAutoRotate();

// NEW POPUP FUNCTIONALITY FOR SERVICES
// Get all service items and modals
const serviceItems = document.querySelectorAll('.services li[data-service]');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close');

// Add click event to each service item
serviceItems.forEach(item => {
  item.addEventListener('click', () => {
    const service = item.getAttribute('data-service');
    const modal = document.getElementById(`${service}-modal`);
    if (modal) {
      modal.style.display = 'block';
    }
  });
});

// Add click event to close buttons
closeButtons.forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    closeBtn.closest('.modal').style.display = 'none';
  });
});

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
  modals.forEach(modal => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});
