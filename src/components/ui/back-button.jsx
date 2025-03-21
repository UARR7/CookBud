import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      onClick={() => navigate('/dashboard')}
      className="absolute top-6 left-4 md:left-8 flex items-center gap-2 text-white/70 hover:text-white transition-colors"
    >
      <ArrowLeft className="w-5 h-5" />
      <span>Back to Dashboard</span>
    </motion.button>
  );
};

export default BackButton;