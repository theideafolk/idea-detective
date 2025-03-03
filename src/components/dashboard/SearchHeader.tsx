
import React from "react";
import { PanelRightOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { SearchBar } from "./SearchBar";
import { TimeFilterDropdown } from "./TimeFilterDropdown";
import { BUSINESS_SUBREDDITS } from "./constants";
import { 
  Dialog,
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";

interface SearchHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  targetSubreddits: string;
  handleSubredditChange: (subreddits: string) => void;
  timeFilter: string;
  handleTimeFilterChange: (time: string) => void;
  showAdvancedSearch: boolean;
  setShowAdvancedSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  targetSubreddits,
  handleSubredditChange,
  timeFilter,
  handleTimeFilterChange,
  showAdvancedSearch,
  setShowAdvancedSearch,
}) => {
  const [isAddSubredditDialogOpen, setIsAddSubredditDialogOpen] = React.useState(false);
  const [newSubreddit, setNewSubreddit] = React.useState("");
  const [selectedSubreddits, setSelectedSubreddits] = React.useState<string[]>(
    targetSubreddits ? targetSubreddits.split("+") : []
  );

  const toggleSubreddit = (subreddit: string) => {
    setSelectedSubreddits(prev => {
      if (prev.includes(subreddit)) {
        return prev.filter(s => s !== subreddit);
      } else {
        return [...prev, subreddit];
      }
    });
  };

  const addNewSubreddit = () => {
    if (!newSubreddit || newSubreddit.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter a valid subreddit name",
        variant: "destructive",
      });
      return;
    }

    // Add new subreddit to the selected list
    if (!selectedSubreddits.includes(newSubreddit)) {
      const updatedSubreddits = [...selectedSubreddits, newSubreddit];
      setSelectedSubreddits(updatedSubreddits);
      
      // Also apply the changes immediately
      handleSubredditChange(updatedSubreddits.join("+"));
      
      toast({
        title: "Subreddit Added",
        description: `r/${newSubreddit} added to search targets`,
      });
      
      // Clear the input
      setNewSubreddit("");
    } else {
      toast({
        title: "Already Selected",
        description: `r/${newSubreddit} is already in your list`,
      });
    }
  };

  const applySubredditChanges = () => {
    if (selectedSubreddits.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one subreddit",
        variant: "destructive",
      });
      return;
    }
    
    const subredditsString = selectedSubreddits.join("+");
    handleSubredditChange(subredditsString);
    setIsAddSubredditDialogOpen(false);
    
    toast({
      title: "Subreddits Updated",
      description: `Now searching in ${selectedSubreddits.length} subreddits`,
    });
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <CardTitle>Business Opportunities</CardTitle>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
        <form onSubmit={handleSearch} className="flex w-full flex-wrap gap-2">
          <div className="relative flex-1 md:w-[300px]">
            <Input
              type="search"
              placeholder="Search for business opportunities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
          
          <Button 
            type="button" 
            variant="outline"
            onClick={() => setIsAddSubredditDialogOpen(true)}
            title="Manage Subreddits"
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            Subreddits
          </Button>
        </form>
        
        <TimeFilterDropdown 
          timeFilter={timeFilter}
          handleTimeFilterChange={handleTimeFilterChange}
        />
        
        <Button 
          variant="outline"
          onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
          title="Toggle Advanced Search"
        >
          <PanelRightOpen className="h-4 w-4" />
          <span className="ml-2 hidden md:inline">Advanced</span>
        </Button>
      </div>

      {/* Dialog for adding/managing subreddits */}
      <Dialog open={isAddSubredditDialogOpen} onOpenChange={setIsAddSubredditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Manage Subreddits</DialogTitle>
            <DialogDescription>
              Select subreddits to search for business opportunities or add custom ones.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            {/* Add new subreddit */}
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <Label htmlFor="new-subreddit">Add Custom Subreddit</Label>
                <Input
                  id="new-subreddit"
                  placeholder="Enter subreddit name"
                  value={newSubreddit}
                  onChange={(e) => setNewSubreddit(e.target.value)}
                />
              </div>
              <Button onClick={addNewSubreddit}>Add</Button>
            </div>
            
            {/* Popular business subreddits */}
            <div>
              <Label>Popular Business Subreddits</Label>
              <ScrollArea className="h-[200px] border rounded-md p-2">
                <div className="space-y-2">
                  {BUSINESS_SUBREDDITS.map(subreddit => (
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
            </div>
            
            {/* Current selection */}
            <div>
              <Label>Current Selection ({selectedSubreddits.length})</Label>
              <div className="border rounded-md p-2 min-h-10 flex flex-wrap gap-1 mt-1">
                {selectedSubreddits.length > 0 ? (
                  selectedSubreddits.map(subreddit => (
                    <div 
                      key={subreddit} 
                      className="bg-muted px-2 py-1 rounded-md text-sm flex items-center gap-1"
                    >
                      r/{subreddit}
                      <button 
                        type="button" 
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => toggleSubreddit(subreddit)}
                      >
                        ×
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-muted-foreground text-sm p-1">No subreddits selected</div>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddSubredditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={applySubredditChanges}>
              Apply Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
