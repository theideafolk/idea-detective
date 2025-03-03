
import React from "react";
import { ExternalLink, ArrowUpRight, MessageCircle, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type RedditPost } from "@/services/redditAPI";

interface ConversationItemProps {
  conversation: RedditPost;
  onViewConversation: (conversation: RedditPost) => void;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  onViewConversation,
}) => {
  // Determine if this is a high-value business opportunity
  const isHighValueOpportunity = conversation.isBusinessOpportunity && (conversation.opportunityScore || 0) > 20;
  const isMediumValueOpportunity = conversation.isBusinessOpportunity && (conversation.opportunityScore || 0) > 10;
  
  // Format date if time property is not available
  const displayTime = conversation.time || new Date(conversation.created * 1000).toLocaleDateString();
  
  return (
    <div className={`reddit-card p-4 transition-all hover:shadow-md ${
      isHighValueOpportunity ? "border-l-4 border-l-reddit" : 
      isMediumValueOpportunity ? "border-l-4 border-l-reddit-light" : ""
    }`}>
      <div className="flex justify-between items-start">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="font-normal text-xs bg-reddit-muted/50 text-reddit border-reddit-light">
              {conversation.subreddit}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {conversation.author} • {displayTime}
            </span>
            
            {/* Opportunity badges - simplified */}
            {isHighValueOpportunity && (
              <Badge className="bg-reddit hover:bg-reddit-dark text-white">Business Lead</Badge>
            )}
          </div>
          
          <h3 className="font-medium text-lg">{conversation.title}</h3>
          <p className="text-muted-foreground line-clamp-2">{conversation.content}</p>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <ArrowUpRight className="h-4 w-4 upvote-icon" />
              {conversation.upvotes || conversation.score}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4 comment-icon" />
              {conversation.comments}
            </span>
            {(conversation.opportunityScore || 0) > 0 && (
              <span className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-reddit-light" />
                Score: {conversation.opportunityScore}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex flex-col gap-2 ml-4">
          <Button size="sm" onClick={() => onViewConversation(conversation)}>View</Button>
          <a 
            href={conversation.permalink ? `https://reddit.com${conversation.permalink}` : conversation.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs flex items-center gap-1 hover:underline text-reddit"
          >
            <ExternalLink className="h-3 w-3" />
            Reddit
          </a>
        </div>
      </div>
    </div>
  );
};
