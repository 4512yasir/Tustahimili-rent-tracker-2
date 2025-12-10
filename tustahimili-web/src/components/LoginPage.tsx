import { useState } from "react";
import { useUser } from "../context/useUser";
import { useLocation } from "wouter";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUser
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Footer from "./footer";

type LoginFormData = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "agent" | "tenant";
};

export default function LoginPage() {
  const { login } = useUser();
  const [, setLocation] = useLocation();

  const [formData, setFormData] = useState<LoginFormData>({
    name: "",
    email: "",
    password: "",
    role: "tenant"
  });

  const [errors, setErrors] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRoleChange = (role: LoginFormData["role"]) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setErrors("Please fill in all fields.");
      return;
    }

    login({ ...formData });
    setLocation("/dashboard");
  };

  const handleGoogleLogin = () => {
    login({
      name: "Google User",
      email: "googleuser@example.com",
      role: "tenant"
    });
    setLocation("/dashboard");
  };

  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 overflow-hidden flex items-center justify-center px-4">

        {/* Animated background orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-cyan-200/40 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Card */}
        <div className="relative w-full max-w-md backdrop-blur-xl bg-white/70 border border-white/40 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)] rounded-[2rem] p-10 animate-fadeScale">

          <h2 className="text-center text-4xl font-extrabold text-blue-700 mb-2">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Sign in to continue
          </p>

          {errors && (
            <p className="text-center text-red-500 font-medium mb-4">
              {errors}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full h-12 rounded-xl border border-gray-200 pl-11 pr-4 bg-white 
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-12 rounded-xl border border-gray-200 pl-11 pr-4 bg-white
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-12 rounded-xl border border-gray-200 pl-11 pr-11 bg-white
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Role selector */}
            <div className="grid grid-cols-3 gap-3 py-2">
              {(["admin", "agent", "tenant"] as const).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleRoleChange(role)}
                  className={`py-2 rounded-xl text-sm font-semibold transition-all
                    ${
                      formData.role === role
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                >
                  {role.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500
                         hover:from-blue-700 hover:to-cyan-600 transition-all duration-300
                         text-white font-semibold text-lg shadow-lg hover:shadow-xl active:scale-95"
            >
              Login
            </button>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full h-12 flex items-center justify-center gap-3 rounded-xl
                         border bg-white shadow hover:bg-gray-50 transition"
            >
              <FcGoogle size={22} />
              <span className="font-medium text-gray-700">
                Continue with Google
              </span>
            </button>

            <p className="text-center text-gray-500 text-sm">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setLocation("/auth")}
                className="text-blue-600 font-semibold hover:underline"
              >
                Register
              </button>
            </p>
            
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
