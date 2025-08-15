import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Code, 
  ExternalLink, 
  Github, 
  Video, 
  FileText,
  Trophy, 
  Clock,
  Zap,
  ChevronRight,
  ArrowLeft,
  Play,
  CheckCircle,
  Target
} from "lucide-react";
import { Project, beginnerProjects, intermediateProjects, advancedProjects } from "@/data/projects";

interface ProjectsViewProps {
  onNavigateBack?: () => void;
}

const ProjectsView = ({ onNavigateBack }: ProjectsViewProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

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
      case 'video': return <Video className="w-4 h-4 text-red-500" />;
      case 'pdf': return <FileText className="w-4 h-4 text-blue-500" />;
      case 'github': return <Github className="w-4 h-4" />;
      case 'documentation': return <BookOpen className="w-4 h-4 text-indigo-500" />;
      default: return <ExternalLink className="w-4 h-4" />;
    }
  };

  const renderProjectCard = (project: Project) => (
    <Card 
      key={project.id}
      className="cursor-pointer hover:shadow-lg hover:border-primary/30 transition-all duration-300 group"
      onClick={() => setSelectedProject(project)}
    >
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {project.title}
          </CardTitle>
          <Badge className={getDifficultyColor(project.difficulty)}>
            {project.difficulty}
          </Badge>
        </div>
        <p className="text-muted-foreground">
          {project.description}
        </p>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Stats */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="flex items-center text-muted-foreground">
                <Clock className="w-4 h-4 mr-1" />
                {project.estimatedTime}
              </span>
              <span className="flex items-center text-muted-foreground">
                <Zap className="w-4 h-4 mr-1" />
                {project.xpReward} XP
              </span>
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="text-sm font-medium mb-2">Technologies:</h4>
            <div className="flex flex-wrap gap-1">
              {project.technologies.slice(0, 4).map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 4 && (
                <Badge variant="secondary" className="text-xs">
                  +{project.technologies.length - 4} more
                </Badge>
              )}
            </div>
          </div>

          {/* Action */}
          <Button 
            variant="outline" 
            className="w-full group-hover:border-primary/50 group-hover:text-primary transition-colors"
          >
            <Play className="w-4 h-4 mr-2" />
            Start Project
            <ChevronRight className="w-4 h-4 ml-auto" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderProjectDetail = () => {
    if (!selectedProject) return null;

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Button variant="ghost" onClick={() => setSelectedProject(null)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
          <div className="h-6 w-px bg-border" />
          <div>
            <h1 className="text-3xl font-bold">{selectedProject.title}</h1>
            <p className="text-muted-foreground">{selectedProject.description}</p>
          </div>
        </div>

        {/* Project Info */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Difficulty</span>
                <Badge className={getDifficultyColor(selectedProject.difficulty)}>
                  {selectedProject.difficulty}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Time</span>
                <span className="text-sm font-medium">{selectedProject.estimatedTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">XP Reward</span>
                <span className="text-sm font-medium">{selectedProject.xpReward} XP</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Steps</span>
                <span className="text-sm font-medium">{selectedProject.steps.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {selectedProject.learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <Target className="w-4 h-4 mr-2 text-primary mt-0.5 flex-shrink-0" />
                    {objective}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Technologies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Content */}
        <Tabs defaultValue="steps" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="steps">Project Steps</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="code">Final Code</TabsTrigger>
          </TabsList>

          <TabsContent value="steps" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-python-yellow" />
                  Project Steps
                </CardTitle>
                <Progress value={(currentStep / selectedProject.steps.length) * 100} className="w-full" />
                <p className="text-sm text-muted-foreground">
                  Step {currentStep + 1} of {selectedProject.steps.length}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedProject.steps.map((step, index) => (
                  <div 
                    key={step.id}
                    className={`border rounded-lg p-4 transition-all ${
                      index === currentStep ? 'border-primary bg-primary/5' : 'border-border'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold flex items-center">
                        {step.completed ? (
                          <CheckCircle className="w-4 h-4 mr-2 text-terminal-green" />
                        ) : (
                          <div className={`w-4 h-4 mr-2 rounded-full border-2 ${
                            index === currentStep ? 'border-primary bg-primary' : 'border-muted-foreground'
                          }`} />
                        )}
                        {step.title}
                      </h3>
                      <Badge variant="outline">Step {index + 1}</Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-3">{step.description}</p>
                    
                    {step.code && (
                      <div className="bg-muted/30 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                        <pre>{step.code}</pre>
                      </div>
                    )}
                    
                    {step.hint && index === currentStep && (
                      <div className="mt-3 bg-python-yellow/10 border border-python-yellow/20 p-3 rounded-lg">
                        <p className="text-sm text-python-yellow">
                          💡 <strong>Hint:</strong> {step.hint}
                        </p>
                      </div>
                    )}
                    
                    {index === currentStep && (
                      <div className="flex justify-end mt-4">
                        <Button 
                          onClick={() => setCurrentStep(Math.min(currentStep + 1, selectedProject.steps.length - 1))}
                          disabled={index === selectedProject.steps.length - 1}
                        >
                          {index === selectedProject.steps.length - 1 ? 'Complete' : 'Next Step'}
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            <div className="grid gap-4">
              {selectedProject.resources.map((resource, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {getResourceIcon(resource.type)}
                        <div className="flex-1">
                          <h4 className="font-semibold">{resource.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {resource.description}
                          </p>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {resource.type}
                            </Badge>
                            {resource.duration && (
                              <Badge variant="secondary" className="text-xs">
                                {resource.duration}
                              </Badge>
                            )}
                            {resource.difficulty && (
                              <Badge className={getDifficultyColor(resource.difficulty) + " text-xs"}>
                                {resource.difficulty}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="code">
            {selectedProject.finalCode ? (
              <Card>
                <CardHeader>
                  <CardTitle>Complete Solution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/30 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre>{selectedProject.finalCode}</pre>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Code className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Final Code Available</h3>
                  <p className="text-muted-foreground">
                    Complete the project steps to see the final solution!
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  if (selectedProject) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="container mx-auto max-w-6xl">
          {renderProjectDetail()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          {onNavigateBack && (
            <div className="flex items-center mb-6">
              <Button variant="ghost" onClick={onNavigateBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>
          )}
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Hands-On Projects
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Build real applications and strengthen your Python skills with guided projects. 
            Each project includes step-by-step instructions, resources, and complete solutions.
          </p>
        </div>

        {/* Project Categories */}
        <Tabs defaultValue="beginner" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="beginner">Beginner ({beginnerProjects.length})</TabsTrigger>
            <TabsTrigger value="intermediate">Intermediate ({intermediateProjects.length})</TabsTrigger>
            <TabsTrigger value="advanced">Advanced ({advancedProjects.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="beginner">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {beginnerProjects.map(renderProjectCard)}
            </div>
          </TabsContent>

          <TabsContent value="intermediate">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {intermediateProjects.map(renderProjectCard)}
            </div>
          </TabsContent>

          <TabsContent value="advanced">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advancedProjects.map(renderProjectCard)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProjectsView;
