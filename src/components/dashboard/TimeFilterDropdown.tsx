
import React from "react";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TimeFilterDropdownProps {
  timeFilter: string;
  handleTimeFilterChange: (time: string) => void;
}

export const TimeFilterDropdown: React.FC<TimeFilterDropdownProps> = ({
  timeFilter,
  handleTimeFilterChange,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Clock className="h-4 w-4" />
          <span className="hidden sm:inline">{
            timeFilter === 'hour' ? 'Last Hour' :
            timeFilter === 'day' ? 'Last 24 Hours' :
            timeFilter === 'week' ? 'Last Week' :
            timeFilter === 'month' ? 'Last Month' :
            timeFilter === 'year' ? 'Last Year' : 'All Time'
          }</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Filter by Time</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleTimeFilterChange('hour')}>
            Last Hour
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleTimeFilterChange('day')}>
            Last 24 Hours
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleTimeFilterChange('week')}>
            Last Week
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleTimeFilterChange('month')}>
            Last Month
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleTimeFilterChange('year')}>
            Last Year
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleTimeFilterChange('all')}>
            All Time
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
