// const container = document.querySelector('.container');
// const originalBox = document.getElementById('box');

// const gridSize = 9; // 9x9 grid
// const boxSize = 50; // spacing

// originalBox.remove();

// const boxes = [];

// // Create grid
// for (let y = 0; y < gridSize; y++) {
//   for (let x = 0; x < gridSize; x++) {
//     const clone = originalBox.cloneNode(true);
//     clone.style.left = `${x * boxSize}px`;
//     clone.style.top = `${y * boxSize}px`;
//     container.appendChild(clone);

//     const cs = clone.querySelector('.cs');
//     boxes.push({ cs, x, y });
//   }
// }

// // Helper to calculate distance
// function distance(x1, y1, x2, y2) {
//   return Math.hypot(x1 - x2, y1 - y2);
// }

// // Hover Events
// boxes.forEach(({ cs, x, y }) => {
//   cs.addEventListener('mouseenter', () => {
//     boxes.forEach(({ cs: otherCs, x: otherX, y: otherY }) => {
//       const dist = distance(x, y, otherX, otherY);
      
//       // Map distance to scale
//       let scale = Math.max(1.8 - dist * 0.2, 0.4); // Default size is tiny (0.4)
//       let radius = Math.min(50, dist * 8); 

//       gsap.to(otherCs, {
//         scale: scale,
//         borderRadius: `${radius}%`,
//         duration: 0.4,
//         ease: "power2.out",
//       });
//     });
//   });

//   cs.addEventListener('mouseleave', () => {
//     boxes.forEach(({ cs: otherCs }) => {
//       gsap.to(otherCs, {
//         scale: 0.4, // Go back to very small size
//         borderRadius: "50%", // Full circle
//         duration: 0.5,
//         ease: "power2.out",
//       });
//     });
//   });
// });


const container = document.querySelector('.container');
const boxTemplate = document.querySelector('.box');

// Create a 5x5 grid (5 rows × 5 cols)
const rows = 5;
const cols = 5;

container.innerHTML = ''; // clear the original box

// Create and place the boxes
for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    const box = boxTemplate.cloneNode(true);
    box.style.left = `${x * 50}px`; // 50px = .box width
    box.style.top = `${y * 50}px`;  // 50px = .box height
    container.appendChild(box);
  }
}

// Now, select all boxes again
const boxes = document.querySelectorAll('.box');

// distance function
function distance(x1, y1, x2, y2) {
  return Math.hypot(x1 - x2, y1 - y2);
}

// Add hover effects
boxes.forEach((box1, i) => {
  const cs1 = box1.querySelector('.cs');
  const x1 = i % cols;
  const y1 = Math.floor(i / cols);

  box1.addEventListener('mouseenter', () => {
    boxes.forEach((box2, j) => {
      const cs2 = box2.querySelector('.cs');
      const x2 = j % cols;
      const y2 = Math.floor(j / cols);

      const dist = distance(x1, y1, x2, y2);

      // Size and borderRadius based on distance
      let scale = Math.max(1.8 - dist * 0.2, 0.4);
      let radius = Math.min(50, dist * 8);

      gsap.to(cs2, {
        scale: scale,
        borderRadius: `${radius}%`,
        duration: 0.4,
        ease: "power2.out",
      });
    });
  });

  box1.addEventListener('mouseleave', () => {
    boxes.forEach((box2) => {
      const cs2 = box2.querySelector('.cs');
      gsap.to(cs2, {
        scale: 0.4,
        borderRadius: "50%",
        duration: 0.5,
        ease: "power2.out",
      });
    });
  });
});
