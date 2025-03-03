
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

// Define the mock business opportunities with more specific data and proper URLs
const mockBusinessOpportunities = [
  {
    id: 'post1',
    title: 'Looking for a developer to build a SaaS product for financial analysis',
    content: 'I have an idea for a SaaS product that helps investors analyze financial data. I need a developer who understands both finance and coding to help build it. Budget is flexible for the right person.',
    url: 'https://www.reddit.com/r/SaaS/comments/looking_for_a_developer_to_build_a_saas_product/',
    permalink: '/r/SaaS/comments/looking_for_a_developer_to_build_a_saas_product/',
    score: 100,
    upvotes: 100,
    comments: 10,
    subreddit: 'r/SaaS',
    created: 1678886400,
    time: '3 days ago',
    author: 'johndoe',
    isBusinessOpportunity: true,
    opportunityScore: 80,
    commentsList: []
  },
  {
    id: 'post2',
    title: 'Need help with AI implementation for my e-commerce startup',
    content: 'We\'re building an e-commerce platform and want to integrate AI for product recommendations and customer service. Looking for an expert or agency that can implement this efficiently. We\'re a funded startup with a clear timeline.',
    url: 'https://www.reddit.com/r/AI_Agents/comments/need_help_with_ai_implementation_for_my_startup/',
    permalink: '/r/AI_Agents/comments/need_help_with_ai_implementation_for_my_startup/',
    score: 50,
    upvotes: 50,
    comments: 5,
    subreddit: 'r/AI_Agents',
    created: 1678886400,
    time: '2 days ago',
    author: 'janedoe',
    isBusinessOpportunity: true,
    opportunityScore: 60,
    commentsList: []
  },
  {
    id: 'post3',
    title: 'Seeking a technical co-founder for my healthtech venture',
    content: 'I\'m a doctor with an idea for a healthcare platform that could revolutionize patient care. I need a technical co-founder who can build the platform while I handle the medical aspects and funding. Equity split negotiable.',
    url: 'https://www.reddit.com/r/startups/comments/seeking_a_technical_cofounder_for_my_new_venture/',
    permalink: '/r/startups/comments/seeking_a_technical_cofounder_for_my_new_venture/',
    score: 75,
    upvotes: 75,
    comments: 8,
    subreddit: 'r/startups',
    created: 1678886400,
    time: '1 week ago',
    author: 'techfounder',
    isBusinessOpportunity: true,
    opportunityScore: 70,
    commentsList: []
  },
  {
    id: 'post4',
    title: 'Looking for an agency to outsource AI development work',
    content: 'Our marketing company needs to integrate AI into our analytics platform. We\'re looking for a reliable agency that specializes in AI development. This is a long-term project with potential for ongoing work.',
    url: 'https://www.reddit.com/r/Entrepreneur/comments/looking_for_an_agency_to_outsource_development/',
    permalink: '/r/Entrepreneur/comments/looking_for_an_agency_to_outsource_development/',
    score: 60,
    upvotes: 60,
    comments: 6,
    subreddit: 'r/Entrepreneur',
    created: 1678886400,
    time: '5 days ago',
    author: 'outsourcingexpert',
    isBusinessOpportunity: true,
    opportunityScore: 65,
    commentsList: []
  },
  {
    id: 'post5',
    title: 'Need help with SaaS development, no coding experience',
    content: 'I\'ve validated my SaaS idea with potential customers and have initial funding, but I don\'t know how to code. Looking for a development partner or team that can build the MVP while I handle business development.',
    url: 'https://www.reddit.com/r/nocode/comments/need_help_with_saas_development_no_coding/',
    permalink: '/r/nocode/comments/need_help_with_saas_development_no_coding/',
    score: 40,
    upvotes: 40,
    comments: 4,
    subreddit: 'r/nocode',
    created: 1678886400,
    time: '2 weeks ago',
    author: 'nocodefounder',
    isBusinessOpportunity: true,
    opportunityScore: 55,
    commentsList: []
  },
  {
    id: 'post6',
    title: 'Looking for someone to build a custom AI workflow for our small business',
    content: 'We run a small consulting business and want to automate our customer intake and analysis process using AI. Need someone who can build a custom solution that integrates with our existing tools.',
    url: 'https://www.reddit.com/r/smallbusiness/comments/looking_for_custom_ai_workflow/',
    permalink: '/r/smallbusiness/comments/looking_for_custom_ai_workflow/',
    score: 35,
    upvotes: 35,
    comments: 7,
    subreddit: 'r/smallbusiness',
    created: 1678886400,
    time: '4 days ago',
    author: 'smallbizowner',
    isBusinessOpportunity: true,
    opportunityScore: 50,
    commentsList: []
  },
  {
    id: 'post7',
    title: 'Need a Bolt.new developer for quick project',
    content: 'We\'re looking for someone familiar with Bolt.new to help us build a simple tool for our internal team. Should be a quick project, but we need it done well and efficiently.',
    url: 'https://www.reddit.com/r/boltnewbuilders/comments/need_a_bolt_developer_for_quick_project/',
    permalink: '/r/boltnewbuilders/comments/need_a_bolt_developer_for_quick_project/',
    score: 25,
    upvotes: 25,
    comments: 3,
    subreddit: 'r/boltnewbuilders',
    created: 1678886400,
    time: '1 day ago',
    author: 'boltuser',
    isBusinessOpportunity: true,
    opportunityScore: 45,
    commentsList: []
  },
  {
    id: 'post8',
    title: 'Just launched my AI product and looking for feedback',
    content: 'After months of development, I just launched my new AI tool for content creators. It\'s getting some traction but I\'d love feedback from this community on features and pricing.',
    url: 'https://www.reddit.com/r/artificial/comments/just_launched_ai_product_feedback/',
    permalink: '/r/artificial/comments/just_launched_ai_product_feedback/',
    score: 80,
    upvotes: 80,
    comments: 15,
    subreddit: 'r/artificial',
    created: 1678886400,
    time: '6 days ago',
    author: 'aibuilder',
    isBusinessOpportunity: false,
    opportunityScore: 20,
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
  
  // Start with the full set of mock data
  let filteredPosts = [...mockBusinessOpportunities];
  
  // Apply subreddit filtering if provided
  if (options?.subreddits) {
    const subredditsList = options.subreddits.split('+');
    filteredPosts = filteredPosts.filter(post => {
      const postSubreddit = post.subreddit.replace('r/', '');
      return subredditsList.includes(postSubreddit);
    });
  }
  
  // Apply query filtering if provided
  if (query && query.trim() !== '') {
    const searchTerms = query.toLowerCase().split(/\s+OR\s+/).map(term => term.trim()).filter(Boolean);
    
    if (searchTerms.length > 0) {
      filteredPosts = filteredPosts.filter(post => {
        const postContent = (post.title + " " + post.content).toLowerCase();
        return searchTerms.some(term => postContent.includes(term));
      });
    }
  }
  
  // Apply time filtering (this is mocked)
  if (options?.timeFilter) {
    // In a real implementation, we would filter by date
    // For now, we'll just log that we're applying the filter
    console.log(`Applied time filter: ${options.timeFilter}`);
  }
  
  // Apply sorting (this is mocked)
  if (options?.sortBy) {
    if (options.sortBy === 'relevance') {
      filteredPosts.sort((a, b) => b.opportunityScore - a.opportunityScore);
    } else if (options.sortBy === 'new') {
      // Sort by most recent first (lower created timestamp is more recent)
      filteredPosts.sort((a, b) => a.created - b.created);
    } else if (options.sortBy === 'top') {
      // Sort by highest score first
      filteredPosts.sort((a, b) => b.score - a.score);
    }
  }
  
  return filteredPosts;
};

/**
 * Get comments for a specific Reddit post
 */
export const getRedditPostComments = async (postId: string, subreddit: string): Promise<RedditComment[]> => {
  // Generate more varied mock comments based on the post ID
  const postIndex = parseInt(postId.replace('post', '')) || 1;
  
  return [
    {
      id: `comment1-${postId}`,
      author: `responder${postIndex}`,
      body: `This is exactly what I'm looking for! I'd love to discuss this opportunity further. Can you share more details about the project?`,
      text: `This is exactly what I'm looking for! I'd love to discuss this opportunity further. Can you share more details about the project?`,
      score: 5 + postIndex,
      upvotes: 5 + postIndex,
      created: Date.now() / 1000 - (3600 * postIndex)
    },
    {
      id: `comment2-${postId}`,
      author: `expert${postIndex}`,
      body: `I have experience with similar projects. The key challenges you'll face are X, Y, and Z. Feel free to DM me if you want to talk about possible solutions.`,
      text: `I have experience with similar projects. The key challenges you'll face are X, Y, and Z. Feel free to DM me if you want to talk about possible solutions.`,
      score: 3 + postIndex,
      upvotes: 3 + postIndex,
      created: Date.now() / 1000 - (7200 * postIndex)
    },
    {
      id: `comment3-${postId}`,
      author: `advisor${postIndex}`,
      body: `Have you considered using [specific technology or approach]? That might help solve your problem more efficiently.`,
      text: `Have you considered using [specific technology or approach]? That might help solve your problem more efficiently.`,
      score: 2 + postIndex,
      upvotes: 2 + postIndex,
      created: Date.now() / 1000 - (10800 * postIndex)
    }
  ];
};
