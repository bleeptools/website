// Signup form: posts to a CleverReach signup form, which runs the double opt-in
// (see pritoki.md §5.4).
const form = document.querySelector('.signup__form');
const status = document.querySelector('.signup__status');

if (form && status) {
  const button = form.querySelector('button[type="submit"]');
  const honeypot = form.querySelector('.signup__hp');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const done = () => {
      status.textContent = 'Almost there! Check your inbox and confirm your email.';
      form.reset();
    };

    // Bots fill in the hidden field: act as if it worked, send nothing.
    if (honeypot && honeypot.value) {
      done();
      return;
    }

    button.disabled = true;
    status.textContent = '';
    try {
      // CleverReach sends no CORS headers, so the response is opaque:
      // a resolved fetch only means the request went out.
      await fetch(form.action, {
        method: 'POST',
        mode: 'no-cors',
        body: new URLSearchParams(new FormData(form)),
      });
      done();
    } catch {
      status.textContent = 'Something went wrong. Please try again.';
    } finally {
      button.disabled = false;
    }
  });
}
