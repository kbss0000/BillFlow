import { useContext, useState } from "react"
import { motion } from "framer-motion"
import { Search, Edit2, Trash2, Package } from "lucide-react"
import { AppContext } from "../../context/AppContext"
import { deleteItem } from "../../Service/ItemService.js"
import toast from "react-hot-toast"

const ItemList = () => {
    const { itemsData, setItemsData } = useContext(AppContext)
    const [searchQuery, setSearchQuery] = useState("")

    const filteredItems = itemsData?.filter(item =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || []

    const handleDelete = async (itemId) => {
        if (!confirm("Are you sure you want to delete this item?")) return

        try {
            await deleteItem(itemId)
            setItemsData(prev => prev.filter(item => item.itemId !== itemId))
            toast.success("Item deleted successfully")
        } catch (error) {
            console.error("Failed to delete item:", error)
            toast.error("Failed to delete item")
        }
    }

    return (
        <div>
            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#525252]" />
                <input
                    type="text"
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-premium with-icon"
                />
            </div>

            {/* Items Grid */}
            {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredItems.map((item, idx) => (
                        <motion.div
                            key={item.itemId || idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex items-center gap-4 p-4 rounded-xl bg-[#111111] border border-[#1f1f1f] hover:border-[#262626] transition-all group"
                        >
                            {/* Image */}
                            <div className="w-14 h-14 rounded-xl bg-[#1f1f1f] flex items-center justify-center flex-shrink-0">
                                <span className="text-[#525252] text-lg font-display">
                                    {item.name?.charAt(0)}
                                </span>
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <h4 className="text-white font-medium truncate">{item.name}</h4>
                                <p className="text-[#d4a574] text-sm font-medium">₹{item.price}</p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-[#525252] hover:text-[#d4a574] hover:bg-[#d4a574]/10 transition-all">
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(item.itemId)}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#525252] hover:text-[#f87171] hover:bg-[#f87171]/10 transition-all"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-xl bg-[#111111] flex items-center justify-center mb-4">
                        <Package className="w-8 h-8 text-[#525252]" />
                    </div>
                    <p className="text-[#737373] mb-1">No items found</p>
                    <p className="text-sm text-[#525252]">Add your first item using the form</p>
                </div>
            )}
        </div>
    )
}

export default ItemList