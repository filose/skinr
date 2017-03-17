import template from './template';
import store from '../store';
import { boundActionCreators } from '../events/listeners';

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
      $tempContainer.innerHTML = template(hasTitle, elem.options);
      const $sskinr = $tempContainer.firstChild.nextSibling;
      $elem.parentNode.insertBefore($sskinr, $elem.nextSibling);
    });
  });
};

export default selectSkinr;
