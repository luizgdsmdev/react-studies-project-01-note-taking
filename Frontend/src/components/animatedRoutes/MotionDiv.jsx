import { motion } from "framer-motion";

/**
 * @description Motion div component for animation
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Motion div
 */
export default function MotionDiv({ children }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -50,
        scale: 0.95,
        filter: "blur(9px)",
      }}
      animate={{
        opacity: 1,
        x: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
          staggerChildren: 0.1,
        },
      }}
      exit={{
        opacity: 0,
        x: 50,
        scale: 0.95,
        filter: "blur(9px)",
        transition: {
          duration: 0.3,
          ease: "easeInOut",
          staggerChildren: 0.05,
        },
      }}
      className="min-h-screen bg-base-300"
    >
      {children}
    </motion.div>
  );
}
