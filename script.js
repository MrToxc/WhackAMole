const images = [
  { key: 'A', element: document.getElementById('img1') },
  { key: 'S', element: document.getElementById('img2') },
  { key: 'D', element: document.getElementById('img3') },
  { key: 'F', element: document.getElementById('img4') },
  { key: 'G', element: document.getElementById('img5') },
];

let currentImage = null;
let score = 0;
let timeoutId = null;
let isKeyDisabled = false; // Prevents multiple keypresses during transition
let gameOver = false;

// Function to reset all images to neutral
function resetAllImages() {
  images.forEach(image => {
    image.element.src = "images/neutral.png";
  });
  currentImage = null;
}

// Function to highlight a random image after a short delay
function highlightRandomImage() {
  if(!gameOver) {
  if (score > 9) {
    victory();
  }
  else if (score < -9) {
    defeat();
  }
  else {
  resetAllImages(); // Reset all images to neutral first

  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    currentImage = images[randomIndex];
    currentImage.element.src = "images/active.png"; // Change to active image

    // Set a timeout to automatically reset the image after a delay
    timeoutId = setTimeout(() => {
      score--;
      document.getElementById('score').textContent = score;
      if(!gameOver) {
      resetAllImages();
      highlightRandomImage(); // Automatically show a new active image
      }
    }, 2000);
  }, 500); // Short delay before highlighting the next image
}
}}

function victory() {
  resetAllImages();
  document.getElementById('scoreComplete').textContent = "Victory";
  document.body.style.backgroundColor = "green";
  gameOver = true;
}

function defeat() {
  isKeyDisabled = true;
  images.forEach(image => {
    image.element.src = "images/active.png";
  });
  document.getElementById('scoreComplete').textContent = "Defeat";
  document.body.style.backgroundColor = "darkred";
  gameOver = true;
}


// Keydown event listener
document.addEventListener('keydown', (event) => {
  if (isKeyDisabled || !currentImage) return; // Ignore keypresses during transition or if no image is active

  if (event.key.toUpperCase() === currentImage.key) {
    score++;
    currentImage.element.src = "images/hit.png"; // Show hit image
    isKeyDisabled = true; // Disable further keypresses

    clearTimeout(timeoutId); // Clear the timeout for the current image

    // Wait for a short delay before resetting the hit image and moving to the next random highlight
    setTimeout(() => {
      resetAllImages(); // Reset all images to neutral
      isKeyDisabled = false; // Re-enable keypresses
      highlightRandomImage(); // Start the next round
    }, 500); // Display hit.png for 500ms
  } else {
    score--;
    if (score < -9) {
      defeat();
    }
  }
  document.getElementById('score').textContent = score;
});

// Start the game
highlightRandomImage();