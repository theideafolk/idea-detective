
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
  DollarSign,
  ExternalLink,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-reddit" />
              <span className="text-xl font-bold font-heading">Reddit Listener</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-foreground font-medium hover:text-reddit transition-colors">Home</Link>
              <a href="#features" className="text-foreground font-medium hover:text-reddit transition-colors">Features</a>
              <a href="#how-it-works" className="text-foreground font-medium hover:text-reddit transition-colors">How It Works</a>
              <a href="#pricing" className="text-foreground font-medium hover:text-reddit transition-colors">Pricing</a>
              <Link to="/login" className="text-foreground font-medium hover:text-reddit transition-colors">Login</Link>
              <Button asChild className="modern-button">
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
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative hero-background overflow-hidden">
        <div className="bg-noise"></div>
        <div className="container mx-auto px-4 py-20 lg:py-28 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 font-heading">
                Discover <span className="gradient-text">Business Opportunities</span> on Reddit in Real-Time
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Identify potential clients, track industry trends, and never miss relevant 
                discussions about your services on Reddit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="modern-button font-medium" asChild>
                  <Link to="/register">
                    Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="modern-button border-reddit text-reddit hover:bg-reddit-muted" asChild>
                  <Link to="/contact">Schedule Demo</Link>
                </Button>
              </div>
              <div className="mt-6 text-sm text-muted-foreground">
                <p>✓ 14-day free trial  ✓ No credit card required  ✓ Cancel anytime</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="glass-card rounded-lg overflow-hidden shadow-xl p-2"
            >
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Reddit Listener Dashboard" 
                className="w-full h-auto object-cover rounded-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-white to-reddit-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Why Monitor Reddit for Your Business?
            </h2>
            <p className="section-subtitle">
              Reddit is a goldmine of business intelligence and potential clients. Our tool helps you tap into this resource efficiently.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Search className="h-10 w-10 text-reddit" />,
                title: "Find Potential Clients",
                description: "Identify users actively seeking services like yours and engage before your competitors"
              },
              {
                icon: <ChartLine className="h-10 w-10 text-reddit" />,
                title: "Track Industry Trends",
                description: "Stay ahead of market shifts by monitoring relevant subreddit discussions"
              },
              {
                icon: <ArrowUpRight className="h-10 w-10 text-reddit" />,
                title: "Increase Engagement",
                description: "Join conversations at the right time to establish authority in your field"
              },
              {
                icon: <DollarSign className="h-10 w-10 text-reddit" />,
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
                <Card className="modern-card h-full">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">{benefit.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 font-heading">{benefit.title}</h3>
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
            <h2 className="section-title">
              Powerful Reddit Monitoring Features
            </h2>
            <p className="section-subtitle">
              Our system is designed to be simple yet powerful, giving you the tools you need to succeed on Reddit
            </p>
          </div>
          
          <Tabs defaultValue="monitoring" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-3 mb-8 bg-reddit-muted/50">
              <TabsTrigger value="monitoring" className="data-[state=active]:bg-white data-[state=active]:text-reddit">Monitoring</TabsTrigger>
              <TabsTrigger value="filtering" className="data-[state=active]:bg-white data-[state=active]:text-reddit">Analytics</TabsTrigger>
              <TabsTrigger value="collaboration" className="data-[state=active]:bg-white data-[state=active]:text-reddit">Collaboration</TabsTrigger>
            </TabsList>
            
            <TabsContent value="monitoring" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-4">
                  <h3 className="text-2xl font-semibold mb-4 font-heading">Real-time Reddit Monitoring</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-reddit flex-shrink-0 mt-0.5" />
                      <span>Track mentions of keywords and brand names across all of Reddit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-reddit flex-shrink-0 mt-0.5" />
                      <span>Monitor specific subreddits relevant to your business</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-reddit flex-shrink-0 mt-0.5" />
                      <span>Get notified of business opportunities as they happen</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-reddit flex-shrink-0 mt-0.5" />
                      <span>Receive daily digest emails summarizing key conversations</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100">
                  <img 
                    src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                    alt="Real-time monitoring dashboard" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="filtering" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-4">
                  <h3 className="text-2xl font-semibold mb-4 font-heading">Smart Filtering & Analytics</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-reddit flex-shrink-0 mt-0.5" />
                      <span>Filter conversations by relevance, recency, and engagement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-reddit flex-shrink-0 mt-0.5" />
                      <span>Track conversation metrics over time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-reddit flex-shrink-0 mt-0.5" />
                      <span>Identify high-opportunity posts with our scoring system</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-reddit flex-shrink-0 mt-0.5" />
                      <span>Organize keywords by service category</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                    alt="Filtering and analytics features" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="collaboration" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-4">
                  <h3 className="text-2xl font-semibold mb-4 font-heading">Team Collaboration</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-reddit flex-shrink-0 mt-0.5" />
                      <span>Share insights with team members</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-reddit flex-shrink-0 mt-0.5" />
                      <span>Assign conversations to specific team members</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-reddit flex-shrink-0 mt-0.5" />
                      <span>Track engagement status and outcomes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-5 w-5 text-reddit flex-shrink-0 mt-0.5" />
                      <span>Maintain a history of client interactions for future reference</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100">
                  <img 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
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
      <section id="how-it-works" className="bg-gradient-to-b from-white to-reddit-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
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
                  <span className="text-6xl font-bold text-reddit/10 font-heading">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 font-heading">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-10 right-0 w-16 h-1 border-t-2 border-dashed border-reddit/20"></div>
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
            <h2 className="section-title">Who Can Benefit from Reddit Monitoring?</h2>
            <p className="section-subtitle">
              Our tool is designed for various professionals looking to leverage Reddit for business growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="h-10 w-10 text-reddit" />,
                title: "Early-stage Founders",
                description: "Find product feedback, identify early adopters, and validate ideas"
              },
              {
                icon: <MessageSquare className="h-10 w-10 text-reddit" />,
                title: "Digital Agencies",
                description: "Source new clients and track industry conversations for your clients"
              },
              {
                icon: <Filter className="h-10 w-10 text-reddit" />,
                title: "Product Managers",
                description: "Gather user insights and identify feature requests from authentic discussions"
              },
              {
                icon: <Bell className="h-10 w-10 text-reddit" />,
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
                <Card className="modern-card h-full">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">{useCase.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 font-heading">{useCase.title}</h3>
                    <p className="text-muted-foreground">{useCase.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="bg-gradient-to-b from-white to-reddit-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Simple, Transparent Pricing</h2>
            <p className="section-subtitle">
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
                <Card className={`h-full bg-white ${plan.popular ? 'border-reddit shadow-lg' : 'border-gray-200'}`}>
                  {plan.popular && (
                    <div className="bg-reddit text-white text-center py-1 text-sm font-medium">
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
                          <ArrowRight className="h-5 w-5 text-reddit flex-shrink-0 mt-0.5" />
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

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Everything you need to know about our Reddit monitoring tool
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "How fresh is the Reddit data?",
                answer: "Our system scans Reddit continuously, with new conversations typically appearing in your dashboard within 15 minutes of being posted on Reddit."
              },
              {
                question: "Do I need a Reddit account to use this tool?",
                answer: "No, you don't need a Reddit account to monitor conversations. However, if you want to respond to Reddit posts directly, you'll need your own Reddit account."
              },
              {
                question: "Can I export the data I collect?",
                answer: "Yes, all plans include the ability to export your data to CSV for further analysis or reporting."
              },
              {
                question: "How are the notification settings configured?",
                answer: "You can customize notification settings for each keyword, choosing between real-time alerts, daily digests, or no notifications at all."
              },
              {
                question: "Is there a limit to how many posts I can monitor?",
                answer: "There's no limit to the number of posts we'll monitor and notify you about. The plan limits refer to the number of keywords and subreddits you can actively track."
              },
              {
                question: "Can I cancel my subscription anytime?",
                answer: "Yes, you can cancel your subscription at any time with no questions asked. You'll maintain access until the end of your billing period."
              }
            ].map((faq, index) => (
              <div key={index} className="mb-4">
                <div className="bg-white border border-gray-100 rounded-lg hover:border-reddit-light transition-colors">
                  <details className="group p-4">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                      <span className="text-lg font-semibold">{faq.question}</span>
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </summary>
                    <p className="text-muted-foreground mt-3">{faq.answer}</p>
                  </details>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-reddit/10 to-reddit/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">Ready to Discover Business Opportunities on Reddit?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join hundreds of businesses already finding leads and insights on Reddit
          </p>
          <Button size="lg" className="px-8 modern-button" asChild>
            <Link to="/register">Start Your Free 14-Day Trial</Link>
          </Button>
          <p className="mt-4 text-muted-foreground">No credit card required. Cancel anytime.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <MessageSquare className="h-6 w-6 text-reddit" />
              <span className="text-xl font-bold font-heading">Reddit Listener</span>
            </div>
            <div className="flex flex-wrap gap-4 md:gap-8 justify-center">
              <Link to="/" className="hover:text-reddit transition-colors">Home</Link>
              <a href="#features" className="hover:text-reddit transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-reddit transition-colors">How It Works</a>
              <a href="#pricing" className="hover:text-reddit transition-colors">Pricing</a>
              <Link to="/login" className="hover:text-reddit transition-colors">Login</Link>
              <Link to="/register" className="hover:text-reddit transition-colors">Get Started</Link>
            </div>
          </div>
          
          <Separator />
          
          <div className="mt-8 text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} The Idea Folk. All rights reserved.</p>
            <div className="mt-2 flex justify-center gap-4">
              <a href="#" className="hover:text-reddit transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-reddit transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-reddit transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
