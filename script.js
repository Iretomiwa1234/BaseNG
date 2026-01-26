/* ================= HEADER SCROLL ================= */
const header = document.getElementById("site-header");
const nav = document.getElementById("site-nav");
const cta = document.getElementById("header-cta");
const logo = document.getElementById("site-logo");

const defaultLogo = "images/logo2.png";
const scrolledLogo = "images/logo1.png";

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY > 50;

  if (scrolled) {
    header.classList.add("bg-[#f6fbfe]", "shadow");
    header.classList.remove("bg-transparent");

    nav.classList.replace("text-white/80", "text-slate-800");
    cta.classList.replace("bg-white", "bg-blue-600");
    cta.classList.replace("text-slate-900", "text-white");

    logo.src = scrolledLogo;
  } else {
    header.classList.remove("bg-[#f6fbfe]", "shadow");
    header.classList.add("bg-transparent");

    nav.classList.replace("text-slate-800", "text-white/80");
    cta.classList.replace("bg-blue-600", "bg-white");
    cta.classList.replace("text-white", "text-slate-900");

    logo.src = defaultLogo;
  }
});

/* ================= MOBILE MENU ================= */
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const closeMenuBtn = document.getElementById("close-menu-btn");
const body = document.body;

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
mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));

/* ================= SCROLL REVEAL ================= */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.setProperty("--delay", `${index * 0.12}s`);
        entry.target.classList.add("show");

        const icon = entry.target.querySelector(".icon-animate");
        if (icon) icon.classList.add("animate-icon-in");

        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right, .reveal-stagger, .animate-on-scroll"
).forEach(el => revealObserver.observe(el));

/* ================= TABS ================= */
const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

// Show first tab by default
if (contents.length > 0 && tabs.length > 0) {
  contents[0].classList.remove("hidden");
  tabs[0].classList.add("active");
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    // Hide all contents
    contents.forEach(c => c.classList.add("hidden"));
    // Show selected content
    document.getElementById(target).classList.remove("hidden");

    // Reset tab styles
    tabs.forEach(b => {
      b.classList.remove("active", "shadow");
      b.style.backgroundColor = "white";
      b.style.color = "var(--baseng-muted)";
    });

    // Highlight active tab
    tab.classList.add("active", "shadow");
    tab.style.backgroundColor = "var(--baseng-primary)";
    tab.style.color = "white";
  });
});

/* ================= ACCORDION ================= */
const triggers = document.querySelectorAll(".accordion-trigger");

triggers.forEach(trigger => {
  trigger.addEventListener("click", () => {
    const item = trigger.parentElement;
    const content = item.querySelector(".accordion-content");
    const icon = trigger.querySelector(".accordion-icon");

    // Close others
    document.querySelectorAll(".accordion-content").forEach(c => {
      if (c !== content) {
        c.classList.add("hidden");
        const ic = c.previousElementSibling.querySelector(".accordion-icon");
        if (ic) ic.textContent = "+";
      }
    });

    // Toggle current
    content.classList.toggle("hidden");
    icon.textContent = content.classList.contains("hidden") ? "+" : "–";
  });
});

/* ================= CONTACT FORM SUBMISSION (AJAX) ================= */
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");

  if (!contactForm) return;

  // Create a container for messages
  const msgContainer = document.createElement("div");
  msgContainer.className = "form-message text-center py-2 font-medium";
  contactForm.prepend(msgContainer);

  contactForm.addEventListener("submit", async e => {
    e.preventDefault();

    const formData = new FormData(contactForm);

    // Basic validation
    let valid = true;
    formData.forEach((value, key) => {
      if (!value.trim()) valid = false;
    });
    if (!valid) {
      msgContainer.textContent = "Please fill out all required fields.";
      msgContainer.style.color = "red";
      return;
    }

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        msgContainer.textContent = "Message sent successfully!";
        msgContainer.style.color = "green";
        contactForm.reset();
      } else {
        msgContainer.textContent = "Failed to send message. Please try again.";
        msgContainer.style.color = "red";
      }
    } catch (err) {
      console.error(err);
      msgContainer.textContent = "An error occurred. Please try again.";
      msgContainer.style.color = "red";
    }
  });
});

if (window.location.pathname.endsWith(".html")) {
    const cleanURL = window.location.pathname.replace(".html", "");
    history.replaceState(null, "", cleanURL);
  }
