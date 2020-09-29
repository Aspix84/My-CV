const callbackForm = document.querySelector('#callback-form-id');
const hireMeModal = document.querySelector('#hire-me-modal');

const userName = document.querySelector('#callback-form-input-name');
const userEmail = document.querySelector('#callback-form-input-email');
const userPhone = document.querySelector('#callback-form-input-phone');

userPhone.addEventListener('click', function (event) {
  if (!userPhone.value.trim()) {
    userPhone.value = '+380';
  }
});

userPhone.addEventListener('blur', function (event) {
  if (userPhone.value === '+380') {
    userPhone.value = '';
  }
});

callbackForm.addEventListener('submit', function (event) {
  event.preventDefault();
  let hasError = false;

  if (!userName.value.trim()) {
    userName.classList.add('callback-input-error');
    hasError = true;
  } else {
    userName.classList.remove('callback-input-error');
  }

  if (!userEmail.value.trim() || !isEmailValid(userEmail.value)) {
    userEmail.classList.add('callback-input-error');
    hasError = true;
  } else {
    userEmail.classList.remove('callback-input-error');
  }

  if (!userPhone.value.trim() || !isPhoneValid(userPhone.value)) {
    userPhone.classList.add('callback-input-error');
    hasError = true;
  } else {
    userPhone.classList.remove('callback-input-error');
  }

  if (hasError) {
    return;
  }

  userName.value = '';
  userPhone.value = '';
  userEmail.value = '';

  hireMeModal.classList.add('modal-active');

  setTimeout(function () {
    hireMeModal.classList.remove('modal-active');
  }, 2000);
});

function isPhoneValid(phone = '') {
  const regex = /(\+38)?\(?\d{3}\)?[\s\.-]?(\d{7}|\d{3}[\s\.-]\d{2}[\s\.-]\d{2}|\d{3}-\d{4})/;
  return phone.match(regex);
}

function isEmailValid(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
