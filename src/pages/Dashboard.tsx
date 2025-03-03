
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

// Predefined business queries targeting potential clients looking for AI/tech services
const BUSINESS_QUERY_TEMPLATES = [
  "looking for developer OR seeking developer OR need AI implementation OR hiring developer OR tech partner",
  "build custom AI OR implement AI solutions OR AI for business OR business automation OR custom software",
  "need tech cofounder OR looking for technical partner OR MVP development OR startup tech help OR bolt.new",
  "seeking agency OR looking for agency OR need development team OR outsource development OR custom app",
  "SaaS development OR AI integration OR custom software development OR automation solution OR no coding"
];

// Business subreddits targeting potential clients
const BUSINESS_SUBREDDITS = [
  "SaaS", "AI_Agents", "artificial", "startups", "Entrepreneur", 
  "smallbusiness", "business", "technology", "OpenAI", "boltnewbuilders",
  "webdev", "programming", "MachineLearning", "nocode", "lowcode"
];

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<RedditPost | null>(null);
  const [activeTab, setActiveTab] = useState("opportunities"); // Default to opportunities tab
  const [targetSubreddits, setTargetSubreddits] = useState("SaaS+AI_Agents+artificial+startups+Entrepreneur+OpenAI+boltnewbuilders+smallbusiness");

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
      description: "Getting the latest business opportunities from Reddit",
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
    // Business opportunity indicators - now we have explicit flags from the API
    const isOpportunity = convo.isBusinessOpportunity || false;
    const opportunityScore = convo.opportunityScore || 0;
    
    // Additional text-based filtering for extra precision
    const titleAndContent = (convo.title + " " + convo.content).toLowerCase();
    
    const hasClientKeywords = 
      titleAndContent.includes("looking for") || 
      titleAndContent.includes("need help") ||
      titleAndContent.includes("seeking") ||
      titleAndContent.includes("want to build") ||
      titleAndContent.includes("recommendations") ||
      titleAndContent.includes("advice on");
    
    const hasBusinessKeywords = 
      titleAndContent.includes("business") || 
      titleAndContent.includes("startup") ||
      titleAndContent.includes("company") ||
      titleAndContent.includes("budget") ||
      titleAndContent.includes("hire") ||
      titleAndContent.includes("investment");
    
    const hasTechKeywords = 
      titleAndContent.includes("developer") || 
      titleAndContent.includes("development") ||
      titleAndContent.includes("ai") ||
      titleAndContent.includes("custom") ||
      titleAndContent.includes("automation") ||
      titleAndContent.includes("software");
    
    if (activeTab === "opportunities") {
      // High-quality business opportunities 
      return isOpportunity && opportunityScore > 15;
    }
    
    if (activeTab === "potential") {
      // Posts with moderate opportunity score and business keywords
      return (opportunityScore > 5) && hasClientKeywords && (hasBusinessKeywords || hasTechKeywords);
    }
    
    if (activeTab === "ai") {
      // Posts specifically about AI
      return titleAndContent.includes("ai") || 
             titleAndContent.includes("artificial intelligence") ||
             titleAndContent.includes("machine learning") ||
             titleAndContent.includes("automation");
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
              <div className="mb-4">
                <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
                  <button
                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                      activeTab === "opportunities"
                        ? "bg-background text-foreground shadow-sm"
                        : "hover:bg-background/50"
                    }`}
                    onClick={() => setActiveTab("opportunities")}
                  >
                    Business Opportunities
                  </button>
                  <button
                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                      activeTab === "potential"
                        ? "bg-background text-foreground shadow-sm"
                        : "hover:bg-background/50"
                    }`}
                    onClick={() => setActiveTab("potential")}
                  >
                    Potential Leads
                  </button>
                  <button
                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                      activeTab === "ai"
                        ? "bg-background text-foreground shadow-sm"
                        : "hover:bg-background/50"
                    }`}
                    onClick={() => setActiveTab("ai")}
                  >
                    AI Discussion
                  </button>
                  <button
                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                      activeTab === "all"
                        ? "bg-background text-foreground shadow-sm"
                        : "hover:bg-background/50"
                    }`}
                    onClick={() => setActiveTab("all")}
                  >
                    All Posts
                  </button>
                </div>
              </div>
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
