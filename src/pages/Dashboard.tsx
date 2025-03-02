
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { searchRedditPosts, getRedditPostComments, type RedditPost } from "@/services/redditAPI";
import { useQuery } from "@tanstack/react-query";

// Import the refactored components
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AnalyticsCards } from "@/components/dashboard/AnalyticsCards";
import { SearchBar } from "@/components/dashboard/SearchBar";
import { FilterDropdown } from "@/components/dashboard/FilterDropdown";
import { FilterTabs } from "@/components/dashboard/FilterTabs";
import { ConversationModal } from "@/components/dashboard/ConversationModal";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<RedditPost | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  // Fetch conversations using React Query
  const { 
    data: conversations = [], 
    isLoading, 
    isError, 
    refetch,
    isFetching
  } = useQuery({
    queryKey: ['redditPosts', searchQuery],
    queryFn: () => searchRedditPosts(searchQuery),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Fetch comments when a conversation is selected
  const { 
    data: comments = [],
    isLoading: isLoadingComments
  } = useQuery({
    queryKey: ['redditComments', selectedConversation?.id],
    queryFn: () => {
      if (!selectedConversation) return [];
      // Extract subreddit name without the "r/" prefix
      const subreddit = selectedConversation.subreddit.replace('r/', '');
      return getRedditPostComments(selectedConversation.id, subreddit);
    },
    enabled: !!selectedConversation,
  });

  // Update selected conversation with fetched comments
  useEffect(() => {
    if (selectedConversation && comments.length > 0) {
      setSelectedConversation({
        ...selectedConversation,
        commentsList: comments
      });
    }
  }, [comments]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      toast({
        title: "Search initiated",
        description: `Searching for: ${searchQuery}`,
      });
      refetch();
    }
  };

  const handleRefresh = () => {
    toast({
      title: "Refreshing data",
      description: "Getting the latest conversations from Reddit",
    });
    refetch();
  };

  const handleViewConversation = (conversation: RedditPost) => {
    setSelectedConversation(conversation);
  };

  const closeModal = () => {
    setSelectedConversation(null);
  };

  // Filter conversations based on the active tab
  const filteredConversations = conversations.filter(convo => {
    if (activeTab === "potential") {
      // Posts with more than 20 upvotes could be potential leads
      return convo.upvotes > 20;
    }
    if (activeTab === "trending") {
      // Posts with more than 10 comments could be considered trending
      return convo.comments > 10;
    }
    return true; // "all" tab shows everything
  });

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
        />

        <div className="grid grid-cols-1 gap-4">
          <Card className="col-span-3 overflow-hidden border-t-4 border-t-primary/70">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle>Relevant Conversations</CardTitle>
                <div className="flex items-center gap-2">
                  <SearchBar 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleSearch={handleSearch}
                  />
                  <FilterDropdown />
                </div>
              </div>
            </CardHeader>
            <CardContent>
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
