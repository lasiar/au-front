<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" clipped fixed app v-if="hasRoles">
      <v-list dense>
        <v-list-tile
          route
          v-for="item in routesData"
          :key="item.path"
          :to="item.path"
          avatar
        >
          <v-list-tile-content>
            <v-list-tile-title v-text="item.meta.title"> </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar clipped-left fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>AU.RU </span>
        <span class="font-weight-light">Коровы и быки</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <button @click="logout" v-if="hasRoles">Выход</button>
    </v-toolbar>
    <v-content>
      <transition name="slide">
        <transition name="page" mode="out-in">
          <router-view transition="fade-transition"></router-view>
        </transition>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",
  data() {
    return {
      drawer: null
    };
  },
  computed: {
    ...mapState({
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
