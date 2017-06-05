function Player(x, y) {
  this.entity = new Entity(
    x,
    y,
    null,
    new PhysicsObject(x, y, 32, 64, true)
  );

  this.textNode = new TextNode('Player name here');

  this.frameCounter = 0;

  this.spriteParts = [
    new Sprite('img/player.png', 64, 64, 0, 0),
    new Sprite('img/player.png', 64, 64, 0, 64),
    new Sprite('img/player.png', 64, 64, 0, 128),
  ];
}

Player.NUM_FRAMES = 4;

Player.prototype = {
  added: function () {
    this.entity.added.apply(this.entity, arguments);
  },

  update: function () {
    this.entity.update.apply(this.entity, arguments);

    this.frameCounter += 0.03;
    if (this.frameCounter >= Player.NUM_FRAMES) {
      this.frameCounter = 0;
    }

    for (var i = 0; i < this.spriteParts.length; i++) {
      this.spriteParts[i].frameIndex = Math.floor(this.frameCounter);
    }
  },

  render: function (canvas, context, camera, x, y) {
    for (var i = 0; i < this.spriteParts.length; i++) {
      this.spriteParts[i].render(
        canvas,
        context,
        camera,
        x + this.entity.getX(),
        y + this.entity.getY() + (i * this.spriteParts[i].height)
      );
    }

    this.textNode.render(
      canvas,
      context,
      camera,
      x + this.entity.getX(),
      y + this.entity.getY()
    );
  }
};