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
          @update:modelValue="checkTeacher"
          label="Select Class"
        ></v-select>

        <v-select
          v-model="selectedTeacher"
          :items="teachers"
          item-title="name"
          item-value="id"
          :readonly="!selectedClass"
          label="Select Teacher"
        >
          <template v-slot:item="{ props, item }">
            <v-list-item
              v-bind="props"
              :title="`${item.raw.firstName} ${item.raw.lastName}`"
            ></v-list-item>
          </template>

          <template v-slot:selection="{ item, index }">
            <span> {{ `${item.raw.firstName} ${item.raw.lastName}` }}</span>
          </template>
        </v-select>

        <v-btn
          color="primary"
          class="mt-2"
          @click="assignTeacher"
          :disabled="currentClass?.teacher?.id == selectedTeacher"
          >{{ currentClass?.teacher?.id ? "Update" : "Assign" }}</v-btn
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
const currentClass = ref(null);
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

const checkTeacher = async () => {
  currentClass.value = classes.value.find(
    (cls) => cls.id == selectedClass.value
  );
  selectedTeacher.value = currentClass.value?.teacher?.id || null;
};
</script>
