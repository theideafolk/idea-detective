
import React from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const FilterDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Most Recent</DropdownMenuItem>
        <DropdownMenuItem>Most Upvoted</DropdownMenuItem>
        <DropdownMenuItem>Most Comments</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
