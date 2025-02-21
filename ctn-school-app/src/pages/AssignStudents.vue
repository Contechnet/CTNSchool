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
          :items="unassignedStudents"
          :readonly="!selectedClass"
          item-title="firstName"
          item-value="id"
          label="Select Students"
          multiple
        >
          <template v-slot:item="{ props, item }">
            <v-list-item
              v-bind="props"
              :title="`${item.raw.firstName} ${item.raw.lastName}`"
            ></v-list-item>
          </template>

          <template v-slot:selection="{ item, index }">
            <v-chip v-if="index < 10">
              <span> {{ `${item.raw.firstName} ${item.raw.lastName}` }}</span>
            </v-chip>
            <span
              v-if="index === 10"
              class="text-grey text-caption align-self-center"
            >
              (+{{ selectedStudents.length - 10 }} others)
            </span>
          </template>
        </v-select>

        <v-btn color="primary" class="mt-2" @click="assignStudents"
          >Assign</v-btn
        >
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
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
  await classStore.assignStudents({
    classId: selectedClass.value,
    selectedStudents: selectedStudents.value,
  });
  selectedStudents.value = [];
};
const unassignedStudents = computed(() =>
  students.value.filter((std) => !std.classes.length)
);
</script>
