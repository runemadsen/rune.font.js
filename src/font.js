import opentype from "opentype.js"
import Rune from "rune.js"

class Font {

  constructor(url) {
    this.url = url;
  }

  load(cb) {
    var that = this;
    opentype.load(this.url, function(err, font) {
      that.font = font;
      cb(err);
    });
  }

  getPath(text, x, y, fontSize, options) {

    if(!this.font) throw Error("You must use load() before generating font paths");

    var path = this.font.getPath(text, x, y, fontSize, options);

    // transform to Rune.Path

    return path;

  }

}

export default Font;