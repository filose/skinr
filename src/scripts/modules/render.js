const updateDOM = (state) => {
  for (const [id, elem] of Object.entries(state.elems)) {
    const $elem = document.querySelector(`.js-ssknr[data-id="${id}"]`);
    if (elem.isOpen) {
      $elem.classList.add('c-ssknr--is-open');
    } else {
      $elem.classList.remove('c-ssknr--is-open');
    }
    for (const option of elem.options) {
      const $option = $elem.querySelector(`.js-ssknr-option[data-index="${option.index}"]`);
      if (option.highlighted) {
        $option.classList.add('c-ssknr__option--highlighted');
      } else if ($option.classList.contains('c-ssknr__option--highlighted')) {
        $option.classList.remove('c-ssknr__option--highlighted');
      }
    }
  }
};

export default updateDOM;
