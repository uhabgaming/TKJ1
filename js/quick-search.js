// Quick Search Enhancement
(function() {
  // Elements
  const quickNav = {
    container: document.getElementById('quickNav'),
    toggle: document.getElementById('quickNavToggle'),
    input: document.getElementById('quickSearch'),
    results: document.getElementById('quickNavResults')
  };

  // Early return if elements don't exist
  if (!quickNav.container || !quickNav.toggle || !quickNav.input || !quickNav.results) {
    console.warn('Quick search elements not found');
    return;
  }

  // Navigation data
  const navItems = [
    { id: 'home', name: 'Beranda', icon: 'bi-house-door' },
    { id: 'struktur', name: 'Struktur Kelas', icon: 'bi-diagram-3' },
    { id: 'anggota', name: 'Anggota Kelas', icon: 'bi-people' },
    { id: 'gallery', name: 'Galeri Foto', icon: 'bi-images' },
    { id: 'info-kelas', name: 'Info Kelas', icon: 'bi-info-circle' },
    { id: 'contact', name: 'Kontak', icon: 'bi-envelope' }
  ];

  // Get all member data
  const members = Array.from(document.querySelectorAll('.anggota-card')).map(card => ({
    name: card.querySelector('h5')?.textContent || '',
    role: card.querySelector('.role')?.textContent || '',
    element: card
  }));

  // Toggle search panel
  function toggleSearch(event) {
    event.stopPropagation(); // Prevent event bubbling
    quickNav.container.classList.toggle('active');
    
    if (quickNav.container.classList.contains('active')) {
      quickNav.input.focus();
      showInitialResults();
    }
  }

  // Show initial results
  function showInitialResults() {
    quickNav.results.innerHTML = `
      <div class="quick-nav-group">
        <div class="quick-nav-group-title">Menu Navigasi</div>
        ${navItems.map(item => `
          <a href="#${item.id}" class="quick-nav-item" data-section="${item.id}">
            <i class="bi ${item.icon}"></i>
            <span>${item.name}</span>
          </a>
        `).join('')}
      </div>
    `;
  }

  // Search functionality
  function performSearch(query) {
    const q = query.toLowerCase().trim();
    let html = '';

    if (!q) {
      showInitialResults();
      return;
    }

    // Search navigation items
    const matchedNav = navItems.filter(item => 
      item.name.toLowerCase().includes(q)
    );

    // Search members
    const matchedMembers = members.filter(member => 
      member.name.toLowerCase().includes(q) ||
      member.role.toLowerCase().includes(q)
    );

    // Build results HTML
    if (matchedNav.length) {
      html += `
        <div class="quick-nav-group">
          <div class="quick-nav-group-title">Menu</div>
          ${matchedNav.map(item => `
            <a href="#${item.id}" class="quick-nav-item" data-section="${item.id}">
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
        <div class="quick-nav-item no-results">
          <i class="bi bi-exclamation-circle"></i>
          <span>Tidak ada hasil untuk "${query}"</span>
        </div>
      `;
    }

    quickNav.results.innerHTML = html;
  }

  // Handle result clicks
  function handleResultClick(event) {
    const item = event.target.closest('.quick-nav-item');
    if (!item) return;

    // Handle member click
    const memberName = item.getAttribute('data-member');
    if (memberName) {
      const member = members.find(m => m.name === memberName);
      if (member?.element) {
        member.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        member.element.classList.add('highlight-pulse');
        setTimeout(() => member.element.classList.remove('highlight-pulse'), 2000);
      }
    }

    // Handle section click
    const sectionId = item.getAttribute('data-section');
    if (sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }

    // Close search panel
    quickNav.container.classList.remove('active');
  }

  // Event Listeners
  quickNav.toggle.addEventListener('click', toggleSearch);
  
  quickNav.input.addEventListener('input', (e) => {
    performSearch(e.target.value);
  });

  quickNav.results.addEventListener('click', handleResultClick);

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!quickNav.container.contains(e.target)) {
      quickNav.container.classList.remove('active');
    }
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && quickNav.container.classList.contains('active')) {
      quickNav.container.classList.remove('active');
    }
  });

  // Initialize
  showInitialResults();
})();