import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

export const FloatingDock = ({
    items,
    className,
}) => {
    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={cn(
                "fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 backdrop-blur-xl shadow-2xl",
                className
            )}
        >
            {items.map((item, idx) => (
                <motion.button
                    key={idx}
                    whileHover={{ scale: 1.2, y: -8 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={item.onClick}
                    className={cn(
                        "relative flex items-center justify-center w-12 h-12 rounded-xl transition-colors",
                        item.active
                            ? "bg-blue-500/20 text-blue-400"
                            : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                    )}
                >
                    {item.icon}
                    {item.active && (
                        <motion.div
                            layoutId="activeIndicator"
                            className="absolute -bottom-1 w-1 h-1 rounded-full bg-blue-400"
                        />
                    )}
                </motion.button>
            ))}
        </motion.div>
    );
};
