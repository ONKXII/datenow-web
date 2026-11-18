const gallery = document.querySelector('#screenshots');
const galleryButtons = document.querySelectorAll('[data-gallery-direction]');

if (gallery && galleryButtons.length) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let scrollFrame;

  const updateButtons = () => {
    const atStart = gallery.scrollLeft <= 2;
    const atEnd =
      gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 2;
    for (const button of galleryButtons) {
      button.disabled =
        Number(button.dataset.galleryDirection) < 0 ? atStart : atEnd;
    }
  };

  for (const button of galleryButtons) {
    button.addEventListener('click', () => {
      const firstCard = gallery.querySelector('figure');
      const distance =
        firstCard.getBoundingClientRect().width +
        parseFloat(getComputedStyle(gallery).gap);
      gallery.scrollBy({
        left: distance * Number(button.dataset.galleryDirection),
        behavior: reducedMotion.matches ? 'instant' : 'smooth',
      });
    });
  }

  gallery.addEventListener(
    'scroll',
    () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(updateButtons);
    },
    { passive: true },
  );
  window.addEventListener('resize', updateButtons);
  updateButtons();
}
