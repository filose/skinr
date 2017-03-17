import selectSkinr from './modules/selectSkinr';
import store from './store';

// TODO REMOVE
store.subscribe(() => {
  // Log any updates to the store
  console.log('Store: ', store.getState());
});

window.selectSkinr = selectSkinr;
