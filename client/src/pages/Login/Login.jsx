import { useState, useContext } from "react"
import { motion } from "framer-motion"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { login } from "../../Service/AuthService.js"
import { AppContext } from "../../context/AppContext.jsx"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const Login = () => {
  const { setAuthData } = useContext(AppContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      console.log("Attempting login with:", { email, password })
      const response = await login({ email, password })
      console.log("Login response:", response)
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("role", response.data.role)
        setAuthData(response.data.token, response.data.role)
        toast.success("Login successful!")
        navigate("/dashboard")
      }
    } catch (error) {
      console.error("Login failed:", error)
      console.error("Error response:", error.response)
      const errorMsg = error.response?.data?.message || error.response?.data || error.message || "Invalid credentials"
      toast.error(typeof errorMsg === 'string' ? errorMsg : "Login failed - check console")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-black">
      {/* Full Background Image using img tag */}
      <img
        src="/images/2-matte-black-hands.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Reduced Dark Overlay for better background visibility */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Subtle Blue Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-[#3b82f6]/5" />

      {/* Login Card - Centered */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Glass Card */}
        <div className="backdrop-blur-xl bg-black/50 border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Logo & Brand */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl overflow-hidden mb-4 shadow-lg shadow-[#3b82f6]/20"
            >
              <img src="/images/billflow-logo.png" alt="BillFlow" className="w-full h-full object-cover" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Bill<span className="text-[#3b82f6]">Flow</span>
            </h1>
            <p className="text-white/60 text-sm">Sign in to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmitHandler} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#3b82f6]/50 focus:bg-white/10 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#3b82f6]/50 focus:bg-white/10 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white font-semibold rounded-xl shadow-lg shadow-[#3b82f6]/25 hover:shadow-[#3b82f6]/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-xs text-white/40 text-center mb-3">Demo Credentials</p>
            <div className="flex gap-3 justify-center">
              <button
                type="button"
                onClick={() => {
                  setEmail("admin@example.com")
                  setPassword("admin123")
                }}
                className="px-4 py-2 text-xs bg-white/5 border border-white/10 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all"
              >
                Use Admin Login
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <p className="text-center text-white/30 text-sm mt-6">
          Premium Billing Solution
        </p>
      </motion.div>
    </div>
  )
}

export default Login