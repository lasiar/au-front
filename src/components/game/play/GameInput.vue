<template>
  <div>
    <v-layout align-center>
      <v-flex xs6>
        <v-text-field
          v-model="input"
          :rules="[rules.required, rules.digitMask]"
          :label="`Введите ${length}-значное число`"
          :counter="length"
          :maxlength="length"
          :error="error"
        ></v-text-field>
      </v-flex>
      <v-flex xs5>
        <v-btn :loading="loading" @click="sendGuess" depressed>
          Отгадать
          <v-icon right>mdi-content-save</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { rules } from "../../../utils/game";

export default {
  name: "GameInput",
  props: {
    length: {
      type: Number,
      default: 0,
      required: true
    }
  },
  data: () => ({
    error: false,
    loading: false,
    input: "",
    rules: rules
  }),
  methods: {
    sendGuess() {
      this.$emit("sendGuess", this.input);
      this.input = "";
      this.error = false;
    }
  }
};
</script>

<style scoped></style>
