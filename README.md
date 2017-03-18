# skinr
Minimal JavaScript plugin to help style `<select>` elements. Built with es6 and Redux.

**N.B. _Not_ production-ready.**

## Config

```javascript
{
  // Selector string that when set will instantiate plugin only on elements that match it.
  // Default behaviour is to target all <select> elements.
  selector: '.skin-me',
  // Boolean that indicates whether or not the first option in each option list is a title value
  // If true first option not included in the list of Skinr options.
  // Defaults to false.
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
