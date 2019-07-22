<template>
  <div>
    <v-layout>
      <v-flex xs5 v-for="(length, index) in listLength" :key="index">
        <board
          :length="length"
          :list="leaderBoards.filter(item => item.length === length)"
        ></board>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Board from "./Board";

export default {
  name: "LeaderBoard",
  components: { Board },
  computed: {
    ...mapState({
      leaderBoards: state => state.game.leaderboard
    }),
    listLength() {
      return [...new Set(this.leaderBoards.map(item => item.length))];
    }
  },
  methods: mapActions({
    getLeaderBoard: "game/getLeaderboard"
  }),
  created() {
    this.getLeaderBoard();
  }
};
</script>

<style scoped></style>
