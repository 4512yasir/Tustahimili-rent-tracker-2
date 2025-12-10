import { useState } from "react";
import { useLocation } from "wouter";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast, Toaster } from "react-hot-toast";
import Footer from "./footer";

type FormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "admin" | "agent" | "tenant" | "";
  agree: boolean;
};

export default function RegisterPage() {
  const [, setLocation] = useLocation();   // ✅ added

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    agree: false,
  });

  const [errors, setErrors] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRole = (role: FormData["role"]) =>
    setFormData({ ...formData, role });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.role
    ) {
      setErrors("Please fill in all fields.");
      toast.error("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors("Passwords do not match.");
      toast.error("Passwords do not match.");
      return;
    }

    if (!formData.agree) {
      setErrors("You must agree to the terms and conditions.");
      toast.error("You must agree to the terms.");
      return;
    }

    setErrors("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Registration successful!");

      console.log("Registered user:", formData);

      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        agree: false,
      });

      // ✅ REDIRECT TO LOGIN AFTER SUCCESS
      setTimeout(() => {
        setLocation("/login");
      }, 1000);

    }, 1500);
  };

  const handleGoogleRegister = () => {
    toast("Google registration clicked!");
  };

  return (
    <>
      <Toaster position="top-right" />

      <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 flex items-center justify-center px-4 overflow-hidden">

        {/* Ambient blobs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-300/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-cyan-200/40 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Card */}
        <div className="relative w-full max-w-md backdrop-blur-xl bg-white/70 border border-white/30 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.3)] rounded-[2.25rem] p-10 animate-fadeScale">

          <h2 className="text-center text-4xl font-extrabold text-blue-700 mb-1">
            Create Account
          </h2>

          <p className="text-center text-gray-500 mb-7">
            Join the platform in seconds
          </p>

          {errors && (
            <p className="text-center text-red-500 mb-4 font-medium">
              {errors}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-200 bg-white
                           focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-200 bg-white
                           focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-12 pl-11 pr-11 rounded-xl border border-gray-200 bg-white
                           focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Confirm */}
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full h-12 pl-11 pr-11 rounded-xl border border-gray-200 bg-white
                           focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Role selector */}
            <div className="grid grid-cols-3 gap-3">
              {(["admin", "agent", "tenant"] as const).map(
                (role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleRole(role)}
                    className={`py-2 rounded-xl text-sm font-semibold transition-all
                      ${
                        formData.role === role
                          ? "bg-blue-600 text-white shadow-lg"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }
                    `}
                  >
                    {role.toUpperCase()}
                  </button>
                )
              )}
            </div>

            {/* Terms */}
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="w-5 h-5 accent-blue-600"
              />
              <span className="text-sm text-gray-700">
                I agree to the terms & conditions
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full h-12 rounded-xl font-semibold text-lg text-white
                bg-gradient-to-r from-blue-600 to-cyan-500
                hover:from-blue-700 hover:to-cyan-600 transition-all
                shadow-lg active:scale-95
                ${loading ? "opacity-70 cursor-not-allowed" : ""}
              `}
            >
              {loading ? "Registering..." : "Register"}
            </button>

            {/* Google */}
            <button
              type="button"
              onClick={handleGoogleRegister}
              className="w-full h-12 flex items-center justify-center gap-3 rounded-xl
                         border bg-white shadow hover:bg-gray-50 transition"
            >
              <FcGoogle size={22} />
              <span className="font-medium text-gray-700">
                Continue with Google
              </span>
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
