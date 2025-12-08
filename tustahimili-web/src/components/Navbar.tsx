import { Link } from "wouter";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-700">
          Tustahimili Na Lulu
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
          <Link href="/features" className="text-gray-700 hover:text-blue-600 font-medium">Features</Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium">About</Link>

          <Link href="/get-started" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Get Started</Link>
          <Link href="/login" className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition">Login</Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col px-6 py-4 space-y-3">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/features" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsOpen(false)}>Features</Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="/get-started" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-center" onClick={() => setIsOpen(false)}>Get Started</Link>
            <Link href="/login" className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition text-center" onClick={() => setIsOpen(false)}>Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
