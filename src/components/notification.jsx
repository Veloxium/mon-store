import React from "react";
import { motion } from "framer-motion";

function Notification() {
  return (
    <motion.div
      initial={{ x: 180, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 180, opacity: 0 }}
      className="fixed flex flex-col items-center custom z-50 top-8 right-0 px-4 py-1 pixel text-white"
    >
      <p className="text-xs">successfully</p>
      <p className="text-xs ">added!</p>
    </motion.div>
  );
}

export default Notification;
