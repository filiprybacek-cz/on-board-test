console.log("Web ON BOARD je aktivní!");

document.addEventListener("DOMContentLoaded", () => {
  console.log("ON BOARD – timeline init");

  const timelineItems = Array.from(document.querySelectorAll(".timeline-item"));
  const progressLine  = document.querySelector(".timeline-progress");
  const slides        = Array.from(document.querySelectorAll(".carousel-slide"));
  const dots          = Array.from(document.querySelectorAll(".carousel-dots .dot"));

  if (!timelineItems.length || !slides.length || !progressLine) {
    console.warn("Timeline: chybí prvky (.timeline-item / .carousel-slide / .timeline-progress).");
    return;
  }

  let currentIndex = 0;
  let autoplayId;

  // --- JEDNOTNÁ FUNKCE pro přepnutí všeho ---
  function updateTimeline(index) {
    currentIndex = index;

    // roky
    timelineItems.forEach((item, i) => {
      item.classList.toggle("active", i === index);
    });

    // slidy
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });

    // tečky
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });

    // progress čára
    const totalItems = timelineItems.length - 1;
    const step = 100 / totalItems;
    const progressWidth = index * step + 1.5;
    progressLine.style.width = `${progressWidth}%`;
  }

  // --- AUTOMATICKÉ PŘEPNUTÍ ---
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

  // --- KLIK NA ROKY ---
  timelineItems.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      updateTimeline(i);
      startAutoplay(); // resetuje cyklus
    });
  });

  // --- KLIK NA TEČKY ---
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      updateTimeline(i);
      startAutoplay();
    });
  });

  // --- INIT ---
  updateTimeline(currentIndex);
  startAutoplay();
});
