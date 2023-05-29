// Function to handle image preview
function previewImages() {
    const previewContainer = document.getElementById('imagePreview');
    const files = document.getElementById('imageUpload').files;
  
    previewContainer.innerHTML = ''; // Clear the existing preview
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
  
      reader.onload = function (e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        previewContainer.appendChild(img);
      };
  
      reader.readAsDataURL(file);
    }
  }
  
  // Attach the event listener to the file input
  document.getElementById('imageUpload').addEventListener('change', previewImages);