import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Code, 
  Brain, 
  Trophy, 
  ArrowLeft, 
  ArrowRight,
  CheckCircle,
  Play
} from "lucide-react";
import InteractiveCodeEditor from "./InteractiveCodeEditor";
import InteractiveQuiz, { Quiz } from "./InteractiveQuiz";

export interface LessonContent {
  id: string;
  title: string;
  description: string;
  content: string;
  codeExercise?: {
    id: string;
    title: string;
    description: string;
    starterCode: string;
    expectedOutput: string;
    hint?: string;
    xpReward?: number;
    difficulty?: 'easy' | 'medium' | 'hard';
  };
  quiz?: Quiz;
  xpReward: number;
  estimatedTime: string;
  prerequisites?: string[];
}

export interface LessonModule {
  id: string;
  title: string;
  description: string;
  lessons: LessonContent[];
  totalXP: number;
}

interface LessonViewProps {
  module: LessonModule;
  currentLessonIndex: number;
  onLessonComplete?: (lessonId: string) => void;
  onNavigateBack?: () => void;
  onNextLesson?: () => void;
  onPreviousLesson?: () => void;
}

const LessonView = ({
  module,
  currentLessonIndex,
  onLessonComplete,
  onNavigateBack,
  onNextLesson,
  onPreviousLesson
}: LessonViewProps) => {
  const [activeTab, setActiveTab] = useState<'theory' | 'practice' | 'quiz'>('theory');
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [codeCompleted, setCodeCompleted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentLesson = module.lessons[currentLessonIndex];
  const isFirstLesson = currentLessonIndex === 0;
  const isLastLesson = currentLessonIndex === module.lessons.length - 1;
  const progressPercentage = ((currentLessonIndex + 1) / module.lessons.length) * 100;

  const handleCodeComplete = () => {
    setCodeCompleted(true);
    checkLessonCompletion();
  };

  const handleQuizComplete = (score: number, passed: boolean) => {
    if (passed) {
      setQuizCompleted(true);
      checkLessonCompletion();
    }
  };

  const checkLessonCompletion = () => {
    const hasCode = !!currentLesson.codeExercise;
    const hasQuiz = !!currentLesson.quiz;
    
    const codeRequired = !hasCode || codeCompleted;
    const quizRequired = !hasQuiz || quizCompleted;
    
    if (codeRequired && quizRequired && !lessonCompleted) {
      setLessonCompleted(true);
      if (onLessonComplete) {
        onLessonComplete(currentLesson.id);
      }
    }
  };

  const getTabStatus = (tab: 'theory' | 'practice' | 'quiz') => {
    switch (tab) {
      case 'theory':
        return 'available';
      case 'practice':
        return currentLesson.codeExercise ? (codeCompleted ? 'completed' : 'available') : 'unavailable';
      case 'quiz':
        return currentLesson.quiz ? (quizCompleted ? 'completed' : 'available') : 'unavailable';
      default:
        return 'unavailable';
    }
  };

  const renderTabTrigger = (value: string, label: string, icon: React.ReactNode) => {
    const status = getTabStatus(value as any);
    
    return (
      <TabsTrigger 
        value={value} 
        className={`flex items-center space-x-2 ${
          status === 'unavailable' ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={status === 'unavailable'}
      >
        {icon}
        <span>{label}</span>
        {status === 'completed' && (
          <CheckCircle className="w-4 h-4 text-terminal-green ml-1" />
        )}
      </TabsTrigger>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              {onNavigateBack && (
                <Button variant="ghost" size="sm" onClick={onNavigateBack}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Curriculum
                </Button>
              )}
              <div className="h-6 w-px bg-border" />
              <div>
                <h1 className="text-2xl font-bold">{currentLesson.title}</h1>
                <p className="text-sm text-muted-foreground">
                  {module.title} • Lesson {currentLessonIndex + 1} of {module.lessons.length}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                {currentLesson.estimatedTime}
              </Badge>
              <Badge className="bg-accent/10 text-accent border-accent/20">
                {currentLesson.xpReward} XP
              </Badge>
              {lessonCompleted && (
                <Badge className="bg-terminal-green/20 text-terminal-green border-terminal-green/30">
                  <Trophy className="w-3 h-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
          </div>
          
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Module Progress</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            {renderTabTrigger('theory', 'Theory', <BookOpen className="w-4 h-4" />)}
            {renderTabTrigger('practice', 'Practice', <Code className="w-4 h-4" />)}
            {renderTabTrigger('quiz', 'Quiz', <Brain className="w-4 h-4" />)}
          </TabsList>

          <TabsContent value="theory" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-primary" />
                  Lesson Content
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={onPreviousLesson}
                disabled={isFirstLesson}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous Lesson
              </Button>

              <div className="flex space-x-3">
                {currentLesson.codeExercise && (
                  <Button
                    variant="hero"
                    onClick={() => setActiveTab('practice')}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Coding
                  </Button>
                )}
                {currentLesson.quiz && (
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab('quiz')}
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    Take Quiz
                  </Button>
                )}
              </div>

              <Button
                variant="outline"
                onClick={onNextLesson}
                disabled={isLastLesson}
              >
                Next Lesson
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="practice">
            {currentLesson.codeExercise ? (
              <div>
                <InteractiveCodeEditor
                  lesson={currentLesson.codeExercise}
                />
                {codeCompleted && (
                  <Card className="mt-6 bg-gradient-success/10 border-terminal-green/20">
                    <CardContent className="p-6 text-center">
                      <CheckCircle className="w-12 h-12 text-terminal-green mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2">Coding Exercise Complete! 🎉</h3>
                      <p className="text-muted-foreground mb-4">
                        Great job! You've successfully completed the coding portion.
                      </p>
                      {currentLesson.quiz ? (
                        <Button variant="hero" onClick={() => setActiveTab('quiz')}>
                          <Brain className="w-4 h-4 mr-2" />
                          Take the Quiz
                        </Button>
                      ) : (
                        <Button variant="success" onClick={onNextLesson} disabled={isLastLesson}>
                          <ArrowRight className="w-4 h-4 mr-2" />
                          Next Lesson
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Code className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Coding Exercise</h3>
                  <p className="text-muted-foreground">
                    This lesson focuses on theory. Check out the quiz to test your knowledge!
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="quiz">
            {currentLesson.quiz ? (
              <div>
                <InteractiveQuiz
                  quiz={currentLesson.quiz}
                  onComplete={handleQuizComplete}
                />
                {quizCompleted && (
                  <Card className="mt-6 bg-gradient-success/10 border-terminal-green/20">
                    <CardContent className="p-6 text-center">
                      <Trophy className="w-12 h-12 text-python-yellow mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2">Lesson Complete! 🏆</h3>
                      <p className="text-muted-foreground mb-4">
                        Congratulations! You've mastered this lesson.
                      </p>
                      <Button variant="success" onClick={onNextLesson} disabled={isLastLesson}>
                        <ArrowRight className="w-4 h-4 mr-2" />
                        {isLastLesson ? "Complete Module" : "Next Lesson"}
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Brain className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Quiz Available</h3>
                  <p className="text-muted-foreground">
                    This lesson doesn't include a quiz. Practice the coding exercise to master the concepts!
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LessonView;
