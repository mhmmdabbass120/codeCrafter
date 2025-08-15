import { useState, useEffect, useCallback } from 'react';

export interface UserProgress {
  currentModule: string;
  completedLessons: string[];
  completedQuizzes: string[];
  assessmentCompleted: boolean;
  roadmapGenerated: boolean;
  xpPoints: number;
  level: number;
  badges: string[];
  streakDays: number;
  lastActiveDate: string;
  startDate: string;
  totalTimeSpent: number; // in minutes
  favorites: string[];
  notes: Record<string, string>;
}

const DEFAULT_PROGRESS: UserProgress = {
  currentModule: 'fundamentals',
  completedLessons: [],
  completedQuizzes: [],
  assessmentCompleted: false,
  roadmapGenerated: false,
  xpPoints: 0,
  level: 1,
  badges: [],
  streakDays: 0,
  lastActiveDate: '',
  startDate: new Date().toISOString(),
  totalTimeSpent: 0,
  favorites: [],
  notes: {},
};

const STORAGE_KEY = 'python-learning-progress';

export const useProgress = () => {
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);
  const [isLoading, setIsLoading] = useState(true);

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedProgress = JSON.parse(stored) as UserProgress;
        setProgress(parsedProgress);
        
        // Update streak if applicable
        const today = new Date().toDateString();
        const lastActive = new Date(parsedProgress.lastActiveDate).toDateString();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastActive === today) {
          // Same day, no change
        } else if (lastActive === yesterday.toDateString()) {
          // Continuing streak
          const updatedProgress = {
            ...parsedProgress,
            streakDays: parsedProgress.streakDays + 1,
            lastActiveDate: new Date().toISOString(),
          };
          setProgress(updatedProgress);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProgress));
        } else if (parsedProgress.lastActiveDate) {
          // Streak broken
          const updatedProgress = {
            ...parsedProgress,
            streakDays: 1,
            lastActiveDate: new Date().toISOString(),
          };
          setProgress(updatedProgress);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProgress));
        } else {
          // First time
          const updatedProgress = {
            ...parsedProgress,
            streakDays: 1,
            lastActiveDate: new Date().toISOString(),
          };
          setProgress(updatedProgress);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProgress));
        }
      } else {
        // First time user
        const initialProgress = {
          ...DEFAULT_PROGRESS,
          streakDays: 1,
          lastActiveDate: new Date().toISOString(),
        };
        setProgress(initialProgress);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProgress));
      }
    } catch (error) {
      console.error('Error loading progress:', error);
      setProgress(DEFAULT_PROGRESS);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save progress to localStorage whenever it changes
  const saveProgress = useCallback((newProgress: UserProgress) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
      setProgress(newProgress);
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }, []);

  const updateProgress = useCallback((updates: Partial<UserProgress>) => {
    const newProgress = { ...progress, ...updates };
    saveProgress(newProgress);
  }, [progress, saveProgress]);

  const completeLesson = useCallback((lessonId: string, xpGained: number = 10) => {
    if (progress.completedLessons.includes(lessonId)) return;

    const newXP = progress.xpPoints + xpGained;
    const newLevel = Math.floor(newXP / 100) + 1;
    const leveledUp = newLevel > progress.level;

    const newProgress = {
      ...progress,
      completedLessons: [...progress.completedLessons, lessonId],
      xpPoints: newXP,
      level: newLevel,
      lastActiveDate: new Date().toISOString(),
    };

    saveProgress(newProgress);
    
    // Return achievement info for notifications
    return {
      xpGained,
      leveledUp,
      newLevel,
      totalXP: newXP,
    };
  }, [progress, saveProgress]);

  const completeQuiz = useCallback((quizId: string, score: number, xpGained: number = 20) => {
    if (progress.completedQuizzes.includes(quizId)) return;

    const newXP = progress.xpPoints + xpGained;
    const newLevel = Math.floor(newXP / 100) + 1;
    const leveledUp = newLevel > progress.level;

    const newProgress = {
      ...progress,
      completedQuizzes: [...progress.completedQuizzes, quizId],
      xpPoints: newXP,
      level: newLevel,
      lastActiveDate: new Date().toISOString(),
    };

    saveProgress(newProgress);
    
    return {
      xpGained,
      leveledUp,
      newLevel,
      totalXP: newXP,
      score,
    };
  }, [progress, saveProgress]);

  const addBadge = useCallback((badgeId: string) => {
    if (progress.badges.includes(badgeId)) return;

    const newProgress = {
      ...progress,
      badges: [...progress.badges, badgeId],
      lastActiveDate: new Date().toISOString(),
    };

    saveProgress(newProgress);
    return { newBadge: badgeId };
  }, [progress, saveProgress]);

  const addNote = useCallback((lessonId: string, note: string) => {
    const newProgress = {
      ...progress,
      notes: { ...progress.notes, [lessonId]: note },
      lastActiveDate: new Date().toISOString(),
    };

    saveProgress(newProgress);
  }, [progress, saveProgress]);

  const toggleFavorite = useCallback((lessonId: string) => {
    const isFavorited = progress.favorites.includes(lessonId);
    const newFavorites = isFavorited
      ? progress.favorites.filter(id => id !== lessonId)
      : [...progress.favorites, lessonId];

    const newProgress = {
      ...progress,
      favorites: newFavorites,
      lastActiveDate: new Date().toISOString(),
    };

    saveProgress(newProgress);
    return { favorited: !isFavorited };
  }, [progress, saveProgress]);

  const resetProgress = useCallback(() => {
    const freshProgress = {
      ...DEFAULT_PROGRESS,
      streakDays: 1,
      lastActiveDate: new Date().toISOString(),
      startDate: new Date().toISOString(),
    };
    saveProgress(freshProgress);
  }, [saveProgress]);

  const getCompletionPercentage = useCallback((moduleId: string) => {
    // This would be calculated based on actual lesson structure
    // For now, returning a simple calculation
    const totalLessons = 15; // This would come from curriculum data
    const completedInModule = progress.completedLessons.filter(id => 
      id.startsWith(moduleId)
    ).length;
    return Math.round((completedInModule / totalLessons) * 100);
  }, [progress.completedLessons]);

  return {
    progress,
    isLoading,
    updateProgress,
    completeLesson,
    completeQuiz,
    addBadge,
    addNote,
    toggleFavorite,
    resetProgress,
    getCompletionPercentage,
  };
};
