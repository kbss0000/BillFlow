import { useContext, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Edit2, Trash2, Package, X, Save, Upload } from "lucide-react"
import { AppContext } from "../../context/AppContext"
import { deleteItem, updateItem } from "../../Service/ItemService.js"
import toast from "react-hot-toast"

const ItemList = () => {
    const { itemsData, setItemsData, categories } = useContext(AppContext)
    const [searchQuery, setSearchQuery] = useState("")
    const [editingItem, setEditingItem] = useState(null)
    const [editForm, setEditForm] = useState({ name: "", price: "", description: "", categoryId: "" })
    const [editFile, setEditFile] = useState(null)
    const [editPreview, setEditPreview] = useState(null)
    const [loading, setLoading] = useState(false)
    const fileInputRef = useRef(null)

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

    const handleEdit = (item) => {
        setEditingItem(item.itemId)
        setEditForm({
            name: item.name || "",
            price: item.price || "",
            description: item.description || "",
            categoryId: item.categoryId || ""
        })
        setEditPreview(item.imgUrl || null)
        setEditFile(null)
    }

    const handleCancelEdit = () => {
        setEditingItem(null)
        setEditForm({ name: "", price: "", description: "", categoryId: "" })
        setEditFile(null)
        setEditPreview(null)
    }

    const handleEditFileChange = (e) => {
        const selectedFile = e.target.files[0]
        if (selectedFile) {
            setEditFile(selectedFile)
            const reader = new FileReader()
            reader.onloadend = () => {
                setEditPreview(reader.result)
            }
            reader.readAsDataURL(selectedFile)
        }
    }

    const handleSaveEdit = async () => {
        if (!editForm.name.trim() || !editForm.price || !editForm.categoryId) {
            toast.error("Name, price, and category are required")
            return
        }

        setLoading(true)
        try {
            const response = await updateItem(editingItem, editForm, editFile)
            setItemsData(prev => prev.map(item =>
                item.itemId === editingItem ? response.data : item
            ))
            toast.success("Item updated successfully")
            handleCancelEdit()
        } catch (error) {
            console.error("Failed to update item:", error)
            toast.error("Failed to update item")
        } finally {
            setLoading(false)
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
                            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-[#1f1f1f]">
                                {item.imgUrl ? (
                                    <img
                                        src={item.imgUrl}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="text-[#525252] text-lg font-display">
                                            {item.name?.charAt(0)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <h4 className="text-white font-medium truncate">{item.name}</h4>
                                <p className="text-[#3b82f6] text-sm font-medium">₹{item.price}</p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#525252] hover:text-[#3b82f6] hover:bg-[#3b82f6]/10 transition-all"
                                >
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

            {/* Edit Modal */}
            <AnimatePresence>
                {editingItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={handleCancelEdit}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="card-premium p-6 w-full max-w-md"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-white">Edit Item</h3>
                                <button
                                    onClick={handleCancelEdit}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#525252] hover:text-white hover:bg-[#262626] transition-all"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Image Upload */}
                            <div className="flex justify-center mb-6">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleEditFileChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-24 h-24 rounded-xl border-2 border-dashed border-[#262626] flex flex-col items-center justify-center gap-2 text-[#525252] hover:border-[#3b82f6]/30 hover:text-[#3b82f6] transition-all cursor-pointer overflow-hidden"
                                >
                                    {editPreview ? (
                                        <img src={editPreview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <>
                                            <Upload className="w-6 h-6" />
                                            <span className="text-xs">Upload</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Name */}
                            <div className="mb-4">
                                <label className="block text-xs font-medium text-[#525252] uppercase tracking-wider mb-2">
                                    Item Name *
                                </label>
                                <input
                                    type="text"
                                    value={editForm.name}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="Enter item name"
                                    className="input-premium"
                                />
                            </div>

                            {/* Price */}
                            <div className="mb-4">
                                <label className="block text-xs font-medium text-[#525252] uppercase tracking-wider mb-2">
                                    Price (₹) *
                                </label>
                                <input
                                    type="number"
                                    value={editForm.price}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, price: e.target.value }))}
                                    placeholder="0.00"
                                    className="input-premium"
                                />
                            </div>

                            {/* Category */}
                            <div className="mb-4">
                                <label className="block text-xs font-medium text-[#525252] uppercase tracking-wider mb-2">
                                    Category *
                                </label>
                                <select
                                    value={editForm.categoryId}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, categoryId: e.target.value }))}
                                    className="input-premium"
                                >
                                    <option value="">Select category</option>
                                    {categories?.map(cat => (
                                        <option key={cat.categoryId} value={cat.categoryId}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <label className="block text-xs font-medium text-[#525252] uppercase tracking-wider mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={editForm.description}
                                    onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                                    placeholder="Enter item description"
                                    rows={3}
                                    className="input-premium resize-none"
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3">
                                <button
                                    onClick={handleCancelEdit}
                                    className="flex-1 btn-ghost py-3"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveEdit}
                                    disabled={loading}
                                    className="flex-1 btn-premium py-3 flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                    ) : (
                                        <>
                                            <Save className="w-5 h-5" />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ItemList