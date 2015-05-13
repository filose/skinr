# skinr
Small JavaScript plugin to help style `&lt;select>` elements

## Quick start

Include skinr.js before closing `&lt;select>` tag and then call `skinr.select.init()`

`init()` method takes an optional selector parameter, so you can choose to only instantiate on elements with a class of `skin-me` by calling `skinr.select.init('.skin-me')`. Default behaviour is to target all `&lt;select>` elements on the page.