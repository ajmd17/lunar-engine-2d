function Sprite(imgurl, width, height, frameIndex, sliceY) {
  this.imgurl = imgurl;
  this.width = width;
  this.height = height;

  this.frameIndex = frameIndex || 0;
  this.sliceY = sliceY || 0;

  this.img = new Image;
  this.img.src = imgurl;
}

Sprite.prototype = {
  render: function (canvas, context, camera, x, y, options) {
    if (typeof options === 'undefined') {
      options = {};
    }

    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;
    
    context.drawImage(
      this.img,
      this.frameIndex * this.width,
      this.sliceY,
      this.width,
      this.height,
      (x + camera.position.x),
      (y + camera.position.y  - this.sliceY),
      this.width,
      this.height
    );
  }
};