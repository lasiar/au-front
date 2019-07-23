import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import permission from "./modules/permision";
import getters from "./getters";
import admin from "./modules/admin";
import game from "./modules/game";
import info from "./modules/info";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    permission,
    admin,
    getters,
    game,
    info
  }
});
