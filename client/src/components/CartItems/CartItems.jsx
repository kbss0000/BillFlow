import { useContext } from "react"
import { Minus, Plus, X } from "lucide-react"
import { AppContext } from "../../context/AppContext"

const CartItems = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(AppContext)

  if (cartItems.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-[#525252] text-sm">No items in cart</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {cartItems.map((item, index) => (
        <div
          key={item.itemId || index}
          className="flex items-center gap-3 p-3 rounded-xl bg-[#111111] border border-[#1f1f1f]"
        >
          {/* Image */}
          <div className="w-12 h-12 rounded-lg bg-[#1f1f1f] flex items-center justify-center flex-shrink-0">
            <span className="text-[#525252] text-sm font-display">
              {item.name?.charAt(0)}
            </span>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h4 className="text-white text-sm font-medium truncate">{item.name}</h4>
            <p className="text-[#3b82f6] text-sm">\u20b9{item.price}</p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.itemId, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="w-7 h-7 rounded-lg bg-[#1f1f1f] flex items-center justify-center text-[#a3a3a3] hover:text-white hover:bg-[#262626] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-white text-sm font-medium w-6 text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
              className="w-7 h-7 rounded-lg bg-[#1f1f1f] flex items-center justify-center text-[#a3a3a3] hover:text-white hover:bg-[#262626] transition-all"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={() => removeFromCart(item.itemId)}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#525252] hover:text-[#f87171] hover:bg-[#f87171]/10 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}

export default CartItems