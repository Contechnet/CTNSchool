<template>
  <v-container>
    <v-row class="pa-5">
      <v-col cols="12" md="12">
        <ParentCard title="Overview">
          <v-data-table
            :headers="headers"
            :items="classes"
            height="600"
            item-value="id"
            :items-per-page-options="itemsPerPage"
          >
            <template v-slot:[`item.teacher`]="{ item }">
              {{ `${item.teacher.firstName} ${item.teacher.lastName}` }}
            </template>

            <template v-slot:[`item.students`]="{ item }">
              <span v-for="(student, index) in item.students" :key="student.id">
                {{ `${student.firstName} ${student.lastName}` }}
                <span v-if="index < item.students.length - 1">, </span>
              </span>
            </template>
          </v-data-table>
        </ParentCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useClassStore } from "../stores/classStore";
import ParentCard from "@/components/ParentCard.vue";

const classStore = useClassStore();
const classes = ref([]);
const itemsPerPage = ref([
  { value: 5, title: "5" },
  { value: 10, title: "10" },
  { value: 25, title: "25" },
  { value: 50, title: "50" },
  { value: 100, title: "100" },
  { value: -1, title: "$vuetify.dataFooter.itemsPerPageAll" },
]);

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
