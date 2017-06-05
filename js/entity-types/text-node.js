function TextNode(text) {
  this.text = text;
}

TextNode.prototype = {
  render: function (canvas, context, camera, x, y) {
    context.font = "18px monospace";
    context.fillStyle = "#fff";
    context.fillText(this.text, x, y);
  }
};