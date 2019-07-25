<template>
  <v-dialog v-model="showResume" width="500">
    <v-card>
      <v-card-text>
        У вас есть недоигранная сессия {{ session.id }}, сложность
        {{ session.secret.length }}
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-btn
          color="primary"
          @click="
            $emit('resume', session);
            $emit('close');
          "
        >
          Продолжить
        </v-btn>
        <v-spacer />
        <v-btn @click="$emit('close')" @keydown.esc="$emit('close')">
          Закрыть
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog></template
>

<script>
export default {
  name: "GameResume",
  props: {
    show: {
      type: Boolean,
      required: true
    },
    session: {
      type: Object,
      required: true,
      default: () => {
        return { secret: "", id: 0 };
      }
    }
  },
  computed: {
    showResume: {
      get: vm => vm.show,
      set: function() {
        this.$emit("close");
      }
    }
  }
};
</script>

<style scoped></style>
