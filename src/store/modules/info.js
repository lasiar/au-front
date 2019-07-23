const state = {
  info: {
    text: "",
    subText: "",
    show: false,
    type: "info" // Error prop on info.vue
  }
};

const getters = {};

const actions = {
  setInfo({ commit }, info) {
    commit("SET_INFO", info);
  },
  setSuccess({ commit }, info) {
    commit("SET_SUCCESS", info);
  },
  setError({ commit }, info) {
    commit("SET_ERROR", info);
  },
  closeInfo({ commit }) {
    commit("CLEAR");
  }
};

const mutations = {
  SET_ERROR: (state, error) => {
    error.type = "error";
    state.info = error;
  },
  SET_INFO: (state, info) => {
    info.type = "info";
    state.info = info;
  },
  SET_SUCCESS: (state, info) => {
    info.type = "success";
    state.info = info;
  },
  CLEAR(state) {
    state.info.text = "";
    state.type = "";
    state.info.show = false;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
