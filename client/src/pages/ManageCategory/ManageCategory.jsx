import { motion } from "framer-motion"
import CategoryForm from "../../components/CategoryForm/CategoryForm"
import CategoryList from "../../components/CategoryList/CategoryList"

const ManageCategory = () => {
    return (
        <div className="min-h-screen p-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-semibold text-white mb-2">Manage Categories</h1>
                <p className="text-[#737373]">Organize your menu with categories</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Category Form */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-1"
                >
                    <div className="card-premium p-6 sticky top-8">
                        <h3 className="text-lg font-semibold text-white mb-6">Add New Category</h3>
                        <CategoryForm />
                    </div>
                </motion.div>

                {/* Category List */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2"
                >
                    <div className="card-premium p-6">
                        <h3 className="text-lg font-semibold text-white mb-6">All Categories</h3>
                        <CategoryList />
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default ManageCategory