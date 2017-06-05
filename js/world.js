function World() {
  this.rootNode = new Entity(0, 0, null, null);
  this.physicsWorld = new PhysicsWorld;
  this.physicsWorld.enableDebugRender = true;

  var self = this;
  setInterval(function () {
    self.physicsWorld.update();
  }, 50);
}

World.prototype = {
  addEntity: function (entity) {
    this.rootNode.addChild(entity);
    if (typeof entity.added === 'function') {
      entity.added(this);
    }
  },

  removeEntity: function (entity) {
    var index = this.rootNode.children.indexOf(entity);
    if (index != -1) {
      this.rootNode.children.splice(index, 1);
    }
    
    if (typeof entity.removed === 'function') {
      entity.removed(this);
    }
  },

  update: function () {
    this.rootNode.update();
  },

  render: function (canvas, context, camera) {
    this.rootNode.render(canvas, context, camera, 0, 0);

    if (this.physicsWorld.enableDebugRender) {
      this.physicsWorld.debugRender(canvas, context, camera);
    }
  }
};