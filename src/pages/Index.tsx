import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import AssessmentForm from "@/components/AssessmentForm";
import Roadmap from "@/components/Roadmap";
import CurriculumOverview from "@/components/CurriculumOverview";
import CurriculumSectionView from "@/components/CurriculumSectionView";
import InteractiveCodeEditor from "@/components/InteractiveCodeEditor";
import UserDashboard from "@/components/UserDashboard";
import ProjectsView from "@/components/ProjectsView";
import LessonView from "@/components/LessonView";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Code, Map, Users, User, Briefcase, LogOut } from "lucide-react";
import { useProgress } from "@/hooks/use-progress";
import { useNotifications } from "@/hooks/use-notifications";
import { useSoundEffects } from "@/hooks/use-sound-effects";
import { useAnimations } from "@/hooks/use-animations";
import { useAuth } from "@/hooks/use-auth";
import ThemeToggle from "@/components/ThemeToggle";
import { allModules } from "@/data/lessonContent";
import { useToast } from "@/hooks/use-toast";

type ViewState = "home" | "assessment" | "roadmap" | "curriculum" | "curriculum-section" | "demo" | "dashboard" | "projects" | "lessons";

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewState>("home");
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, string> | null>(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [selectedCurriculumSection, setSelectedCurriculumSection] = useState<string>("");
  
  const { progress, completeLesson, updateProgress } = useProgress();
  const { showWelcomeMessage, showProgressNotification, checkAchievements } = useNotifications();
  const { playInteractionSound, playFeedbackSound } = useSoundEffects();
  const { animateEnter, createRipple } = useAnimations();
  const { logout, user } = useAuth();
  const { toast } = useToast();

  // Show welcome message on first load
  useEffect(() => {
    const isFirstTime = progress.completedLessons.length === 0 && !progress.assessmentCompleted;
    showWelcomeMessage(isFirstTime);
  }, []);

  const handleViewChange = (view: ViewState, event?: React.MouseEvent) => {
    // Play interaction sound
    playInteractionSound();
    
    // Create ripple effect if event provided
    if (event && event.currentTarget) {
      createRipple(event.currentTarget as HTMLElement, event.nativeEvent);
    }
    
    setCurrentView(view);
    
    // Track navigation for engagement
    if (view === 'demo' || view === 'curriculum' || view === 'projects') {
      updateProgress({ lastActiveDate: new Date().toISOString() });
    }
  };

  const handleSectionClick = (sectionId: string) => {
    playInteractionSound();
    setSelectedCurriculumSection(sectionId);
    
    if (sectionId === 'assessment') {
      setCurrentView('assessment');
    } else {
      setCurrentView('curriculum-section');
    }
  };

  const handleLessonClick = (lessonId: string) => {
    playInteractionSound();
    // For now, navigate to the demo lesson
    // In a full implementation, this would navigate to the specific lesson
    setCurrentView('lessons');
  };

  const handleLogout = () => {
    playInteractionSound();
    logout();
    toast({
      title: "👋 Goodbye!",
      description: "You've been logged out successfully. See you next time!",
    });
  };

  const handleAssessmentComplete = (answers: Record<string, string>) => {
    setAssessmentAnswers(answers);
    updateProgress({ 
      assessmentCompleted: true, 
      roadmapGenerated: true,
      lastActiveDate: new Date().toISOString() 
    });
    showProgressNotification({
      achievement: {
        id: 'assessment_complete',
        title: 'Assessment Complete!',
        description: 'You\'ve completed your learning assessment',
        icon: '🎯',
        type: 'completion',
        xpGained: 50,
        rarity: 'rare'
      },
      xpGained: 50
    });
    setCurrentView("roadmap");
  };

  const renderNavigation = () => {
    if (currentView === "home") return null;

    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleViewChange("home")}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="h-6 w-px bg-border" />
            <Badge className="bg-primary/10 text-primary border-primary/20">
              CodeCrafter Journey
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={currentView === "dashboard" ? "default" : "ghost"}
              size="sm"
              onClick={(e) => handleViewChange("dashboard", e)}
              className="relative overflow-hidden"
            >
              <User className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button
              variant={currentView === "curriculum" ? "default" : "ghost"}
              size="sm"
              onClick={(e) => handleViewChange("curriculum", e)}
              className="relative overflow-hidden"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Curriculum
            </Button>
            <Button
              variant={currentView === "projects" ? "default" : "ghost"}
              size="sm"
              onClick={(e) => handleViewChange("projects", e)}
              className="relative overflow-hidden"
            >
              <Briefcase className="w-4 h-4 mr-2" />
              Projects
            </Button>
            <Button
              variant={currentView === "demo" ? "default" : "ghost"}
              size="sm"
              onClick={(e) => handleViewChange("demo", e)}
              className="relative overflow-hidden"
            >
              <Code className="w-4 h-4 mr-2" />
              Try Demo
            </Button>
            <div className="h-6 w-px bg-border" />
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-destructive transition-colors"
              title={`Logout (${user?.firstName || 'User'})`}
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </nav>
    );
  };

  const renderContent = () => {
    switch (currentView) {
      case "assessment":
        return <AssessmentForm onComplete={handleAssessmentComplete} />;
      case "roadmap":
        return assessmentAnswers ? <Roadmap answers={assessmentAnswers} /> : null;
      case "curriculum":
        return (
          <div className="pt-20">
            <CurriculumOverview 
              onSectionClick={handleSectionClick}
              onLessonClick={handleLessonClick}
            />
          </div>
        );
      case "curriculum-section":
        return (
          <div className="pt-20">
            <CurriculumSectionView
              sectionId={selectedCurriculumSection}
              onNavigateBack={() => handleViewChange("curriculum")}
              onLessonClick={handleLessonClick}
              onProjectClick={(projectId) => {
                playInteractionSound();
                handleViewChange("projects");
              }}
            />
          </div>
        );
      case "demo":
        return (
          <div className="pt-20">
            <InteractiveCodeEditor />
          </div>
        );
      case "dashboard":
        return (
          <div className="pt-20">
            <UserDashboard onNavigate={handleViewChange} />
          </div>
        );
      case "projects":
        return (
          <div className="pt-20">
            <ProjectsView onNavigateBack={() => handleViewChange("home")} />
          </div>
        );
      case "lessons":
        return (
          <div className="pt-20">
            <LessonView
              module={allModules[0]}
              currentLessonIndex={currentLessonIndex}
              onLessonComplete={(lessonId) => {
                completeLesson(lessonId, 25);
                playFeedbackSound('positive');
              }}
              onNavigateBack={() => handleViewChange("curriculum")}
              onNextLesson={() => setCurrentLessonIndex(prev => prev + 1)}
              onPreviousLesson={() => setCurrentLessonIndex(prev => Math.max(0, prev - 1))}
            />
          </div>
        );
      case "home":
      default:
        return (
          <>
            <Hero user={user} />
            
            {/* Quick Actions */}
            <section className="py-20 px-6 bg-muted/20">
              <div className="container mx-auto max-w-5xl text-center">
                <h2 className="text-3xl font-bold mb-8">Choose Your Path</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card 
                    className="cursor-pointer hover:shadow-card hover:border-primary/30 transition-all duration-300 group"
                    onClick={(e) => handleViewChange("assessment", e)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
                        <Users className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Personalized Assessment</h3>
                      <p className="text-muted-foreground mb-4">
                        Get a custom learning roadmap based on your experience and goals
                      </p>
                      <Button variant="hero" className="w-full">
                        Take Assessment
                      </Button>
                    </CardContent>
                  </Card>

                  <Card 
                    className="cursor-pointer hover:shadow-card hover:border-primary/30 transition-all duration-300 group"
                    onClick={(e) => handleViewChange("curriculum", e)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/30 transition-colors">
                        <BookOpen className="w-8 h-8 text-accent" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Full Curriculum</h3>
                      <p className="text-muted-foreground mb-4">
                        Explore our complete Python learning curriculum from A to Z
                      </p>
                      <Button variant="outline" className="w-full">
                        View Curriculum
                      </Button>
                    </CardContent>
                  </Card>

                  <Card 
                    className="cursor-pointer hover:shadow-card hover:border-primary/30 transition-all duration-300 group"
                    onClick={(e) => handleViewChange("projects", e)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 rounded-full bg-code-purple/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-code-purple/30 transition-colors">
                        <Briefcase className="w-8 h-8 text-code-purple" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Hands-On Projects</h3>
                      <p className="text-muted-foreground mb-4">
                        Build real applications with step-by-step guided projects
                      </p>
                      <Button variant="outline" className="w-full">
                        Start Building
                      </Button>
                    </CardContent>
                  </Card>

                  <Card 
                    className="cursor-pointer hover:shadow-card hover:border-primary/30 transition-all duration-300 group"
                    onClick={(e) => handleViewChange("demo", e)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 rounded-full bg-terminal-green/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-terminal-green/30 transition-colors">
                        <Code className="w-8 h-8 text-terminal-green" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Interactive Demo</h3>
                      <p className="text-muted-foreground mb-4">
                        Try our interactive code editor with a sample Python lesson
                      </p>
                      <Button variant="code" className="w-full">
                        Try Demo
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderNavigation()}
      {renderContent()}
    </div>
  );
};

export default Index;
