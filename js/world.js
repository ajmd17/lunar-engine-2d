function World() {
  this.entities = [];
  this.physicsWorld = new PhysicsWorld;
  this.physicsWorld.enableDebugRender = true;

  var self = this;
  setInterval(function () {
    self.physicsWorld.update();
  }, 50);
}

World.prototype = {
  addEntity: function (entity) {
    this.entities.push(entity);

    if (typeof entity.added === 'function') {
      entity.added(this);
    }
  },

  removeEntity: function (entity) {
    var index = this.entities.indexOf(entity);
    if (index != -1) {
      this.entities.splice(index, 1);
    }
    
    if (typeof entity.removed === 'function') {
      entity.removed(this);
    }
  },

  update: function () {
    for (var i = 0; i < this.entities.length; i++) {
      this.entities[i].update();
    }
  },

  render: function (canvas, context, camera) {
    for (var i = 0; i < this.entities.length; i++) {
      this.entities[i].render(canvas, context, camera);
    }

    if (this.physicsWorld.enableDebugRender) {
      this.physicsWorld.debugRender(canvas, context, camera);
    }
  }
};