// Theme Management
(function() {
  const STORAGE_KEY = 'preferred_theme';
  const toggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  
  // Load saved theme or system preference
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  
  function setTheme(isDark) {
    root.setAttribute('data-theme', isDark ? 'dark' : 'light');
    if (toggle) {
      toggle.innerHTML = `<i class="bi bi-${isDark ? 'moon' : 'sun'}-fill"></i>`;
    }
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
  }

  // Set initial theme
  setTheme(initialTheme === 'dark');

  // Toggle theme
  toggle?.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    setTheme(!isDark);
  });

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setTheme(e.matches);
    }
  });
})();

// Quick Search & Navigation
(function() {
  const quickNav = {
    container: document.getElementById('quickNav'),
    toggle: document.getElementById('quickNavToggle'),
    input: document.getElementById('quickSearch'),
    results: document.getElementById('quickNavResults')
  };

  if (!quickNav.container) return;

  // Navigation data
  const navigationItems = [
    { id: 'home', name: 'Beranda', icon: 'bi-house-door' },
    { id: 'struktur', name: 'Struktur Kelas', icon: 'bi-diagram-3' },
    { id: 'anggota', name: 'Anggota Kelas', icon: 'bi-people' },
    { id: 'gallery', name: 'Galeri Foto', icon: 'bi-images' },
    { id: 'info-kelas', name: 'Info Kelas', icon: 'bi-info-circle' },
    { id: 'contact', name: 'Kontak', icon: 'bi-envelope' }
  ];

  // Cache member data
  const members = Array.from(document.querySelectorAll('.anggota-card')).map(card => ({
    name: card.querySelector('h5')?.textContent || '',
    role: card.querySelector('.role')?.textContent || '',
    element: card
  }));

  function showSearchResults(query) {
    const q = query.toLowerCase().trim();
    
    if (!q) {
      quickNav.results.innerHTML = `
        <div class="quick-nav-item">
          <i class="bi bi-search"></i>
          <span>Ketik untuk mencari...</span>
        </div>
      `;
      return;
    }

    // Search both navigation items and members
    const matchedNav = navigationItems.filter(item => 
      item.name.toLowerCase().includes(q)
    );

    const matchedMembers = members.filter(member => 
      member.name.toLowerCase().includes(q) ||
      member.role.toLowerCase().includes(q)
    );

    let html = '';

    if (matchedNav.length) {
      html += `
        <div class="quick-nav-group">
          <div class="quick-nav-group-title">Menu</div>
          ${matchedNav.map(item => `
            <a href="#${item.id}" class="quick-nav-item">
              <i class="bi ${item.icon}"></i>
              <span>${item.name}</span>
            </a>
          `).join('')}
        </div>
      `;
    }

    if (matchedMembers.length) {
      html += `
        <div class="quick-nav-group">
          <div class="quick-nav-group-title">Anggota</div>
          ${matchedMembers.map(member => `
            <div class="quick-nav-item" data-member="${member.name}">
              <i class="bi bi-person"></i>
              <div>
                <div class="quick-nav-member-name">${member.name}</div>
                <small class="quick-nav-member-role">${member.role}</small>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    if (!html) {
      html = `
        <div class="quick-nav-item">
          <i class="bi bi-exclamation-circle"></i>
          <span>Tidak ditemukan hasil untuk "${query}"</span>
        </div>
      `;
    }

    quickNav.results.innerHTML = html;
  }

  // Event listeners
  quickNav.toggle?.addEventListener('click', () => {
    quickNav.container.classList.toggle('active');
    if (quickNav.container.classList.contains('active')) {
      quickNav.input.focus();
    }
  });

  quickNav.input?.addEventListener('input', e => {
    showSearchResults(e.target.value);
  });

  quickNav.results?.addEventListener('click', e => {
    const memberItem = e.target.closest('[data-member]');
    if (memberItem) {
      const memberName = memberItem.dataset.member;
      const member = members.find(m => m.name === memberName);
      if (member?.element) {
        member.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        member.element.classList.add('highlight-pulse');
        setTimeout(() => member.element.classList.remove('highlight-pulse'), 2000);
      }
      quickNav.container.classList.remove('active');
    }
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!quickNav.container.contains(e.target)) {
      quickNav.container.classList.remove('active');
    }
  });

  // Initialize empty state
  showSearchResults('');
})();

// Enhanced Scroll Animations
(function() {
  // Respect user's motion preferences
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: [0.15, 0.5]
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        
        // Optional: unobserve if won't animate again
        if (!entry.target.dataset.repeat) {
          observer.unobserve(entry.target);
        }
      } else if (entry.target.dataset.repeat) {
        entry.target.classList.remove('reveal-visible');
      }
    });
  }, observerOptions);

  // Elements to animate
  const revealElements = document.querySelectorAll([
    '.struktur-item',
    '.anggota-card',
    '.gallery_kiri img',
    '.gallery_kanan img',
    '.section-header',
    '.contact-form',
    '.messages-list .message-item'
  ].join(','));

  revealElements.forEach((el, index) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(el);
  });
})();

// Gallery Enhancement
(function() {
  const gallery = document.querySelector('.gallery');
  const popup = document.getElementById('popupGallery');
  const popupImg = document.getElementById('popupImg');
  const popupClose = document.getElementById('popupClose');

  if (!gallery || !popup || !popupImg) return;

  const images = gallery.querySelectorAll('img');
  let currentIndex = 0;

  function showImage(index) {
    const img = images[index];
    if (!img) return;
    
    popupImg.src = img.src;
    currentIndex = index;
    
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
      popup.classList.add('active');
      popupImg.classList.add('active');
    }, 10);
  }

  function hidePopup() {
    popup.classList.remove('active');
    popupImg.classList.remove('active');
    
    setTimeout(() => {
      popup.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }

  function navigateGallery(direction) {
    let newIndex = currentIndex + direction;
    if (newIndex >= images.length) newIndex = 0;
    if (newIndex < 0) newIndex = images.length - 1;
    showImage(newIndex);
  }

  // Event listeners
  images.forEach((img, index) => {
    img.addEventListener('click', () => showImage(index));
  });

  popupClose.addEventListener('click', hidePopup);
  popup.addEventListener('click', e => {
    if (e.target === popup) hidePopup();
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (popup.style.display !== 'flex') return;
    
    switch(e.key) {
      case 'Escape': hidePopup(); break;
      case 'ArrowLeft': navigateGallery(-1); break;
      case 'ArrowRight': navigateGallery(1); break;
    }
  });

  // Touch navigation
  let touchStartX = 0;
  popup.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  popup.addEventListener('touchend', e => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX;
    
    if (Math.abs(diff) > 50) {
      navigateGallery(diff > 0 ? -1 : 1);
    }
  }, { passive: true });
})();