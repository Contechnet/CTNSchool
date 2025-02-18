<template>
  <v-container>
    <v-card>
      <v-card-title>Assign Teachers to Classes</v-card-title>

      <v-card-text>
        <v-select
          v-model="selectedClass"
          :items="classes"
          item-title="name"
          item-value="id"
          label="Select Class"
        ></v-select>

        <v-select
          v-model="selectedTeacher"
          :items="teachers"
          item-title="name"
          item-value="id"
          label="Select Teacher"
        ></v-select>

        <v-btn color="primary" class="mt-2" @click="assignTeacher"
          >Assign</v-btn
        >
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useClassStore } from "../stores/classStore";
import { useTeacherStore } from "../stores/teacherStore";

const classStore = useClassStore();
const teacherStore = useTeacherStore();

const classes = ref([]);
const teachers = ref([]);
const selectedClass = ref(null);
const selectedTeacher = ref(null);

onMounted(async () => {
  await classStore.fetchClasses();
  await teacherStore.fetchTeachers();
  classes.value = classStore.classes;
  teachers.value = teacherStore.teachers;
});

const assignTeacher = async () => {
  if (!selectedClass.value || !selectedTeacher.value) return;
  await classStore.assignTeacher(selectedClass.value, selectedTeacher.value);
  selectedTeacher.value = null;
};
</script>
