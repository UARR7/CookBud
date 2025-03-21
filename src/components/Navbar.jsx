import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChefHat, ShoppingCart, Calendar, Activity, AlertTriangle, Menu, X, LogOut,MessageSquare } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuthStore();
  
  const navItems = isAuthenticated ? [
    { path: '/dashboard', label: 'Dashboard', icon: ChefHat },
    { path: '/generate-recipe', label: 'Generate Recipe', icon: ChefHat },
    { path: '/grocery-list', label: 'Grocery List', icon: ShoppingCart },
    { path: '/meal-planning', label: 'Meal Planning', icon: Calendar },
    { path: '/nutrient-analysis', label: 'Nutrients', icon: Activity },
    { path: '/age-restrictions', label: 'Advisories', icon: AlertTriangle },
    { path: '/forum', label: 'Forum', icon: MessageSquare },
  ] : [];

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <ChefHat className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold text-white">CookBud</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="relative px-3 py-2 text-sm text-white/70 hover:text-white transition-colors"
                  >
                    <div className="flex items-center space-x-1">
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </div>
                    {location.pathname === item.path && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-white/70 hover:text-white px-3 py-2 text-sm transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white/70 hover:text-white px-3 py-2 text-sm transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMenuOpen ? 1 : 0,
          height: isMenuOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.2 }}
        className="md:hidden overflow-hidden bg-black/20 backdrop-blur-lg"
      >
        <div className="px-4 pt-2 pb-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? 'text-white bg-white/10'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 px-3 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-md text-base font-medium"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          ) : (
            <div className="pt-4 flex flex-col space-y-2">
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="text-white/70 hover:text-white px-3 py-2 text-base transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsMenuOpen(false)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-base transition-colors text-center"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;