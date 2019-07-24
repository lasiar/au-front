import { getToken, removeToken, setToken } from "../../utils/auth";
import {
  login,
  logout,
  getInfo,
  registration,
  getPermissions
} from "../../api/auth";
import { resetRouter } from "../../router";

/**
 * return user with roles name (code name) by permMask
 * @param user
 * @param roles
 */
function userWithRoles(user, roles) {
  return {
    ...user,
    roles: roles
      .filter(role => role.level <= user.permMask)
      .map(role => role.code_name)
  };
}
const state = {
  user: {
    id: 0,
    name: "",
    login: "",
    permMask: 0,
    token: getToken()
  },
  roles: []
};

const getters = {
  userWithRoles: state => {
    return userWithRoles(state.user, state.roles);
  }
};

const actions = {
  // Login user, get token
  login({ commit }, user) {
    const { loginName, password } = user;
    return new Promise((resolve, reject) =>
      login({ login: loginName, password: password })
        .then(response => {
          const { token } = response;
          commit("SET_USER_TOKEN", token);
          setToken(token);
          resolve();
        })
        .catch(error => {
          reject(error);
        })
    );
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          commit("SET_USER_TOKEN", "");
          commit("SET_USER_PERM_MASK", 0);
          removeToken();
          resetRouter();
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // get a list of all the roles
  getPermissions({ commit }) {
    return new Promise((resolve, reject) => {
      getPermissions()
        .then(response => {
          commit("SET_ROLES", response);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  //Registration
  registration({ commit, dispatch }, user) {
    const { name, login, password } = user;
    return new Promise((resolve, reject) =>
      registration({
        login: name,
        name: login,
        password: password
      })
        .then(response => {
          // server create user
          commit("SET_USER_ID", response.data);
          dispatch(
            "info/setInfo",
            { show: true, text: "Вы успешно зарегестрировались" },
            { root: true }
          );
          resolve();
        })
        .catch(error => {
          reject(error);
        })
    );
  },

  //get Info
  getInfo({ commit }) {
    return new Promise((resolve, reject) =>
      getInfo()
        .then(response => {
          const { id, name, login, perm_mask } = response;

          // if (!roles || roles !== 0) {
          //   reject("getInfo: roles must be a non-null array");
          // }

          commit("SET_USER_ID", id);
          commit("SET_USER_NAME", name);
          commit("SET_USER_LOGIN", login);
          commit("SET_USER_PERM_MASK", perm_mask);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        })
    );
  }
};

const mutations = {
  SET_USER_ID: (state, id) => {
    state.user.id = id;
  },
  SET_USER_NAME: (state, name) => {
    state.user.name = name;
  },
  SET_USER_LOGIN: (state, login) => {
    state.user.login = login;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_USER_PERM_MASK: (state, permMask) => {
    state.user.permMask = permMask;
  },
  SET_USER_TOKEN: (state, token) => {
    state.user.token = token;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
