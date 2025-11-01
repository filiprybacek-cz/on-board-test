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

// ============================================
// Pomalý plynulý scroll na anchor odkazy
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement && targetId !== "#") {
      e.preventDefault();

      const startPosition = window.pageYOffset;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 20;
      const distance = targetPosition - startPosition;
      const duration = 2000; // 🟢 zde upravíš rychlost – 2000 ms = 2 sekundy (cca o 50 % pomalejší)
      let start = null;

      function smoothScroll(currentTime) {
        if (!start) start = currentTime;
        const progress = currentTime - start;
        const scroll = easeInOutCubic(progress / duration);

        window.scrollTo(0, startPosition + distance * scroll);

        if (progress < duration) {
          requestAnimationFrame(smoothScroll);
        }
      }

      // Easing funkce pro plynulý pohyb
      function easeInOutCubic(t) {
        return t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      }

      requestAnimationFrame(smoothScroll);
    }
  });
});

// ==============================================
// Přidání třídy "scrolled" po scrollu
// ==============================================
window.addEventListener('scroll', function() {
  const header = document.querySelector('.onboard-header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ============================================
// Animace loga klienta (Semtex) při scrollování
// ============================================

const observerLogo = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observerLogo.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 }); // 0.5 = aktivace v polovině viditelnosti

const clientLogo = document.querySelector('.client-logo');
if (clientLogo) observerLogo.observe(clientLogo);

// ============================================
// Animace sekce "VIZE 2026" (vyjetí zespodu)
// ============================================

const observerAbout = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observerAbout.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

const aboutCard = document.querySelector('.about-card');
if (aboutCard) observerAbout.observe(aboutCard);

