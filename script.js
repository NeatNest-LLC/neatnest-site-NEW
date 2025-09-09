// Existing testimonial slider code...

// Service item click handlers to open modals
const serviceItems = document.querySelectorAll('.service-item');
serviceItems.forEach(item => {
    item.addEventListener('click', () => {
        const modalId = item.getAttribute('data-modal-id');
        const modal = document.getElementById(modalId);
        modal.style.display = 'block';
    });
});

// Close button handlers to close modals
const closeButtons = document.querySelectorAll('.modal-close');
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        modal.style.display = 'none';
    });
});

// Click outside modal to close functionality
const modals = document.querySelectorAll('.modal');
modals.forEach(modal => {
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});