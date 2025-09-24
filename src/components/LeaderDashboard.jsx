import React, { useEffect, useState } from "react";
import { Users, Bell, ClipboardList, Info, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LeaderDashboard = () => {
  const navigate = useNavigate(); // <-- add this
  const [activeTab, setActiveTab] = useState("club");
  const [joinRequests, setJoinRequests] = useState([]);
  const [members, setMembers] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [club, setClub] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  const user = JSON.parse(localStorage.getItem("user"));
  const leaderId = user.id;

  // Tabs handlers
  const handleTabClubDetails = async () => {
    setActiveTab("club");
    try {
      const res = await axios.get(
        `https://cm-backend-production-642e.up.railway.app/club/get/by/leader/${leaderId}`
      );
      setClub(res.data || null);
    } catch (err) {
      console.error(err);
      setClub(null);
      setMessage({ type: "error", text: "Failed to load club details" });
    }
  };

  const handleTabRequests = async () => {
    setActiveTab("requests");
    try {
      const res = await axios.get(
        `https://cm-backend-production-642e.up.railway.app/join/requests/leader/${leaderId}`
      );
      setJoinRequests(res.data.data || []);
    } catch (err) {
      console.error(err);
      setJoinRequests([]);
      setMessage({ type: "error", text: "Failed to load join requests" });
    }
  };

  const handleTabMembers = async () => {
    setActiveTab("members");
    try {
      const res = await axios.get(
        `https://cm-backend-production-642e.up.railway.app/club/members/leader/${leaderId}`
      );
      setMembers(res.data.data || []);
    } catch (err) {
      console.error(err);
      setMembers([]);
      setMessage({ type: "error", text: "Failed to load members" });
    }
  };

  const handleTabAnnouncements = async () => {
    setActiveTab("announcements");
    try {
      const clubRes = await axios.get(
        `https://cm-backend-production-642e.up.railway.app/club/get/by/leader/${leaderId}`
      );
      const id = clubRes.data.id;
      setClub(clubRes.data);

      const res = await axios.get(
        `https://cm-backend-production-642e.up.railway.app/announcement/get/all/${id}`
      );
      setAnnouncements(res.data.data || []);
    } catch (err) {
      console.error(err);
      setAnnouncements([]);
      setMessage({ type: "error", text: "Failed to load announcements" });
    }
  };

  // Actions
  const handleApprove = async (request) => {
    try {
      const clubId = request.club.id;
      await axios.post(`https://cm-backend-production-642e.up.railway.app/member/add/${clubId}`, request.user);
      await axios.delete(`https://cm-backend-production-642e.up.railway.app/join/delete/${request.id}`);
      setMessage({ type: "success", text: `Approved ${request.user.name}!` });
      handleTabRequests();
      handleTabMembers();
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error approving join request" });
    }
  };

  const handleReject = async (requestId) => {
    try {
      await axios.delete(`https://cm-backend-production-642e.up.railway.app/join/delete/${requestId}`);
      setMessage({ type: "success", text: "Join request rejected!" });
      handleTabRequests();
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error rejecting join request" });
    }
  };

  const handleRemove = async (memberId) => {
    try {
      await axios.delete(`https://cm-backend-production-642e.up.railway.app/member/delete/${memberId}`);
      setMessage({ type: "success", text: "Member removed!" });
      handleTabMembers();
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error removing member" });
    }
  };

  const handleAddAnnouncement = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    try {
      await axios.post(`https://cm-backend-production-642e.up.railway.app/announcement/add/${club.id}`, {
        announcementTitle: title,
        announcementDescription: description,
      });
      setMessage({ type: "success", text: "Announcement published!" });
      handleTabAnnouncements();
      e.target.reset();
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error publishing announcement" });
    }
  };

  useEffect(() => {
    handleTabClubDetails();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0d1117] text-white">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#161b22] shadow-md flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">Club Leader</div>
        <nav className="flex-1 p-4 space-y-2">
          {[
            { key: "club", label: "Club Details", icon: Info, handler: handleTabClubDetails },
            { key: "requests", label: "Join Requests", icon: ClipboardList, handler: handleTabRequests },
            { key: "members", label: "Club Members", icon: Users, handler: handleTabMembers },
            { key: "announcements", label: "Announcements", icon: Bell, handler: handleTabAnnouncements },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={tab.handler}
              className={`flex items-center w-full p-2 rounded-md transition ${activeTab === tab.key
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-700/30 text-gray-200"
                }`}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto space-y-6">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-blue-400 hover:text-blue-600 mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        {message.text && (
          <div
            className={`p-3 rounded-md text-sm ${message.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
              }`}
          >
            {message.text}
          </div>
        )}


        {activeTab === "club" && club && (
          <div className="bg-[#161b22] p-6 rounded-2xl shadow-md space-y-2">
            <h2 className="text-2xl font-bold mb-2">Club Details</h2>
            <p><strong>Name:</strong> {club.clubName}</p>
            <p><strong>Description:</strong> {club.description}</p>
            <p><strong>Category:</strong> {club.clubCategory}</p>
            <p><strong>Email:</strong> {club.contactEmail}</p>
            <p><strong>Membership Type:</strong> {club.membershipType}</p>
          </div>
        )}

        {activeTab === "requests" && (
          <div className="bg-[#161b22] p-6 rounded-2xl shadow-md space-y-2">
            <h2 className="text-2xl font-bold mb-4">Join Requests</h2>
            {joinRequests.length === 0 ? (
              <p className="text-gray-400">No pending join requests.</p>
            ) : (
              joinRequests.map((req) => (
                <div key={req.id} className="flex justify-between items-center p-2 border-b border-gray-700">
                  <span>{req.user.name} wants to join {req.club.clubName}</span>
                  <div className="space-x-2">
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                      onClick={() => handleApprove(req)}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                      onClick={() => handleReject(req.id)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "members" && (
          <div className="bg-[#161b22] p-6 rounded-2xl shadow-md space-y-2">
            <h2 className="text-2xl font-bold mb-4">Club Members</h2>
            {members.length === 0 ? (
              <p className="text-gray-400">No members in your club.</p>
            ) : (
              members.map((m) => (
                <div key={m.memberId} className="flex justify-between items-center p-2 border-b border-gray-700">
                  <span>{m.memberName || "Unnamed Member"}</span>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                    onClick={() => handleRemove(m.memberId)}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "announcements" && (
          <>
            <div className="bg-[#161b22] p-6 rounded-2xl shadow-md mb-4">
              <form className="space-y-3" onSubmit={handleAddAnnouncement}>
                <input
                  name="title"
                  type="text"
                  placeholder="Title"
                  className="w-full p-2 rounded-md bg-[#0d1117] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  name="description"
                  placeholder="Write your announcement..."
                  rows="4"
                  className="w-full p-2 rounded-md bg-[#0d1117] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Publish
                </button>
              </form>
            </div>
            <div className="bg-[#161b22] p-6 rounded-2xl shadow-md space-y-2">
              {announcements.length === 0 ? (
                <p className="text-gray-400">No announcements yet.</p>
              ) : (
                announcements.map((a) => (
                  <div key={a.announcementId} className="p-2 border-b border-gray-700">
                    <h4 className="font-semibold">{a.announcementTitle}</h4>
                    <p>{a.announcementDescription}</p>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default LeaderDashboard;
