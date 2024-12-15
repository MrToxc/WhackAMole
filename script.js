const images = [
  { key: 'A', element: document.getElementById('img1') },
  { key: 'S', element: document.getElementById('img2') },
  { key: 'D', element: document.getElementById('img3') },
  { key: 'F', element: document.getElementById('img4') },
  { key: 'G', element: document.getElementById('img5') },
];

let currentImage = null;
let score = 0;

// Function to highlight a random image
function highlightRandomImage() {
  if (currentImage) {
    currentImage.element.classList.remove('active'); // Remove active state
    currentImage.element.src = "images/neutral.png"; // Reset to neutral image
  }

  const randomIndex = Math.floor(Math.random() * images.length);
  currentImage = images[randomIndex];
  currentImage.element.classList.add('active'); // Add active state
  currentImage.element.src = "images/active.png"; // Change to active image
}

// Keydown event listener
document.addEventListener('keydown', (event) => {
  if (!currentImage) return;

  if (event.key.toUpperCase() === currentImage.key) {
    score++;
  } else {
    score--;
  }

  document.getElementById('score').textContent = score;
  highlightRandomImage();
});

// Start the game
highlightRandomImage();
