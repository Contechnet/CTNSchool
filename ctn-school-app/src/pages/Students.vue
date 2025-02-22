<template>
  <v-container>
    <v-row class="pa-5">
      <v-col cols="12" md="12">
        <ParentCard title="Students">
          <template #action>
            <v-btn color="primary" class="ml-4" @click="showDialog = true"
              >Add Student</v-btn
            >
          </template>
          <v-data-table
            :headers="headers"
            :items-per-page-options="itemsPerPage"
            :items="students"
            height="600"
            item-value="id"
          >
            <template v-slot:[`item.name`]="{ item }">
              {{ `${item.firstName} ${item.lastName}` }}
            </template>
            <template v-slot:[`item.classes`]="{ item }">
              <div class="d-flex justify-start ga-2">
                <template v-if="item.classes.length">
                  <v-chip
                    text
                    dense
                    v-for="(cls, index) in item.classes"
                    :key="index + 'classes'"
                  >
                    {{ cls }}
                  </v-chip>
                </template>
                <span v-else> N/A </span>
              </div>
            </template>
          </v-data-table>
        </ParentCard>
      </v-col>
    </v-row>

    <v-dialog v-model="showDialog" max-width="450px">
      <v-card>
        <v-card-text>
          <v-card-title class="pl-0 mb-4">Add New Student</v-card-title>
          <v-form @submit.prevent="addStudent" ref="formStudent">
            <v-row dense>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="newStudent.firstName"
                  label="First Name"
                  required
                  flat
                  :rules="rules.required"
                  variant="outlined"
                  density="comfortable"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="newStudent.lastName"
                  label="Last Name"
                  :rules="rules.required"
                  variant="outlined"
                  density="comfortable"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="newStudent.email"
                  label="Email"
                  :rules="rules.email"
                  variant="outlined"
                  density="comfortable"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-spacer />
              <v-btn color="red" variant="outlined" @click="showDialog = false"
                >Cancel</v-btn
              >
              <v-btn variant="outlined" type="submit" color="green">Save</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useStudentStore } from "../stores/studentStore";
import ParentCard from "@/components/ParentCard.vue";

const studentStore = useStudentStore();
const students = ref([]);
const showDialog = ref(false);
const newStudent = ref({ firstName: "", lastName: "", email: "" });

const headers = [
  // { title: "ID", key: "id" },
  { title: "Name", key: "name" },
  { title: "Classes", key: "classes" },
];
const itemsPerPage = ref([
  { value: 5, title: "5" },
  { value: 10, title: "10" },
  { value: 25, title: "25" },
  { value: 50, title: "50" },
  { value: 100, title: "100" },
  { value: -1, title: "$vuetify.dataFooter.itemsPerPageAll" },
]);
const formStudent = ref(null);

onMounted(async () => {
  await studentStore.fetchStudents();
  students.value = studentStore.students;
});
const rules = computed(() => {
  return {
    required: [(v) => !!v || "This field is required"],
    email: [
      (v) => !!v || "This field is required",
      (v) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v) ||
        "E-mail must be valid",
    ],
  };
});
const addStudent = async () => {
  const { valid } = await formStudent.value.validate();
  if (!valid) return;
  await studentStore.addStudent(newStudent.value);
  formStudent.value.reset();
  showDialog.value = false;
  await studentStore.fetchStudents();
  students.value = studentStore.students;
};
</script>
