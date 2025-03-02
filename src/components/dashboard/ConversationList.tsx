
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ConversationCard from './ConversationCard';
import { Conversation, mockConversations } from '@/lib/mockData';
import { Filter, X, CheckSquare, Square } from 'lucide-react';
import { toast } from 'sonner';

interface ConversationListProps {
  searchQuery?: string;
}

interface FilterState {
  subreddits: string[];
  readStatus: 'all' | 'read' | 'unread';
  categories: string[];
}

const ConversationList: React.FC<ConversationListProps> = ({ searchQuery = '' }) => {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [filteredConversations, setFilteredConversations] = useState<Conversation[]>(mockConversations);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    subreddits: [],
    readStatus: 'all',
    categories: []
  });
  
  // Extract unique subreddits and categories from conversations
  const allSubreddits = [...new Set(conversations.map(c => c.subreddit))];
  const allCategories = [...new Set(conversations.flatMap(c => c.matchedKeywords.map(k => k.category)))];
  
  // Apply filters and search
  useEffect(() => {
    let result = [...conversations];
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(c => 
        (c.title?.toLowerCase().includes(query) || c.content.toLowerCase().includes(query))
      );
    }
    
    // Apply subreddit filter
    if (filters.subreddits.length > 0) {
      result = result.filter(c => filters.subreddits.includes(c.subreddit));
    }
    
    // Apply read status filter
    if (filters.readStatus === 'read') {
      result = result.filter(c => c.isRead);
    } else if (filters.readStatus === 'unread') {
      result = result.filter(c => !c.isRead);
    }
    
    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter(c => 
        c.matchedKeywords.some(k => filters.categories.includes(k.category))
      );
    }
    
    setFilteredConversations(result);
  }, [conversations, searchQuery, filters]);
  
  const toggleSubredditFilter = (subreddit: string) => {
    setFilters(prev => {
      const isSelected = prev.subreddits.includes(subreddit);
      return {
        ...prev,
        subreddits: isSelected 
          ? prev.subreddits.filter(s => s !== subreddit) 
          : [...prev.subreddits, subreddit]
      };
    });
  };
  
  const toggleCategoryFilter = (category: string) => {
    setFilters(prev => {
      const isSelected = prev.categories.includes(category);
      return {
        ...prev,
        categories: isSelected 
          ? prev.categories.filter(c => c !== category) 
          : [...prev.categories, category]
      };
    });
  };
  
  const clearFilters = () => {
    setFilters({
      subreddits: [],
      readStatus: 'all',
      categories: []
    });
  };
  
  const handleToggleRead = (id: string, isRead: boolean) => {
    setConversations(prev => 
      prev.map(c => c.id === id ? { ...c, isRead } : c)
    );
    
    toast.success(`Marked as ${isRead ? 'read' : 'unread'}`);
  };
  
  const handleAddNote = (id: string, noteText: string) => {
    setConversations(prev => 
      prev.map(c => {
        if (c.id === id) {
          const newNote = {
            text: noteText,
            createdBy: '1', // Assume current user id is 1
            createdAt: new Date().toISOString()
          };
          return { 
            ...c, 
            notes: [...c.notes, newNote] 
          };
        }
        return c;
      })
    );
    
    toast.success('Note added');
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{filteredConversations.length}</span> of <span className="font-medium text-foreground">{conversations.length}</span> conversations
        </div>
        
        <button 
          className={`text-sm flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
            (filters.subreddits.length > 0 || filters.readStatus !== 'all' || filters.categories.length > 0)
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Filter size={14} />
          <span>Filter</span>
          {(filters.subreddits.length > 0 || filters.readStatus !== 'all' || filters.categories.length > 0) && (
            <span className="bg-white text-primary w-5 h-5 rounded-full flex items-center justify-center text-xs">
              {filters.subreddits.length + (filters.readStatus !== 'all' ? 1 : 0) + filters.categories.length}
            </span>
          )}
        </button>
      </div>
      
      {/* Filter Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="bg-white border border-border rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Filters</h3>
                <div className="flex items-center gap-3">
                  <button 
                    className="text-xs text-muted-foreground hover:text-foreground"
                    onClick={clearFilters}
                  >
                    Clear all
                  </button>
                  <button 
                    className="text-muted-foreground hover:text-foreground"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Read Status */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Status</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input 
                        type="radio" 
                        checked={filters.readStatus === 'all'} 
                        onChange={() => setFilters(prev => ({ ...prev, readStatus: 'all' }))}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded-full ${filters.readStatus === 'all' ? 'bg-primary' : 'border border-gray-300'}`} />
                      <span>All</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input 
                        type="radio" 
                        checked={filters.readStatus === 'unread'} 
                        onChange={() => setFilters(prev => ({ ...prev, readStatus: 'unread' }))}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded-full ${filters.readStatus === 'unread' ? 'bg-primary' : 'border border-gray-300'}`} />
                      <span>Unread</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input 
                        type="radio" 
                        checked={filters.readStatus === 'read'} 
                        onChange={() => setFilters(prev => ({ ...prev, readStatus: 'read' }))}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded-full ${filters.readStatus === 'read' ? 'bg-primary' : 'border border-gray-300'}`} />
                      <span>Read</span>
                    </label>
                  </div>
                </div>
                
                {/* Subreddits */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Subreddits</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                    {allSubreddits.map(subreddit => (
                      <label key={subreddit} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={filters.subreddits.includes(subreddit)} 
                          onChange={() => toggleSubredditFilter(subreddit)}
                          className="sr-only"
                        />
                        <div className="flex-shrink-0">
                          {filters.subreddits.includes(subreddit) ? (
                            <CheckSquare size={16} className="text-primary" />
                          ) : (
                            <Square size={16} className="text-muted-foreground" />
                          )}
                        </div>
                        <span>r/{subreddit}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Categories */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Categories</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                    {allCategories.map(category => (
                      <label key={category} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={filters.categories.includes(category)} 
                          onChange={() => toggleCategoryFilter(category)}
                          className="sr-only"
                        />
                        <div className="flex-shrink-0">
                          {filters.categories.includes(category) ? (
                            <CheckSquare size={16} className="text-primary" />
                          ) : (
                            <Square size={16} className="text-muted-foreground" />
                          )}
                        </div>
                        <span>{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Conversation List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredConversations.length > 0 ? (
            filteredConversations.map(conversation => (
              <ConversationCard 
                key={conversation.id} 
                conversation={conversation}
                onToggleRead={handleToggleRead}
                onAddNote={handleAddNote}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground">No conversations found matching your criteria.</p>
              {(searchQuery || filters.subreddits.length > 0 || filters.readStatus !== 'all' || filters.categories.length > 0) && (
                <button
                  className="text-primary text-sm mt-2 hover:underline"
                  onClick={() => {
                    setFilters({
                      subreddits: [],
                      readStatus: 'all',
                      categories: []
                    });
                  }}
                >
                  Clear filters
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ConversationList;
