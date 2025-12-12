import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function OTP() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const otpRefs = useRef([]);
  const timerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const phone = location.state?.phone || "";

  // Timer effect
  useEffect(() => {
    if (isResendDisabled && resendTimer > 0) {
      timerRef.current = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setIsResendDisabled(false);
    }

    return () => clearTimeout(timerRef.current);
  }, [resendTimer, isResendDisabled]);

  const handleResendOtp = () => {
    setResendTimer(10);
    setIsResendDisabled(true);
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only allow single digit
    setOtp(newOtp);

    // Auto-focus to next input
    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const otpString = otp.join("");
    if (otpString.length !== 4) return alert("Enter 4-digit OTP");
    alert("Logged in successfully!");
    navigate("/");
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
          <p className="text-gray-600 mt-2">Verify OTP</p>
        </div>

        {/* OTP VERIFICATION */}
        <div className="space-y-5">
          <div className="bg-green-50 border-l-4 border-green-500 px-4 py-3 rounded">
            <p className="text-sm font-medium text-gray-700">
              ✓ OTP sent successfully to +91 {phone}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Enter 4-Digit OTP
            </label>
            <div className="flex gap-3 justify-center mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (otpRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-14 h-14 border-2 border-gray-300 rounded-lg text-center text-2xl font-bold focus:border-primary focus:outline-none transition"
                  placeholder="0"
                />
              ))}
            </div>
          </div>

          <button
            onClick={handleVerifyOtp}
            className="w-full bg-primary text-black py-3 rounded-xl font-bold text-lg hover:opacity-90 transition shadow-lg cursor-pointer"
          >
            Verify OTP
          </button>

          <p className="text-center text-sm text-gray-600">
            Didn't receive OTP?{" "}
            <button
              onClick={handleResendOtp}
              disabled={isResendDisabled}
              className={`font-bold transition ${
                isResendDisabled
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-primary hover:underline cursor-pointer"
              }`}
            >
              {isResendDisabled ? `Resend (${resendTimer}s)` : "Resend"}
            </button>
          </p>

          <button
            onClick={handleBackToLogin}
            className="w-full bg-gray-200 text-gray-700 py-2 rounded-xl font-medium hover:bg-gray-300 transition"
          >
            ← Change Number
          </button>
        </div>
      </div>
    </div>
  );
}
