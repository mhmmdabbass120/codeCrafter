import { useState, useCallback } from 'react';
import { useToast } from './use-toast';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: 'xp' | 'level' | 'streak' | 'badge' | 'completion' | 'first_time';
  xpGained?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface NotificationData {
  achievement?: Achievement;
  xpGained?: number;
  levelUp?: {
    newLevel: number;
    previousLevel: number;
  };
  streakUpdate?: {
    days: number;
    isNewRecord?: boolean;
  };
  lessonComplete?: {
    lessonTitle: string;
    moduleTitle: string;
  };
  quizComplete?: {
    score: number;
    perfect?: boolean;
  };
}

const ACHIEVEMENTS: Record<string, Achievement> = {
  first_lesson: {
    id: 'first_lesson',
    title: 'First Steps!',
    description: 'Completed your first Python lesson',
    icon: '🎯',
    type: 'first_time',
    xpGained: 10,
    rarity: 'common',
  },
  first_quiz: {
    id: 'first_quiz',
    title: 'Quiz Master',
    description: 'Completed your first quiz',
    icon: '🧠',
    type: 'first_time',
    xpGained: 20,
    rarity: 'common',
  },
  perfect_quiz: {
    id: 'perfect_quiz',
    title: 'Perfectionist',
    description: 'Scored 100% on a quiz',
    icon: '💯',
    type: 'completion',
    xpGained: 50,
    rarity: 'rare',
  },
  week_streak: {
    id: 'week_streak',
    title: 'Dedicated Learner',
    description: 'Maintained a 7-day learning streak',
    icon: '🔥',
    type: 'streak',
    xpGained: 100,
    rarity: 'rare',
  },
  month_streak: {
    id: 'month_streak',
    title: 'Python Devotee',
    description: 'Maintained a 30-day learning streak',
    icon: '🏆',
    type: 'streak',
    xpGained: 500,
    rarity: 'epic',
  },
  level_5: {
    id: 'level_5',
    title: 'Rising Star',
    description: 'Reached level 5',
    icon: '⭐',
    type: 'level',
    rarity: 'rare',
  },
  level_10: {
    id: 'level_10',
    title: 'Python Padawan',
    description: 'Reached level 10',
    icon: '🌟',
    type: 'level',
    rarity: 'epic',
  },
  module_complete: {
    id: 'module_complete',
    title: 'Module Master',
    description: 'Completed an entire learning module',
    icon: '📚',
    type: 'completion',
    xpGained: 200,
    rarity: 'rare',
  },
  speed_learner: {
    id: 'speed_learner',
    title: 'Speed Learner',
    description: 'Completed 5 lessons in one day',
    icon: '⚡',
    type: 'completion',
    xpGained: 75,
    rarity: 'rare',
  },
  code_master: {
    id: 'code_master',
    title: 'Code Master',
    description: 'Successfully ran 50 code snippets',
    icon: '💻',
    type: 'completion',
    xpGained: 150,
    rarity: 'epic',
  },
};

export const useNotifications = () => {
  const { toast } = useToast();
  const [recentAchievements, setRecentAchievements] = useState<Achievement[]>([]);

  const showProgressNotification = useCallback((data: NotificationData) => {
    // Level Up Notification
    if (data.levelUp) {
      toast({
        title: `🎉 Level Up!`,
        description: `You've reached level ${data.levelUp.newLevel}! Keep up the great work!`,
        duration: 5000,
      });
    }

    // XP Gained Notification
    if (data.xpGained && !data.levelUp) {
      toast({
        title: `+${data.xpGained} XP`,
        description: 'Experience points earned!',
        duration: 3000,
      });
    }

    // Lesson Complete Notification
    if (data.lessonComplete) {
      toast({
        title: '✅ Lesson Complete!',
        description: `Great job completing "${data.lessonComplete.lessonTitle}"`,
        duration: 4000,
      });
    }

    // Quiz Complete Notification
    if (data.quizComplete) {
      const isPerfect = data.quizComplete.perfect;
      toast({
        title: isPerfect ? '🎯 Perfect Score!' : '📝 Quiz Complete!',
        description: `You scored ${data.quizComplete.score}%${isPerfect ? ' - Outstanding!' : ''}`,
        duration: 4000,
      });
    }

    // Streak Update Notification
    if (data.streakUpdate) {
      const { days, isNewRecord } = data.streakUpdate;
      toast({
        title: `🔥 ${days} Day Streak!`,
        description: isNewRecord ? 'New personal record!' : 'Keep the momentum going!',
        duration: 4000,
      });
    }
  }, [toast]);

  const showAchievementNotification = useCallback((achievementId: string) => {
    const achievement = ACHIEVEMENTS[achievementId];
    if (!achievement) return;

    setRecentAchievements(prev => [achievement, ...prev.slice(0, 4)]);

    const rarityEmoji = {
      common: '🎖️',
      rare: '🏅',
      epic: '🏆',
      legendary: '👑',
    };

    toast({
      title: `${achievement.icon} Achievement Unlocked!`,
      description: `${rarityEmoji[achievement.rarity]} ${achievement.title}: ${achievement.description}${achievement.xpGained ? ` (+${achievement.xpGained} XP)` : ''}`,
      duration: 6000,
    });
  }, [toast]);

  const checkAchievements = useCallback((
    progress: any,
    actionType: 'lesson' | 'quiz' | 'streak',
    actionData?: any
  ) => {
    const achievements: string[] = [];

    if (actionType === 'lesson') {
      // First lesson achievement
      if (progress.completedLessons.length === 1) {
        achievements.push('first_lesson');
      }

      // Speed learner achievement (5 lessons in one day)
      const today = new Date().toDateString();
      const todaysLessons = progress.completedLessons.filter((lessonId: string) => {
        // This is simplified - in real app, you'd track completion timestamps
        return true; // For demo purposes
      });
      if (todaysLessons.length === 5) {
        achievements.push('speed_learner');
      }

      // Code master achievement (50 code runs)
      if (progress.completedLessons.length === 50) {
        achievements.push('code_master');
      }
    }

    if (actionType === 'quiz') {
      // First quiz achievement
      if (progress.completedQuizzes.length === 1) {
        achievements.push('first_quiz');
      }

      // Perfect quiz achievement
      if (actionData?.score === 100) {
        achievements.push('perfect_quiz');
      }
    }

    if (actionType === 'streak') {
      // Week streak achievement
      if (progress.streakDays === 7) {
        achievements.push('week_streak');
      }

      // Month streak achievement
      if (progress.streakDays === 30) {
        achievements.push('month_streak');
      }
    }

    // Level achievements
    if (progress.level === 5 && !progress.badges.includes('level_5')) {
      achievements.push('level_5');
    }
    if (progress.level === 10 && !progress.badges.includes('level_10')) {
      achievements.push('level_10');
    }

    // Show achievement notifications
    achievements.forEach(achievementId => {
      if (!progress.badges.includes(achievementId)) {
        showAchievementNotification(achievementId);
      }
    });

    return achievements;
  }, [showAchievementNotification]);

  const showWelcomeMessage = useCallback((isFirstTime: boolean) => {
    if (isFirstTime) {
      toast({
        title: '🎉 Welcome to CodeCrafter Journey!',
        description: 'Start your Python learning adventure and earn XP, badges, and achievements!',
        duration: 6000,
      });
    } else {
      toast({
        title: '👋 Welcome back!',
        description: 'Ready to continue your Python journey?',
        duration: 4000,
      });
    }
  }, [toast]);

  const showMotivationalMessage = useCallback((progress: any) => {
    const messages = [
      'Keep coding! Every line of code makes you better.',
      'You\'re doing great! Python mastery is within reach.',
      'Consistency is key! Small steps lead to big achievements.',
      'Debug your way to success! Every error is a learning opportunity.',
      'Python is powerful, and so are you!',
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    toast({
      title: '💪 Keep Going!',
      description: randomMessage,
      duration: 4000,
    });
  }, [toast]);

  return {
    showProgressNotification,
    showAchievementNotification,
    checkAchievements,
    showWelcomeMessage,
    showMotivationalMessage,
    recentAchievements,
    achievements: ACHIEVEMENTS,
  };
};
