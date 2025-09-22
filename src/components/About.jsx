import React from "react";
import { useNavigate } from "react-router-dom";


const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0d1117] text-white px-6 py-12 flex flex-col items-center">
      <div className="mb-6 w-full max-w-5xl">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-blue-400 hover:text-blue-600 mb-4"
        >
          ← Back
        </button>
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
        About Club Matrix
      </h1>

      <div className="max-w-5xl space-y-12 text-gray-300">
        {/* Website Flow */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Website Flow</h2>
          <p className="text-lg leading-relaxed">
            Club Matrix is a platform designed to connect school and community clubs with their members.
            Members can search and filter through various clubs, join the ones they are interested in,
            and stay up-to-date with club announcements, urgent messages, and scheduled meetings.
          </p>
        </section>

        {/* Role-Based Access */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Role-Based Access</h2>

          <div className="space-y-6">
            {/* Member Section */}
            <div className="bg-[#161b22] rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-2 text-blue-400">Club Member</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                <li>Search and filter clubs to find the ones that match your interests.</li>
                <li>Join clubs and receive announcements about meetings, events, and urgent messages.</li>
                <li>Stay connected with fellow members and track club activities.</li>
              </ul>
            </div>

            {/* Leader Section */}
            <div className="bg-[#161b22] rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-2 text-blue-400">Club Leader</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                <li>Manage join requests from prospective members, approving or rejecting as necessary.</li>
                <li>Create announcements to keep members informed about meetings, events, and urgent updates.</li>
                <li>Manage existing club members by editing, removing, or updating their roles.</li>
                <li>Oversee the club’s activities and ensure smooth communication within the club.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Closing Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Our Goal</h2>
          <p className="text-lg leading-relaxed">
            Club Matrix aims to simplify club management and strengthen the connection
            between members and leaders. Whether you're a member looking to join clubs
            or a leader managing your club, our platform provides a seamless and interactive experience.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
