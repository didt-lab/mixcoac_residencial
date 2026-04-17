/* ============================================
   MIXCOAC RESIDENCIAL - Main JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Hero slideshow ---
  const heroSlides = document.querySelectorAll('.hero__bg');
  if (heroSlides.length > 1) {
    let heroIndex = 0;
    setInterval(() => {
      const current = heroSlides[heroIndex];
      current.classList.remove('hero__bg--active');
      current.classList.add('hero__bg--leaving');
      heroIndex = (heroIndex + 1) % heroSlides.length;
      heroSlides[heroIndex].classList.add('hero__bg--active');
      setTimeout(() => current.classList.remove('hero__bg--leaving'), 1500);
    }, 4000);
  }

  // --- Header scroll effect (sticky shrink header) ---
  const header = document.getElementById('header');
  const hero = document.getElementById('inicio');
  const handleScroll = () => {
    const heroBottom = hero.offsetTop + hero.offsetHeight - header.offsetHeight - 100;
    header.classList.toggle('header--scrolled', window.scrollY > heroBottom);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  // --- Active nav link on scroll ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.header__link');

  const updateActiveLink = () => {
    const scrollPos = window.scrollY + 150;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.toggle('header__link--active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  };
  window.addEventListener('scroll', updateActiveLink, { passive: true });

  // --- Hamburger menu ---
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('header__hamburger--active');
    nav.classList.toggle('header__nav--open');
    document.body.style.overflow = nav.classList.contains('header__nav--open') ? 'hidden' : '';
  });

  // Close menu on link click
  nav.querySelectorAll('.header__link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('header__hamburger--active');
      nav.classList.remove('header__nav--open');
      document.body.style.overflow = '';
    });
  });

  // --- Tabs: Casas ---
  const tabs = document.querySelectorAll('.casas__tab');
  const contents = document.querySelectorAll('.casas__content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('casas__tab--active'));
      tab.classList.add('casas__tab--active');

      contents.forEach(c => {
        c.classList.toggle('casas__content--active', c.id === target);
      });
    });
  });

  // --- Casas image sliders ---
  document.querySelectorAll('.casas__img-slider').forEach(slider => {
    const track = slider.querySelector('.casas__img-track');
    const prev = slider.querySelector('.casas__img-btn--prev');
    const next = slider.querySelector('.casas__img-btn--next');
    if (!track || !prev || !next) return;

    const slides = track.querySelectorAll('.casas__img-slide');
    let current = 0;

    const goTo = (index) => {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      current = index;
      track.style.transform = `translateX(-${current * 100}%)`;
    };

    prev.addEventListener('click', () => goTo(current - 1));
    next.addEventListener('click', () => goTo(current + 1));

    let autoPlay = setInterval(() => goTo(current + 1), 4000);
    slider.addEventListener('mouseenter', () => clearInterval(autoPlay));
    slider.addEventListener('mouseleave', () => {
      autoPlay = setInterval(() => goTo(current + 1), 4000);
    });
  });

  // --- Image zoom modal ---
  const imgModal = document.getElementById('imgModal');
  const imgModalImg = document.getElementById('imgModalImg');
  const imgModalClose = document.getElementById('imgModalClose');

  const openImgModal = (src, alt) => {
    imgModalImg.src = src;
    imgModalImg.alt = alt;
    imgModal.classList.add('img-modal--open');
    document.body.style.overflow = 'hidden';
  };

  const closeImgModal = () => {
    imgModal.classList.remove('img-modal--open');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.casas__zoomable').forEach(img => {
    img.addEventListener('click', () => openImgModal(img.src, img.alt));
  });

  imgModalClose.addEventListener('click', closeImgModal);
  imgModal.querySelector('.img-modal__overlay').addEventListener('click', closeImgModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imgModal.classList.contains('img-modal--open')) {
      closeImgModal();
    }
  });

  // --- Proyecto slider ---
  const proyectoTrack = document.getElementById('proyectoTrack');
  const proyectoPrev = document.getElementById('proyectoPrev');
  const proyectoNext = document.getElementById('proyectoNext');

  if (proyectoTrack && proyectoPrev && proyectoNext) {
    let proyectoSlide = 0;
    const proyectoSlides = proyectoTrack.querySelectorAll('.proyecto__slide');
    const proyectoTotal = proyectoSlides.length;

    const goToProyectoSlide = (index) => {
      if (index < 0) index = proyectoTotal - 1;
      if (index >= proyectoTotal) index = 0;
      proyectoSlide = index;
      proyectoTrack.style.transform = `translateX(-${proyectoSlide * 100}%)`;
    };

    proyectoPrev.addEventListener('click', () => goToProyectoSlide(proyectoSlide - 1));
    proyectoNext.addEventListener('click', () => goToProyectoSlide(proyectoSlide + 1));

    let proyectoAuto = setInterval(() => goToProyectoSlide(proyectoSlide + 1), 4000);
    const proyectoSlider = proyectoTrack.closest('.proyecto__slider');
    proyectoSlider.addEventListener('mouseenter', () => clearInterval(proyectoAuto));
    proyectoSlider.addEventListener('mouseleave', () => {
      proyectoAuto = setInterval(() => goToProyectoSlide(proyectoSlide + 1), 4000);
    });
  }

  // --- Avance de Obra slider ---
  const track = document.getElementById('avanceTrack');
  const prevBtn = document.getElementById('avancePrev');
  const nextBtn = document.getElementById('avanceNext');

  if (track && prevBtn && nextBtn) {
    let currentSlide = 0;
    const slides = track.querySelectorAll('.avance__slide');
    const totalSlides = slides.length;

    const goToSlide = (index) => {
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentSlide = index;
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
    };

    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

    // Auto-advance every 5s
    let autoSlide = setInterval(() => goToSlide(currentSlide + 1), 5000);

    // Pause on hover
    const slider = track.closest('.avance__slider');
    slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
    slider.addEventListener('mouseleave', () => {
      autoSlide = setInterval(() => goToSlide(currentSlide + 1), 5000);
    });
  }

  // --- Modal ---
  const modal = document.getElementById('contactModal');
  const modalClose = document.getElementById('modalClose');
  const openBtns = document.querySelectorAll('.open-modal');

  const openModal = () => {
    modal.classList.add('modal--open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('modal--open');
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => btn.addEventListener('click', openModal));
  modalClose.addEventListener('click', closeModal);
  modal.querySelector('.modal__overlay').addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('modal--open')) {
      closeModal();
    }
  });

  // --- Form validation ---
  const validateForm = (form) => {
    const nombre = form.querySelector('[name="nombre"]');
    const email = form.querySelector('[name="email"]');
    const telefono = form.querySelector('[name="telefono"]');
    let valid = true;

    // Reset
    form.querySelectorAll('.form__error').forEach(el => el.remove());
    form.querySelectorAll('input, textarea').forEach(el => el.style.borderColor = '');

    const showError = (field, msg) => {
      field.style.borderColor = '#c0392b';
      const error = document.createElement('span');
      error.className = 'form__error';
      error.style.cssText = 'color:#c0392b;font-size:12px;margin-top:2px;';
      error.textContent = msg;
      field.parentNode.appendChild(error);
      valid = false;
    };

    if (!nombre.value.trim()) showError(nombre, 'El nombre es requerido');
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showError(email, 'Ingresa un correo válido');
    }
    if (!telefono.value.trim() || telefono.value.replace(/\D/g, '').length < 10) {
      showError(telefono, 'Ingresa un teléfono válido (mín. 10 dígitos)');
    }

    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (!validateForm(form)) return;

    // Simular envío
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = 'Enviado';
      btn.style.background = '#27ae60';
      form.reset();

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
        if (modal.classList.contains('modal--open')) closeModal();
      }, 2000);
    }, 1000);
  };

  document.getElementById('contactForm').addEventListener('submit', handleSubmit);
  document.getElementById('modalForm').addEventListener('submit', handleSubmit);

  // --- Brochure Modal ---
  const brochureModal = document.getElementById('brochureModal');
  const brochureModalClose = document.getElementById('brochureModalClose');
  const openBrochureBtns = document.querySelectorAll('.open-brochure-modal');

  const openBrochureModal = () => {
    brochureModal.classList.add('modal--open');
    document.body.style.overflow = 'hidden';
  };

  const closeBrochureModal = () => {
    brochureModal.classList.remove('modal--open');
    document.body.style.overflow = '';
  };

  openBrochureBtns.forEach(btn => btn.addEventListener('click', openBrochureModal));
  brochureModalClose.addEventListener('click', closeBrochureModal);
  brochureModal.querySelector('.modal__overlay').addEventListener('click', closeBrochureModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && brochureModal.classList.contains('modal--open')) {
      closeBrochureModal();
    }
  });

  document.getElementById('brochureForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    if (!validateForm(form)) return;

    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Procesando...';
    btn.disabled = true;

    setTimeout(() => {
      // Trigger PDF download
      const link = document.createElement('a');
      link.href = 'assets/Greco_Booklet_Marzo_2026.pdf';
      link.download = 'Mixcoac_Residencial_Brochure.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      btn.textContent = '¡Descarga iniciada!';
      btn.style.background = '#27ae60';
      form.reset();

      setTimeout(() => {
        btn.textContent = 'Descargar Brochure';
        btn.style.background = '';
        btn.disabled = false;
        closeBrochureModal();
      }, 2000);
    }, 1000);
  });

  // --- Scroll reveal animations (bidirectional) ---
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('reveal--visible', entry.isIntersecting);
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => observer.observe(el));

  // --- Bidirectional reveal for features ---
  const featureEls = document.querySelectorAll('.reveal-feature');
  const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('reveal-feature--visible', entry.isIntersecting);
    });
  }, { threshold: 0.15 });

  featureEls.forEach(el => featureObserver.observe(el));

  // --- Configuración: hover interactivo markers ↔ tarjetas ---
  const casaCards = document.querySelectorAll('.configuracion__card[data-casa]');
  const casaMarkers = document.querySelectorAll('.configuracion__marker[data-casa]');

  function activateCasa(num) {
    casaCards.forEach(c => c.classList.toggle('is-active', c.dataset.casa === num));
    casaMarkers.forEach(m => m.classList.toggle('is-active', m.dataset.casa === num));
  }

  function deactivateAll() {
    casaCards.forEach(c => c.classList.remove('is-active'));
    casaMarkers.forEach(m => m.classList.remove('is-active'));
  }

  casaCards.forEach(card => {
    card.addEventListener('mouseenter', () => activateCasa(card.dataset.casa));
    card.addEventListener('mouseleave', deactivateAll);
  });

  casaMarkers.forEach(marker => {
    marker.addEventListener('mouseenter', () => activateCasa(marker.dataset.casa));
    marker.addEventListener('mouseleave', deactivateAll);
  });

});
