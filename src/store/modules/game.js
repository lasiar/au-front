import { getSessions, getHistory, guess } from "../../api/game";

const state = {
  sessions: [],
  history: []
};

const getters = {};

const actions = {
  // Получение всех сессий
  getAllSessions({ commit }) {
    return new Promise((resolve, reject) =>
      getSessions()
        .then(response => {
          commit("SET_SESSIONS", response);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        })
    );
  },

  // Получение завершенных сессий
  getCompletedSessions({ commit }) {
    return new Promise((resolve, reject) =>
      getSessions({ completed: false })
        .then(response => {
          commit("SET_SESSIONS", response);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        })
    );
  },

  /** Получение истории сессии, с отсотированной датой
   *
   * @param commit
   * @param id_session id необходимой сесии
   * @return {Promise<any>}
   */
  getHistory({ commit }, id_session) {
    return new Promise((resolve, reject) =>
      getHistory({ id_session: id_session })
        .then(response => {
          commit("SET_HISTORY", response);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        })
    );
  },

  /**
   * Отправление догадки пользователя на сервер
   * @param commit
   * @param data {{idSession: number, text: string}}
   * @return {Promise<any>}
   */
  guess({ dispatch }, data) {
    const { idSession, text } = data;
    return new Promise((resolve, reject) =>
      guess({ id_session: idSession, text: text })
        .then(response => {
          dispatch("addHistory", response);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        })
    );
  },

  /**
   * Добавляет значение в "историю"
   * @param commit {{id_session: number, date_time: string, input: string }}
   * @param history
   */
  addHistory({ commit }, history) {
    commit("PUSH_HISTORY", history);
  }
};

const mutations = {
  SET_SESSIONS: (state, sessions) => {
    state.sessions = sessions;
  },
  SET_HISTORY: (state, history) => {
    state.history = history;
  },
  PUSH_HISTORY: (state, history) => {
    state.history.push(history);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
