import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const JoinedClubs = () => {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);
  const [clubMembers, setClubMembers] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(true); // ✅ track loading

  useEffect(() => {
    const fetchJoinedClubs = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          setMessage({ type: "error", text: "No user email found." });
          setLoading(false);
          return;
        }
        const email = user.email;
        console.log(user);


        const res = await axios.get("https://cm-backend-production-642e.up.railway.app/member/email", {
          params: { email },
        });

        if (res.data.success) {
          const memberArray = Array.isArray(res.data.data)
            ? res.data.data
            : [res.data.data].filter(Boolean);

          setMembers(memberArray);

          if (memberArray[0]?.club) {
            setSelectedClub(memberArray[0].club);
          }
        }
      } catch (err) {
        console.error("Error fetching joined clubs:", err);
        setMessage({ type: "error", text: "Failed to load joined clubs." });
      } finally {
        setLoading(false); // ✅ finished loading
      }
    };

    fetchJoinedClubs();
  }, []);


  useEffect(() => {
    if (!selectedClub) return;

    const fetchClubData = async () => {
      try {
        const membersRes = await axios.get(
          `https://cm-backend-production-642e.up.railway.app/member/club/${selectedClub.id}`
        );
        setClubMembers(membersRes.data.data || []);

        const announcementsRes = await axios.get(
          `https://cm-backend-production-642e.up.railway.app/announcement/get/all/${selectedClub.id}`
        );
        setAnnouncements(announcementsRes.data.data || []);
      } catch (err) {
        console.error("Error fetching club data:", err);
        setClubMembers([]);
        setAnnouncements([]);
        setMessage({ type: "error", text: "Failed to load club data." });
      }
    };

    fetchClubData();
  }, [selectedClub]);

  const handleSelectClub = async (club) => {
    setSelectedClub(club);
  };

  if (loading) return <p className="text-white text-center mt-10">Loading...</p>;

  if (!members.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0d1117] text-white">
        <div className="bg-[#161b22] p-8 rounded-2xl shadow-md text-center">
          <h2 className="text-2xl font-bold mb-2">No Clubs Found</h2>
          <p className="text-gray-400">You haven’t joined any clubs yet.</p>
        </div>
      </div>
    );
  }


  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0d1117] text-white">
      {/* Sidebar: Joined Clubs */}
      <aside className="w-full md:w-64 bg-[#161b22] shadow-md flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">Joined Clubs</div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {members.length === 0 ? (
            <p className="text-gray-400">No joined clubs</p>
          ) : (
            members.map(
              (m) =>
                m.club && (
                  <button
                    key={m.memberId}
                    onClick={() => handleSelectClub(m.club)}
                    className={`flex items-center w-full p-2 rounded-md transition ${selectedClub?.id === m.club.id
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-700/30 text-gray-200"
                      }`}
                  >
                    {m.club.clubName}
                  </button>
                )
            )
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-transparent text-blue-400 rounded-md text-white font-medium transition"
        >
          &larr; Back
        </button>
        {message.text && (
          <div
            className={`p-3 mb-4 rounded-md text-sm ${message.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
              }`}
          >
            {message.text}
          </div>
        )}

        {selectedClub ? (
          <div className="space-y-6">
            <div className="bg-[#161b22] rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold mb-2">{selectedClub.clubName}</h2>
              <p className="text-gray-300">
                <strong>Contact:</strong> {selectedClub.contactEmail || "N/A"}
              </p>
            </div>

            <div className="bg-[#161b22] rounded-2xl shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">Members</h3>
              <div className="space-y-2">
                {clubMembers.length === 0 ? (
                  <p className="text-gray-400">No members in this club.</p>
                ) : (
                  clubMembers.map((m) => (
                    <div
                      key={m.memberId}
                      className="flex justify-between items-center p-2 border-b border-gray-700"
                    >
                      <span>{m.memberName || "Unnamed Member"}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="bg-[#161b22] rounded-2xl shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">Announcements</h3>
              <div className="space-y-2">
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
            </div>
          </div>
        ) : (
          <p className="text-gray-400">Select a club to see members and announcements.</p>
        )}
      </main>
    </div>
  );
};

export default JoinedClubs;
