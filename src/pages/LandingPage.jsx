import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Camera, Sparkles, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const features = [
    {
      icon: Camera,
      title: 'Photo Recipe Generation',
      description: 'Upload food photos and get instant recipe suggestions powered by Google Gemini AI'
    },
    {
      icon: Brain,
      title: 'Smart Meal Planning',
      description: 'Personalized meal plans based on your preferences and dietary requirements'
    },
    {
      icon: Sparkles,
      title: 'Nutrient Analysis',
      description: 'Get detailed nutritional information for any recipe or food item'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              Transform Your Cooking with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                {' '}AI-Powered Recipes
              </span>
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Upload food photos, get instant recipes, and explore a world of culinary possibilities with our AI-powered kitchen companion.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-4 mb-16"
          >
            <Link
              to="/generate-recipe"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors flex items-center gap-2"
            >
              <ChefHat className="h-5 w-5" />
              Get Started
            </Link>
            <Link
              to="/signup"
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
            >
              Sign Up Free
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.2 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
              >
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <feature.icon className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LandingPage;