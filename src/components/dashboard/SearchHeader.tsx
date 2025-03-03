
import React from "react";
import { PanelRightOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { SearchBar } from "./SearchBar";
import { TimeFilterDropdown } from "./TimeFilterDropdown";
import { BUSINESS_SUBREDDITS } from "./constants";

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
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <CardTitle>Business Opportunities</CardTitle>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          businessSubreddits={BUSINESS_SUBREDDITS}
          currentSubreddits={targetSubreddits}
          onSubredditChange={handleSubredditChange}
        />
        
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
    </div>
  );
};
