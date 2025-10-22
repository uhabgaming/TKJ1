// Gallery Enhancement
(function() {
  const gallery = document.querySelector('.gallery');
  const popup = document.getElementById('popupGallery');
  const popupImg = document.getElementById('popupImg');
  const popupClose = document.getElementById('popupClose');
  const imgGallery = document.querySelector('.img_gallery');

  if (!gallery || !popup || !popupImg || !imgGallery) return;

  function showImage(src) {
    // Show loading state
    popup.classList.add('loading');
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Reset image
    popupImg.style.opacity = '0';
    popupImg.style.transform = 'scale(0.9)';
    
    // Load new image
    popupImg.src = src;
    
    // When image loads
    popupImg.onload = () => {
      popup.classList.remove('loading');
      popup.classList.add('active');
      
      // Animate image in
      requestAnimationFrame(() => {
        popupImg.style.opacity = '1';
        popupImg.style.transform = 'scale(1)';
      });
    };

    // Handle load errors
    popupImg.onerror = () => {
      popup.classList.remove('loading');
      popup.classList.add('active');
      popupImg.src = ''; // Clear source
      alert('Error loading image');
    };
  }

  function closePopup() {
    popup.classList.remove('active');
    popupImg.style.opacity = '0';
    popupImg.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
      popup.style.display = 'none';
      document.body.style.overflow = '';
      popupImg.src = '';
      popup.classList.remove('loading');
    }, 300);
  }

  // Handle clicks on gallery images
  imgGallery.addEventListener('click', (e) => {
    const clickedImg = e.target.closest('img');
    if (clickedImg) {
      showImage(clickedImg.src);
    }
  });

  // Close popup when clicking outside image
  popup.addEventListener('click', (e) => {
    if (e.target === popup || e.target === popupClose) {
      closePopup();
    }
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popup.style.display === 'flex') {
      closePopup();
    }
  });

  // Preload adjacent images for smoother experience
  function preloadAdjacentImages(currentImg) {
    const allImages = Array.from(imgGallery.getElementsByTagName('img'));
    const currentIndex = allImages.indexOf(currentImg);
    
    if (currentIndex > 0) {
      const prevImg = new Image();
      prevImg.src = allImages[currentIndex - 1].src;
    }
    
    if (currentIndex < allImages.length - 1) {
      const nextImg = new Image();
      nextImg.src = allImages[currentIndex + 1].src;
    }
  }

  // Initialize touch events for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  popup.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);

  popup.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchEndX - touchStartX;
    
    if (Math.abs(diff) > swipeThreshold) {
      closePopup();
    }
  }
})();