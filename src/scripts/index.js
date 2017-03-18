import template from './modules/sSkinrTemplate';
import store from './store';
import { boundActionCreators, toggleSsknr } from './events/listeners';

// TODO REMOVE
store.subscribe(() => {
  // Log any updates to the store
  console.log('Store: ', store.getState());
  // TODO refactor to separate module and clean up, currently just proof of concept
  const state = store.getState();
  if (state.elems) {
    for (const [id, elem] of Object.entries(state.elems)) {
      setTimeout(() => {
        const $elem = document.querySelector(`.js-ssknr[data-id="${id}"]`);
        if (elem.ssknr.open) {
          $elem.classList.add('c-ssknr--is-open');
        } else {
          $elem.classList.remove('c-ssknr--is-open');
        }
      });
    }
  }
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
      obj[elem.id] = {
        id: elem.id,
        options: [].map.call(elem.options, (option) => {
          return {
            index: option.index,
            text: option.text,
            value: option.value,
          };
        }),
        ssknr: {
          open: false,
        },
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
    }
  });
};

window.selectSkinr = selectSkinr;
