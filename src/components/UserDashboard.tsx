import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Zap, 
  Calendar, 
  Target, 
  BookOpen, 
  Code, 
  Star,
  TrendingUp,
  Award,
  Flame,
  Clock,
  ChevronRight
} from "lucide-react";
import { useProgress } from "@/hooks/use-progress";
import { useNotifications } from "@/hooks/use-notifications";

interface DashboardProps {
  onNavigate: (view: string) => void;
}

const UserDashboard = ({ onNavigate }: DashboardProps) => {
  const { progress, getCompletionPercentage } = useProgress();
  const { recentAchievements } = useNotifications();

  const currentLevelProgress = (progress.xpPoints % 100);
  const nextLevelXP = 100 - currentLevelProgress;
  
  const getMotivationalMessage = () => {
    const messages = [
      "You're making excellent progress! 🚀",
      "Keep up the amazing work! 💪",
      "Your consistency is paying off! ⭐",
      "You're on fire! 🔥",
      "Python mastery awaits! 🐍",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getStreakMessage = () => {
    if (progress.streakDays === 0) return "Start your learning streak today!";
    if (progress.streakDays === 1) return "Great start! Keep it going!";
    if (progress.streakDays < 7) return "Building momentum!";
    if (progress.streakDays < 30) return "Incredible consistency!";
    return "You're a Python legend! 🏆";
  };

  const recentLessons = progress.completedLessons.slice(-3);
  const totalLessonsCompleted = progress.completedLessons.length;
  const totalQuizzesCompleted = progress.completedQuizzes.length;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                Welcome back, Python Developer! 👋
              </h1>
              <p className="text-muted-foreground text-lg mt-2">
                {getMotivationalMessage()}
              </p>
            </div>
            <Badge className="bg-primary/20 text-primary border-primary/30 px-4 py-2 text-lg">
              Level {progress.level}
            </Badge>
          </div>
        </div>

        {/* Top Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total XP</p>
                  <p className="text-2xl font-bold text-primary">{progress.xpPoints}</p>
                </div>
                <Zap className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-terminal-green/10 to-terminal-green/5 border-terminal-green/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Streak</p>
                  <p className="text-2xl font-bold text-terminal-green">{progress.streakDays} days</p>
                </div>
                <Flame className="w-8 h-8 text-terminal-green" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-python-blue/10 to-python-blue/5 border-python-blue/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Lessons</p>
                  <p className="text-2xl font-bold text-python-blue">{totalLessonsCompleted}</p>
                </div>
                <BookOpen className="w-8 h-8 text-python-blue" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-code-purple/10 to-code-purple/5 border-code-purple/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Badges</p>
                  <p className="text-2xl font-bold text-code-purple">{progress.badges.length}</p>
                </div>
                <Award className="w-8 h-8 text-code-purple" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Level Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Level {progress.level} Progress</span>
                    <span className="text-sm text-muted-foreground">{currentLevelProgress}/100 XP</span>
                  </div>
                  <Progress value={currentLevelProgress} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {nextLevelXP} XP until level {progress.level + 1}
                  </p>
                </div>

                {/* Module Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Current Module: Python Fundamentals</span>
                    <span className="text-sm text-muted-foreground">{getCompletionPercentage('fundamentals')}%</span>
                  </div>
                  <Progress value={getCompletionPercentage('fundamentals')} className="h-3" />
                </div>

                {/* Learning Streak */}
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-terminal-green/20 flex items-center justify-center">
                        <Flame className="w-5 h-5 text-terminal-green" />
                      </div>
                      <div>
                        <p className="font-semibold">{progress.streakDays} Day Streak!</p>
                        <p className="text-sm text-muted-foreground">{getStreakMessage()}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => onNavigate('curriculum')}>
                      Continue Learning
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-accent" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentLessons.length > 0 ? (
                  <div className="space-y-3">
                    {recentLessons.map((lessonId, index) => (
                      <div key={lessonId} className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-terminal-green/20 flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-terminal-green" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Lesson {lessonId}</p>
                          <p className="text-sm text-muted-foreground">Completed recently</p>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          +10 XP
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">No recent activity</p>
                    <p className="text-sm text-muted-foreground">Start learning to see your progress here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('demo')}
                >
                  <Code className="w-4 h-4 mr-2" />
                  Practice Coding
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('curriculum')}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse Lessons
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => onNavigate('assessment')}
                >
                  <Target className="w-4 h-4 mr-2" />
                  Take Assessment
                </Button>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-python-yellow" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentAchievements.length > 0 ? (
                  <div className="space-y-3">
                    {recentAchievements.slice(0, 3).map((achievement) => (
                      <div key={achievement.id} className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-python-yellow/10 to-transparent border border-python-yellow/20">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{achievement.title}</p>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        </div>
                        <Badge 
                          className={`text-xs ${
                            achievement.rarity === 'legendary' ? 'bg-python-yellow/20 text-python-yellow' :
                            achievement.rarity === 'epic' ? 'bg-code-purple/20 text-code-purple' :
                            achievement.rarity === 'rare' ? 'bg-python-blue/20 text-python-blue' :
                            'bg-terminal-green/20 text-terminal-green'
                          }`}
                        >
                          {achievement.rarity}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Star className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No achievements yet</p>
                    <p className="text-xs text-muted-foreground">Complete lessons to earn badges!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Learning Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-accent" />
                  Learning Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Lessons</span>
                  <span className="font-medium">{totalLessonsCompleted}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Quizzes Passed</span>
                  <span className="font-medium">{totalQuizzesCompleted}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Current Level</span>
                  <span className="font-medium">Level {progress.level}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Days Learning</span>
                  <span className="font-medium">
                    {Math.ceil((new Date().getTime() - new Date(progress.startDate).getTime()) / (1000 * 60 * 60 * 24))}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
