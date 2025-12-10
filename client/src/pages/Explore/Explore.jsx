import { useContext, useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, ShoppingBag } from "lucide-react"
import { AppContext } from "../../context/AppContext.jsx"
import DisplayCategory from "../../components/DisplayCategory/DisplayCategory"
import DisplayItems from "../../components/DisplayItems/DisplayItems"
import CartItems from "../../components/CartItems/CartItems"
import CustomerForm from "../../components/CustomerForm/CustomerForm"
import CartSummary from "../../components/CartSummary/CartSummary"

const Explore = () => {
  const { categories, itemsData, cartItems } = useContext(AppContext)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [customerData, setCustomerData] = useState({
    customerName: "",
    phoneNumber: ""
  })

  const filteredItems = itemsData?.filter(item => {
    const matchesCategory = selectedCategory ? item.categoryId === selectedCategory : true
    const matchesSearch = item.name?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  }) || []

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-semibold text-white mb-2">New Order</h1>
        <p className="text-[#737373]">Create a new order by selecting items</p>
      </motion.div>

      <div className="flex gap-8">
        {/* Left Side - Menu */}
        <div className="flex-1">
          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex gap-4 mb-6"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#525252]" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-premium with-icon"
              />
            </div>
            <button className="btn-ghost flex items-center gap-2 px-6">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h3 className="text-sm font-medium text-[#737373] uppercase tracking-wider mb-4">
              Categories
            </h3>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedCategory === null
                  ? "bg-[#3b82f6] text-white"
                  : "bg-[#161616] text-[#a3a3a3] border border-[#262626] hover:border-[#3b82f6]/30"
                  }`}
              >
                All
              </button>
              <DisplayCategory
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>
          </motion.div>

          {/* Items Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-sm font-medium text-[#737373] uppercase tracking-wider mb-4">
              Menu Items
            </h3>
            {filteredItems.length > 0 ? (
              <DisplayItems items={filteredItems} />
            ) : (
              <div className="card-premium p-12 text-center">
                <div className="w-16 h-16 rounded-xl bg-[#111111] flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 text-[#525252]" />
                </div>
                <p className="text-[#737373] mb-1">No items found</p>
                <p className="text-sm text-[#525252]">Try adjusting your search or filters</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Right Side - Cart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="w-96 flex-shrink-0"
        >
          <div className="card-premium p-6 sticky top-8">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#262626]">
              <div className="w-10 h-10 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-[#3b82f6]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Current Order</h3>
                <p className="text-sm text-[#525252]">{cartItems.length} items</p>
              </div>
            </div>

            {/* Customer Form */}
            <div className="mb-6">
              <CustomerForm
                customerData={customerData}
                setCustomerData={setCustomerData}
              />
            </div>

            {/* Cart Items */}
            <div className="mb-6 max-h-64 overflow-y-auto">
              <CartItems />
            </div>

            {/* Cart Summary */}
            <CartSummary customerData={customerData} />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Explore