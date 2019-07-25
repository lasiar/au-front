<template>
  <v-list dense subheader shaped>
    <v-subheader>Сессии</v-subheader>
    <v-list-item-group v-model="select" mandatory color="primary">
      <v-list-item
        @click="selectSession(session)"
        v-for="(session, i) in sessions"
        :key="i"
      >
        <v-list-item-content
          v-text="`Игра ${session.id} сложность ${session.secret.length}`"
        ></v-list-item-content>
      </v-list-item>
    </v-list-item-group>
    <game-resume
      :show="showResume"
      :session="sessionResume"
      @close="showResume = false"
      @resume="selectSession"
    ></game-resume>
  </v-list>
</template>

<script>
import { mapActions, mapState } from "vuex";
import GameResume from "./GameResume";

export default {
  name: "GameSessions",
  components: { GameResume },
  data: () => ({
    select: {},
    showResume: false,
    sessionResume: {
      secret: "",
      id: 0
    }
  }),
  computed: {
    ...mapState({
      sessions: state => state.game.sessions
    })
  },
  methods: {
    ...mapActions({
      getAllSessions: "game/getNoCompletedSessions"
    }),
    async nonCompletedSession() {
      const sessions = await this.getAllSessions();
      if (sessions.length > 0) {
        this.sessionResume = sessions[sessions.length - 1];
        this.showResume = true;
      }
    },
    selectSession(session) {
      this.select = this.sessions.indexOf(session);
      this.$emit("selectSession", session);
    }
  },
  created() {
    this.nonCompletedSession();
  }
};
</script>

<style scoped></style>
