import React from "react";

const Features = () => {
  return (
    <div className="relative min-h-screen bg-[#161b22] text-white px-6 py-12 flex flex-col items-center overflow-hidden">
      {/* Dotted background */}
      <div
        className="absolute inset-0 -z-10 w-full h-full"
        style={{
          backgroundImage: "radial-gradient(circle, #2a2c38 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden="true"
      />

      <h1 className="text-4xl md:text-5xl font-extrabold mb-12 text-center text-white">
        Features of Club Matrix
      </h1>

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Feature Cards */}
        <div className="bg-[#0d1117] p-6 rounded-xl shadow-xl border border-[#2a2c38]">
          <h2 className="text-xl font-bold mb-4 text-blue-400">Club Discovery</h2>
          <p className="text-gray-300 leading-relaxed">
            Browse, search, and filter through various clubs to find the ones
            that match your interests.
          </p>
        </div>

        <div className="bg-[#0d1117] p-6 rounded-xl shadow-xl border border-[#2a2c38]">
          <h2 className="text-xl font-bold mb-4 text-blue-400">Easy Onboarding</h2>
          <p className="text-gray-300 leading-relaxed">
            Join clubs instantly with a smooth sign-up process and start
            participating right away.
          </p>
        </div>

        <div className="bg-[#0d1117] p-6 rounded-xl shadow-xl border border-[#2a2c38]">
          <h2 className="text-xl font-bold mb-4 text-blue-400">Announcements & Updates</h2>
          <p className="text-gray-300 leading-relaxed">
            Stay informed with real-time updates, urgent messages, and event
            notifications from your clubs.
          </p>
        </div>

        <div className="bg-[#0d1117] p-6 rounded-xl shadow-xl border border-[#2a2c38]">
          <h2 className="text-xl font-bold mb-4 text-blue-400">Event Scheduling</h2>
          <p className="text-gray-300 leading-relaxed">
            Keep track of upcoming meetings and events with a built-in calendar
            and reminders.
          </p>
        </div>

        <div className="bg-[#0d1117] p-6 rounded-xl shadow-xl border border-[#2a2c38]">
          <h2 className="text-xl font-bold mb-4 text-blue-400">Role-Based Access</h2>
          <p className="text-gray-300 leading-relaxed">
            Separate features for members and leaders, ensuring smooth
            management and collaboration.
          </p>
        </div>

        <div className="bg-[#0d1117] p-6 rounded-xl shadow-xl border border-[#2a2c38]">
          <h2 className="text-xl font-bold mb-4 text-blue-400">Member Management</h2>
          <p className="text-gray-300 leading-relaxed">
            Leaders can approve/reject requests, update roles, and manage active
            members effortlessly.
          </p>
        </div>

        <div className="bg-[#0d1117] p-6 rounded-xl shadow-xl border border-[#2a2c38]">
          <h2 className="text-xl font-bold mb-4 text-blue-400">Community Engagement</h2>
          <p className="text-gray-300 leading-relaxed">
            Encourage interaction, collaboration, and bonding among club members
            through discussions and shared updates.
          </p>
        </div>

        <div className="bg-[#0d1117] p-6 rounded-xl shadow-xl border border-[#2a2c38]">
          <h2 className="text-xl font-bold mb-4 text-blue-400">Seamless Experience</h2>
          <p className="text-gray-300 leading-relaxed">
            Enjoy a fast, secure, and interactive platform optimized for both
            leaders and members.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
