import { motion } from "framer-motion"
import ItemForm from "../../components/ItemForm/ItemForm"
import ItemList from "../../components/ItemList/ItemList"

const ManageItems = () => {
    return (
        <div className="min-h-screen p-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-semibold text-white mb-2">Manage Items</h1>
                <p className="text-[#737373]">Add, edit, and organize your menu items</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Item Form */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-1"
                >
                    <div className="card-premium p-6 sticky top-8">
                        <h3 className="text-lg font-semibold text-white mb-6">Add New Item</h3>
                        <ItemForm />
                    </div>
                </motion.div>

                {/* Item List */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2"
                >
                    <div className="card-premium p-6">
                        <h3 className="text-lg font-semibold text-white mb-6">All Items</h3>
                        <ItemList />
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default ManageItems