# skinr
Small JavaScript plugin to help style `<select>` elements.

**N.B. _Not_ production-ready.**

## Quick start

Include skinr.js before closing `<body>` tag and at at the very least include essential.css (style.css includes additional basic theme styles) inside the `<head>`.

To run skinr call `skinr.init()`

`init()` method takes an optional config object parameter with the following properties:

```javascript
{
  // Selector string that when set will instantiate Skinr only on elements that match it.
  // Default behaviour is to target all <select> elements.
  selector: '.skin-me',
  // Boolean that indicates whether or not the first option in each select is a title value
  // If true first option not included in the list of Skinr options.
  // Default is false.
  titleOption: true
}
```

## Notes

Currently presumes following element structure:

```html
<select>
  <option selected disabled>First option can be placeholder/title</option>
  <option value="value1">Subsequent options must have 'value' attribute</option>
  <option value="value2">Option two</option>
  <option value="value3">Option three</option>
</select>
```

Still WIP. Please add any missing features to the issue log :)