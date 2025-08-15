import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Code, 
  Database, 
  Globe, 
  Bot, 
  Zap, 
  FileText, 
  Users,
  ChevronRight,
  Play
} from "lucide-react";

interface CurriculumSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  lessons: number;
  projects: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  topics: string[];
  estimatedTime: string;
}

const curriculumData: CurriculumSection[] = [
  {
    id: "fundamentals",
    title: "Python Fundamentals",
    description: "Master the core concepts of Python programming",
    icon: <BookOpen className="w-6 h-6" />,
    lessons: 15,
    projects: 5,
    difficulty: "Beginner",
    topics: ["Variables", "Data Types", "Control Flow", "Functions", "Lists", "Dictionaries"],
    estimatedTime: "3-4 weeks"
  },
  {
    id: "oop",
    title: "Object-Oriented Programming",
    description: "Learn classes, objects, and advanced programming patterns",
    icon: <Code className="w-6 h-6" />,
    lessons: 12,
    projects: 4,
    difficulty: "Intermediate",
    topics: ["Classes", "Objects", "Inheritance", "Polymorphism", "Encapsulation"],
    estimatedTime: "2-3 weeks"
  },
  {
    id: "data-handling",
    title: "Data Handling & File Operations",
    description: "Work with files, APIs, and data processing",
    icon: <Database className="w-6 h-6" />,
    lessons: 10,
    projects: 6,
    difficulty: "Intermediate",
    topics: ["File I/O", "JSON", "CSV", "APIs", "Error Handling", "Logging"],
    estimatedTime: "2-3 weeks"
  },
  {
    id: "web-dev",
    title: "Web Development",
    description: "Build web applications with Flask and Django",
    icon: <Globe className="w-6 h-6" />,
    lessons: 18,
    projects: 8,
    difficulty: "Advanced",
    topics: ["Flask", "Django", "REST APIs", "Databases", "Authentication", "Deployment"],
    estimatedTime: "4-5 weeks"
  },
  {
    id: "data-science",
    title: "Data Science & Analytics",
    description: "Analyze data and build machine learning models",
    icon: <FileText className="w-6 h-6" />,
    lessons: 16,
    projects: 7,
    difficulty: "Advanced",
    topics: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn", "Statistics", "Visualization"],
    estimatedTime: "4-5 weeks"
  },
  {
    id: "automation",
    title: "Automation & Scripting",
    description: "Automate tasks and build productivity tools",
    icon: <Zap className="w-6 h-6" />,
    lessons: 14,
    projects: 10,
    difficulty: "Intermediate",
    topics: ["Web Scraping", "Task Automation", "System Administration", "Scheduling"],
    estimatedTime: "3-4 weeks"
  },
  {
    id: "ai-integration",
    title: "AI & Machine Learning",
    description: "Build intelligent applications with modern AI tools",
    icon: <Bot className="w-6 h-6" />,
    lessons: 20,
    projects: 6,
    difficulty: "Advanced",
    topics: ["TensorFlow", "PyTorch", "OpenAI API", "Computer Vision", "NLP", "Deep Learning"],
    estimatedTime: "5-6 weeks"
  },
  {
    id: "advanced-topics",
    title: "Advanced Python & Best Practices",
    description: "Professional development practices and advanced concepts",
    icon: <Users className="w-6 h-6" />,
    lessons: 12,
    projects: 4,
    difficulty: "Advanced",
    topics: ["Testing", "Debugging", "Performance", "Design Patterns", "Code Quality"],
    estimatedTime: "3-4 weeks"
  }
];

interface CurriculumOverviewProps {
  onSectionClick?: (sectionId: string) => void;
  onLessonClick?: (moduleId: string, lessonIndex: number) => void;
}

const CurriculumOverview = ({ onSectionClick, onLessonClick }: CurriculumOverviewProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-terminal-green/20 text-terminal-green border-terminal-green/30";
      case "Intermediate": return "bg-python-blue/20 text-python-blue border-python-blue/30";
      case "Advanced": return "bg-code-purple/20 text-code-purple border-code-purple/30";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  const totalLessons = curriculumData.reduce((sum, section) => sum + section.lessons, 0);
  const totalProjects = curriculumData.reduce((sum, section) => sum + section.projects, 0);

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-2">
            <BookOpen className="w-4 h-4 mr-2" />
            Complete Curriculum
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            A to Z Python Mastery
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Comprehensive learning path covering everything from basic syntax to advanced AI integration. 
            Each section includes interactive lessons, hands-on projects, and real-world applications.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{totalLessons}</div>
              <div className="text-muted-foreground">Interactive Lessons</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">{totalProjects}</div>
              <div className="text-muted-foreground">Hands-on Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-terminal-green">26-32</div>
              <div className="text-muted-foreground">Weeks to Complete</div>
            </div>
          </div>
        </div>

        {/* Curriculum Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {curriculumData.map((section, index) => (
            <Card 
              key={section.id} 
              className="group hover:shadow-card hover:border-primary/30 transition-all duration-300 cursor-pointer"
              onClick={() => onSectionClick?.(section.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                    {section.icon}
                  </div>
                  <Badge className={getDifficultyColor(section.difficulty)}>
                    {section.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {section.title}
                </CardTitle>
                <p className="text-muted-foreground">
                  {section.description}
                </p>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center text-muted-foreground">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {section.lessons} lessons
                      </span>
                      <span className="flex items-center text-muted-foreground">
                        <Code className="w-4 h-4 mr-1" />
                        {section.projects} projects
                      </span>
                    </div>
                    <span className="text-muted-foreground">
                      {section.estimatedTime}
                    </span>
                  </div>

                  {/* Topics */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Key Topics:</h4>
                    <div className="flex flex-wrap gap-1">
                      {section.topics.slice(0, 4).map((topic) => (
                        <Badge key={topic} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                      {section.topics.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{section.topics.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="pt-2">
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:border-primary/50 group-hover:text-primary transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSectionClick?.(section.id);
                      }}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Section
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="bg-gradient-hero/10 border-primary/20 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Master Python?</h3>
              <p className="text-muted-foreground mb-6">
                Start your comprehensive Python journey today. Get personalized learning paths, 
                interactive coding exercises, and build real-world projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => onSectionClick?.('assessment')}
                >
                  Take Assessment
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => onSectionClick?.('fundamentals')}
                >
                  Try Demo Lesson
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CurriculumOverview;