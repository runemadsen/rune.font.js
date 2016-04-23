# Rune.Font.js

A plugin that loads font files and converts them to Rune.Path objects.

## Using in the browser

First download the [latest release](https://github.com/runemadsen/rune.font.js/releases/latest). Then include the `rune.font.js` file after your `rune.js` file in your HTML file.

```html
<head>
  <script src="rune.js"></script>
  <script src="rune.font.js"></script>
</head>
```

## Using in node

`npm install rune.font.js`

Then require the `rune.font.js` module in your code, along with your `rune.js` module (if needed).

```js
var Rune = require('rune.js');
var Font = require('rune.font.js');
```

## Examples

Look at the [Typography section](http://printingcode.runemadsen.com/examples/#typography) in the Rune.js examples.

## Credits

Font parsing functionality provided by the awesome [opentype.js](https://github.com/nodebox/opentype.js).
