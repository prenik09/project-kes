// Make the text element draggable.

$(document).ready(function() {
  $(function() { 
      $('#theDate').draggable({
          containment: 'parent'     // set draggable date area.
      }); 
      $('#theVenue').draggable({
          containment: 'parent'     // set draggable venue area.
      }); 
      $('#theDesc').draggable({
          containment: 'parent'     // set draggable description area.
      }); 
  });

});
// Select image and show it.
let chooseImage = () => {
  document.getElementById('file').click();
}

let showImage = (fl) => {
  if (fl.files.length > 0) {
      let reader  = new FileReader();

      reader.onload = function (e) {
          let img = new Image();
          
          img.onload = function () {
              if (this.width > screen.width || this.height > screen.height) {
                  alert('Please select a small image. The image width and height should be less than the screen width and height.');

                  document.getElementById('theDate').style.display = 'none';
                  document.getElementById('theVenue').style.display = 'none';
                  document.getElementById('theDesc').style.display = 'none';
                  document.getElementById('bt').style.display = 'none';
                  document.getElementById('date').style.display = 'none';
                  document.getElementById('myimage').src = '';
              }
              else {
                  document.getElementById('theDate').style.display = 'block';
                  document.getElementById('theVenue').style.display = 'block';
                  document.getElementById('theDesc').style.display = 'block';
                  document.getElementById('bt').style.display = 'block';
                  document.getElementById('date').style.display = 'block';
              }
          }

          img.src = e.target.result;      // actual image. 
          document.getElementById('myimage').src = reader.result;  // Add the image on the form.
      };
      reader.readAsDataURL(fl.files[0]);
  }
}

let dateContainer;
let venueContainer;
let descContainer;
let date = 'sample text';
let venue = 'sample text';
let desc = 'sample text';

// Get the values that you have entered in the textarea and
// write it in the DIV over the image.

let writeDate = (ele) => {
  date = ele.value;
  document.getElementById('theDate').innerHTML = date.replace(/\n\r/g, '<br />');
}
let writeVenue = (ele) => {
  venue = ele.value;
  document.getElementById('theVenue').innerHTML = venue.replace(/\n\r/g, '<br />');
}
let writeDesc = (ele) => {
  desc = ele.value;
  document.getElementById('theDesc').innerHTML = desc.replace(/\n\r/g, '<br />');
}

// Finally, save the image with text over it.
let saveImageWithText = () => {
  dateContainer = document.getElementById('theDate');     // The element with the text.
  venueContainer = document.getElementById('theVenue');     // The element with the text.
  descContainer = document.getElementById('theDesc');     // The element with the text.

  // Create an image object.
  let img = new Image();
  img.src = document.getElementById('myimage').src;
 
  // Create a canvas object.
  let canvas = document.createElement("canvas");
  
  // Wait till the image is loaded.
  img.onload = function(){
      drawImage();
      downloadImage(img.src.replace(/^.*[\\\/]/, ''));    // Download the processed image.
  }
  
  // Draw the image on the canvas.
  let drawImage = () => {
      let ctx = canvas.getContext("2d");	// Create canvas context.

      // Assign width and height.
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image.
      ctx.drawImage(img, 0, 0);

      [dateContainer, date] = overlapContent(dateContainer, date);
      [venueContainer, venue] = overlapContent(venueContainer, venue);
      [descContainer, desc] = overlapContent(descContainer, desc);

      function overlapContent (container, t) {

          container.style.border = 0;
          
          // Get the padding etc.
          let left = parseInt(window.getComputedStyle(container).left);
          let right = container.getBoundingClientRect().right;
          let top = parseInt(window.getComputedStyle(container).top, 0);
          let center = container.getBoundingClientRect().width / 2;
  
          let paddingTop = window.getComputedStyle(container).paddingTop.replace('px', '');
          let paddingLeft = window.getComputedStyle(container).paddingLeft.replace('px', '');
          let paddingRight = window.getComputedStyle(container).paddingRight.replace('px', '');
          
          // Get text alignement, colour and font of the text.
          let txtAlign = window.getComputedStyle(container).textAlign;
          let color = window.getComputedStyle(container).color;
          let fnt = window.getComputedStyle(container).font;
         
          // Assign text properties to the context.
          ctx.font = fnt;
          ctx.fillStyle = color;
          ctx.textAlign = txtAlign;
          
          // Now, we need the coordinates of the text.
          let x; 		// coordinate.
          if (txtAlign === 'right') {
              x = right + parseInt(paddingRight) - 11;
          }
          if (txtAlign === 'left') {
              x = left + parseInt(paddingLeft);
          }
          if (txtAlign === 'center') {
              x = center + left;
          }
  
          // Get the text (it can a word or a sentence) to write over the image.
          let str = t.replace(/\n\r?/g, '<br />').split('<br />');
  
          // finally, draw the text using Canvas fillText() method.
          for (let i = 0; i <= str.length - 1; i++) {
              
              ctx.fillText(
                  str[i]
                      .replace('</div>','')
                      .replace('<br>', '')
                      .replace(';',''), 
                  x, 
                  parseInt(paddingTop, 10) + parseInt(top, 10) + 10 + (i * 15));
          }

          return [container, t];
      }
      

      // document.body.append(canvas);  // Show the image with the text on the Canvas.

  }

  // Download the processed image.
  let downloadImage = (img_name) => {
      let a = document.createElement('a');
      a.href = canvas.toDataURL("image/png");
      a.download = img_name;
      document.body.appendChild(a);
      a.click();        
  }
}