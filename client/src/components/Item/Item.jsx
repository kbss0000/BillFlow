import { useContext } from "react"
import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import { AppContext } from "../../context/AppContext"

const Item = ({ item }) => {
  const { addToCart } = useContext(AppContext)

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="card-premium p-4 group cursor-pointer"
      onClick={() => addToCart(item)}
    >
      {/* Image placeholder */}
      <div className="aspect-square rounded-xl bg-[#111111] mb-4 overflow-hidden flex items-center justify-center">
        {item.imgUrl ? (
          <img
            src={item.imgUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-xl bg-[#1f1f1f] flex items-center justify-center">
            <span className="text-[#525252] text-2xl font-display">
              {item.name?.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-medium truncate mb-1">{item.name}</h4>
          <p className="text-[#3b82f6] font-semibold">₹{item.price}</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-9 h-9 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center text-[#3b82f6] group-hover:bg-[#3b82f6] group-hover:text-white transition-all"
          onClick={(e) => {
            e.stopPropagation()
            addToCart(item)
          }}
        >
          <Plus className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default Item