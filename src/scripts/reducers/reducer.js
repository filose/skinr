const options = (state = [], action) => {
  switch (action.type) {
    case 'HIGHLIGHT_OPTION': {
      const { index } = action;
      return state;
      // TODO FIX!
      // return [
      //   ...state.slice(0, index),
      //   {
      //     ...state[index],
      //     highlighted: true,
      //   },
      //   ...state.slice(index + 1),
      // ];
    }
    default:
      return state;
  }
};

const elems = (state = {}, action) => {
  switch (action.type) {
    case 'OPEN_SSKNR': {
      const { id } = action;
      return {
        ...state,
        [id]: {
          ...state[id],
          isOpen: true,
        },
      };
    }
    case 'CLOSE_SSKNR': {
      const { id } = action;
      return {
        ...state,
        [id]: {
          ...state[id],
          isOpen: false,
        },
      };
    }
    case 'HIGHLIGHT_OPTION': {
      const { rootId } = action;
      return {
        ...state,
        [rootId]: {
          ...state[rootId],
          options: options(state[rootId].options, action),
        },
      };
    }
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
    case 'HIGHLIGHT_OPTION':
      return {
        ...state,
        elems: elems(state.elems, action),
      };
    default:
      return state;
  }
};

export default reducer;
