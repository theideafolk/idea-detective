
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  onRefresh: () => void;
  isFetching: boolean;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onRefresh,
  isFetching,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reddit Listening Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Monitor relevant conversations and track opportunities
        </p>
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        <Button 
          variant="outline" 
          onClick={onRefresh}
          disabled={isFetching}
          className="flex items-center gap-2"
        >
          <RefreshCw size={16} className={isFetching ? "animate-spin" : ""} />
          {isFetching ? "Refreshing..." : "Refresh"}
        </Button>
        <Button onClick={() => navigate("/")} variant="ghost">
          Back to Home
        </Button>
      </div>
    </div>
  );
};
