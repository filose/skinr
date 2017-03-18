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
