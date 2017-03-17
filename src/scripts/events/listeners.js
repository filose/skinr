import { bindActionCreators } from 'redux';
import store from '../store';
import * as actionCreators from '../actions/actionCreators';

const boundActionCreators = bindActionCreators(actionCreators, store.dispatch);

export function toggleInput() {
  console.log('blah');
}

export function somethingElse() {
  console.log('blah');
}

export { boundActionCreators };
