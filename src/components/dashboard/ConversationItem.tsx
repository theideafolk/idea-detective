
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
  
  return (
    <div className={`border rounded-lg p-4 transition-all hover:shadow-md ${
      isHighValueOpportunity ? "border-l-4 border-l-green-500" : 
      isMediumValueOpportunity ? "border-l-4 border-l-yellow-500" : ""
    }`}>
      <div className="flex justify-between items-start">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-normal">
              {conversation.subreddit}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {conversation.author} • {conversation.time}
            </span>
            
            {/* Opportunity badges - simplified */}
            {isHighValueOpportunity && (
              <Badge className="bg-green-500 hover:bg-green-600">Business Lead</Badge>
            )}
          </div>
          
          <h3 className="font-medium text-lg">{conversation.title}</h3>
          <p className="text-muted-foreground line-clamp-2">{conversation.content}</p>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <ArrowUpRight className="h-4 w-4" />
              {conversation.upvotes}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              {conversation.comments}
            </span>
            {(conversation.opportunityScore || 0) > 0 && (
              <span className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                Score: {conversation.opportunityScore}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex flex-col gap-2 ml-4">
          <Button size="sm" onClick={() => onViewConversation(conversation)}>View</Button>
          <a 
            href={`https://reddit.com${conversation.permalink}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs flex items-center gap-1 hover:underline"
          >
            <ExternalLink className="h-3 w-3" />
            Reddit
          </a>
        </div>
      </div>
    </div>
  );
};
