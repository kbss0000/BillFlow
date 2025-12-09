import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

export const TextReveal = ({ children, className, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay,
                ease: [0.25, 0.4, 0.25, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export const TextGradient = ({ children, className }) => {
    return (
        <span
            className={cn(
                "bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400",
                className
            )}
        >
            {children}
        </span>
    );
};

export const AnimatedCounter = ({ value, className, prefix = "", suffix = "" }) => {
    return (
        <motion.span
            key={value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={className}
        >
            {prefix}{value}{suffix}
        </motion.span>
    );
};
