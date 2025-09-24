import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log(storedUser);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else {
      const fetchUser = async () => {
        try {

          const res = localStorage.getItem("user");
          if (res.data?.user) {
            setUser(res.data.user);
          } else {
            setMessage({ type: "error", text: "No user logged in" });
          }
        } catch (err) {
          console.error("Failed to fetch user:", err);
          setMessage({ type: "error", text: "Please Login!" });
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0d1117]">
        <div className="p-4 bg-[#161b22] text-white rounded-2xl shadow-md text-center w-80 md:w-96">
          Loading profile...
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0d1117]">
        <div className="p-4 bg-red-600 text-white rounded-2xl shadow-md text-center w-80 md:w-96">
          {message.text || "No user logged in"}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start min-h-screen bg-[#0d1117] py-8 px-4">
      <div className="w-full max-w-md bg-[#161b22] shadow-xl rounded-2xl p-6 md:p-8 text-white">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-blue-400 hover:text-blue-600 mb-4"
        >
          ← Back
        </button>

        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Profile</h2>

        <div className="space-y-4">
          {[
            { label: "Name", value: user.name },
            { label: "Email", value: user.email },
            { label: "Phone", value: user.phone || "N/A" },
            { label: "Address", value: user.address || "N/A" },
            { label: "User ID", value: user.id },
          ].map((field) => (
            <div key={field.label} className="flex justify-between border-b border-gray-700 pb-2">
              <span className="font-semibold">{field.label}:</span>
              <span>{field.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
