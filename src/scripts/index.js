import template from './modules/sSkinrTemplate';
import store from './store';
import { boundActionCreators, toggleSsknr, highlightOption, selectOption } from './modules/eventHandlers';
import updateDOM from './modules/render';

// TODO REMOVE
store.subscribe(() => {
  // Log any updates to the store
  console.log('Store: ', store.getState());
  const state = store.getState();
  setTimeout(() => {
    updateDOM(state);
  });
});

const selectSkinr = ({
  target = 'select',
  hasTitle = false,
} = {}) => {
  const $elems = document.querySelectorAll(target);
  // Fire on load
  setTimeout(() => {
    // Build elems object
    const elemsObj = [].reduce.call($elems, (obj, elem) => {
      let elemOptions = elem.options;
      if (hasTitle) {
        // Filter options to ignore first if it's a title option
        elemOptions = [].filter.call(elem.options, option => option.index !== 0);
      }
      obj[elem.id] = {
        id: elem.id,
        title: elem.options[0].text,
        options: [].map.call(elemOptions, (option) => {
          return {
            index: hasTitle ? option.index - 1 : option.index,
            text: option.text,
            value: option.value,
            highlighted: false,
            selected: false,
          };
        }),
        isOpen: false,
      };
      return obj;
    }, {});
    // Add elems to store
    boundActionCreators.getElems(elemsObj);
    const state = store.getState();
    for (const [id, elem] of Object.entries(state.elems)) {
      const $elem = document.getElementById(id);
      // Hide initial elements
      $elem.setAttribute('hidden', true);
      // Build and render selectSknrs
      const $tempContainer = document.createElement('div');
      $tempContainer.innerHTML = template(hasTitle, elem);
      const $ssknr = $tempContainer.firstElementChild;
      $elem.parentNode.insertBefore($ssknr, $elem.nextSibling);
      // Events
      $ssknr.addEventListener('click', toggleSsknr);
      for (const $ssknrOption of $ssknr.querySelectorAll('.js-ssknr-option')) {
        $ssknrOption.addEventListener('mouseenter', highlightOption);
        $ssknrOption.addEventListener('click', selectOption);
      }
    }
  });
};

window.selectSkinr = selectSkinr;
