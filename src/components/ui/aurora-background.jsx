import React from 'react';
import { motion } from 'framer-motion';

const AuroraBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -inset-[10px] opacity-50"
          style={{
            background: "linear-gradient(to right, #4f46e5, #0ea5e9, #06b6d4)",
            filter: "blur(100px)",
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AuroraBackground;