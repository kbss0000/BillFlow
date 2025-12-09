import { motion } from "framer-motion";

// Generic skeleton with shimmer effect
export const Skeleton = ({ className = "", style = {} }) => {
    return (
        <div
            className={`relative overflow-hidden bg-white/5 rounded-xl ${className}`}
            style={style}
        >
            <motion.div
                className="absolute inset-0 -translate-x-full"
                style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
                }}
                animate={{ x: ["0%", "200%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
};

// Stat card skeleton
export const StatCardSkeleton = () => {
    return (
        <div className="card-premium p-6">
            <div className="flex items-center gap-4">
                <Skeleton className="w-14 h-14 rounded-xl" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-8 w-24" />
                </div>
            </div>
        </div>
    );
};

// Table row skeleton
export const TableRowSkeleton = ({ columns = 5 }) => {
    return (
        <tr className="border-b border-white/5">
            {Array.from({ length: columns }).map((_, i) => (
                <td key={i} className="px-6 py-4">
                    <Skeleton className="h-4 w-full max-w-[120px]" />
                </td>
            ))}
        </tr>
    );
};

// Item card skeleton
export const ItemCardSkeleton = () => {
    return (
        <div className="card-premium p-4">
            <Skeleton className="w-full h-32 rounded-xl mb-4" />
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-3" />
            <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
        </div>
    );
};

// Dashboard loading skeleton
export const DashboardSkeleton = () => {
    return (
        <div className="min-h-screen p-8 space-y-8">
            {/* Header */}
            <div className="space-y-2">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-5 w-96" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <StatCardSkeleton key={i} />
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card-premium p-6">
                    <Skeleton className="h-6 w-40 mb-6" />
                    <Skeleton className="h-64 w-full rounded-xl" />
                </div>
                <div className="card-premium p-6">
                    <Skeleton className="h-6 w-40 mb-6" />
                    <Skeleton className="h-64 w-full rounded-xl" />
                </div>
            </div>
        </div>
    );
};

// Order history skeleton
export const OrderHistorySkeleton = () => {
    return (
        <div className="min-h-screen p-8 space-y-8">
            <div className="space-y-2">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-5 w-64" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <StatCardSkeleton key={i} />
                ))}
            </div>

            <div className="card-premium overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10">
                            {["Order ID", "Customer", "Amount", "Status", "Date"].map((h) => (
                                <th key={h} className="px-6 py-4 text-left">
                                    <Skeleton className="h-4 w-20" />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 2, 3, 4, 5].map((i) => (
                            <TableRowSkeleton key={i} columns={5} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Items grid skeleton
export const ItemsGridSkeleton = ({ count = 8 }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <ItemCardSkeleton key={i} />
            ))}
        </div>
    );
};

export default Skeleton;
