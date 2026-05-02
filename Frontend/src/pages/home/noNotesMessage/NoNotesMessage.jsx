import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  containerVariants,
  itemVariants,
} from "../../../components/animatedRoutes/homeVariantes/homeVariantes";

const NoNotesMessage = () => {
  return (
    <div className="hero block p-4 pt-12">
      <div className="hero-content text-center max-w-2xl">
        <motion.div
          className="max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 className="text-5xl font-bold" variants={itemVariants}>
            Ready to capture brilliance?
          </motion.h2>
          <motion.p className="py-8 pb-12" variants={itemVariants}>
            Transform your ideas into brilliant notes! Start capturing that
            special thought that can't be lost. Your first note is the beginning
            of an organized and productive journey.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link to="/create" className="btn btn-primary">
              Create your first note
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NoNotesMessage;
