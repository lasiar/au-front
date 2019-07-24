<template>
  <v-list dense subheader shaped>
    <v-subheader>Сессии</v-subheader>
    <v-list-item-group mandatory color="primary">
      <v-list-item
        @click="$emit('selectSession', session)"
        v-for="(session, i) in sessions"
        :key="i"
      >
        <v-list-item-content
          v-text="`Игра ${session.id} сложность ${session.secret.length}`"
        ></v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "GameSessions",
  computed: {
    ...mapState({
      sessions: state => state.game.sessions
    })
  },
  methods: {
    ...mapActions({
      getAllSessions: "game/getCompletedSessions"
    })
  },
  created() {
    this.getAllSessions();
  }
};
</script>

<style scoped></style>
