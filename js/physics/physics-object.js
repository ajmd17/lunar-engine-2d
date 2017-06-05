function PhysicsObject(x, y, width, height, hasGravity) {
  if (typeof hasGravity === 'undefined') {
    hasGravity = true;
  }

  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.hasGravity = hasGravity;

  this.velocityX = 0;
  this.velocityY = 0;
}

PhysicsObject.prototype = {
  update: function (physicsWorld) {
    if (this.hasGravity) {
      this.velocityY += PhysicsWorld.GRAVITY;
    }

    this.x += this.velocityX;
    this.y += this.velocityY;
  },

  debugRender: function (canvas, context, camera) {
    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = 'limegreen';
    context.rect(this.x, this.y, this.width, this.height); 
    context.stroke();
  },

  collides: function (other) {
    if (other.x < this.x + this.width &&
        other.x + other.width > this.x &&
        other.y < this.y + this.height &&
        other.height + other.y > this.y) {
        return true;
    }
    return false;
  }
};