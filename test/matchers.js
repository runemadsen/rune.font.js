beforeEach(function () {

  jasmine.addMatchers({

    toBeAnchorMove: function () {
      return {
        compare: function (vector, x, y) {

          var a = new Rune.Anchor();
          a.command = 'move';
          a.vec1 = new Rune.Vector(x, y);

          var msg = "";
          var pass = vector.command == a.command;
          pass = pass && vector.vec1.x == a.vec1.x;
          pass = pass && vector.vec1.y == a.vec1.y;
          pass = pass && _.isUndefined(vector.vec2);
          pass = pass && _.isUndefined(vector.vec3);

          if (pass) {
            msg = "Expected not to match";
          } else {
            msg = "Expected " + JSON.stringify(vector) + " to match " + JSON.stringify(a);
          }

          return {
            pass: pass,
            message: msg
          };
        }
      };
    },

    toBeAnchorLine: function () {
      return {
        compare: function (vector, x, y) {

          var a = new Rune.Anchor();
          a.command = 'line';
          a.vec1 = new Rune.Vector(x, y);

          var msg = "";
          var pass = vector.command == a.command;
          pass = pass && vector.vec1.x == a.vec1.x;
          pass = pass && vector.vec1.y == a.vec1.y;
          pass = pass && _.isUndefined(vector.vec2);
          pass = pass && _.isUndefined(vector.vec3);

          if (pass) {
            msg = "Expected not to match";
          } else {
            msg = "Expected " + JSON.stringify(vector) + " to match " + JSON.stringify(a);
          }

          return {
            pass: pass,
            message: msg
          };
        }
      };
    },

    toBeAnchorCubic: function () {
      return {
        compare: function (anchor, a, b, c, d, e, f) {
          var expected = new Rune.Anchor();
          expected.command = 'cubic';
          expected.vec1 = new Rune.Vector(a, b);
          expected.vec2 = new Rune.Vector(c, d);
          expected.vec3 = new Rune.Vector(e, f)
          return {
            pass: _.isEqual(anchor, expected),
            message: "Actual: " + JSON.stringify(anchor) + ", expected: " + JSON.stringify(expected)
          };
        }
      };
    },

    toBeAnchorQuad: function () {
      return {
        compare: function (anchor, a, b, c, d) {
          var expected = new Rune.Anchor();
          expected.command = 'quad';
          expected.vec1 = new Rune.Vector(a, b);
          expected.vec2 = new Rune.Vector(c, d);
          return {
            pass: _.isEqual(anchor, expected),
            message: "Actual: " + JSON.stringify(anchor) + ", expected: " + JSON.stringify(expected)
          }
        }
      };
    },

    toBeAnchorClose: function () {
      return {
        compare: function (vector) {

          var msg = "";
          var pass = vector.command == 'close';

          if (pass) {
            msg = "Expected not to match";
          } else {
            msg = "Expected to match";
          }

          return {
            pass: pass,
            message: msg
          };
        }
      };
    }
  });

});