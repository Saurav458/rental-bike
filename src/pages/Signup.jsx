import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Signup() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // If phone was passed via state, use it
  const initialPhone = location.state?.phone || "";

  if (!phone && initialPhone) {
    setPhone(initialPhone);
  }

  const isPhoneValid = phone.length === 10 && /^\d{10}$/.test(phone);

  const handleSignup = () => {
    if (!phone || !name || !email) {
      return alert("Please fill all fields");
    }
    if (!isPhoneValid) {
      return alert("Enter valid 10-digit phone number");
    }
    // Proceed to OTP
    navigate("/login/otp", { state: { phone } });
  };

  const handleBackToLogin = () => {
    navigate("/login");
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
          <p className="text-gray-600 mt-2">Create your account</p>
        </div>

        {/* SIGNUP FORM */}
        <div className="space-y-5">
          <div className="bg-blue-50 border-l-4 border-primary px-4 py-3 rounded">
            <p className="text-sm font-medium text-gray-700">
              📝 New User - Complete Profile
            </p>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-primary transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-primary transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number
            </label>
            <div className="flex border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-primary transition">
              <span className="px-4 py-3 bg-gray-50 border-r text-gray-700 font-medium">
                +91
              </span>
              <input
                type="text"
                inputMode="numeric"
                placeholder="10-digit number"
                maxLength="10"
                className="w-full px-4 py-3 outline-none text-lg"
                value={phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (value.length <= 10) {
                    setPhone(value);
                  }
                }}
              />
            </div>
            {phone.length > 0 && phone.length < 10 && (
              <p className="text-red-500 text-sm font-medium mt-1">
                ✗ Phone number must be exactly 10 digits
              </p>
            )}
            {isPhoneValid && (
              <p className="text-green-500 text-sm font-medium mt-1">
                ✓ Valid phone number
              </p>
            )}
          </div>

          {/* Continue Button */}
          <button
            onClick={handleSignup}
            className="w-full bg-primary text-black py-3 rounded-xl font-bold text-lg hover:opacity-90 transition shadow-lg"
          >
            Continue to OTP
          </button>

          {/* Back Button */}
          <button
            onClick={handleBackToLogin}
            className="w-full bg-gray-200 text-gray-700 py-2 rounded-xl font-medium hover:bg-gray-300 transition"
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
