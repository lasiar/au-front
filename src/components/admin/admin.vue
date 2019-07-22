<template>
  <v-layout>
    <v-data-table
      hide-actions
      :headers="headers"
      :items="listUsers"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.perm_mask }}</td>
      </template>
    </v-data-table>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "admin",
  data: () => ({
    headers: [
      { text: "#", value: "id" },
      { text: "name", value: "name" },
      { text: "perm_mask", value: "perm_mask" }
    ]
  }),
  computed: mapState({
    listUsers: state => state.admin.users
  }),
  created() {
    this.$store.dispatch("admin/getUsers");
  }
};
</script>

<style scoped></style>
