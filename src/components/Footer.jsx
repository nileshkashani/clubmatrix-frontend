import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#161b22] text-gray-300 py-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        
        {/* Section 1 - About */}
        <div>
          <h3 className="text-lg font-semibold mb-3">About</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
            <li><a href="/help" className="hover:text-white">Help</a></li>
            <li><a href="/guide" className="hover:text-white">Guide</a></li>
          </ul>
        </div>

        {/* Section 2 - Visit */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Visit</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="https://yourportfolio.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Portfolio</a></li>
            <li><a href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer" className="hover:text-white">GitHub</a></li>
            <li><a href="https://linkedin.com/in/yourlinkedin" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a></li>
          </ul>
        </div>

        {/* Section 3 - Follow */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="https://instagram.com/yourdev" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a></li>
            <li><a href="https://linkedin.com/in/yourlinkedin" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a></li>
          </ul>
        </div>

        {/* Section 4 - Logo */}
        <div className="flex flex-col items-start md:items-end">
          <h2 className="text-2xl font-bold text-white">ClubMatrix</h2>
          <p className="text-sm mt-2 text-gray-400">© {new Date().getFullYear()} ClubMatrix. All rights reserved.</p>
          <div className="flex space-x-4 mt-4">
            <a href="https://github.com/nileshkashani" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaGithub size={20} /></a>
            <a href="https://linkedin.com/in/nilesh-kashani" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaLinkedin size={20} /></a>
            <a href="https://instagram.com/nilesh_____45" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaInstagram size={20} /></a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
