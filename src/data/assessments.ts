export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  questions: AssessmentQuestion[];
  timeLimit: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const assessments: Assessment[] = [
  {
    id: 'python-basics',
    title: 'Python 基础测试',
    description: '测试你的 Python 基础语法和编程能力',
    timeLimit: 600,
    difficulty: 'beginner',
    questions: [
      {
        id: 'q1',
        question: 'Python 中用于定义变量的正确方式是？',
        options: ['var x = 5', 'x = 5', 'int x = 5', 'let x = 5'],
        correctAnswer: 'x = 5',
        explanation: 'Python 是动态类型语言，不需要声明变量类型，直接赋值即可。'
      },
      {
        id: 'q2',
        question: '以下哪个不是 Python 的数据类型？',
        options: ['list', 'tuple', 'array', 'dict'],
        correctAnswer: 'array',
        explanation: 'Python 中没有 array 类型，类似的是 list。'
      },
      {
        id: 'q3',
        question: 'print("Hello, World!") 的输出是什么？',
        options: ['Hello, World!', '"Hello, World!"', '报错', '没有输出'],
        correctAnswer: 'Hello, World!',
        explanation: 'print() 函数会输出括号内的内容，不带引号。'
      }
    ]
  },
  {
    id: 'data-analysis',
    title: '数据分析测试',
    description: '测试你的数据分析基础知识和 Pandas 库使用',
    timeLimit: 900,
    difficulty: 'intermediate',
    questions: [
      {
        id: 'q1',
        question: 'Pandas 中用于读取 CSV 文件的函数是？',
        options: ['read_csv()', 'load_csv()', 'open_csv()', 'import_csv()'],
        correctAnswer: 'read_csv()',
        explanation: 'Pandas 使用 read_csv() 函数读取 CSV 文件。'
      },
      {
        id: 'q2',
        question: 'Pandas 中用于选择数据的主要数据结构是？',
        options: ['Array', 'List', 'DataFrame', 'Matrix'],
        correctAnswer: 'DataFrame',
        explanation: 'DataFrame 是 Pandas 中最常用的数据结构，类似于 Excel 表格。'
      },
      {
        id: 'q3',
        question: '以下哪个是 NumPy 的正确导入方式？',
        options: ['import numpy', 'import numpy as np', 'from numpy import *', '以上都是'],
        correctAnswer: '以上都是',
        explanation: '这三种方式都是正确的，但通常建议使用 import numpy as np。'
      }
    ]
  },
  {
    id: 'business-intelligence',
    title: '商业智能测试',
    description: '测试你对商业智能和数据分析在商业中的应用',
    timeLimit: 1200,
    difficulty: 'advanced',
    questions: [
      {
        id: 'q1',
        question: 'KPI 的全称是什么？',
        options: ['Key Performance Index', 'Key Performance Indicator', 'Knowledge Performance Indicator', 'Key Process Indicator'],
        correctAnswer: 'Key Performance Indicator',
        explanation: 'KPI (Key Performance Indicator) 是关键绩效指标，用于衡量组织或项目的表现。'
      },
      {
        id: 'q2',
        question: '以下哪个不是数据可视化工具？',
        options: ['Tableau', 'Power BI', 'Matplotlib', 'MySQL'],
        correctAnswer: 'MySQL',
        explanation: 'MySQL 是关系型数据库，不是可视化工具。'
      },
      {
        id: 'q3',
        question: '在数据分析中，"EDA" 指的是什么？',
        options: ['Exploratory Data Analysis', 'Essential Data Analysis', 'Experimental Data Analysis', 'Extensive Data Analysis'],
        correctAnswer: 'Exploratory Data Analysis',
        explanation: 'EDA (Exploratory Data Analysis) 是探索性数据分析，用于发现数据中的模式和趋势。'
      }
    ]
  }
];
