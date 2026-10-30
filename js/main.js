// Signup form: not wired to a provider yet (see SPEC.md §5.4).
const form = document.querySelector('.signup__form');
const status = document.querySelector('.signup__status');

if (form && status) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    // TODO: POST to the newsletter provider here.
    status.textContent = "Thanks! We'll let you know.";
    form.reset();
  });
}
