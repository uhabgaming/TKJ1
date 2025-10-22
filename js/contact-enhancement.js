// Contact Form Enhancement
(function() {
  const contactSection = document.getElementById('contact');
  const contactForm = document.getElementById('contactForm');
  const successAlert = document.getElementById('contactSuccessAlert');
  const successText = document.getElementById('contactSuccessText');

  if (!contactForm) return;

  // Optimize contact section reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '50px'
  });

  if (contactSection) {
    observer.observe(contactSection);
  }

  // Enhance form submission
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="bi bi-arrow-repeat spin"></i> Mengirim...';
    submitBtn.disabled = true;

    try {
      // Simulate sending (since it's static)
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Success handling
      showSuccessMessage();
      contactForm.reset();
    } catch (error) {
      console.error('Error:', error);
      showErrorMessage();
    } finally {
      // Reset button state
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });

  function showSuccessMessage() {
    const alert = document.getElementById('contactSuccessAlert');
    if (!alert) return;

    // Reset any existing transitions
    alert.style.transition = 'none';
    alert.style.display = 'flex';
    alert.classList.remove('d-none');
    
    // Instantly position the alert
    alert.style.opacity = '1';
    alert.style.transform = 'translateY(0)';
    
    // Add success state
    alert.classList.add('show-alert');

    // Automatically hide after 2.5 seconds
    setTimeout(() => {
      alert.classList.remove('show-alert');
      setTimeout(() => {
        alert.style.display = 'none';
      }, 200);
    }, 2500);
  }

  // Add smooth reveal animations to form elements
  const formElements = contactForm.querySelectorAll('.form-group, .form-control, .btn');
  formElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.4s ease';
    el.style.transitionDelay = `${index * 0.1}s`;
  });

  // Reveal form elements when section is visible
  const formObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Immediately show the form container
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        
        // Quickly reveal form elements with minimal delay
        formElements.forEach((el, index) => {
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, index * 50); // Reduced from 100ms to 50ms per element
        });
        formObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1, // Reduced threshold for earlier trigger
    rootMargin: '50px' // Start loading before element is in view
  });

  formObserver.observe(contactForm);

  // Add input animations
  const inputs = contactForm.querySelectorAll('.form-control');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
      if (!input.value) {
        input.parentElement.classList.remove('focused');
      }
    });

    // Maintain focused state if input has value
    if (input.value) {
      input.parentElement.classList.add('focused');
    }
  });
})();