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

// Video overlay. Buttons are plain links to YouTube; with JS they open the overlay.
// The player is only created after "Play video", and that choice lasts for this
// page view only (nothing is stored, see pritoki.md §5.6).
const video = document.querySelector('.video');

if (video && video.showModal) {
  const notice = video.querySelector('.video__notice');
  const frame = video.querySelector('.video__frame');
  let allowed = false;
  let start = 0;

  const play = () => {
    const player = document.createElement('iframe');
    player.src = `https://www.youtube-nocookie.com/embed/d3cqOHQAK_I?autoplay=1&rel=0&start=${start}`;
    player.title = 'pritoki video tour on YouTube';
    player.allow = 'autoplay; encrypted-media; picture-in-picture';
    player.allowFullscreen = true;
    player.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.replaceChildren(player);
    notice.hidden = true;
    frame.hidden = false;
    player.focus();
  };

  document.querySelectorAll('[data-video-start]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      start = Number(link.dataset.videoStart);
      video.showModal();
      if (allowed) play();
    });
  });

  video.querySelector('.video__play').addEventListener('click', () => {
    allowed = true;
    play();
  });

  video.querySelector('.video__close').addEventListener('click', () => video.close());

  // Clicks on the backdrop land on the dialog element itself.
  video.addEventListener('click', (event) => {
    if (event.target === video) video.close();
  });

  // Removing the player stops playback.
  video.addEventListener('close', () => {
    frame.replaceChildren();
    frame.hidden = true;
    notice.hidden = false;
  });
}
