import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("password");
  const [otpRequested, setOtpRequested] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/login/password", { email, password });
      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("isAuthenticated", "true");
        const clubRes = await axios.get(`http://localhost:8080/club/get/by/leader/${res.data.user.id}`);
        navigate(clubRes.data ? "/dashboard" : "/");
      } else setMessage({ type: "error", text: "Invalid email or password" });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Login failed. Please try again." });
    }
  };

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/login/send/otp", { email });
      if (res.data.success) {
        setMessage({ type: "success", text: "OTP sent successfully! Check your email." });
        setOtpRequested(true);
      } else setMessage({ type: "error", text: res.data.message || "Failed to send OTP" });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to send OTP. Please try again." });
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/login/verify/otp", { email, otp });
      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("isAuthenticated", "true");
        navigate("/");
      } else setMessage({ type: "error", text: "Invalid OTP" });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "OTP verification failed. Please try again." });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1117] px-4">
      <div className="w-full max-w-md bg-[#161b22] rounded-2xl shadow-xl p-8 text-white">
        <h1 className="text-3xl font-extrabold text-center mb-6 tracking-wide">
          Login to <span className="text-blue-500">Club Matrix</span>
        </h1>

        {/* Tabs */}
        <div className="flex justify-center mb-6 space-x-4">
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedMethod === "password"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => {
              setSelectedMethod("password");
              setMessage({ type: "", text: "" });
              setOtpRequested(false);
            }}
          >
            Password
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedMethod === "otp"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => {
              setSelectedMethod("otp");
              setMessage({ type: "", text: "" });
              setOtpRequested(false);
            }}
          >
            Email OTP
          </button>
        </div>

        {/* Message */}
        {message.text && (
          <div
            className={`mb-4 p-3 rounded-md text-center font-medium ${
              message.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Forms */}
        {selectedMethod === "password" && (
          <form onSubmit={handlePasswordSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 text-sm">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#0d1117] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm">Password</label>
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
              Login
            </button>
          </form>
        )}

        {selectedMethod === "otp" && (
          <>
            {!otpRequested ? (
              <form onSubmit={handleRequestOtp} className="space-y-5">
                <div>
                  <label className="block mb-2 text-sm">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-[#0d1117] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300 font-semibold"
                >
                  Send OTP
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div>
                  <label className="block mb-2 text-sm">Email</label>
                  <input
                    type="email"
                    value={email}
                    readOnly
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-400"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">OTP</label>
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
          </>
        )}

        {/* Footer link */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
