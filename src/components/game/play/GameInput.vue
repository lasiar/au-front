<template>
  <v-form>
    <v-text-field
      v-model="input"
      :rules="rules"
      :label="`Введите ${length}-значное число`"
      :counter="length"
      :maxlength="length"
    ></v-text-field>
    <v-btn
      :loading="loading"
      @click="$emit('sendGuess', input)"
      class="white--text"
      color="green darken-1"
      depressed
    >
      Save
      <v-icon right>mdi-content-save</v-icon>
    </v-btn>
  </v-form>
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
    loading: false,
    input: "",
    rules: rules
  })
};
</script>

<style scoped></style>
