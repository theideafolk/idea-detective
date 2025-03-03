
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { MessageSquare, ArrowLeft, AlertCircle, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showRedditDialog, setShowRedditDialog] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    redditUsername: "",
    redditPassword: ""
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      toast.error("Passwords do not match!");
      return;
    }
    
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Simulate API call
      console.log("Registration attempt with:", formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show Reddit connection dialog
      setShowRedditDialog(true);
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage("Registration failed. Please try again with a different email or username.");
      toast.error("Registration failed. Please try again.");
      setIsLoading(false);
    }
  };

  const handleRedditConnect = async () => {
    setIsLoading(true);

    try {
      // Simulate Reddit API connection
      console.log("Connecting Reddit account:", formData.redditUsername);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success - would normally register with APIs
      setShowRedditDialog(false);
      toast.success("Registration successful! Your Reddit account has been connected.");
      
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify({
        name: formData.username,
        email: formData.email,
        isRedditConnected: true,
        redditUsername: formData.redditUsername
      }));
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Reddit connection error:", error);
      setErrorMessage("Failed to connect your Reddit account. Please check your credentials.");
      toast.error("Reddit connection failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      // Simulate Google OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show Reddit connection dialog after Google auth
      setShowRedditDialog(true);
    } catch (error) {
      console.error("Google registration error:", error);
      setErrorMessage("Could not sign up with Google. Please try again.");
      toast.error("Google sign up failed");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100">
      <header className="container mx-auto p-4">
        <nav>
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <MessageSquare className="h-6 w-6 text-reddit-orange" />
            <span>Reddit Listener</span>
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-none shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
              <CardDescription className="text-center">
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              {errorMessage && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium">
                    Username
                  </label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="johndoe"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    minLength={6}
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirm Password
                  </label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    required
                    minLength={6}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                <Button type="submit" variant="reddit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : (
                    <>
                      <UserPlus className="h-4 w-4" />
                      Register
                    </>
                  )}
                </Button>
              </form>
              
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <Button 
                type="button" 
                variant="google" 
                className="w-full" 
                onClick={handleGoogleRegister}
                disabled={isLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Sign up with Google
              </Button>
            </CardContent>
            <CardFooter className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-sm text-muted-foreground">
                Already have an account?
              </div>
              <Button variant="outline" asChild>
                <Link to="/login">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </main>

      {/* Reddit Connection Dialog */}
      <Dialog open={showRedditDialog} onOpenChange={setShowRedditDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Connect your Reddit account</DialogTitle>
            <DialogDescription>
              To monitor and interact with Reddit, you need to connect your Reddit account.
              Your credentials are securely stored and only used to access Reddit on your behalf.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="redditUsername" className="text-right">
                Reddit Username
              </Label>
              <Input
                id="redditUsername"
                name="redditUsername"
                placeholder="Your Reddit username"
                className="col-span-3"
                value={formData.redditUsername}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="redditPassword" className="text-right">
                Reddit Password
              </Label>
              <Input
                id="redditPassword"
                name="redditPassword"
                type="password"
                placeholder="Your Reddit password"
                className="col-span-3"
                value={formData.redditPassword}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setShowRedditDialog(false)}
              disabled={isLoading}
            >
              Skip for now
            </Button>
            <Button 
              type="button" 
              variant="reddit" 
              onClick={handleRedditConnect}
              disabled={isLoading}
            >
              {isLoading ? "Connecting..." : "Connect Reddit Account"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Register;
