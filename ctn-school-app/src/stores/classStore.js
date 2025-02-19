import { defineStore } from "pinia";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const useClassStore = defineStore("classStore", {
  state: () => ({
    classes: [],
  }),

  actions: {
    async fetchClasses() {
      try {
        const classResponse = await axios.get(`${API_URL}/classes`);
        const studentResponse = await axios.get(`${API_URL}/students`);
        const teacherResponse = await axios.get(`${API_URL}/teachers`);

        const students = studentResponse.data;
        const teachers = teacherResponse.data;
        // const classes = classResponse.data;

        // console.log(students);
        // console.log(teachers);
        // console.log(classes);

        // Map class data to include full teacher and student details
        this.classes = classResponse.data.map((cls) => ({
          ...cls,
          teacher: teachers.find((t) => t.id == cls.teacher) || {
            firstName: "Unknown",
            lastName: "",
          },
          students: cls.students.map(
            (studentId) =>
              students.find((s) => s.id == studentId) || {
                firstName: "Unknown",
                lastName: "",
              }
          ),
        }));
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    },
  },
});
