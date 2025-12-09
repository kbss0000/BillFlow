import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

export const GlowingCard = ({
    children,
    className,
    containerClassName,
    glowColor = "blue",
}) => {
    const glowColors = {
        blue: "from-blue-500/20 via-blue-500/5 to-transparent",
        purple: "from-purple-500/20 via-purple-500/5 to-transparent",
        green: "from-emerald-500/20 via-emerald-500/5 to-transparent",
        orange: "from-orange-500/20 via-orange-500/5 to-transparent",
    };

    const borderColors = {
        blue: "group-hover:border-blue-500/50",
        purple: "group-hover:border-purple-500/50",
        green: "group-hover:border-emerald-500/50",
        orange: "group-hover:border-orange-500/50",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn("relative group", containerClassName)}
        >
            {/* Glow effect */}
            <div
                className={cn(
                    "absolute -inset-0.5 rounded-xl bg-gradient-to-r opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500",
                    glowColors[glowColor]
                )}
            />

            {/* Card */}
            <div
                className={cn(
                    "relative rounded-xl border border-zinc-800 bg-zinc-900/90 backdrop-blur-sm p-6 transition-all duration-300",
                    borderColors[glowColor],
                    className
                )}
            >
                {children}
            </div>
        </motion.div>
    );
};
