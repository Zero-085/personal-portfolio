document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     Typing Animation
  ========================== */
  const typingText = document.getElementById("typing-text");

  if (typingText) {
    const phrases = [
      "Software & ML Developer",
      "Python • Java • Web",
      "Practical ML Projects",
      "Open to Remote Internships",
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      typingText.innerHTML =
        currentPhrase.substring(0, charIndex) +
        '<span class="typing-cursor"></span>';

      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
      } else {
        typingSpeed = isDeleting ? 50 : 100;
      }

      setTimeout(type, typingSpeed);
    };

    setTimeout(type, 1000);
  }

  /* =========================
     Counter Animation
  ========================== */
  const counters = document.querySelectorAll(".counter");

  const animateCounter = (counter) => {
    const target = parseFloat(counter.dataset.target);
    const isDecimal = target % 1 !== 0;
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const update = () => {
      current += step;
      if (current < target) {
        counter.textContent = isDecimal
          ? current.toFixed(2)
          : Math.floor(current);
        requestAnimationFrame(update);
      } else {
        counter.textContent = isDecimal ? target.toFixed(2) : target;
      }
    };

    update();
  };

  if (counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.textContent === "0") {
            animateCounter(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    counters.forEach((counter) => counterObserver.observe(counter));
  }

  /* =========================
     Smooth Scrolling
  ========================== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* =========================
     Scroll Reveal Animations
  ========================== */
  const revealElements = document.querySelectorAll(
    ".skill-card, .project-card, .achievement-card, .education-item, .experience-item, .stat-box",
  );

  if (revealElements.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
    );

    revealElements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "all 0.6s ease-out";
      revealObserver.observe(el);
    });
  }

  /* =========================
     Mobile Hamburger Menu
  ========================== */
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("active");

      document.querySelector("nav").classList.toggle("menu-open", isOpen);
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        document.querySelector("nav").classList.remove("menu-open");
        menuToggle.textContent = "☰";
      });
    });
  }
});
