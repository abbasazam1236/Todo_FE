import { jwtDecode } from "jwt-decode";

export const getLoginInfo = () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.warn("No authToken found in localStorage."); // Log a warning if no token is found
      return null;
    }

    const userInfo = jwtDecode(token); // Decode the token
    return userInfo; // Return the decoded user info
  } catch (error) {
    console.error("Error decoding token:", error); // Log any errors during decoding
    return null; // Return null if there's an error
  }
};