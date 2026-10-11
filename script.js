const backToTop = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.classList.remove(
        "opacity-0",
        "invisible",
        "pointer-events-none"
      );
      backToTop.classList.add("opacity-100", "visible");
    } else {
      backToTop.classList.add(
        "opacity-0",
        "invisible",
        "pointer-events-none"
      );
      backToTop.classList.remove("opacity-100", "visible");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

/* =========================================================
       KUSHWAHA BAZAR - VANILLA JAVASCRIPT ENGINE
       ========================================================= */

    // 1. Initial Data Models & State
    const sampleProducts = [
      {
        id: 1,
        title: "Embroidered Royal Silk Kurta Set",
        category: "ethnic",
        categoryName: "Ethnic Wear",
        price: "₹1,899",
        originalPrice: "₹2,499",
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=700&q=80",
        description: "Intricately woven kurta paired with tailored churidar, ideal for festive celebrations and weddings in Robertsganj."
      },
      {
        id: 2,
        title: "Classic Men's Premium Linen Shirt",
        category: "mens",
        categoryName: "Men's Fashion",
        price: "₹999",
        originalPrice: "₹1,299",
        image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=700&q=80",
        description: "Breathable pure linen shirt for effortless elegance in warm weather and everyday comfort."
      },
      {
        id: 3,
        title: "Printed Anarkali Kurti & Dupatta",
        category: "womens",
        categoryName: "Women's Fashion",
        price: "₹1,450",
        originalPrice: "₹1,850",
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=700&q=80",
        description: "Soft printed fabric with traditional flared silhouette, perfect for day outings and gatherings."
      },
      {
        id: 4,
        title: "Relaxed Fit Cotton Casual Chinos",
        category: "casual",
        categoryName: "Casual Wear",
        price: "₹899",
        originalPrice: "₹1,199",
        image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=700&q=80",
        description: "Stretchy and breathable cotton chinos built for dependable daily ease and all-day wear."
      },
      {
        id: 5,
        title: "Festive Embroidered Silk Dupatta Suit",
        category: "ethnic",
        categoryName: "Ethnic Wear",
        price: "₹2,250",
        originalPrice: "₹2,899",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80",
        description: "Richly detailed festive suit with ornate borders for family celebrations and Puja rituals."
      },
      {
        id: 6,
        title: "Casual Printed Floral Summer Dress",
        category: "womens",
        categoryName: "Women's Fashion",
        price: "₹1,199",
        originalPrice: "₹1,599",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80",
        description: "Lightweight, easy-breeze dress tailored for casual evenings and cheerful daytime wear."
      },
      {
        id: 7,
        title: "Tailored Slim Fit Denim Jeans",
        category: "casual",
        categoryName: "Casual Wear",
        price: "₹1,099",
        originalPrice: "₹1,499",
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=80",
        description: "Durable classic stretch denim engineered for comfortable everyday movement."
      },
      {
        id: 8,
        title: "Traditional Men's Kurta & Pajama",
        category: "mens",
        categoryName: "Men's Fashion",
        price: "₹1,299",
        originalPrice: "₹1,699",
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80",
        description: "Graceful Indian ethnic attire in premium woven cotton, tailored for festivals and formal visits."
      }
    ];

    let currentCategory = 'all';
    let searchQuery = '';
    let wishlist = new Set();
    let currentHeroSlide = 0;
    let heroInterval = null;
    let currentTestimonial = 0;
    let testimonialInterval = null;
    let currentLightboxIndex = 0;
    const galleryItemsData = [];

    // 2. DOM Ready Initialization
    document.addEventListener("DOMContentLoaded", () => {
      // Set current dynamic year
      document.getElementById('current-year').textContent = new Date().getFullYear();

      // Render product grid
      renderProducts();

      // Initialize hero carousel
      initHeroSlider();

      // Initialize testimonials slider
      initTestimonials();

      // Initialize gallery lightbox indexing
      initGallery();

      // Initialize FAQ accordion
      initFAQ();

      // Initialize UI event handlers
      initEventHandlers();

      // Render Lucide icons
      lucide.createIcons();
    });

    function initHeroSlider() {
      const slides = document.querySelectorAll('.hero-slide');
      const dots = document.querySelectorAll('.hero-dot');
      const prevBtn = document.getElementById('hero-prev');
      const nextBtn = document.getElementById('hero-next');
      const heroSection = document.getElementById('home');

      if (!slides.length) return;

      function showSlide(index) {
        slides.forEach((slide, i) => {
          slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
          if (i === index) {
            dot.className = "hero-dot w-3 h-3 rounded-full bg-gold transition-all duration-300 ring-2 ring-white/50";
          } else {
            dot.className = "hero-dot w-3 h-3 rounded-full bg-white/40 hover:bg-white/80 transition-all duration-300";
          }
        });
        currentHeroSlide = index;
      }

      function nextSlide() {
        const nextIdx = (currentHeroSlide + 1) % slides.length;
        showSlide(nextIdx);
      }

      function prevSlide() {
        const prevIdx = (currentHeroSlide - 1 + slides.length) % slides.length;
        showSlide(prevIdx);
      }

      function startAutoplay() {
        if (!heroInterval) {
          heroInterval = setInterval(nextSlide, 4500);
        }
      }

      function pauseAutoplay() {
        clearInterval(heroInterval);
        heroInterval = null;
      }

      // Event listeners for arrows and pagination
      nextBtn.addEventListener('click', () => { pauseAutoplay(); nextSlide(); startAutoplay(); });
      prevBtn.addEventListener('click', () => { pauseAutoplay(); prevSlide(); startAutoplay(); });

      dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
          pauseAutoplay();
          const targetIndex = parseInt(e.currentTarget.getAttribute('data-index'), 10);
          showSlide(targetIndex);
          startAutoplay();
        });
      });

      // Pause on hover
      heroSection.addEventListener('mouseenter', pauseAutoplay);
      heroSection.addEventListener('mouseleave', startAutoplay);

      // Touch swipe for mobile devices
      let touchStartX = 0;
      let touchEndX = 0;
      heroSection.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      heroSection.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
          pauseAutoplay();
          nextSlide();
          startAutoplay();
        } else if (touchEndX - touchStartX > 50) {
          pauseAutoplay();
          prevSlide();
          startAutoplay();
        }
      }, { passive: true });

      startAutoplay();
    }

    function renderProducts() {
      const container = document.getElementById('product-grid');
      const emptyState = document.getElementById('empty-products');
      container.innerHTML = '';

      const filtered = sampleProducts.filter(item => {
        const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              item.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });

      if (filtered.length === 0) {
        emptyState.classList.remove('hidden');
        return;
      } else {
        emptyState.classList.add('hidden');
      }

      filtered.forEach(product => {
        const isWishlisted = wishlist.has(product.id);
        const card = document.createElement('div');
        card.className = "group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-charcoal/5 flex flex-col justify-between";
        
        card.innerHTML = `
          <div class="relative aspect-[4/5] overflow-hidden bg-ivory">
            <img src="${product.image}" alt="${product.title}" loading="lazy" class="w-full h-full object-cover transition duration-500 group-hover:scale-105">
            
            <!-- Wishlist Heart Button -->
            <button class="wishlist-toggle absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-charcoal shadow-md flex items-center justify-center transition" data-id="${product.id}" aria-label="Toggle Wishlist">
              <i data-lucide="heart" class="w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-charcoal'}"></i>
            </button>

            <!-- Demo Tag -->
            <span class="absolute top-3 left-3 bg-primary/80 backdrop-blur-sm text-gold-light text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full">
              Demo Price
            </span>

            <!-- Quick View Floating Trigger -->
            <button class="quickview-trigger absolute bottom-3 inset-x-3 bg-white/95 text-primary py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider shadow opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0" data-id="${product.id}">
              Quick View
            </button>
          </div>

          <div class="p-5 flex flex-col flex-1 justify-between">
            <div>
              <span class="text-[11px] uppercase tracking-widest text-gold font-semibold">${product.categoryName}</span>
              <h4 class="font-serif text-base font-bold text-primary mt-1 line-clamp-1">${product.title}</h4>
              <p class="text-xs text-muted mt-1 line-clamp-2">${product.description}</p>
            </div>

            <div class="mt-4 pt-3 border-t border-charcoal/5 flex items-center justify-between">
              <div>
                <span class="font-bold text-sm text-primary">${product.price}</span>
                <span class="text-xs text-muted line-through ml-1">${product.originalPrice}</span>
              </div>
              <button class="whatsapp-enquire-item bg-[#25D366] hover:bg-[#1EBE5B] text-white px-3 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1 transition" data-id="${product.id}">
                <i data-lucide="message-circle" class="w-3.5 h-3.5"></i> Enquire
              </button>
            </div>
          </div>
        `;

        container.appendChild(card);
      });

      lucide.createIcons();
      attachProductCardListeners();
    }

    function filterCategory(cat) {
      currentCategory = cat;
      const catButtons = document.querySelectorAll('.cat-btn');
      catButtons.forEach(btn => {
        if (btn.getAttribute('data-cat') === cat) {
          btn.className = "cat-btn active px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition bg-primary text-white";
        } else {
          btn.className = "cat-btn px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition bg-ivory text-charcoal hover:bg-gold/20";
        }
      });
      renderProducts();
    }

    function attachProductCardListeners() {
      // Wishlist toggle buttons
      document.querySelectorAll('.wishlist-toggle').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = parseInt(e.currentTarget.getAttribute('data-id'), 10);
          toggleWishlist(id);
        });
      });

      // Quick View triggers
      document.querySelectorAll('.quickview-trigger').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = parseInt(e.currentTarget.getAttribute('data-id'), 10);
          openQuickView(id);
        });
      });

      // WhatsApp single enquiry buttons
      document.querySelectorAll('.whatsapp-enquire-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = parseInt(e.currentTarget.getAttribute('data-id'), 10);
          const product = sampleProducts.find(p => p.id === id);
          if (product) {
            const text = encodeURIComponent(`Hello Kushwaha Bazar (Robertsganj), I would like to enquire about "${product.title}" (${product.price}) shown on your website.`);
            window.open(`https://wa.me/?text=${text}`, '_blank');
          }
        });
      });
    }

    function toggleWishlist(id) {
      if (wishlist.has(id)) {
        wishlist.delete(id);
      } else {
        wishlist.add(id);
      }
      updateWishlistBadge();
      renderProducts();
    }

    function updateWishlistBadge() {
      const badge = document.getElementById('wishlist-badge');
      badge.textContent = wishlist.size;
    }

    function openWishlistModal() {
      const modal = document.getElementById('wishlist-modal');
      const container = document.getElementById('wishlist-items-container');
      container.innerHTML = '';

      if (wishlist.size === 0) {
        container.innerHTML = `<p class="text-xs text-muted py-6 text-center">Your wishlist is empty. Tap the heart on styles you like!</p>`;
      } else {
        wishlist.forEach(id => {
          const product = sampleProducts.find(p => p.id === id);
          if (product) {
            const itemRow = document.createElement('div');
            itemRow.className = "flex items-center justify-between p-2 rounded-xl bg-ivory";
            itemRow.innerHTML = `
              <div class="flex items-center gap-3">
                <img src="${product.image}" class="w-10 h-10 object-cover rounded-lg">
                <div>
                  <h5 class="text-xs font-bold text-primary">${product.title}</h5>
                  <span class="text-[11px] text-gold">${product.price}</span>
                </div>
              </div>
              <button class="remove-wishlist text-rose-500 hover:text-rose-700 text-xs p-1" data-id="${product.id}">✕</button>
            `;
            container.appendChild(itemRow);
          }
        });

        container.querySelectorAll('.remove-wishlist').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.getAttribute('data-id'), 10);
            toggleWishlist(id);
            openWishlistModal();
          });
        });
      }

      modal.classList.add('open');
    }

    function openQuickView(id) {
      const product = sampleProducts.find(p => p.id === id);
      if (!product) return;

      document.getElementById('qv-image').src = product.image;
      document.getElementById('qv-category').textContent = product.categoryName;
      document.getElementById('qv-title').textContent = product.title;
      document.getElementById('qv-price').textContent = product.price;
      document.getElementById('qv-original-price').textContent = product.originalPrice;
      document.getElementById('qv-desc').textContent = product.description;

      const qvWhatsApp = document.getElementById('qv-whatsapp-btn');
      qvWhatsApp.onclick = () => {
        const text = encodeURIComponent(`Hello Kushwaha Bazar, I want to check availability for "${product.title}" in your Robertsganj store.`);
        window.open(`https://wa.me/?text=${text}`, '_blank');
      };

      document.getElementById('quickview-modal').classList.add('open');
    }

    function initTestimonials() {
      const testimonials = document.querySelectorAll('.testimonial-item');
      const prevBtn = document.getElementById('test-prev');
      const nextBtn = document.getElementById('test-next');

      if (!testimonials.length) return;

      function showTestimonial(index) {
        testimonials.forEach((item, i) => {
          item.classList.toggle('active', i === index);
        });
        currentTestimonial = index;
      }

      function nextTestimonial() {
        const nextIdx = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(nextIdx);
      }

      function prevTestimonial() {
        const prevIdx = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(prevIdx);
      }

      nextBtn.addEventListener('click', nextTestimonial);
      prevBtn.addEventListener('click', prevTestimonial);

      testimonialInterval = setInterval(nextTestimonial, 5000);
    }

    function initGallery() {
      const items = document.querySelectorAll('.gallery-item');
      const lightbox = document.getElementById('gallery-lightbox');
      const lbImg = document.getElementById('lightbox-image');
      const lbCap = document.getElementById('lightbox-caption');
      const lbPrev = document.getElementById('lightbox-prev');
      const lbNext = document.getElementById('lightbox-next');
      const lbClose = document.getElementById('close-lightbox');

      items.forEach((item, i) => {
        const src = item.getAttribute('data-src');
        const title = item.getAttribute('data-title');
        galleryItemsData.push({ src, title });

        item.addEventListener('click', () => {
          openLightbox(i);
        });
      });

      function openLightbox(index) {
        currentLightboxIndex = index;
        lbImg.src = galleryItemsData[index].src;
        lbCap.textContent = galleryItemsData[index].title;
        lightbox.classList.add('open');
      }

      function nextPhoto() {
        currentLightboxIndex = (currentLightboxIndex + 1) % galleryItemsData.length;
        lbImg.src = galleryItemsData[currentLightboxIndex].src;
        lbCap.textContent = galleryItemsData[currentLightboxIndex].title;
      }

      function prevPhoto() {
        currentLightboxIndex = (currentLightboxIndex - 1 + galleryItemsData.length) % galleryItemsData.length;
        lbImg.src = galleryItemsData[currentLightboxIndex].src;
        lbCap.textContent = galleryItemsData[currentLightboxIndex].title;
      }

      lbNext.addEventListener('click', nextPhoto);
      lbPrev.addEventListener('click', prevPhoto);
      lbClose.addEventListener('click', () => lightbox.classList.remove('open'));

      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          lightbox.classList.remove('open');
        }
      });

      // Keyboard Controls
      document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('open')) {
          if (e.key === 'ArrowRight') nextPhoto();
          if (e.key === 'ArrowLeft') prevPhoto();
          if (e.key === 'Escape') lightbox.classList.remove('open');
        }
      });
    }

    function initFAQ() {
      const faqCards = document.querySelectorAll('.faq-card');
      faqCards.forEach(card => {
        const btn = card.querySelector('.faq-question');
        const ans = card.querySelector('.faq-answer');
        const arrow = card.querySelector('.faq-arrow');

        btn.addEventListener('click', () => {
          const isOpen = !ans.classList.contains('hidden');

          // Close all cards first (single active item pattern)
          faqCards.forEach(c => {
            c.querySelector('.faq-answer').classList.add('hidden');
            c.querySelector('.faq-arrow').classList.remove('rotate-180');
            c.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          });

          if (!isOpen) {
            ans.classList.remove('hidden');
            arrow.classList.add('rotate-180');
            btn.setAttribute('aria-expanded', 'true');
          }
        });
      });
    }

    function initEventHandlers() {
      // Mobile menu toggle
      const mobileBtn = document.getElementById('mobile-menu-btn');
      const mobileMenu = document.getElementById('mobile-menu');
      const hamburger = document.getElementById('hamburger-icon');
      const closeIcon = document.getElementById('close-icon');

      mobileBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        if (isHidden) {
          mobileMenu.classList.remove('hidden');
          hamburger.classList.add('hidden');
          closeIcon.classList.remove('hidden');
        } else {
          mobileMenu.classList.add('hidden');
          hamburger.classList.remove('hidden');
          closeIcon.classList.add('hidden');
        }
      });

      document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
          hamburger.classList.remove('hidden');
          closeIcon.classList.add('hidden');
        });
      });

      // Header scroll background elevation
      window.addEventListener('scroll', () => {
        const header = document.getElementById('main-header');
        const btt = document.getElementById('back-to-top');
        if (window.scrollY > 80) {
          header.classList.add('shadow-md', 'bg-ivory');
          header.classList.remove('bg-ivory/90');
        } else {
          header.classList.remove('shadow-md');
          header.classList.add('bg-ivory/90');
        }

        // Back to top appearance
        if (window.scrollY > 400) {
          btt.classList.remove('opacity-0', 'pointer-events-none');
          btt.classList.add('opacity-100', 'pointer-events-auto');
        } else {
          btt.classList.remove('opacity-100', 'pointer-events-auto');
          btt.classList.add('opacity-0', 'pointer-events-none');
        }
      });

      // Back-to-top button
      document.getElementById('back-to-top').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      // Wishlist modal trigger
      document.getElementById('wishlist-btn').addEventListener('click', openWishlistModal);
      document.getElementById('close-wishlist').addEventListener('click', () => {
        document.getElementById('wishlist-modal').classList.remove('open');
      });

      // Wishlist Bulk WhatsApp Button
      document.getElementById('wishlist-whatsapp-all').addEventListener('click', () => {
        if (wishlist.size === 0) return;
        const items = Array.from(wishlist).map(id => {
          const p = sampleProducts.find(item => item.id === id);
          return p ? `• ${p.title} (${p.price})` : '';
        }).filter(Boolean).join('%0A');

        const message = `Hello Kushwaha Bazar, I would like to enquire about these saved styles from your Robertsganj store:%0A${items}`;
        window.open(`https://wa.me/?text=${message}`, '_blank');
      });

      // Quick View Close
      document.getElementById('close-quickview').addEventListener('click', () => {
        document.getElementById('quickview-modal').classList.remove('open');
      });

      // Close modals on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          document.getElementById('quickview-modal').classList.remove('open');
          document.getElementById('wishlist-modal').classList.remove('open');
          document.getElementById('gallery-lightbox').classList.remove('open');
        }
      });

      // Category filter buttons
      document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const cat = e.currentTarget.getAttribute('data-cat');
          filterCategory(cat);
        });
      });

      // Search field input handling
      const searchInput = document.getElementById('product-search-input');
      const clearSearchBtn = document.getElementById('clear-search-btn');
      const searchToggleBtn = document.getElementById('search-toggle-btn');

      searchToggleBtn.addEventListener('click', () => {
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => searchInput.focus(), 600);
      });

      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        if (searchQuery.length > 0) {
          clearSearchBtn.classList.remove('hidden');
        } else {
          clearSearchBtn.classList.add('hidden');
        }
        renderProducts();
      });

      clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        clearSearchBtn.classList.add('hidden');
        renderProducts();
      });

      document.getElementById('reset-filter-btn').addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        filterCategory('all');
      });

      // Contact Form Validation and WhatsApp Direct Send
      const contactForm = document.getElementById('contact-form');
      const nameInput = document.getElementById('contact-name');
      const phoneInput = document.getElementById('contact-phone');
      const msgInput = document.getElementById('contact-message');
      const feedback = document.getElementById('form-feedback');

      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;

        // Name validation
        if (!nameInput.value.trim()) {
          document.getElementById('name-error').classList.remove('hidden');
          valid = false;
        } else {
          document.getElementById('name-error').classList.add('hidden');
        }

        // Phone validation (10 digits)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phoneInput.value.replace(/\D/g, ''))) {
          document.getElementById('phone-error').classList.remove('hidden');
          valid = false;
        } else {
          document.getElementById('phone-error').classList.add('hidden');
        }

        // Message validation
        if (!msgInput.value.trim()) {
          document.getElementById('message-error').classList.remove('hidden');
          valid = false;
        } else {
          document.getElementById('message-error').classList.add('hidden');
        }

        if (valid) {
          feedback.className = "p-4 rounded-xl text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-300";
          feedback.textContent = `Thank you, ${nameInput.value}! Your style enquiry has been noted. We welcome you to visit Kushwaha Bazar in Uttar Mohal, Robertsganj!`;
          feedback.classList.remove('hidden');
          contactForm.reset();
        }
      });

      document.getElementById('whatsapp-direct-btn').addEventListener('click', () => {
        const name = nameInput.value.trim() || 'Valued Customer';
        const userMsg = msgInput.value.trim() || 'I am interested in your clothing collection';
        const encoded = encodeURIComponent(`Hello Kushwaha Bazar (Robertsganj), my name is ${name}. ${userMsg}`);
        window.open(`https://wa.me/?text=${encoded}`, '_blank');
      });
    }
