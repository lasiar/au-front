import {
  getSessions,
  getHistory,
  guess,
  newSession,
  getLeaderboard
} from "../../api/game";

const state = {
  sessions: [],
  notCompleted: [],
  history: [],
  leaderboard: []
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

  // Получение не завершенных сессий
  getNoCompletedSessions({ commit }) {
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

  // Получение  завершенных сессий
  getCompletedSessions({ commit }) {
    return new Promise((resolve, reject) =>
      getSessions({ completed: true })
        .then(response => {
          commit("SET_NO_COMPLETED", response);
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
   * Создание новой игровой сесии
   * @param commit
   * @param data {{length: Number}} длина загоднного числа
   * @return {Promise<any>}
   */
  newSession({ commit }, data) {
    return new Promise((resolve, reject) => {
      newSession(data)
        .then(response => {
          commit("PUSH_SESSIONS", response);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  getLeaderboard({ commit }) {
    return new Promise((resolve, reject) => {
      getLeaderboard()
        .then(response => {
          commit("SET_LEADERBOARDS", response);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  /**
   * Добавляет значение в "историю"
   * @param commit
   * @param history {{id_session: number, date_time: string, input: string }}
   */
  addHistory({ commit }, history) {
    commit("PUSH_HISTORY", history);
  }
};

const mutations = {
  SET_SESSIONS: (state, sessions) => {
    state.sessions = sessions;
  },
  SET_NO_COMPLETED: (state, notCompleted) => {
    state.notCompleted = notCompleted;
  },
  PUSH_SESSIONS: (state, session) => {
    state.sessions.push(session);
  },
  SET_HISTORY: (state, history) => {
    state.history = history;
  },
  PUSH_HISTORY: (state, history) => {
    state.history.push(history);
  },
  SET_LEADERBOARDS: (state, leaderboards) => {
    state.leaderboard = leaderboards;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
