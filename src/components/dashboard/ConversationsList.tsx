
import React from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ConversationItem } from "./ConversationItem";
import { type RedditPost } from "@/services/redditAPI";

interface ConversationsListProps {
  conversations: RedditPost[];
  isLoading: boolean;
  isError: boolean;
  onRefresh: () => void;
  onViewConversation: (conversation: RedditPost) => void;
}

export const ConversationsList: React.FC<ConversationsListProps> = ({
  conversations,
  isLoading,
  isError,
  onRefresh,
  onViewConversation,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array(3).fill(0).map((_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2 w-full">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <AlertCircle className="h-10 w-10 text-destructive mb-4" />
        <h3 className="font-medium text-lg">Error Loading Data</h3>
        <p className="text-muted-foreground mb-4">
          There was an error fetching Reddit data. Please try again or check your API credentials.
        </p>
        <Button onClick={onRefresh}>Try Again</Button>
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No conversations match your criteria.</p>
        <Button variant="ghost" onClick={onRefresh} className="mt-2">
          View all conversations
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {conversations.map((conversation) => (
        <ConversationItem 
          key={conversation.id}
          conversation={conversation}
          onViewConversation={onViewConversation}
        />
      ))}
    </div>
  );
};
