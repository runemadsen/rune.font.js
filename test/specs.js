describe("Rune.Font", function() {

  var f;

  beforeEach(function() {
    f = new Rune.Font("test/HelveticaLT.ttf");
  });

  describe("constructor", function() {

    it("should set url", function() {
      expect(f.url).toEqual("test/HelveticaLT.ttf");
    });

  });

  describe("load()", function() {
    it("should load the font", function(done) {
      f.load(function(err) {
        expect(err).toBeNull();
        expect(f.font).not.toBeUndefined();
        done()
      });
    });
  });

  describe("getPath()", function() {

    it("should return font text as a path", function(done) {
      f.load(function(err) {
        var path = f.getPath("Rune", 0, 0, 100);
        console.log(path);
        done()
      });
    });

  });

});
