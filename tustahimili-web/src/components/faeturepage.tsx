import Navbar from "./Navbar";
import { FaUsers, FaDollarSign, FaTools, FaChartLine, FaShieldAlt, FaMobileAlt } from "react-icons/fa";
import Footer from "./footer";

export default function FeaturesPage() {
  const features = [
    {
      icon: FaUsers,
      title: "Tenant Management",
      desc: "Onboard, verify, and track tenants with automated status and document uploads."
    },
    {
      icon: FaDollarSign,
      title: "Rent Tracking",
      desc: "Record payments, auto-calculate arrears, generate receipts, and send reminders."
    },
    {
      icon: FaTools,
      title: "Repairs & Maintenance",
      desc: "Create repair requests, approve workflows, assign contractors, and track costs."
    },
    {
      icon: FaChartLine,
      title: "Analytics & Insights",
      desc: "Visualize occupancy, rent performance, and repair trends for better decisions."
    },
    {
      icon: FaShieldAlt,
      title: "Security & Compliance",
      desc: "Role-based permissions, audit logs, encrypted data storage, and GDPR compliance."
    },
    {
      icon: FaMobileAlt,
      title: "Mobile Ready",
      desc: "Offline-capable mobile agent app for rent collection, repairs, and tenant management."
    },
  ];

  return (
    <>
      <Navbar />

      <section
        className="pt-24 pb-20 px-6bg-lightblue-50"
        style={{
          background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">Our Features</h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-16 text-lg md:text-xl">
            Tustahimili Property & Plot Management System offers powerful tools to simplify property management,
            track rents, repairs, and ensure full transparency for committees, agents, and tenants.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, idx) => (
              <div
                key={idx}
                className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 flex flex-col items-center text-center"
              >
                <div className="p-4 rounded-full bg-blue-100 mb-4">
                  <f.icon className="text-blue-600 text-4xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <a
              href="/get-started"
              className="px-8 py-4 bg-yellow-400 text-blue-900 font-bold rounded-full shadow-lg hover:bg-yellow-300 transition text-lg md:text-xl"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
