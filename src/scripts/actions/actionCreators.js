export function getElems(elems) {
  return {
    type: 'GET_ELEMS',
    elems,
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
    type: 'REMOVE_HIGHLIGHTS_ALL_OPTIONS',
    rootId,
  };
}
