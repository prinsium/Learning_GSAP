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


const boxes = document.querySelectorAll('.box');

function distance(x1, y1, x2, y2) {
  return Math.hypot(x1 - x2, y1 - y2);
}

boxes.forEach((box1, i) => {
  const cs1 = box1.querySelector('.cs');
  const x1 = i % 9;
  const y1 = Math.floor(i / 9);

  box1.addEventListener('mouseenter', () => {
    boxes.forEach((box2, j) => {
      const cs2 = box2.querySelector('.cs');
      const x2 = j % 9;
      const y2 = Math.floor(j / 9);

      const dist = distance(x1, y1, x2, y2);

      // Size based on distance
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
