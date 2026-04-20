import React from 'react';
import { NavLink } from 'react-router-dom';
import { Languages, BookOpen, LayoutDashboard, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Translator', path: '/translator', icon: Languages },
    { name: 'Learn', path: '/learning', icon: BookOpen },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 glass-panel border-b-0 border-x-0 rounded-none bg-opacity-80 px-6 py-4"
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-secondaryNeon font-bold text-2xl kannada-text tracking-wider">
            ಕನ್ನಡ<span className="text-white font-sans text-xl ml-2">Connect</span>
          </span>
        </div>
        
        <div className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-2 font-medium transition-colors hover:text-secondaryNeon ${isActive ? 'text-secondaryNeon border-b-2 border-secondaryNeon' : 'text-gray-300'}`
              }
            >
              <item.icon size={18} />
              {item.name}
            </NavLink>
          ))}
        </div>
        
        <div className="md:hidden">
            {/* Mobile menu button could go here */}
            <span className="text-secondaryNeon font-bold">☰</span>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
