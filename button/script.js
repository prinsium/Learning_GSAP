const text = "CONTACT";
const container = document.getElementById("gsapButton");

// Clear if anything inside
container.innerHTML = "";

// Create letter columns
text.split("").forEach((char, index) => {
  // Outer wrapper to hide overflow
  const wrapper = document.createElement("div");
  wrapper.className = "char-wrapper";

  // Inner column that slides
  const column = document.createElement("div");
  column.className = "char-column";

  for (let i = 0; i < 3; i++) {
    const el = document.createElement("h3");
    el.className = "contactbtn";
    el.textContent = char;
    column.appendChild(el);
  }

  // Start at middle character (translateY = -100%)
  gsap.set(column, { yPercent: 10 });

  wrapper.appendChild(column);
  container.appendChild(wrapper);
});

// Add hover animation
container.addEventListener("mouseenter", () => {
  document.querySelectorAll(".char-column").forEach((col, i) => {
    gsap.from(col, {
      yPercent: i % 2 === 0 ? 10 : -10,
      duration: 0.5,
      ease: "power2.out"
    });
  });
});

container.addEventListener("mouseleave", () => {
  document.querySelectorAll(".char-column").forEach((col) => {
    gsap.to(col, {
      yPercent: 0,
      duration: 0.5,
      ease: "power2.inOut"
    });
  });
});
