document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Additional Activities Full Image Modal
  const activityImgs = document.querySelectorAll('[data-activity-img]');
  const activityModal = document.getElementById('activityModal');
  const activityModalImg = document.getElementById('activityModalImg');
  const activityModalCaption = document.getElementById('activityModalCaption');
  const activityModalClose = document.getElementById('activityModalClose');
  const activityModalOverlay = document.getElementById('activityModalOverlay');

  function openActivityModal(img, caption) {
    if (activityModal && activityModalImg && activityModalCaption) {
      activityModalImg.src = img.src;
      activityModalImg.alt = img.alt;
      activityModalCaption.textContent = caption;
      activityModal.style.display = 'block';
    }
    activityModalOverlay.classList.add('active');
  }
  function closeActivityModal() {
    if (activityModal) activityModal.style.display = 'none';
    if (activityModalOverlay) activityModalOverlay.classList.remove('active');
  }
  activityImgs.forEach(function(img) {
    img.addEventListener('click', function() {
      const caption = img.parentElement.querySelector('figcaption')?.textContent || '';
      openActivityModal(img, caption);
    });
  });
  if (activityModalClose) activityModalClose.addEventListener('click', closeActivityModal);
  if (activityModalOverlay) activityModalOverlay.addEventListener('click', closeActivityModal);

  // element toggle function
  const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

  // sidebar variables
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");
  if (sidebarBtn) {
    sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
  }

  // testimonials variables
  const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
  const modalContainer = document.querySelector("[data-modal-container]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const overlay = document.querySelector("[data-overlay]");
  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");

  const testimonialsModalFunc = function () {
    if (modalContainer && overlay) {
      modalContainer.classList.toggle("active");
      overlay.classList.toggle("active");
    }
  };

  testimonialsItem.forEach(function (item) {
    item.addEventListener("click", function () {
      if (modalImg && modalTitle && modalText) {
        const avatar = item.querySelector("[data-testimonials-avatar]");
        const title = item.querySelector("[data-testimonials-title]");
        const text = item.querySelector("[data-testimonials-text]");
        if (avatar) {
          modalImg.src = avatar.src;
          modalImg.alt = avatar.alt;
        }
        if (title) modalTitle.innerHTML = title.innerHTML;
        if (text) modalText.innerHTML = text.innerHTML;
      }
      testimonialsModalFunc();
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  if (overlay) overlay.addEventListener("click", testimonialsModalFunc);

  // custom select variables
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-select-value]");

  // Fix for missing null check on selectValue in selectItems click event
  selectItems.forEach(function (item) {
    item.addEventListener("click", function () {
      if (selectValue) {
        selectValue.innerText = item.innerText;
        elementToggleFunc(select);
        filterFunc(item.innerText.toLowerCase());
      }
    });
  });
  const filterBtn = document.querySelectorAll("[data-filter-btn]");
  if (select) {
    select.addEventListener("click", function () { elementToggleFunc(select); });
  }
  selectItems.forEach(function (item) {
    item.addEventListener("click", function () {
      if (selectValue) {
        selectValue.innerText = item.innerText;
        elementToggleFunc(select);
        filterFunc(item.innerText.toLowerCase());
      }
    });
  });
  // filter variables
  const filterItems = document.querySelectorAll("[data-filter-item]");
  function filterFunc(selectedValue) {
    filterItems.forEach(function (item) {
      if (selectedValue === "all" || selectedValue === item.dataset.category) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }
  let lastClickedBtn = filterBtn[0];
  filterBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (selectValue) selectValue.innerText = btn.innerText;
      filterFunc(btn.innerText.toLowerCase());
      if (lastClickedBtn) lastClickedBtn.classList.remove("active");
      btn.classList.add("active");
      lastClickedBtn = btn;
    });
  });

  // contact form variables
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");
  formInputs.forEach(function (input) {
    input.addEventListener("input", function () {
      if (form && form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  });
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      formBtn.setAttribute("disabled", "");
      formBtn.innerText = "Sending...";
      const formData = {};
      formInputs.forEach(function (input) {
        formData[input.name] = input.value;
      });
      try {
        const response = await fetch('https://backend-of-my-portofolio-3.onrender.com/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (!response.ok) throw new Error('Network response was not ok');
        await response.json();
        formBtn.innerText = "Sent!";
        formBtn.removeAttribute("disabled");
        form.reset();
        alert("Message sent successfully!");
      } catch (error) {
        formBtn.innerText = "Send";
        formBtn.removeAttribute("disabled");
        alert("Failed to send message. Please try again later.");
      }
    });
  }

  // New contact form handling
  const contactForm = document.getElementById('contactForm');
  const sendButton = document.querySelector('.send-button');
  const formMessage = document.getElementById('formMessage');

  if (contactForm && sendButton) {
    // Enable/disable send button based on form validity
    const formFields = contactForm.querySelectorAll('input, textarea');
    formFields.forEach(function (field) {
      field.addEventListener('input', function () {
        const allValid = Array.from(formFields).every(f => f.checkValidity());
        if (allValid) {
          sendButton.removeAttribute('disabled');
        } else {
          sendButton.setAttribute('disabled', '');
        }
      });
    });

    // Form submission
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Disable button and show loading
      sendButton.setAttribute('disabled', '');
      sendButton.innerHTML = '<span>⏳</span> Sending...';

      // Hide any previous messages
      if (formMessage) {
        formMessage.style.display = 'none';
        formMessage.classList.remove('success', 'error');
      }

      // Collect form data
      const formData = new FormData(contactForm);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      try {
        const response = await fetch('https://backend-of-my-portofolio-3.onrender.com/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        // Success
        sendButton.innerHTML = '<span>✅</span> Sent!';
        contactForm.reset();

        if (formMessage) {
          formMessage.textContent = 'Message sent successfully! I\'ll get back to you soon.';
          formMessage.classList.add('success');
          formMessage.style.display = 'block';
        }

        // Reset button after 3 seconds
        setTimeout(() => {
          sendButton.innerHTML = '<span>✈</span> Send Message';
          sendButton.removeAttribute('disabled');
        }, 3000);

      } catch (error) {
        console.error('Form submission error:', error);

        // Error
        sendButton.innerHTML = '<span>❌</span> Failed';

        if (formMessage) {
          formMessage.textContent = 'Failed to send message. Please try again later.';
          formMessage.classList.add('error');
          formMessage.style.display = 'block';
        }

        // Reset button after 3 seconds
        setTimeout(() => {
          sendButton.innerHTML = '<span>✈</span> Send Message';
          sendButton.removeAttribute('disabled');
        }, 3000);
      }
    });
  }

  // Navbar navigation
  const navLinks = document.querySelectorAll('[data-nav-link]');
  const sections = document.querySelectorAll('article[data-page]');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = link.getAttribute('data-nav-link');
      navLinks.forEach(function (l) { l.classList.remove('active'); });
      link.classList.add('active');
      sections.forEach(function (section) {
        if (section.getAttribute('data-page') === target) {
          section.classList.add('active');
        } else {
          section.classList.remove('active');
        }
      });
    });
  });
});
