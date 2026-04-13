const accordionRoot = document.querySelector("[data-accordion]");
const yearTarget = document.getElementById("year");

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

if (accordionRoot) {
  const triggers = accordionRoot.querySelectorAll("button[aria-controls]");

  const closeItem = (button) => {
    const panel = document.getElementById(button.getAttribute("aria-controls"));
    button.setAttribute("aria-expanded", "false");
    if (panel) {
      panel.hidden = true;
    }
  };

  const openItem = (button) => {
    const panel = document.getElementById(button.getAttribute("aria-controls"));
    button.setAttribute("aria-expanded", "true");
    if (panel) {
      panel.hidden = false;
    }
  };

  triggers.forEach((button) => {
    button.addEventListener("click", () => {
      const isExpanded = button.getAttribute("aria-expanded") === "true";

      triggers.forEach((otherButton) => {
        if (otherButton !== button) {
          closeItem(otherButton);
        }
      });

      if (isExpanded) {
        closeItem(button);
      } else {
        openItem(button);
      }
    });
  });
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealNodes = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -6% 0px",
    },
  );

  revealNodes.forEach((node) => observer.observe(node));
} else {
  document.querySelectorAll(".reveal").forEach((node) => {
    node.classList.add("is-visible");
  });
}
