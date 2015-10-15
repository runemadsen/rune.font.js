describe("Rune.Font", function() {

  describe("constructor", function() {

    it("should set url", function() {
      var f = new Rune.Font("arial.ttf");
      expect(f.url).toEqual("arial.ttf");
    });

  });

});
