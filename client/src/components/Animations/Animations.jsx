import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

// Page transition wrapper
export const PageTransition = ({ children }) => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

// Stagger animation container
export const StaggerContainer = ({ children, className = "", delay = 0.05 }) => {
    return (
        <motion.div
            className={className}
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: delay,
                    },
                },
            }}
        >
            {children}
        </motion.div>
    );
};

// Stagger animation item
export const StaggerItem = ({ children, className = "" }) => {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
            {children}
        </motion.div>
    );
};

// 3D Tilt Card
export const TiltCard = ({ children, className = "" }) => {
    return (
        <motion.div
            className={className}
            whileHover={{
                scale: 1.02,
                rotateX: -2,
                rotateY: 2,
                boxShadow: "0 25px 50px -12px rgba(212, 165, 116, 0.15)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ transformPerspective: 1000 }}
        >
            {children}
        </motion.div>
    );
};

// Glow Card with hover effect
export const GlowCard = ({ children, className = "", glowColor = "rgba(212, 165, 116, 0.3)" }) => {
    return (
        <motion.div
            className={`relative ${className}`}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
            <motion.div
                className="absolute -inset-0.5 rounded-2xl opacity-0 blur-xl"
                style={{ background: glowColor }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            />
            <div className="relative">
                {children}
            </div>
        </motion.div>
    );
};

// Fade up animation for text/elements
export const FadeUp = ({ children, delay = 0, className = "" }) => {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
        >
            {children}
        </motion.div>
    );
};

// Scale in animation
export const ScaleIn = ({ children, delay = 0, className = "" }) => {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay, ease: [0.4, 0, 0.2, 1] }}
        >
            {children}
        </motion.div>
    );
};
