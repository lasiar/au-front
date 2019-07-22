<template>
  <v-card>
    <v-toolbar card color="grey lighten-3">
      <v-icon>mdi-silverware</v-icon>
      <v-toolbar-title>Не завершенные игры</v-toolbar-title>
    </v-toolbar>
    <v-layout>
      <v-flex>
        <v-card-text
          style=" height: 300px;
  overflow-y: auto;"
        >
          <v-list>
            <template v-for="session in sessions">
              <v-list-tile
                @click="selectSession(session)"
                ripple
                :key="session.id"
              >
                Игра {{ session.id }} сложность {{ session.secret.length }}
              </v-list-tile>
            </template>
          </v-list>
        </v-card-text>
      </v-flex>

      <v-divider vertical></v-divider>

      <v-flex xs12 md6>
        <v-card-text>
          <div
            v-if="currentSession.id === undefined"
            key="title"
            class="title font-weight-light grey--text pa-3 text-xs-center"
          >
            Выберите игру
          </div>
          <div v-else>
            <ul>
              <template v-for="(lap, i) in historyHumanDT">
                <li :key="lap.date">
                  {{ lap.date_time }} {{ user }}: {{ lap.input }}
                </li>
                <li :key="i">
                  Комьютер: {{ bullAndCow(lap.input, currentSession.secret) }}
                </li>
              </template>
            </ul>
          </div>
        </v-card-text>
      </v-flex>
    </v-layout>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn flat @click="tree = []">
        Reset
      </v-btn>

      <v-spacer></v-spacer>
      <v-form>
        <v-text-field
          v-model="input"
          v-if="currentSession.id"
          :rules="rules"
          :label="`Введите ${lengthSecret}-значное число`"
          :counter="lengthSecret"
          :maxlength="lengthSecret"
        ></v-text-field>
        <v-btn
          :loading="loading"
          @click="guessHandler"
          class="white--text"
          color="green darken-1"
          depressed
        >
          Save
          <v-icon right>mdi-content-save</v-icon>
        </v-btn>
      </v-form>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { bullAndCow, dateFormatter, rules } from "../../utils/game";

export default {
  data: () => ({
    loading: false,
    input: "",
    currentSession: {},
    rules: rules
  }),
  computed: {
    ...mapState({
      user: state => state.auth.user.name,
      sessions: state => state.game.sessions,
      history: state => state.game.history
    }),
    historyHumanDT() {
      return this.history.map(lap => {
        return { ...lap, date_time: dateFormatter(lap.date_time) };
      });
    },
    lengthSecret() {
      return this.currentSession.secret.length || 0;
    }
  },
  methods: {
    ...mapActions({
      getAllSessions: "game/getCompletedSessions",
      guess: "game/guess",
      getHistory: "game/getHistory"
    }),
    async guessHandler() {
      this.loading = true;
      await this.guess({ idSession: this.currentSession.id, text: this.input });
      this.loading = false;
    },
    bullAndCow(input, secret) {
      return bullAndCow(input, secret);
    },
    selectSession(val) {
      this.currentSession = val;
      this.getHistory(val.id);
    }
  },
  created() {
    this.getAllSessions();
  }
};
</script>

<style scoped></style>
