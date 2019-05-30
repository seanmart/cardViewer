export const state = () => ({
  activeCardId: null,
  hideHeader: false,
  onClose: []
});

export const mutations = {
  setHideHeader(state, x) {
    state.hideHeader = x;
  },
  setActiveCardId(state, x) {
    state.activeCardId = x;
  },
  setOnClose(state, action) {
    state.onClose.push(action);
  },
  clearOnClose(state) {
    state.onClose = [];
  }
};
