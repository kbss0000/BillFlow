import { useContext } from "react"
import { motion } from "framer-motion"
import { Edit2, Trash2, FolderOpen } from "lucide-react"
import { AppContext } from "../../context/AppContext"
import { deleteCategory } from "../../Service/CategoryService.js"
import toast from "react-hot-toast"

const CategoryList = () => {
    const { categories, setCategories } = useContext(AppContext)

    const handleDelete = async (categoryId) => {
        if (!confirm("Are you sure you want to delete this category?")) return

        try {
            await deleteCategory(categoryId)
            setCategories(prev => prev.filter(cat => cat.categoryId !== categoryId))
            toast.success("Category deleted successfully")
        } catch (error) {
            console.error("Failed to delete category:", error)
            toast.error("Failed to delete category")
        }
    }

    if (!categories || categories.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-xl bg-[#111111] flex items-center justify-center mb-4">
                    <FolderOpen className="w-8 h-8 text-[#525252]" />
                </div>
                <p className="text-[#737373] mb-1">No categories found</p>
                <p className="text-sm text-[#525252]">Add your first category using the form</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((category, idx) => (
                <motion.div
                    key={category.categoryId || idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-[#111111] border border-[#1f1f1f] hover:border-[#262626] transition-all group"
                >
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-[#d4a574]/10 flex items-center justify-center flex-shrink-0">
                        <FolderOpen className="w-6 h-6 text-[#d4a574]" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium truncate">{category.name}</h4>
                        <p className="text-[#525252] text-sm truncate">{category.description || "No description"}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-[#525252] hover:text-[#d4a574] hover:bg-[#d4a574]/10 transition-all">
                            <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => handleDelete(category.categoryId)}
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

export default CategoryList