import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddClub = () => {
  const [clubName, setClubName] = useState("");
  const [description, setDescription] = useState("");
  const [membershipType, setMembershipType] = useState("Open");
  const [contactEmail, setContactEmail] = useState("");
  const [clubCategory, setClubCategory] = useState("");
  const [message, setMessage] = useState(null); // { type: 'success'|'error', text: '' }
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const leaderId = user.user.id;

      const clubData = {
        clubName,
        description,
        membershipType,
        contactEmail,
        clubCategory,
        leaderId,
      };

      const clubRes = await axios.post(
        `https://cm-backend-production-642e.up.railway.app/club/add/${leaderId}`,
        clubData
      );

      const newClub = clubRes.data.data;

      const userLogin = {
        name: user.user.name,
        email: user.user.email,
        phoneNo: user.user.phone,
        address: user.user.address || "",
      };

      await axios.post(`https://cm-backend-production-642e.up.railway.app/member/add/${newClub.id}`, userLogin);

      setMessage({ type: "success", text: "Club created and leader added successfully!" });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

      setClubName("");
      setDescription("");
      setMembershipType("Open");
      setContactEmail("");
      setClubCategory("");
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: "Error creating club: " + (err.response?.data?.message || "Please login to create a club"),
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-4">

      <div className="w-full max-w-lg bg-[#161b22] rounded-2xl shadow-xl p-6 md:p-8 text-white">
        <div className="mb-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-blue-400 hover:text-blue-600"
          >
            ← Back
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Club</h2>

        {message && (
          <div
            className={`mb-6 p-3 rounded-md text-center font-medium ${message.type === "success" ? "bg-green-600" : "bg-red-600"
              }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Club Name</label>
            <input
              type="text"
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
              className="w-full border border-gray-600 bg-[#0d1117] px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-600 bg-[#0d1117] px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Membership Type</label>
            <select
              value={membershipType}
              onChange={(e) => setMembershipType(e.target.value)}
              className="w-full border border-gray-600 bg-[#0d1117] px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Contact Email</label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="w-full border border-gray-600 bg-[#0d1117] px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Club Category</label>
            <input
              type="text"
              value={clubCategory}
              onChange={(e) => setClubCategory(e.target.value)}
              className="w-full border border-gray-600 bg-[#0d1117] px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-md font-medium transition-all"
          >
            Add Club
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClub;
