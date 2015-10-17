# Rune.Font.js

A plugin that loads font files and converts them to Rune.Path objects.

## Using in the browser

Simply include the `font.browser.js` file after your `rune.browser.js` file in your HTML file. You can download the latest release on [Github](#).

```html
<head>
  <script src="rune.browser.js"></script>
  <script src="font.browser.js"></script>
</head>
```

## Using in node

Simply include the `rune.font.js` module in your code, along with your `rune.js` module.

```js
var Rune = require('rune.js');
var Font = require('rune.font.js');
```

## Credits

Font parsing functionality provided by the awesome [opentype.js](https://github.com/nodebox/opentype.js).