import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code, Zap, Trophy, Rocket, User } from "lucide-react";
import heroImage from "@/assets/hero-python.jpg";

interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'user';
}

interface HeroProps {
  user?: User | null;
}

const Hero = ({ user }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="animate-slide-up">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2">
            <Zap className="w-4 h-4 mr-2" />
            Interactive Python Learning Platform
          </Badge>

          {/* Personalized Welcome */}
          {user && (
            <div className="mb-6 flex items-center justify-center gap-2 text-lg text-muted-foreground">
              <User className="w-5 h-5 text-primary" />
              <span>Welcome back, <strong className="text-primary">{user.firstName}</strong>!</span>
              {user.role === 'admin' && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  Admin
                </Badge>
              )}
            </div>
          )}
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Master Python
            <br />
            <span className="text-4xl md:text-6xl">From Zero to Hero</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Learn Python through interactive coding, personalized roadmaps, and hands-on projects. 
            Build real applications while mastering everything from basics to AI integration.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="hero" size="lg" className="text-lg px-8 py-6">
              <Rocket className="w-5 h-5 mr-2" />
              Start Learning Now
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              <Code className="w-5 h-5 mr-2" />
              Try Interactive Demo
            </Button>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Interactive Coding</h3>
              <p className="text-muted-foreground text-center">Write, run, and test Python code directly in your browser with instant feedback</p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Personalized Path</h3>
              <p className="text-muted-foreground text-center">Custom learning roadmap based on your experience and goals</p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-terminal-green/20 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-terminal-green" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Real Projects</h3>
              <p className="text-muted-foreground text-center">Build actual applications, from web apps to AI tools</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;