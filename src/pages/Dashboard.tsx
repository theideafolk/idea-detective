
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { type RedditPost } from "@/services/redditAPI";

// Import the refactored components
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AnalyticsCards } from "@/components/dashboard/AnalyticsCards";
import { FilterTabs } from "@/components/dashboard/FilterTabs";
import { ConversationModal } from "@/components/dashboard/ConversationModal";
import { SearchHeader } from "@/components/dashboard/SearchHeader";
import { AdvancedSearch } from "@/components/dashboard/AdvancedSearch";
import { useConversationQueries } from "@/components/dashboard/useConversationQueries";
import { useConversationFilters } from "@/components/dashboard/useConversationFilters";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("opportunities"); // Default to opportunities tab
  const [targetSubreddits, setTargetSubreddits] = useState("SaaS+AI_Agents+artificial+startups+Entrepreneur+OpenAI+boltnewbuilders+smallbusiness");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [timeFilter, setTimeFilter] = useState("month"); // Default to month
  const [sortFilter, setSortFilter] = useState("relevance"); // Default sort order
  
  // Extract active keywords for analytics card
  const activeKeywords = searchQuery.split(/\s+OR\s+/).filter(Boolean);
  
  // Extract active subreddits for analytics card
  const activeSubreddits = targetSubreddits.split('+');

  // Use the conversation queries hook
  const {
    conversations,
    isLoading,
    isError,
    isFetching,
    selectedConversation,
    isLoadingComments,
    handleSearch,
    handleRefresh,
    handleViewConversation,
    closeModal
  } = useConversationQueries(searchQuery, targetSubreddits, timeFilter, sortFilter);

  // Filter conversations based on active tab
  const filteredConversations = useConversationFilters(conversations, activeTab);
  
  const handleSubredditChange = (subreddits: string) => {
    setTargetSubreddits(subreddits);
    toast({
      title: "Subreddits updated",
      description: "Refreshing results with new subreddit selection",
    });
  };

  const handleTimeFilterChange = (time: string) => {
    setTimeFilter(time);
    toast({
      title: "Time filter updated",
      description: `Showing results from the last ${time}`,
    });
  };
  
  const handleSortFilterChange = (filter: string) => {
    setSortFilter(filter);
    toast({
      title: "Sort order updated", 
      description: `Sorting results by ${filter}`,
    });
  };
  
  const handleRemoveKeyword = (keywordToRemove: string) => {
    // Filter out the keyword to remove
    const updatedKeywords = activeKeywords.filter(keyword => keyword !== keywordToRemove);
    // Update the search query
    setSearchQuery(updatedKeywords.join(" OR "));
    
    toast({
      title: "Keyword removed",
      description: `Removed "${keywordToRemove}" from tracked keywords`,
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <DashboardHeader 
          onRefresh={handleRefresh} 
          isFetching={isFetching} 
        />

        <AnalyticsCards 
          conversationCount={conversations.length}
          isRefetching={isFetching}
          onRefresh={handleRefresh}
          activeKeywords={activeKeywords}
          activeSubreddits={activeSubreddits}
          onRemoveKeyword={handleRemoveKeyword}
        />

        <div className="grid grid-cols-1 gap-4">
          <Card className="col-span-3 overflow-hidden border-t-4 border-t-primary/70">
            <CardHeader>
              <SearchHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
                targetSubreddits={targetSubreddits}
                handleSubredditChange={handleSubredditChange}
                timeFilter={timeFilter}
                handleTimeFilterChange={handleTimeFilterChange}
                showAdvancedSearch={showAdvancedSearch}
                setShowAdvancedSearch={setShowAdvancedSearch}
              />
            </CardHeader>
            <CardContent>
              <AdvancedSearch
                showAdvancedSearch={showAdvancedSearch}
                setShowAdvancedSearch={setShowAdvancedSearch}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                sortFilter={sortFilter}
                timeFilter={timeFilter}
                handleSortFilterChange={handleSortFilterChange}
                handleTimeFilterChange={handleTimeFilterChange}
              />
              
              <FilterTabs 
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                conversations={conversations}
                filteredConversations={filteredConversations}
                isLoading={isLoading}
                isError={isError}
                onRefresh={handleRefresh}
                onViewConversation={handleViewConversation}
              />
            </CardContent>
          </Card>
        </div>

        {/* Conversation Modal */}
        <ConversationModal 
          selectedConversation={selectedConversation}
          isLoadingComments={isLoadingComments}
          closeModal={closeModal}
        />
      </motion.div>
    </div>
  );
};

export default Dashboard;
