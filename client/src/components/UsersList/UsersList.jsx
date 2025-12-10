import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Edit2, Trash2, Users, Shield, User } from "lucide-react"
import { fetchUsers, deleteUser } from "../../Service/UserService.js"
import toast from "react-hot-toast"

const UsersList = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const response = await fetchUsers()
                setUsers(response.data || [])
            } catch (error) {
                console.error("Failed to load users:", error)
            } finally {
                setLoading(false)
            }
        }
        loadUsers()
    }, [])

    const handleDelete = async (userId) => {
        if (!confirm("Are you sure you want to delete this user?")) return

        try {
            await deleteUser(userId)
            setUsers(prev => prev.filter(user => user.userId !== userId))
            toast.success("User deleted successfully")
        } catch (error) {
            console.error("Failed to delete user:", error)
            toast.error("Failed to delete user")
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="w-6 h-6 border-2 border-[#3b82f6] border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    if (!users || users.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-xl bg-[#111111] flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-[#525252]" />
                </div>
                <p className="text-[#737373] mb-1">No users found</p>
                <p className="text-sm text-[#525252]">Add your first user using the form</p>
            </div>
        )
    }

    return (
        <div className="space-y-3">
            {users.map((user, idx) => (
                <motion.div
                    key={user.userId || idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-[#111111] border border-[#1f1f1f] hover:border-[#262626] transition-all group"
                >
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3b82f6]/20 to-[#3b82f6]/5 flex items-center justify-center flex-shrink-0">
                        <span className="text-[#3b82f6] text-lg font-semibold">
                            {user.name?.charAt(0).toUpperCase()}
                        </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <h4 className="text-white font-medium truncate">{user.name}</h4>
                            {user.role === "ADMIN" && (
                                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#3b82f6]/10 text-[#3b82f6]">
                                    <Shield className="w-3 h-3" />
                                    <span className="text-xs font-medium">Admin</span>
                                </div>
                            )}
                        </div>
                        <p className="text-[#525252] text-sm truncate">{user.email}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-[#525252] hover:text-[#3b82f6] hover:bg-[#3b82f6]/10 transition-all">
                            <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => handleDelete(user.userId)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#525252] hover:text-[#f87171] hover:bg-[#f87171]/10 transition-all"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

export default UsersList