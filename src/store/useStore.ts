import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserProgress {
  [courseId: string]: {
    completedLessons: string[];
    completedExercises: string[];
    score: number;
    completed: boolean;
  };
}

interface UserBadges {
  [badgeId: string]: {
    unlocked: boolean;
    unlockedAt: number;
  };
}

interface Example {
  id: string;
  code: string;
  explanation: string;
}

interface Exercise {
  id: string;
  question: string;
  type: 'multiple-choice' | 'coding' | 'short-answer';
  options?: string[];
  answer: string;
  explanation: string;
}

interface CourseContent {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  lessons: {
    id: string;
    title: string;
    content: string;
    examples: Example[];
    exercises: Exercise[];
  }[];
}

interface AssessmentResult {
  assessmentId: string;
  score: number;
  completedAt: number;
}

interface Store {
  userProgress: UserProgress;
  userBadges: UserBadges;
  totalPoints: number;
  assessmentResults: AssessmentResult[];
  completedLessons: number;
  completedExercises: number;
  completedCourses: number;
  customCourseContent: Record<string, CourseContent>;
  completeLesson: (courseId: string, lessonId: string) => void;
  completeExercise: (exerciseId: string) => void;
  completeAssessment: (assessmentId: string, score: number) => void;
  unlockBadge: (badgeId: string) => void;
  checkBadges: () => string[];
  resetProgress: () => void;
  setCourseContent: (courseId: string, content: CourseContent) => void;
  getCourseContent: (courseId: string) => CourseContent | null;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      userProgress: {},
      userBadges: {},
      totalPoints: 0,
      assessmentResults: [],
      completedLessons: 0,
      completedExercises: 0,
      completedCourses: 0,
      customCourseContent: {},
      
      completeLesson: (courseId: string, lessonId: string) => {
        set((state) => {
          const currentProgress = state.userProgress[courseId] || {
            completedLessons: [],
            completedExercises: [],
            score: 0,
            completed: false
          };
          
          if (currentProgress.completedLessons.includes(lessonId)) {
            return state;
          }
          
          const newCompletedLessons = [...currentProgress.completedLessons, lessonId];
          
          return {
            userProgress: {
              ...state.userProgress,
              [courseId]: {
                ...currentProgress,
                completedLessons: newCompletedLessons,
                score: currentProgress.score + 20
              }
            },
            totalPoints: state.totalPoints + 20,
            completedLessons: state.completedLessons + 1
          };
        });
      },
      
      completeExercise: (exerciseId: string) => {
        set((state) => ({
          totalPoints: state.totalPoints + 10,
          completedExercises: state.completedExercises + 1
        }));
      },
      
      completeAssessment: (assessmentId: string, score: number) => {
        set((state) => ({
          totalPoints: state.totalPoints + score,
          assessmentResults: [
            ...state.assessmentResults,
            { assessmentId, score, completedAt: Date.now() }
          ]
        }));
      },
      
      unlockBadge: (badgeId: string) => {
        set((state) => ({
          userBadges: {
            ...state.userBadges,
            [badgeId]: {
              unlocked: true,
              unlockedAt: Date.now()
            }
          }
        }));
      },
      
      checkBadges: () => {
        const state = get();
        const newBadges: string[] = [];
        
        if (state.completedLessons >= 1 && !state.userBadges['first-lesson']?.unlocked) {
          newBadges.push('first-lesson');
        }
        
        if (state.completedLessons >= 5 && !state.userBadges['five-lessons']?.unlocked) {
          newBadges.push('five-lessons');
        }
        
        if (state.completedExercises >= 1 && !state.userBadges['first-exercise']?.unlocked) {
          newBadges.push('first-exercise');
        }
        
        if (state.completedExercises >= 10 && !state.userBadges['ten-exercises']?.unlocked) {
          newBadges.push('ten-exercises');
        }
        
        if (state.assessmentResults.length >= 1 && !state.userBadges['first-assessment']?.unlocked) {
          newBadges.push('first-assessment');
        }
        
        const lastAssessment = state.assessmentResults[state.assessmentResults.length - 1];
        if (lastAssessment && lastAssessment.score >= 80 && !state.userBadges['high-score']?.unlocked) {
          newBadges.push('high-score');
        }
        
        return newBadges;
      },
      
      resetProgress: () => {
        set({
          userProgress: {},
          userBadges: {},
          totalPoints: 0,
          assessmentResults: [],
          completedLessons: 0,
          completedExercises: 0,
          completedCourses: 0,
          customCourseContent: {}
        });
      },
      
      setCourseContent: (courseId: string, content: CourseContent) => {
        set((state) => ({
          customCourseContent: {
            ...state.customCourseContent,
            [courseId]: content
          }
        }));
      },
      
      getCourseContent: (courseId: string) => {
        const state = get();
        return state.customCourseContent[courseId] || null;
      }
    }),
    {
      name: 'data-analysis-learning-storage'
    }
  )
);
