<template>
  <v-container>
    <v-row class="pa-5">
      <v-col cols="12" md="12">
        <ParentCard title="Assign Teachers to Classes">
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
        </ParentCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useClassStore } from "../stores/classStore";
import { useTeacherStore } from "../stores/teacherStore";
import ParentCard from "@/components/ParentCard.vue";

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
  await teacherStore.assignTeacher({
    classId: selectedClass.value,
    teacherID: selectedTeacher.value,
  });
  selectedClass.value = null;
  selectedTeacher.value = null;
};

const checkTeacher = async () => {
  currentClass.value = classes.value.find(
    (cls) => cls.id == selectedClass.value
  );
  selectedTeacher.value = currentClass.value?.teacher?.id || null;
};
</script>
