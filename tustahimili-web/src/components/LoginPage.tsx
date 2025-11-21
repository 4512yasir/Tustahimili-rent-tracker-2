import { useState } from "react";
import { useUser } from "../context/usecontext";
import { useLocation } from "wouter";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Footer from "./footer";

type LoginFormData = {
  email: string;
  password: string;
  role: "admin" | "agent" | "tenant";
};

export default function LoginPage() {
  const { login } = useUser();
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    role: "tenant",
  });
  const [errors, setErrors] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.role) {
      setErrors("Please fill in all fields.");
      return;
    }

    // Dummy login success
    login({ email: formData.email, role: formData.role });
    setErrors("");
    setLocation("/dashboard"); // redirect to dashboard
  };

  const handleGoogleLogin = () => {
    login({ email: "googleuser@example.com", role: "tenant" }); // example
    setLocation("/dashboard");
  };

  return (
    <>
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 relative overflow-hidden transform transition duration-700 animate-fadeScale">
          <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Login</h2>

          {errors && <p className="text-red-500 mb-4 text-center font-medium">{errors}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="admin">Admin</option>
              <option value="agent">Agent</option>
              <option value="tenant">Tenant</option>
            </select>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-white text-lg bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition"
            >
              Login
            </button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-3 border rounded-xl bg-white shadow-sm hover:bg-gray-50 transition"
            >
              <FcGoogle size={22} />
              <span className="font-medium">Continue with Google</span>
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
