import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Ssknr from './components/Ssknr';
import Instance from './components/Instance';
import { getElems, closeSsknr } from './actions/actionCreators';
import buildElemsObj from './modules/buildElemsObj';

const selectSkinr = ({
  target = 'select',
  hasTitle = false,
} = {}) => {
  // Fire on load
  setTimeout(() => {
    // Build elems object
    const elemsObj = buildElemsObj(target, hasTitle);
    // Add elems to store
    store.dispatch(getElems(elemsObj));
    const state = store.getState();
    // Loop through elems
    for (const [id, elem] of Object.entries(state.elems)) {
      const $elem = document.getElementById(id);
      // Hide initial elements
      $elem.setAttribute('hidden', true);
      // Remove all options from intial elements
      $elem.options.length = 0;
      const $container = document.createElement('div');
      $elem.parentNode.insertBefore($container, $elem.nextSibling);
      render(
        (
          <Provider store={store}>
            <Instance id={id} />
          </Provider>
        ),
        $container,
      );
    }
    // Global event listeners
    document.addEventListener('click', (e) => {
      const currentState = store.getState();
      for (const [id, elem] of Object.entries(currentState.elems)) {
        if (elem.open) {
          const $parent = document.querySelector(`.js-ssknr[data-id="${id}"]`);
          if (!$parent.contains(e.target)) {
            store.dispatch(closeSsknr(id));
          }
        }
      }
    });
  });
};

window.selectSkinr = selectSkinr;
