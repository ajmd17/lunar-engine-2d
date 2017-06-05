function PhysicsWorld() {
  this.physicsObjects = [];
  this.enableDebugRender = false;
}

PhysicsWorld.GRAVITY = 2.5;

PhysicsWorld.prototype = {
  addPhysicsObject: function (physicsObject) {
    this.physicsObjects.push(physicsObject);
  },

  removePhysicsObject: function (physicsObject) {
    var index = this.physicsObjects.indexOf(physicsObject);
    if (index != -1) {
      this.physicsObjects.splice(index, 1);
    }
  },

  update: function () {
    var collision = false;
    var impactY = 0;

    for (var i = 0; i < this.physicsObjects.length; i++) {
      for (var j = i + 1; j < this.physicsObjects.length; j++) {
        if (this.physicsObjects[i].collides(this.physicsObjects[j])) {
          var velA = { x: this.physicsObjects[i].velocityX, y: this.physicsObjects[i].velocityY };
          var velB = { x: this.physicsObjects[j].velocityX, y: this.physicsObjects[j].velocityY };

          impactY = this.physicsObjects[i].velocityY - this.physicsObjects[j].velocityY;

          this.physicsObjects[i].velocityX = -velA.x;
          this.physicsObjects[i].velocityY = -velA.y;

          this.physicsObjects[j].velocityX = -velB.x;
          this.physicsObjects[j].velocityY = -velB.y;

          collision = true;
        } else {
          collision = false;
        }

        break;
      }

      if (!collision || impactY > 0) {
        this.physicsObjects[i].update(this);
      }
    }
  },

  debugRender: function (canvas, context, camera) {
    for (var i = 0; i < this.physicsObjects.length; i++) {
      this.physicsObjects[i].debugRender(canvas, context, camera);
    }
  }
};