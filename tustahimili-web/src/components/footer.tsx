import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-700 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-4">Tustahimili</h3>
          <p className="text-gray-200">
            Simplifying community property management for transparency, efficiency, and trust.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-yellow-400 transition">Home</a></li>
            <li><a href="/about" className="hover:text-yellow-400 transition">About</a></li>
            <li><a href="/features" className="hover:text-yellow-400 transition">Features</a></li>
            <li><a href="/get-started" className="hover:text-yellow-400 transition">Get Started</a></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
          <p className="text-gray-200 mb-4">Email: support@tustahimili.com</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-yellow-400 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-yellow-400 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-yellow-400 transition"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-yellow-400 transition"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-300 mt-12">
        &copy; {new Date().getFullYear()} Tustahimili. All rights reserved.
      </div>
    </footer>
  );
}
