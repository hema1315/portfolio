window.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const canvas = document.getElementById("matrix-canvas");

  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const chars = "01{}<>/=;*+-~#$!&|[]()ABCDEF0123456789";
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);

    const matrixInterval = setInterval(() => {
      ctx.fillStyle = "rgba(7, 7, 9, 0.1)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#ff7a1a";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }, 33);

    setTimeout(() => {
      if (intro) {
        intro.classList.add("hide");
      }
      setTimeout(() => {
        clearInterval(matrixInterval);
        if (intro) intro.style.display = "none";
      }, 850);
    }, 1200);
  }
});

const nav = document.getElementById("nav");
const list = document.querySelector("#menu-icon");
const navLinks = document.querySelectorAll("#nav a");

const toggleMenu = (close = false) => {
  nav.classList.toggle("active", !close && undefined);
  list.classList.toggle("bx-x", !close && undefined);
};

list.onclick = () => toggleMenu();
navLinks.forEach((link) =>
  link.addEventListener("click", () => toggleMenu(true)),
);

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(({ isIntersecting, target }) => {
      if (isIntersecting) {
        target.classList.add("is-visible");
        observer.unobserve(target);
      }
    });
  },
  { threshold: 0.15 },
);

document
  .querySelectorAll(
    ".about_det, .about_img, .skill_card, .project, .home_det, .home_img",
  )
  .forEach((el) => {
    el.classList.add("reveal");
    revealObserver.observe(el);
  });

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(({ isIntersecting, target }) => {
      if (isIntersecting) {
        const id = `#${target.id}`;
        navLinks.forEach((link) =>
          link.classList.toggle(
            "active-link",
            link.getAttribute("href") === id,
          ),
        );
      }
    });
  },
  { threshold: 0, rootMargin: "-50% 0px -50% 0px" }, // ← التعديل هنا بدل threshold: 0.5
);

document
  .querySelectorAll("section[id]")
  .forEach((section) => navObserver.observe(section));
