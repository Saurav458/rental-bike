import { useState } from "react";
import { Google } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Simulating API call
const checkPhoneExists = async (phone) => {
  // Replace this with real API
  const existingPhones = ["6283831645", "9090909090"];
  return existingPhones.includes(phone);
};

export default function Login() {
  const [phone, setPhone] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  // Validate phone - exactly 10 digits
  const isPhoneValid = phone.length === 10 && /^\d{10}$/.test(phone);

  // STEP 1 : User clicks "Send OTP"
  const handleSendOtp = async () => {
    if (!isPhoneValid) return alert("Enter valid 10-digit phone number");

    const exists = await checkPhoneExists(phone);

    if (exists) {
      // Existing user → go to OTP page
      navigate("/login/otp", { state: { phone } });
    } else {
      // New user → go to signup
      navigate("/signup", { state: { phone } });
    }
  };

  const handleClick=()=>{
    navigate("https://accounts.google.com/o/oauth2/v2/auth?client_id=265654138751-oeub5439nnou57a17usm52m2baq268hi.apps.googleusercontent.com&redirect_uri=http://localhost:5173/&response_type=code&scope=openid%20email%20profile&access_type=offline&prompt=consent");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-lg mb-4">
            <span className="text-black font-bold text-lg">RJ</span>
          </div>
          <h1 className="text-3xl font-bold text-black">Raj Motors</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        {/* PHONE INPUT */}
        <div className="space-y-5">
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
              value={phone}
              onChange={(e) => {
                const inputValue = e.target.value;
                const value = inputValue.replace(/\D/g, "");
                
                // Check if user typed non-numeric characters
                if (inputValue !== value) {
                  setErrorMsg("Only numbers allowed");
                  setTimeout(() => setErrorMsg(""), 2000);
                } else {
                  setErrorMsg("");
                }
                
                if (value.length <= 10) {
                  setPhone(value);
                }
              }}
              maxLength="10"
              className="w-full px-4 py-3 outline-none text-lg"
            />
          </div>

          {errorMsg && (
            <p className="text-red-500 text-sm font-medium">
              ✗ {errorMsg}
            </p>
          )}

          {phone.length > 0 && phone.length < 10 && !errorMsg && (
            <p className="text-red-500 text-sm font-medium">
              ✗ Phone number must be exactly 10 digits
            </p>
          )}

          {isPhoneValid && (
            <p className="text-green-500 text-sm font-medium">
              ✓ Valid phone number
            </p>
          )}

          <button
            onClick={handleSendOtp}
            disabled={!isPhoneValid}
            className={`w-full py-3 rounded-xl font-bold text-lg transition duration-200 ${
              isPhoneValid
                ? "bg-primary text-black hover:opacity-90 cursor-pointer shadow-lg"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            {isPhoneValid ? "✓ Send OTP" : "Send OTP"}
          </button>

          <div className="flex items-center py-4">
            <span className="flex-1 border-t border-gray-300" />
            <span className="px-3 text-gray-400 text-sm font-medium">OR</span>
            <span className="flex-1 border-t border-gray-300" />
          </div>

          {/* GOOGLE LOGIN */}
          <button className="w-full flex justify-center items-center gap-3 border-2 border-gray-200 py-3 rounded-xl bg-white hover:bg-gray-200 font-medium transition cursor-pointer" onClick={handleClick}>
            <Google sx={{ color: "#4285F4" }} fontSize="medium" />
            <span>Login with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
