import Menubar from "./components/Menubar/Menubar.jsx";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import ManageCategory from "./pages/ManageCategory/ManageCategory.jsx";
import ManageUsers from "./pages/ManageUsers/ManageUsers.jsx";
import ManageItems from "./pages/ManageItems/ManageItems.jsx";
import Explore from "./pages/Explore/Explore.jsx";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login/Login.jsx";
import OrderHistory from "./pages/OrderHistory/OrderHistory.jsx";
import { useContext } from "react";
import { AppContext } from "./context/AppContext.jsx";
import { useSidebar } from "./context/SidebarContext.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";

const App = () => {
    const location = useLocation();
    const { auth } = useContext(AppContext);
    const { isExpanded } = useSidebar();

    const LoginRoute = ({ element }) => {
        if (auth.token) {
            return <Navigate to="/dashboard" replace />;
        }
        return element;
    }

    const ProtectedRoute = ({ element, allowedRoles }) => {
        if (!auth.token) {
            return <Navigate to="/login" replace />;
        }

        // Check role - accept both "ADMIN" and "ROLE_ADMIN" formats
        if (allowedRoles) {
            const userRole = auth.role;
            const hasAccess = allowedRoles.some(role =>
                role === userRole ||
                role === `ROLE_${userRole}` ||
                `ROLE_${role}` === userRole
            );
            if (!hasAccess) {
                return <Navigate to="/dashboard" replace />;
            }
        }

        return element;
    }

    const isAuthPage = location.pathname === "/login" || location.pathname === '/';

    return (
        <div className="min-h-screen text-white font-sans selection:bg-[#3b82f6]/30">
            {/* Background for main pages */}
            {!isAuthPage && (
                <div className="fixed inset-0" style={{ zIndex: -1 }}>
                    {/* Matte black image - fully visible */}
                    <img
                        src="/images/1-matte-black.jpg"
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ opacity: 1 }}
                    />
                    {/* Very minimal overlay for text readability */}
                    <div className="absolute inset-0 bg-black/5" />
                </div>
            )}

            {!isAuthPage && <Menubar />}

            <Toaster
                position="top-right"
                toastOptions={{
                    className: 'bg-[#161616] text-white border border-[#262626]',
                    style: {
                        background: '#161616',
                        color: '#f5f5f5',
                        border: '1px solid #262626'
                    }
                }}
            />

            <div className={`${!isAuthPage ? (isExpanded ? 'ml-64' : 'ml-20') : ''} relative transition-all duration-300`} style={{ zIndex: 1 }}>
                <Routes>
                    <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
                    <Route path="/explore" element={<ProtectedRoute element={<Explore />} />} />
                    <Route path="/order-history" element={<ProtectedRoute element={<OrderHistory />} />} />
                    <Route path="/orders" element={<ProtectedRoute element={<OrderHistory />} />} />
                    {/* Admin routes - accept ADMIN role */}
                    <Route path="/manage-category" element={<ProtectedRoute element={<ManageCategory />} allowedRoles={['ADMIN', 'ROLE_ADMIN']} />} />
                    <Route path="/manage-users" element={<ProtectedRoute element={<ManageUsers />} allowedRoles={['ADMIN', 'ROLE_ADMIN']} />} />
                    <Route path="/manage-items" element={<ProtectedRoute element={<ManageItems />} allowedRoles={['ADMIN', 'ROLE_ADMIN']} />} />
                    <Route path="/category" element={<ProtectedRoute element={<ManageCategory />} allowedRoles={['ADMIN', 'ROLE_ADMIN']} />} />
                    <Route path="/users" element={<ProtectedRoute element={<ManageUsers />} allowedRoles={['ADMIN', 'ROLE_ADMIN']} />} />
                    <Route path="/items" element={<ProtectedRoute element={<ManageItems />} allowedRoles={['ADMIN', 'ROLE_ADMIN']} />} />

                    <Route path="/login" element={<LoginRoute element={<Login />} />} />
                    <Route path="/" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>

            {/* Scroll to Top Button */}
            {!isAuthPage && <ScrollToTop />}
        </div>
    );
}

export default App;