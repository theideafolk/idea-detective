
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  RefreshCw, 
  TrendingUp, 
  MessageSquare, 
  Eye, 
  X, 
  Filter,
  ArrowUpRight, 
  Calendar,
  AlertCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { searchRedditPosts, getRedditPostComments, type RedditPost } from "@/services/redditAPI";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<RedditPost | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

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

  const openRedditLink = (permalink: string) => {
    window.open(`https://reddit.com${permalink}`, '_blank');
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reddit Listening Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Monitor relevant conversations and track opportunities
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              disabled={isFetching}
              className="flex items-center gap-2"
            >
              <RefreshCw size={16} className={isFetching ? "animate-spin" : ""} />
              {isFetching ? "Refreshing..." : "Refresh"}
            </Button>
            <Button onClick={() => navigate("/")} variant="ghost">
              Back to Home
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-950/40 dark:to-transparent">
              <CardTitle className="text-sm font-medium">
                Tracked Keywords
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +2 added this week
              </p>
              <div className="mt-3 flex flex-wrap gap-1">
                <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950/40">SEO</Badge>
                <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950/40">marketing</Badge>
                <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950/40">tools</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gradient-to-r from-purple-50 to-transparent dark:from-purple-950/40 dark:to-transparent">
              <CardTitle className="text-sm font-medium">
                Monitored Subreddits
              </CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                Across 3 categories
              </p>
              <div className="mt-3 flex flex-wrap gap-1">
                <Badge variant="outline" className="bg-purple-50 dark:bg-purple-950/40">r/marketing</Badge>
                <Badge variant="outline" className="bg-purple-50 dark:bg-purple-950/40">r/SEO</Badge>
                <Badge variant="outline" className="bg-purple-50 dark:bg-purple-950/40">r/socialmedia</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gradient-to-r from-green-50 to-transparent dark:from-green-950/40 dark:to-transparent">
              <CardTitle className="text-sm font-medium">
                New Conversations
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{conversations.length}</div>
              <p className="text-xs text-muted-foreground">
                Updated {isFetching ? 'now' : 'recently'}
              </p>
              <div className="mt-3">
                <Button variant="ghost" className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground" onClick={handleRefresh}>
                  <Calendar className="h-3 w-3 mr-1" />
                  Refresh data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Card className="col-span-3 overflow-hidden border-t-4 border-t-primary/70">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle>Relevant Conversations</CardTitle>
                <div className="flex items-center gap-2">
                  <form onSubmit={handleSearch} className="flex w-full md:w-auto">
                    <div className="relative flex-1 md:w-[300px]">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search by keyword..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button type="submit" className="ml-2">Search</Button>
                  </form>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Most Recent</DropdownMenuItem>
                      <DropdownMenuItem>Most Upvoted</DropdownMenuItem>
                      <DropdownMenuItem>Most Comments</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Conversations</TabsTrigger>
                  <TabsTrigger value="potential">Potential Leads</TabsTrigger>
                  <TabsTrigger value="trending">Trending Topics</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-4">
                  {isLoading ? (
                    // Loading skeletons
                    Array(3).fill(0).map((_, i) => (
                      <div key={i} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2 w-full">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                          </div>
                          <Skeleton className="h-8 w-20" />
                        </div>
                      </div>
                    ))
                  ) : isError ? (
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                      <AlertCircle className="h-10 w-10 text-destructive mb-4" />
                      <h3 className="font-medium text-lg">Error Loading Data</h3>
                      <p className="text-muted-foreground mb-4">
                        There was an error fetching Reddit data. Please try again or check your API credentials.
                      </p>
                      <Button onClick={handleRefresh}>Try Again</Button>
                    </div>
                  ) : filteredConversations.length === 0 ? (
                    <div className="text-center py-10">
                      <p className="text-muted-foreground">No conversations match your criteria.</p>
                      <Button variant="ghost" onClick={() => setActiveTab("all")} className="mt-2">
                        View all conversations
                      </Button>
                    </div>
                  ) : (
                    filteredConversations.map((convo) => (
                      <motion.div 
                        key={convo.id} 
                        className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{convo.title}</h3>
                            <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-muted-foreground">
                              <Badge variant="outline" className="rounded-sm">{convo.subreddit}</Badge>
                              <span>•</span>
                              <span className="flex items-center">
                                <Avatar className="h-4 w-4 mr-1">
                                  <AvatarFallback className="text-[9px]">
                                    {convo.author.slice(0, 2).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                {convo.author}
                              </span>
                              <span>•</span>
                              <span>{convo.time}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-4 w-4" />
                              <span>{convo.upvotes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              <span>{convo.comments}</span>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleViewConversation(convo)}
                              className="ml-2"
                            >
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              View
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </TabsContent>
                
                <TabsContent value="potential" className="space-y-4">
                  {filteredConversations.length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground">
                      <p>No potential leads identified yet.</p>
                      <p className="text-sm mt-2">Try adding more keywords or refreshing the data.</p>
                    </div>
                  ) : (
                    filteredConversations.map((convo) => (
                      <motion.div 
                        key={convo.id} 
                        className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{convo.title}</h3>
                            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                              <Badge variant="outline" className="rounded-sm">{convo.subreddit}</Badge>
                              <span>•</span>
                              <span>{convo.author}</span>
                              <span>•</span>
                              <span>{convo.time}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleViewConversation(convo)}
                            >
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              View
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </TabsContent>
                
                <TabsContent value="trending" className="space-y-4">
                  {filteredConversations.length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground">
                      <p>No trending topics identified yet.</p>
                      <p className="text-sm mt-2">Trending topics will appear as more data is collected.</p>
                    </div>
                  ) : (
                    filteredConversations.map((convo) => (
                      <motion.div 
                        key={convo.id} 
                        className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{convo.title}</h3>
                            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                              <Badge variant="outline" className="rounded-sm">{convo.subreddit}</Badge>
                              <span>•</span>
                              <span>{convo.author}</span>
                              <span>•</span>
                              <span>{convo.time}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleViewConversation(convo)}
                            >
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              View
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Conversation Modal */}
        <AnimatePresence>
          {selectedConversation && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-background rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto"
              >
                <div className="sticky top-0 z-10 flex justify-between items-start p-6 border-b bg-background/95 backdrop-blur-sm">
                  <div>
                    <h2 className="text-xl font-semibold">{selectedConversation.title}</h2>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <Badge variant="outline">{selectedConversation.subreddit}</Badge>
                      <span>•</span>
                      <span>Posted by u/{selectedConversation.author}</span>
                      <span>•</span>
                      <span>{selectedConversation.time}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={closeModal}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <p className="text-foreground">{selectedConversation.content || "No content available."}</p>
                    <div className="flex items-center gap-4 mt-4 text-sm">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        <span>{selectedConversation.upvotes} upvotes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{selectedConversation.comments} comments</span>
                      </div>
                      {selectedConversation.permalink && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="ml-auto text-muted-foreground hover:text-foreground"
                          onClick={() => openRedditLink(selectedConversation.permalink)}
                        >
                          <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
                          View on Reddit
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div>
                    <h3 className="font-medium mb-4">Comments</h3>
                    {isLoadingComments ? (
                      <div className="space-y-4">
                        {Array(3).fill(0).map((_, i) => (
                          <div key={i} className="border rounded-lg p-4">
                            <Skeleton className="h-4 w-28 mb-2" />
                            <Skeleton className="h-3 w-full" />
                            <Skeleton className="h-3 w-3/4 mt-1" />
                          </div>
                        ))}
                      </div>
                    ) : selectedConversation.commentsList.length === 0 ? (
                      <div className="text-center py-4 text-muted-foreground">
                        <p>No comments available for this post.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {selectedConversation.commentsList.map((comment, index) => (
                          <motion.div 
                            key={comment.id || index} 
                            className="border rounded-lg p-4"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                          >
                            <div className="flex justify-between">
                              <span className="font-medium flex items-center">
                                <Avatar className="h-5 w-5 mr-1.5">
                                  <AvatarFallback className="text-[10px]">
                                    {comment.author.slice(0, 2).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                u/{comment.author}
                              </span>
                              <div className="flex items-center gap-1 text-sm">
                                <TrendingUp className="h-4 w-4" />
                                <span>{comment.upvotes}</span>
                              </div>
                            </div>
                            <p className="mt-2">{comment.text}</p>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="sticky bottom-0 border-t p-4 flex justify-end bg-background/95 backdrop-blur-sm">
                  <Button variant="outline" onClick={closeModal}>Close</Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Dashboard;
