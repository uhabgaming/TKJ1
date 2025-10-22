// Contact Form Module
(function () {
  // Create alert element
  const alertTemplate = `
    <div class="contact-alert" role="alert">
      <div class="alert-content">
        <strong>Message Sent Successfully!</strong>
        <span class="text-muted">We'll get back to you soon.</span>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', alertTemplate);
  const alertElement = document.querySelector('.contact-alert');

  // Function to show alert
  function showAlert() {
    alertElement.classList.add('show-alert');
    setTimeout(() => {
      alertElement.classList.remove('show-alert');
    }, 3000);
  }

  // Handle form submission
  document.querySelector('#contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading spinner
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<i class="fas fa-spinner spin"></i> Sending...';
    submitBtn.disabled = true;

    // Simulate form submission delay
    setTimeout(() => {
      // Hide loading spinner
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      // Show success message
      showAlert();

      // Reset form
      this.reset();
    }, 1000); // Reduced delay to 1s for better UX
  });
})();