"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="py-20 text-center"
    >
      <h1 className="text-4xl md:text-6xl font-bold">
        Fast <span className="text-blue-600">AC & Electrical</span> Repairs
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        Book a professional service today!
      </p>
    </motion.section>
  );
}