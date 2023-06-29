//your JS code here. If required.
// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to render the images in the container
function renderImages() {
  const imageContainer = document.getElementById('image-container');
  imageContainer.innerHTML = '';

  // List of image URLs
  const imageUrls = [
    'url1.jpg',
    'url2.jpg',
    'url3.jpg',
    'url4.jpg',
    'url5.jpg',
    'url5.jpg' // Repeat one of the images
  ];

  shuffleArray(imageUrls);

  for (let i = 1; i <= imageUrls.length; i++) {
    const image = document.createElement('img');
    image.src = imageUrls[i - 1];
    image.classList.add(`img${i}`);
    imageContainer.appendChild(image);
  }
}

// Function to handle tile clicks
function handleTileClick(event) {
  const clickedImage = event.target;

  // Check if the clicked image is already selected
  if (clickedImage.classList.contains('selected')) {
    return;
  }

  clickedImage.classList.add('selected');
  const selectedImages = document.querySelectorAll('.selected');

  // Show or hide the Verify button based on the number of selected images
  const verifyButton = document.getElementById('verify');
  if (selectedImages.length === 2) {
    verifyButton.style.display = 'block';
  } else {
    verifyButton.style.display = 'none';
  }

  // Check if two images are selected
  if (selectedImages.length === 2) {
    const imgClass1 = selectedImages[0].classList[0];
    const imgClass2 = selectedImages[1].classList[0];

    // Check if the selected images are identical
    if (imgClass1 === imgClass2) {
      const para = document.getElementById('para');
      para.textContent = 'You are a human. Congratulations!';
    } else {
      const para = document.getElementById('para');
      para.textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';
    }
  }
}

// Function to reset the game state
function resetGame() {
  const images = document.querySelectorAll('.selected');
  for (const image of images) {
    image.classList.remove('selected');
  }

  const resetButton = document.getElementById('reset');
  resetButton.style.display = 'none';

  const verifyButton = document.getElementById('verify');
  verifyButton.style.display = 'none';

  const para = document.getElementById('para');
  para.textContent = '';
}

// Event listener for tile clicks
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('img1') ||
    event.target.classList.contains('img2') ||
    event.target.classList.contains('img3') ||
    event.target.classList.contains('img4') ||
    event.target.classList.contains('img5')) {
    handleTileClick(event);
  }
});

// Event listener for the reset button
document.getElementById('reset').addEventListener('click', resetGame);

// Event listener for the verify button
document.getElementById('verify').addEventListener('click', function () {
  const verifyButton = document.getElementById('verify');
  verifyButton.style.display = 'none';
});

// Initial setup
renderImages();
