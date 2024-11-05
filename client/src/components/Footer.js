import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-indigo-600 text-white p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <p className="text-center mb-2">
          &copy; {new Date().getFullYear()} Madhav Financial Management. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <motion.a
            href="#"
            className="hover:underline transition duration-300"
            whileHover={{ scale: 1.1 }}
          >
            Privacy Policy
          </motion.a>
          <motion.a
            href="#"
            className="hover:underline transition duration-300"
            whileHover={{ scale: 1.1 }}
          >
            Terms of Service
          </motion.a>
          <motion.a
            href="#"
            className="hover:underline transition duration-300"
            whileHover={{ scale: 1.1 }}
          >
            Contact Us
          </motion.a>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
