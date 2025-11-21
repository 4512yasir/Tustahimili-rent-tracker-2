import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserShield,
  FaUserTie,
  FaHome,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast, Toaster } from "react-hot-toast";
import Footer from "./footer";

type FormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  agree: boolean;
};

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    agree: false,
  });

  const [errors, setErrors] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    const { name, value, type } = target;
    const checked = type === "checkbox" ? (target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword || !formData.role) {
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
      toast.error("You must agree to the terms & conditions.");
      return;
    }

    setErrors("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Registration successful!");
      console.log("Registration data:", formData);
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        agree: false,
      });
    }, 1500);
  };

  const handleGoogleRegister = () => {
    toast("Google registration clicked!");
    // Implement actual Google OAuth here
  };

  return (
    <>
      <Toaster position="top-right" />
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 relative overflow-hidden transform hover:-translate-y-1 transition duration-500">
          <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
            Create Your Account
          </h2>

          {errors && <p className="text-red-500 mb-4 text-center font-medium">{errors}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Email */}
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

            {/* Password */}
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

            {/* Confirm Password */}
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Re-type Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Role Selection with Icons */}
            <div className="relative">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="agent">Agent</option>
                <option value="tenant">Tenant</option>
              </select>
              <div className="absolute right-3 top-3 text-gray-400">
                {formData.role === "admin" && <FaUserShield />}
                {formData.role === "agent" && <FaUserTie />}
                {formData.role === "tenant" && <FaHome />}
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="h-5 w-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">I agree to the terms & conditions</span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-500 transition text-lg ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Registering..." : "Register"}
            </button>

            {/* Google Register */}
            <button
              type="button"
              onClick={handleGoogleRegister}
              className="w-full flex items-center justify-center gap-3 py-3 border rounded-xl bg-white shadow-sm hover:bg-gray-50 transition"
            >
              <FcGoogle size={22} />
              <span className="font-medium">Continue with Google</span>
            </button>
          </form>

          <p className="text-gray-500 mt-4 text-center text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 font-semibold hover:underline">
              Login
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
