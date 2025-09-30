// ===================================
// BATIK INDONESIA - JAVASCRIPT
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  initSlider();
  initMobileMenu();
  initModal();
  initSmoothScroll();
  initNavbarEffects();
  initScrollAnimations();
});

// ============ SLIDER FUNCTIONALITY ============
let currentSlide = 0;
let autoSlideInterval;

function initSlider() {
  const slider = document.getElementById('slider');
  if (!slider) return;
  
  const totalSlides = slider.children.length;
  const slideDots = document.querySelectorAll('.slide-dot');
  
  // Show initial slide
  updateSlider();
  
  // Start auto slide
  startAutoSlide();
  
  // Update dots
  function updateDots() {
    slideDots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  // Update slider position
  function updateSlider() {
    if (!slider) return;
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots();
  }
  
  // Next slide function
  window.nextSlide = function() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
    resetAutoSlide();
  };
  
  // Previous slide function
  window.prevSlide = function() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
    resetAutoSlide();
  };
  
  // Show specific slide
  window.showSlide = function(index) {
    if (index >= 0 && index < totalSlides) {
      currentSlide = index;
      updateSlider();
      resetAutoSlide();
    }
  };
  
  // Auto slide
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      window.nextSlide();
    }, 5000);
  }
  
  // Reset auto slide
  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      window.prevSlide();
    } else if (e.key === 'ArrowRight') {
      window.nextSlide();
    }
  });
  
  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  slider.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  slider.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        window.nextSlide();
      } else {
        window.prevSlide();
      }
    }
  }
  
  // Pause on hover
  slider.addEventListener('mouseenter', function() {
    clearInterval(autoSlideInterval);
  });
  
  slider.addEventListener('mouseleave', function() {
    startAutoSlide();
  });
}

// ============ MOBILE MENU ============
function initMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (!mobileMenu) return;
  
  window.toggleMenu = function() {
    mobileMenu.classList.toggle('active');
  };
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    const menuButton = document.querySelector('button[onclick="toggleMenu()"]');
    
    if (mobileMenu.classList.contains('active')) {
      if (!mobileMenu.contains(e.target) && !menuButton.contains(e.target)) {
        mobileMenu.classList.remove('active');
      }
    }
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
    }
  });
}

// ============ DETAIL MODAL ============
function initModal() {
  const modal = document.getElementById('detail');
  if (!modal) return;
  
  window.openDetail = function(title, img, desc, asal, makna, kategori) {
    // Set modal content
    document.getElementById("detailTitle").textContent = title;
    document.getElementById("detailImg").src = img;
    document.getElementById("detailDesc").textContent = desc;
    document.getElementById("detailAsal").textContent = asal;
    document.getElementById("detailMakna").textContent = makna;
    document.getElementById("detailKategori").textContent = kategori;
    
    // Show modal
    modal.classList.remove("hidden");
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  };
  
  window.closeDetail = function() {
    modal.classList.add("hidden");
    document.body.style.overflow = 'auto';
  };
  
  // Close on ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      window.closeDetail();
    }
  });
  
  // Close on backdrop click
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      window.closeDetail();
    }
  });
}

// ============ SMOOTH SCROLL ============
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      const navbarHeight = 80;
      const targetPosition = targetElement.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      const mobileMenu = document.getElementById('mobileMenu');
      if (mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
      }
    });
  });
}

// ============ NAVBAR SCROLL EFFECTS ============
function initNavbarEffects() {
  const navbar = document.querySelector('header');
  if (!navbar) return;
  
  let lastScrollTop = 0;
  let ticking = false;
  
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow when scrolled
        if (scrollTop > 50) {
          navbar.classList.add('shadow-xl');
        } else {
          navbar.classList.remove('shadow-xl');
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
      });
      
      ticking = true;
    }
  });
}

// ============ SCROLL REVEAL ANIMATIONS ============
function initScrollAnimations() {
  // Check if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) {
    console.log('IntersectionObserver not supported');
    return;
  }
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe timeline items
  document.querySelectorAll('.glow-hover').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ============ LAZY LOAD IMAGES ============
function initLazyLoading() {
  if (!('IntersectionObserver' in window)) {
    return;
  }
  
  const imageObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ============ UTILITY FUNCTIONS ============

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// ============ ERROR HANDLING ============
window.addEventListener('error', function(e) {
  console.error('An error occurred:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled promise rejection:', e.reason);
});

// ============ PAGE LOAD ============
window.addEventListener('load', function() {
  // Remove loading class if exists
  document.body.classList.remove('loading');
  
  // Initialize lazy loading
  initLazyLoading();
  
  // Log performance
  if ('performance' in window) {
    setTimeout(() => {
      const perfData = performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
    }, 0);
  }
  
  console.log('✨ Batik Indonesia website loaded successfully!');
});

// ============ ACCESSIBILITY ENHANCEMENTS ============

// Add skip to main content link
function addSkipLink() {
  const skipLink = document.createElement('a');
  skipLink.href = '#tentang';
  skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-amber-600 text-white px-4 py-2 rounded z-50';
  skipLink.textContent = 'Skip to main content';
  skipLink.style.position = 'absolute';
  skipLink.style.left = '-9999px';
  
  skipLink.addEventListener('focus', function() {
    this.style.left = '1rem';
  });
  
  skipLink.addEventListener('blur', function() {
    this.style.left = '-9999px';
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);
}

// Add ARIA labels to buttons without them
function addAriaLabels() {
  document.querySelectorAll('button:not([aria-label])').forEach(button => {
    if (!button.getAttribute('aria-label')) {
      const text = button.textContent.trim() || button.getAttribute('title') || 'Button';
      button.setAttribute('aria-label', text);
    }
  });
}

// Initialize accessibility features
setTimeout(() => {
  addSkipLink();
  addAriaLabels();
}, 100);

// ============ CONSOLE ART ============
console.log(`%c
╔══════════════════════════════════════════╗
║                                          ║
║     🎨 BATIK INDONESIA WEBSITE 🎨       ║
║                                          ║
║   Warisan Budaya yang Membanggakan      ║
║                                          ║
╚══════════════════════════════════════════╝
`, 'color: #d97706; font-weight: bold; font-size: 12px;');

console.log('%c✨ Selamat datang di website Batik Indonesia!', 'color: #f59e0b; font-size: 14px; font-weight: bold;');
console.log('%c📌 Developed with ❤️ for Indonesian Culture', 'color: #78716c; font-size: 11px;');

// Prevent console errors from breaking the site
(function() {
  const noop = function() {};
  if (!window.console) {
    window.console = {
      log: noop,
      error: noop,
      warn: noop,
      info: noop
    };
  }
})();