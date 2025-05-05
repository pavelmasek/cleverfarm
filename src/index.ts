window.Webflow ||= [];
window.Webflow.push(() => {
  const buttons = document.querySelectorAll('[pm-carousel-move-button]');
  const leftButtons = document.querySelectorAll('[pm-carousel-move-button="left"]');
  leftButtons.forEach((button) => {
    (button as HTMLElement).style.opacity = '0.5';
  });
  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      const direction = button.getAttribute('pm-carousel-move-button');

      // Najdeme nejbližší wrapper a uvnitř container
      const wrapper = button.closest('[pm-carousel="wrapper"]');
      if (!wrapper) return;

      const container = wrapper.querySelector<HTMLElement>('[pm-carousel="scroll-area"]');
      const items = (container ? container.children : []) as HTMLElement[];
      if (!container || items.length === 0) return;

      const currentScroll = container.offsetLeft + container.scrollLeft;

      // Najdeme aktuální item podle scrollLeft
      let currentIndex = 0;
      Array.from(items).forEach((item, index) => {
        if (item.offsetLeft <= currentScroll + 10) {
          currentIndex = index;
        }
      });

      if (direction === 'right') {
        currentIndex += 1;
      } else if (direction === 'left') {
        currentIndex -= 1;
      }

      currentIndex = Math.max(0, Math.min(currentIndex, items.length - 1));

      const targetOffset = items[currentIndex].offsetLeft;

      const scrollLeft = targetOffset - container.offsetLeft;

      // Plynulé scrollování
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });

      // reset button s opacity
      const leftButton = wrapper.querySelector<HTMLElement>('[pm-carousel-move-button="left"]');
      if (leftButton) {
        if (currentIndex === 0) {
          leftButton.style.opacity = '0.5';
        } else {
          leftButton.style.opacity = '1';
        }
      }
      const rightButton = wrapper.querySelector<HTMLElement>('[pm-carousel-move-button="right"]');
      if (rightButton) {
        if (scrollLeft + container.clientWidth >= container.scrollWidth) {
          rightButton.style.opacity = '0.5';
        } else {
          rightButton.style.opacity = '1';
        }
      }
    });
  });
});
