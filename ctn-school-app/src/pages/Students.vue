<template>
  <v-container>
    <v-card>
      <v-card-title>
        Students
        <v-btn color="primary" class="ml-4" @click="showDialog = true"
          >Add Student</v-btn
        >
      </v-card-title>

      <v-card-text>
        <v-data-table :headers="headers" :items="students" item-value="id" />
      </v-card-text>
    </v-card>

    <v-dialog v-model="showDialog" max-width="400px">
      <v-card>
        <v-card-title>Add New Student</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newStudent.firstName"
            label="First Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="newStudent.lastName"
            label="Last Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="newStudent.email"
            label="Email"
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="green" @click="addStudent">Save</v-btn>
          <v-btn color="red" @click="showDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useStudentStore } from "../stores/studentStore";

const studentStore = useStudentStore();
const students = ref([]);
const showDialog = ref(false);
const newStudent = ref({ firstName: "", lastName: "" , email:""});

const headers = [
  { title: "ID", key: "id" },
  { title: "Name", key: "name" },
];

onMounted(async () => {
  await studentStore.fetchStudents();
  students.value = studentStore.students;
});

const addStudent = async () => {
  if (!newStudent.value.firstName || !newStudent.value.lastName|| !newStudent.value.email) return;
  await studentStore.addStudent(newStudent.value);
  newStudent.value = { firstName: "", lastName: "", email:"" };
  showDialog.value = false;
};

</script>
