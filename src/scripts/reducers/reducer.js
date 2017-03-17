const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'TEST':
      return state;
    case 'GET_ELEMS':
      return {
        ...state,
        elems: action.elems,
      };
    case 'OPEN_SSKINR':
      console.log(action);
      return state;
    default:
      return state;
  }
};

export default reducer;
