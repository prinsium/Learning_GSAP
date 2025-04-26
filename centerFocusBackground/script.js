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
const box = document.querySelector('.box');

const boxWidth = 40;
const boxHeight = 40;
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const cols = Math.floor(screenWidth / boxWidth);
const rows = Math.floor(screenHeight / boxHeight);

container.innerHTML = ''; // clear old box

let boxes = [];

// create grid of boxes
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    const newBox = box.cloneNode(true);
    newBox.style.left = `${j * boxWidth}px`;
    newBox.style.top = `${i * boxHeight}px`;
    container.appendChild(newBox);
    boxes.push(newBox);
  }
}

// distance calculator
function distance(x1, y1, x2, y2) {
  return Math.hypot(x1 - x2, y1 - y2);
}

boxes.forEach((parentBox, index) => {
  const cs1 = parentBox.querySelector('.cs');
  const x1 = parentBox.offsetLeft;
  const y1 = parentBox.offsetTop;

  parentBox.addEventListener('mouseenter', () => {
    boxes.forEach((childBox) => {
      const cs2 = childBox.querySelector('.cs');
      const x2 = childBox.offsetLeft;
      const y2 = childBox.offsetTop;

      const dist = distance(x1, y1, x2, y2);

      let scale;
      let radius;

      if (dist < 1) {
        scale = 1;
        radius = 0;
      } else if (dist < boxWidth * 1.5) {
        scale = 0.8;
        radius = 10;
      } else if (dist < boxWidth * 2.5) {
        scale = 0.6;
        radius = 20;
      } else if (dist < boxWidth * 3.5) {
        scale = 0.4;
        radius = 30;
      } else {
        scale = 0.2;
        radius = 40;
      }

      gsap.to(cs2, {
        scale: scale,
        borderRadius: `${radius}px`,
        duration: 0.4,
        ease: "power2.out"
      });
    });
  });

  parentBox.addEventListener('mouseleave', () => {
    boxes.forEach((childBox) => {
      const cs2 = childBox.querySelector('.cs');
      gsap.to(cs2, {
        scale: 0.2,
        borderRadius: "50%",
        duration: 0.5,
        ease: "power2.out"
      });
    });
  });
});
