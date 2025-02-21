<template>
  <v-container>
    <v-card>
      <v-card-title>Teachers</v-card-title>
      <v-card-text>
        <v-data-table
          items-per-page="5"
          :items-per-page-options="itemsPerPage"
          :headers="headers"
          :items="teachers"
          item-value="id"
        >
          <template v-slot:[`item.name`]="{ item }">
            {{ `${item.firstName} ${item.lastName}` }}
          </template>
          <template v-slot:[`item.dob`]="{ item }">
            {{ formatDate(item.dob) }}
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { format } from "date-fns";
import { onMounted, ref } from "vue";
import { useTeacherStore } from "../stores/teacherStore";

const teacherStore = useTeacherStore();
const teachers = ref([]);

const headers = [
  { title: "ID", key: "id" },
  { title: "Name", key: "name" },
  { title: "Date Of Birth", key: "dob" },
  { title: "E-mail", key: "email" },
];
const itemsPerPage = ref([
  { value: 5, title: "5" },
  { value: 10, title: "10" },
  { value: 25, title: "25" },
  { value: 50, title: "50" },
  { value: 100, title: "100" },
  { value: -1, title: "$vuetify.dataFooter.itemsPerPageAll" },
]);
onMounted(async () => {
  await teacherStore.fetchTeachers();
  teachers.value = teacherStore.teachers.sort(
    (a, b) => new Date(a.dob) - new Date(b.dob)
  );
});
const formatDate = (date) => {
  return format(new Date(date), "dd-MMM-yyyy");
};
</script>
