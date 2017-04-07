import React from 'react';

const Ssknr = (props) => {
  const {
    rootId,
    option,
    elems,
    removeHighlightAllOptions,
    highlightOption,
    deselectAllOptions,
    selectOption,
  } = props;
  const handleHighlight = (e) => {
    e.preventDefault();
    removeHighlightAllOptions(rootId);
    highlightOption(rootId, option.index);
  };
  const handleSelect = (e) => {
    e.preventDefault();
    const highlightedOptionIndex = elems[rootId].options
      .findIndex(o => o.highlighted);
    removeHighlightAllOptions(rootId);
    deselectAllOptions(rootId);
    selectOption(rootId, highlightedOptionIndex);
  };
  const getOptionClass = () => {
    if (option.highlighted) {
      return ' c-ssknr__option--highlighted';
    } else if (option.selected) {
      return ' c-ssknr__option--selected';
    }
    return '';
  };
  const ssknrOptionHighlighted = option.highlighted ? ' c-ssknr__option--highlighted' : '';
  return (
    <li
      className={`c-ssknr__option${getOptionClass()}`}
      onMouseEnter={handleHighlight}
      onClick={handleSelect}
      value={option.value}
    >{option.text}</li>
  );
};

export default Ssknr;
