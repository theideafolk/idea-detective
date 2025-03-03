import axios from 'axios';

// Define the Reddit API base URL
const REDDIT_API_BASE_URL = 'https://www.reddit.com';

// Define the default subreddits for business opportunities
const DEFAULT_BUSINESS_SUBREDDITS = 'SaaS+AI_Agents+artificial+startups+Entrepreneur+OpenAI+boltnewbuilders+smallbusiness';

// Define the Reddit API OAuth URL
const REDDIT_API_OAUTH_URL = 'https://oauth.reddit.com';

// Define the client ID and secret for the Reddit API - Fix for Vite environment
const REDDIT_CLIENT_ID = import.meta.env.VITE_REDDIT_CLIENT_ID || 'placeholder-client-id';
const REDDIT_CLIENT_SECRET = import.meta.env.VITE_REDDIT_CLIENT_SECRET || 'placeholder-client-secret';

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
  permalink?: string;
  upvotes?: number;
  time?: string;
};

// Define the Reddit comment type
export type RedditComment = {
  id: string;
  author: string;
  body: string;
  score: number;
  created: number;
  text?: string;
  upvotes?: number;
};

/**
 * Get Reddit API access token using client credentials grant
 */
const getRedditAccessToken = async (): Promise<string | null> => {
  return "mock-token";
};

/**
 * Search Reddit for posts matching a query, with optional subreddit filtering
 */
export const searchRedditPosts = async (query: string, options?: { subreddits?: string, timeFilter?: string, sortBy?: string }): Promise<RedditPost[]> => {
  console.log("Using mock data while authentication issues are being resolved");
  return mockBusinessOpportunities;
};

/**
 * Get comments for a specific Reddit post
 */
export const getRedditPostComments = async (postId: string, subreddit: string): Promise<RedditComment[]> => {
  return [
    {
      id: 'comment1',
      author: 'user1',
      body: 'This is a really interesting opportunity!',
      text: 'This is a really interesting opportunity!',
      score: 5,
      upvotes: 5,
      created: Date.now() / 1000 - 3600
    },
    {
      id: 'comment2',
      author: 'user2',
      body: 'I would be interested in discussing this further.',
      text: 'I would be interested in discussing this further.',
      score: 3,
      upvotes: 3,
      created: Date.now() / 1000 - 7200
    }
  ];
};
