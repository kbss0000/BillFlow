import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Search, Calendar, Filter, Clock, CheckCircle, XCircle } from "lucide-react"
import { fetchOrders } from "../../Service/OrderService.js"

const OrderHistory = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await fetchOrders()
        setOrders(response.data || [])
      } catch (error) {
        console.error("Failed to load orders:", error)
      } finally {
        setLoading(false)
      }
    }
    loadOrders()
  }, [])

  const filteredOrders = orders.filter(order =>
    order.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.orderId?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const stats = [
    { label: "Total Orders", value: orders.length, icon: Clock, color: "#d4a574" },
    { label: "Completed", value: orders.filter(o => o.status === 1).length, icon: CheckCircle, color: "#4ade80" },
    { label: "Pending", value: orders.filter(o => o.status === 0).length, icon: XCircle, color: "#fbbf24" },
  ]

  const getStatusBadge = (status) => {
    const statusMap = {
      0: { label: "Pending", class: "bg-[#fbbf24]/10 text-[#fbbf24]" },
      1: { label: "Completed", class: "bg-[#4ade80]/10 text-[#4ade80]" },
      2: { label: "Cancelled", class: "bg-[#f87171]/10 text-[#f87171]" }
    }
    const s = statusMap[status] || statusMap[0]
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${s.class}`}>
        {s.label}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#d4a574] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-semibold text-white mb-2">Order History</h1>
        <p className="text-[#737373]">View and manage all your orders</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card-premium p-5"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
              <div>
                <p className="text-[#737373] text-sm">{stat.label}</p>
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search & Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-4 mb-6"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#525252]" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-premium with-icon"
          />
        </div>
        <button className="btn-ghost flex items-center gap-2 px-6">
          <Calendar className="w-4 h-4" />
          Date
        </button>
        <button className="btn-ghost flex items-center gap-2 px-6">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </motion.div>

      {/* Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card-premium overflow-hidden"
      >
        {filteredOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1f1f1f]">
                  <th className="text-left px-6 py-4 text-xs font-medium text-[#525252] uppercase tracking-wider">Order ID</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-[#525252] uppercase tracking-wider">Customer</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-[#525252] uppercase tracking-wider">Phone</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-[#525252] uppercase tracking-wider">Amount</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-[#525252] uppercase tracking-wider">Payment</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-[#525252] uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-[#525252] uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, idx) => (
                  <motion.tr
                    key={order.orderId || idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-[#1f1f1f] last:border-0 hover:bg-[#111111]/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-[#d4a574] font-medium">{order.orderId}</td>
                    <td className="px-6 py-4 text-sm text-white">{order.customerName}</td>
                    <td className="px-6 py-4 text-sm text-[#a3a3a3]">{order.phoneNumber || "-"}</td>
                    <td className="px-6 py-4 text-sm text-white font-medium">₹{order.grandTotal}</td>
                    <td className="px-6 py-4 text-sm text-[#a3a3a3]">{order.paymentMethod}</td>
                    <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                    <td className="px-6 py-4 text-sm text-[#525252]">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "-"}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-xl bg-[#111111] flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-[#525252]" />
            </div>
            <p className="text-[#737373] mb-1">No orders found</p>
            <p className="text-sm text-[#525252]">Orders will appear here once created</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default OrderHistory