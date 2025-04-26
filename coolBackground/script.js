const container = document.querySelector('.container');
const originalBox = document.getElementById('box');

const boxSize = 50;
originalBox.style.width = `${boxSize}px`;
originalBox.style.height = `${boxSize}px`;

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const columns = Math.floor(screenWidth / boxSize);
const rows = Math.floor(screenHeight / boxSize);

originalBox.remove();

for (let y = 0; y < rows; y++) {
  for (let x = 0; x < columns; x++) {
    const clone = originalBox.cloneNode(true);
    clone.style.position = 'absolute';
    clone.style.left = `${x * boxSize}px`;
    clone.style.top = `${y * boxSize}px`;
    container.appendChild(clone);

    const svg = clone.querySelector('svg');

    let startTime = 0;
    let rotationTween = null;

    clone.addEventListener('mouseenter', () => {
      startTime = Date.now();

      rotationTween = gsap.to(svg, {
        rotation: "+=360",
        duration: 1.5,
        repeat: -1,
        ease: "none",
      });
    });

    clone.addEventListener('mouseleave', () => {
      const elapsed = (Date.now() - startTime) / 1000; // in seconds
      const totalRotation = (elapsed / 1.5) * 360;

      if (rotationTween) {
        rotationTween.kill();
      }

      gsap.to(svg, {
        rotation: `-=${totalRotation}`,
        duration: 1,
        ease: "power2.out",
      });
    });
  }
}

