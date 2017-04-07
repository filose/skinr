import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Ssknr from './Ssknr';

function mapStateToProps(state) {
  return {
    elems: state.elems,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const Instance = connect(mapStateToProps, mapDispatchToProps)(Ssknr);

export default Instance;
