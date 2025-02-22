import { defineStore } from "pinia";
import axios from "axios";
import { format } from "date-fns";
import { push } from 'notivue'
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

    async addClass(payload) {
      try {
        const teacherResponse = await axios.get(`${API_URL}/teachers`);
        const teachers = teacherResponse.data;
        const lastId = teachers.length > 0
          ? Math.max(...teachers.map(teacher => Number(teacher.id))) // Convert IDs to numbers
          : 0; // Default to 0 if no students exist
        const newId = (lastId + 1).toString(); // Convert back to string
        const { name, ...teachersData } = { ...payload, id: newId, dob: format(new Date(payload.dob), "yyyy-MM-dd") };
        console.log('teachersData', teachersData)

        const postResponse = await axios.post(`${API_URL}/teachers`, teachersData, {
          headers: { "Content-Type": "application/json" },
        });

        if (postResponse.status === 201) {
          const newTeacher = postResponse.data; // Update local state
          console.log("Teacher added successfully:", newTeacher);
          const classResponse = await axios.get(`${API_URL}/classes`);
          const classes = classResponse.data;
          const lastId = classes.length > 0
            ? Math.max(...classes.map(cls => Number(cls.id))) // Convert IDs to numbers
            : 0; // Default to 0 if no students exist
          const newId = (lastId + 1).toString(); // Convert back to string
          const newClass = { name: payload.name, teacher: newTeacher.id, students: [], id: newId }
          const postResponseClass = await axios.post(`${API_URL}/classes`, newClass, {
            headers: { "Content-Type": "application/json" },
          });
          if (postResponseClass.status === 201) {
            push.success('New class has been added successfully!')
            // console.log("cls added successfully:", postResponseClass.data);
          }
        }

      } catch (error) {
        console.error("Error adding Class:", error);
        push.error('Something went wrong. Please try again later.')

      }
    },
    async deleteClass(payload) {
      try {
        const response = await axios.delete(`${API_URL}/classes/${payload}`);
        if (response.status === 200) {
          push.success('Class has been deleted successfully!')
        }
      } catch (error) {
        push.error('Something went wrong. Please try again later.')
        console.error("Error delete Class:", error);
      }
    },
  },
});
