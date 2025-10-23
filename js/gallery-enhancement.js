// Gallery Performance Enhancement
(function() {
  const gallery = document.getElementById('gallery');
  const imgGallery = document.querySelector('.img_gallery');
  
  if (!gallery || !imgGallery) return;

  // Immediately show gallery section
  gallery.style.opacity = '1';
  gallery.style.transform = 'none';

  // Progressive image loading
  const images = imgGallery.getElementsByTagName('img');
  
  // Create intersection observer for images
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        // Load image if it has data-src
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        // Show image immediately
        img.style.opacity = '1';
        img.style.transform = 'none';
        observer.unobserve(img);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '50px'
  });

  // Setup each image for lazy loading
  Array.from(images).forEach(img => {
    // Only observe images that aren't loaded yet
    if (!img.complete) {
      imageObserver.observe(img);
    } else {
      // If image is already loaded, show it immediately
      img.style.opacity = '1';
      img.style.transform = 'none';
    }
  });

  // Optimize popup gallery
  const popup = document.getElementById('popupGallery');
  const popupImg = document.getElementById('popupImg');
  const popupClose = document.getElementById('popupClose');

  if (popup && popupImg) {
    // Preload next image for smoother transitions
    let preloadImage = new Image();
    
    function showImage(src) {
      // Show loading state
      popup.classList.add('loading');
      
      // Load image
      popupImg.src = src;
      
      // Remove loading state once image is loaded
      popupImg.onload = () => {
        popup.classList.remove('loading');
        popup.classList.add('active');
      };

      // Show popup immediately
      popup.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }

    // Add click handlers to gallery images
    imgGallery.addEventListener('click', (e) => {
      const clickedImg = e.target.closest('img');
      if (clickedImg) {
        showImage(clickedImg.src);
        
        // Preload next image if available
        const nextImg = clickedImg.parentElement.nextElementSibling?.querySelector('img');
        if (nextImg) {
          preloadImage.src = nextImg.src;
        }
      }
    });

    // Close popup
    function closePopup() {
      popup.classList.remove('active');
      setTimeout(() => {
        popup.style.display = 'none';
        document.body.style.overflow = '';
      }, 200);
    }

    popupClose?.addEventListener('click', closePopup);
    popup.addEventListener('click', (e) => {
      if (e.target === popup) closePopup();
    });
  }
})();