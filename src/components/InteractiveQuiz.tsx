import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Trophy, 
  Zap,
  Brain,
  RotateCcw,
  ArrowRight,
  Lightbulb
} from "lucide-react";
import { useProgress } from "@/hooks/use-progress";
import { useNotifications } from "@/hooks/use-notifications";
import { useToast } from "@/hooks/use-toast";

export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation?: string;
  hint?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  passingScore: number; // percentage
  xpReward: number;
  timeLimit?: number; // seconds
}

interface InteractiveQuizProps {
  quiz: Quiz;
  onComplete?: (score: number, passed: boolean) => void;
  showResults?: boolean;
}

const InteractiveQuiz = ({ quiz, onComplete, showResults = true }: InteractiveQuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit || 0);
  const [showHint, setShowHint] = useState(false);
  
  const { progress, completeQuiz } = useProgress();
  const { showProgressNotification, checkAchievements } = useNotifications();
  const { toast } = useToast();

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const progress_percentage = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  const isQuizCompleted = progress.completedQuizzes.includes(quiz.id);

  // Timer effect
  useEffect(() => {
    if (!quiz.timeLimit || quizCompleted || showAnswer) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quiz.timeLimit, quizCompleted, showAnswer, currentQuestionIndex]);

  const handleTimeUp = () => {
    toast({
      title: "⏰ Time's up!",
      description: "Moving to the next question...",
      variant: "destructive",
    });
    handleNextQuestion();
  };

  const handleAnswerSelect = (answerId: string) => {
    if (showAnswer) return;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answerId
    }));
  };

  const handleSubmitAnswer = () => {
    const selectedAnswer = selectedAnswers[currentQuestion.id];
    if (!selectedAnswer) {
      toast({
        title: "Please select an answer",
        description: "Choose one of the options before continuing.",
        variant: "destructive",
      });
      return;
    }

    setShowAnswer(true);
    setShowHint(false);
    
    // Check if answer is correct
    const isCorrect = currentQuestion.options.find(opt => opt.id === selectedAnswer)?.isCorrect;
    
    if (isCorrect) {
      toast({
        title: "🎉 Correct!",
        description: "Great job! You got it right.",
      });
    } else {
      toast({
        title: "❌ Incorrect",
        description: "Don't worry, keep learning!",
        variant: "destructive",
      });
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      handleQuizComplete();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowAnswer(false);
      setShowHint(false);
      if (quiz.timeLimit) {
        setTimeRemaining(quiz.timeLimit);
      }
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    
    quiz.questions.forEach(question => {
      const selectedAnswer = selectedAnswers[question.id];
      const isCorrect = question.options.find(opt => opt.id === selectedAnswer)?.isCorrect;
      if (isCorrect) correctAnswers++;
    });
    
    return Math.round((correctAnswers / quiz.questions.length) * 100);
  };

  const handleQuizComplete = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setQuizCompleted(true);
    
    const passed = finalScore >= quiz.passingScore;
    
    if (!isQuizCompleted) {
      const result = completeQuiz(quiz.id, finalScore, quiz.xpReward);
      if (result) {
        showProgressNotification({
          quizComplete: {
            score: finalScore,
            perfect: finalScore === 100
          },
          xpGained: result.xpGained,
          ...(result.leveledUp && {
            levelUp: {
              newLevel: result.newLevel,
              previousLevel: result.newLevel - 1
            }
          })
        });

        checkAchievements(progress, 'quiz', { score: finalScore });
      }
    }

    if (onComplete) {
      onComplete(finalScore, passed);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowAnswer(false);
    setQuizCompleted(false);
    setScore(0);
    setShowHint(false);
    if (quiz.timeLimit) {
      setTimeRemaining(quiz.timeLimit);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getAnswerStatus = (option: QuizQuestion['options'][0]) => {
    const selectedAnswer = selectedAnswers[currentQuestion.id];
    const isSelected = selectedAnswer === option.id;
    
    if (!showAnswer) {
      return isSelected ? 'selected' : 'default';
    }
    
    if (option.isCorrect) {
      return 'correct';
    }
    
    if (isSelected && !option.isCorrect) {
      return 'incorrect';
    }
    
    return 'default';
  };

  if (quizCompleted && showResults) {
    const passed = score >= quiz.passingScore;
    
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            {passed ? (
              <Trophy className="w-16 h-16 text-python-yellow mx-auto mb-4" />
            ) : (
              <Brain className="w-16 h-16 text-python-blue mx-auto mb-4" />
            )}
          </div>
          
          <h2 className="text-3xl font-bold mb-4">
            {passed ? "Quiz Passed! 🎉" : "Keep Learning! 📚"}
          </h2>
          
          <div className="mb-6">
            <div className="text-4xl font-bold mb-2">{score}%</div>
            <div className="text-muted-foreground">
              {quiz.questions.filter(q => {
                const selectedAnswer = selectedAnswers[q.id];
                return q.options.find(opt => opt.id === selectedAnswer)?.isCorrect;
              }).length} out of {quiz.questions.length} correct
            </div>
          </div>

          {passed && !isQuizCompleted && (
            <div className="flex justify-center items-center space-x-4 mb-6 text-sm">
              <Badge className="bg-primary/20 text-primary border-primary/30">
                <Zap className="w-3 h-3 mr-1" />
                +{quiz.xpReward} XP
              </Badge>
              {score === 100 && (
                <Badge className="bg-python-yellow/20 text-python-yellow border-python-yellow/30">
                  Perfect Score!
                </Badge>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" onClick={resetQuiz}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            {passed && (
              <Button variant="success">
                <ArrowRight className="w-4 h-4 mr-2" />
                Continue Learning
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2 text-primary" />
            {quiz.title}
          </CardTitle>
          <div className="flex items-center space-x-2">
            {quiz.timeLimit && timeRemaining > 0 && (
              <Badge variant="outline" className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{formatTime(timeRemaining)}</span>
              </Badge>
            )}
            <Badge className="bg-primary/10 text-primary border-primary/20">
              <Zap className="w-3 h-3 mr-1" />
              {quiz.xpReward} XP
            </Badge>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
            <span>{Math.round(progress_percentage)}% Complete</span>
          </div>
          <Progress value={progress_percentage} className="h-2" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{currentQuestion.question}</h3>
            <Badge className={
              currentQuestion.difficulty === 'easy' ? 'bg-terminal-green/20 text-terminal-green' :
              currentQuestion.difficulty === 'medium' ? 'bg-python-yellow/20 text-python-yellow' :
              'bg-destructive/20 text-destructive'
            }>
              {currentQuestion.difficulty}
            </Badge>
          </div>

          <RadioGroup 
            value={selectedAnswers[currentQuestion.id] || ""} 
            onValueChange={handleAnswerSelect}
            className="space-y-3"
            disabled={showAnswer}
          >
            {currentQuestion.options.map((option) => {
              const status = getAnswerStatus(option);
              
              return (
                <div 
                  key={option.id} 
                  className={`flex items-start space-x-3 p-4 rounded-lg border transition-all duration-200 ${
                    status === 'correct' ? 'border-terminal-green bg-terminal-green/10' :
                    status === 'incorrect' ? 'border-destructive bg-destructive/10' :
                    status === 'selected' ? 'border-primary bg-primary/5' :
                    'border-border hover:border-primary/50'
                  }`}
                >
                  <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                  <Label 
                    htmlFor={option.id} 
                    className="flex-1 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span>{option.text}</span>
                      {showAnswer && (
                        <div className="ml-2">
                          {option.isCorrect ? (
                            <CheckCircle className="w-4 h-4 text-terminal-green" />
                          ) : selectedAnswers[currentQuestion.id] === option.id ? (
                            <XCircle className="w-4 h-4 text-destructive" />
                          ) : null}
                        </div>
                      )}
                    </div>
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>

        {/* Explanation */}
        {showAnswer && currentQuestion.explanation && (
          <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
            <h4 className="font-semibold mb-2 text-accent">Explanation:</h4>
            <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
          </div>
        )}

        {/* Hint */}
        {currentQuestion.hint && (
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHint(!showHint)}
              disabled={showAnswer}
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              {showHint ? "Hide Hint" : "Show Hint"}
            </Button>
            
            {showHint && (
              <div className="bg-python-yellow/10 border border-python-yellow/20 p-3 rounded-lg">
                <p className="text-sm text-python-yellow">
                  💡 <strong>Hint:</strong> {currentQuestion.hint}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          {!showAnswer ? (
            <Button onClick={handleSubmitAnswer} variant="hero">
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleNextQuestion} variant="hero">
              {isLastQuestion ? "Complete Quiz" : "Next Question"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveQuiz;
