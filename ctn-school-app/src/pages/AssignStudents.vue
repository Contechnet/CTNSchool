<template>
  <v-container>
    <v-card>
      <v-card-title>Assign Students to Classes</v-card-title>

      <v-card-text>
        <v-select
          v-model="selectedClass"
          :items="classes"
          item-title="name"
          item-value="id"
          label="Select Class"
        ></v-select>

        <v-select
          v-model="selectedStudents"
          :items="students"
          item-title="name"
          item-value="id"
          label="Select Students"
          multiple
        ></v-select>

        <v-btn color="primary" class="mt-2" @click="assignStudents"
          >Assign</v-btn
        >
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useClassStore } from "../stores/classStore";
import { useStudentStore } from "../stores/studentStore";

const classStore = useClassStore();
const studentStore = useStudentStore();

const classes = ref([]);
const students = ref([]);
const selectedClass = ref(null);
const selectedStudents = ref([]);

onMounted(async () => {
  await classStore.fetchClasses();
  await studentStore.fetchStudents();
  classes.value = classStore.classes;
  students.value = studentStore.students;
});

const assignStudents = async () => {
  if (!selectedClass.value || selectedStudents.value.length === 0) return;
  await classStore.assignStudents(selectedClass.value, selectedStudents.value);
  selectedStudents.value = [];
};
</script>
