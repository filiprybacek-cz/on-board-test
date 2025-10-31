console.log("Web ON BOARD je aktivní!");

document.addEventListener("DOMContentLoaded", () => {
  console.log("ON BOARD – timeline init");

  const timelineItems = document.querySelectorAll(".timeline-item");
  const progressLine  = document.querySelector(".timeline-progress");
  const slides        = document.querySelectorAll(".carousel-slide");

  // Rychlá diagnostika
  console.log({
    items: timelineItems.length,
    slides: slides.length,
    hasProgress: !!progressLine
  });

  if (!timelineItems.length || !slides.length || !progressLine) {
    console.warn("Timeline: chybí prvky (.timeline-item / .carousel-slide / .timeline-progress).");
    return;
  }
  if (timelineItems.length !== slides.length) {
    console.warn("Timeline: počet tlačítek ≠ počet slidů. Seřaď 1:1.");
  }

  let currentIndex = 0;
  let autoplayId;

  function updateTimeline(index) {
  timelineItems.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  // Posun progressu (včetně začátku před prvním bodem)
  const totalItems = timelineItems.length - 1;
  const step = 100 / totalItems;
  const progressWidth = index * step + 1.5; // +1.5% pro vizuální „vlevo od prvního“
  progressLine.style.width = `${progressWidth}%`;
}

  function startAutoplay() {
    stopAutoplay();
    autoplayId = setInterval(() => {
      currentIndex = (currentIndex + 1) % timelineItems.length;
      updateTimeline(currentIndex);
    }, 6000);
  }
  function stopAutoplay() {
    if (autoplayId) clearInterval(autoplayId);
  }

  timelineItems.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      currentIndex = i;
      updateTimeline(currentIndex);
      startAutoplay(); // reset intervalu po kliku
    });
  });

  // první vykreslení
  updateTimeline(currentIndex);
  startAutoplay();
});

