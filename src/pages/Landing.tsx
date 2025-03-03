
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  MessageSquare, 
  Filter, 
  Bell, 
  Users, 
  Search, 
  ChartLine, 
  ArrowUpRight, 
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Reddit Listener for The Idea Folk</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
            <a href="#features" className="text-foreground hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">How It Works</a>
            <a href="#pricing" className="text-foreground hover:text-primary transition-colors">Pricing</a>
            <Link to="/login" className="text-foreground hover:text-primary transition-colors">Login</Link>
            <Button asChild>
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Discover Business Opportunities on Reddit in Real-Time
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Identify potential clients, track industry trends, and never miss relevant 
              discussions about your services on Reddit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/register">
                  Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Schedule Demo</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-card rounded-lg overflow-hidden shadow-xl p-2"
          >
            <img 
              src="/placeholder.svg" 
              alt="Reddit Listener Dashboard" 
              className="w-full h-auto object-cover rounded-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Monitor Reddit for Your Business?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Reddit is a goldmine of business intelligence and potential clients. Our tool helps you tap into this resource efficiently.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Search className="h-10 w-10 text-primary" />,
                title: "Find Potential Clients",
                description: "Identify users actively seeking services like yours and engage before your competitors"
              },
              {
                icon: <ChartLine className="h-10 w-10 text-primary" />,
                title: "Track Industry Trends",
                description: "Stay ahead of market shifts by monitoring relevant subreddit discussions"
              },
              {
                icon: <ArrowUpRight className="h-10 w-10 text-primary" />,
                title: "Increase Engagement",
                description: "Join conversations at the right time to establish authority in your field"
              },
              {
                icon: <DollarSign className="h-10 w-10 text-primary" />,
                title: "Generate Revenue",
                description: "Convert Reddit insights into business opportunities and measurable growth"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">{benefit.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Showcase Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Reddit Monitoring Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our system is designed to be simple yet powerful, giving you the tools you need to succeed on Reddit
            </p>
          </div>
          
          <Tabs defaultValue="monitoring" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
              <TabsTrigger value="filtering">Analytics</TabsTrigger>
              <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
            </TabsList>
            
            <TabsContent value="monitoring" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Real-time Reddit Monitoring</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Track mentions of keywords and brand names across all of Reddit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Monitor specific subreddits relevant to your business</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Get notified of business opportunities as they happen</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Receive daily digest emails summarizing key conversations</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="/placeholder.svg" 
                    alt="Real-time monitoring dashboard" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="filtering" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Smart Filtering & Analytics</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Filter conversations by relevance, recency, and engagement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Track conversation metrics over time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Identify high-opportunity posts with our scoring system</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Organize keywords by service category</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="/placeholder.svg" 
                    alt="Filtering and analytics features" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="collaboration" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Team Collaboration</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Share insights with team members</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Assign conversations to specific team members</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Track engagement status and outcomes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Maintain a history of client interactions for future reference</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-card rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="/placeholder.svg" 
                    alt="Team collaboration features" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started in minutes with our simple process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Configure Keywords & Subreddits",
                description: "Select what keywords and subreddits to monitor based on your business needs"
              },
              {
                step: "02",
                title: "Automatic Monitoring",
                description: "Our system continuously scans Reddit for new conversations matching your criteria"
              },
              {
                step: "03",
                title: "Receive Notifications",
                description: "Get notified of relevant conversations via email or in-app alerts"
              },
              {
                step: "04",
                title: "Engage & Track Results",
                description: "Respond to opportunities and measure the impact on your business"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="relative text-center"
              >
                <div className="mb-4 flex justify-center">
                  <span className="text-6xl font-bold text-primary/10">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-10 right-0 w-16 h-1 border-t-2 border-dashed border-primary/20"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Who Can Benefit from Reddit Monitoring?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our tool is designed for various professionals looking to leverage Reddit for business growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="h-10 w-10 text-primary" />,
                title: "Early-stage Founders",
                description: "Find product feedback, identify early adopters, and validate ideas"
              },
              {
                icon: <MessageSquare className="h-10 w-10 text-primary" />,
                title: "Digital Agencies",
                description: "Source new clients and track industry conversations for your clients"
              },
              {
                icon: <Filter className="h-10 w-10 text-primary" />,
                title: "Product Managers",
                description: "Gather user insights and identify feature requests from authentic discussions"
              },
              {
                icon: <Bell className="h-10 w-10 text-primary" />,
                title: "Small Businesses",
                description: "Find potential customers actively seeking your services or products"
              }
            ].map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">{useCase.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                    <p className="text-muted-foreground">{useCase.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that works best for your business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Starter",
                price: "$29",
                period: "/month",
                description: "Perfect for solopreneurs and freelancers",
                features: [
                  "Monitor 3 subreddits",
                  "Track 10 keywords",
                  "Daily email digests",
                  "7-day post history",
                  "Basic analytics"
                ],
                cta: "Start Free Trial",
                popular: false
              },
              {
                title: "Professional",
                price: "$79",
                period: "/month",
                description: "Best for growing businesses and agencies",
                features: [
                  "Monitor 10 subreddits",
                  "Track 50 keywords",
                  "Real-time notifications",
                  "30-day post history",
                  "Advanced analytics",
                  "2 team members"
                ],
                cta: "Start Free Trial",
                popular: true
              },
              {
                title: "Enterprise",
                price: "$199",
                period: "/month",
                description: "For larger teams and agencies",
                features: [
                  "Unlimited subreddits",
                  "Unlimited keywords",
                  "Priority notifications",
                  "90-day post history",
                  "Custom reporting",
                  "10 team members",
                  "Dedicated support"
                ],
                cta: "Contact Sales",
                popular: false
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className={`h-full ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                  {plan.popular && (
                    <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                      <div className="flex justify-center items-baseline mb-2">
                        <span className="text-4xl font-bold">{plan.price}</span>
                        <span className="text-muted-foreground ml-1">{plan.period}</span>
                      </div>
                      <p className="text-muted-foreground">{plan.description}</p>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? "default" : "outline"}
                      asChild
                    >
                      <Link to="/register">{plan.cta}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-8 text-muted-foreground">
            <p>All plans include a 14-day free trial. No credit card required.</p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Discover Business Opportunities on Reddit?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join hundreds of businesses already finding leads and insights on Reddit
          </p>
          <Button size="lg" className="px-8" asChild>
            <Link to="/register">Start Your Free 14-Day Trial</Link>
          </Button>
          <p className="mt-4 text-muted-foreground">No credit card required. Cancel anytime.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <MessageSquare className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Reddit Listener</span>
            </div>
            <div className="flex flex-wrap gap-4 md:gap-8 justify-center">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <a href="#features" className="hover:text-primary transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a>
              <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
              <Link to="/login" className="hover:text-primary transition-colors">Login</Link>
              <Link to="/register" className="hover:text-primary transition-colors">Get Started</Link>
            </div>
          </div>
          
          <Separator />
          
          <div className="mt-8 text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} The Idea Folk. All rights reserved.</p>
            <div className="mt-2 flex justify-center gap-4">
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
