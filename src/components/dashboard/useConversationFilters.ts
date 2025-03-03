
import { useMemo } from "react";
import { type RedditPost } from "@/services/redditAPI";

export function useConversationFilters(
  conversations: RedditPost[],
  activeTab: string
) {
  // Filter conversations based on the active tab and business relevance
  return useMemo(() => {
    if (activeTab === "opportunities") {
      // Only show high-quality business opportunities
      return conversations.filter(convo => convo.isBusinessOpportunity === true);
    }
    
    // "all" tab shows everything
    return conversations;
  }, [conversations, activeTab]);
}
