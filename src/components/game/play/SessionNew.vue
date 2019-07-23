<template>
  <v-layout align-center>
    <v-flex xs6 align-center>
      <v-text-field
        v-model="input"
        @update:error="errorHanding"
        :rules="[rules.required, rules.digitMask, rules.notZero]"
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
    isError: true,
    rules: rules
  }),
  computed: {
    disabled() {
      return this.isError;
    }
  },
  methods: {
    ...mapActions({
      newSession: "game/newSession"
    }),
    errorHanding(val) {
      this.isError = val;
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
