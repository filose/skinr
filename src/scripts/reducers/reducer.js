const elems = (state = {}, action) => {
  switch (action.type) {
    case 'OPEN_SSKNR':
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          ssknr: {
            ...state[action.id].ssknr,
            open: true,
          },
        },
      };
    case 'CLOSE_SSKNR':
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          ssknr: {
            ...state[action.id].ssknr,
            open: false,
          },
        },
      };
    default:
      return state;
  }
};

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_ELEMS':
      return {
        ...state,
        elems: action.elems,
      };
    case 'OPEN_SSKNR':
      return {
        ...state,
        elems: elems(state.elems, action),
      };
    case 'CLOSE_SSKNR':
      return {
        ...state,
        elems: elems(state.elems, action),
      };
    default:
      return state;
  }
};

export default reducer;
