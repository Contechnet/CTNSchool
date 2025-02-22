<template>
  <v-container>
    <v-row class="pa-5">
      <v-col cols="12" md="12">
        <ParentCard title="Classes">
          <template #action>
            <v-btn color="primary" class="ml-4" @click="showDialog = true"
              >Add Class</v-btn
            >
          </template>
          <v-data-table
            :headers="headers"
            :items="classes"
            height="600"
            item-value="id"
            :items-per-page-options="itemsPerPage"
          >
            <template v-slot:[`item.teacher`]="{ item }">
              <template v-if="item?.teacher?.id">
                <span
                  v-for="(info, key, index) in item.teacher"
                  :key="index + 'teacher'"
                >
                  {{ `${key} : ${info ? info : "---"}` }}
                  <span v-if="index < Object.keys(item.teacher).length - 1">
                    ,
                  </span>
                </span>
              </template>
              <template v-else>
                <span> N/A </span>
              </template>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn
                size="x-small"
                color="red"
                icon
                @click="deleteClass(item.id)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </ParentCard>
      </v-col>
    </v-row>

    <v-dialog v-model="showDialog" max-width="450px">
      <v-card>
        <v-card-text>
          <v-card-title class="pl-0 mb-4">Add New Class</v-card-title>
          <v-form @submit.prevent="addClass" ref="formClass">
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="newClass.name"
                  label="Class Name"
                  variant="outlined"
                  density="comfortable"
                  :rules="rules.required"
                  flat
                  required
                ></v-text-field>
              </v-col>
              <v-col class="pt-0" cols="12">
                <v-card-subtitle class="pa-0"
                  ><strong> Teacher details </strong>
                </v-card-subtitle>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="newClass.firstName"
                  class="col-md-6"
                  placeholder="Teacher's first name"
                  label="First Name"
                  flat
                  :rules="rules.required"
                  variant="outlined"
                  density="comfortable"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="newClass.lastName"
                  class="col-md-6"
                  placeholder="Teacher's last name"
                  label="Last Name"
                  flat
                  :rules="rules.required"
                  variant="outlined"
                  density="comfortable"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-date-input
                  label="Select DOB"
                  v-model="newClass.dob"
                  prepend-icon=""
                  prepend-inner-icon="$calendar"
                  density="comfortable"
                  flat
                  :rules="rules.required"
                  variant="outlined"
                />
              </v-col>
              <v-col cols="12" md="12">
                <v-text-field
                  v-model="newClass.email"
                  class="col-md-6"
                  label="Email"
                  flat
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
import { ref, onMounted, computed } from "vue";
import { useClassStore } from "../stores/classStore";
import { VDateInput } from "vuetify/labs/VDateInput";
import ParentCard from "@/components/ParentCard.vue";

const classStore = useClassStore();
const classes = ref([]);
const showDialog = ref(false);
const newClass = ref({
  name: "",
  firstName: "",
  lastName: "",
  dob: null,
  email: "",
});
const formClass = ref(null);

const headers = [
  { title: "Class Name", key: "name" },
  { title: "Teacher", key: "teacher" },
  { title: "Actions", key: "actions", sortable: false },
];
const itemsPerPage = ref([
  { value: 5, title: "5" },
  { value: 10, title: "10" },
  { value: 25, title: "25" },
  { value: 50, title: "50" },
  { value: 100, title: "100" },
  { value: -1, title: "$vuetify.dataFooter.itemsPerPageAll" },
]);
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
onMounted(async () => {
  await classStore.fetchClasses();
  classes.value = classStore.classes;
});

const addClass = async () => {
  const { valid } = await formClass.value.validate();
  if (!valid) return;
  await classStore.addClass(newClass.value);
  formClass.value.reset();
  showDialog.value = false;
  await classStore.fetchClasses();
  classes.value = classStore.classes;
};

const deleteClass = async (id) => {
  await classStore.deleteClass(id);
  await classStore.fetchClasses();
  classes.value = classStore.classes;
};
</script>
