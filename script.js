const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const formEndpoint = 'https://script.google.com/macros/s/AKfycbw9IcrCjwnb6-It3Ynn-RnXNx0VsPYDqULPh3XyXF572x2RkvZSXJ0N153x2umSNLCwTg/exec';

contactForm.addEventListener('submit', event => {
  event.preventDefault();

  const submitButton = contactForm.querySelector('button[type="submit"]');
  const formData = new FormData(contactForm);
  const payload = {
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company'),
    message: formData.get('message')
  };

  submitButton.disabled = true;
  submitButton.textContent = 'Submitting...';
  formStatus.textContent = '';

  fetch(formEndpoint, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8'
    },
    body: JSON.stringify(payload)
  })
    .then(() => {
      contactForm.reset();
      formStatus.textContent = 'Thank you. Your inquiry has been submitted.';
    })
    .catch(() => {
      formStatus.textContent = 'Something went wrong. Please try again.';
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.textContent = 'Submit Inquiry';
    });
});
