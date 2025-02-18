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
        <v-data-table :headers="headers" :items="classes" item-value="id">
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
