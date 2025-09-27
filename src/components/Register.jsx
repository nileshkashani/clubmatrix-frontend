import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const sendOtp = async (e) => {
    e.preventDefault();
    if (isSendingOtp) return;
    setIsSendingOtp(true);
    setMessage({ type: "", text: "" });
    try {
      const response = await axios.post("https://cm-backend-production-642e.up.railway.app/login/send/otp", { phoneNo: phoneNo.trim() });
      if (response.data.success) {
        setMessage({ type: "success", text: response.data.message });
        setStep(2);
      } else {
        console.log("error")
        setMessage({ type: "error", text: response.data.message });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.response?.data?.message || "Failed to send OTP!" });
    }
    setIsSendingOtp(false);
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    try {
      const response = await axios.post(
        "https://cm-backend-production-642e.up.railway.app/login/verify/otp/for/register",
        { phoneNo, otp }  
      );
      if (response.data.success) {
        setMessage({ type: "success", text: response.data.message });
        setStep(3);
      } else {
        setMessage({ type: "error", text: response.data.message });
      }
    } catch (error) {
      setMessage({ type: "error", text: error.response?.data?.message || "OTP verification failed!" });
    }
  };


const registerUser = async (e) => {
  e.preventDefault();
  setMessage({ type: "", text: "" });

  try {
    console.log(phoneNo)
    const response = await axios.post(
      "https://cm-backend-production-642e.up.railway.app/login/register",
      { name, email, password, phoneNo }
    );

    if (response.data.success) {
      setMessage({ type: "success", text: response.data.message });

      console.log(response.data); 
      localStorage.setItem("user", JSON.stringify(response.data.user)); 
      localStorage.setItem("isAuthenticated", "true");

      navigate("/");
    } else {
      setMessage({ type: "error", text: response.data.message });
    }
  } catch (error) {
    setMessage({
      type: "error",
      text: error.response?.data?.message || "Registration failed!",
    });
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1117] px-4">
      <div className="w-full max-w-md bg-[#161b22] rounded-2xl shadow-xl p-8 text-white">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-blue-400 hover:text-blue-600 mb-4"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-extrabold text-center mb-6 tracking-wide">
          Register to <span className="text-blue-500">Club Matrix</span>
        </h1>

        {message.text && (
          <div
            className={`p-3 mb-4 rounded-md text-center font-medium ${message.type === "success" ? "bg-green-600" : "bg-red-600"
              }`}
          >
            {message.text}
          </div>
        )}

        {step === 1 && (
          <form onSubmit={sendOtp} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm">phone Number</label>
              <input
                type="tel"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#0d1117] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your phoneNo number"
                required
              />
              <p className="mt-1 text-xs text-gray-400">
                Note: OTP will be sent to your phoneNo number
              </p>
            </div>
            <div>
              <label className="block mb-1 text-sm">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#0d1117] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <button
              type="submit"
              disabled={isSendingOtp}
              className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${isSendingOtp ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {isSendingOtp ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}


        {step === 2 && (
          <form onSubmit={verifyOtp} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm">OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#0d1117] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter OTP"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300 font-semibold"
            >
              Verify OTP
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={registerUser} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#0d1117] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#0d1117] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300 font-semibold"
            >
              Register
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
