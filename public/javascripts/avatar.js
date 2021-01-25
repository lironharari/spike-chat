const loadFile = (event) => {
    let reader = new FileReader();
    reader.readAsArrayBuffer(event.target.files[0]);
    reader.onload = () => {
      let blob = new Blob([reader.result]);
      window.URL = window.URL || window.webkitURL;
      let blobURL = window.URL.createObjectURL(blob);
      let image = new Image();
      image.src = blobURL;
      image.onload = function() {
        let resizedImage = resizeImage(image);
        window.URL.revokeObjectURL(blobURL);
        avatarImage = resizedImage;
      }
    }; 
};

const resizeImage = (img) => {
  let canvas = document.createElement("canvas");
  let width = img.width;
  let height = img.height;
  let max_width = 200;
  let max_height = 200;
  
  // calculate the width and height, constraining the proportions
  if(width > height){
    if (width > max_width){
      height = Math.round(height *= max_width / width);
      width = max_width;
    }
  } 
  else{
    if (height > max_height){
      width = Math.round(width *= max_height / height);
      height = max_height;
    }
  }
  
  // resize the canvas and draw the image data into it
  canvas.width = width;
  canvas.height = height;
  let ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, width, height);
  
  // get the data from canvas as 70% JPG
  return canvas.toDataURL("image/jpeg",0.7);
};