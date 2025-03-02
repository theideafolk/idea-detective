
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'member';
  lastLogin: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  type: 'post' | 'comment';
  title?: string;
  content: string;
  url: string;
  author: {
    name: string;
    profileUrl: string;
  };
  subreddit: string;
  postDate: string;
  matchedKeywords: Array<{
    keyword: string;
    category: string;
  }>;
  isRead: boolean;
  notes: Array<{
    text: string;
    createdBy: string;
    createdAt: string;
  }>;
  createdAt: string;
}

export interface Keyword {
  id: string;
  text: string;
  category: string;
  isExact: boolean;
}

export interface ScanLog {
  id: string;
  startTime: string;
  endTime: string;
  status: 'success' | 'partial' | 'failed';
  subredditsScanned: string[];
  postsScanned: number;
  commentsScanned: number;
  itemsMatched: number;
  error?: string;
  createdAt: string;
}

export interface ApiSettings {
  redditApiCredentials: {
    clientId: string;
    clientSecret: string;
  };
  monitoringSettings: {
    keywords: Keyword[];
    subreddits: string[];
  };
  scanFrequency: number;
}

// Mock users
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@ideafolk.com',
    role: 'admin',
    lastLogin: '2025-03-05T10:30:00Z',
    createdAt: '2025-02-28T12:00:00Z'
  },
  {
    id: '2',
    username: 'teammember1',
    email: 'team1@ideafolk.com',
    role: 'member',
    lastLogin: '2025-03-04T16:45:00Z',
    createdAt: '2025-03-01T09:15:00Z'
  }
];

// Mock conversations
export const mockConversations: Conversation[] = [
  {
    id: '1',
    type: 'post',
    title: 'Need help building an MVP for my startup idea',
    content: 'Hi everyone, I\'m a non-technical founder working on a marketplace idea. I\'ve got the business plan ready but need help building an MVP. Any recommendations for agencies or freelancers who specialize in early-stage startups?',
    url: 'https://reddit.com/r/startups/comments/abc123',
    author: {
      name: 'startup_founder',
      profileUrl: 'https://reddit.com/user/startup_founder'
    },
    subreddit: 'startups',
    postDate: '2025-03-04T18:30:00Z',
    matchedKeywords: [
      { keyword: 'MVP', category: 'MVP Development' },
      { keyword: 'non-technical founder', category: 'Target Audience' }
    ],
    isRead: false,
    notes: [],
    createdAt: '2025-03-05T08:15:00Z'
  },
  {
    id: '2',
    type: 'post',
    title: 'Best AI tools for small business owners?',
    content: 'I run a small e-commerce business and I\'m looking to implement some AI tools to help with customer service and inventory management. What are some affordable options for small businesses?',
    url: 'https://reddit.com/r/smallbusiness/comments/def456',
    author: {
      name: 'ecommerce_owner',
      profileUrl: 'https://reddit.com/user/ecommerce_owner'
    },
    subreddit: 'smallbusiness',
    postDate: '2025-03-05T14:20:00Z',
    matchedKeywords: [
      { keyword: 'AI tools', category: 'AI Development' },
      { keyword: 'small business', category: 'Target Audience' }
    ],
    isRead: false,
    notes: [],
    createdAt: '2025-03-05T16:10:00Z'
  },
  {
    id: '3',
    type: 'comment',
    content: 'I\'ve been trying to redesign my website but I\'m not a designer. Looking for recommendations on website builders that are good for someone with minimal design skills but who wants a professional looking site.',
    url: 'https://reddit.com/r/webdev/comments/ghi789/comment/jkl012',
    author: {
      name: 'digital_marketer',
      profileUrl: 'https://reddit.com/user/digital_marketer'
    },
    subreddit: 'webdev',
    postDate: '2025-03-03T11:45:00Z',
    matchedKeywords: [
      { keyword: 'website', category: 'Website Development' },
      { keyword: 'redesign', category: 'Website Development' }
    ],
    isRead: true,
    notes: [
      {
        text: 'Potential lead for website redesign. Should follow up with resources.',
        createdBy: '1',
        createdAt: '2025-03-03T13:20:00Z'
      }
    ],
    createdAt: '2025-03-03T12:30:00Z'
  },
  {
    id: '4',
    type: 'post',
    title: 'Growing my YouTube channel - need content strategy help',
    content: 'I\'ve been creating YouTube videos for 6 months but growth is slow. Looking for advice on content strategy and growth tactics for educational content creators.',
    url: 'https://reddit.com/r/youtubers/comments/mno345',
    author: {
      name: 'content_creator',
      profileUrl: 'https://reddit.com/user/content_creator'
    },
    subreddit: 'youtubers',
    postDate: '2025-03-05T09:15:00Z',
    matchedKeywords: [
      { keyword: 'content strategy', category: 'Educational Content' },
      { keyword: 'growth tactics', category: 'Growth Strategies' }
    ],
    isRead: false,
    notes: [],
    createdAt: '2025-03-05T10:05:00Z'
  },
  {
    id: '5',
    type: 'comment',
    content: 'Has anyone worked with a development agency that specializes in AI applications? I\'m looking to build a tool that uses GPT-4 for my industry but don\'t know where to start.',
    url: 'https://reddit.com/r/artificial/comments/pqr678/comment/stu901',
    author: {
      name: 'ai_enthusiast',
      profileUrl: 'https://reddit.com/user/ai_enthusiast'
    },
    subreddit: 'artificial',
    postDate: '2025-03-04T21:50:00Z',
    matchedKeywords: [
      { keyword: 'development agency', category: 'MVP Development' },
      { keyword: 'AI', category: 'AI Development' },
      { keyword: 'GPT-4', category: 'AI Development' }
    ],
    isRead: false,
    notes: [],
    createdAt: '2025-03-05T07:30:00Z'
  }
];

// Mock keywords
export const mockKeywords: Keyword[] = [
  { id: '1', text: 'MVP', category: 'MVP Development', isExact: true },
  { id: '2', text: 'prototype', category: 'MVP Development', isExact: true },
  { id: '3', text: 'website redesign', category: 'Website Development', isExact: false },
  { id: '4', text: 'build a website', category: 'Website Development', isExact: false },
  { id: '5', text: 'AI development', category: 'AI Development', isExact: false },
  { id: '6', text: 'GPT', category: 'AI Development', isExact: true },
  { id: '7', text: 'content strategy', category: 'Educational Content', isExact: false },
  { id: '8', text: 'growth tactics', category: 'Growth Strategies', isExact: false },
  { id: '9', text: 'non-technical founder', category: 'Target Audience', isExact: false },
  { id: '10', text: 'small business owner', category: 'Target Audience', isExact: false }
];

// Mock subreddits
export const mockSubreddits: string[] = [
  'startups',
  'entrepreneur',
  'smallbusiness',
  'webdev',
  'artificial',
  'SaaS',
  'youtubers',
  'content_marketing',
  'ecommerce',
  'nocode'
];

// Mock API settings
export const mockApiSettings: ApiSettings = {
  redditApiCredentials: {
    clientId: '',
    clientSecret: ''
  },
  monitoringSettings: {
    keywords: mockKeywords,
    subreddits: mockSubreddits
  },
  scanFrequency: 60 // minutes
};

// Mock scan logs
export const mockScanLogs: ScanLog[] = [
  {
    id: '1',
    startTime: '2025-03-05T08:00:00Z',
    endTime: '2025-03-05T08:05:30Z',
    status: 'success',
    subredditsScanned: ['startups', 'entrepreneur', 'smallbusiness', 'webdev', 'artificial'],
    postsScanned: 78,
    commentsScanned: 342,
    itemsMatched: 3,
    createdAt: '2025-03-05T08:05:30Z'
  },
  {
    id: '2',
    startTime: '2025-03-05T09:00:00Z',
    endTime: '2025-03-05T09:06:15Z',
    status: 'success',
    subredditsScanned: ['SaaS', 'youtubers', 'content_marketing', 'ecommerce', 'nocode'],
    postsScanned: 65,
    commentsScanned: 287,
    itemsMatched: 2,
    createdAt: '2025-03-05T09:06:15Z'
  },
  {
    id: '3',
    startTime: '2025-03-05T10:00:00Z',
    endTime: '2025-03-05T10:02:45Z',
    status: 'partial',
    subredditsScanned: ['startups', 'entrepreneur', 'smallbusiness'],
    postsScanned: 42,
    commentsScanned: 156,
    itemsMatched: 0,
    error: 'Rate limit exceeded for remaining subreddits',
    createdAt: '2025-03-05T10:02:45Z'
  }
];

// Analytics data
export const mockConversationsByCategory = [
  { category: 'MVP Development', count: 12 },
  { category: 'Website Development', count: 8 },
  { category: 'AI Development', count: 15 },
  { category: 'Educational Content', count: 5 },
  { category: 'Growth Strategies', count: 7 }
];

export const mockConversationsByDay = [
  { date: '2025-02-27', count: 3 },
  { date: '2025-02-28', count: 5 },
  { date: '2025-03-01', count: 2 },
  { date: '2025-03-02', count: 4 },
  { date: '2025-03-03', count: 8 },
  { date: '2025-03-04', count: 12 },
  { date: '2025-03-05', count: 15 }
];
