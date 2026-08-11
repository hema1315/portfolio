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
  { threshold: 0.5 },
);

document
  .querySelectorAll("section[id]")
  .forEach((section) => navObserver.observe(section));
