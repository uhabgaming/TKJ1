// Performance Optimization for All Sections
(function() {
  // Instantly show all critical sections
  const criticalSections = [
    '.gallery',
    '.anggota',
    '.contact-section',
    '.section-header',
    '.anggota-scroll',
    '.gallery_title',
    '.section-subtitle',
    '.section-title',
    '.section-description'
  ];

  // Immediately show critical content
  criticalSections.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.visibility = 'visible';
    });
  });

  // Optimize Gallery
  const gallery = {
    container: document.querySelector('.gallery'),
    images: document.querySelectorAll('.img_gallery img'),
    title: document.querySelector('.gallery_title')
  };

  if (gallery.container) {
    // Show gallery container immediately
    gallery.container.style.opacity = '1';
    gallery.container.style.transform = 'none';
    
    // Progressive image loading
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            requestAnimationFrame(() => {
              img.style.opacity = '1';
              img.style.transform = 'none';
            });
            imageObserver.unobserve(img);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    gallery.images.forEach(img => imageObserver.observe(img));
  }

  // Optimize Anggota Section
  const anggotaSection = {
    container: document.querySelector('.anggota'),
    cards: document.querySelectorAll('.anggota-card'),
    scroll: document.querySelector('.anggota-scroll')
  };

  if (anggotaSection.container) {
    // Show container immediately
    anggotaSection.container.style.opacity = '1';
    anggotaSection.scroll.style.opacity = '1';

    // Progressive card loading
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const card = entry.target;
            requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = 'none';
            });
            cardObserver.unobserve(card);
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    // Load cards in batches for better performance
    anggotaSection.cards.forEach((card, index) => {
      requestAnimationFrame(() => {
        card.style.transitionDelay = `${Math.min(index * 30, 300)}ms`;
        cardObserver.observe(card);
      });
    });
  }

  // Optimize Contact Section
  const contactSection = {
    container: document.querySelector('.contact-section'),
    header: document.querySelector('.section-header'),
    form: document.querySelector('.contact-form')
  };

  if (contactSection.container) {
    // Show contact section immediately
    contactSection.container.style.opacity = '1';
    contactSection.container.style.transform = 'none';
    
    if (contactSection.header) {
      contactSection.header.style.opacity = '1';
      contactSection.header.style.transform = 'none';
    }

    // Show form with minimal delay
    if (contactSection.form) {
      requestAnimationFrame(() => {
        contactSection.form.style.opacity = '1';
        contactSection.form.style.transform = 'none';
      });
    }
  }

  // Optimize all images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (img.complete) {
      img.style.opacity = '1';
    } else {
      img.addEventListener('load', () => {
        img.style.opacity = '1';
      });
    }
  });

  // Remove any remaining transition delays
  setTimeout(() => {
    document.querySelectorAll('[style*="transition-delay"]').forEach(el => {
      el.style.transitionDelay = '0s';
    });
  }, 1000);
})();