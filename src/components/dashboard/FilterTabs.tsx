
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
  // Calculate pagination data
  const totalConversations = filteredConversations.length;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalConversations / itemsPerPage);
  const [currentPage, setCurrentPage] = React.useState(1);
  
  // Apply pagination to conversations
  const paginatedConversations = filteredConversations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Tabs defaultValue="opportunities" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-4">
        <TabsTrigger value="opportunities">Business Opportunities</TabsTrigger>
        <TabsTrigger value="potential">Potential Leads</TabsTrigger>
        <TabsTrigger value="ai">AI Discussion</TabsTrigger>
        <TabsTrigger value="all">All Conversations</TabsTrigger>
      </TabsList>
      
      {["opportunities", "potential", "ai", "all"].map((tab) => (
        <TabsContent key={tab} value={tab} className="space-y-4">
          <ConversationsList
            conversations={paginatedConversations}
            isLoading={isLoading}
            isError={isError}
            onRefresh={onRefresh}
            onViewConversation={onViewConversation}
          />
          
          {/* Pagination controls */}
          {filteredConversations.length > itemsPerPage && (
            <div className="flex justify-between items-center border-t pt-4 mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {Math.min(totalConversations, (currentPage - 1) * itemsPerPage + 1)} - {Math.min(totalConversations, currentPage * itemsPerPage)} of {totalConversations} results
              </div>
              <div className="flex gap-1">
                <button 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-2.5 py-1.5 text-sm border rounded-md disabled:opacity-50"
                >
                  Previous
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const pageNumber = i + 1;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-2.5 py-1.5 text-sm border rounded-md ${
                        currentPage === pageNumber ? "bg-primary text-primary-foreground" : ""
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                {totalPages > 5 && <span className="px-2.5 py-1.5">...</span>}
                {totalPages > 5 && (
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    className={`px-2.5 py-1.5 text-sm border rounded-md ${
                      currentPage === totalPages ? "bg-primary text-primary-foreground" : ""
                    }`}
                  >
                    {totalPages}
                  </button>
                )}
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="px-2.5 py-1.5 text-sm border rounded-md disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
};
