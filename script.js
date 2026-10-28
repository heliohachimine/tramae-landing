document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.navbar__menu-button');
  const mobileMenu = document.querySelector('#mobile-menu');

  if (menuButton && mobileMenu) {
    const mobileLinks = mobileMenu.querySelectorAll('a');

    const openMenu = () => {
      mobileMenu.classList.add('is-open');

      menuButton.setAttribute('aria-expanded', 'true');
      mobileMenu.setAttribute('aria-hidden', 'false');

      document.body.classList.add('menu-open');
    };

    const closeMenu = () => {
      mobileMenu.classList.remove('is-open');

      menuButton.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');

      document.body.classList.remove('menu-open');
    };

    const toggleMenu = () => {
      const isOpen = mobileMenu.classList.contains('is-open');

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    };

    menuButton.addEventListener('click', toggleMenu);

    mobileLinks.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });

    document.addEventListener('click', (event) => {
      const clickedInsideMenu = mobileMenu.contains(event.target);
      const clickedMenuButton = menuButton.contains(event.target);

      if (!clickedInsideMenu && !clickedMenuButton) {
        closeMenu();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 680) {
        closeMenu();
      }
    });
  }

  /*
   * Smooth scroll
   *
   * Handles internal links such as:
   * #como-funciona
   * #esportes
   * #faq
   */
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');

      if (!targetId || targetId === '#') {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });

  /*
   * Navbar shadow while scrolling
   */
  const navbar = document.querySelector('.navbar');

  if (navbar) {
    const updateNavbar = () => {
      if (window.scrollY > 20) {
        navbar.classList.add('is-scrolled');
      } else {
        navbar.classList.remove('is-scrolled');
      }
    };

    updateNavbar();

    window.addEventListener('scroll', updateNavbar, {
      passive: true,
    });
  }
});
