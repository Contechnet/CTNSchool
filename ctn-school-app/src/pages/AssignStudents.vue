<template>
  <v-container>
    <v-row class="pa-5">
      <v-col cols="12" md="12">
        <ParentCard title="Assign Students to Class">
          <v-form @submit.prevent="assignStudents" ref="formStudent">
            <v-select
              v-model="selectedClass"
              :items="classes"
              item-title="name"
              :rules="rules.required"
              required
              item-value="id"
              label="Select Class"
            ></v-select>

            <v-select
              v-model="selectedStudents"
              :items="unassignedStudents"
              item-title="name"
              :rules="rules.selectRules"
              chips
              required
              item-value="id"
              label="Select Students"
              multiple
            >
              <!-- <template v-slot:item="{ props, item }">
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
          </template> -->
            </v-select>

            <v-btn color="primary" type="submit" class="mt-2">Assign</v-btn>
          </v-form>
        </ParentCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useClassStore } from "../stores/classStore";
import { useStudentStore } from "../stores/studentStore";
import ParentCard from "@/components/ParentCard.vue";

const classStore = useClassStore();
const studentStore = useStudentStore();

const formStudent = ref(null);
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
  const { valid } = await formStudent.value.validate();
  if (!valid) return;
  await studentStore.assignStudents({
    classId: selectedClass.value,
    selectedStudents: selectedStudents.value,
  });
  await studentStore.fetchStudents();
  students.value = studentStore.students;
  formStudent.value.reset();
};

const unassignedStudents = computed(() =>
  students.value
    .filter((std) => !std.classes.length)
    .map((stdDetails) => ({
      name: `${stdDetails.firstName} ${stdDetails.lastName}`,
      id: stdDetails.id,
    }))
);

const rules = computed(() => {
  return {
    required: [(v) => !!v || "This field is required"],
    selectRules: [
      (v) => (!!v && v.length > 0) || "You must select at least one student.",
    ],
  };
});
</script>
