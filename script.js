/**
 * PORTOFOLIO PRIBADI: FARA DITA AVIANA
 * JavaScript Interaktivitas & Fitur Web
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================
  // 1. TEMA DARK MODE & PERSISTENSI
  // ==========================================
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const rootElement = document.documentElement;
  
  // Baca preference tersimpan atau deteksi sistem OS
  const savedTheme = localStorage.getItem('fara_theme');
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    rootElement.setAttribute('data-theme', savedTheme);
  } else if (systemPrefersDark) {
    rootElement.setAttribute('data-theme', 'dark');
  } else {
    rootElement.setAttribute('data-theme', 'light');
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = rootElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    rootElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('fara_theme', newTheme);
  });

  // ==========================================
  // 2. STICKY NAVBAR & ACTIVE SCROLL SPY
  // ==========================================
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function handleNavbarScroll() {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy: sorot link yang sedang aktif
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        mobileNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // Initial check

  // ==========================================
  // 3. MOBILE DRAWER MENU
  // ==========================================
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn && closeDrawerBtn && drawerOverlay) {
    hamburgerBtn.addEventListener('click', openDrawer);
    closeDrawerBtn.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });
  }

  // ==========================================
  // 4. SCROLL REVEAL ANIMATIONS
  // ==========================================
  const elementsToReveal = document.querySelectorAll(
    '.animate-fade-in, .skill-card, .interest-card, .exp-card, .personality-banner, .about-card-main, .education-card, .project-card'
  );

  elementsToReveal.forEach(el => el.classList.add('animate-fade-in'));

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elementsToReveal.forEach(el => revealObserver.observe(el));

  // ==========================================
  // 5. BACK TO TOP BUTTON
  // ==========================================
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ==========================================
  // 6. MODAL UTILITIES (GENERIC MODAL HANDLER)
  // ==========================================
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Setup click outside & ESC key for all modals
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.open').forEach(modal => {
        closeModal(modal);
      });
    }
  });

  // ==========================================
  // 7. PROJECT DETAIL MODAL
  // ==========================================
  const projectModal = document.getElementById('project-modal');
  const openProjectBtns = document.querySelectorAll('.open-project-btn');
  const closeProjectBtn = document.getElementById('close-project-modal');
  const closeProjectBtnBottom = document.getElementById('close-project-modal-bottom');

  openProjectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(projectModal);
    });
  });

  if (closeProjectBtn) {
    closeProjectBtn.addEventListener('click', () => closeModal(projectModal));
  }
  if (closeProjectBtnBottom) {
    closeProjectBtnBottom.addEventListener('click', () => closeModal(projectModal));
  }

  // Project Modal Tabs
  const modalTabBtns = document.querySelectorAll('.modal-tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  modalTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabTarget = btn.getAttribute('data-tab');

      modalTabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(`tab-${tabTarget}`);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // ==========================================
  // 8. CV MODAL & DOWNLOAD / PRINT
  // ==========================================
  const cvModal = document.getElementById('cv-modal');
  const openCvModalBtn = document.getElementById('open-cv-modal-btn');
  const closeCvModal = document.getElementById('close-cv-modal');
  const closeCvModalBtn = document.getElementById('close-cv-modal-btn');
  const printCvBtn = document.getElementById('print-cv-btn');
  const downloadCvBtnAction = document.getElementById('download-cv-btn-action');

  if (openCvModalBtn) {
    openCvModalBtn.addEventListener('click', () => openModal(cvModal));
  }
  if (closeCvModal) {
    closeCvModal.addEventListener('click', () => closeModal(cvModal));
  }
  if (closeCvModalBtn) {
    closeCvModalBtn.addEventListener('click', () => closeModal(cvModal));
  }

  // Aksi Cetak / Unduh CV
  function handlePrintCv() {
    openModal(cvModal);
    setTimeout(() => {
      window.print();
    }, 300);
  }

  if (printCvBtn) {
    printCvBtn.addEventListener('click', handlePrintCv);
  }
  if (downloadCvBtnAction) {
    downloadCvBtnAction.addEventListener('click', () => {
      window.print();
    });
  }

  // ==========================================
  // 9. FORM KONTAK & TOAST NOTIFIKASI
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');
  const submitBtn = document.getElementById('submit-btn');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  const toast = document.getElementById('toast-notification');
  const toastClose = document.getElementById('toast-close');
  let toastTimer;

  function showToast(message, title = 'Pesan Terkirim!') {
    if (toast) {
      const titleEl = toast.querySelector('.toast-title');
      const descEl = toast.querySelector('.toast-desc');
      if (titleEl) titleEl.textContent = title;
      if (descEl) descEl.textContent = message;

      toast.classList.add('show');

      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.classList.remove('show');
      }, 5000);
    }
  }

  if (toastClose) {
    toastClose.addEventListener('click', () => {
      toast.classList.remove('show');
    });
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';

      const nameVal = nameInput.value.trim();
      const emailVal = emailInput.value.trim();
      const messageVal = messageInput.value.trim();

      if (!nameVal) {
        nameError.textContent = 'Silakan masukkan nama Anda.';
        isValid = false;
      }

      if (!emailVal) {
        emailError.textContent = 'Silakan masukkan alamat email Anda.';
        isValid = false;
      } else if (!validateEmail(emailVal)) {
        emailError.textContent = 'Format email tidak valid (contoh: nama@email.com).';
        isValid = false;
      }

      if (!messageVal) {
        messageError.textContent = 'Silakan tulis pesan yang ingin disampaikan.';
        isValid = false;
      }

      if (isValid) {
        // Efek loading tombol
        const originalBtnHtml = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <i class="fa-solid fa-spinner fa-spin"></i>
          <span>Mengirim...</span>
        `;

        // Simulasi pengiriman data
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
          contactForm.reset();

          showToast(
            `Terima kasih ${nameVal}, pesan Anda telah berhasil dikirim!`,
            'Pesan Diterima ✨'
          );
        }, 1000);
      }
    });
  }

  // ==========================================
  // 10. SMOOTH SCROLL FOR ALL ANCHORS
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  console.log('Portofolio Fara Dita Aviana (SMK RPL) berhasil dimuat dengan sempurna! ✨');
});
