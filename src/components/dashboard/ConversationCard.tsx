
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ExternalLink, Eye, EyeOff, Edit, Save, MessageCircle, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Conversation } from '@/lib/mockData';
import GlassMorphicCard from '@/components/common/GlassMorphicCard';

interface ConversationCardProps {
  conversation: Conversation;
  onToggleRead: (id: string, isRead: boolean) => void;
  onAddNote: (id: string, note: string) => void;
}

const ConversationCard: React.FC<ConversationCardProps> = ({
  conversation,
  onToggleRead,
  onAddNote
}) => {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAddNote = () => {
    if (noteText.trim()) {
      onAddNote(conversation.id, noteText);
      setNoteText('');
      setIsAddingNote(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (e) {
      return 'Invalid date';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <GlassMorphicCard 
        className={`transition-all duration-300 ${conversation.isRead ? 'bg-white/70' : 'bg-white/90 shadow-md'}`}
      >
        {/* Card Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-md ${conversation.type === 'post' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
              {conversation.type === 'post' ? <MessageSquare size={16} /> : <MessageCircle size={16} />}
            </div>
            <div>
              <p className="text-sm font-medium">r/{conversation.subreddit}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>by u/{conversation.author.name}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>{formatDate(conversation.postDate)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-gray-100"
              onClick={() => onToggleRead(conversation.id, !conversation.isRead)}
              title={conversation.isRead ? "Mark as unread" : "Mark as read"}
            >
              {conversation.isRead ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
            
            <a
              href={conversation.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-1 rounded-md hover:bg-gray-100"
              title="Open original"
            >
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
        
        {/* Title (for posts only) */}
        {conversation.title && (
          <h3 className="font-medium text-base mb-2">{conversation.title}</h3>
        )}
        
        {/* Content */}
        <div className="mb-4">
          <p className={`text-sm ${isExpanded ? '' : 'line-clamp-3'}`}>
            {conversation.content}
          </p>
          {conversation.content.length > 150 && (
            <button
              className="text-xs text-primary font-medium hover:underline mt-1"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
        
        {/* Keywords */}
        <div className="flex flex-wrap gap-2 mb-4">
          {conversation.matchedKeywords.map((keyword, index) => (
            <div key={index} className="chip bg-secondary text-secondary-foreground">
              {keyword.keyword}
            </div>
          ))}
        </div>
        
        {/* Notes */}
        {conversation.notes.length > 0 && (
          <div className="mb-4 space-y-2">
            <h4 className="text-sm font-medium">Notes:</h4>
            {conversation.notes.map((note, index) => (
              <div key={index} className="text-xs bg-gray-50 p-2 rounded-md border border-gray-100">
                <p>{note.text}</p>
                <p className="text-muted-foreground mt-1 text-[10px]">
                  {formatDate(note.createdAt)}
                </p>
              </div>
            ))}
          </div>
        )}
        
        {/* Add Note */}
        {isAddingNote ? (
          <div className="space-y-2">
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Add your note..."
              className="subtle-input w-full h-20 resize-none text-sm"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                className="text-xs px-3 py-1.5 rounded-md border border-gray-200 hover:bg-gray-50"
                onClick={() => setIsAddingNote(false)}
              >
                Cancel
              </button>
              <button
                className="text-xs px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-1"
                onClick={handleAddNote}
              >
                <Save size={12} />
                <span>Save</span>
              </button>
            </div>
          </div>
        ) : (
          <button
            className="text-xs text-primary hover:text-primary/90 font-medium flex items-center gap-1"
            onClick={() => setIsAddingNote(true)}
          >
            <Edit size={12} />
            <span>Add note</span>
          </button>
        )}
      </GlassMorphicCard>
    </motion.div>
  );
};

export default ConversationCard;
