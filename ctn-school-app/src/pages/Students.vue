<template>
  <v-container>
    <v-card>
      <v-card-title>Students</v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="students" item-value="id" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useStudentStore } from "../stores/studentStore";

const studentStore = useStudentStore();
const students = ref([]);

const headers = [
  { title: "ID", key: "id" },
  { title: "Name", key: "name" },
];

onMounted(async () => {
  await studentStore.fetchStudents();
  students.value = studentStore.students;
});
</script>
