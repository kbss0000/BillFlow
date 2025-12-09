import { useEffect, useState, useRef } from "react";

// Animated counter hook
export const useCountUp = (end, duration = 2000, startOnMount = true) => {
    const [count, setCount] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const countRef = useRef(null);
    const startTimeRef = useRef(null);

    const animate = (timestamp) => {
        if (!startTimeRef.current) {
            startTimeRef.current = timestamp;
        }

        const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);

        // Easing function (ease-out-expo)
        const easeOutExpo = 1 - Math.pow(2, -10 * progress);
        const currentCount = Math.floor(easeOutExpo * end);

        setCount(currentCount);

        if (progress < 1) {
            countRef.current = requestAnimationFrame(animate);
        } else {
            setCount(end);
            setIsAnimating(false);
        }
    };

    const startAnimation = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        startTimeRef.current = null;
        countRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        if (startOnMount && end > 0) {
            startAnimation();
        }
        return () => {
            if (countRef.current) {
                cancelAnimationFrame(countRef.current);
            }
        };
    }, [end]);

    return { count, isAnimating, startAnimation };
};

// Format number with commas
export const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Animated number component
export const AnimatedNumber = ({ value, duration = 2000, prefix = "", suffix = "", className = "" }) => {
    const { count } = useCountUp(value, duration);

    return (
        <span className={className}>
            {prefix}{formatNumber(count)}{suffix}
        </span>
    );
};

// Currency animated number
export const AnimatedCurrency = ({ value, duration = 2000, className = "" }) => {
    const { count } = useCountUp(value, duration);

    return (
        <span className={className}>
            ₹{formatNumber(count)}
        </span>
    );
};

export default useCountUp;
