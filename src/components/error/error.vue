<template>
  <v-dialog v-model="info.show" width="500">
    <v-card>
      <v-alert :value="true" :type="info.type">
        <span style="color: black;"> {{ head }} </span>
      </v-alert>

      <v-card-text>
        {{ info.text }}
        <br />
        {{ info.subText }}
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" flat @click="close" @keydown.esc="close">
          Закрыть
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "main-error",
  computed: {
    ...mapState({
      info: state => state.info.info
    }),
    head() {
      return this.info.type === "error"
        ? "Ошибка!"
        : this.info.type === "info"
        ? "Иформация"
        : "Успешно!";
    }
  },
  methods: mapActions({
    close: "info/closeInfo"
  })
};
</script>

<style scoped></style>
