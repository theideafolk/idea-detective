
import React from "react";
import { Filter, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FilterDropdownProps {
  onFilterChange?: (filter: string) => void;
  onTimeFilterChange?: (timeFilter: string) => void;
  currentFilter?: string;
  currentTimeFilter?: string;
}

export const FilterDropdown = ({
  onFilterChange,
  onTimeFilterChange,
  currentFilter = "relevance",
  currentTimeFilter = "all"
}: FilterDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
          <span className="sr-only">Filter posts</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem 
            onClick={() => onFilterChange?.("relevance")}
            className={currentFilter === "relevance" ? "bg-accent" : ""}
          >
            Most Relevant
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onFilterChange?.("new")}
            className={currentFilter === "new" ? "bg-accent" : ""}
          >
            Most Recent
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onFilterChange?.("hot")}
            className={currentFilter === "hot" ? "bg-accent" : ""}
          >
            Hot Posts
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onFilterChange?.("top")}
            className={currentFilter === "top" ? "bg-accent" : ""}
          >
            Most Upvoted
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onFilterChange?.("comments")}
            className={currentFilter === "comments" ? "bg-accent" : ""}
          >
            Most Comments
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onFilterChange?.("opportunity")}
            className={currentFilter === "opportunity" ? "bg-accent" : ""}
          >
            Business Opportunities
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuLabel className="flex items-center gap-2">
          <Clock className="h-4 w-4" /> Time Period
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem 
            onClick={() => onTimeFilterChange?.("all")}
            className={currentTimeFilter === "all" ? "bg-accent" : ""}
          >
            All Time
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onTimeFilterChange?.("hour")}
            className={currentTimeFilter === "hour" ? "bg-accent" : ""}
          >
            Last Hour
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onTimeFilterChange?.("day")}
            className={currentTimeFilter === "day" ? "bg-accent" : ""}
          >
            Last 24 Hours
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onTimeFilterChange?.("week")}
            className={currentTimeFilter === "week" ? "bg-accent" : ""}
          >
            Past Week
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onTimeFilterChange?.("month")}
            className={currentTimeFilter === "month" ? "bg-accent" : ""}
          >
            Past Month
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
