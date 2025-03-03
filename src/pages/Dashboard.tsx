
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

// Predefined business queries for better targeting
const BUSINESS_QUERY_TEMPLATES = [
  "looking for developer OR seeking developer OR need AI implementation OR hiring developer",
  "build custom AI OR implement AI solutions OR AI for business OR business automation",
  "need tech cofounder OR looking for technical partner OR MVP development OR startup tech help",
  "seeking agency OR looking for agency OR need development team OR outsource development",
  "SaaS development OR AI integration OR custom software development"
];

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<RedditPost | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [targetSubreddits, setTargetSubreddits] = useState("SaaS+AI_Agents+artificial+startups+Entrepreneur");

  // Business-focused subreddits
  const BUSINESS_SUBREDDITS = [
    "SaaS", "AI_Agents", "artificial", "startups", "Entrepreneur", 
    "smallbusiness", "business", "technology", "BusinessIntelligence", 
    "marketing", "socialmedia", "webdev", "programming", "MachineLearning"
  ];

  // Fetch conversations using React Query
  const { 
    data: conversations = [], 
    isLoading, 
    isError, 
    refetch,
    isFetching
  } = useQuery({
    queryKey: ['redditPosts', searchQuery, targetSubreddits],
    queryFn: () => {
      // If search query is empty, use one of the business templates randomly
      const effectiveQuery = searchQuery || 
        BUSINESS_QUERY_TEMPLATES[Math.floor(Math.random() * BUSINESS_QUERY_TEMPLATES.length)];
      
      return searchRedditPosts(effectiveQuery, targetSubreddits);
    },
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
  
  const handleSubredditChange = (subreddits: string) => {
    setTargetSubreddits(subreddits);
    refetch();
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

  // Filter conversations based on the active tab and business relevance
  const filteredConversations = conversations.filter(convo => {
    // Business relevance indicators
    const hasBusinessKeywords = 
      convo.title.toLowerCase().includes("business") || 
      convo.title.toLowerCase().includes("startup") ||
      convo.title.toLowerCase().includes("company") ||
      convo.title.toLowerCase().includes("development") ||
      convo.title.toLowerCase().includes("looking for") ||
      convo.title.toLowerCase().includes("help with") ||
      convo.title.toLowerCase().includes("need") ||
      convo.content.toLowerCase().includes("business") ||
      convo.content.toLowerCase().includes("startup") ||
      convo.content.toLowerCase().includes("company") ||
      convo.content.toLowerCase().includes("looking for developer");
    
    if (activeTab === "potential") {
      // Posts with more than 5 upvotes and business keywords could be potential leads
      return convo.upvotes > 5 && hasBusinessKeywords;
    }
    if (activeTab === "trending") {
      // Posts with more than 10 comments and business keywords could be considered trending
      return convo.comments > 10 && hasBusinessKeywords;
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
                <CardTitle>Business Opportunities</CardTitle>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                  <SearchBar 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleSearch={handleSearch}
                    businessSubreddits={BUSINESS_SUBREDDITS}
                    currentSubreddits={targetSubreddits}
                    onSubredditChange={handleSubredditChange}
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
