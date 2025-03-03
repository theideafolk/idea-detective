
import { useMemo } from "react";
import { type RedditPost } from "@/services/redditAPI";

export function useConversationFilters(
  conversations: RedditPost[],
  activeTab: string,
  searchQuery?: string
) {
  // Filter conversations based on the active tab, search query, and business relevance
  return useMemo(() => {
    let filtered = [...conversations];
    
    // Apply search query filter if provided
    if (searchQuery && searchQuery.trim() !== '') {
      const searchTerms = searchQuery.toLowerCase().split(/\s+OR\s+/).map(term => term.trim()).filter(Boolean);
      
      if (searchTerms.length > 0) {
        filtered = filtered.filter(post => {
          const postContent = (post.title + " " + post.content).toLowerCase();
          return searchTerms.some(term => postContent.includes(term));
        });
      }
    }
    
    // Apply tab filter
    if (activeTab === "opportunities") {
      // Only show high-quality business opportunities
      return filtered.filter(convo => convo.isBusinessOpportunity === true);
    }
    
    // "all" tab shows everything
    return filtered;
  }, [conversations, activeTab, searchQuery]);
}
