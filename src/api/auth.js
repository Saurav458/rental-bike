// API service for authentication endpoints on your backend

// const API_BASE_URL = "http://localhost:3000";
const API_BASE_URL = "https://raj-motors.onrender.com";

/**
 * CHECK IF PHONE NUMBER EXISTS IN DATABASE
 * 
 * This function calls your backend to verify if the phone number is already registered
 * @param {string} phone - 10-digit phone number
 * @returns {Promise<{success: boolean, message: string}>}
 * 
 * WHAT HAPPENS:
 * 1. Sends phone to backend
 * 2. Backend checks if user exists in database
 * 3. Returns { success: true, message: "User found" } if exists
 * 4. Returns { success: false } if doesn't exist
 */
export const checkPhoneExists = async (phone) => {
  try {
    // Make POST request to your backend login endpoint
    // This endpoint checks if user exists, doesn't actually log them in yet
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Important: Include cookies in request
      body: JSON.stringify({ phone }),
    });

    // Parse response from backend
    const data = await response.json();

    // Return the response with success flag and message
    return data; // { success: true/false, message: "User found" or error }
  } catch (error) {
    console.error("Error checking phone:", error);
    return { success: false, message: error.message };
  }
};

/**
 * REGISTER NEW USER
 * 
 * This function creates a new user account in your database
 * Called AFTER Firebase OTP verification for new users
 * 
 * @param {object} userData - { name, email, phone }
 * @returns {Promise<{success: boolean, message: string}>}
 * 
 * WHAT HAPPENS:
 * 1. Sends user data to backend
 * 2. Backend creates user in database
 * 3. Backend sends back JWT token in cookies
 * 4. Frontend automatically logged in via JWT in cookies
 */
export const registerUser = async (userData) => {
  try {
    // userData = { name: "John", email: "john@example.com", phone: "9876543210" }
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Important: Include cookies to receive JWT
      body: JSON.stringify(userData),
    });

    // Parse response
    const data = await response.json();

    // Response should be { success: true, message: "User created", token: "jwt..." }
    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, message: error.message };
  }
};

/**
 * LOGOUT USER
 * 
 * Clears JWT token from cookies
 * Optional: Call backend to invalidate session
 */
export const logout = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

/**
 * FLOW SUMMARY:
 * 
 * USER FLOW 1: EXISTING USER
 * ─────────────────────────
 * 1. User enters phone → Clicks "Send OTP"
 * 2. checkPhoneExists(phone) → Backend returns { success: true, message: "User found" }
 * 3. Frontend gets Firebase OTP code
 * 4. User enters OTP code → Firebase verifies it
 * 5. Firebase verifies OTP ✅
 * 6. Frontend navigates to HOME (user is logged in via JWT in cookies)
 * 
 * USER FLOW 2: NEW USER
 * ─────────────────────
 * 1. User enters phone → Clicks "Send OTP"
 * 2. checkPhoneExists(phone) → Backend returns { success: false }
 * 3. Frontend gets Firebase OTP code
 * 4. User enters OTP code → Firebase verifies it
 * 5. Firebase verifies OTP ✅
 * 6. Frontend navigates to /user/edit (ask for name and email)
 * 7. User fills name and email → Clicks "Create Account"
 * 8. registerUser({ name, email, phone }) → Backend creates user
 * 9. Backend returns JWT token in cookies ✅
 * 10. Frontend auto navigates to HOME
 */
