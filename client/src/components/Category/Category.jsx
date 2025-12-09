import { motion } from "framer-motion"

const Category = ({ category, selectedCategory, setSelectedCategory }) => {
  const isSelected = selectedCategory === category.categoryId

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setSelectedCategory(category.categoryId)}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${isSelected
          ? "bg-[#d4a574] text-[#0a0a0a] shadow-lg shadow-[#d4a574]/20"
          : "bg-[#161616] text-[#a3a3a3] border border-[#262626] hover:border-[#d4a574]/30 hover:text-white"
        }`}
    >
      {category.name}
    </motion.button>
  )
}

export default Category