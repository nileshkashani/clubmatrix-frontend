import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

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
        About Club Matrix
      </h1>

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Website Flow Card */}
        <div className="bg-[#0d1117] p-6 rounded-xl shadow-xl border border-[#2a2c38]">
          <h2 className="text-xl font-bold mb-4 text-blue-400">Website Flow</h2>
          <p className="text-gray-300 leading-relaxed">
            Club Matrix is a platform designed to connect school and community clubs with their members.
            Members can search and filter through various clubs, join the ones they are interested in,
            and stay up-to-date with club announcements, urgent messages, and scheduled meetings.
          </p>
        </div>

        {/* Role-Based Access Card */}
        <div className="bg-[#0d1117] p-6 rounded-xl shadow-xl border border-[#2a2c38]">
          <h2 className="text-xl font-bold mb-4 text-blue-400">Role-Based Access</h2>

          <div className="space-y-4">
            {/* Member */}
            <div className="bg-[#161b22] p-4 rounded-lg border border-[#2a2c38]">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">Club Member</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Search and filter clubs to find the ones that match your interests.</li>
                <li>Join clubs and receive announcements about meetings, events, and urgent messages.</li>
                <li>Stay connected with fellow members and track club activities.</li>
              </ul>
            </div>

            {/* Leader */}
            <div className="bg-[#161b22] p-4 rounded-lg border border-[#2a2c38]">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">Club Leader</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Manage join requests from prospective members, approving or rejecting as necessary.</li>
                <li>Create announcements to keep members informed about meetings, events, and urgent updates.</li>
                <li>Manage existing club members by editing, removing, or updating their roles.</li>
                <li>Oversee the club’s activities and ensure smooth communication within the club.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Goal Card */}
        <div className="bg-[#0d1117] p-6 rounded-xl shadow-xl border border-[#2a2c38] md:col-span-2">
          <h2 className="text-xl font-bold mb-4 text-blue-400">Our Goal</h2>
          <p className="text-gray-300 leading-relaxed">
            Club Matrix aims to simplify club management and strengthen the connection
            between members and leaders. Whether you're a member looking to join clubs
            or a leader managing your club, our platform provides a seamless and interactive experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
