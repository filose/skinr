export function test() {
  return {
    type: 'TEST',
  };
}

export function getElems(elems) {
  return {
    type: 'GET_ELEMS',
    elems,
  };
}

export function openSskinr(data) {
  return {
    type: 'OPEN_SSKINR',
    data,
  };
}
