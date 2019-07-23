import { getUsers, changeUser } from "../../api/admin";

const state = {
  users: []
};

const getters = {};

const actions = {
  getUsers({ commit }) {
    return new Promise((resolve, reject) => {
      getUsers()
        .then(response => {
          commit("SET_USERS", response);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  changeUser({ dispatch }, user) {
    return new Promise((resolve, reject) => {
      changeUser(user)
        .then(response => {
          dispatch(getUsers());
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

const mutations = {
  SET_USERS: (state, users) => {
    state.users = users;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
