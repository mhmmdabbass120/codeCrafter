import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft,
  BookOpen, 
  Code, 
  ExternalLink, 
  FileText,
  Video,
  Github,
  Play,
  CheckCircle,
  Clock,
  Zap,
  Star,
  Download,
  Users,
  Target,
  Trophy,
  Briefcase,
  ChevronRight
} from "lucide-react";
import { useProgress } from "@/hooks/use-progress";

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
  completed?: boolean;
  resources: {
    type: 'pdf' | 'video' | 'article' | 'github';
    title: string;
    url: string;
    description: string;
  }[];
  projects?: {
    title: string;
    description: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedTime: string;
  }[];
}

interface CurriculumSection {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  lessons: Lesson[];
  totalLessons: number;
  totalProjects: number;
  estimatedTime: string;
}

const sectionData: Record<string, CurriculumSection> = {
  fundamentals: {
    id: 'fundamentals',
    title: 'Python Fundamentals',
    description: 'Master the core concepts of Python programming',
    difficulty: 'Beginner',
    totalLessons: 15,
    totalProjects: 5,
    estimatedTime: '3-4 weeks',
    lessons: [
      {
        id: 'variables_datatypes',
        title: 'Variables and Data Types',
        description: 'Learn how to store and manipulate different types of data in Python',
        duration: '30 min',
        difficulty: 'beginner',
        xpReward: 25,
        resources: [
          {
            type: 'pdf',
            title: 'Python Variables Guide (PDF)',
            url: 'https://docs.python.org/3/tutorial/introduction.html',
            description: 'Comprehensive guide to Python variables and data types'
          },
          {
            type: 'video',
            title: 'Variables Explained - Programming with Mosh',
            url: 'https://www.youtube.com/watch?v=Z1Yd_NSC4S4',
            description: '15-minute video explaining Python variables with examples'
          },
          {
            type: 'article',
            title: 'Real Python: Variables Tutorial',
            url: 'https://realpython.com/python-variables/',
            description: 'In-depth article about Python variables and naming conventions'
          }
        ],
        projects: [
          {
            title: 'Personal Profile Creator',
            description: 'Build a program that creates and displays a personal profile using variables',
            difficulty: 'beginner',
            estimatedTime: '45 min'
          }
        ]
      },
      {
        id: 'control_structures',
        title: 'Control Structures (If/Else/Loops)',
        description: 'Control the flow of your programs with conditions and loops',
        duration: '45 min',
        difficulty: 'beginner',
        xpReward: 35,
        resources: [
          {
            type: 'pdf',
            title: 'Python Control Flow Guide',
            url: 'https://docs.python.org/3/tutorial/controlflow.html',
            description: 'Official Python documentation on control flow statements'
          },
          {
            type: 'video',
            title: 'If Statements and Loops - Corey Schafer',
            url: 'https://www.youtube.com/watch?v=9Os0o3wzS_I',
            description: 'Comprehensive video tutorial on Python control structures'
          }
        ],
        projects: [
          {
            title: 'Grade Calculator',
            description: 'Create a program that calculates letter grades with encouragement messages',
            difficulty: 'beginner',
            estimatedTime: '1 hour'
          },
          {
            title: 'Number Guessing Game',
            description: 'Build an interactive number guessing game with hints and scoring',
            difficulty: 'beginner',
            estimatedTime: '1.5 hours'
          }
        ]
      },
      {
        id: 'functions',
        title: 'Functions and Modules',
        description: 'Write reusable code with functions and organize code into modules',
        duration: '50 min',
        difficulty: 'intermediate',
        xpReward: 40,
        resources: [
          {
            type: 'pdf',
            title: 'Python Functions Reference',
            url: 'https://docs.python.org/3/tutorial/controlflow.html#defining-functions',
            description: 'Complete guide to defining and using functions in Python'
          },
          {
            type: 'video',
            title: 'Python Functions - Automate the Boring Stuff',
            url: 'https://www.youtube.com/watch?v=NSbOtYzIQI0',
            description: 'Practical approach to Python functions with real examples'
          },
          {
            type: 'github',
            title: 'Function Examples Repository',
            url: 'https://github.com/python/cpython/tree/main/Lib',
            description: 'Python standard library source code with function examples'
          }
        ],
        projects: [
          {
            title: 'Calculator Library',
            description: 'Build a comprehensive calculator with multiple functions and operations',
            difficulty: 'intermediate',
            estimatedTime: '2 hours'
          }
        ]
      },
      {
        id: 'data_structures',
        title: 'Lists, Dictionaries, and Sets',
        description: 'Master Python\'s built-in data structures for organizing information',
        duration: '1 hour',
        difficulty: 'intermediate',
        xpReward: 45,
        resources: [
          {
            type: 'pdf',
            title: 'Python Data Structures Guide',
            url: 'https://docs.python.org/3/tutorial/datastructures.html',
            description: 'Official documentation on Python data structures'
          },
          {
            type: 'video',
            title: 'Python Lists, Tuples, and Dictionaries',
            url: 'https://www.youtube.com/watch?v=W8KRzm-HUcc',
            description: 'Complete overview of Python data structures with practical examples'
          }
        ],
        projects: [
          {
            title: 'Contact Management System',
            description: 'Create a contact manager using dictionaries and lists',
            difficulty: 'intermediate',
            estimatedTime: '2.5 hours'
          },
          {
            title: 'Inventory Tracker',
            description: 'Build an inventory management system with search and filtering',
            difficulty: 'intermediate',
            estimatedTime: '3 hours'
          }
        ]
      }
    ]
  },
  'web-dev': {
    id: 'web-dev',
    title: 'Web Development with Python',
    description: 'Build web applications using Flask and Django',
    difficulty: 'Advanced',
    totalLessons: 18,
    totalProjects: 8,
    estimatedTime: '4-5 weeks',
    lessons: [
      {
        id: 'flask_intro',
        title: 'Introduction to Flask',
        description: 'Get started with Flask web framework and build your first web app',
        duration: '1 hour',
        difficulty: 'intermediate',
        xpReward: 60,
        resources: [
          {
            type: 'pdf',
            title: 'Flask Documentation',
            url: 'https://flask.palletsprojects.com/en/2.3.x/',
            description: 'Official Flask documentation and quickstart guide'
          },
          {
            type: 'video',
            title: 'Flask Tutorial - Python Web Development',
            url: 'https://www.youtube.com/watch?v=Z1RJmh_OqeA',
            description: 'Complete Flask tutorial for building web applications'
          }
        ],
        projects: [
          {
            title: 'Personal Blog',
            description: 'Build a personal blog with Flask, including posts, comments, and user authentication',
            difficulty: 'advanced',
            estimatedTime: '6 hours'
          }
        ]
      }
    ]
  }
};

interface CurriculumSectionViewProps {
  sectionId: string;
  onNavigateBack: () => void;
  onLessonClick: (lessonId: string) => void;
  onProjectClick?: (projectId: string) => void;
}

const CurriculumSectionView = ({ 
  sectionId, 
  onNavigateBack, 
  onLessonClick,
  onProjectClick 
}: CurriculumSectionViewProps) => {
  const [activeTab, setActiveTab] = useState('lessons');
  const { progress } = useProgress();
  
  const section = sectionData[sectionId];
  
  if (!section) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Section Not Found</h2>
            <p className="text-muted-foreground mb-4">This curriculum section is coming soon!</p>
            <Button onClick={onNavigateBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Curriculum
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const completedLessons = section.lessons.filter(lesson => 
    progress.completedLessons.includes(lesson.id)
  ).length;
  
  const progressPercentage = (completedLessons / section.lessons.length) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-terminal-green/20 text-terminal-green border-terminal-green/30';
      case 'intermediate': return 'bg-python-yellow/20 text-python-yellow border-python-yellow/30';
      case 'advanced': return 'bg-destructive/20 text-destructive border-destructive/30';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-4 h-4 text-red-500" />;
      case 'video': return <Video className="w-4 h-4 text-red-600" />;
      case 'article': return <BookOpen className="w-4 h-4 text-blue-500" />;
      case 'github': return <Github className="w-4 h-4" />;
      default: return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <Button variant="ghost" onClick={onNavigateBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Curriculum
            </Button>
            <div className="h-6 w-px bg-border" />
            <div>
              <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                {section.title}
              </h1>
              <p className="text-muted-foreground text-lg mt-2">{section.description}</p>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-primary">{completedLessons}</p>
                    <p className="text-xs text-muted-foreground">of {section.lessons.length} lessons</p>
                  </div>
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-accent">{section.totalProjects}</p>
                    <p className="text-xs text-muted-foreground">hands-on projects</p>
                  </div>
                  <Briefcase className="w-6 h-6 text-accent" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-terminal-green">{Math.round(progressPercentage)}%</p>
                    <p className="text-xs text-muted-foreground">completed</p>
                  </div>
                  <Trophy className="w-6 h-6 text-terminal-green" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-code-purple">{section.estimatedTime}</p>
                    <p className="text-xs text-muted-foreground">to complete</p>
                  </div>
                  <Clock className="w-6 h-6 text-code-purple" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Section Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="lessons">
              Lessons ({section.lessons.length})
            </TabsTrigger>
            <TabsTrigger value="projects">
              Projects ({section.totalProjects})
            </TabsTrigger>
            <TabsTrigger value="resources">
              Resources
            </TabsTrigger>
          </TabsList>

          <TabsContent value="lessons" className="space-y-4">
            {section.lessons.map((lesson, index) => {
              const isCompleted = progress.completedLessons.includes(lesson.id);
              const isNextLesson = index === completedLessons && !isCompleted;
              
              return (
                <Card 
                  key={lesson.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    isCompleted ? 'border-terminal-green/50 bg-terminal-green/5' :
                    isNextLesson ? 'border-primary/50 bg-primary/5 hover:shadow-lg' :
                    'hover:border-primary/30 hover:shadow-md'
                  }`}
                  onClick={() => onLessonClick(lesson.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isCompleted ? 'bg-terminal-green/20' :
                          isNextLesson ? 'bg-primary/20' : 'bg-muted/20'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-terminal-green" />
                          ) : (
                            <span className="font-bold text-sm">{index + 1}</span>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold">{lesson.title}</h3>
                            {isNextLesson && (
                              <Badge className="bg-primary/20 text-primary border-primary/30">
                                Next
                              </Badge>
                            )}
                            {isCompleted && (
                              <Badge className="bg-terminal-green/20 text-terminal-green border-terminal-green/30">
                                Completed
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-muted-foreground mb-3">{lesson.description}</p>
                          
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="flex items-center text-muted-foreground">
                              <Clock className="w-4 h-4 mr-1" />
                              {lesson.duration}
                            </span>
                            <span className="flex items-center text-muted-foreground">
                              <Zap className="w-4 h-4 mr-1" />
                              {lesson.xpReward} XP
                            </span>
                            <Badge className={getDifficultyColor(lesson.difficulty)}>
                              {lesson.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm">
                        <Play className="w-4 h-4 mr-2" />
                        {isCompleted ? 'Review' : 'Start'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            {section.lessons.flatMap(lesson => lesson.projects || []).map((project, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold">{project.title}</h3>
                        <Badge className={getDifficultyColor(project.difficulty)}>
                          {project.difficulty}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-3">{project.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="flex items-center text-muted-foreground">
                          <Clock className="w-4 h-4 mr-1" />
                          {project.estimatedTime}
                        </span>
                        <span className="flex items-center text-muted-foreground">
                          <Code className="w-4 h-4 mr-1" />
                          Hands-on Project
                        </span>
                      </div>
                    </div>
                    
                    <Button variant="outline" onClick={() => onProjectClick?.(project.title)}>
                      <Briefcase className="w-4 h-4 mr-2" />
                      Start Project
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            {section.lessons.flatMap(lesson => lesson.resources).map((resource, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getResourceIcon(resource.type)}
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2">{resource.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                        <Badge variant="outline" className="text-xs">
                          {resource.type.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" asChild>
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        {resource.type === 'pdf' ? (
                          <Download className="w-4 h-4 mr-2" />
                        ) : (
                          <ExternalLink className="w-4 h-4 mr-2" />
                        )}
                        {resource.type === 'pdf' ? 'Download' : 'Open'}
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CurriculumSectionView;
