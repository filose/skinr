const options = (state = [], action) => {
  switch (action.type) {
    case 'HIGHLIGHT_OPTION': {
      const { index } = action;
      const i = parseInt(index, 10);
      return [
        ...state.slice(0, i),
        {
          ...state[i],
          highlighted: true,
        },
        ...state.slice(i + 1),
      ];
    }
    case 'REMOVE_HIGHLIGHT_ALL_OPTIONS': {
      return state.map((option) => {
        return {
          ...option,
          highlighted: false,
        };
      });
    }
    case 'SELECT_HIGHLIGHTED_OPTION': {
      const { index } = action;
      const i = parseInt(index, 10);
      return [
        ...state.slice(0, i),
        {
          ...state[i],
          selected: true,
        },
        ...state.slice(i + 1),
      ];
    }
    case 'DESELECT_ALL_OPTIONS': {
      return state.map((option) => {
        return {
          ...option,
          selected: false,
        };
      });
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
          open: true,
        },
      };
    }
    case 'CLOSE_SSKNR': {
      const { id } = action;
      return {
        ...state,
        [id]: {
          ...state[id],
          open: false,
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
    case 'REMOVE_HIGHLIGHT_ALL_OPTIONS': {
      const { rootId } = action;
      return {
        ...state,
        [rootId]: {
          ...state[rootId],
          options: options(state[rootId].options, action),
        },
      };
    }
    case 'SELECT_HIGHLIGHTED_OPTION': {
      const { rootId } = action;
      return {
        ...state,
        [rootId]: {
          ...state[rootId],
          options: options(state[rootId].options, action),
        },
      };
    }
    case 'DESELECT_ALL_OPTIONS': {
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
    case 'REMOVE_HIGHLIGHT_ALL_OPTIONS':
      return {
        ...state,
        elems: elems(state.elems, action),
      };
    case 'SELECT_HIGHLIGHTED_OPTION':
      return {
        ...state,
        elems: elems(state.elems, action),
      };
    case 'DESELECT_ALL_OPTIONS':
      return {
        ...state,
        elems: elems(state.elems, action),
      };
    default:
      return state;
  }
};

export default reducer;
