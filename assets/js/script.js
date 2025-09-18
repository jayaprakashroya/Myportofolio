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
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      formMessage.textContent = '';
      formMessage.classList.remove('success', 'error');
      const formData = new FormData(contactForm);
      const data = {
        fullname: formData.get('fullname'),
        email: formData.get('email'),
        message: formData.get('message')
      };
      try {
        const response = await fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const result = await response.json();
        if (response.ok) {
          formMessage.textContent = result.message || 'Message sent successfully!';
          formMessage.classList.add('success');
          contactForm.reset();
        } else {
          formMessage.textContent = result.error || 'Failed to send message.';
          formMessage.classList.add('error');
        }
      } catch (error) {
        formMessage.textContent = 'Network error. Please try again later.';
        formMessage.classList.add('error');
      }
    });
  }

  showPage('about');
})();