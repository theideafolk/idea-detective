
import React from 'react';
import { motion } from 'framer-motion';
import { Search, RefreshCcw, Filter } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  showSearch?: boolean;
  onSearch?: (query: string) => void;
  showFilter?: boolean;
  onFilter?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  subtitle,
  onRefresh,
  isRefreshing = false,
  showSearch = false,
  onSearch,
  showFilter = false,
  onFilter
}) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <motion.h1 
            className="text-3xl font-display font-bold tracking-tight"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p 
              className="text-muted-foreground mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
        
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {showSearch && (
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="subtle-input pl-10 w-full md:w-64"
                onChange={(e) => onSearch && onSearch(e.target.value)}
              />
            </div>
          )}
          
          {showFilter && (
            <button 
              className="secondary-button flex items-center gap-2 px-4"
              onClick={onFilter}
            >
              <Filter size={18} />
              <span>Filter</span>
            </button>
          )}
          
          {onRefresh && (
            <button 
              className="secondary-button flex items-center gap-2 px-4"
              onClick={onRefresh}
              disabled={isRefreshing}
            >
              <RefreshCcw size={18} className={isRefreshing ? "animate-spin" : ""} />
              <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardHeader;
