
export interface Example {
  id: string;
  code: string;
  explanation: string;
}

export interface Exercise {
  id: string;
  question: string;
  type: 'multiple-choice' | 'coding' | 'short-answer';
  options?: string[];
  answer: string;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  examples: Example[];
  exercises: Exercise[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
  order: number;
}

export const courses: Course[] = [
  {
    id: 'python-basics',
    title: 'Python数据分析基础',
    description: '掌握Python编程语言，学习Pandas、NumPy等核心数据分析库',
    icon: 'code',
    order: 1,
    lessons: [
      {
        id: 'python-intro',
        title: 'Python基础语法',
        content: `
# Python基础语法

## 变量与数据类型

Python是动态类型语言，不需要声明变量类型。

\`\`\`python
# 整数
age = 25

# 浮点数
price = 19.99

# 字符串
name = "数据分析"

# 布尔值
is_student = True
\`\`\`

## 列表和字典

\`\`\`python
# 列表
numbers = [1, 2, 3, 4, 5]

# 字典
student = {
    "name": "张三",
    "age": 20,
    "major": "商务数据分析"
}
\`\`\`

## 控制流程

\`\`\`python
# if-else
if score &gt;= 60:
    print("及格")
else:
    print("不及格")

# for循环
for i in range(5):
    print(i)
\`\`\`
        `,
        examples: [
          {
            id: 'ex1',
            code: 'print("Hello, 数据分析!")',
            explanation: '这是一个简单的打印语句'
          },
          {
            id: 'ex2',
            code: 'numbers = [1, 2, 3, 4, 5]\nsum(numbers)',
            explanation: '计算列表中数字的总和'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: 'Python中用于定义列表的符号是？',
            type: 'multiple-choice',
            options: ['()', '{}', '[]', '&lt;&gt;'],
            answer: '[]',
            explanation: 'Python使用方括号[]来定义列表'
          },
          {
            id: 'ex2',
            question: '打印 "学习Python数据分析"',
            type: 'coding',
            answer: 'print("学习Python数据分析")',
            explanation: '使用print函数输出字符串'
          }
        ]
      },
      {
        id: 'numpy-pandas',
        title: 'NumPy与Pandas入门',
        content: `
# NumPy与Pandas入门

## NumPy数组

\`\`\`python
import numpy as np

# 创建数组
arr = np.array([1, 2, 3, 4, 5])

# 数组运算
arr * 2  # 每个元素乘2
\`\`\`

## Pandas DataFrame

\`\`\`python
import pandas as pd

# 创建DataFrame
data = {
    '姓名': ['张三', '李四', '王五'],
    '销售额': [1000, 2000, 1500]
}
df = pd.DataFrame(data)
\`\`\`
        `,
        examples: [
          {
            id: 'ex1',
            code: 'import pandas as pd\ndf = pd.read_csv("sales.csv")',
            explanation: '读取CSV文件'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: 'Pandas的主要数据结构是？',
            type: 'multiple-choice',
            options: ['Array', 'DataFrame', 'List', 'Object'],
            answer: 'DataFrame',
            explanation: 'DataFrame是Pandas的核心数据结构'
          }
        ]
      }
    ]
  },
  {
    id: 'excel-analysis',
    title: 'Excel数据处理与分析',
    description: '精通Excel函数、数据透视表、高级筛选等商务数据分析技能',
    icon: 'file-spreadsheet',
    order: 2,
    lessons: [
      {
        id: 'excel-functions',
        title: '常用函数详解',
        content: `
# Excel常用函数

## 统计函数

- SUM: 求和
- AVERAGE: 平均值
- COUNT: 计数
- MAX/MIN: 最大/最小值

## 查找函数

- VLOOKUP: 垂直查找
- INDEX+MATCH: 高级查找组合

\`\`\`excel
=VLOOKUP(A2, 数据区域, 列号, FALSE)
\`\`\`
        `,
        examples: [
          {
            id: 'ex1',
            code: '=SUM(A1:A10)',
            explanation: '计算A1到A10的和'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: '计算平均值使用哪个函数？',
            type: 'multiple-choice',
            options: ['SUM', 'AVERAGE', 'COUNT', 'MEAN'],
            answer: 'AVERAGE',
            explanation: 'AVERAGE函数用于计算平均值'
          }
        ]
      }
    ]
  },
  {
    id: 'data-visualization',
    title: '数据可视化',
    description: '学习使用Matplotlib、Seaborn创建专业的商务数据图表',
    icon: 'bar-chart-3',
    order: 3,
    lessons: [
      {
        id: 'matplotlib-basics',
        title: 'Matplotlib基础',
        content: `
# Matplotlib数据可视化

## 基本绘图

\`\`\`python
import matplotlib.pyplot as plt

# 折线图
plt.plot(x, y)
plt.title('销售趋势')
plt.show()
\`\`\`

## 常用图表类型

- 折线图：趋势分析
- 柱状图：对比分析
- 饼图：占比分析
- 散点图：相关性分析
        `,
        examples: [
          {
            id: 'ex1',
            code: 'plt.bar(categories, values)',
            explanation: '创建柱状图'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: '显示数据趋势变化最适合用？',
            type: 'multiple-choice',
            options: ['饼图', '折线图', '散点图', '热力图'],
            answer: '折线图',
            explanation: '折线图最适合展示数据随时间的变化趋势'
          }
        ]
      }
    ]
  },
  {
    id: 'business-statistics',
    title: '商务统计分析',
    description: '掌握描述性统计、推断统计、假设检验等核心统计方法',
    icon: 'calculator',
    order: 4,
    lessons: [
      {
        id: 'descriptive-stats',
        title: '描述性统计',
        content: `
# 描述性统计

## 集中趋势

- 均值（Mean）
- 中位数（Median）
- 众数（Mode）

## 离散程度

- 方差（Variance）
- 标准差（Standard Deviation）
- 四分位数（Quartiles）
        `,
        examples: [
          {
            id: 'ex1',
            code: 'import numpy as np\nnp.mean(data)',
            explanation: '计算均值'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: '不受极端值影响的集中趋势指标是？',
            type: 'multiple-choice',
            options: ['均值', '中位数', '众数', '以上都是'],
            answer: '中位数',
            explanation: '中位数是位置指标，不受极端值影响'
          }
        ]
      }
    ]
  },
  {
    id: 'sql-queries',
    title: 'SQL数据库查询',
    description: '学习SQL语法，掌握从数据库中提取和分析数据的能力',
    icon: 'database',
    order: 5,
    lessons: [
      {
        id: 'sql-basics',
        title: 'SQL基础查询',
        content: `
# SQL基础查询

## SELECT语句

\`\`\`sql
SELECT column1, column2
FROM table_name
WHERE condition;
\`\`\`

## 常用子句

- WHERE: 筛选条件
- GROUP BY: 分组
- ORDER BY: 排序
- LIMIT: 限制结果数量
        `,
        examples: [
          {
            id: 'ex1',
            code: 'SELECT * FROM sales WHERE amount &gt; 1000',
            explanation: '查询销售额大于1000的记录'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: '用于筛选数据的SQL子句是？',
            type: 'multiple-choice',
            options: ['GROUP BY', 'WHERE', 'ORDER BY', 'HAVING'],
            answer: 'WHERE',
            explanation: 'WHERE子句用于筛选符合条件的记录'
          }
        ]
      }
    ]
  },
  {
    id: 'case-studies',
    title: '数据分析实战案例',
    description: '通过真实商业案例，综合应用所学数据分析技能',
    icon: 'briefcase',
    order: 6,
    lessons: [
      {
        id: 'sales-analysis',
        title: '销售数据分析案例',
        content: `
# 销售数据分析案例

## 案例背景

某电商平台需要分析年度销售数据，找出销售规律和优化机会。

## 分析步骤

1. 数据清洗
2. 探索性分析
3. 趋势分析
4. 客户细分
5. 报告撰写
        `,
        examples: [
          {
            id: 'ex1',
            code: '# 销售趋势分析\nsales_by_month = df.groupby("month")["amount"].sum()',
            explanation: '按月份汇总销售额'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: '数据分析的第一步通常是？',
            type: 'multiple-choice',
            options: ['建模', '可视化', '数据清洗', '报告撰写'],
            answer: '数据清洗',
            explanation: '数据清洗是数据分析的基础，确保数据质量'
          }
        ]
      }
    ]
  }
];

export interface Question {
  id: string;
  question: string;
  type: 'multiple-choice' | 'coding' | 'short-answer';
  options?: string[];
  answer: string;
  points: number;
}

export interface Assessment {
  id: string;
  title: string;
  questions: Question[];
  timeLimit?: number;
}

export const assessments: Assessment[] = [
  {
    id: 'final-assessment',
    title: '商务数据分析综合测评',
    timeLimit: 60,
    questions: [
      {
        id: 'q1',
        question: 'Python中Pandas库的主要用途是？',
        type: 'multiple-choice',
        options: ['数据可视化', '数据处理与分析', '机器学习', '网页开发'],
        answer: '数据处理与分析',
        points: 10
      },
      {
        id: 'q2',
        question: 'Excel中VLOOKUP函数的作用是？',
        type: 'short-answer',
        answer: '垂直查找数据',
        points: 10
      },
      {
        id: 'q3',
        question: 'SQL查询中用于排序的子句是？',
        type: 'multiple-choice',
        options: ['WHERE', 'GROUP BY', 'ORDER BY', 'HAVING'],
        answer: 'ORDER BY',
        points: 10
      },
      {
        id: 'q4',
        question: '展示数据占比关系最适合用哪种图表？',
        type: 'multiple-choice',
        options: ['折线图', '柱状图', '饼图', '散点图'],
        answer: '饼图',
        points: 10
      },
      {
        id: 'q5',
        question: '不受极端值影响的集中趋势指标是？',
        type: 'multiple-choice',
        options: ['均值', '中位数', '众数', '方差'],
        answer: '中位数',
        points: 10
      }
    ]
  }
];
