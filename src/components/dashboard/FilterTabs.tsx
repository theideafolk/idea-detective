
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConversationsList } from "./ConversationsList";
import { type RedditPost } from "@/services/redditAPI";

interface FilterTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  conversations: RedditPost[];
  filteredConversations: RedditPost[];
  isLoading: boolean;
  isError: boolean;
  onRefresh: () => void;
  onViewConversation: (conversation: RedditPost) => void;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  activeTab,
  setActiveTab,
  conversations,
  filteredConversations,
  isLoading,
  isError,
  onRefresh,
  onViewConversation,
}) => {
  return (
    <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-4">
        <TabsTrigger value="all">All Conversations</TabsTrigger>
        <TabsTrigger value="potential">Potential Leads</TabsTrigger>
        <TabsTrigger value="trending">Trending Topics</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="space-y-4">
        <ConversationsList
          conversations={filteredConversations}
          isLoading={isLoading}
          isError={isError}
          onRefresh={onRefresh}
          onViewConversation={onViewConversation}
        />
      </TabsContent>
      
      <TabsContent value="potential" className="space-y-4">
        {filteredConversations.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            <p>No potential leads identified yet.</p>
            <p className="text-sm mt-2">Try adding more keywords or refreshing the data.</p>
          </div>
        ) : (
          <ConversationsList
            conversations={filteredConversations}
            isLoading={isLoading}
            isError={isError}
            onRefresh={onRefresh}
            onViewConversation={onViewConversation}
          />
        )}
      </TabsContent>
      
      <TabsContent value="trending" className="space-y-4">
        {filteredConversations.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            <p>No trending topics identified yet.</p>
            <p className="text-sm mt-2">Trending topics will appear as more data is collected.</p>
          </div>
        ) : (
          <ConversationsList
            conversations={filteredConversations}
            isLoading={isLoading}
            isError={isError}
            onRefresh={onRefresh}
            onViewConversation={onViewConversation}
          />
        )}
      </TabsContent>
    </Tabs>
  );
};
