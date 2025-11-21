import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast, Toaster } from "react-hot-toast";
import Footer from "./footer";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrors("Please enter email and password.");
      return;
    }

    setErrors("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Login successful!");
      console.log("Login data:", formData);
      setFormData({ email: "", password: "" });
    }, 1500);
  };

  const handleGoogleLogin = () => {
    toast("Google login clicked!");
    // Integrate actual Google OAuth here
  };

  return (
    <>
      <Toaster position="top-right" />
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 relative overflow-hidden transform hover:-translate-y-1 transition duration-500">
          <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
            Welcome Back
          </h2>

          {errors && (
            <p className="text-red-500 mb-4 text-center font-medium">{errors}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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

            {/* Forgot Password */}
            <div className="text-right">
              <a
                href="/forgot-password"
                className="text-blue-600 text-sm hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold text-white text-lg transition 
              ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500"}
              `}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-3 border rounded-xl bg-white shadow-sm hover:bg-gray-50 transition"
            >
              <FcGoogle size={22} />
              <span className="font-medium">Continue with Google</span>
            </button>
          </form>

          <p className="text-gray-500 mt-6 text-center text-sm">
            Don't have an account?{" "}
            <a
              href="/get-started"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
