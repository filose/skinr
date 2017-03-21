const updateDOM = (state) => {
  for (const [id, elem] of Object.entries(state.elems)) {
    const $elem = document.querySelector(`.js-ssknr[data-id="${id}"]`);
    // Open/close SelectSkinr
    if (elem.isOpen) {
      $elem.classList.add('c-ssknr--is-open');
    } else {
      $elem.classList.remove('c-ssknr--is-open');
    }
    for (const option of elem.options) {
      const $option = $elem.querySelector(`.js-ssknr-option[data-index="${option.index}"]`);
      // Highlight option
      if (option.highlighted) {
        $option.classList.add('c-ssknr__option--highlighted');
      } else if ($option.classList.contains('c-ssknr__option--highlighted')) {
        $option.classList.remove('c-ssknr__option--highlighted');
      }
      // Select option
      if (option.selected) {
        $option.classList.add('c-ssknr__option--selected');
        const $title = $elem.querySelector('.js-ssknr-title');
        $title.innerHTML = option.text;
      } else if ($option.classList.contains('c-ssknr__option--selected')) {
        $option.classList.remove('c-ssknr__option--selected');
      }
    }
  }
};

export default updateDOM;
