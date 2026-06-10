
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: string;
  points: number;
}

export const badges: Badge[] = [
  {
    id: 'first-lesson',
    name: 'Beginner',
    description: 'Complete your first lesson',
    icon: 'star',
    condition: 'complete_1_lesson',
    points: 50
  },
  {
    id: 'five-lessons',
    name: 'Learner',
    description: 'Complete 5 lessons',
    icon: 'book-open',
    condition: 'complete_5_lessons',
    points: 100
  },
  {
    id: 'first-course',
    name: 'Course Master',
    description: 'Complete one full course',
    icon: 'award',
    condition: 'complete_1_course',
    points: 150
  },
  {
    id: 'first-exercise',
    name: 'Exercise Starter',
    description: 'Complete your first exercise',
    icon: 'check-circle',
    condition: 'complete_1_exercise',
    points: 30
  },
  {
    id: 'ten-exercises',
    name: 'Problem Solver',
    description: 'Complete 10 exercises',
    icon: 'target',
    condition: 'complete_10_exercises',
    points: 200
  },
  {
    id: 'first-assessment',
    name: 'Assessment Rookie',
    description: 'Complete one assessment',
    icon: 'trophy',
    condition: 'complete_1_assessment',
    points: 100
  },
  {
    id: 'high-score',
    name: 'Top Student',
    description: 'Score 80+ on an assessment',
    icon: 'medal',
    condition: 'assessment_score_80',
    points: 300
  },
  {
    id: 'all-courses',
    name: 'Data Analyst',
    description: 'Complete all courses',
    icon: 'crown',
    condition: 'complete_all_courses',
    points: 500
  }
];
