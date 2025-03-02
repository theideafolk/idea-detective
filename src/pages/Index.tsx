
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setLoading(true);
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Welcome!",
        description: "You've successfully started the Reddit Listening Tool.",
      });
      console.log("Get started clicked");
      // navigate("/dashboard"); // Uncomment when dashboard page is created
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4">
      <div className="relative w-full max-w-4xl">
        <div className="bg-noise"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <Card className="glass-card border-none shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl sm:text-5xl font-bold tracking-tight">
                Reddit Listening Tool
              </CardTitle>
              <CardDescription className="text-xl mt-2">
                Monitor relevant conversations on Reddit to identify opportunities
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-6 text-muted-foreground max-w-2xl mx-auto">
                Track conversations, identify potential clients, and stay on top of industry trends - all in one place.
              </p>
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                disabled={loading}
                className="primary-button"
              >
                {loading ? "Loading..." : "Get Started"}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
