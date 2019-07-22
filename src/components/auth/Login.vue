<template>
  <v-card class="elevation-12">
    <v-card-text>
      <v-form>
        <v-text-field
          prepend-icon="person"
          name="login"
          label="Логин"
          type="text"
          v-model="loginName"
        ></v-text-field>
        <v-text-field
          id="password"
          prepend-icon="lock"
          name="Пароль"
          label="Пароль"
          type="password"
          v-model="password"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="handleLogin">Вход</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data: () => ({
    loginName: "",
    password: "",
    redirect: undefined,
    otherQuery: {}
  }),
  methods: {
    ...mapActions({
      login: "auth/login"
    }),
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
    async handleLogin() {
      await this.$store.dispatch("auth/login", {
        loginName: this.loginName,
        password: this.password
      });
      this.$router.push({ path: this.redirect || "/", query: this.otherQuery });
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  }
};
</script>

<style scoped></style>
