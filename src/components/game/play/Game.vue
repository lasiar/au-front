<template>
  <div
    style=" height: 300px;
  overflow-y: auto;"
    ref="chat"
  >
    <ul>
      <template v-for="(lap, i) in historyHumanDT">
        <li :key="lap.date">{{ lap.date_time }} {{ user }}: {{ lap.input }}</li>
        <li :key="i">
          Комьютер: {{ bullAndCow(lap.input, currentSession.secret) }}
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import { bullAndCow, dateFormatter } from "../../../utils/game";
import { mapActions, mapState } from "vuex";

export default {
  name: "Game",
  props: {
    currentSession: {
      required: true,
      type: Object,
      default() {
        return { secret: "", id: 0 };
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user.name,
      history: state => state.game.history
    }),
    historyHumanDT() {
      return this.history.map(lap => {
        return { ...lap, date_time: dateFormatter(lap.date_time) };
      });
    }
  },
  methods: {
    ...mapActions({
      guess: "game/guess",
      getHistory: "game/getHistory"
    }),
    bullAndCow(input, secret) {
      return bullAndCow(input, secret);
    },
    scrollToEnd() {
      const chat = this.$refs["chat"];
      chat.scrollTop = chat.scrollHeight;
    }
  },
  watch: {
    history: {
      immediate: true,
      handler() {
        this.scrollToEnd();
      }
    },
    currentSession: {
      immediate: true,
      handler(newVal) {
        this.getHistory(newVal.id);
      }
    }
  }
};
</script>

<style scoped></style>
