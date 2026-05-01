import { motion } from "framer-motion";

export default function MotionDiv({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: "100%" }}
      exit={{
        opacity: 0,
        x: window.innerWidth,
        transition: { duration: 0.3 },
        ease: "easeInOut",
        layout: true,
        scrollBehavior: "smooth",
        scrollMargin: 0,
        scrollPadding: 0,
        scrollbarWidth: "0",
      }}
      className="min-h-screen bg-base-300"
    >
      {children}
    </motion.div>
  );
}
