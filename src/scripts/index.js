import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Ssknr from './components/Ssknr';
import Instance from './components/Instance';
import { getElems } from './actions/actionCreators';
import buildElemsObj from './modules/buildElemsObj';

// TODO REMOVE
store.subscribe(() => {
  // Log any updates to the store
  console.log('Store: ', store.getState());
});

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
  });
};

window.selectSkinr = selectSkinr;
