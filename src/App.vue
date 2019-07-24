<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" clipped fixed app v-if="hasRoles">
      <v-list dense>
        <v-list-item
          route
          v-for="item in routesData"
          :key="item.path"
          :to="item.path"
          avatar
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.meta.title"> </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="indigo" dark app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer">
        <v-icon>menu</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>AU.RU </span>
        <span class="font-weight-light">Коровы и быки</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="mr-1">
        {{ user.name }}
      </div>
      <button @click="logout" v-if="hasRoles">Выход</button>
    </v-app-bar>
    <v-content>
      <transition name="slide">
        <transition name="page" mode="out-in">
          <router-view transition="fade-transition"></router-view>
        </transition>
      </transition>
    </v-content>
    <main-error></main-error>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import MainError from "./components/error/error";

export default {
  name: "App",
  components: { MainError },
  data() {
    return {
      drawer: null
    };
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
      routes: state =>
        state.permission.routes.filter(
          route => route.meta.title && route.hidden !== true
        )
    }),
    routesData() {
      return this.routes;
    },
    hasRoles() {
      return (
        this.$store.getters["auth/userWithRoles"].roles &&
        this.$store.getters["auth/userWithRoles"].roles.length > 0
      );
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.15s, transform 0.15s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
</style>
