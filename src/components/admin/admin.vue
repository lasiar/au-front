<template>
  <v-layout>
    <v-data-table
      hide-actions
      :headers="headers"
      :items="listUsers"
      class="elevation-1 ma-3"
    >
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.name }}</td>
        <td>
          <v-edit-dialog
            :return-value.sync="props.item.perm_mask"
            lazy
            @save="save(props.item)"
            @cancel="cancel"
            @open="open"
          >
            {{ props.item.perm_mask }}
            <template v-slot:input>
              <v-text-field
                v-model="props.item.perm_mask"
                label="Edit"
                single-line
                counter
              ></v-text-field>
            </template>
          </v-edit-dialog>
        </td>
      </template>
    </v-data-table>
    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <v-btn flat @click="snack = false">Close</v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "admin",
  data: () => ({
    snack: false,
    snackColor: "",
    snackText: "",
    headers: [
      { text: "#", value: "id" },
      { text: "name", value: "name" },
      { text: "perm_mask", value: "perm_mask" }
    ]
  }),
  computed: mapState({
    listUsers: state => state.admin.users
  }),
  methods: {
    save(user) {
      this.$store.dispatch("admin/changeUser", {
        ...user,
        perm_mask: parseInt(user.perm_mask)
      });
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    }
  },
  created() {
    this.$store.dispatch("admin/getUsers");
  }
};
</script>

<style scoped></style>
