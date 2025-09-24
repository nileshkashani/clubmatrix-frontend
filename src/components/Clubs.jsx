import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Clubs = () => {
  const navigate = useNavigate();

  const [clubs, setClubs] = useState([]);
  const [joinedClubs, setJoinedClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [messages, setMessages] = useState({}); // store messages per club

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const res = await axios.get("https://cm-backend-production-642e.up.railway.app/club/getall");
        setClubs(res.data);

        if (user) {
          const joinedRes = await axios.get("https://cm-backend-production-642e.up.railway.app/member/email", {
            params: { email: user.email },
          });
          if (joinedRes.data.success) {
            const memberArray = Array.isArray(joinedRes.data.data)
              ? joinedRes.data.data
              : [joinedRes.data.data];
            const joined = memberArray.map((m) => m.club);
            setJoinedClubs(joined);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchClubs();
  }, [user]);

  const categories = ["all", ...new Set(clubs.map((club) => club.clubCategory))];

  const filteredClubs = clubs.filter((club) => {
    const matchesCategory = category === "all" || club.clubCategory === category;
    const matchesSearch =
      club.clubName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleJoin = async (clubId) => {
    if (!user) {
      setMessages((prev) => ({
        ...prev,
        [clubId]: { type: "error", text: "Please login to join a club!" },
      }));
      return;
    }
    try {
      const res = await axios.post(
        `https://cm-backend-production-642e.up.railway.app/join/request/${clubId}/${user.user.id}`
      );
      setMessages((prev) => ({
        ...prev,
        [clubId]: { type: "success", text: res.data.message || "Join request sent!" },
      }));
    } catch (err) {
      console.error(err);
      setMessages((prev) => ({
        ...prev,
        [clubId]: { type: "error", text: "Failed to send join request" },
      }));
    }
  };

  const joinedIds = new Set(joinedClubs.map((c) => c.id));
  const notJoinedClubs = filteredClubs.filter((club) => !joinedIds.has(club.id));

  return (
    <div className="min-h-screen bg-[#0d1117] p-6 text-white">
      <div className="max-w-6xl mx-auto mb-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-blue-400 hover:text-blue-600 mb-4"
        >
          ← Back
        </button>
      </div>
      <h1 className="text-3xl font-bold text-blue-500 mb-8 text-center">
        Explore Clubs
      </h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto mb-10">
        <input
          type="text"
          placeholder="Search clubs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-4 py-2 rounded-md border border-gray-600 bg-[#161b22] text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-600 bg-[#161b22] text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all" ? "All Categories" : cat}
            </option>
          ))}
        </select>
      </div>

      {/* Joined Clubs */}
      {joinedClubs.length > 0 && (
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold mb-6">Clubs You Joined</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {joinedClubs.map((club) => (
              <div
                key={club.id}
                className="bg-[#161b22] rounded-xl shadow-lg p-6 flex flex-col justify-between hover:scale-[1.02] transition-transform"
              >
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">{club.clubName}</h2>
                  <p className="text-gray-300 mb-4">{club.description}</p>
                  <div className="text-sm text-gray-400 space-y-1 mb-4">
                    <p>
                      <span className="font-medium">Category:</span> {club.clubCategory}
                    </p>
                    <p>
                      <span className="font-medium">Membership:</span> {club.membershipType}
                    </p>
                    <p>
                      <span className="font-medium">Contact:</span> {club.contactEmail}
                    </p>
                  </div>
                </div>
                <span className="mt-auto px-4 py-2 bg-green-600 text-white rounded-md text-center">
                  Joined
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Other Clubs */}
      <div className="max-w-6xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold mb-6">Clubs You Can Join</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notJoinedClubs.map((club) => (
            <div
              key={club.id}
              className="bg-[#161b22] rounded-xl shadow-lg p-6 flex flex-col justify-between hover:scale-[1.02] transition-transform"
            >
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">{club.clubName}</h2>
                <p className="text-gray-300 mb-4">{club.description}</p>
                <div className="text-sm text-gray-400 space-y-1 mb-4">
                  <p>
                    <span className="font-medium">Category:</span> {club.clubCategory}
                  </p>
                  <p>
                    <span className="font-medium">Membership:</span> {club.membershipType}
                  </p>
                  <p>
                    <span className="font-medium">Contact:</span> {club.contactEmail}
                  </p>
                </div>
                {messages[club.id] && (
                  <div
                    className={`mb-2 p-2 rounded-md text-sm ${messages[club.id].type === "success"
                        ? "bg-green-600 text-white"
                        : "bg-red-600 text-white"
                      }`}
                  >
                    {messages[club.id].text}
                  </div>
                )}
              </div>
              <button
                onClick={() => handleJoin(club.id)}
                className="mt-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
              >
                Join Club
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clubs;
