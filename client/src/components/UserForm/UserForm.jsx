import { useState } from "react"
import { UserPlus } from "lucide-react"
import toast from "react-hot-toast"
import { addUser } from "../../Service/UserService.js"

const UserForm = () => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "USER"
    })

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.name || !formData.email || !formData.password) {
            toast.error("Please fill all required fields")
            return
        }

        setLoading(true)
        try {
            await addUser(formData)
            toast.success("User created successfully!")
            setFormData({ name: "", email: "", password: "", role: "USER" })
        } catch (error) {
            console.error("Failed to create user:", error)
            toast.error("Failed to create user")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
                <label className="block text-xs font-medium text-[#525252] uppercase tracking-wider mb-2">
                    Full Name *
                </label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className="input-premium"
                />
            </div>

            {/* Email */}
            <div>
                <label className="block text-xs font-medium text-[#525252] uppercase tracking-wider mb-2">
                    Email Address *
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="user@example.com"
                    className="input-premium"
                />
            </div>

            {/* Password */}
            <div>
                <label className="block text-xs font-medium text-[#525252] uppercase tracking-wider mb-2">
                    Password *
                </label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="input-premium"
                />
            </div>

            {/* Role */}
            <div>
                <label className="block text-xs font-medium text-[#525252] uppercase tracking-wider mb-2">
                    Role
                </label>
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="input-premium"
                >
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                </select>
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className="w-full btn-premium py-3 flex items-center justify-center gap-2 disabled:opacity-50"
            >
                {loading ? (
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                ) : (
                    <>
                        <UserPlus className="w-5 h-5" />
                        Add User
                    </>
                )}
            </button>
        </form>
    )
}

export default UserForm