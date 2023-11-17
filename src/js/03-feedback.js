import throttle from 'lodash/throttle';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.feedback-form');
  const storageKey = 'feedback-form-state';

  const getFormStateFromStorage = () => {
    const storedState = localStorage.getItem(storageKey);
    return storedState ? JSON.parse(storedState) : { email: '', message: '' };
  };

  const saveFormStateToStorage = throttle(() => {
    const formState = {
      email: form.email.value,
      message: form.message.value,
    };
    localStorage.setItem(storageKey, JSON.stringify(formState));
  }, 500);

  const fillFormFields = () => {
    const formState = getFormStateFromStorage();
    form.email.value = formState.email;
    form.message.value = formState.message;
  };

  const handleSubmit = event => {
    event.preventDefault();
    const formState = getFormStateFromStorage();
    console.log('Form submitted:', formState);
    localStorage.removeItem(storageKey);
    form.reset();
  };

  form.addEventListener('input', () => {
    saveFormStateToStorage();
  });

  window.addEventListener('load', () => {
    fillFormFields();
  });

  form.addEventListener('submit', handleSubmit);
});
