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

export function openSskinr() {
  return {
    type: 'OPEN_SSKINR',
  };
}
