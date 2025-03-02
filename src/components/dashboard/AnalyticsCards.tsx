
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
}

export const AnalyticsCards: React.FC<AnalyticsCardsProps> = ({
  conversationCount,
  isRefetching,
  onRefresh,
}) => {
  return (
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
          <div className="text-2xl font-bold">{conversationCount}</div>
          <p className="text-xs text-muted-foreground">
            Updated {isRefetching ? 'now' : 'recently'}
          </p>
          <div className="mt-3">
            <Button variant="ghost" className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground" onClick={onRefresh}>
              <Calendar className="h-3 w-3 mr-1" />
              Refresh data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
