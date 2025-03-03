
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Eye, 
  MessageSquare,
  Calendar
} from "lucide-react";

interface AnalyticsCardsProps {
  conversationCount: number;
  isRefetching: boolean;
  onRefresh: () => void;
  activeKeywords?: string[];
  activeSubreddits?: string[];
}

export const AnalyticsCards: React.FC<AnalyticsCardsProps> = ({
  conversationCount,
  isRefetching,
  onRefresh,
  activeKeywords = [],
  activeSubreddits = [],
}) => {
  // Extract keywords from search query if available
  const displayKeywords = activeKeywords.length > 0 
    ? activeKeywords 
    : ["AI", "development", "custom", "marketing", "tools"];
  
  // Format subreddits for display
  const displaySubreddits = activeSubreddits.length > 0
    ? activeSubreddits.map(s => `r/${s}`)
    : ["r/SaaS", "r/AI_Agents", "r/artificial", "r/startups", "r/Entrepreneur"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-t-2 border-t-reddit-light">
        <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gradient-to-r from-reddit-light/30 to-transparent">
          <CardTitle className="text-sm font-medium">
            Tracked Keywords
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-reddit" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{displayKeywords.length}</div>
          <p className="text-xs text-muted-foreground">
            {isRefetching ? 'Updating now...' : 'Currently tracking'}
          </p>
          <div className="mt-3 flex flex-wrap gap-1">
            {displayKeywords.slice(0, 5).map((keyword, index) => (
              <Badge key={index} variant="outline" className="border-reddit-light text-reddit-dark">
                {keyword}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-t-2 border-t-reddit">
        <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gradient-to-r from-reddit/20 to-transparent">
          <CardTitle className="text-sm font-medium">
            Monitored Subreddits
          </CardTitle>
          <Eye className="h-4 w-4 text-reddit" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{displaySubreddits.length}</div>
          <p className="text-xs text-muted-foreground">
            {isRefetching ? 'Updating now...' : 'Currently monitoring'}
          </p>
          <div className="mt-3 flex flex-wrap gap-1">
            {displaySubreddits.slice(0, 5).map((subreddit, index) => (
              <Badge key={index} variant="outline" className="border-reddit text-reddit">
                {subreddit}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-t-2 border-t-reddit-dark">
        <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gradient-to-r from-reddit-dark/20 to-transparent">
          <CardTitle className="text-sm font-medium">
            New Conversations
          </CardTitle>
          <MessageSquare className="h-4 w-4 text-reddit-dark" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{conversationCount}</div>
          <p className="text-xs text-muted-foreground">
            Updated {isRefetching ? 'now' : 'recently'}
          </p>
          <div className="mt-3">
            <Button variant="ghost" className="p-0 h-auto text-sm text-reddit hover:text-reddit-dark" onClick={onRefresh}>
              <Calendar className="h-3 w-3 mr-1" />
              Refresh data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
