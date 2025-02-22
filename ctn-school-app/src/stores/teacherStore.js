import { defineStore } from "pinia";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const useTeacherStore = defineStore("teacherStore", {
  state: () => ({
    teachers: [],
  }),
  actions: {
    async fetchTeachers() {
      try {
        const response = await axios.get(`${API_URL}/teachers`);
        this.teachers = response.data;
      } catch (error) {
        console.error("Error fetching teachers", error);
      }
    },
    async assignTeacher(payload) {
      try {
        // const response = await axios.get(
        //   `${API_URL}/classes/${payload.classId}`
        // );
        // const currentClass = response.data;
        const updatedClass = {
          // ...currentClass,
          teacher: payload.teacherID
        };

        // Send POST request to add the student
        const updatedClassRes = await axios.patch(`${API_URL}/classes/${payload.classId}`, updatedClass, {
          headers: { "Content-Type": "application/json" },
        });

        if (updatedClassRes.status === 200) {
          // console.log("teacher successfully assigned", updatedClassRes.data);
          push.success('Teacher has been successfully assigned to the class!');

        }
      } catch (error) {
        console.error("Error adding student to class:", error);
        push.error('Something went wrong. Please try again later.')
      }
    },
  },
});
