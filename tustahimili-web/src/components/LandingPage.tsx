import Navbar from "./Navbar";
import { FaUsers, FaHandsHelping, FaBullseye } from "react-icons/fa";
import Footer from "./footer";

export default function LandingPage() {
  return (
    <div className="font-sans text-gray-800">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:flex md:items-center md:justify-between">
          <div className="md:w-1/2">
            <h1 className="text-5xl font-extrabold mb-4 leading-tight">
              Simplify Community Property Management
            </h1>
            <p className="text-lg mb-6">
              Track tenants, rents, repairs, and committee operations with ease. Transparent, efficient, and fully digital.
            </p>
            <div className="flex gap-4">
              <a
                href="/get-started"
                className="bg-yellow-400 text-blue-900 font-semibold px-6 py-3 rounded-lg hover:bg-yellow-500 transition"
              >
                Get Started
              </a>
              <a
                href="/login"
                className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition"
              >
                Login
              </a>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <img
              src="https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=800&q=80"
              alt="Property management illustration"
              className="rounded-xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">About Tustahimili</h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Tustahimili is a community-focused property management system designed to help 
            property owners, agents, and committees track tenants, rents, and repairs efficiently. 
            Our mission is to simplify property management and ensure transparency in community housing projects.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto text-center">
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
            <FaUsers className="text-blue-600 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
            <p>We focus on helping community-based groups manage their properties efficiently.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
            <FaHandsHelping className="text-blue-600 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Transparent Operations</h3>
            <p>Track all rents, repairs, and committee approvals to ensure full transparency.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
            <FaBullseye className="text-blue-600 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Efficiency & Accuracy</h3>
            <p>Automate rent tracking, repair requests, and reporting for better decision-making.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">Features</h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Everything you need to manage community-based properties efficiently.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto text-center">
          <div className="p-6 bg-blue-50 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
            <h3 className="text-xl font-semibold mb-2">Tenant Management</h3>
            <p>Track tenants, onboard new tenants, upload documents, and automate rent collection.</p>
          </div>
          <div className="p-6 bg-blue-50 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
            <h3 className="text-xl font-semibold mb-2">Rent Management</h3>
            <p>Record payments, generate receipts, track arrears, and send automated reminders.</p>
          </div>
          <div className="p-6 bg-blue-50 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
            <h3 className="text-xl font-semibold mb-2">Repairs & Maintenance</h3>
            <p>Submit repair requests, track progress, assign contractors, and manage costs efficiently.</p>
          </div>
        </div>
      </section>

      {/* Stats / Metrics Section */}
      <section className="py-20 px-6 bg-blue-50">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-700 mb-4">Our Impact So Far</h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Tustahimili has empowered community-based property groups to manage their tenants, plots, and repairs efficiently.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto text-center">
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
            <h3 className="text-4xl font-bold text-blue-600 mb-2">1,250+</h3>
            <p className="text-gray-600">Tenants Tracked</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
            <h3 className="text-4xl font-bold text-blue-600 mb-2">320+</h3>
            <p className="text-gray-600">Plots Managed</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
            <h3 className="text-4xl font-bold text-blue-600 mb-2">₦18M+</h3>
            <p className="text-gray-600">Rent Collected</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
            <h3 className="text-4xl font-bold text-blue-600 mb-2">1,050+</h3>
            <p className="text-gray-600">Repairs Resolved</p>
          </div>
        </div>
      </section>
      <section>
        <Footer/>
      </section>
    </div>
  );
}
