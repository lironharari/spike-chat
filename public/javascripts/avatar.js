/**
 * Functions dealing with the avatar image
 * loadFile - loading a file from client and converting it to blob
 * createBlobImage - create a blob object from file reader
 * blobToImage - convert a blob to image
 * resizeImage - resizing the image for minimum size using canvas
 */

/**
 * Load an image file from the client
 * @param {DOM Event} event - input event of file upload
 */ 
const loadFile = (event) => {
  let reader = new FileReader(); 
  reader.readAsArrayBuffer(event.target.files[0]); // read file as array buffer
  reader.onload = () => { // when file has completed loading do the following
    createBlobImage(reader); // create a blob object from file reader
  };
};

/**
* Create a blob from file reader
* @param {FileReader} reader - file reader containing array buffer
*/ 
const createBlobImage = (reader) => {
let blob = new Blob([reader.result]); // create a blob object from file
window.URL = window.URL || window.webkitURL; // browser specific
let blobURL = window.URL.createObjectURL(blob); // create a readable blob url image
blobToImage(blobURL); // convert a blob to image
}

/**
* Create an image from blob
* @param {string} blobURL - url of blob
*/ 
const blobToImage = (blobURL) => {
let image = new Image(); // create an image object
image.src = blobURL; // load the blob image
image.onload = function() { // when file has completed loading do the following
  let resizedImage = resizeImage(image); // resize the image using canvas
  window.URL.revokeObjectURL(blobURL); // release blob from memory
  userAvatar = resizedImage; // update global avatar variable
}
}

/**
* Resize an image using canvas
* @param {Image} img - image file to resize
* @returns {string} - a resized image
*/ 
const resizeImage = (img) => {
let canvas = document.createElement("canvas"); // create canvas

// set sizes
let width = img.width;
let height = img.height;
let max_width = 200;
let max_height = 200;

// calculate the width and height
// constrain image proportions
if(width > height) {
  if (width > max_width) {
    height = Math.round(height *= max_width / width);
    width = max_width;
  }
} 
else {
  if (height > max_height) {
    width = Math.round(width *= max_height / height);
    height = max_height;
  }
}

// resize the canvas
canvas.width = width;
canvas.height = height;

// draw the image data into the canvas
let ctx = canvas.getContext("2d");
ctx.drawImage(img, 0, 0, width, height);

// get the data from canvas as 70% JPG
return canvas.toDataURL("image/jpeg",0.7);
};