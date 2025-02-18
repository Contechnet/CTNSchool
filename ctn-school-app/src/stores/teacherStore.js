import { defineStore } from "pinia";
import axios from "axios";

export const useTeacherStore = defineStore("teacherStore", {
  state: () => ({
    teachers: [],
  }),
  actions: {
    async fetchTeachers() {
      try {
        const response = await axios.get("http://localhost:3000/teachers");
        this.teachers = response.data;
      } catch (error) {
        console.error("Error fetching teachers", error);
      }
    },
  },
});
