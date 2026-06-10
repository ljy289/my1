import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Trophy, BrainCircuit, Settings } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const totalPoints = useStore((state) => state.totalPoints);
  
  const navItems = [
    { path: '/', icon: Home, label: '首页' },
    { path: '/courses', icon: BookOpen, label: '课程' },
    { path: '/assessment', icon: BrainCircuit, label: '测评' },
    { path: '/achievements', icon: Trophy, label: '成就' },
    { path: '/admin', icon: Settings, label: '管理' }
  ];
  
  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              数据分析学院
            </span>
          </Link>
          
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative px-4 py-2 rounded-lg transition-all duration-200"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-2 ${
                      isActive
                        ? 'text-blue-400'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="hidden sm:inline font-medium">{item.label}</span>
                  </motion.div>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    />
                  )}
                </Link>
              );
            })}
            
            <div className="ml-4 pl-4 border-l border-slate-800">
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-slate-800 rounded-full">
                <div className="w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">⭐</span>
                </div>
                <span className="text-sm font-semibold text-yellow-400">{totalPoints}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
