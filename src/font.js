var opentype = require("opentype.js");
var Rune = require("rune.js");

var Font = function(url) {
  this.url = url;
}

Font.prototype = {

  load: function(cb) {
    var that = this;
    opentype.load(this.url, function(err, font) {
      that.font = font;
      cb(err);
    });
  },

  toPath: function(text, x, y, fontSize, options) {

    if(!this.font) throw Error("You must use load() before generating font paths");

    var before = this.font.getPath(text, 0, 0, fontSize, options);
    var after = new Rune.Path(x, y);

    for(var i = 0; i < before.commands.length; i++) {

      var cmd = before.commands[i];

      if(cmd.type == 'M')
        after.moveTo(cmd.x, cmd.y);
      else if(cmd.type == 'L')
        after.lineTo(cmd.x, cmd.y);
      else if(cmd.type == 'Q' && typeof cmd.x2 === 'undefined')
        after.curveTo(cmd.x1, cmd.y1, cmd.x, cmd.y);
      else if(cmd.type == 'Q')
        after.curveTo(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
      else if(cmd.type == 'Z')
        after.closePath();
    }

    return after;

  }

}

module.exports = Font;
