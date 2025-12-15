import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth"; // Backend signup API

/**
 * USER EDIT PAGE - Only for new users
 * 
 * FLOW (After OTP verification for new user):
 * 1. User lands on this page after verifying OTP
 * 2. User fills in Name and Email
 * 3. User clicks "Create Account"
 * 4. This page calls backend /auth/signup API to create user in database
 * 5. Backend returns JWT token in cookies
 * 6. Navigate to HOME page (user is now fully logged in)
 * 
 * LINE-BY-LINE EXPLANATION:
 * 
 * STATE VARIABLES:
 * - formData: { name, email } - Form fields
 * - isLoading: Show loading state while creating account
 * - errors: Validation errors for each field
 * 
 * FUNCTIONS:
 * - handleInputChange: Update form field
 * - validateForm: Check if name and email are valid
 * - handleCreateAccount: Call backend to create user
 */
export default function UserEdit() {
  // Get phone number and Firebase user from previous page
  const location = useLocation();
  const navigate = useNavigate();
  const phone = location.state?.phone || "";
  const uid = location.state?.uid;

  // Form state - collect name and email from user
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  // UI state
  const [isLoading, setIsLoading] = useState(false); // Show loading while creating account
  const [errors, setErrors] = useState({ name: "", email: "" }); // Validation errors

  // If no phone or uid, redirect to login (security check)
  if (!phone || !uid) {
    navigate("/login");
    return null;
  }

  /**
   * HANDLE INPUT CHANGE
   * 
   * Update form fields as user types
   * Also clear error for that field when user starts typing
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  /**
   * VALIDATE FORM
   * 
   * Check if name and email are valid before submission
   * Returns true if valid, false if has errors
   */
  const validateForm = () => {
    const newErrors = {};

    // VALIDATION 1: Check if name is filled
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // VALIDATION 2: Check if email is valid
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      // Email regex validation (basic)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  /**
   * HANDLE CREATE ACCOUNT
   * 
   * LINE-BY-LINE:
   * 
   * STEP 1: Validate form before submission
   * STEP 2: Call backend /auth/signup API to create user
   *         - Send: { name, email, phone }
   *         - Backend creates user in database
   *         - Backend sends back JWT token in cookies
   * STEP 3: If successful, navigate to HOME (user is now logged in)
   * STEP 4: If error, show error message to user
   */
  const handleCreateAccount = async () => {
    // STEP 1: Validate form
    if (!validateForm()) {
      return; // Stop if validation fails
    }

    setIsLoading(true);

    try {
      // STEP 2: Call backend signup API
      const response = await registerUser({
        name: formData.name,
        useremail: formData.email,
        phone: phone, // Phone number from previous page
      });

      // response = { success: true/false, message: "User created", token: "jwt..." }

      if (response.success) {
        // STEP 3: Account created successfully
        // Backend already sent JWT in cookies, so user is logged in
        alert("Account created successfully!");

        // Navigate to HOME page
        navigate("/");
      } else {
        // STEP 4: Error creating account
        setErrors({
          ...errors,
          name: response.message || "Failed to create account",
        });
      }
    } catch (error) {
      console.error("Error creating account:", error);
      setErrors({
        ...errors,
        name: error.message || "An error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-lg mb-4">
            <span className="text-black font-bold text-lg">RJ</span>
          </div>
          <h1 className="text-3xl font-bold text-black">Raj Motors</h1>
          <p className="text-gray-600 mt-2">Complete Your Profile</p>
        </div>

        {/* FORM */}
        <div className="space-y-5">
          {/* PHONE DISPLAY - Read-only */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl bg-gray-50 text-gray-600">
              +91 {phone}
            </div>
            <p className="text-xs text-gray-500 mt-1">Verified with OTP</p>
          </div>

          {/* NAME INPUT */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={isLoading}
              className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition ${
                errors.name
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-primary"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm font-medium mt-2">
                ✗ {errors.name}
              </p>
            )}
          </div>

          {/* EMAIL INPUT */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
              className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition ${
                errors.email
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-primary"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm font-medium mt-2">
                ✗ {errors.email}
              </p>
            )}
          </div>

          {/* CREATE ACCOUNT BUTTON */}
          <button
            onClick={handleCreateAccount}
            disabled={isLoading || !formData.name || !formData.email}
            className={`w-full py-3 rounded-xl font-bold text-lg transition duration-200 ${
              isLoading || !formData.name || !formData.email
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-primary text-black hover:opacity-90 cursor-pointer shadow-lg"
            }`}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>

          {/* GO BACK BUTTON */}
          <button
            onClick={() => navigate("/login")}
            disabled={isLoading}
            className="w-full bg-gray-200 text-gray-700 py-2 rounded-xl font-medium hover:bg-gray-300 transition"
          >
            ← Back to Login
          </button>
        </div>

        {/* INFO MESSAGE */}
        <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
          <p className="text-sm text-blue-700">
            ℹ️ Your phone number has been verified. Please complete your profile to finish registration.
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * COMPLETE NEW USER REGISTRATION FLOW:
 * 
 * 1. User enters phone on Login page
 * 2. Click "Send OTP"
 *    ├─ Backend checks if phone exists
 *    └─ Firebase sends OTP
 * 
 * 3. User enters OTP code on OTP page
 * 4. Click "Verify OTP"
 *    ├─ Firebase verifies OTP
 *    └─ If new user (exists=false), navigate to /user/edit
 * 
 * 5. User lands on this UserEdit page
 * 6. User fills Name and Email
 * 7. Click "Create Account"
 *    ├─ Call /auth/signup API
 *    ├─ Backend creates user in database
 *    └─ Backend sends JWT in cookies
 * 
 * 8. Navigate to HOME (fully logged in) ✅
 */
