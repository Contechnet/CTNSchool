<template>
  <v-container>
    <v-card>
      <v-card-title>Teachers</v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="teachers" item-value="id" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useTeacherStore } from "../stores/teacherStore";

const teacherStore = useTeacherStore();
const teachers = ref([]);

const headers = [
  { title: "ID", key: "id" },
  { title: "Name", key: "name" },
];

onMounted(async () => {
  await teacherStore.fetchTeachers();
  teachers.value = teacherStore.teachers;
});
</script>
