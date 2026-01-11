 /* ================= HEADER ================= */
  const header = document.getElementById("site-header");
  const nav = document.getElementById("site-nav");
  const cta = document.getElementById("header-cta");
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeMenuBtn = document.getElementById("close-menu-btn");
  const body = document.body;

  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY > 50;

    if (scrolled) {
      header.classList.add("bg-[#f6fbfe]", "shadow");
      header.classList.remove("bg-transparent");

      nav.classList.replace("text-white/80", "text-slate-800");
      cta.classList.replace("bg-white", "bg-blue-600");
      cta.classList.replace("text-slate-900", "text-white");
    } else {
      header.classList.remove("bg-[#f6fbfe]", "shadow");
      header.classList.add("bg-transparent");

      nav.classList.replace("text-slate-800", "text-white/80");
      cta.classList.replace("bg-blue-600", "bg-white");
      cta.classList.replace("text-white", "text-slate-900");
    }
  });

  /* ================= MOBILE MENU ================= */
  function openMenu() {
    mobileMenu.classList.remove("hidden");
    mobileMenu.classList.add("flex");
    menuBtn.classList.add("menu-open");
    body.classList.add("overflow-hidden");
  }

  function closeMenu() {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("flex");
    menuBtn.classList.remove("menu-open");
    body.classList.remove("overflow-hidden");
  }

  menuBtn.addEventListener("click", () =>
    mobileMenu.classList.contains("flex") ? closeMenu() : openMenu()
  );

  closeMenuBtn.addEventListener("click", closeMenu);
  mobileMenu.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", closeMenu)
  );

  /* ================= UNIFIED SCROLL REVEAL ================= */
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.style.setProperty("--delay", `${index * 0.12}s`);
          entry.target.classList.add("show");

          const icon = entry.target.querySelector(".icon-animate");
          if (icon) {
            icon.classList.add("animate-icon-in");
          }

          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document
    .querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-stagger, .animate-on-scroll"
    )
    .forEach(el => revealObserver.observe(el));