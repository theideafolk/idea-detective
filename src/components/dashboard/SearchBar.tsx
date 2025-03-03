
import React, { useState } from "react";
import { Search, Globe, Sparkles, Edit3, ListFilter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  businessSubreddits?: string[];
  currentSubreddits?: string;
  onSubredditChange?: (subreddits: string) => void;
}

// Common business-focused queries that can be quickly applied
const BUSINESS_QUERY_TEMPLATES = [
  { label: "AI Development", query: "looking for AI developer OR need AI solution OR custom AI" },
  { label: "MVP Development", query: "MVP development OR prototype OR build app quickly" },
  { label: "Tech Partnership", query: "seeking tech partner OR need technical cofounder OR tech collaboration" },
  { label: "Business Automation", query: "automate business OR automation solution OR workflow optimization" },
  { label: "SaaS Development", query: "SaaS development OR build software OR custom application" },
];

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  businessSubreddits = [],
  currentSubreddits = "",
  onSubredditChange = () => {},
}) => {
  const [isWebsiteModalOpen, setIsWebsiteModalOpen] = useState(false);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [businessDescription, setBusinessDescription] = useState("");
  const [suggestedKeywords, setSuggestedKeywords] = useState<string[]>([]);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [userDescription, setUserDescription] = useState("");
  const [isProcessingDescription, setIsProcessingDescription] = useState(false);
  const [selectedSubreddits, setSelectedSubreddits] = useState<string[]>(
    currentSubreddits ? currentSubreddits.split("+") : []
  );
  const [isSubredditPopoverOpen, setIsSubredditPopoverOpen] = useState(false);
  const [isTemplatePopoverOpen, setIsTemplatePopoverOpen] = useState(false);

  const openWebsiteModal = () => {
    setIsWebsiteModalOpen(true);
  };

  const openDescriptionModal = () => {
    setIsDescriptionModalOpen(true);
  };

  const analyzeWebsite = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!websiteUrl) {
      toast({
        title: "Error",
        description: "Please enter a valid website URL",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock data - in a real app, this would come from an AI service
      const mockDescription = `A professional business services company specializing in ${
        websiteUrl.includes("marketing") ? "digital marketing" : 
        websiteUrl.includes("tech") ? "technology solutions" : 
        "business consulting"
      } and strategic planning. The company focuses on helping clients achieve sustainable growth through innovative strategies.`;
      
      // Generate more business-focused keywords
      const mockKeywords = [
        websiteUrl.includes("marketing") ? "digital marketing agency" : "business consulting firm", 
        "business strategy implementation", 
        "professional services company", 
        websiteUrl.includes("tech") ? "technology solutions provider" : "strategic planning consultancy",
        websiteUrl.includes("agency") ? "agency services business" : "business growth consultancy",
        "looking for developers",
        "need technical implementation",
        "seeking development partner"
      ];
      
      setBusinessDescription(mockDescription);
      setSuggestedKeywords(mockKeywords);
      
      setIsWebsiteModalOpen(false);
      setIsResultModalOpen(true);
      
      toast({
        title: "Website Analyzed",
        description: "We've extracted potential keywords and description from your website",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Could not analyze website. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const processDescription = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userDescription || userDescription.trim().length < 10) {
      toast({
        title: "Error",
        description: "Please enter a more detailed description (at least 10 characters)",
        variant: "destructive",
      });
      return;
    }

    setIsProcessingDescription(true);
    
    try {
      // Simulate AI processing of the description
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Focus on business-related keywords from the description
      // In a real implementation, this would use an AI service
      const words = userDescription.toLowerCase().split(/\s+/);
      const commonWords = ["a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for", "is", "are", "with", "as", "of"];
      
      // Simple keyword extraction - extract unique meaningful words and phrases
      const extractedKeywords = new Set<string>();
      
      // Look for two-word phrases first
      for (let i = 0; i < words.length - 1; i++) {
        const word1 = words[i].replace(/[^\w]/g, '');
        const word2 = words[i + 1].replace(/[^\w]/g, '');
        
        if (word1.length > 3 && word2.length > 3 && 
            !commonWords.includes(word1) && !commonWords.includes(word2)) {
          extractedKeywords.add(`${word1} ${word2}`);
        }
      }
      
      // Add business-focused search terms
      extractedKeywords.add("looking for developer");
      extractedKeywords.add("need technical partner");
      extractedKeywords.add("seeking agency help");
      
      // Add some industry-specific terms based on analysis
      if (userDescription.toLowerCase().includes("market") || userDescription.toLowerCase().includes("brand")) {
        extractedKeywords.add("marketing automation");
        extractedKeywords.add("looking for marketing technology");
      }
      
      if (userDescription.toLowerCase().includes("tech") || userDescription.toLowerCase().includes("software")) {
        extractedKeywords.add("technology solutions needed");
        extractedKeywords.add("software development services");
      }
      
      if (userDescription.toLowerCase().includes("consult") || userDescription.toLowerCase().includes("advice")) {
        extractedKeywords.add("business consulting");
        extractedKeywords.add("seeking business advice");
      }
      
      // Convert Set to Array for state
      const generatedKeywords = Array.from(extractedKeywords).slice(0, 7); // Limit to 7 keywords
      
      // If we somehow got no keywords, add a default
      if (generatedKeywords.length === 0) {
        generatedKeywords.push("looking for developer", "need technical partner", "seeking agency");
      }
      
      setBusinessDescription(userDescription);
      setSuggestedKeywords(generatedKeywords);
      
      setIsDescriptionModalOpen(false);
      setIsResultModalOpen(true);
      
      toast({
        title: "Description Processed",
        description: "We've generated relevant business keywords from your description",
      });
    } catch (error) {
      toast({
        title: "Processing Failed",
        description: "Could not process your description. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessingDescription(false);
    }
  };

  const applyKeywords = () => {
    setSearchQuery(suggestedKeywords.join(" OR "));
    setIsResultModalOpen(false);
    
    toast({
      title: "Keywords Applied",
      description: "Your search has been updated with the suggested keywords",
    });
    
    // Auto-trigger search
    const formEvent = new Event('submit') as unknown as React.FormEvent;
    handleSearch(formEvent);
  };

  const toggleSubreddit = (subreddit: string) => {
    setSelectedSubreddits(prev => {
      if (prev.includes(subreddit)) {
        return prev.filter(s => s !== subreddit);
      } else {
        return [...prev, subreddit];
      }
    });
  };

  const applySubreddits = () => {
    if (selectedSubreddits.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one subreddit",
        variant: "destructive",
      });
      return;
    }
    
    const subredditsString = selectedSubreddits.join("+");
    onSubredditChange(subredditsString);
    setIsSubredditPopoverOpen(false);
    
    toast({
      title: "Subreddits Updated",
      description: `Now searching in: ${selectedSubreddits.join(", ")}`,
    });
  };

  const applyQueryTemplate = (template: string) => {
    setSearchQuery(template);
    setIsTemplatePopoverOpen(false);
    
    toast({
      title: "Query Template Applied",
      description: "Search query updated with business-focused template",
    });
    
    // Auto-trigger search
    const formEvent = new Event('submit') as unknown as React.FormEvent;
    handleSearch(formEvent);
  };

  return (
    <>
      <div className="w-full md:w-auto">
        <form onSubmit={handleSearch} className="flex w-full flex-wrap gap-2">
          <div className="relative flex-1 md:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for business opportunities..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
          
          <Popover open={isTemplatePopoverOpen} onOpenChange={setIsTemplatePopoverOpen}>
            <PopoverTrigger asChild>
              <Button 
                type="button" 
                variant="outline"
                title="Business Query Templates"
              >
                <ListFilter className="h-4 w-4 mr-2 text-primary" />
                Templates
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">Business Query Templates</h4>
                <ScrollArea className="h-[200px]">
                  <div className="space-y-2">
                    {BUSINESS_QUERY_TEMPLATES.map((template, idx) => (
                      <div key={idx} className="p-2 hover:bg-muted rounded-md">
                        <div className="font-medium">{template.label}</div>
                        <div className="text-sm text-muted-foreground truncate mb-1">{template.query}</div>
                        <Button 
                          size="sm" 
                          variant="secondary" 
                          className="w-full"
                          onClick={() => applyQueryTemplate(template.query)}
                        >
                          Apply
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </PopoverContent>
          </Popover>
          
          <Popover open={isSubredditPopoverOpen} onOpenChange={setIsSubredditPopoverOpen}>
            <PopoverTrigger asChild>
              <Button 
                type="button" 
                variant="outline"
                title="Select Business Subreddits"
              >
                <Globe className="h-4 w-4 mr-2 text-primary" />
                Subreddits
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">Business Subreddits</h4>
                <ScrollArea className="h-[200px]">
                  <div className="space-y-2">
                    {businessSubreddits.map(subreddit => (
                      <div key={subreddit} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`subreddit-${subreddit}`}
                          checked={selectedSubreddits.includes(subreddit)}
                          onCheckedChange={() => toggleSubreddit(subreddit)}
                        />
                        <label 
                          htmlFor={`subreddit-${subreddit}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          r/{subreddit}
                        </label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <Button className="w-full" onClick={applySubreddits}>
                  Apply Subreddits
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          
          <Button 
            type="button" 
            variant="outline" 
            size="icon" 
            className="ml-2" 
            onClick={openWebsiteModal}
            title="Import from Website"
          >
            <Globe className="h-4 w-4 text-primary" />
          </Button>
          
          <Button 
            type="button" 
            variant="outline" 
            size="icon" 
            className="ml-2" 
            onClick={openDescriptionModal}
            title="Search by Description"
          >
            <Edit3 className="h-4 w-4 text-primary" />
          </Button>
        </form>
      </div>

      {/* Website URL Input Modal */}
      <Dialog open={isWebsiteModalOpen} onOpenChange={setIsWebsiteModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Analyze Your Business Website</DialogTitle>
            <DialogDescription>
              Enter your business website URL to automatically generate relevant keywords for Reddit monitoring.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={analyzeWebsite}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="website-url" className="col-span-4">
                  Website URL
                </Label>
                <Input
                  id="website-url"
                  placeholder="https://example.com"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="col-span-4"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsWebsiteModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isAnalyzing}>
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Analyze Website
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Description Input Modal */}
      <Dialog open={isDescriptionModalOpen} onOpenChange={setIsDescriptionModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Describe Your Business Needs</DialogTitle>
            <DialogDescription>
              Enter a detailed description of your business and we'll use AI to find relevant Reddit conversations.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={processDescription}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <Label htmlFor="business-description-input">
                  Business Description
                </Label>
                <Textarea
                  id="business-description-input"
                  placeholder="Describe your business, target audience, challenges you're facing, or specific topics you're interested in..."
                  value={userDescription}
                  onChange={(e) => setUserDescription(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  For best results, be specific about your industry, products/services, and the kind of insights you're looking for.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDescriptionModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isProcessingDescription}>
                {isProcessingDescription ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Keywords
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Results Modal */}
      <Dialog open={isResultModalOpen} onOpenChange={setIsResultModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Generated Business Search Terms</DialogTitle>
            <DialogDescription>
              We've analyzed your input and extracted the following business-oriented keywords. You can edit or customize before searching.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <Label htmlFor="business-description">
                Business Description
              </Label>
              <Textarea
                id="business-description"
                value={businessDescription}
                onChange={(e) => setBusinessDescription(e.target.value)}
                rows={4}
              />
            </div>
            <div className="grid grid-cols-1 gap-4">
              <Label htmlFor="suggested-keywords">
                Suggested Business Keywords
              </Label>
              <div className="flex flex-wrap gap-2">
                {suggestedKeywords.map((keyword, index) => (
                  <Badge key={index} variant="outline" className="text-sm py-1">
                    {keyword}
                    <button
                      type="button"
                      className="ml-1 text-muted-foreground hover:text-destructive"
                      onClick={() => {
                        setSuggestedKeywords(suggestedKeywords.filter((_, i) => i !== index));
                      }}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
                <Input
                  placeholder="Add a keyword..."
                  className="mt-2 w-full"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const value = e.currentTarget.value.trim();
                      if (value && !suggestedKeywords.includes(value)) {
                        setSuggestedKeywords([...suggestedKeywords, value]);
                        e.currentTarget.value = '';
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsResultModalOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={applyKeywords}>
              Apply Keywords & Search
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
