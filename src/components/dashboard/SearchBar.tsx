
import React from "react";
import { Search, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

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
  const handleDebugClick = () => {
    toast({
      title: "Notice",
      description: "Using mock data temporarily while we resolve authentication issues with Reddit API",
      variant: "default",
    });
  };

  return (
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
  );
};
