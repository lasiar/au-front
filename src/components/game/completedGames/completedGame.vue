<template>
  <v-card class="elevation-10, ma-3">
    <v-data-table hide-default-footer :headers="headers" :items="session">
      <template v-slot:body="{ items }">
        <tr v-for="(row, i) in items" :key="i">
          <td>{{ row.id }}</td>
          <td>{{ row.secret }}</td>
          <td>{{ row.count_lap }}</td>
          <td>{{ row.interval }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "completedGame",
  data: () => ({
    headers: [
      { text: "Сессия" },
      { text: "загаданное число" },
      { text: "Колличество ходов" },
      { text: "Затраченное время" }
    ]
  }),
  computed: mapState({
    session: state => state.game.notCompleted
  }),
  methods: mapActions({
    getSession: "game/getCompletedSessions"
  }),
  created() {
    this.getSession();
  }
};
</script>

<style scoped></style>
