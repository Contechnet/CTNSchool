import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/users";

export async function loginUser(username, password) {
  try {
    // Fetch the user based on login
    const response = await axios.get(`${API_URL}?login=${username}`);

    // Check if user exists
    if (response.data.length === 0) {
      return { success: false, message: "User not found" };
    }

    // Validate password
    const user = response.data[0];
    if (user.password === password) {
      return { success: true, user };
    } else {
      return { success: false, message: "Incorrect password" };
    }
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Server error" };
  }
}
