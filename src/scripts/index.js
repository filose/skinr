// Polyfill for Element.closest() https://github.com/jonathantneal/closest
import closest from 'closest';
import template from './modules/sSkinrTemplate';
import store from './store';
import { boundActionCreators } from './events/listeners';

// TODO REMOVE
store.subscribe(() => {
  // Log any updates to the store
  console.log('Store: ', store.getState());
});

document.getElementById('btn').addEventListener('click', (e) => {
  boundActionCreators.test();
});

const selectSkinr = ({
  target = 'select',
  hasTitle = false,
} = {}) => {
  const elems = document.querySelectorAll(target);
  // Fire on load
  setTimeout(() => {
    // Add all target elements to store as array
    boundActionCreators.getElems([].slice.call(elems));
    const state = store.getState();
    state.elems.forEach((elem) => {
      const $elem = document.getElementById(elem.id);
      // Hide initial elements
      $elem.setAttribute('hidden', true);
      // Add selectSkinrs
      const $tempContainer = document.createElement('div');
      $tempContainer.innerHTML = template(hasTitle, elem);
      const $sskinr = $tempContainer.firstElementChild;
      $elem.parentNode.insertBefore($sskinr, $elem.nextSibling);
      // Events
      $sskinr.addEventListener('click', (e) => {
        // TODO
        // 1. Convert elems state array to object with id props
        const $root = e.target.closest('.js-ssknr');
      });
    });
  });
};

window.selectSkinr = selectSkinr;
