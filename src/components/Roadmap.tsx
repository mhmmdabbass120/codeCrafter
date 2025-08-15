import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, Clock, Trophy, BookOpen, Code, Database, Globe } from "lucide-react";

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  topics: string[];
  projects: string[];
  completed: boolean;
  current: boolean;
}

interface RoadmapProps {
  answers: Record<string, string>;
}

const generateRoadmap = (answers: Record<string, string>): RoadmapItem[] => {
  const baseRoadmap: RoadmapItem[] = [
    {
      id: "fundamentals",
      title: "Python Fundamentals",
      description: "Master the building blocks of Python programming",
      estimatedTime: "2-3 weeks",
      difficulty: "Beginner",
      topics: ["Variables & Data Types", "Control Structures", "Functions", "Lists & Dictionaries"],
      projects: ["Calculator App", "To-Do List", "Number Guessing Game"],
      completed: false,
      current: true
    },
    {
      id: "oop",
      title: "Object-Oriented Programming",
      description: "Learn classes, objects, and advanced Python concepts",
      estimatedTime: "2-3 weeks",
      difficulty: "Intermediate",
      topics: ["Classes & Objects", "Inheritance", "Polymorphism", "Exception Handling"],
      projects: ["Bank Account System", "Library Management", "Game Character Classes"],
      completed: false,
      current: false
    },
    {
      id: "libraries",
      title: "Essential Libraries",
      description: "Explore Python's powerful ecosystem",
      estimatedTime: "3-4 weeks",
      difficulty: "Intermediate",
      topics: ["NumPy", "Pandas", "Requests", "Beautiful Soup"],
      projects: ["Data Analysis Dashboard", "Web Scraper", "API Client"],
      completed: false,
      current: false
    }
  ];

  // Customize based on goals
  if (answers.goals === "web") {
    baseRoadmap.push({
      id: "web",
      title: "Web Development",
      description: "Build modern web applications with Python",
      estimatedTime: "4-5 weeks",
      difficulty: "Advanced",
      topics: ["Flask/Django", "REST APIs", "Database Integration", "Authentication"],
      projects: ["Blog Platform", "E-commerce API", "Social Media App"],
      completed: false,
      current: false
    });
  } else if (answers.goals === "data") {
    baseRoadmap.push({
      id: "data",
      title: "Data Science & ML",
      description: "Analyze data and build machine learning models",
      estimatedTime: "5-6 weeks",
      difficulty: "Advanced",
      topics: ["Matplotlib", "Scikit-learn", "TensorFlow", "Data Visualization"],
      projects: ["Stock Price Predictor", "Sentiment Analysis", "Recommendation System"],
      completed: false,
      current: false
    });
  } else if (answers.goals === "automation") {
    baseRoadmap.push({
      id: "automation",
      title: "Automation & Scripting",
      description: "Automate tasks and build useful tools",
      estimatedTime: "3-4 weeks",
      difficulty: "Advanced",
      topics: ["File Operations", "Web Automation", "Task Scheduling", "System Administration"],
      projects: ["File Organizer", "Email Automation", "System Monitor"],
      completed: false,
      current: false
    });
  }

  return baseRoadmap;
};

const Roadmap = ({ answers }: RoadmapProps) => {
  const roadmapItems = generateRoadmap(answers);
  const completedItems = roadmapItems.filter(item => item.completed).length;
  const progress = (completedItems / roadmapItems.length) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-terminal-green/20 text-terminal-green";
      case "Intermediate": return "bg-python-blue/20 text-python-blue";
      case "Advanced": return "bg-code-purple/20 text-code-purple";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  const getIcon = (id: string) => {
    switch (id) {
      case "fundamentals": return <BookOpen className="w-5 h-5" />;
      case "oop": return <Code className="w-5 h-5" />;
      case "libraries": return <Database className="w-5 h-5" />;
      case "web": return <Globe className="w-5 h-5" />;
      default: return <Trophy className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Your Personalized Learning Roadmap
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            A structured path tailored to your experience and goals
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">{completedItems}/{roadmapItems.length} modules</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </div>

        <div className="space-y-6">
          {roadmapItems.map((item, index) => (
            <Card 
              key={item.id} 
              className={`relative overflow-hidden transition-all duration-300 ${
                item.current 
                  ? "border-primary/50 shadow-glow bg-primary/5" 
                  : item.completed 
                    ? "border-terminal-green/50 bg-terminal-green/5" 
                    : "border-border/50 hover:border-primary/30"
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      item.completed ? "bg-terminal-green/20" : 
                      item.current ? "bg-primary/20" : "bg-muted/20"
                    }`}>
                      {item.completed ? (
                        <CheckCircle className="w-5 h-5 text-terminal-green" />
                      ) : item.current ? (
                        getIcon(item.id)
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {item.title}
                        {item.current && (
                          <Badge className="bg-primary/20 text-primary border-primary/30">
                            Current
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {item.description}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <Badge className={getDifficultyColor(item.difficulty)}>
                      {item.difficulty}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {item.estimatedTime}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">Key Topics</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.topics.map((topic) => (
                        <Badge key={topic} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-accent">Projects</h4>
                    <ul className="space-y-1">
                      {item.projects.map((project) => (
                        <li key={project} className="text-sm text-muted-foreground flex items-center">
                          <Code className="w-3 h-3 mr-2 text-terminal-green" />
                          {project}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {item.current && (
                  <div className="mt-6 pt-4 border-t border-border/50">
                    <Button variant="hero" className="w-full sm:w-auto">
                      Start This Module
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-gradient-hero/10 border-primary/20">
            <CardContent className="p-8">
              <Trophy className="w-12 h-12 text-python-yellow mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Ready to Start Your Journey?</h3>
              <p className="text-muted-foreground mb-6">
                Your personalized roadmap is ready. Start with the fundamentals and work your way up!
              </p>
              <Button variant="hero" size="lg">
                Begin Learning Python
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;