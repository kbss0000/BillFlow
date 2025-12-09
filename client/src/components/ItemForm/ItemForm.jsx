import { useState, useContext } from "react"
import { Upload, Plus } from "lucide-react"
import toast from "react-hot-toast"
import { AppContext } from "../../context/AppContext"
import { addItem } from "../../Service/ItemService.js"

const ItemForm = () => {
    const { categories, setItemsData } = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        categoryId: ""
    })

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.name || !formData.price || !formData.categoryId) {
            toast.error("Please fill all required fields")
            return
        }

        setLoading(true)
        try {
            const response = await addItem(formData)
            setItemsData(prev => [...prev, response.data])
            toast.success("Item created successfully!")
            setFormData({ name: "", price: "", description: "", categoryId: "" })
        } catch (error) {
            console.error("Failed to create item:", error)
            toast.error("Failed to create item")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Image Upload */}
            <div className="flex justify-center">
                <div className="w-24 h-24 rounded-xl border-2 border-dashed border-[#262626] flex flex-col items-center justify-center gap-2 text-[#525252] hover:border-[#d4a574]/30 hover:text-[#d4a574] transition-all cursor-pointer">
                    <Upload className="w-6 h-6" />
                    <span className="text-xs">Upload</span>
                </div>
            </div>

            {/* Name */}
            <div>
                <label className="block text-xs font-medium text-[#525252] uppercase tracking-wider mb-2">
                    Item Name *
                </label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter item name"
                    className="input-premium"
                />
            </div>

            {/* Price */}
            <div>
                <label className="block text-xs font-medium text-[#525252] uppercase tracking-wider mb-2">
                    Price (₹) *
                </label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="input-premium"
                />
            </div>

            {/* Category */}
            <div>
                <label className="block text-xs font-medium text-[#525252] uppercase tracking-wider mb-2">
                    Category *
                </label>
                <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    className="input-premium"
                >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                        <option key={cat.categoryId} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Description */}
            <div>
                <label className="block text-xs font-medium text-[#525252] uppercase tracking-wider mb-2">
                    Description
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter item description"
                    rows={3}
                    className="input-premium resize-none"
                />
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className="w-full btn-premium py-3 flex items-center justify-center gap-2 disabled:opacity-50"
            >
                {loading ? (
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                ) : (
                    <>
                        <Plus className="w-5 h-5" />
                        Add Item
                    </>
                )}
            </button>
        </form>
    )
}

export default ItemForm