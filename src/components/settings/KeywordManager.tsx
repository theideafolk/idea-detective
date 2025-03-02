
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Check, Tag, Edit, Trash2 } from 'lucide-react';
import { mockKeywords, Keyword } from '@/lib/mockData';
import { toast } from 'sonner';

const KeywordManager: React.FC = () => {
  const [keywords, setKeywords] = useState<Keyword[]>(mockKeywords);
  const [newKeyword, setNewKeyword] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [isExact, setIsExact] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editingKeyword, setEditingKeyword] = useState<Keyword | null>(null);
  
  // Unique categories
  const categories = [...new Set(keywords.map(k => k.category))];
  
  const handleAddKeyword = () => {
    if (!newKeyword.trim() || !newCategory.trim()) {
      toast.error('Keyword and category are required');
      return;
    }
    
    // Generate a unique ID
    const newId = `keyword-${Date.now()}`;
    
    setKeywords(prev => [
      ...prev,
      {
        id: newId,
        text: newKeyword,
        category: newCategory,
        isExact
      }
    ]);
    
    // Reset form
    setNewKeyword('');
    setIsExact(false);
    setIsAdding(false);
    
    toast.success('Keyword added successfully');
  };
  
  const handleUpdateKeyword = () => {
    if (!editingKeyword || !editingKeyword.text.trim() || !editingKeyword.category.trim()) {
      toast.error('Keyword and category are required');
      return;
    }
    
    setKeywords(prev => 
      prev.map(k => k.id === editingKeyword.id ? editingKeyword : k)
    );
    
    setEditingKeyword(null);
    toast.success('Keyword updated successfully');
  };
  
  const handleDeleteKeyword = (id: string) => {
    setKeywords(prev => prev.filter(k => k.id !== id));
    toast.success('Keyword deleted');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-medium">Keywords</h2>
        <button
          className="secondary-button flex items-center gap-2 px-4 py-2"
          onClick={() => setIsAdding(true)}
        >
          <Plus size={16} />
          <span>Add Keyword</span>
        </button>
      </div>
      
      {/* Add Keyword Form */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="bg-white border border-border rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Add New Keyword</h3>
                <button 
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => setIsAdding(false)}
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="keyword" className="text-sm font-medium">
                      Keyword
                    </label>
                    <input
                      id="keyword"
                      type="text"
                      className="subtle-input w-full"
                      placeholder="Enter keyword..."
                      value={newKeyword}
                      onChange={(e) => setNewKeyword(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium">
                      Category
                    </label>
                    <input
                      id="category"
                      type="text"
                      className="subtle-input w-full"
                      placeholder="Enter category..."
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      list="categories"
                    />
                    <datalist id="categories">
                      {categories.map(cat => (
                        <option key={cat} value={cat} />
                      ))}
                    </datalist>
                  </div>
                </div>
                
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isExact}
                    onChange={() => setIsExact(prev => !prev)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded ${isExact ? 'bg-primary text-white flex items-center justify-center' : 'border border-gray-300'}`}>
                    {isExact && <Check size={12} />}
                  </div>
                  <span className="text-sm">Exact match</span>
                </label>
                
                <div className="flex justify-end">
                  <button
                    className="primary-button flex items-center gap-2"
                    onClick={handleAddKeyword}
                  >
                    <Plus size={16} />
                    <span>Add Keyword</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Edit Keyword Form */}
      <AnimatePresence>
        {editingKeyword && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="bg-white border border-border rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Edit Keyword</h3>
                <button 
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => setEditingKeyword(null)}
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="edit-keyword" className="text-sm font-medium">
                      Keyword
                    </label>
                    <input
                      id="edit-keyword"
                      type="text"
                      className="subtle-input w-full"
                      placeholder="Enter keyword..."
                      value={editingKeyword.text}
                      onChange={(e) => setEditingKeyword({...editingKeyword, text: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="edit-category" className="text-sm font-medium">
                      Category
                    </label>
                    <input
                      id="edit-category"
                      type="text"
                      className="subtle-input w-full"
                      placeholder="Enter category..."
                      value={editingKeyword.category}
                      onChange={(e) => setEditingKeyword({...editingKeyword, category: e.target.value})}
                      list="edit-categories"
                    />
                    <datalist id="edit-categories">
                      {categories.map(cat => (
                        <option key={cat} value={cat} />
                      ))}
                    </datalist>
                  </div>
                </div>
                
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingKeyword.isExact}
                    onChange={() => setEditingKeyword({...editingKeyword, isExact: !editingKeyword.isExact})}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded ${editingKeyword.isExact ? 'bg-primary text-white flex items-center justify-center' : 'border border-gray-300'}`}>
                    {editingKeyword.isExact && <Check size={12} />}
                  </div>
                  <span className="text-sm">Exact match</span>
                </label>
                
                <div className="flex justify-end">
                  <button
                    className="primary-button flex items-center gap-2"
                    onClick={handleUpdateKeyword}
                  >
                    <Check size={16} />
                    <span>Update Keyword</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Keyword List */}
      <div className="bg-white border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Keyword</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Match Type</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {keywords.map((keyword) => (
              <tr key={keyword.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Tag size={16} className="text-muted-foreground" />
                    <span className="font-medium">{keyword.text}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="chip bg-secondary text-secondary-foreground">
                    {keyword.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs ${keyword.isExact ? 'text-green-600 bg-green-50 px-2 py-1 rounded-full' : 'text-blue-600 bg-blue-50 px-2 py-1 rounded-full'}`}>
                    {keyword.isExact ? 'Exact' : 'Partial'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      className="p-1 rounded-md hover:bg-gray-100 text-muted-foreground hover:text-foreground"
                      onClick={() => setEditingKeyword(keyword)}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="p-1 rounded-md hover:bg-gray-100 text-muted-foreground hover:text-destructive"
                      onClick={() => handleDeleteKeyword(keyword.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KeywordManager;
