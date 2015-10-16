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

  describe("toPath()", function() {

    it("should return font text as a path", function(done) {
      f.load(function(err) {
        var path = f.toPath("P", 0, 0, 100);
        expect(path.vars.anchors[0]).toBeAnchorMove(18.3, 0);
        expect(path.vars.anchors[1]).toBeAnchorLine(8.6, 0);
        expect(path.vars.anchors[2]).toBeAnchorLine(8.6, -71.8);
        expect(path.vars.anchors[3]).toBeAnchorLine(40.900000000000006, -71.8);
        expect(path.vars.anchors[4]).toBeAnchorQuad(45.900000000000006, -71.8, 49.85, -70.25);
        expect(path.vars.anchors[5]).toBeAnchorQuad(53.800000000000004, -68.7, 56.550000000000004, -66);
        expect(path.vars.anchors[6]).toBeAnchorQuad(59.300000000000004, -63.300000000000004, 60.75, -59.6);
        expect(path.vars.anchors[7]).toBeAnchorQuad(62.2, -55.900000000000006, 62.2, -51.6);
        expect(path.vars.anchors[8]).toBeAnchorQuad(62.2, -47.800000000000004, 61.050000000000004, -44.050000000000004);
        expect(path.vars.anchors[9]).toBeAnchorQuad(59.900000000000006, -40.300000000000004, 57.400000000000006, -37.2);
        expect(path.vars.anchors[10]).toBeAnchorQuad(54.900000000000006, -34.1, 50.800000000000004, -32.2);
        expect(path.vars.anchors[11]).toBeAnchorQuad(46.7, -30.3, 40.900000000000006, -30.3);
        expect(path.vars.anchors[12]).toBeAnchorLine(18.3, -30.3);
        expect(path.vars.anchors[13]).toBeAnchorLine(18.3, 0);
        expect(path.vars.anchors[14]).toBeAnchorMove(18.3, -38.6);
        expect(path.vars.anchors[15]).toBeAnchorLine(37.6, -38.6);
        expect(path.vars.anchors[16]).toBeAnchorQuad(40.900000000000006, -38.6, 43.550000000000004, -39.25)
        expect(path.vars.anchors[17]).toBeAnchorQuad(46.2,-39.900000000000006,48.150000000000006,-41.400000000000006);
        expect(path.vars.anchors[18]).toBeAnchorQuad(50.1,-42.900000000000006,51.150000000000006,-45.400000000000006);
        expect(path.vars.anchors[19]).toBeAnchorQuad(52.2, -47.900000000000006, 52.2, -51.5);
        expect(path.vars.anchors[20]).toBeAnchorQuad(52.2, -54.900000000000006, 51.1, -57.2);
        expect(path.vars.anchors[21]).toBeAnchorQuad(50, -59.5, 48.1, -60.900000000000006);
        expect(path.vars.anchors[22]).toBeAnchorQuad(46.2,-62.300000000000004,43.6,-62.900000000000006);
        expect(path.vars.anchors[23]).toBeAnchorQuad(41, -63.5, 38, -63.5);
        expect(path.vars.anchors[24]).toBeAnchorLine(18.3, -63.5);
        expect(path.vars.anchors[25]).toBeAnchorLine(18.3, -38.6);
        expect(path.vars.anchors[26]).toBeAnchorClose();
        done()
      });
    });

  });

  describe("Integration with scene graph", function() {

    it("renders font to SVG", function(done) {
      var r = new Rune();
      f.load(function(err) {
        var path = f.toPath("P", 0, 0, 100)
          .fill(255, 0, 0);
        r.stage.add(path);
        r.draw();
        expect(r.getEl().toString()).toEqual('<svg width="640" height="480"><path d="M 18.3 0 L 8.6 0 L 8.6 -71.8 L 40.900000000000006 -71.8 Q 45.900000000000006 -71.8 49.85 -70.25 Q 53.800000000000004 -68.7 56.550000000000004 -66 Q 59.300000000000004 -63.300000000000004 60.75 -59.6 Q 62.2 -55.900000000000006 62.2 -51.6 Q 62.2 -47.800000000000004 61.050000000000004 -44.050000000000004 Q 59.900000000000006 -40.300000000000004 57.400000000000006 -37.2 Q 54.900000000000006 -34.1 50.800000000000004 -32.2 Q 46.7 -30.3 40.900000000000006 -30.3 L 18.3 -30.3 L 18.3 0 M 18.3 -38.6 L 37.6 -38.6 Q 40.900000000000006 -38.6 43.550000000000004 -39.25 Q 46.2 -39.900000000000006 48.150000000000006 -41.400000000000006 Q 50.1 -42.900000000000006 51.150000000000006 -45.400000000000006 Q 52.2 -47.900000000000006 52.2 -51.5 Q 52.2 -54.900000000000006 51.1 -57.2 Q 50 -59.5 48.1 -60.900000000000006 Q 46.2 -62.300000000000004 43.6 -62.900000000000006 Q 41 -63.5 38 -63.5 L 18.3 -63.5 L 18.3 -38.6 Z" fill="rgb(255, 0, 0)" stroke="rgb(0, 0, 0)"></path></svg>');
        done();
      });
    });

  });

});
