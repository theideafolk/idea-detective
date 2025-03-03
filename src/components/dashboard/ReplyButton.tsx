
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ReplyDialog } from "./ReplyDialog";
import { toast } from "sonner";
import { MessageSquare } from "lucide-react";
import { RedditPost, RedditComment } from "@/services/redditAPI";

interface ReplyButtonProps {
  post: RedditPost;
  comment?: RedditComment;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "icon";
}

export const ReplyButton = ({
  post,
  comment,
  variant = "outline",
  size = "sm"
}: ReplyButtonProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleSubmitReply = async (content: string) => {
    // In a real app, this would call the Reddit API
    console.log("Submitting reply:", {
      postId: post.id,
      commentId: comment?.id,
      content,
      subreddit: post.subreddit,
    });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    
    if (!isAuthenticated) {
      throw new Error("Not authenticated");
    }
    
    // Success! In a real app, we would update the UI with the new comment
    return;
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={() => {
          const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
          if (!isAuthenticated) {
            toast.error("You must be logged in to reply", {
              description: "Please login or register to interact with Reddit posts",
              action: {
                label: "Login",
                onClick: () => {
                  window.location.href = "/login";
                },
              },
            });
            return;
          }
          setDialogOpen(true);
        }}
      >
        <MessageSquare className="mr-1 h-4 w-4" />
        Reply
      </Button>
      
      <ReplyDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        postTitle={comment?.text || post.title}
        postId={post.id}
        subreddit={post.subreddit}
        isComment={!!comment}
        onReplySubmit={handleSubmitReply}
      />
    </>
  );
};
