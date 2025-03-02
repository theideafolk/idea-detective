
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Search, RefreshCw, TrendingUp, MessageSquare, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      toast({
        title: "Search initiated",
        description: `Searching for: ${searchQuery}`,
      });
      console.log("Searching for:", searchQuery);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    toast({
      title: "Refreshing data",
      description: "Getting the latest conversations from Reddit",
    });
    
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Data refreshed",
        description: "Latest Reddit conversations loaded",
      });
    }, 1500);
  };

  const mockConversations = [
    {
      id: 1,
      title: "Anyone know a good SEO tool that doesn't cost a fortune?",
      subreddit: "r/SEO",
      author: "digital_marketer",
      upvotes: 45,
      comments: 23,
      time: "2 hours ago"
    },
    {
      id: 2,
      title: "Looking for recommendations on social media management tools",
      subreddit: "r/socialmedia",
      author: "content_creator",
      upvotes: 32,
      comments: 17,
      time: "5 hours ago"
    },
    {
      id: 3,
      title: "What project management software do you use for remote teams?",
      subreddit: "r/projectmanagement",
      author: "remote_pm",
      upvotes: 67,
      comments: 41,
      time: "1 day ago"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reddit Listening Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Monitor relevant conversations and track opportunities
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2"
            >
              <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </Button>
            <Button onClick={() => navigate("/")} variant="ghost">
              Back to Home
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
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
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
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
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                New Conversations
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">
                +5 in the last 24 hours
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Card className="col-span-3">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle>Relevant Conversations</CardTitle>
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
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Conversations</TabsTrigger>
                  <TabsTrigger value="potential">Potential Leads</TabsTrigger>
                  <TabsTrigger value="trending">Trending Topics</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-4">
                  {mockConversations.map((convo) => (
                    <div key={convo.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{convo.title}</h3>
                          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                            <span>{convo.subreddit}</span>
                            <span>•</span>
                            <span>Posted by u/{convo.author}</span>
                            <span>•</span>
                            <span>{convo.time}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4" />
                            <span>{convo.upvotes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{convo.comments}</span>
                          </div>
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="potential" className="p-4 text-center text-muted-foreground">
                  No potential leads identified yet. Try adding more keywords to track.
                </TabsContent>
                <TabsContent value="trending" className="p-4 text-center text-muted-foreground">
                  Trending topics will appear here as more data is collected.
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
