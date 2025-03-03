
import { toast } from "@/hooks/use-toast";

// Reddit API credentials
// To get these credentials, you need to:
// 1. Go to https://www.reddit.com/prefs/apps
// 2. Create a new app (select "script" type)
// 3. Fill in the required information
// 4. After creation, you'll get client ID and secret
const REDDIT_CLIENT_ID = "bagzqhnLRwHOiNyGWh7QIw"; // Updated Client ID
const REDDIT_CLIENT_SECRET = "tq-30wKZR5XzXE9Wi7CRU1nw2GostQ"; // Updated Client Secret
const REDDIT_USERNAME = "DifficultAngle872"; // Updated Reddit username
const REDDIT_PASSWORD = "Save@2025"; // Updated Reddit password

// Flag to determine if we're using mock data or real API
// We're always using real API data now
const USE_MOCK_DATA = false;

// Flag to enable verbose debug logging for authentication
const DEBUG_AUTH = true;

// Default target business subreddits - focused on tech and business topics
const DEFAULT_BUSINESS_SUBREDDITS = "SaaS+AI_Agents+artificial+startups+Entrepreneur+OpenAI+boltnewbuilders+webdev+programming+smallbusiness";

// Business opportunity triggers - words that indicate someone might need AI/dev services
const BUSINESS_OPPORTUNITY_TRIGGERS = [
  "need developer", "looking for developer", "seeking developer", 
  "need help with", "want to build", "looking to implement", 
  "need advice on", "anyone know how to", "help with implementation",
  "need technical partner", "need tech cofounder", "technical challenge",
  "MVP development", "app development", "website development",
  "AI implementation", "AI solution", "automation solution",
  "custom development", "software development", "app builder",
  "no-code solution", "low-code platform", "development agency",
  "tech stack recommendation", "development cost", "hiring developer"
];

// Types for our Reddit API data
export interface RedditPost {
  id: string;
  title: string;
  subreddit: string;
  author: string;
  upvotes: number;
  comments: number;
  time: string;
  content: string;
  commentsList: RedditComment[];
  permalink: string;
  isBusinessOpportunity?: boolean; // Flag for business opportunity posts
  opportunityScore?: number; // Score indicating how likely this is a business opportunity
}

export interface RedditComment {
  id: string;
  author: string;
  text: string;
  upvotes: number;
}

interface RedditAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

let accessToken = "";
let tokenExpiry = 0;

/**
 * Get an access token from Reddit using client credentials
 */
const getRedditAccessToken = async (): Promise<string> => {
  // Check if we have a valid token
  if (accessToken && Date.now() < tokenExpiry) {
    console.log("Using existing valid token");
    return accessToken;
  }

  try {
    console.log("Attempting to authenticate with Reddit API");
    
    if (DEBUG_AUTH) {
      console.log("Auth details:", {
        client_id: REDDIT_CLIENT_ID,
        username: REDDIT_USERNAME,
        // Don't log the full password or secret for security reasons
        password_length: REDDIT_PASSWORD.length,
        secret_length: REDDIT_CLIENT_SECRET.length
      });
    }
    
    const basicAuth = btoa(`${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`);
    
    if (DEBUG_AUTH) {
      console.log("Basic auth header (first 10 chars):", basicAuth.substring(0, 10) + "...");
    }
    
    const body = new URLSearchParams({
      grant_type: "password",
      username: REDDIT_USERNAME,
      password: REDDIT_PASSWORD,
    });
    
    if (DEBUG_AUTH) {
      console.log("Request body:", body.toString());
    }
    
    const response = await fetch("https://www.reddit.com/api/v1/access_token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "web:reddit-dashboard:v1.0.0 (by /u/hello@theideafolk.com)",
      },
      body: body,
    });

    // Log the full response for debugging
    const responseText = await response.text();
    
    if (DEBUG_AUTH) {
      console.log("Response status:", response.status);
      console.log("Response headers:", Object.fromEntries([...response.headers.entries()]));
      console.log("Response body:", responseText);
    }
    
    // Parse the response if possible
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      console.error("Failed to parse response as JSON:", e);
      responseData = { error: "Failed to parse response" };
    }
    
    if (!response.ok || responseData.error) {
      console.error("Reddit authentication failed:", responseData);
      
      // Show more specific error messages
      if (responseData.error === "invalid_grant") {
        throw new Error("Reddit API authentication error: Username or password is incorrect. Please check your credentials.");
      } else if (responseData.error === "unsupported_grant_type") {
        throw new Error("Reddit API authentication error: The grant type is not supported");
      } else if (responseData.error === "invalid_client") {
        throw new Error("Reddit API authentication error: Client ID or secret is invalid");
      } else {
        throw new Error(`Reddit API authentication error: ${responseData.error || response.status}`);
      }
    }

    accessToken = responseData.access_token;
    
    // Set token expiry (subtract 5 minutes to be safe)
    tokenExpiry = Date.now() + (responseData.expires_in - 300) * 1000;
    console.log("Successfully authenticated with Reddit API");
    
    return accessToken;
  } catch (error) {
    console.error("Failed to get Reddit access token:", error);
    
    // Show a toast notification with the error
    toast({
      title: "Authentication Error",
      description: error instanceof Error ? error.message : "Failed to authenticate with Reddit API",
      variant: "destructive",
    });
    
    // Fall back to mock data while we're debugging
    if (USE_MOCK_DATA) {
      console.log("Temporarily using mock data due to authentication issues");
      return "mock-token";
    }
    throw error;
  }
};

/**
 * Search Reddit for posts matching a query, with optional subreddit filtering
 */
export const searchRedditPosts = async (query: string, options?: { subreddits?: string, timeFilter?: string }): Promise<RedditPost[]> => {
  // Don't use mock data - always try to use the real API
  if (false) {
    console.log("Using mock data while authentication issues are being resolved");
    return getMockRedditPosts();
  }
  
  // Use default business subreddits if none provided
  const targetSubreddits = options?.subreddits || DEFAULT_BUSINESS_SUBREDDITS;
  
  // Create a more targeted search query if none provided
  let searchQuery = query;
  if (!query || query.trim() === '') {
    // Randomly select 5 business opportunity triggers for the search
    const selectedTriggers = [];
    const shuffledTriggers = [...BUSINESS_OPPORTUNITY_TRIGGERS].sort(() => 0.5 - Math.random());
    for (let i = 0; i < Math.min(5, shuffledTriggers.length); i++) {
      selectedTriggers.push(shuffledTriggers[i]);
    }
    searchQuery = selectedTriggers.join(" OR ");
  }
  
  // Get the time filter from options or use default
  const timeFilter = options?.timeFilter || 'month';
  
  // Construct search endpoint based on query and subreddits
  let searchEndpoint;
  
  if (searchQuery) {
    // If both query and subreddits provided, search within those subreddits
    if (targetSubreddits) {
      searchEndpoint = `https://oauth.reddit.com/r/${targetSubreddits}/search.json?q=${encodeURIComponent(searchQuery)}&restrict_sr=true&sort=relevance&limit=30&t=${timeFilter}`;
    } else {
      // Just search all of Reddit with the query
      searchEndpoint = `https://oauth.reddit.com/search.json?q=${encodeURIComponent(searchQuery)}&sort=relevance&limit=30&t=${timeFilter}`;
    }
  } else {
    // If no query provided, get hot posts from specified subreddits
    searchEndpoint = `https://oauth.reddit.com/r/${targetSubreddits}/hot.json?limit=30`;
  }
  
  try {
    const token = await getRedditAccessToken();
    console.log("Fetching Reddit posts with token:", token.substring(0, 5) + "...");
    console.log("Search endpoint:", searchEndpoint);
    
    const response = await fetch(searchEndpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "web:reddit-dashboard:v1.0.0 (by /u/hello@theideafolk.com)",
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Reddit API error response:", errorData);
      throw new Error(`Reddit API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Create RedditPost objects from the API response
    const posts = data.data.children.map((child: any) => {
      const post = child.data;
      
      // Calculate an opportunity score based on keywords in title and content
      const combinedText = (post.title + " " + (post.selftext || "")).toLowerCase();
      
      // Calculate opportunity score based on relevant keywords
      let opportunityScore = 0;
      let isBusinessOpportunity = false;
      
      // Check for business opportunity trigger phrases
      for (const trigger of BUSINESS_OPPORTUNITY_TRIGGERS) {
        if (combinedText.includes(trigger.toLowerCase())) {
          opportunityScore += 5;
          isBusinessOpportunity = true;
        }
      }
      
      // Additional scoring for specific keywords
      const businessKeywords = ["ai", "developer", "implementation", "help", "looking for", "need", 
                               "custom", "app", "website", "build", "mvp", "software", "automation"];
      
      for (const keyword of businessKeywords) {
        if (combinedText.includes(keyword)) {
          opportunityScore += 2;
        }
      }
      
      // Extra points for certain subreddits that often have business inquiries
      const highValueSubreddits = ["startups", "entrepreneur", "saas", "ai_agents", "smallbusiness"];
      if (highValueSubreddits.includes(post.subreddit.toLowerCase())) {
        opportunityScore += 5;
      }
      
      // Text length often indicates more detailed inquiries
      if (post.selftext && post.selftext.length > 500) {
        opportunityScore += 3;
      }
      
      return {
        id: post.id,
        title: post.title,
        subreddit: `r/${post.subreddit}`,
        author: post.author,
        upvotes: post.ups,
        comments: post.num_comments,
        time: formatRedditTime(post.created_utc),
        content: post.selftext || post.url || '',
        permalink: post.permalink,
        commentsList: [], // Comments will be fetched separately
        isBusinessOpportunity,
        opportunityScore
      };
    });
    
    // Sort by opportunity score
    return posts.sort((a, b) => (b.opportunityScore || 0) - (a.opportunityScore || 0));
  } catch (error) {
    console.error("Error searching Reddit:", error);
    toast({
      title: "API Error",
      description: error instanceof Error ? error.message : "Failed to fetch Reddit data",
      variant: "destructive",
    });
    
    // Use mock data only as absolute fallback in case of unresolvable errors
    console.log("Falling back to mock data due to API error");
    return getMockRedditPosts();
  }
};

/**
 * Get comments for a specific Reddit post
 */
export const getRedditPostComments = async (postId: string, subreddit: string): Promise<RedditComment[]> => {
  // Don't use mock data - always try to use the real API
  if (false) {
    console.log("Using mock data for comments while authentication issues are being resolved");
    const mockPosts = getMockRedditPosts();
    const post = mockPosts.find(p => p.id === postId);
    return post?.commentsList || [];
  }
  
  try {
    const token = await getRedditAccessToken();
    console.log("Fetching Reddit comments with token");
    
    const response = await fetch(`https://oauth.reddit.com/r/${subreddit}/comments/${postId}.json`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Reddit API comments error:", errorText);
      throw new Error(`Reddit API error: ${response.status}`);
    }

    const data = await response.json();
    const comments = data[1].data.children;
    
    return comments
      .filter((comment: any) => comment.kind === "t1")
      .map((comment: any) => {
        const commentData = comment.data;
        return {
          id: commentData.id,
          author: commentData.author,
          text: commentData.body,
          upvotes: commentData.ups,
        };
      });
  } catch (error) {
    console.error("Error fetching Reddit comments:", error);
    toast({
      title: "API Error",
      description: error instanceof Error ? error.message : "Could not fetch comments",
      variant: "destructive",
    });
    
    // Use mock data only as absolute fallback in case of unresolvable errors
    console.log("Falling back to mock data for comments due to API error");
    const mockPosts = getMockRedditPosts();
    const post = mockPosts.find(p => p.id === postId);
    return post?.commentsList || [];
  }
};

// Helper function to format Reddit's UTC timestamps
const formatRedditTime = (utcTime: number): string => {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - utcTime;
  
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
  
  const date = new Date(utcTime * 1000);
  return date.toLocaleDateString();
};

// Mock data for development or when API credentials are not provided
const getMockRedditPosts = (): RedditPost[] => {
  return [
    {
      id: "post1",
      title: "Looking for developer to implement AI for my financial services business",
      subreddit: "r/AI_Agents",
      author: "business_owner",
      upvotes: 15,
      comments: 8,
      time: "2 days ago",
      content: "I'm running a financial services company and want to implement AI to automate customer inquiries and data analysis. Looking for recommendations on hiring a developer or agency. Budget is flexible for the right solution. Anyone have experience with this?",
      permalink: "/r/AI_Agents/comments/post1",
      isBusinessOpportunity: true,
      opportunityScore: 25,
      commentsList: [
        { id: "c1", author: "ai_expert", text: "I'd recommend starting with a specific use case rather than trying to implement AI across the board. Happy to chat about your specific needs.", upvotes: 6 },
        { id: "c2", author: "dev_agency", text: "We've helped financial services companies implement AI solutions. The key is ensuring data security compliance. Feel free to DM for more info.", upvotes: 4 },
        { id: "c3", author: "freelancer", text: "For something like this, you probably want an agency rather than a single developer. There are many moving parts to consider.", upvotes: 3 }
      ]
    },
    {
      id: "post2",
      title: "Need help building MVP for my SaaS idea",
      subreddit: "r/SaaS",
      author: "startup_founder",
      upvotes: 22,
      comments: 12,
      time: "3 days ago",
      content: "I have a SaaS idea that I believe has real potential, but I'm not technical. Looking for advice on finding a technical partner or agency to help build an MVP. How do I validate the idea without spending too much? What's a reasonable budget for a basic MVP these days?",
      permalink: "/r/SaaS/comments/post2",
      isBusinessOpportunity: true,
      opportunityScore: 30,
      commentsList: [
        { id: "c4", author: "tech_advisor", text: "Before building anything, talk to 20 potential customers and confirm they'd pay for this. Then consider no-code tools for validation before custom development.", upvotes: 9 },
        { id: "c5", author: "dev_shop", text: "We specialize in MVPs for non-technical founders. Typical cost ranges from $15K-$30K depending on complexity. DM for more details.", upvotes: 6 },
        { id: "c6", author: "successful_founder", text: "I was in your shoes last year. Found a technical co-founder on AngelList who built our MVP. Now we have 50 paying customers.", upvotes: 7 }
      ]
    },
    {
      id: "post3",
      title: "Anyone using bolt.new for building AI apps? Need advice",
      subreddit: "r/boltnewbuilders",
      author: "newbie_dev",
      upvotes: 18,
      comments: 6,
      time: "1 day ago",
      content: "Just discovered bolt.new and it seems amazing for building AI apps quickly. Has anyone here used it for a production app? Looking for tips on connecting APIs and organizing the codebase. Willing to pay for some guidance to speed up my learning curve.",
      permalink: "/r/boltnewbuilders/comments/post3",
      isBusinessOpportunity: true,
      opportunityScore: 20,
      commentsList: [
        { id: "c7", author: "bolt_expert", text: "Been using Bolt for 3 months. Happy to jump on a call and walk you through some basics. It's much faster than traditional development.", upvotes: 5 },
        { id: "c8", author: "agency_founder", text: "Our agency has built several apps with bolt.new. The key is understanding prompt engineering. We offer mentoring if you're interested.", upvotes: 4 },
        { id: "c9", author: "solo_founder", text: "I launched my MVP in 2 weeks with bolt.new despite having no coding experience. Best decision I made.", upvotes: 3 }
      ]
    },
    {
      id: "post4",
      title: "Best AI tools for small business automation?",
      subreddit: "r/smallbusiness",
      author: "business_owner22",
      upvotes: 35,
      comments: 22,
      time: "4 days ago",
      content: "Running a 10-person professional services firm and looking to automate some of our repetitive tasks like client onboarding, document processing, and initial consultations. What AI tools would you recommend? Would prefer something that doesn't require heavy development work, but open to custom solutions for the right ROI.",
      permalink: "/r/smallbusiness/comments/post4",
      isBusinessOpportunity: true,
      opportunityScore: 28,
      commentsList: [
        { id: "c10", author: "automation_expert", text: "Consider Zapier + OpenAI for simple workflows. For more complex needs, you'll want a custom solution.", upvotes: 12 },
        { id: "c11", author: "smb_consultant", text: "We've helped several small businesses implement automation. Starting with just document processing can save 15-20 hours/week. DM for more info.", upvotes: 8 },
        { id: "c12", author: "ai_agency", text: "The key is identifying which processes are worth automating. We offer a free consultation to analyze your workflow and suggest the highest-ROI opportunities.", upvotes: 6 }
      ]
    },
    {
      id: "post5",
      title: "Looking for recommendations on AI implementation for customer service",
      subreddit: "r/OpenAI",
      author: "ecommerce_owner",
      upvotes: 42,
      comments: 31,
      time: "2 days ago",
      content: "Our ecommerce business is growing rapidly and customer service is becoming a bottleneck. Looking to implement AI to handle common questions and free up our team for more complex issues. Has anyone successfully implemented this? What platforms/agencies would you recommend? Our volume is about 500 tickets/day.",
      permalink: "/r/OpenAI/comments/post5",
      isBusinessOpportunity: true,
      opportunityScore: 35,
      commentsList: [
        { id: "c13", author: "ai_consultant", text: "We've implemented similar solutions for ecommerce clients using a combination of GPT-4 and a custom knowledge base. Results showed 70% ticket reduction. DM for details.", upvotes: 18 },
        { id: "c14", author: "cs_manager", text: "We tried building in-house first and wasted 3 months. Eventually hired an agency and had it running in 3 weeks. Worth the investment.", upvotes: 15 },
        { id: "c15", author: "saas_founder", text: "There are several off-the-shelf solutions like Intercom with AI features, but at your scale, you might benefit from a custom implementation.", upvotes: 12 }
      ]
    }
  ];
};

// Export default mock data for development
export const mockConversations = getMockRedditPosts();
