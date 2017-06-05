var EXPECTED_CANVAS_SIZE = {
  width: 1100,
  height: 580
};

function Camera() {
  this.position = {
    x: 0,
    y: 0
  };
  this.canvRatio = {
    x: 1,
    y: 1
  };
}

Camera.prototype = {
  update: function (canvas, context) {
    this.canvRatio.x = canvas.width / EXPECTED_CANVAS_SIZE.width;
    this.canvRatio.y = canvas.height / EXPECTED_CANVAS_SIZE.height;
  }
};