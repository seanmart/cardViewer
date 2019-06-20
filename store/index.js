export const state = () => ({
  activeCard: null
});

export const mutations = {
  setActiveCard(state, id) {
    state.activeCard = id;
  }
};
