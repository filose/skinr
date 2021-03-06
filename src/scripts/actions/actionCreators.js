export function getElems(elems) {
  return {
    type: 'GET_ELEMS',
    elems,
  };
}

export function getElemWidth(id, width) {
  return {
    type: 'GET_ELEM_WIDTH',
    id,
    width,
  };
}

export function openSsknr(id) {
  return {
    type: 'OPEN_SSKNR',
    id,
  };
}

export function closeSsknr(id) {
  return {
    type: 'CLOSE_SSKNR',
    id,
  };
}

export function highlightOption(rootId, index) {
  return {
    type: 'HIGHLIGHT_OPTION',
    rootId,
    index,
  };
}

export function removeHighlightAllOptions(rootId) {
  return {
    type: 'REMOVE_HIGHLIGHT_ALL_OPTIONS',
    rootId,
  };
}

export function selectOption(rootId, index) {
  return {
    type: 'SELECT_HIGHLIGHTED_OPTION',
    rootId,
    index,
  };
}

export function deselectAllOptions(rootId, index) {
  return {
    type: 'DESELECT_ALL_OPTIONS',
    rootId,
  };
}
