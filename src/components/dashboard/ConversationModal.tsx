
import React from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { X, TrendingUp, MessageSquare, ArrowUpRight } from "lucide-react";
import { type RedditPost } from "@/services/redditAPI";

interface ConversationModalProps {
  selectedConversation: RedditPost | null;
  isLoadingComments: boolean;
  closeModal: () => void;
}

export const ConversationModal: React.FC<ConversationModalProps> = ({
  selectedConversation,
  isLoadingComments,
  closeModal,
}) => {
  if (!selectedConversation) return null;

  const openRedditLink = (permalink: string) => {
    window.open(`https://reddit.com${permalink}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-background rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto"
        >
          <div className="sticky top-0 z-10 flex justify-between items-start p-6 border-b bg-background/95 backdrop-blur-sm">
            <div>
              <h2 className="text-xl font-semibold">{selectedConversation.title}</h2>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <Badge variant="outline">{selectedConversation.subreddit}</Badge>
                <span>•</span>
                <span>Posted by u/{selectedConversation.author}</span>
                <span>•</span>
                <span>{selectedConversation.time}</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={closeModal}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <p className="text-foreground">{selectedConversation.content || "No content available."}</p>
              <div className="flex items-center gap-4 mt-4 text-sm">
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  <span>{selectedConversation.upvotes} upvotes</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{selectedConversation.comments} comments</span>
                </div>
                {selectedConversation.permalink && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-auto text-muted-foreground hover:text-foreground"
                    onClick={() => openRedditLink(selectedConversation.permalink)}
                  >
                    <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
                    View on Reddit
                  </Button>
                )}
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div>
              <h3 className="font-medium mb-4">Comments</h3>
              {isLoadingComments ? (
                <div className="space-y-4">
                  {Array(3).fill(0).map((_, i) => (
                    <div key={i} className="border rounded-lg p-4">
                      <Skeleton className="h-4 w-28 mb-2" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-3/4 mt-1" />
                    </div>
                  ))}
                </div>
              ) : selectedConversation.commentsList.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  <p>No comments available for this post.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedConversation.commentsList.map((comment, index) => (
                    <motion.div 
                      key={comment.id || index} 
                      className="border rounded-lg p-4"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <div className="flex justify-between">
                        <span className="font-medium flex items-center">
                          <Avatar className="h-5 w-5 mr-1.5">
                            <AvatarFallback className="text-[10px]">
                              {comment.author.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          u/{comment.author}
                        </span>
                        <div className="flex items-center gap-1 text-sm">
                          <TrendingUp className="h-4 w-4" />
                          <span>{comment.upvotes}</span>
                        </div>
                      </div>
                      <p className="mt-2">{comment.text}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="sticky bottom-0 border-t p-4 flex justify-end bg-background/95 backdrop-blur-sm">
            <Button variant="outline" onClick={closeModal}>Close</Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
