export const state = () => ({
  activeCardId: null,
  hideHeader: false,
  onClose: [],
  cardHasBeenFlipped: {},
  wordCloudIsActive: false
});

export const mutations = {
  setHideHeader(state, x) {
    state.hideHeader = x;
  },
  setActiveCardId(state, x) {
    state.activeCardId = x;
  },
  setCardhasBeenFlipped(state, x) {
    if (!state.cardHasBeenFlipped[x]) {
      state.cardHasBeenFlipped = { ...state.cardHasBeenFlipped, [x]: true };
    }
  },
  setWordCloudIsActive(state, x) {
    state.wordCloudIsActive = x;
  },
  setOnClose(state, action) {
    state.onClose.push(action);
  },
  clearOnClose(state) {
    state.onClose = [];
  }
};
