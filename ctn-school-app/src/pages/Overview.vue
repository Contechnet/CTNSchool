<template>
  <v-container>
    <v-card>
      <v-card-title>Overview</v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="classes" item-value="id">
          <template v-slot:[`item.teacher`]="{ item }">
            {{ `${item.teacher.firstName} ${item.teacher.lastName}` }}
          </template>

          <template v-slot:[`item.students`]="{ item }">
            <span v-for="(student, index) in item.students" :key="student.id">
            {{ `${student.firstName} ${student.lastName}` }}
            {{  
              }}<span v-if="index < item.students.length - 1">, </span>
            </span>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useClassStore } from "../stores/classStore";

const classStore = useClassStore();
const classes = ref([]);

const headers = [
  { title: "Class Name", key: "name" },
  { title: "Teacher", key: "teacher" },
  { title: "Students", key: "students" },
];

onMounted(async () => {
  await classStore.fetchClasses();
  classes.value = classStore.classes;
});
</script>
