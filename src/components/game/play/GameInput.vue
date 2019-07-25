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
          @update:error="errorHanding"
        ></v-text-field>
      </v-flex>
      <v-flex xs5>
        <v-btn
          :disabled="isError"
          class="elevation-3"
          :loading="loading"
          @click="sendGuess"
          depressed
        >
          Отгадать
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
    error: true,
    isError: true,
    loading: false,
    input: "",
    rules: rules
  }),
  methods: {
    sendGuess() {
      this.$emit("sendGuess", this.input);
      this.input = "";
    },
    errorHanding(error) {
      this.isError = error;
    }
  }
};
</script>

<style scoped></style>
