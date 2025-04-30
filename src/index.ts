window.Webflow ||= [];
window.Webflow.push(() => {
  const buttons = document.querySelectorAll('[data-pm-carousel-move-button]');
  const leftButtons = document.querySelectorAll('[data-pm-carousel-move-button="left"]');
  leftButtons.forEach((button) => {
    (button as HTMLElement).style.opacity = '0.5';
  });
  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      const direction = button.getAttribute('data-pm-carousel-move-button');

      // Najdeme nejbližší wrapper a uvnitř container
      const wrapper = button.closest('[pm-element="carousel"]');
      if (!wrapper) return;

      const container = wrapper.querySelector('[pm-carousel]');
      const items = container ? container.querySelectorAll('.testimonials-item') : [];
      if (!container || items.length === 0) return;

      const currentScroll = (container as HTMLElement).offsetLeft + container.scrollLeft;

      // Najdeme aktuální item podle scrollLeft
      let currentIndex = 0;
      items.forEach((item, index) => {
        if ((item as HTMLElement).offsetLeft <= currentScroll + 10) {
          currentIndex = index;
        }
      });

      if (direction === 'right') {
        currentIndex += 1;
      } else if (direction === 'left') {
        currentIndex -= 1;
      }

      currentIndex = Math.max(0, Math.min(currentIndex, items.length - 1));

      const targetOffset = (items[currentIndex] as HTMLElement).offsetLeft;

      const scrollLeft = targetOffset - (container as HTMLElement).offsetLeft;

      // Plynulé scrollování
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });

      // reset button s opacity
      const leftButton = wrapper.querySelector('[data-pm-carousel-move-button="left"]');
      if (leftButton) {
        if (currentIndex === 0) {
          (leftButton as HTMLElement).style.opacity = '0.5';
        } else {
          (leftButton as HTMLElement).style.opacity = '1';
        }
      }
      const rightButton = wrapper.querySelector('[data-pm-carousel-move-button="right"]');
      if (rightButton) {
        if (currentIndex === items.length - 1) {
          (rightButton as HTMLElement).style.opacity = '0.5';
        } else {
          (rightButton as HTMLElement).style.opacity = '1';
        }
      }
    });
  });
});
