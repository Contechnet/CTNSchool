<template>
  <v-container>
    <v-card>
      <v-card-title>
        Classes
        <v-btn color="primary" class="ml-4" @click="showDialog = true"
          >Add Class</v-btn
        >
      </v-card-title>

      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="classes"
          item-value="id"
          items-per-page="5"
          :items-per-page-options="itemsPerPage"
        >
          <template v-slot:[`item.teacher`]="{ item }">
            <template v-if="item?.teacher?.id">
              <span
                v-for="(info, key, index) in item.teacher"
                :key="index + 'teacher'"
              >
                {{ `${key} : ${info ? info : "---"}` }}
                <span v-if="index < Object.keys(item.teacher).length - 1">
                  ,
                </span>
              </span>
            </template>
            <template v-else>
              <span> N/A </span>
            </template>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn color="red" icon @click="deleteClass(item.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <v-dialog v-model="showDialog" max-width="400px">
      <v-card>
        <v-card-title>Add New Class</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newClass.name"
            label="Class Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="newClass.teacher"
            label="Teacher Name"
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="green" @click="addClass">Save</v-btn>
          <v-btn color="red" @click="showDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useClassStore } from "../stores/classStore";

const classStore = useClassStore();
const classes = ref([]);
const showDialog = ref(false);
const newClass = ref({ name: "", teacher: "" });

const headers = [
  { title: "Class Name", key: "name" },
  { title: "Teacher", key: "teacher" },
  { title: "Actions", key: "actions", sortable: false },
];
const itemsPerPage = ref([
  { value: 5, title: "5" },
  { value: 10, title: "10" },
  { value: 25, title: "25" },
  { value: 50, title: "50" },
  { value: 100, title: "100" },
  { value: -1, title: "$vuetify.dataFooter.itemsPerPageAll" },
]);

onMounted(async () => {
  await classStore.fetchClasses();
  classes.value = classStore.classes;
});

const addClass = async () => {
  if (!newClass.value.name || !newClass.value.teacher) return;
  await classStore.addClass(newClass.value);
  newClass.value = { name: "", teacher: "" };
  showDialog.value = false;
};
const deleteClass = async (id) => {
  await classStore.deleteClass(id);
};
</script>
