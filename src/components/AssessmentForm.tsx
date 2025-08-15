import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, Brain, Target, Clock } from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: { value: string; label: string; description?: string }[];
}

const questions: Question[] = [
  {
    id: "experience",
    question: "What's your current programming experience?",
    options: [
      { value: "beginner", label: "Complete Beginner", description: "Never coded before" },
      { value: "some", label: "Some Experience", description: "Know basic concepts" },
      { value: "intermediate", label: "Intermediate", description: "Comfortable with one language" },
      { value: "advanced", label: "Advanced", description: "Multiple languages & projects" }
    ]
  },
  {
    id: "python",
    question: "How familiar are you with Python specifically?",
    options: [
      { value: "none", label: "Never used Python" },
      { value: "basic", label: "Basic syntax & variables" },
      { value: "functions", label: "Functions & classes" },
      { value: "advanced", label: "Libraries & frameworks" }
    ]
  },
  {
    id: "goals",
    question: "What's your main learning goal?",
    options: [
      { value: "web", label: "Web Development", description: "Build websites & APIs" },
      { value: "data", label: "Data Science", description: "Analytics & machine learning" },
      { value: "automation", label: "Automation", description: "Scripts & task automation" },
      { value: "general", label: "General Programming", description: "Solid foundation in Python" }
    ]
  },
  {
    id: "time",
    question: "How much time can you dedicate per week?",
    options: [
      { value: "casual", label: "2-3 hours", description: "Weekend learner" },
      { value: "regular", label: "5-7 hours", description: "After work/school" },
      { value: "intensive", label: "10+ hours", description: "Focused learning" },
      { value: "bootcamp", label: "20+ hours", description: "Career transition" }
    ]
  }
];

interface AssessmentFormProps {
  onComplete: (answers: Record<string, string>) => void;
}

const AssessmentForm = ({ onComplete }: AssessmentFormProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleNext = () => {
    if (!selectedAnswer) return;

    const newAnswers = { ...answers, [questions[currentQuestion].id]: selectedAnswer };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      onComplete(newAnswers);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl bg-card/80 backdrop-blur-sm border border-border/50 shadow-card">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">
            Personalized Learning Assessment
          </CardTitle>
          <CardDescription className="text-lg">
            Help us create the perfect Python learning path for you
          </CardDescription>
          <div className="mt-4">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground mt-2">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              {currentQuestion === 0 && <Brain className="w-5 h-5 mr-2 text-primary" />}
              {currentQuestion === 1 && <Target className="w-5 h-5 mr-2 text-accent" />}
              {currentQuestion === 2 && <Target className="w-5 h-5 mr-2 text-terminal-green" />}
              {currentQuestion === 3 && <Clock className="w-5 h-5 mr-2 text-code-purple" />}
              {currentQ.question}
            </h3>

            <RadioGroup
              value={selectedAnswer}
              onValueChange={setSelectedAnswer}
              className="space-y-4"
            >
              {currentQ.options.map((option) => (
                <div key={option.value} className="flex items-start space-x-3 p-4 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 cursor-pointer">
                  <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                  <Label 
                    htmlFor={option.value} 
                    className="flex-1 cursor-pointer"
                  >
                    <div className="font-medium">{option.label}</div>
                    {option.description && (
                      <div className="text-sm text-muted-foreground mt-1">
                        {option.description}
                      </div>
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleNext}
              disabled={!selectedAnswer}
              variant="hero"
              className="px-8"
            >
              {isLastQuestion ? "Generate My Roadmap" : "Next Question"}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentForm;