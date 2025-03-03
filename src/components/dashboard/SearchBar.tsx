
import React, { useState } from "react";
import { Search, Globe, Sparkles, Edit3 } from "lucide-react";
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

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
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
      
      const mockKeywords = [
        websiteUrl.includes("marketing") ? "digital marketing" : "business consulting", 
        "business strategy", 
        "professional services", 
        websiteUrl.includes("tech") ? "technology solutions" : "strategic planning",
        websiteUrl.includes("agency") ? "agency services" : "business growth"
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
      
      // Extract key concepts from the description to form keywords
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
      
      // Then add single important words
      words.forEach(word => {
        const cleanWord = word.replace(/[^\w]/g, '');
        if (cleanWord.length > 4 && !commonWords.includes(cleanWord)) {
          extractedKeywords.add(cleanWord);
        }
      });
      
      // Add some industry-specific terms based on analysis
      if (userDescription.toLowerCase().includes("market") || userDescription.toLowerCase().includes("brand")) {
        extractedKeywords.add("marketing strategy");
      }
      
      if (userDescription.toLowerCase().includes("tech") || userDescription.toLowerCase().includes("software")) {
        extractedKeywords.add("technology solutions");
      }
      
      if (userDescription.toLowerCase().includes("consult") || userDescription.toLowerCase().includes("advice")) {
        extractedKeywords.add("business consulting");
      }
      
      // Convert Set to Array for state
      const generatedKeywords = Array.from(extractedKeywords).slice(0, 5); // Limit to 5 keywords
      
      // If we somehow got no keywords, add a default
      if (generatedKeywords.length === 0) {
        generatedKeywords.push("business advice", "professional services");
      }
      
      setBusinessDescription(userDescription);
      setSuggestedKeywords(generatedKeywords);
      
      setIsDescriptionModalOpen(false);
      setIsResultModalOpen(true);
      
      toast({
        title: "Description Processed",
        description: "We've generated relevant keywords from your description",
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
  };

  return (
    <>
      <div className="w-full md:w-auto">
        <form onSubmit={handleSearch} className="flex w-full">
          <div className="relative flex-1 md:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by keyword..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit" className="ml-2">Search</Button>
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
            <DialogTitle>Generated Search Terms</DialogTitle>
            <DialogDescription>
              We've analyzed your input and extracted the following information. You can edit or customize before searching.
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
                Suggested Keywords
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
