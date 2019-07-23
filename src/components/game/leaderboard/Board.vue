<template>
  <v-card class="elevation-10, ma-3">
    <v-card-title v-text="`Сложность ${length} цифры`"> </v-card-title>
    <v-data-table hide-actions :headers="headers" :items="limitationList">
      <template v-slot:items="props">
        <td>{{ props.index + 1 }}</td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.count_lap }}</td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "Board",
  data: () => ({
    headers: [{ text: "#" }, { text: "Имя" }, { text: "Ходов" }]
  }),
  props: {
    length: {
      type: Number,
      required: true
    },
    list: {
      type: Array,
      required: true
    }
  },
  computed: {
    limitationList() {
      let arr = this.list;
      if (arr.length < 5) {
        for (; arr.length < 5; ) {
          arr.push({ count_lap: 0, name: "ТЫ МОЖЕШЬ ПОПАСТЬ СЮДА!" });
        }
      }
      return arr.slice(0, 5);
    }
  }
};
</script>

<style scoped></style>
