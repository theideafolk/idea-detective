
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TrendingUp, MessageSquare, Eye } from "lucide-react";
import { type RedditPost } from "@/services/redditAPI";

interface ConversationItemProps {
  conversation: RedditPost;
  onViewConversation: (conversation: RedditPost) => void;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  onViewConversation,
}) => {
  return (
    <motion.div 
      className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{conversation.title}</h3>
          <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-muted-foreground">
            <Badge variant="outline" className="rounded-sm">{conversation.subreddit}</Badge>
            <span>•</span>
            <span className="flex items-center">
              <Avatar className="h-4 w-4 mr-1">
                <AvatarFallback className="text-[9px]">
                  {conversation.author.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {conversation.author}
            </span>
            <span>•</span>
            <span>{conversation.time}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            <span>{conversation.upvotes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>{conversation.comments}</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onViewConversation(conversation)}
            className="ml-2"
          >
            <Eye className="h-3.5 w-3.5 mr-1" />
            View
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
