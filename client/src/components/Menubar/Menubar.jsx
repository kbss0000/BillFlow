import { NavLink, useNavigate } from "react-router-dom"
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  FolderOpen,
  Users,
  Clock,
  LogOut,
  Receipt,
  Menu,
  X
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useSidebar } from "../../context/SidebarContext.jsx"

const Menubar = () => {
  const navigate = useNavigate()
  const { isExpanded, toggleSidebar } = useSidebar()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    navigate("/login")
  }

  const menuItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/explore", icon: ShoppingBag, label: "New Order" },
    { path: "/order-history", icon: Clock, label: "Orders" },
    { path: "/manage-items", icon: Package, label: "Items" },
    { path: "/manage-category", icon: FolderOpen, label: "Categories" },
    { path: "/manage-users", icon: Users, label: "Users" },
  ]

  return (
    <motion.aside
      initial={{ width: 80 }}
      animate={{ width: isExpanded ? 256 : 80 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 h-screen backdrop-blur-xl bg-black/40 border-r border-white/10 flex flex-col z-50 overflow-hidden"
    >
      {/* Logo & Toggle */}
      <div className="p-4 border-b border-white/10">
        <div className={`flex items-center ${isExpanded ? 'justify-between' : 'flex-col gap-3'}`}>
          {/* Logo - always visible */}
          <div className={`flex items-center gap-3 ${isExpanded ? '' : 'flex-col'}`}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4a574] to-[#8b6914] flex items-center justify-center shadow-lg shadow-[#d4a574]/30 flex-shrink-0">
              <Receipt className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <AnimatePresence mode="wait">
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h1 className="text-lg font-bold tracking-tight text-white whitespace-nowrap">
                    Bill<span className="text-[#d4a574]">Flow</span>
                  </h1>
                  <p className="text-[9px] text-white/40 uppercase tracking-widest">
                    Billing System
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Toggle button */}
          <button
            onClick={toggleSidebar}
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all duration-200 flex-shrink-0"
          >
            {isExpanded ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.path}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${isExpanded ? '' : 'justify-center'
                  } ${isActive
                    ? "bg-[#d4a574]/20 text-[#d4a574]"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                  }`
                }
                title={!isExpanded ? item.label : undefined}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <AnimatePresence mode="wait">
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm font-medium whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </NavLink>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Logout Section */}
      <div className="p-3 border-t border-white/10">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-white/60 hover:text-[#f87171] hover:bg-[#f87171]/10 transition-all duration-200 ${isExpanded ? '' : 'justify-center'
            }`}
          title={!isExpanded ? "Logout" : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-medium whitespace-nowrap overflow-hidden"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  )
}

export default Menubar