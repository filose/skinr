// Polyfill for Element.closest() https://github.com/jonathantneal/closest
import closest from 'closest';
import { bindActionCreators } from 'redux';
import store from '../store';
import * as actionCreators from '../actions/actionCreators';

const boundActionCreators = bindActionCreators(actionCreators, store.dispatch);

export function toggleSsknr(e) {
  const state = store.getState();
  const $root = e.target.closest('.js-ssknr');
  const rootId = $root.dataset.id;
  if (state.elems[rootId].ssknr.open) {
    boundActionCreators.closeSsknr(rootId);
  } else {
    boundActionCreators.openSsknr(rootId);
  }
}

export { boundActionCreators };
