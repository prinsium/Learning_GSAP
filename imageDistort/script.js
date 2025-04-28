document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('container');
  const image = container.querySelector('img');
  const imageWidth = image.width;
  const imageHeight = image.height;

  // Number of squares per row and column
  const rows = 50;
  const columns = 25;

  // Create the tiny square divs and append them to the container
  for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
          const square = document.createElement('div');
          square.classList.add('square');

          // Set the position of each square based on its row and column
          square.style.top = `${(row / rows) * 100}%`;
          square.style.left = `${(col / columns) * 100}%`;

          container.appendChild(square);
      }
  }

  // Hover effect: Scatter squares
  container.addEventListener('mouseenter', function() {
      const squares = document.querySelectorAll('.square');
      squares.forEach(square => {
          const randomX = Math.random() * 200 - 100; // Random X position
          const randomY = Math.random() * 200 - 100; // Random Y position
          square.style.transform = `translate(${randomX}px, ${randomY}px)`;
      });
  });

  // On hover out: Reset squares to their original position
  container.addEventListener('mouseleave', function() {
      const squares = document.querySelectorAll('.square');
      squares.forEach(square => {
          square.style.transform = 'translate(0, 0)';
      });
  });
});
