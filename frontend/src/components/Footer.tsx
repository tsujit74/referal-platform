import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-black py-8 mt-12">
      <div className="max-w-5xl mx-auto px-4 text-center md:text-left">
        {/* Logo */}
        <div className="mb-6">
          <h4 className="text-2xl font-bold text-indigo-700">ReferralPlatform</h4>
          <p className="text-sm text-gray-600">Create, share, and conquer.</p>
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div className="mb-4 md:mb-0">
            <h5 className="font-semibold mb-2">Quick Links</h5>
            <ul>
              <li>
                <Link to="/" className="hover:text-indigo-500">Home</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-indigo-500">Dashboard</Link>
              </li>
              <li>
                <Link to="/pubilc-feed" className="hover:text-indigo-500">Public Feed</Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h5 className="font-semibold mb-2">Connect</h5>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a href="https://github.com/tsujit74/" target="_blank" rel="noopener noreferrer">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/sujit-thakur-463b45229/" target="_blank" rel="noopener noreferrer">
                <Linkedin size={24} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-gray-500 text-sm text-center">
          &copy; {new Date().getFullYear()} Quizzy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
