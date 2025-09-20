(function() {
  const navLinks = document.querySelectorAll('.navbar-link');
  const pages = document.querySelectorAll('[data-page]');
  const sidebarBtn = document.querySelector('[data-sidebar-btn]');
  const sidebarMore = document.querySelector('.sidebar-info_more');
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  function showPage(name) {
    pages.forEach(p => {
      if (p.dataset.page === name) {
        p.classList.remove('is-hidden');
        p.classList.add('active');
      } else {
        p.classList.add('is-hidden');
        p.classList.remove('active');
      }
    });
    navLinks.forEach(btn => btn.classList.toggle('active', btn.dataset.navLink === name));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navLinks.forEach(btn => {
    if (btn.dataset.navLink) {
      btn.addEventListener('click', () => showPage(btn.dataset.navLink));
    }
  });

  if (sidebarBtn && sidebarMore) {
    sidebarBtn.addEventListener('click', () => sidebarMore.classList.toggle('is-hidden'));
  }

  if (contactForm) {
    (function() {
      emailjs.init('3KSkOqbfI39Sm04b7');
    })();
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      formMessage.textContent = '';
      formMessage.classList.remove('success', 'error');
      const formData = new FormData(contactForm);
      const templateParams = {
        from_name: formData.get('fullname'),
        from_email: formData.get('email'),
        message: formData.get('message')
      };
      try {
        const result = await emailjs.send('service_lojhawa', 'template_qkwsv9y', templateParams);
        formMessage.textContent = 'Message sent successfully!';
        formMessage.classList.add('success');
        contactForm.reset();
      } catch (error) {
        formMessage.textContent = 'Failed to send message. Please try again.';
        formMessage.classList.add('error');
      }
    });
  }

  showPage('about');
})();