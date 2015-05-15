# skinr
Small JavaScript plugin to help style `<select>` elements.

**N.B. _Not_ production-ready. WIP**

## Quick start

Include skinr.js before closing `<body>` tag and at at the very least include essential.css (style.css includes additional basic theme styles) inside the `<head>`. To run skinr call `skinr.select.init()`

`init()` method takes an optional selector parameter, so you can choose to only instantiate on elements with a class of `skin-me` by calling `skinr.select.init('.skin-me')`. Default behaviour is to target all `<select>` elements on the page.

## Notes

Currently presumes following element structure:

```html
<select>
  <option selected disabled>First option is placeholder/title</option>
  <option value="value1">Subsequent options must have 'value' attribute</option>
  <option value="value2">Option two</option>
  <option value="value3">Option three</option>
</select>
```

Still WIP. Please add any missing features to the issue log :)