import { motion } from "framer-motion"

const Category = ({ category, selectedCategory, setSelectedCategory }) => {
  const isSelected = selectedCategory === category.categoryId

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setSelectedCategory(category.categoryId)}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${isSelected
        ? "bg-[#3b82f6] text-white shadow-lg shadow-[#3b82f6]/20"
        : "bg-[#161616] text-[#a3a3a3] border border-[#262626] hover:border-[#3b82f6]/30 hover:text-white"
        }`}
    >
      {category.name}
    </motion.button>
  )
}

export default Category