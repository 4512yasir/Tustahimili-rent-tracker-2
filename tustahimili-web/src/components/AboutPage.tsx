import Navbar from "./Navbar";
import communityImg from "../assets/images/community.jpeg";
import operationsImg from "../assets/images/transparent.jpeg";
import efficiencyImg from "../assets/images/accuracy.jpeg";
import { FaUsers, FaHandsHelping, FaBullseye } from "react-icons/fa";
import Footer from "./footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative h-[70vh] flex items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${communityImg})`,
        }}
      >
        <div className="absolute inset-0 bg-blue-900/60"></div>
        <div className="relative max-w-4xl text-white px-6">
          <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg mb-6">
            About Tustahimili
          </h1>
          <p className="text-lg md:text-2xl drop-shadow-md mb-6">
            A community-focused property management system that helps property owners, agents, and committees
            track tenants, rents, and repairs efficiently.
          </p>
          <a
            href="/features"
            className="inline-block px-8 py-4 bg-yellow-400 text-blue-900 font-bold rounded-full shadow-lg hover:bg-yellow-300 transition"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-700 mb-12">Why Choose Tustahimili</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[{
              img: communityImg,
              icon: FaUsers,
              title: "Community Driven",
              desc: "We focus on helping community-based groups manage their properties efficiently."
            }, {
              img: operationsImg,
              icon: FaHandsHelping,
              title: "Transparent Operations",
              desc: "Track all rents, repairs, and committee approvals to ensure full transparency."
            }, {
              img: efficiencyImg,
              icon: FaBullseye,
              title: "Efficiency & Accuracy",
              desc: "Automate rent tracking, repair requests, and reporting for better decision-making."
            }].map((feature, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-300"
              >
                <img src={feature.img} alt={feature.title} className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white p-6">
                  <feature.icon className="text-5xl mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-6">Ready to Simplify Property Management?</h3>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Join Tustahimili today and take control of your community properties with ease and transparency.
        </p>
        <a
          href="#get-started"
          className="px-8 py-4 bg-yellow-400 text-blue-900 font-bold rounded-full shadow-lg hover:bg-yellow-300 transition"
        >
          Get Started
        </a>
      </section>

      <Footer />
    </>
  );
}
