function Entity(x, y, sprite, physicsObject) {
  this.x = x;
  this.y = y;
  this.sprite = sprite;
  this.physicsObject = physicsObject;
  this.props = {};
}

Entity.makePhysicalEntity = function (sprite, x, y, width, height) {
  return new Entity(x, y, sprite, new PhysicsObject(
    x, y, width, height
  ));
};

Entity.prototype = {
  added: function (world) {
    if (this.physicsObject != null) {
      world.physicsWorld.addPhysicsObject(this.physicsObject);
    }
  },

  removed: function (world) {
    if (this.physicsObject != null) {
      world.physicsWorld.removePhysicsObject(this.physicsObject);
    }
  },

  update: function () {
  },

  render: function (canvas, context, camera) {
    if (this.sprite != null) {
      this.sprite.render(canvas, context, camera, this.getX(), this.getY(), this.props);
    }
  },

  getX: function () {
    if (this.physicsObject != null) {
      return this.physicsObject.x;
    }
    return this.x;
  },
  
  getY: function () {
    if (this.physicsObject != null) {
      return this.physicsObject.y;
    }
    return this.y;
  }
  
};