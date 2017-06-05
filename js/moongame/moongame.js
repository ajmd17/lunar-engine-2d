function MoonGame(canvas, context) {
  return {
    game: null,

    /** Client record of the all players (including your player) */
    players: [],

    /** Items on map that can be picked up */
    pickupItems: [],

    run: function () {
      this.game = new Game();
      this.game.fillColor = '#333';

      this.initPlayer();
      this.initTestPlatform();
      this.initPickupItems();

      (function (game) {
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            game.render(canvas, context);
        }

        $(window).resize(resizeCanvas);
        resizeCanvas();

        var interval = setInterval(function () {
          try {
            game.update();
            game.render(canvas, context);
          } catch (err) {
            console.error('Error: ', err);
            clearInterval(interval);
          }
        }, 30/1000);
      })(this.game);
    },

    /** Initialize main player - YOU! */
    initPlayer: function () {
      var player = new Player(0, 0);
      this.players.push(player);

      this.game.world.addEntity(player);
    },

    initTestPlatform: function () {
      this.game.world.physicsWorld.addPhysicsObject(
        new PhysicsObject(
          0,
          450,
          500,
          25,
          false
        )
      );
    },

    initPickupItems: function () {
      var gun = new Entity(20, 250, new Sprite('img/player.png', 40, 40), null);
      this.game.world.addEntity(gun);
    }
  };
}

