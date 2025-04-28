// Get references to the elements
const container = document.querySelector('.container');
const transparentBoxesList = document.getElementById('transparent-boxes');

// Number of boxes in the grid (28 rows * 8 columns)
const totalBoxes = 28 * 8;

// Array to track transparent box indexes
let transparentIndexes = [];

// Function to generate boxes in the grid
function generateBoxes() {
    for (let i = 0; i < totalBoxes; i++) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.dataset.index = i; // Add an index to each box for tracking
        box.addEventListener('click', handleBoxClick);
        container.appendChild(box);
    }
}

// Function to handle box clicks
function handleBoxClick(event) {
    const box = event.target;
    const index = parseInt(box.dataset.index);

    // Toggle the box color between transparent and black
    if (box.style.backgroundColor === 'black') {
        box.style.backgroundColor = 'transparent';
        // Remove the index from transparentBoxes if box is turned transparent
        transparentIndexes = transparentIndexes.filter(i => i !== index);
    } else {
        box.style.backgroundColor = 'black';
        // Add the index to transparentBoxes if box is turned black
        if (!transparentIndexes.includes(index)) {
            transparentIndexes.push(index);
        }
    }

    // Update the transparent boxes list
    transparentBoxesList.innerHTML = transparentIndexes.join(', ');
}

// Initialize the grid
generateBoxes();
