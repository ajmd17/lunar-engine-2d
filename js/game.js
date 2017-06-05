function Game() {
  this.world = new World();
  this.camera = new Camera(0, 0);
  this.fillColor = '#000';
}

Game.prototype = {
  update: function () {
    this.world.update();
  },

  render: function (canvas, context) {
    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = this.fillColor;
    context.fill();

    this.camera.update(canvas, context);
    this.world.render(canvas, context, this.camera);
  }
};