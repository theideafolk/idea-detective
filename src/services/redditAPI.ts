
import { toast } from "@/hooks/use-toast";

// Reddit API credentials
// To get these credentials, you need to:
// 1. Go to https://www.reddit.com/prefs/apps
// 2. Create a new app (select "script" type)
// 3. Fill in the required information
// 4. After creation, you'll get client ID and secret
const REDDIT_CLIENT_ID = "g9xgMKksLNWm_8KnQH054Q"; // Replace with your actual Client ID
const REDDIT_CLIENT_SECRET = "4PFWeZFNXhiW3Td0A52L92i7MvDUyg"; // Replace with your actual Client Secret
const REDDIT_USERNAME = "hello@theideafolk.com"; // Replace with your Reddit username
const REDDIT_PASSWORD = "Reddit@2025"; // Replace with your Reddit password

// Flag to determine if we're using mock data or real API
// Setting to true by default due to authentication issues with the provided credentials
const USE_MOCK_DATA = true;

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
    return accessToken;
  }

  // If we're configured to use mock data, return early with a mock token
  if (USE_MOCK_DATA) {
    console.log("Using mock data, returning mock token");
    return "mock-token";
  }

  try {
    console.log("Attempting to authenticate with Reddit API");
    const basicAuth = btoa(`${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`);
    const response = await fetch("https://www.reddit.com/api/v1/access_token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "password",
        username: REDDIT_USERNAME,
        password: REDDIT_PASSWORD,
      }),
    });

    const responseData = await response.json();
    
    if (!response.ok || responseData.error) {
      console.error("Reddit authentication failed:", responseData);
      throw new Error(`Reddit API authentication error: ${responseData.error || response.status}`);
    }

    const data: RedditAuthResponse = responseData;
    accessToken = data.access_token;
    
    // Set token expiry (subtract 5 minutes to be safe)
    tokenExpiry = Date.now() + (data.expires_in - 300) * 1000;
    console.log("Successfully authenticated with Reddit API");
    
    return accessToken;
  } catch (error) {
    console.error("Failed to get Reddit access token:", error);
    throw error;
  }
};

/**
 * Search Reddit for posts matching a query
 */
export const searchRedditPosts = async (query: string): Promise<RedditPost[]> => {
  // If we're using mock data, return mock data immediately
  if (USE_MOCK_DATA) {
    console.log("Using mock data for Reddit posts");
    return getMockRedditPosts();
  }
  
  // If no query provided, use a default subreddit
  const searchEndpoint = query 
    ? `https://oauth.reddit.com/search.json?q=${encodeURIComponent(query)}&sort=relevance&limit=10` 
    : 'https://oauth.reddit.com/r/marketing+socialmedia+SEO+projectmanagement/hot.json?limit=10';
  
  try {
    const token = await getRedditAccessToken();
    console.log("Fetching Reddit posts with token:", token.substring(0, 5) + "...");
    
    const response = await fetch(searchEndpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Reddit API error response:", errorData);
      throw new Error(`Reddit API error: ${response.status}`);
    }

    const data = await response.json();
    
    return data.data.children.map((child: any) => {
      const post = child.data;
      return {
        id: post.id,
        title: post.title,
        subreddit: `r/${post.subreddit}`,
        author: post.author,
        upvotes: post.ups,
        comments: post.num_comments,
        time: formatRedditTime(post.created_utc),
        content: post.selftext,
        permalink: post.permalink,
        commentsList: [], // Comments will be fetched separately
      };
    });
  } catch (error) {
    console.error("Error searching Reddit:", error);
    toast({
      title: "API Error",
      description: "Could not fetch Reddit data. Using mock data instead.",
      variant: "destructive",
    });
    // Fall back to mock data
    return getMockRedditPosts();
  }
};

/**
 * Get comments for a specific Reddit post
 */
export const getRedditPostComments = async (postId: string, subreddit: string): Promise<RedditComment[]> => {
  // If we're using mock data, return mock data immediately
  if (USE_MOCK_DATA) {
    console.log("Using mock data for Reddit comments");
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
      description: "Could not fetch comments. Using mock data instead.",
      variant: "destructive",
    });
    // Fall back to mock data
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
      title: "Anyone know a good SEO tool that doesn't cost a fortune?",
      subreddit: "r/SEO",
      author: "digital_marketer",
      upvotes: 45,
      comments: 23,
      time: "2 hours ago",
      content: "I've been using a free version of an SEO tool but it's severely limited. Looking for recommendations on affordable options that won't break the bank but still have good keyword research capabilities and competitor analysis.",
      permalink: "/r/SEO/comments/post1",
      commentsList: [
        { id: "c1", author: "SEO_expert", text: "I'd recommend Ahrefs or SEMrush. They're not cheap but worth the investment.", upvotes: 15 },
        { id: "c2", author: "budget_marketer", text: "Check out Ubersuggest. It has a good free tier and the paid version is reasonable.", upvotes: 8 },
        { id: "c3", author: "marketing_pro", text: "I use a combination of free tools - Google Search Console, Keyword Surfer extension, and Google Trends. Works pretty well for basic needs.", upvotes: 12 }
      ]
    },
    {
      id: "post2",
      title: "Looking for recommendations on social media management tools",
      subreddit: "r/socialmedia",
      author: "content_creator",
      upvotes: 32,
      comments: 17,
      time: "5 hours ago",
      content: "I need to manage accounts across Twitter, Instagram, and LinkedIn. Looking for a tool that allows scheduling, analytics, and ideally some content suggestions. Budget is around $30/month.",
      permalink: "/r/socialmedia/comments/post2",
      commentsList: [
        { id: "c4", author: "social_guru", text: "Buffer or Hootsuite are solid options in that price range.", upvotes: 7 },
        { id: "c5", author: "insta_manager", text: "Later.com is great specifically for Instagram but handles other platforms too.", upvotes: 4 },
        { id: "c6", author: "marketing_agency", text: "We use Sprout Social for our clients, but it might be outside your budget. For personal use, Buffer should work well.", upvotes: 9 }
      ]
    },
    {
      id: "post3",
      title: "What project management software do you use for remote teams?",
      subreddit: "r/projectmanagement",
      author: "remote_pm",
      upvotes: 67,
      comments: 41,
      time: "1 day ago",
      content: "Our team of 12 people is now fully remote across 3 time zones. We're looking to switch from our current PM tool to something more remote-friendly with better async communication features. Any recommendations?",
      permalink: "/r/projectmanagement/comments/post3",
      commentsList: [
        { id: "c7", author: "agile_coach", text: "Asana has worked really well for our remote team. The timeline view is especially helpful.", upvotes: 22 },
        { id: "c8", author: "tech_lead", text: "We use a combination of GitHub Projects and Slack. Works well for engineering teams.", upvotes: 18 },
        { id: "c9", author: "product_manager", text: "Monday.com has been great for us. Very visual and customizable.", upvotes: 15 },
        { id: "c10", author: "startup_founder", text: "ClickUp is worth checking out. It has most features of the premium tools at a better price point.", upvotes: 11 }
      ]
    },
    {
      id: "post4",
      title: "Best email marketing platform for a small e-commerce business?",
      subreddit: "r/marketing",
      author: "shopowner",
      upvotes: 28,
      comments: 19,
      time: "7 hours ago",
      content: "We have about 5,000 subscribers and want to improve our email marketing. Currently using Mailchimp but wondering if there are better options for segmentation and automation that won't break the bank.",
      permalink: "/r/marketing/comments/post4",
      commentsList: [
        { id: "c11", author: "email_expert", text: "Klaviyo is fantastic for e-commerce. Better segmentation than Mailchimp and great automation features.", upvotes: 14 },
        { id: "c12", author: "digital_marketer", text: "ActiveCampaign is another good option with powerful automation. Might be worth checking out.", upvotes: 8 },
        { id: "c13", author: "ecom_consultant", text: "I'd stick with Mailchimp if you're not using the advanced features yet. Their new updates have improved a lot.", upvotes: 5 }
      ]
    },
    {
      id: "post5",
      title: "Pros and cons of using AI for content generation?",
      subreddit: "r/marketing",
      author: "content_manager",
      upvotes: 52,
      comments: 37,
      time: "12 hours ago",
      content: "Our team is considering using AI tools like GPT-4 to help with content generation. Has anyone here implemented this in their workflow? What are the benefits and drawbacks you've experienced?",
      permalink: "/r/marketing/comments/post5",
      commentsList: [
        { id: "c14", author: "ai_enthusiast", text: "We use it for first drafts and outlines. Quality is surprisingly good but still needs human editing for brand voice and accuracy.", upvotes: 19 },
        { id: "c15", author: "seo_manager", text: "Be careful with AI content and SEO. Google's helpful content update targets AI-generated content that doesn't provide value.", upvotes: 21 },
        { id: "c16", author: "content_director", text: "It's great for generating ideas and overcoming writer's block. We use it to brainstorm headlines and outlines, then our writers take over.", upvotes: 15 },
        { id: "c17", author: "legal_advisor", text: "Make sure to check the terms of service for the AI tool you're using. Some claim ownership of output or have restrictions on commercial use.", upvotes: 12 }
      ]
    }
  ];
};

// Export default mock data for development
export const mockConversations = getMockRedditPosts();
