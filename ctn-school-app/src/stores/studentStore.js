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

    // Add a new student with auto-incremented ID
    async addStudent(newStudent) {
      try {
        // Fetch current students to determine the last ID
        const response = await axios.get(`${API_URL}/students`);
        const students = response.data;

        // Find the highest numeric ID and increment it
        const lastId = students.length > 0
          ? Math.max(...students.map(student => Number(student.id))) // Convert IDs to numbers
          : 1; // Default to 1 if no students exist

        const newId = (lastId + 1).toString(); // Convert back to string

        // Create the new student object with auto-incremented ID
        const studentData = { id: newId, ...newStudent };

        // Send POST request to add the student
        const postResponse = await axios.post(`${API_URL}/students`, studentData, {
          headers: { "Content-Type": "application/json" },
        });

        if (postResponse.status === 201) {
          this.students.push(postResponse.data); // Update local state
          console.log("Student added successfully:", postResponse.data);
        }
      } catch (error) {
        console.error("Error adding student:", error);
      }
    },
  },
});
