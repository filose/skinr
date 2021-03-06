// Polyfill for Element.closest() https://github.com/jonathantneal/closest
import closest from 'closest';
import { bindActionCreators } from 'redux';
import store from '../store';
import * as actionCreators from '../actions/actionCreators';

const boundActionCreators = bindActionCreators(actionCreators, store.dispatch);

const getRootId = (state, target) => {
  const $root = target.closest('.js-ssknr');
  return $root.dataset.id;
};

export function toggleSsknr(e) {
  const state = store.getState();
  const rootId = getRootId(state, e.target);
  if (state.elems[rootId].isOpen) {
    boundActionCreators.closeSsknr(rootId);
  } else {
    boundActionCreators.openSsknr(rootId);
  }
}

export function highlightOption(e) {
  const state = store.getState();
  const rootId = getRootId(state, e.target);
  const optionIndex = e.target.dataset.index;
  boundActionCreators.removeHighlightAllOptions(rootId);
  boundActionCreators.highlightOption(rootId, optionIndex);
}

export function selectOption(e) {
  const state = store.getState();
  const rootId = getRootId(state, e.target);
  const highlightedOptionIndex = state.elems[rootId].options
    .findIndex(option => option.highlighted);
  boundActionCreators.removeHighlightAllOptions(rootId);
  boundActionCreators.deselectAllOptions(rootId);
  boundActionCreators.selectOption(rootId, highlightedOptionIndex);
}

export { boundActionCreators };
