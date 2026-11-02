// Signup form: a plain form submission to a CleverReach signup form, which runs
// the double opt-in. It opens CleverReach's confirmation page in a new tab
// (target="_blank"); this script only adds the inline message (see pritoki.md §5.4).
const form = document.querySelector('.signup__form');
const status = document.querySelector('.signup__status');

if (form && status) {
  const honeypot = form.querySelector('.signup__hp');
  const done = () => {
    status.textContent = 'Almost there! Check your inbox and confirm your email.';
  };

  form.addEventListener('submit', (event) => {
    // Bots fill in the hidden field: act as if it worked, send nothing.
    if (honeypot && honeypot.value) {
      event.preventDefault();
      done();
      form.reset();
      return;
    }

    done();
    // Clear the field once the browser has taken the form data for the request.
    setTimeout(() => form.reset(), 0);
  });
}
