
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // element toggle function
  const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

  // sidebar variables
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");

  // sidebar toggle functionality for mobile
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

  // testimonials variables
  const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
  const modalContainer = document.querySelector("[data-modal-container]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const overlay = document.querySelector("[data-overlay]");

  // modal variable
  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");

  // modal toggle function
  const testimonialsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }

  // add click event to all modal items
  for (let i = 0; i < testimonialsItem.length; i++) {

    testimonialsItem[i].addEventListener("click", function () {

      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

      testimonialsModalFunc();

    });

  }

  // add click event to modal close button
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);

  // custom select variables
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-selecct-value]");
  const filterBtn = document.querySelectorAll("[data-filter-btn]");

  select.addEventListener("click", function () { elementToggleFunc(this); });

  // add event in all select items
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {

      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);

    });
  }

  // filter variables
  const filterItems = document.querySelectorAll("[data-filter-item]");
  function filterFunc(selectedValue) {
    for (let i = 0; i < filterItems.length; i++) {
      if (selectedValue === "all") {
        filterItems[i].classList.add("active");
      } else if (selectedValue === filterItems[i].dataset.category) {
        filterItems[i].classList.add("active");
      } else {
        filterItems[i].classList.remove("active");
      }
    }
  }

  // add event in all filter button items for large screen
  let lastClickedBtn = filterBtn[0];

  for (let i = 0; i < filterBtn.length; i++) {

    filterBtn[i].addEventListener("click", function () {

      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;

    });

  }

  // contact form variables
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");

  // add event to all form input field
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {

      // check form validation
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }

    });
  }

  // contact form submission handler
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(form);
      const data = {
        fullname: formData.get('fullname'),
        email: formData.get('email'),
        message: formData.get('message')
      };

      // Disable button and show loading state
      formBtn.disabled = true;
      formBtn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon><span>Sending...</span>';

      try {
        // Send POST request to backend
        const response = await fetch('https://backend-of-my-portofolio-2.onrender.com/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
          // Success
          showMessage('Message sent successfully! Thank you for contacting me.', 'success');
          form.reset();
        } else {
          // Backend error
          showMessage('Failed to send message. Please try again.', 'error');
        }
      } catch (error) {
        // Network error
        console.error('Error:', error);
        showMessage('Network error. Please check your connection and try again.', 'error');
      } finally {
        // Reset button
        formBtn.disabled = false;
        formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';
      }
    });
  }

  // Function to show messages
  function showMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;

    // Style the message
    messageDiv.style.cssText = `
      padding: 10px 15px;
      margin-top: 10px;
      border-radius: 5px;
      font-weight: 500;
      text-align: center;
    `;

    if (type === 'success') {
      messageDiv.style.cssText += `
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
      `;
    } else {
      messageDiv.style.cssText += `
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
      `;
    }

    // Insert message after form
    const formSection = document.querySelector('.contact-form');
    formSection.appendChild(messageDiv);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.remove();
      }
    }, 5000);
  }



// page navigation variables
const navLinks = document.querySelectorAll('[data-nav-link]');
const sections = document.querySelectorAll('article[data-page]');

navLinks.forEach((link) => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = this.getAttribute('data-nav-link');

    navLinks.forEach((l) => l.classList.remove('active'));
    this.classList.add('active');

    sections.forEach((section) => {
      if (section.getAttribute('data-page') === target) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });
  });
});
});
