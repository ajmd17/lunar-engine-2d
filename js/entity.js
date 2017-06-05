function Entity(x, y, sprite, physicsObject) {
  this.x = x;
  this.y = y;
  this.sprite = sprite;
  this.physicsObject = physicsObject;
  this.children = [];
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

    for (var i = 0; i < this.children.length; i++) {
      if (typeof this.children[i].added === 'function') {
        this.children[i].added(world);
      }
    }
  },

  removed: function (world) {
    if (this.physicsObject != null) {
      world.physicsWorld.removePhysicsObject(this.physicsObject);
    }

    for (var i = 0; i < this.children.length; i++) {
      if (typeof this.children[i].removed === 'function') {
        this.children[i].removed(world);
      }
    }
  },

  update: function () {
    for (var i = 0; i < this.children.length; i++) {
      if (typeof this.children[i].update === 'function') {
        this.children[i].update();
      }
    }
  },

  render: function (canvas, context, camera, x, y) {
    if (this.sprite != null) {
      this.sprite.render(canvas, context, camera, x + this.getX(), y + this.getY(), this.props);
    }

    for (var i = 0; i < this.children.length; i++) {
      if (typeof this.children[i].render === 'function') {
        this.children[i].render(canvas, context, camera, x + this.getX(), y + this.getY());
      }
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
  },

  getWidth: function () {
    if (this.physicsObject != null) {
      return this.physicsObject.width;
    }
    if (this.sprite != null) {
      return this.sprite.width;
    }
    return null;
  },

  getHeight: function () {
    if (this.physicsObject != null) {
      return this.physicsObject.height;
    }
    if (this.sprite != null) {
      return this.sprite.height;
    }
    return null;
  },

  addChild: function (child) {
    this.children.push(child);
  }
  
};