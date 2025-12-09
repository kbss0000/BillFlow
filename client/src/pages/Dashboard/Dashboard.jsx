import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import {
  TrendingUp,
  ShoppingCart,
  DollarSign,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from "lucide-react"
import { fetchDashboardData } from "../../Service/Dashboard.js"
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { DashboardSkeleton } from "../../components/Skeletons/Skeletons.jsx"
import { TiltCard, StaggerContainer, StaggerItem } from "../../components/Animations/Animations.jsx"

// Animated number component
const AnimatedNumber = ({ value, prefix = "", suffix = "" }) => {
  const [displayValue, setDisplayValue] = useState(0)
  const countRef = useRef(null)
  const startTimeRef = useRef(null)

  useEffect(() => {
    const numValue = typeof value === 'number' ? value : parseFloat(value) || 0
    if (numValue === 0) {
      setDisplayValue(0)
      return
    }

    const duration = 2000
    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1)
      const easeOutExpo = 1 - Math.pow(2, -10 * progress)
      setDisplayValue(Math.floor(easeOutExpo * numValue))

      if (progress < 1) {
        countRef.current = requestAnimationFrame(animate)
      } else {
        setDisplayValue(numValue)
      }
    }

    startTimeRef.current = null
    countRef.current = requestAnimationFrame(animate)
    return () => countRef.current && cancelAnimationFrame(countRef.current)
  }, [value])

  return <span>{prefix}{displayValue.toLocaleString()}{suffix}</span>
}

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    todaySales: 0,
    todayOrderCount: 0,
    recentOrders: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const response = await fetchDashboardData()
        setDashboardData(response.data)
      } catch (error) {
        console.error("Failed to load dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }
    loadDashboardData()
  }, [])

  // Sample chart data
  const chartData = [
    { name: "Mon", value: 400 },
    { name: "Tue", value: 300 },
    { name: "Wed", value: 600 },
    { name: "Thu", value: 800 },
    { name: "Fri", value: 500 },
    { name: "Sat", value: 900 },
    { name: "Sun", value: 700 },
  ]

  const stats = [
    {
      label: "Today's Revenue",
      value: dashboardData.todaySales || 0,
      prefix: "₹",
      icon: DollarSign,
      change: "+12.5%",
      positive: true
    },
    {
      label: "Total Orders",
      value: dashboardData.todayOrderCount || 0,
      icon: ShoppingCart,
      change: "+8.2%",
      positive: true
    },
    {
      label: "Avg Order Value",
      value: dashboardData.todayOrderCount > 0
        ? Math.round(dashboardData.todaySales / dashboardData.todayOrderCount)
        : 0,
      prefix: "₹",
      icon: TrendingUp,
      change: "+5.4%",
      positive: true
    },
    {
      label: "Active Items",
      value: 24,
      icon: Package,
      change: "-2.1%",
      positive: false
    }
  ]

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#161616] border border-[#262626] rounded-lg px-4 py-2 shadow-xl">
          <p className="text-[#d4a574] font-semibold">₹{payload[0].value}</p>
        </div>
      )
    }
    return null
  }

  if (loading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="min-h-screen p-8 relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-semibold text-white mb-2">Dashboard</h1>
        <p className="text-[#737373]">Welcome back! Here's what's happening today.</p>
      </motion.div>

      {/* Stats Grid with Stagger Animation */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10" delay={0.1}>
        {stats.map((stat) => (
          <StaggerItem key={stat.label}>
            <TiltCard className="card-premium p-6 group h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#d4a574]/10 flex items-center justify-center group-hover:bg-[#d4a574]/20 transition-colors">
                  <stat.icon className="w-6 h-6 text-[#d4a574]" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${stat.positive ? "text-[#4ade80]" : "text-[#f87171]"}`}>
                  {stat.positive ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {stat.change}
                </div>
              </div>
              <p className="text-[#737373] text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-semibold text-white">
                <AnimatedNumber value={stat.value} prefix={stat.prefix || ""} />
              </p>
            </TiltCard>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 card-premium p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Revenue Overview</h3>
              <p className="text-sm text-[#737373]">Weekly performance</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#737373]">
              <div className="w-2 h-2 rounded-full bg-[#d4a574]" />
              Revenue
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4a574" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#d4a574" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#525252', fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#525252', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#d4a574"
                  strokeWidth={2}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card-premium p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-6">Quick Stats</h3>
          <div className="space-y-4">
            {[
              { label: "Pending Orders", value: 3, color: "#fbbf24" },
              { label: "Completed Today", value: dashboardData.todayOrderCount || 0, color: "#4ade80" },
              { label: "Total Revenue", value: dashboardData.todaySales || 0, prefix: "₹", color: "#d4a574" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + idx * 0.1 }}
                className="flex items-center justify-between p-4 rounded-xl bg-[#111111] border border-[#1f1f1f] hover:border-[#262626] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-[#a3a3a3]">{item.label}</span>
                </div>
                <span className="text-sm font-semibold text-white">
                  <AnimatedNumber value={item.value} prefix={item.prefix || ""} />
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card-premium p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Recent Orders</h3>
            <p className="text-sm text-[#737373]">Latest transactions</p>
          </div>
          <button className="btn-ghost text-sm py-2 px-4">View All</button>
        </div>

        {dashboardData.recentOrders?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1f1f1f]">
                  <th className="text-left py-4 text-xs font-medium text-[#525252] uppercase tracking-wider">Order ID</th>
                  <th className="text-left py-4 text-xs font-medium text-[#525252] uppercase tracking-wider">Customer</th>
                  <th className="text-left py-4 text-xs font-medium text-[#525252] uppercase tracking-wider">Amount</th>
                  <th className="text-left py-4 text-xs font-medium text-[#525252] uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.recentOrders.map((order, idx) => (
                  <motion.tr
                    key={idx}
                    className="border-b border-[#1f1f1f] last:border-0 hover:bg-white/5 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + idx * 0.05 }}
                  >
                    <td className="py-4 text-sm text-white font-medium">{order.orderId}</td>
                    <td className="py-4 text-sm text-[#a3a3a3]">{order.customerName}</td>
                    <td className="py-4 text-sm text-[#d4a574] font-medium">₹{order.grandTotal}</td>
                    <td className="py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#4ade80]/10 text-[#4ade80]">
                        Completed
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-xl bg-[#111111] flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-[#525252]" />
            </div>
            <p className="text-[#737373] mb-1">No orders yet</p>
            <p className="text-sm text-[#525252]">Orders will appear here once customers start purchasing</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Dashboard