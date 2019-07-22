<template>
  <v-layout>
    <v-flex xs6 align-center justify-end>
      <v-text-field
        v-model="input"
        @update:error="errorHanding"
        :rules="[rules.required, rules.digitMask]"
      >
      </v-text-field>
    </v-flex>
    <v-flex xs6>
      <v-btn @click="newSessionHanding" :disabled="disabled">
        Создать
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from "vuex";
import { rules } from "../../../utils/game";

export default {
  name: "SessionNew",
  data: () => ({
    input: "",
    error: true,
    rules: rules
  }),
  computed: {
    disabled() {
      return this.error;
    }
  },
  methods: {
    ...mapActions({
      newSession: "game/newSession"
    }),
    errorHanding(val) {
      this.error = val;
    },
    async newSessionHanding() {
      const session = await this.newSession({ length: parseInt(this.input) });
      this.$emit("newSession", session);
      this.input = "";
    }
  }
};
</script>

<style scoped></style>
