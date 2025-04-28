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


// const container = document.querySelector('.container');
// const boxTemplate = document.querySelector('.box');

// // Create 5x5 grid
// const rows = 5;
// const cols = 15;

// container.innerHTML = ''; // clear initial box

// for (let y = 0; y < rows; y++) {
//   for (let x = 0; x < cols; x++) {
//     const box = boxTemplate.cloneNode(true);
//     box.style.left = `${x * 50}px`;
//     box.style.top = `${y * 50}px`;
//     container.appendChild(box);
//   }
// }

// const boxes = document.querySelectorAll('.box');

// // distance calculator
// // function distance(x1, y1, x2, y2) {
// //   return Math.hypot(x1 - x2, y1 - y2);
// // }

// // New distance function for X pattern
// function distance(x1, y1, x2, y2) {
//   return Math.abs(x1 - x2) === Math.abs(y1 - y2) ? Math.abs(x1 - x2) : 999; 
// }


// // hover animation
// boxes.forEach((box1, i) => {
//   const x1 = i % cols;
//   const y1 = Math.floor(i / cols);

//   box1.addEventListener('mouseenter', () => {
//     boxes.forEach((box2, j) => {
//       const cs2 = box2.querySelector('.cs');
//       const x2 = j % cols;
//       const y2 = Math.floor(j / cols);

//       // const dist = distance(x1, y1, x2, y2);

//       // let scale = Math.max(1.8 - dist * 0.2, 0.4);
//       // let radius = Math.min(50, dist * 8);

//       // gsap.to(cs2, {
//       //   scale: scale,
//       //   borderRadius: `${radius}%`,
//       //   duration: 0.4,
//       //   ease: "power2.out",
//       // });

//       let dist = distance(x1, y1, x2, y2);

// if (dist !== 999) {
//   let scale = [1.0, 1.3, 1.6, 2.0][dist] || 0.4; // Custom scale per diagonal level
//   let radius = [40, 30, 20, 0][dist] || 50;

//   gsap.to(cs2, {
//     scale: scale,
//     borderRadius: `${radius}%`,
//     duration: 0.4,
//     ease: "power2.out",
//   });
// }

//     });
//   });
// });

// // shrink only when mouse leaves the entire container
// container.addEventListener('mouseleave', () => {
//   boxes.forEach((box2) => {
//     const cs2 = box2.querySelector('.cs');
//     gsap.to(cs2, {
//       scale: 0.4,
//       borderRadius: "50%",
//       duration: 0.5,
//       ease: "power2.out",
//     });
//   });
// });

const container = document.querySelector('.container');

// Set box size
const boxSize = 50;
const verticalStep = boxSize * Math.sqrt(3) / 2; // 43.3
let boxes = [];
let cols, rows;

// Function to create the grid
function createGrid() {
  // Clear previous boxes
  container.innerHTML = '';
  boxes = [];

  // Calculate number of columns and rows
  cols = Math.ceil(window.innerWidth / boxSize) + 2;
  rows = Math.ceil(window.innerHeight / verticalStep) + 2;

  // Create boxes
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const box = document.createElement('div');
      box.classList.add('box');

      // Set positions
      const offsetX = (y % 2 === 0) ? 0 : boxSize / 2;
      box.style.left = `${x * boxSize + (y % 2) * (boxSize / 2)}px`;
      box.style.top = `${y * verticalStep}px`;

      box.dataset.x = x;
      box.dataset.y = y;

      const cs = document.createElement('div');
      cs.classList.add('cs');
      box.appendChild(cs);
      container.appendChild(box);
      boxes.push(box);
    }
  }

  setupHover();
}

// Function to calculate custom "X" distance (diagonal based)
function distance(x1, y1, x2, y2) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  if (Math.abs(dx) === Math.abs(dy)) {
    return Math.abs(dx);
  } else {
    return 999; // Ignore if not matching X shape
  }
}

// Function to set up hover events
function setupHover() {
  boxes.forEach((box1) => {
    const cs1 = box1.querySelector('.cs');
    const x1 = parseInt(box1.dataset.x);
    const y1 = parseInt(box1.dataset.y);

    box1.addEventListener('mouseenter', () => {
      boxes.forEach((box2) => {
        const cs2 = box2.querySelector('.cs');
        const x2 = parseInt(box2.dataset.x);
        const y2 = parseInt(box2.dataset.y);

        const dist = distance(x1, y1, x2, y2);

        if (dist !== 999) {
          let scaleArr = [2, 1.5, 1, 0.5];
          let radiusArr = [5, 15, 25, 35];

          let scale = scaleArr[dist] || 0.4;
          let radius = radiusArr[dist] || 50;

          gsap.to(cs2, {
            scale: scale,
            borderRadius: `${radius}%`,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      });
    });

    container.addEventListener('mouseleave', () => {
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
}

// Create grid initially
createGrid();

// Recreate grid on resize
window.addEventListener('resize', createGrid);
