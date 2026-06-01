
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
    name: '初学者',
    description: '完成第一个课程学习',
    icon: 'star',
    condition: 'complete_1_lesson',
    points: 50
  },
  {
    id: 'five-lessons',
    name: '学习者',
    description: '完成5个课程学习',
    icon: 'book-open',
    condition: 'complete_5_lessons',
    points: 100
  },
  {
    id: 'first-course',
    name: '课程达人',
    description: '完成一门完整课程',
    icon: 'award',
    condition: 'complete_1_course',
    points: 150
  },
  {
    id: 'first-exercise',
    name: '练习达人',
    description: '完成第一个练习题',
    icon: 'check-circle',
    condition: 'complete_1_exercise',
    points: 30
  },
  {
    id: 'ten-exercises',
    name: '解题高手',
    description: '完成10道练习题',
    icon: 'target',
    condition: 'complete_10_exercises',
    points: 200
  },
  {
    id: 'first-assessment',
    name: '测评新星',
    description: '完成一次测评',
    icon: 'trophy',
    condition: 'complete_1_assessment',
    points: 100
  },
  {
    id: 'high-score',
    name: '学霸',
    description: '测评得分80分以上',
    icon: 'medal',
    condition: 'assessment_score_80',
    points: 300
  },
  {
    id: 'all-courses',
    name: '数据分析师',
    description: '完成所有课程学习',
    icon: 'crown',
    condition: 'complete_all_courses',
    points: 500
  }
];
