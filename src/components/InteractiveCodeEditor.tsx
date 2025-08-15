import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Play, 
  Copy, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  Code, 
  Terminal,
  Lightbulb,
  Zap,
  Trophy,
  Heart,
  Volume2,
  VolumeX,
  Sparkles,
  Brain
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useProgress } from "@/hooks/use-progress";
import { useNotifications } from "@/hooks/use-notifications";
import { useCodeCompletion } from "@/hooks/use-code-completion";
import { useSoundEffects } from "@/hooks/use-sound-effects";
import { useAnimations } from "@/hooks/use-animations";

interface CodeEditorProps {
  lesson?: {
    id: string;
    title: string;
    description: string;
    starterCode: string;
    expectedOutput: string;
    hint?: string;
    xpReward?: number;
    difficulty?: 'easy' | 'medium' | 'hard';
  };
}

const defaultLesson = {
  id: "fundamentals_variables_intro",
  title: "Python Variables and Data Types",
  description: "Learn how to create variables and work with different data types in Python.",
  starterCode: `# Welcome to Python! Let's start with variables

# TODO: Create these variables:
# name = "Your Name"
# age = your age (number)
# height = your height (decimal number)
# is_learning = True
# favorite_language = "Python"

# TODO: Print introduction messages using f-strings
# Example: print(f"Hello! My name is {name}")

# Write your code below:`,
  expectedOutput: `Hello! My name is [Your Name]
I am [Your Age] years old and [Your Height] feet tall
Am I learning Python? True
My favorite language is Python`,
  hint: "Create variables and use f-strings like: print(f\"My favorite language is {favorite_language}\")",
  xpReward: 15,
  difficulty: 'easy' as const
};

const InteractiveCodeEditor = ({ lesson = defaultLesson }: CodeEditorProps) => {
  const [code, setCode] = useState(lesson.starterCode);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [testPassed, setTestPassed] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const [showContextualHints, setShowContextualHints] = useState(true);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const editorCardRef = useRef<HTMLDivElement>(null);
  
  const { toast } = useToast();
  const { progress, completeLesson, toggleFavorite } = useProgress();
  const { showProgressNotification, checkAchievements, showMotivationalMessage } = useNotifications();
  const { 
    suggestions, 
    showSuggestions, 
    getSuggestions, 
    getContextualHints, 
    getErrorSuggestions,
    applySuggestion,
    hideSuggestions 
  } = useCodeCompletion();
  const { 
    playSound, 
    playTypingSound, 
    playCelebration, 
    playFeedbackSound,
    toggle: toggleSound,
    isEnabled: isSoundEnabled 
  } = useSoundEffects();
  const { 
    animateSuccess, 
    animateError, 
    animateAchievement,
    createConfetti,
    createFloatingText,
    createRipple 
  } = useAnimations();

  // Check if lesson is already completed
  useEffect(() => {
    const isCompleted = progress.completedLessons.includes(lesson.id);
    setLessonCompleted(isCompleted);
    if (isCompleted) {
      setTestPassed(true);
    }
  }, [lesson.id, progress.completedLessons]);

  // Handle code changes and suggestions
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    const newCursorPosition = e.target.selectionStart;
    
    setCode(newCode);
    setCursorPosition(newCursorPosition);
    
    // Play typing sound
    playTypingSound();
    
    // Get code completion suggestions
    getSuggestions(newCode, newCursorPosition);
    
    // Reset selected suggestion
    setSelectedSuggestion(0);
  };

  // Handle keyboard shortcuts and navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    playSound('focus');
    
    // Handle suggestion navigation
    if (showSuggestions && suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedSuggestion(prev => (prev + 1) % suggestions.length);
        playSound('click');
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedSuggestion(prev => (prev - 1 + suggestions.length) % suggestions.length);
        playSound('click');
      } else if (e.key === 'Tab' || e.key === 'Enter') {
        e.preventDefault();
        const suggestion = suggestions[selectedSuggestion];
        if (suggestion) {
          const result = applySuggestion(code, cursorPosition, suggestion);
          setCode(result.newText);
          playSound('success');
          
          // Set cursor position after applying suggestion
          setTimeout(() => {
            if (textareaRef.current) {
              textareaRef.current.setSelectionRange(result.newCursorPosition, result.newCursorPosition);
            }
          }, 0);
        }
        hideSuggestions();
      } else if (e.key === 'Escape') {
        hideSuggestions();
      }
    }
    
    // Handle other shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'Enter':
          e.preventDefault();
          runCode();
          break;
        case '/':
          e.preventDefault();
          setShowHint(!showHint);
          break;
        case 'r':
          e.preventDefault();
          resetCode();
          break;
      }
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: any, index: number) => {
    const result = applySuggestion(code, cursorPosition, suggestion);
    setCode(result.newText);
    setSelectedSuggestion(index);
    playSound('success');
    
    // Focus back to textarea and set cursor
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(result.newCursorPosition, result.newCursorPosition);
      }
    }, 0);
    
    hideSuggestions();
  };

  // Simulate code execution (in a real app, this would use a Python interpreter)
  const runCode = async () => {
    setIsRunning(true);
    setOutput("");
    setAttempts(prev => prev + 1);
    
    // Play running sound
    playSound('notification');
    
    // Animate the run button
    if (editorCardRef.current) {
      animateSuccess(editorCardRef.current);
    }
    
    // Simulate processing time with typing effect
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
    
    try {
      // Enhanced Python code simulation
      let simulatedOutput = "";
      
      // Execute the code line by line to simulate Python execution
      const lines = code.split('\n').filter(line => line.trim() !== '' && !line.trim().startsWith('#'));
      const variables: Record<string, any> = {};
      
      for (const line of lines) {
        const trimmedLine = line.trim();
        
        // Variable assignments
        if (trimmedLine.includes(' = ')) {
          const [varName, varValue] = trimmedLine.split(' = ');
          const cleanVarName = varName.trim();
          let cleanVarValue = varValue.trim();
          
          // Handle different data types
          if (cleanVarValue.startsWith('"') && cleanVarValue.endsWith('"')) {
            variables[cleanVarName] = cleanVarValue.slice(1, -1);
          } else if (cleanVarValue.startsWith("'") && cleanVarValue.endsWith("'")) {
            variables[cleanVarName] = cleanVarValue.slice(1, -1);
          } else if (cleanVarValue === 'True') {
            variables[cleanVarName] = true;
          } else if (cleanVarValue === 'False') {
            variables[cleanVarName] = false;
          } else if (!isNaN(Number(cleanVarValue))) {
            variables[cleanVarName] = Number(cleanVarValue);
          } else {
            variables[cleanVarName] = cleanVarValue;
          }
        }
        
        // Print statements
        if (trimmedLine.startsWith('print(')) {
          let printContent = trimmedLine.slice(6, -1); // Remove 'print(' and ')'
          
          // Handle f-strings
          if (printContent.startsWith('f"') || printContent.startsWith("f'")) {
            const quote = printContent[1];
            printContent = printContent.slice(2, -1); // Remove f" or f' and closing quote
            
            // Replace variables in f-string
            let result = printContent;
            for (const [varName, varValue] of Object.entries(variables)) {
              const placeholder = `{${varName}}`;
              if (result.includes(placeholder)) {
                result = result.replace(new RegExp(`\\{${varName}\\}`, 'g'), String(varValue));
              }
            }
            simulatedOutput += result + '\n';
          }
          // Handle regular strings
          else if ((printContent.startsWith('"') && printContent.endsWith('"')) ||
                   (printContent.startsWith("'") && printContent.endsWith("'"))) {
            simulatedOutput += printContent.slice(1, -1) + '\n';
          }
          // Handle variables
          else if (variables[printContent]) {
            simulatedOutput += String(variables[printContent]) + '\n';
          }
          // Handle expressions like print("text", variable)
          else {
            simulatedOutput += printContent + '\n';
          }
        }
      }

      // Remove trailing newline
      simulatedOutput = simulatedOutput.trim();
      
      // Check if the exercise is completed correctly
      const hasCorrectCode = variables.favorite_language === 'Python';
      const hasCorrectOutput = simulatedOutput.includes('My favorite language is Python');

      if (hasCorrectCode && hasCorrectOutput) {
        setOutput(simulatedOutput);
        setTestPassed(true);

        // Play success effects
        playCelebration();
        
        // Show floating XP text
        if (textareaRef.current) {
          createFloatingText(`+${lesson.xpReward || 15} XP`, textareaRef.current, {
            color: '#4ade80',
            fontSize: '18px',
            direction: 'up'
          });
        }

        // Complete lesson if not already completed
        if (!lessonCompleted) {
          const result = completeLesson(lesson.id, lesson.xpReward || 15);
          if (result) {
            setLessonCompleted(true);
            
            // Create confetti effect
            createConfetti();
            
            showProgressNotification({
              lessonComplete: {
                lessonTitle: lesson.title,
                moduleTitle: "Python Fundamentals"
              },
              xpGained: result.xpGained,
              ...(result.leveledUp && {
                levelUp: {
                  newLevel: result.newLevel,
                  previousLevel: result.newLevel - 1
                }
              })
            });

            // Check for achievements
            checkAchievements(progress, 'lesson');

            toast({
              title: "🎉 Lesson Complete!",
              description: `Excellent work! You earned ${result.xpGained} XP!`,
            });

            // Animate achievement if level up
            if (result.leveledUp && editorCardRef.current) {
              animateAchievement(editorCardRef.current);
            }
          }
        } else {
          playFeedbackSound('positive');
          toast({
            title: "✅ Perfect execution!",
            description: "You've already mastered this lesson.",
          });
        }
      } else if (hasCorrectCode && !hasCorrectOutput) {
        // User has the variable but didn't print it correctly
        setOutput(simulatedOutput || "No output generated. Did you include print statements?");
        setTestPassed(false);
        
        playFeedbackSound('neutral');
        
        if (attempts >= 3) {
          showMotivationalMessage(progress);
        }
        
        toast({
          title: "Almost there! 🔥",
          description: "You created the variable, now print it using an f-string!",
          variant: "destructive",
        });
      } else {
        // Show whatever output was generated, or default if none
        setOutput(simulatedOutput || "No output generated. Try adding some print statements!");
        setTestPassed(false);
        
        playFeedbackSound('negative');
        
        // Animate error
        if (textareaRef.current) {
          animateError(textareaRef.current);
        }
        
        if (attempts >= 2) {
          setShowHint(true);
          playSound('hint');
        }
        
        toast({
          title: "Keep trying! 💪",
          description: attempts >= 2 ? "Hint revealed below!" : "Try creating variables and using print statements.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Something went wrong. Check your syntax!'}`);
      setTestPassed(false);
      
      playFeedbackSound('negative');
      if (textareaRef.current) {
        animateError(textareaRef.current);
      }
      
      toast({
        title: "Syntax Error",
        description: "Check your code for any typos!",
        variant: "destructive",
      });
    }
    
    setIsRunning(false);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code copied!",
      description: "Code has been copied to your clipboard.",
    });
  };

  const resetCode = () => {
    setCode(lesson.starterCode);
    setOutput("");
    setTestPassed(null);
    setShowHint(false);
    setAttempts(0);
  };

  const handleFavoriteToggle = () => {
    const result = toggleFavorite(lesson.id);
    if (result) {
      toast({
        title: result.favorited ? "❤️ Added to favorites!" : "💔 Removed from favorites",
        description: result.favorited ? "You can find this lesson in your dashboard" : "Lesson removed from favorites",
      });
    }
  };

  const getDifficultyColor = () => {
    switch (lesson.difficulty) {
      case 'easy': return 'bg-terminal-green/20 text-terminal-green border-terminal-green/30';
      case 'medium': return 'bg-python-yellow/20 text-python-yellow border-python-yellow/30';
      case 'hard': return 'bg-destructive/20 text-destructive border-destructive/30';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  const getDifficultyIcon = () => {
    switch (lesson.difficulty) {
      case 'easy': return '🟢';
      case 'medium': return '🟡';
      case 'hard': return '🔴';
      default: return '⚪';
    }
  };

  const isLessonFavorited = progress.favorites.includes(lesson.id);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lesson Instructions */}
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="flex items-center text-xl">
                <Code className="w-5 h-5 mr-2 text-primary" />
                {lesson.title}
                {lessonCompleted && (
                  <CheckCircle className="w-5 h-5 ml-2 text-terminal-green" />
                )}
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleFavoriteToggle}
                  className={`${isLessonFavorited ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  <Heart className={`w-4 h-4 ${isLessonFavorited ? 'fill-current' : ''}`} />
                </Button>
                <Badge className={getDifficultyColor()}>
                  {getDifficultyIcon()} {lesson.difficulty}
                </Badge>
              </div>
            </div>
            
            {/* Progress indicators */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  <Zap className="w-3 h-3 mr-1" />
                  {lesson.xpReward || 15} XP
                </Badge>
                {attempts > 0 && (
                  <Badge variant="secondary">
                    Attempt {attempts}
                  </Badge>
                )}
              </div>
              {lessonCompleted && (
                <Badge className="bg-terminal-green/20 text-terminal-green border-terminal-green/30">
                  <Trophy className="w-3 h-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              {lesson.description}
            </p>
            
            <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
              <h4 className="font-semibold mb-2 text-accent">Expected Output:</h4>
              <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono">
                {lesson.expectedOutput}
              </pre>
            </div>

            {/* Contextual hints */}
            {showContextualHints && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-python-yellow" />
                    Smart Hints
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowContextualHints(!showContextualHints)}
                  >
                    <Brain className="w-4 h-4" />
                  </Button>
                </div>
                
                {getContextualHints(code).map((hint, index) => (
                  <div key={index} className="bg-python-yellow/10 border border-python-yellow/20 p-3 rounded-lg">
                    <p className="text-sm text-python-yellow">{hint}</p>
                  </div>
                ))}
                
                {getContextualHints(code).length === 0 && (
                  <div className="text-xs text-muted-foreground italic">
                    Your code looks good! Keep typing for smart suggestions.
                  </div>
                )}
              </div>
            )}

            {lesson.hint && (
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowHint(!showHint)}
                  className="w-full"
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  {showHint ? "Hide Hint" : "Show Hint"}
                </Button>
                
                {showHint && (
                  <div className="bg-python-yellow/10 border border-python-yellow/20 p-4 rounded-lg">
                    <p className="text-sm text-python-yellow">
                      💡 <strong>Hint:</strong> {lesson.hint}
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Code Editor */}
        <div className="space-y-4">
          <Card ref={editorCardRef} className="code-editor">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <Terminal className="w-5 h-5 mr-2 text-terminal-green" />
                  Python Editor
                </CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={copyCode}>
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={resetCode}>
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Textarea
                  ref={textareaRef}
                  value={code}
                  onChange={handleCodeChange}
                  onKeyDown={handleKeyDown}
                  onSelect={(e) => setCursorPosition(e.currentTarget.selectionStart)}
                  className="min-h-[300px] font-mono text-sm bg-background/50 border-border/50 pr-20"
                  placeholder="Write your Python code here... (Ctrl+Enter to run, Ctrl+/ for hints)"
                />
                
                {/* Code completion suggestions */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute z-50 mt-1 max-h-48 w-72 overflow-auto rounded-md border border-border bg-popover shadow-lg">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={suggestion.text}
                        className={`cursor-pointer px-3 py-2 text-sm transition-colors ${
                          index === selectedSuggestion
                            ? 'bg-accent text-accent-foreground'
                            : 'hover:bg-accent/50'
                        }`}
                        onClick={() => handleSuggestionClick(suggestion, index)}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{suggestion.icon}</span>
                          <div className="flex-1">
                            <div className="font-medium">{suggestion.text}</div>
                            <div className="text-xs text-muted-foreground">
                              {suggestion.description}
                            </div>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {suggestion.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                    <div className="border-t border-border p-2 text-xs text-muted-foreground">
                      Use ↑↓ to navigate, Tab/Enter to select, Esc to close
                    </div>
                  </div>
                )}

                {/* Sound toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newState = toggleSound();
                    toast({
                      title: newState ? "🔊 Sound enabled" : "🔇 Sound disabled",
                      description: "Sound effects " + (newState ? "on" : "off"),
                    });
                  }}
                  className="absolute top-2 right-2"
                >
                  {isSoundEnabled() ? (
                    <Volume2 className="w-4 h-4" />
                  ) : (
                    <VolumeX className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center space-x-2">
                  {testPassed === true && (
                    <Badge className="bg-terminal-green/20 text-terminal-green border-terminal-green/30">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Test Passed
                    </Badge>
                  )}
                  {testPassed === false && (
                    <Badge className="bg-destructive/20 text-destructive border-destructive/30">
                      <XCircle className="w-3 h-3 mr-1" />
                      Test Failed
                    </Badge>
                  )}
                </div>
                <Button 
                  variant="code" 
                  onClick={(e) => {
                    createRipple(e.currentTarget, e.nativeEvent);
                    runCode();
                  }}
                  disabled={isRunning}
                  className="px-6 relative overflow-hidden"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {isRunning ? "Running..." : "Run Code"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Output Console */}
          <Card className="code-editor">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Terminal className="w-5 h-5 mr-2 text-terminal-green" />
                Output Console
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="min-h-[150px] bg-background/50 border border-border/50 rounded-lg p-4">
                {output ? (
                  <pre className="text-sm text-foreground whitespace-pre-wrap font-mono">
                    {output}
                  </pre>
                ) : (
                  <p className="text-muted-foreground text-sm italic">
                    Click "Run Code" to see the output here...
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Next Steps */}
      {testPassed && (
        <Card className="mt-6 bg-gradient-success/10 border-terminal-green/20">
          <CardContent className="p-6 text-center">
            <Trophy className="w-12 h-12 text-python-yellow mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">
              {lessonCompleted ? "Lesson Mastered! 🎉" : "Excellent Work! ✨"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {lessonCompleted 
                ? "You've already conquered this challenge. Want to practice more or move on?"
                : "You've successfully completed this lesson. Ready for the next challenge?"
              }
            </p>
            
            {/* Progress stats */}
            <div className="flex justify-center items-center space-x-6 mb-6 text-sm">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-primary" />
                <span>+{lesson.xpReward || 15} XP</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-python-yellow" />
                <span>Level {progress.level}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-terminal-green" />
                <span>{progress.completedLessons.length} Lessons</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="success" size="lg">
                Continue to Next Lesson
              </Button>
              <Button variant="outline" size="lg" onClick={resetCode}>
                Practice Again
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Encouragement for struggling learners */}
      {!testPassed && attempts >= 3 && (
        <Card className="mt-6 bg-python-blue/5 border-python-blue/20">
          <CardContent className="p-6 text-center">
            <Lightbulb className="w-10 h-10 text-python-yellow mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">Keep Going! 💪</h3>
            <p className="text-muted-foreground mb-4">
              Learning to code takes practice. Every attempt makes you stronger!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" onClick={() => setShowHint(true)}>
                <Lightbulb className="w-4 h-4 mr-2" />
                Show Hint
              </Button>
              <Button variant="outline" onClick={resetCode}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Start Fresh
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InteractiveCodeEditor;