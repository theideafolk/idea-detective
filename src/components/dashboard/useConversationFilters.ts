
import { useMemo } from "react";
import { type RedditPost } from "@/services/redditAPI";

export function useConversationFilters(
  conversations: RedditPost[],
  activeTab: string
) {
  // Filter conversations based on the active tab and business relevance
  return useMemo(() => {
    return conversations.filter(convo => {
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
  }, [conversations, activeTab]);
}
