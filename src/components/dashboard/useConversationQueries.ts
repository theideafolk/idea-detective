
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { 
  searchRedditPosts, 
  getRedditPostComments, 
  type RedditPost
} from "@/services/redditAPI";
import { BUSINESS_QUERY_TEMPLATES } from "./constants";

export function useConversationQueries(
  searchQuery: string, 
  targetSubreddits: string,
  timeFilter: string,
  sortFilter: string
) {
  const [selectedConversation, setSelectedConversation] = useState<RedditPost | null>(null);

  // Fetch conversations using React Query
  const { 
    data: conversations = [], 
    isLoading, 
    isError, 
    refetch,
    isFetching
  } = useQuery({
    queryKey: ['redditPosts', searchQuery, targetSubreddits, timeFilter, sortFilter],
    queryFn: () => {
      // If search query is empty, use one of the business templates randomly
      const effectiveQuery = searchQuery || 
        BUSINESS_QUERY_TEMPLATES[Math.floor(Math.random() * BUSINESS_QUERY_TEMPLATES.length)];
      
      return searchRedditPosts(effectiveQuery, {
        subreddits: targetSubreddits,
        timeFilter: timeFilter,
        sortBy: sortFilter
      });
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
    toast({
      title: "Subreddits updated",
      description: "Refreshing results with new subreddit selection",
    });
    return subreddits;
  };

  const handleTimeFilterChange = (time: string) => {
    toast({
      title: "Time filter updated",
      description: `Showing results from the last ${time}`,
    });
    return time;
  };
  
  const handleSortFilterChange = (filter: string) => {
    toast({
      title: "Sort order updated", 
      description: `Sorting results by ${filter}`,
    });
    return filter;
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

  return {
    conversations,
    isLoading,
    isError,
    refetch,
    isFetching,
    selectedConversation,
    isLoadingComments,
    handleSearch,
    handleRefresh,
    handleViewConversation,
    closeModal,
    handleTimeFilterChange,
    handleSortFilterChange,
    handleSubredditChange
  };
}
