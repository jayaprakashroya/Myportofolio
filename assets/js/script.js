(function() {
  emailjs.init('3KSkOqbfI39Sm04b7');
  const navLinks = document.querySelectorAll('.navbar-link');
  const pages = document.querySelectorAll('[data-page]');
  const sidebarBtn = document.querySelector('[data-sidebar-btn]');
  const sidebarMore = document.querySelector('.sidebar-info_more');
  const contactForm = document.getElementById('contactForm');
  const successMessage = document.querySelector('.form-message.success');
  const errorMessage = document.querySelector('.form-message.error');

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
    emailjs.init('3KSkOqbfI39Sm04b7');
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (successMessage) successMessage.style.display = 'none';
      if (errorMessage) errorMessage.style.display = 'none';

      const formData = new FormData(contactForm);
      const templateParams = {
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
      };
      try {
        await emailjs.send('service_lojhawa', 'template_qkwsv9y', templateParams);
        if (successMessage) {
          successMessage.style.display = 'block';
          contactForm.reset();
        }
      } catch (error) {
        if (errorMessage) {
          errorMessage.style.display = 'block';
        }
      }
    });
  }

  showPage('about');
})();
// --- Project modal handlers ---
(function() {
  const modalContainer = document.querySelector('[data-modal-container]');
  const modalClose = document.querySelector('[data-modal-close-btn]');
  const modalImg = document.querySelector('[data-modal-img]');
  const modalTitle = document.querySelector('[data-modal-title]');
  const modalText = document.querySelector('[data-modal-text]');
  const overlay = document.querySelector('[data-overlay]');

  if (!modalContainer) return;

  const projects = {
    smartslot: {
      title: 'SmartSlot — AI-Powered Smart Car Parking System',
      img: './assets/images/project1.jpg',
      text: `A Django-based intelligent parking management system using YOLOv8 for real-time vehicle detection, parking occupancy tracking, license plate recognition, and analytics. Tech: Python, Django, YOLOv8, OpenCV, PostgreSQL, Docker.`
    },
    docspot: {
      title: 'DocSpot — Appointment Booking Platform',
      img: './assets/images/project2.jpg',
      text: `A production-ready MERN application for online doctor appointment booking with role-based access, slot validation, admin analytics, and secure authentication. Tech: React, Node.js, Express, MongoDB, JWT.`
    },
    portfolio: {
      title: 'Portfolio Website',
      img: './assets/images/project3.jpg',
      text: `Responsive portfolio showcasing projects, skills, and achievements. Built with HTML, CSS, JavaScript and enhanced with accessibility and smooth interactions.`
    }
  };

  function openModal(projectKey) {
    const data = projects[projectKey];
    if (!data) return;
    modalTitle.textContent = data.title;
    modalText.textContent = data.text;
    if (modalImg) {
      modalImg.src = data.img;
      modalImg.alt = data.title;
      modalImg.style.display = data.img ? 'block' : 'none';
    }
    modalContainer.classList.remove('is-hidden');
  }

  function closeModal() {
    modalContainer.classList.add('is-hidden');
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-learn');
    if (btn) {
      const key = btn.dataset.project;
      e.preventDefault();
      openModal(key);
    }
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

})();