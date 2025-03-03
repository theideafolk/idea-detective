
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { FilterDropdown } from "./FilterDropdown";

interface AdvancedSearchProps {
  showAdvancedSearch: boolean;
  setShowAdvancedSearch: React.Dispatch<React.SetStateAction<boolean>>;
  activeTab: string;
  setActiveTab: (value: string) => void;
  sortFilter: string;
  timeFilter: string;
  handleSortFilterChange: (filter: string) => void;
  handleTimeFilterChange: (time: string) => void;
}

export const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  showAdvancedSearch,
  setShowAdvancedSearch,
  activeTab,
  setActiveTab,
  sortFilter,
  timeFilter,
  handleSortFilterChange,
  handleTimeFilterChange,
}) => {
  return (
    <Collapsible open={showAdvancedSearch} onOpenChange={setShowAdvancedSearch} className="mb-4">
      <CollapsibleContent>
        <div className="p-4 bg-muted/40 rounded-md mb-4">
          <h3 className="text-sm font-medium mb-2">Filter by Category</h3>
          <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            <button
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                activeTab === "opportunities"
                  ? "bg-background text-foreground shadow-sm"
                  : "hover:bg-background/50"
              }`}
              onClick={() => setActiveTab("opportunities")}
            >
              Business Opportunities
            </button>
            <button
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                activeTab === "potential"
                  ? "bg-background text-foreground shadow-sm"
                  : "hover:bg-background/50"
              }`}
              onClick={() => setActiveTab("potential")}
            >
              Potential Leads
            </button>
            <button
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                activeTab === "ai"
                  ? "bg-background text-foreground shadow-sm"
                  : "hover:bg-background/50"
              }`}
              onClick={() => setActiveTab("ai")}
            >
              AI Discussion
            </button>
            <button
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                activeTab === "all"
                  ? "bg-background text-foreground shadow-sm"
                  : "hover:bg-background/50"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All Posts
            </button>
          </div>
          <FilterDropdown 
            onFilterChange={handleSortFilterChange}
            onTimeFilterChange={handleTimeFilterChange}
            currentFilter={sortFilter}
            currentTimeFilter={timeFilter}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
