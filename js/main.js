var game;

$(document).ready(function () {
  var $canvas = $('#main-canvas');
  var canvas = $canvas[0];
  var context = canvas.getContext('2d');

  game = new Game;
  game.fillColor = '#333';

  game.world.addEntity(new Player(0, 0));
  game.world.addEntity(new Player(10, 50));
  game.world.physicsWorld.addPhysicsObject(
    new PhysicsObject(
      0,
      450,
      500,
      25,
      false
    )
  );

  function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      game.render(canvas, context);
  }

  $(window).resize(resizeCanvas);
  resizeCanvas();

  var interval = setInterval(function () {
    //game.camera.position.x += 0.1;

    try {
      game.update();
      game.render(canvas, context);
    } catch (err) {
      console.error('Error: ', err);
      clearInterval(interval);
    }
  }, 30/1000);
});