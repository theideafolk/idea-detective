import axios from 'axios';

// Define the Reddit API base URL
const REDDIT_API_BASE_URL = 'https://www.reddit.com';

// Define the default subreddits for business opportunities
const DEFAULT_BUSINESS_SUBREDDITS = 'SaaS+AI_Agents+artificial+startups+Entrepreneur+OpenAI+boltnewbuilders+smallbusiness';

// Define the Reddit API OAuth URL
const REDDIT_API_OAUTH_URL = 'https://oauth.reddit.com';

// Define the client ID and secret for the Reddit API
const REDDIT_CLIENT_ID = process.env.NEXT_PUBLIC_REDDIT_CLIENT_ID;
const REDDIT_CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;

// Define the user agent for the Reddit API
const USER_AGENT = 'Business Opportunity Finder v1.0 (by /u/autotribune)';

// Define the mock business opportunities
const mockBusinessOpportunities = [
  {
    id: '1',
    title: 'Looking for a developer to build a SaaS product',
    content: 'I have an idea for a SaaS product and I am looking for a developer to help me build it.',
    url: 'https://www.reddit.com/r/SaaS/comments/1234567/looking_for_a_developer_to_build_a_saas_product/',
    score: 100,
    comments: 10,
    subreddit: 'r/SaaS',
    created: 1678886400,
    author: 'johndoe',
    isBusinessOpportunity: true,
    opportunityScore: 0.8,
    commentsList: []
  },
  {
    id: '2',
    title: 'Need help with AI implementation for my startup',
    content: 'I am looking for someone to help me implement AI in my startup. I am not sure where to start.',
    url: 'https://www.reddit.com/r/AI_Agents/comments/1234567/need_help_with_ai_implementation_for_my_startup/',
    score: 50,
    comments: 5,
    subreddit: 'r/AI_Agents',
    created: 1678886400,
    author: 'janedoe',
    isBusinessOpportunity: true,
    opportunityScore: 0.6,
    commentsList: []
  },
  {
    id: '3',
    title: 'Seeking a technical co-founder for my new venture',
    content: 'I have a great idea but lack the technical skills to bring it to life. Looking for a co-founder.',
    url: 'https://www.reddit.com/r/startups/comments/1234567/seeking_a_technical_cofounder_for_my_new_venture/',
    score: 75,
    comments: 8,
    subreddit: 'r/startups',
    created: 1678886400,
    author: 'techfounder',
    isBusinessOpportunity: true,
    opportunityScore: 0.7,
    commentsList: []
  },
  {
    id: '4',
    title: 'Looking for an agency to outsource development work',
    content: 'Our company needs to outsource some development tasks. Seeking recommendations for reliable agencies.',
    url: 'https://www.reddit.com/r/Entrepreneur/comments/1234567/looking_for_an_agency_to_outsource_development/',
    score: 60,
    comments: 6,
    subreddit: 'r/Entrepreneur',
    created: 1678886400,
    author: 'outsourcingexpert',
    isBusinessOpportunity: true,
    opportunityScore: 0.65,
    commentsList: []
  },
  {
    id: '5',
    title: 'Need help with SaaS development, no coding experience',
    content: 'I have a SaaS idea but no coding skills. Looking for guidance and potential partners to develop it.',
    url: 'https://www.reddit.com/r/nocode/comments/1234567/need_help_with_saas_development_no_coding/',
    score: 40,
    comments: 4,
    subreddit: 'r/nocode',
    created: 1678886400,
    author: 'nocodefounder',
    isBusinessOpportunity: true,
    opportunityScore: 0.55,
    commentsList: []
  }
];

// Define the Reddit post type
export type RedditPost = {
  id: string;
  title: string;
  content: string;
  url: string;
  score: number;
  comments: number;
  subreddit: string;
  created: number;
  author: string;
  isBusinessOpportunity: boolean;
  opportunityScore: number;
  commentsList: RedditComment[];
};

// Define the Reddit comment type
export type RedditComment = {
  id: string;
  author: string;
  body: string;
  score: number;
  created: number;
};

/**
 * Get Reddit API access token using client credentials grant
 */
const getRedditAccessToken = async (): Promise<string | null> => {
  try {
    const authString = `${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`;
    const encodedAuth = Buffer.from(authString).toString('base64');

    const response = await axios.post(
      'https://www.reddit.com/api/v1/access_token',
      'grant_type=client_credentials',
      {
        headers: {
          'Authorization': `Basic ${encodedAuth}`,
          'User-Agent': USER_AGENT,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return response.data.access_token;
  } catch (error: any) {
    console.error('Error getting Reddit API access token:', error.message);
    return null;
  }
};

/**
 * Search Reddit for posts matching a query, with optional subreddit filtering
 */
export const searchRedditPosts = async (query: string, options?: { subreddits?: string, timeFilter?: string, sortBy?: string }): Promise<RedditPost[]> => {
  // Don't use mock data - always try to use the real API
  if (false) {
    console.log("Using mock data while authentication issues are being resolved");
    return mockBusinessOpportunities;
  }
  
  // Use default business subreddits if none provided
  const targetSubreddits = options?.subreddits || DEFAULT_BUSINESS_SUBREDDITS;
  
  // Create a more targeted search query if none provided
  let searchQuery = query;
  if (!searchQuery) {
    // Randomly select one of our business opportunity trigger phrases
    const businessTriggers = [
      "looking for developer", "need technical help", "seeking development partner",
      "want to build app", "software recommendation", "hiring programmer"
    ];
    const selectedTriggers = businessTriggers.slice(0, 2 + Math.floor(Math.random() * 3));
    searchQuery = selectedTriggers.join(" OR ");
  }
  
  // Get the time filter from options or use default
  const timeFilter = options?.timeFilter || 'month';
  
  // Get the sort order from options or use default
  const sortBy = options?.sortBy || 'relevance';
  
  // Construct search endpoint based on query and subreddits
  let searchEndpoint;
  
  if (searchQuery) {
    // If both query and subreddits provided, search within those subreddits
    if (targetSubreddits) {
      searchEndpoint = `https://oauth.reddit.com/r/${targetSubreddits}/search.json?q=${encodeURIComponent(searchQuery)}&restrict_sr=true&sort=${sortBy}&limit=30&t=${timeFilter}`;
    } else {
      // Just search all of Reddit with the query
      searchEndpoint = `https://oauth.reddit.com/search.json?q=${encodeURIComponent(searchQuery)}&sort=${sortBy}&limit=30&t=${timeFilter}`;
    }
  } else {
    // If no query provided, get hot posts from specified subreddits
    searchEndpoint = `https://oauth.reddit.com/r/${targetSubreddits}/hot.json?limit=30`;
  }
  
  try {
    // Get the Reddit API access token
    const accessToken = await getRedditAccessToken();
    if (!accessToken) {
      console.error('Failed to obtain Reddit API access token.');
      return [];
    }
    
    // Make the request to the Reddit API
    const response = await axios.get(searchEndpoint, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': USER_AGENT,
      },
    });
    
    // Map the response data to the RedditPost type
    const posts: RedditPost[] = response.data.data.children.map((child: any) => {
      const postData = child.data;
      
      // Extract keywords from title and content
      const titleAndContent = (postData.title + " " + postData.selftext).toLowerCase();
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
      
      // Calculate a simple opportunity score based on keyword matches
      let opportunityScore = 0;
      if (hasClientKeywords) opportunityScore += 5;
      if (hasBusinessKeywords) opportunityScore += 7;
      if (hasTechKeywords) opportunityScore += 3;
      
      return {
        id: postData.id,
        title: postData.title,
        content: postData.selftext,
        url: `${REDDIT_API_BASE_URL}${postData.permalink}`,
        score: postData.score,
        comments: postData.num_comments,
        subreddit: `r/${postData.subreddit}`,
        created: postData.created_utc,
        author: postData.author,
        isBusinessOpportunity: hasClientKeywords && (hasBusinessKeywords || hasTechKeywords),
        opportunityScore: opportunityScore,
        commentsList: []
      };
    });
    
    return posts;
  } catch (error: any) {
    console.error('Error searching Reddit posts:', error);
    return [];
  }
};

/**
 * Get comments for a specific Reddit post
 */
export const getRedditPostComments = async (postId: string, subreddit: string): Promise<RedditComment[]> => {
  try {
    // Get the Reddit API access token
    const accessToken = await getRedditAccessToken();
    if (!accessToken) {
      console.error('Failed to obtain Reddit API access token.');
      return [];
    }
    
    // Construct the comments endpoint URL
    const commentsEndpoint = `https://oauth.reddit.com/r/${subreddit}/comments/${postId}?depth=3&limit=100`;
    
    // Make the request to the Reddit API
    const response = await axios.get(commentsEndpoint, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': USER_AGENT,
      },
    });
    
    // Extract and map the comments from the response
    const comments: RedditComment[] = [];
    if (response.data && response.data[1] && response.data[1].data && response.data[1].data.children) {
      response.data[1].data.children.forEach((comment: any) => {
        if (comment.kind === 't1') {
          const commentData = comment.data;
          comments.push({
            id: commentData.id,
            author: commentData.author,
            body: commentData.body,
            score: commentData.score,
            created: commentData.created_utc,
          });
        }
      });
    }
    
    return comments;
  } catch (error: any) {
    console.error('Error getting Reddit post comments:', error);
    return [];
  }
};
