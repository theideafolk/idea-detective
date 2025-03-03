
import React, { useState } from "react";
import { Search, AlertCircle, Globe, Sparkles } from "lucide-react";
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

  const handleDebugClick = () => {
    toast({
      title: "Notice",
      description: "Using mock data temporarily while we resolve authentication issues with Reddit API",
      variant: "default",
    });
  };

  const openWebsiteModal = () => {
    setIsWebsiteModalOpen(true);
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
            variant="ghost" 
            size="icon" 
            className="ml-1" 
            onClick={handleDebugClick}
            title="Authentication Status"
          >
            <AlertCircle className="h-4 w-4 text-yellow-500" />
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

      {/* Results Modal */}
      <Dialog open={isResultModalOpen} onOpenChange={setIsResultModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Website Analysis Results</DialogTitle>
            <DialogDescription>
              We've analyzed your website and extracted the following information. You can edit or customize before searching.
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
