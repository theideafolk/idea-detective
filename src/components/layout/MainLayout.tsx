
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/common/Logo';
import { Bell, Settings, LogOut, Home, MessageSquare, BarChart3, User, Menu, X } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: <Home size={20} />,
      adminOnly: false 
    },
    { 
      name: 'Conversations', 
      path: '/conversations', 
      icon: <MessageSquare size={20} />,
      adminOnly: false 
    },
    { 
      name: 'Analytics', 
      path: '/analytics', 
      icon: <BarChart3 size={20} />,
      adminOnly: false 
    },
    { 
      name: 'Settings', 
      path: '/settings', 
      icon: <Settings size={20} />,
      adminOnly: true 
    }
  ];

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(item => {
    if (item.adminOnly) {
      return isAdmin;
    }
    return true;
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-white/70 backdrop-blur-md sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Mobile menu toggle */}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-gray-100" 
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {filteredMenuItems.map((item) => (
              <motion.div key={item.path} whileHover={{ y: -1 }}>
                <a
                  href={item.path}
                  className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === item.path
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </a>
              </motion.div>
            ))}
          </nav>

          {/* User profile and actions */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              whileHover={{ y: -1 }}
              className="p-2 rounded-full bg-secondary text-secondary-foreground"
            >
              <Bell size={18} />
            </motion.button>
            
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium">{user.username}</p>
                <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
              </div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
              >
                <User size={18} />
              </motion.div>
            </div>
            
            <motion.button
              whileHover={{ y: -1 }}
              className="p-2 rounded-full text-muted-foreground hover:text-destructive transition-colors"
              onClick={handleLogout}
            >
              <LogOut size={18} />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-b border-border"
        >
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {filteredMenuItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`flex items-center space-x-3 p-2 rounded-md ${
                  location.pathname === item.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-secondary'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </a>
            ))}
            
            <div className="border-t border-border pt-4 mt-2">
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <User size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{user.username}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                  </div>
                </div>
                <button
                  className="p-2 rounded-md text-muted-foreground hover:text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          </nav>
        </motion.div>
      )}

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 bg-white/50">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 The Idea Folk. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
