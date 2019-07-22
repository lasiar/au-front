<template>
  <v-list>
    <template v-for="session in sessions">
      <v-list-tile
        @click="$emit('selectSession', session)"
        ripple
        :key="session.id"
      >
        Игра {{ session.id }} сложность {{ session.secret.length }}
      </v-list-tile>
    </template>
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
