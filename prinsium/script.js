const container = document.createElement('div');
document.body.appendChild(container);

// Set container styles
container.style.display = 'grid';
container.style.gridTemplateColumns = 'repeat(28, 1fr)';
container.style.gridTemplateRows = 'repeat(8, 1fr)';
container.style.gap = '10px';
container.style.width = '100vw';
container.style.padding = '10px';
container.style.boxSizing = 'border-box';

const boxes = [];
const invisibleBoxes = [11,12,14,21,22,25,26,29,30,33,34,39,42,43,44,48,49,51,54,56,57,60,61,67,70,71,72,76,77,79,82]; // Boxes that will be invisible by default

// Create 28 * 8 = 224 boxes
for (let i = 0; i < 28 * 8; i++) {
  const box = document.createElement('div');
  box.style.backgroundColor = 'black';
  box.style.aspectRatio = '1 / 1'; // Makes the box square
  box.style.width = '100%';
  box.style.height = 'auto'; // Let height adjust based on width
  box.style.transition = 'opacity 0.3s'; // Smooth transition for opacity on hover

  // If the box is in the invisibleBoxes array, set it to be invisible
  if (invisibleBoxes.includes(i)) {
    box.style.opacity = '0';
  }

  box.dataset.index = i; // Store index in data attribute

  // Apply hover effect using GSAP
  box.addEventListener('mouseenter', () => {
    if (!invisibleBoxes.includes(i)) {
      gsap.to(box, {
        rotation: 360,
        duration: 1,
        ease: 'none'
      });
    } else {
      box.style.opacity = '1'; // Make it visible on hover
    }
  });

  box.addEventListener('mouseleave', () => {
    if (!invisibleBoxes.includes(i)) {
      gsap.to(box, {
        rotation: 0,
        duration: 1,
        ease: 'none'
      });
    } else {
      box.style.opacity = '0'; // Make it invisible again on unhover
    }
  });

  container.appendChild(box);
  boxes.push(box);
}
