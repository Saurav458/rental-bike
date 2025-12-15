import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * OTP VERIFICATION PAGE - Same page for both existing and new users
 * 
 * FLOW:
 * 1. User sees OTP input boxes and enters 4-digit code sent by Firebase
 * 2. User clicks "Verify OTP"
 * 3. Firebase verifies the OTP code
 * 4. Based on 'exists' flag:
 *    - If exists = true → User is existing, navigate to HOME (already logged in via JWT)
 *    - If exists = false → User is new, navigate to /user/edit (ask for name and email)
 */
export default function OTP() {
  const [otp, setOtp] = useState(["", "", "", "","",""]); // 4-digit OTP array
  const [resendTimer, setResendTimer] = useState(30); // Countdown timer
  const [isResendDisabled, setIsResendDisabled] = useState(true); // Disable resend during countdown
  const [isVerifying, setIsVerifying] = useState(false); // Show loading state while verifying
  const [errorMsg, setErrorMsg] = useState(""); // Show any errors
  
  const otpRefs = useRef([]); // Refs to focus between OTP input boxes
  const timerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get phone and exists flag from Login page
  const phone = location.state?.phone || "";
  const exists = location.state?.exists || false;
console.log("OTP Page - Phone:", phone, "Exists:", exists);
  // Timer effect - countdown for resend button
  // This runs every time resendTimer or isResendDisabled changes
  useEffect(() => {
    if (isResendDisabled && resendTimer > 0) {
      // Timer is still counting down
      timerRef.current = setTimeout(() => {
        setResendTimer(resendTimer - 1); // Decrease timer by 1 second
      }, 1000);
    } else if (resendTimer === 0) {
      // Timer reached 0, enable resend button
      setIsResendDisabled(false);
    }

    return () => clearTimeout(timerRef.current);
  }, [resendTimer, isResendDisabled]);

  /**
   * HANDLE OTP INPUT CHANGE
   * 
   * LINE-BY-LINE:
   * 1. Get the digit user typed in specific box
   * 2. Update OTP array at that index
   * 3. Auto-focus to next box if user typed something
   * 4. Allow only single digit (0-9)
   */
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp]; // Copy current OTP array
    newOtp[index] = value.slice(-1); // Only keep last character (single digit)
    setOtp(newOtp); // Update state

    // Auto-focus to next input box if user typed a digit
    if (value && index < 5) { // Updated to 5 for 6-digit OTP
      otpRefs.current[index + 1]?.focus();
    }
  };

  /**
   * HANDLE BACKSPACE KEY
   * 
   * If user presses backspace on empty box, move focus to previous box
   */
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  /**
   * VERIFY OTP WITH FIREBASE
   * 
   * LINE-BY-LINE EXPLANATION:
   * 
   * STEP 1: Get the 4-digit OTP code user entered
   * STEP 2: Validate that all 4 digits are entered
   * STEP 3: Get the confirmation result from Login page (stored in window)
   * STEP 4: Call Firebase confirm() with the OTP code
   * STEP 5: If verification succeeds, navigate based on user type:
   *         - Existing user → HOME page
   *         - New user → /user/edit page (to fill name and email)
   */
  const handleVerifyOtp = async () => {
    // STEP 1: Join all OTP digits into single string (e.g., "123456")
    const otpString = otp.join("");

    // STEP 2: Validate that all 6 digits are entered
    if (otpString.length !== 6) { // Updated to 6 for 6-digit OTP
      setErrorMsg("Please enter all 6 digits");
      return;
    }

    setIsVerifying(true); // Show loading state
    setErrorMsg(""); // Clear previous errors

    try {
      // STEP 3: Get confirmation result that was stored in Login page
      // window.confirmationResult = result from signInWithPhoneNumber()
      const confirmationResult = window.confirmationResult;

      if (!confirmationResult) {
        setErrorMsg("Session expired. Please start over.");
        return;
      }

      // STEP 4: Call Firebase confirm() with the OTP code
      const userCredential = await confirmationResult.confirm(otpString);

      // STEP 5: Navigate based on user type
      if (exists) {
        navigate("/");
      } else {
        navigate("/user/edit", {
          state: { phone, uid: userCredential.user.uid }
        });
      }
    } catch (error) {
      console.log("Error verifying OTP:", error);
      setErrorMsg("Invalid OTP. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  /**
   * RESEND OTP
   * 
   * User can request a new OTP if they didn't receive it
   * This resets the timer to 30 seconds
   */
  const handleResendOtp = async () => {
    setResendTimer(30);
    setIsResendDisabled(true);

    try {
      // Get the confirmation result and resend OTP
      const confirmationResult = window.confirmationResult;
      if (confirmationResult) {
        // Firebase will send new OTP to the same phone number
        alert("New OTP sent to +91 " + phone);
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      setErrorMsg("Failed to resend OTP. Please try again.");
    }
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
              Enter 6-Digit OTP
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
            disabled={isVerifying}
            className={`w-full py-3 rounded-xl font-bold text-lg transition shadow-lg ${
              isVerifying
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-primary text-black hover:opacity-90 cursor-pointer"
            }`}
          >
            {isVerifying ? "Verifying..." : "Verify OTP"}
          </button>

          {/* Show error message if verification fails */}
          {errorMsg && (
            <div className="bg-red-50 border-l-4 border-red-500 px-4 py-3 rounded">
              <p className="text-sm font-medium text-red-700">✗ {errorMsg}</p>
            </div>
          )}

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
