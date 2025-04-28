const container = document.createElement("div");
document.body.appendChild(container);

// Set container styles
container.style.display = "grid";
container.style.gridTemplateColumns = "repeat(28, 1fr)";
container.style.gridTemplateRows = "repeat(8, 1fr)";
container.style.gap = "10px";
container.style.width = "100vw";
container.style.padding = "10px";
container.style.boxSizing = "border-box";

const boxes = [];
const invisibleBoxes = [
  11, 12, 14, 21, 22, 25, 26, 29, 30, 33, 34, 40, 43, 44, 45, 49, 50, 57, 58,
  61, 62, 68, 71, 72, 73, 77, 78, 101, 105, 106, 109, 110, 113, 114, 115, 118,
  119, 126, 133, 134, 137, 138, 141, 142, 143, 147, 151, 154, 155, 156, 165,
  166, 169, 170, 171, 173, 179, 182, 183, 184, 193, 194, 197, 198, 199, 201,
  202, 207, 208, 213, 216, 219, 221, 222,
]; // Boxes that will be invisible by default

// Create 28 * 8 = 224 boxes
for (let i = 0; i < 28 * 8; i++) {
  const box = document.createElement("div");
  box.style.backgroundColor = "black";
  box.style.aspectRatio = "1 / 1"; // Makes the box square
  box.style.width = "100%";
  box.style.height = "auto"; // Let height adjust based on width
  box.style.transition = "opacity 0.3s"; // Smooth transition for opacity on hover

  // If the box is in the invisibleBoxes array, set it to be invisible
  if (invisibleBoxes.includes(i)) {
    box.style.opacity = "0";
  }

  box.dataset.index = i; // Store index in data attribute

  // Apply hover effect using GSAP
  box.addEventListener("mouseenter", () => {
    if (!invisibleBoxes.includes(i)) {
      gsap.to(box, {
        // rotation: "+=360",
        // duration: 1.5,
        // repeat: -1,
        scale: 2,
        duration: 0.4,
        ease: "none",
      });
    } else {
      box.style.opacity = "1"; // Make it visible on hover
    }
  });

  box.addEventListener("mouseleave", () => {
    if (!invisibleBoxes.includes(i)) {
      gsap.to(box, {
        scale: 1,
        duration: 0.4,
        ease: "none",
      });
    } else {
      gsap.to(box, {
        opacity: 0,
        duration: 3,
      });  // Make it invisible again on unhover
    }
  });

  container.appendChild(box);
  boxes.push(box);
}
