(function() {
  document.addEventListener('DOMContentLoaded', function() {
    initThemeMode();
    initMobileNav();
    initCountdownTimers();
    initCollectionFilters();
    initWishlist();
    initReelModal();
    initNewsletterForms();
    initAccountForms();
    initTrackOrder();
  });

  /* ── TOAST MESSAGES ── */
  function showToast(title, description, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div style="font-weight: 700; font-family: var(--font-display); font-size: 0.875rem;">${title}</div>
      ${description ? `<div style="font-size: 0.75rem; opacity: 0.8; margin-top: 2px;">${description}</div>` : ''}
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  /* ── THEME SWITCHER (SIGNAL / STATIC) ── */
  function initThemeMode() {
    const toggleBtn = document.querySelector('[data-ocid="theme.toggle"]');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'signal';
      const targetTheme = currentTheme === 'signal' ? 'static' : 'signal';
      
      document.documentElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem('altinstinct-theme', targetTheme);

      // Fire a theme transition event if sections need to adjust dynamically
      window.dispatchEvent(new CustomEvent('altinstinct:theme:change', { detail: { theme: targetTheme } }));

      // Alert toast
      const isFunky = targetTheme === 'signal';
      showToast(
        isFunky ? 'SIGNAL ACTIVE ⚡' : 'STATIC SYSTEM OPEN',
        isFunky ? 'Energy frequency updated.' : 'Muted editorial mode loaded.'
      );
    });
  }

  /* ── MOBILE NAV DRAWER ── */
  function initMobileNav() {
    const toggleBtn = document.querySelector('[data-ocid="nav.mobile_menu_toggle"]');
    const drawer = document.getElementById('mobile-nav-drawer');
    if (!toggleBtn || !drawer) return;

    toggleBtn.addEventListener('click', function() {
      const isOpen = drawer.style.display === 'flex';
      drawer.style.display = isOpen ? 'none' : 'flex';
    });

    // Close on resize to desktop
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 768) {
        drawer.style.display = 'none';
      }
    });
  }

  /* ── COUNTDOWN TIMER LOGIC ── */
  function initCountdownTimers() {
    const countElements = document.querySelectorAll('[data-countdown-target]');
    if (countElements.length === 0) return;

    countElements.forEach(function(el) {
      const targetString = el.getAttribute('data-countdown-target');
      if (!targetString) return;

      const targetDate = new Date(targetString).getTime();
      if (isNaN(targetDate)) return;

      const digitDays = el.querySelector('[data-countdown="days"]');
      const digitHours = el.querySelector('[data-countdown="hours"]');
      const digitMinutes = el.querySelector('[data-countdown="minutes"]');
      const digitSeconds = el.querySelector('[data-countdown="seconds"]');
      const zeroState = el.querySelector('[data-countdown="zerostate"]');
      const activeState = el.querySelector('[data-countdown="active"]');

      function updateClock() {
        const now = Date.now();
        const diff = targetDate - now;

        if (diff <= 0) {
          if (activeState) activeState.style.display = 'none';
          if (zeroState) zeroState.style.display = 'block';
          clearInterval(intervalId);
          return;
        }

        if (activeState) activeState.style.display = 'flex';
        if (zeroState) zeroState.style.display = 'none';

        const days = Math.floor(diff / 86400000);
        const hours = Math.floor((diff % 86400000) / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);

        if (digitDays) digitDays.textContent = String(days).padStart(2, '0');
        if (digitHours) digitHours.textContent = String(hours).padStart(2, '0');
        if (digitMinutes) digitMinutes.textContent = String(minutes).padStart(2, '0');
        if (digitSeconds) digitSeconds.textContent = String(seconds).padStart(2, '0');
      }

      updateClock();
      const intervalId = setInterval(updateClock, 1000);
    });
  }

  /* ── COLLECTION FILTERING ── */
  function initCollectionFilters() {
    const searchInput = document.querySelector('[data-ocid="products.search_input"]');
    const categoryButtons = document.querySelectorAll('[data-ocid^="products.category."], [data-ocid^="lookbook.filter."]');
    const moodChips = document.querySelectorAll('.mood-chip');
    const productGrid = document.querySelector('[data-ocid="products.list"], [data-ocid="lookbook.list"]');
    const productCards = document.querySelectorAll('[data-product-card]');
    const emptyState = document.querySelector('[data-ocid="products.empty_state"], [data-ocid="lookbook.empty_state"]');

    if (!productGrid) return;

    let activeCategory = 'all';
    let activeMood = 'all';
    let searchQuery = '';

    // Search input
    if (searchInput) {
      searchInput.addEventListener('input', function(e) {
        searchQuery = e.target.value.toLowerCase().trim();
        applyFilters();
      });

      // Clear search button if present
      const clearBtn = searchInput.nextElementSibling;
      if (clearBtn && clearBtn.tagName === 'BUTTON') {
        clearBtn.addEventListener('click', function() {
          searchInput.value = '';
          searchQuery = '';
          applyFilters();
        });
      }
    }

    // Category swappers
    categoryButtons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        categoryButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Extract category value from data-ocid or text
        const idText = btn.getAttribute('data-ocid') || '';
        if (idText.includes('category.tees') || idText.includes('filter.tees')) activeCategory = 'tees';
        else if (idText.includes('category.hoodies') || idText.includes('filter.hoodies')) activeCategory = 'hoodies';
        else if (idText.includes('category.shorts') || idText.includes('filter.shorts')) activeCategory = 'shorts';
        else if (idText.includes('category.lowers') || idText.includes('filter.lowers')) activeCategory = 'lowers';
        else activeCategory = 'all';

        applyFilters();
      });
    });

    // Mood swappers
    moodChips.forEach(function(chip) {
      chip.addEventListener('click', function() {
        moodChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const idText = chip.getAttribute('data-ocid') || '';
        if (idText.includes('mood.clear')) activeMood = 'all';
        else {
          // extract the mood
          activeMood = idText.replace('products.mood.', '').replace('lookbook.mood.', '').trim().toLowerCase();
        }

        applyFilters();
      });
    });

    function applyFilters() {
      let matchCount = 0;

      productCards.forEach(function(card) {
        const category = (card.getAttribute('data-category') || '').trim().toLowerCase();
        const mood = (card.getAttribute('data-mood') || '').trim().toLowerCase();
        const title = (card.getAttribute('data-title') || '').trim().toLowerCase();
        const desc = (card.getAttribute('data-desc') || '').trim().toLowerCase();

        // check category match
        const catMatch = (activeCategory === 'all' || category === activeCategory);
        // check mood match
        const moodMatch = (activeMood === 'all' || mood === activeMood);
        // check search match
        const searchMatch = (searchQuery === '' || title.includes(searchQuery) || desc.includes(searchQuery));

        if (catMatch && moodMatch && searchMatch) {
          card.style.display = 'block';
          matchCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (emptyState) {
        emptyState.style.display = matchCount === 0 ? 'flex' : 'none';
      }
    }
  }

  /* ── WISHLIST LOGIC ── */
  function initWishlist() {
    const wishlistToggleButtons = document.querySelectorAll('[data-wishlist-toggle]');
    const wishlistGrid = document.querySelector('[data-wishlist-grid]');
    const emptyState = document.querySelector('[data-wishlist-empty]');
    const badge = document.querySelector('.badge-notify-wishlist');

    function getWishlist() {
      try {
        return JSON.parse(localStorage.getItem('altinstinct-wishlist')) || [];
      } catch (e) {
        return [];
      }
    }

    function saveWishlist(list) {
      localStorage.setItem('altinstinct-wishlist', JSON.stringify(list));
      updateBadge();
    }

    function updateBadge() {
      if (!badge) return;
      const list = getWishlist();
      badge.textContent = list.length;
      badge.style.display = list.length > 0 ? 'flex' : 'none';
    }

    function syncButtons() {
      const list = getWishlist();
      wishlistToggleButtons.forEach(function(btn) {
        const id = btn.getAttribute('data-product-id');
        const isAdded = list.some(item => item.id === id);
        
        if (isAdded) {
          btn.classList.add('added');
          btn.style.color = 'oklch(var(--destructive))';
          btn.style.borderColor = 'oklch(var(--destructive))';
          const svg = btn.querySelector('svg');
          if (svg) svg.setAttribute('fill', 'currentColor');
        } else {
          btn.classList.remove('added');
          btn.style.color = 'oklch(var(--muted-foreground))';
          btn.style.borderColor = 'oklch(var(--border))';
          const svg = btn.querySelector('svg');
          if (svg) svg.setAttribute('fill', 'none');
        }
      });
    }

    // Toggle button listener
    wishlistToggleButtons.forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const id = btn.getAttribute('data-product-id');
        const title = btn.getAttribute('data-product-title');
        const price = btn.getAttribute('data-product-price');
        const img = btn.getAttribute('data-product-image');
        const handle = btn.getAttribute('data-product-handle');

        let list = getWishlist();
        const index = list.findIndex(item => item.id === id);

        if (index > -1) {
          // Remove
          list.splice(index, 1);
          saveWishlist(list);
          showToast('Removed from wishlist', title);
        } else {
          // Add
          list.push({ id, title, price, img, handle });
          saveWishlist(list);
          showToast('Added to wishlist!', title);
        }

        syncButtons();
        if (wishlistGrid) {
          renderWishlistPage();
        }
      });
    });

    // Render local wishlist page dynamically if user is on page.wishlist
    function renderWishlistPage() {
      const list = getWishlist();
      if (list.length === 0) {
        if (wishlistGrid) wishlistGrid.innerHTML = '';
        if (emptyState) emptyState.style.display = 'flex';
        return;
      }

      if (emptyState) emptyState.style.display = 'none';

      let html = '';
      list.forEach(function(item) {
        html += `
          <div class="card-brand relative overflow-hidden" data-wishlist-item="${item.id}">
            <a href="/products/${item.handle}" style="display: block; aspect-ratio: 3/4; overflow: hidden; background: oklch(var(--muted) / 0.1);">
              <img src="${item.img}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
              <div class="mockup-fallback" style="display: none; width: 100%; height: 100%;">
                <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: oklch(var(--card)); font-family: var(--font-mono); font-size: 10px; color: oklch(var(--muted-foreground));">
                  [SVG ARCHIVE GRAPHIC]
                </div>
              </div>
            </a>
            <button class="absolute top-3 right-3 p-2 rounded-full cursor-pointer" data-wishlist-remove="${item.id}" style="background-color: rgba(0,0,0,0.4); color: #fff; display: flex; align-items: center; justify-content: center;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <div class="p-4" style="border-top: 1px solid oklch(var(--border));">
              <h3 class="font-display font-bold uppercase text-sm truncate" style="color: oklch(var(--foreground));">${item.title}</h3>
              <p class="font-mono text-xs mt-1" style="color: oklch(var(--primary));">${item.price}</p>
              <a href="/products/${item.handle}" class="button-brand primary text-center text-xs mt-3 block" style="padding: 8px 12px; width: 100%;">View Product</a>
            </div>
          </div>
        `;
      });

      if (wishlistGrid) {
        wishlistGrid.innerHTML = html;
        
        // Remove item button handler inside grid
        wishlistGrid.querySelectorAll('[data-wishlist-remove]').forEach(function(rmBtn) {
          rmBtn.addEventListener('click', function(e) {
            const id = rmBtn.getAttribute('data-wishlist-remove');
            let list = getWishlist();
            const index = list.findIndex(item => item.id === id);
            if (index > -1) {
              const name = list[index].title;
              list.splice(index, 1);
              saveWishlist(list);
              showToast('Removed from wishlist', name);
              renderWishlistPage();
              syncButtons();
            }
          });
        });
      }
    }

    updateBadge();
    syncButtons();
    if (wishlistGrid) {
      renderWishlistPage();
    }
  }

  /* ── LOOKBOOK REEL MODAL PLAYER ── */
  function initReelModal() {
    const reels = document.querySelectorAll('[data-reel-video-src]');
    let modal = document.querySelector('.reel-modal');

    if (reels.length === 0) return;

    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'reel-modal';
      modal.innerHTML = `
        <div class="reel-modal-close"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div>
        <div class="reel-modal-container">
          <video class="reel-modal-video" controls autoplay playsinline loop></video>
        </div>
      `;
      document.body.appendChild(modal);
    }

    const closeBtn = modal.querySelector('.reel-modal-close');
    const video = modal.querySelector('.reel-modal-video');

    reels.forEach(function(reel) {
      reel.addEventListener('click', function() {
        const src = reel.getAttribute('data-reel-video-src');
        if (!src) return;

        video.src = src;
        modal.classList.add('active');
        video.play().catch(e => console.log('Autoplay blocked', e));
      });
    });

    function closeModal() {
      modal.classList.remove('active');
      video.pause();
      video.src = '';
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeModal();
    });
  }

  /* ── NEWSLETTER SIGNUP SIMULATION ── */
  function initNewsletterForms() {
    const form = document.querySelector('[data-newsletter-form]');
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const nameInput = form.querySelector('[data-ocid="newsletter.name_input"]');
      const emailInput = form.querySelector('[data-ocid="newsletter.email_input"]');
      const submitBtn = form.querySelector('[data-ocid="newsletter.subscribe_button"]');
      const formWrapper = form.parentElement;

      const email = emailInput ? emailInput.value.trim() : '';
      const name = nameInput ? nameInput.value.trim() : '';

      if (!email) return;

      // Show loading
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span class="flex items-center justify-center gap-2">
            <span style="display: inline-block; width: 14px; height: 14px; border: 2px border-current; border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite;"></span>
            Joining...
          </span>
        `;
      }

      // Replicate network delay
      setTimeout(function() {
        // Success panel
        if (formWrapper) {
          formWrapper.innerHTML = `
            <div data-ocid="newsletter.success_state" style="text-align: center; padding: 40px 0;">
              <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
              <h3 class="heading-brand text-2xl mb-2" style="color: oklch(var(--secondary));">You are in the Archive!</h3>
              <p class="font-body text-sm opacity-80" style="color: oklch(var(--foreground));">
                Welcome${name ? `, ${name}` : ''}! Expect the unexpected in your inbox.
              </p>
              <button type="button" class="subscribe-again" style="margin-top: 24px; font-family: var(--font-display); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; text-decoration: underline; cursor: pointer; opacity: 0.6;">Subscribe another email</button>
            </div>
          `;

          // Subscribe again listener
          const againBtn = formWrapper.querySelector('.subscribe-again');
          if (againBtn) {
            againBtn.addEventListener('click', function() {
              window.location.reload();
            });
          }
        }

        const isSignal = document.documentElement.getAttribute('data-theme') === 'signal';
        showToast(
          isSignal ? 'Signal received. You are in. 🔥' : 'Welcome to the archive.',
          `${name ? `Welcome, ${name}!` : 'Welcome!'} check your inbox shortly.`
        );
      }, 1000);
    });
  }

  /* ── CUSTOMER ACCOUNT HELPERS ── */
  function initAccountForms() {
    const recoverToggle = document.querySelector('[data-recover-toggle]');
    const loginToggle = document.querySelector('[data-login-toggle]');
    const loginForm = document.getElementById('login-form');
    const recoverForm = document.getElementById('recover-form');

    function showRecover() {
      if (!loginForm || !recoverForm) return;
      loginForm.style.display = 'none';
      recoverForm.style.display = 'block';
    }

    function showLogin() {
      if (!loginForm || !recoverForm) return;
      recoverForm.style.display = 'none';
      loginForm.style.display = 'block';
    }

    if (window.location.hash === '#recover') showRecover();
    if (recoverToggle) recoverToggle.addEventListener('click', showRecover);
    if (loginToggle) loginToggle.addEventListener('click', showLogin);

    document.querySelectorAll('[data-address-toggle]').forEach(function(button) {
      button.addEventListener('click', function() {
        const id = button.getAttribute('data-address-toggle');
        const panel = document.getElementById('EditAddress_' + id);
        if (!panel) return;
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
      });
    });
  }

  /* ── TRACK ORDER HANDOFF ── */
  function initTrackOrder() {
    const form = document.querySelector('[data-track-order-form]');
    const result = document.querySelector('[data-track-order-result]');
    if (!form || !result) return;

    form.addEventListener('submit', function(event) {
      event.preventDefault();
      result.style.display = 'block';
      showToast('Secure status check ready', 'Login with your checkout email to view order details.');
    });
  }

  // Keyframes inject for spinning loader
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);

})();
