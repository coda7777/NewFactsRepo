export default {
  namespaced: true,
  state: {
    isLoading: false,
  },
  mutations: {
    start(state) {
      state.isLoading = true;
    },
    stop(state) {
      state.isLoading = false;
    },
  },
  actions: {
    load(context, status) {
      if (status) {
        context.commit("start");
      } else {
        context.commit("stop");
      }
    },
  },
  getters: {
    loadStatus(state) {
      return state.isLoading;
    },
  },
};
