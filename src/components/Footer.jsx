import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#161b22] text-gray-300 py-10 overflow-hidden w-full">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        
        {/* Section 1 - About */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/features" className="hover:text-white">Features</a></li>
            <li><a href="/guide" className="hover:text-white">Guide</a></li>
          </ul>
        </div>

        {/* Section 2 - Visit */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Visit</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="https://nileshkashani.github.io/portfolio" target="_blank" rel="noopener noreferrer" className="hover:text-white">Developer's Portfolio</a></li>
          </ul>
        </div>


        {/* Section 3 - Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact us</h3>
          <ul className="space-y-2 text-sm">
            <li><b>Email </b> clubmatrix.team@gmail.com</li>
            <li><b>Phone</b> +62 857-6363-3378</li>
          </ul>
        </div>
        {/* Section 4 - Logo */}
        <div className="flex flex-col items-start">
          <h2 className="text-2xl font-bold text-white">ClubMatrix</h2>
          <p className="text-sm mt-2 text-gray-400 text-start">© {new Date().getFullYear()} ClubMatrix. All rights reserved.</p>
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
