import { motion } from "framer-motion"
import UserForm from "../../components/UserForm/UserForm"
import UsersList from "../../components/UsersList/UsersList"

const ManageUsers = () => {
    return (
        <div className="min-h-screen p-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-semibold text-white mb-2">Manage Users</h1>
                <p className="text-[#737373]">Add and manage staff accounts</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* User Form */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-1"
                >
                    <div className="card-premium p-6 sticky top-8">
                        <h3 className="text-lg font-semibold text-white mb-6">Add New User</h3>
                        <UserForm />
                    </div>
                </motion.div>

                {/* Users List */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2"
                >
                    <div className="card-premium p-6">
                        <h3 className="text-lg font-semibold text-white mb-6">All Users</h3>
                        <UsersList />
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default ManageUsers