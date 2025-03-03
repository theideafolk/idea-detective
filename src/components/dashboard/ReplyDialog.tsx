
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { AlertCircle, Send, MessageSquare } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ReplyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postTitle: string;
  postId: string;
  subreddit: string;
  isComment?: boolean;
  onReplySubmit: (content: string) => Promise<void>;
}

export const ReplyDialog = ({
  open,
  onOpenChange,
  postTitle,
  postId,
  subreddit,
  isComment = false,
  onReplySubmit,
}: ReplyDialogProps) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!content.trim()) {
      setError("Please enter a reply.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onReplySubmit(content);
      setContent("");
      onOpenChange(false);
      toast.success(`Reply submitted successfully!`);
    } catch (error) {
      console.error("Error submitting reply:", error);
      setError("Failed to submit reply. Please try again.");
      toast.error("Reply submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if user is logged in and connected to Reddit
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isRedditConnected = user?.isRedditConnected;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isComment ? "Reply to comment" : "Reply to post"}
          </DialogTitle>
          <DialogDescription>
            {isComment
              ? "Your reply will be added as a comment to this comment."
              : "Your reply will be added as a comment to this post."}{" "}
            It will be visible to everyone on {subreddit}.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-4 text-sm font-medium text-muted-foreground">
            {isComment ? "Replying to comment in:" : "Replying to:"}
            <div className="mt-1 font-semibold text-foreground">{postTitle}</div>
          </div>

          {!isRedditConnected && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You need to connect your Reddit account to reply. Please go to Settings and connect your Reddit account.
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Textarea
            placeholder={
              isComment
                ? "Write your reply to this comment..."
                : "Write your reply to this post..."
            }
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              if (error) setError(null);
            }}
            disabled={isSubmitting || !isRedditConnected}
            rows={6}
            className="resize-none"
          />

          <div className="mt-2 text-xs text-muted-foreground">
            <span className="font-medium">Tip:</span> Be respectful and follow
            the subreddit's rules. Your reply will be posted through your Reddit
            account ({user?.redditUsername || "Not connected"}).
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="reddit"
            onClick={handleSubmit}
            disabled={isSubmitting || !isRedditConnected}
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                {isComment ? (
                  <MessageSquare className="mr-2 h-4 w-4" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                {isComment ? "Reply to Comment" : "Post Reply"}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
