<template>
  <v-card class="elevation-12">
    <v-card-text>
      <v-form>
        <v-text-field
          prepend-icon="person"
          name="login"
          label="Логин"
          type="text"
          v-model="name"
        ></v-text-field>
        <v-text-field
          prepend-icon="person"
          name="login"
          label="Имя"
          type="text"
          v-model="login"
        ></v-text-field>
        <v-text-field
          id="password"
          prepend-icon="lock"
          name="Пароль"
          label="Password"
          type="password"
          v-model="password"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="regHand">Зарегестрироваться</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Registration",
  data: () => ({
    name: "",
    login: "",
    password: ""
  }),
  methods: {
    ...mapActions({
      registration: "auth/registration"
    }),
    regHand() {
      this.registration({
        login: this.name,
        password: this.password,
        name: this.name
      });
    }
  }
};
</script>

<style scoped></style>
