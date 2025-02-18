import { defineStore } from "pinia";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const useStudentStore = defineStore("studentStore", {
  state: () => ({
    students: [],
  }),

  actions: {
    async fetchStudents() {
      try {
        const response = await axios.get(`${API_URL}/students`);
        this.students = response.data;
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    },
  },
});
