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
if score >= 60:
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
            code: 'numbers = [1, 2, 3, 4, 5]\nprint("列表:", numbers)\nprint("总和:", sum(numbers))\nprint("平均值:", sum(numbers)/len(numbers))',
            explanation: '计算列表中数字的总和和平均值'
          },
          {
            id: 'ex3',
            code: '# 字典操作\nstudent = {"name": "张三", "age": 20, "major": "数据分析"}\nprint("学生信息:", student)\nprint("姓名:", student["name"])\nstudent["score"] = 95\nprint("更新后:", student)',
            explanation: '字典的创建和基本操作'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: 'Python中用于定义列表的符号是？',
            type: 'multiple-choice',
            options: ['()', '{}', '[]', '<>'],
            answer: '[]',
            explanation: 'Python使用方括号[]来定义列表'
          },
          {
            id: 'ex2',
            question: '打印 "学习Python数据分析"',
            type: 'coding',
            answer: 'print("学习Python数据分析")',
            explanation: '使用print函数输出字符串'
          },
          {
            id: 'ex3',
            question: '创建一个包含数字1-10的列表',
            type: 'coding',
            answer: 'numbers = list(range(1, 11))',
            explanation: '使用range()和list()创建数字列表'
          }
        ]
      },
      {
        id: 'python-functions',
        title: '函数与模块',
        content: `
# 函数与模块

## 定义函数

\`\`\`python
def calculate_total(prices):
    """计算总价"""
    return sum(prices)

# 调用函数
total = calculate_total([100, 200, 300])
print(f"总价: {total}")
\`\`\`

## 常用内置函数

- len(): 返回长度
- sorted(): 排序
- max()/min(): 最大/最小值
- round(): 四舍五入

## 模块导入

\`\`\`python
import math

print(math.pi)  # 3.14159...
print(math.sqrt(16))  # 4.0
\`\`\`
        `,
        examples: [
          {
            id: 'ex1',
            code: '# 定义一个计算平均值的函数\ndef calculate_average(numbers):\n    return sum(numbers) / len(numbers)\n\n# 测试\nscores = [85, 90, 78, 92, 88]\nprint("平均值:", calculate_average(scores))',
            explanation: '创建一个计算平均值的函数并调用'
          },
          {
            id: 'ex2',
            code: '# 字符串方法\ntext = "Python数据分析"\nprint("转大写:", text.upper())\nprint("转小写:", text.lower())\nprint("分割:", text.split("分析"))\nprint("长度:", len(text))',
            explanation: '演示常用的字符串方法'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: '哪个函数可以计算列表的平均值？',
            type: 'multiple-choice',
            options: ['sum()', 'len()', '需要自定义函数', 'mean()'],
            answer: '需要自定义函数',
            explanation: 'Python没有内置的平均值函数，需要自定义'
          },
          {
            id: 'ex2',
            question: '创建一个函数，返回两个数的乘积',
            type: 'coding',
            answer: 'def multiply(a, b):\n    return a * b',
            explanation: '定义一个接收两个参数并返回乘积的函数'
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

# 统计运算
print(np.mean(arr))  # 平均值
print(np.sum(arr))   # 总和
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
print(df)
\`\`\`
        `,
        examples: [
          {
            id: 'ex1',
            code: 'import numpy as np\n\n# 创建数组\nsales = np.array([1000, 2000, 1500, 3000, 2500])\nprint("销售额:", sales)\nprint("平均值:", np.mean(sales))\nprint("最大值:", np.max(sales))\nprint("最小值:", np.min(sales))',
            explanation: 'NumPy数组的基本统计运算'
          },
          {
            id: 'ex2',
            code: 'import pandas as pd\n\n# 创建销售数据\nsales_data = {\n    "月份": ["1月", "2月", "3月", "4月"],\n    "销售额": [10000, 15000, 12000, 18000],\n    "成本": [6000, 9000, 7200, 10800]\n}\ndf = pd.DataFrame(sales_data)\ndf["利润"] = df["销售额"] - df["成本"]\nprint(df)',
            explanation: '创建DataFrame并计算新列'
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
          },
          {
            id: 'ex2',
            question: '使用NumPy计算数组 [5, 10, 15, 20] 的总和',
            type: 'coding',
            answer: 'import numpy as np\narr = np.array([5, 10, 15, 20])\nnp.sum(arr)',
            explanation: '导入NumPy并使用sum()函数'
          }
        ]
      },
      {
        id: 'data-cleaning',
        title: '数据清洗基础',
        content: `
# 数据清洗基础

## 缺失值处理

\`\`\`python
import pandas as pd
import numpy as np

# 创建包含缺失值的数据
data = {'姓名': ['张三', '李四', '王五', None],
        '年龄': [25, None, 30, 28],
        '工资': [5000, 6000, None, 5500]}
df = pd.DataFrame(data)

# 检测缺失值
print(df.isnull().sum())

# 删除缺失值
df_clean = df.dropna()

# 填充缺失值
df_filled = df.fillna(0)
\`\`\`

## 数据类型转换

\`\`\`python
# 转换数据类型
df['年龄'] = df['年龄'].astype(int)
df['工资'] = pd.to_numeric(df['工资'])
\`\`\`
        `,
        examples: [
          {
            id: 'ex1',
            code: 'import pandas as pd\nimport numpy as np\n\n# 创建数据\ndata = {"产品": ["A", "B", "C", "D"], "销量": [100, np.nan, 150, 200]}\ndf = pd.DataFrame(data)\nprint("原始数据:")\nprint(df)\nprint("\\n缺失值统计:")\nprint(df.isnull().sum())',
            explanation: '创建包含缺失值的数据并检测'
          },
          {
            id: 'ex2',
            code: 'import pandas as pd\nimport numpy as np\n\n# 处理缺失值\ndata = {"产品": ["A", "B", "C", "D"], "销量": [100, np.nan, 150, 200]}\ndf = pd.DataFrame(data)\n\n# 填充缺失值\ndf["销量"].fillna(df["销量"].mean(), inplace=True)\nprint("填充后的数据:")\nprint(df)',
            explanation: '使用平均值填充缺失值'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: '哪个方法可以检测DataFrame中的缺失值？',
            type: 'multiple-choice',
            options: ['df.isnull()', 'df.empty()', 'df.count()', 'df.find()'],
            answer: 'df.isnull()',
            explanation: 'isnull()方法检测并返回布尔DataFrame'
          },
          {
            id: 'ex2',
            question: '删除包含缺失值的行应该使用哪个方法？',
            type: 'multiple-choice',
            options: ['drop()', 'dropna()', 'remove()', 'delete()'],
            answer: 'dropna()',
            explanation: 'dropna()方法删除包含缺失值的行或列'
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

## 条件函数

- IF: 条件判断
- SUMIF: 条件求和
- COUNTIF: 条件计数

## 数据处理

- TRIM: 去除空格
- CONCATENATE: 合并文本
- LEFT/RIGHT/MID: 文本截取
        `,
        examples: [
          {
            id: 'ex1',
            code: '# Excel函数示例（Python模拟）\ndata = [100, 200, 150, 300]\nprint("求和:", sum(data))\nprint("平均值:", sum(data)/len(data))\nprint("最大值:", max(data))\nprint("最小值:", min(data))',
            explanation: 'Excel中常用统计函数的Python实现'
          },
          {
            id: 'ex2',
            code: '# 条件统计\nsales = [\n    {"产品": "A", "销售额": 1000},\n    {"产品": "B", "销售额": 2000},\n    {"产品": "A", "销售额": 1500},\n    {"产品": "B", "销售额": 1800}\n]\n# 计算产品A的总销售额\ntotal_a = sum(s["销售额"] for s in sales if s["产品"] == "A")\nprint("产品A总销售额:", total_a)',
            explanation: '模拟Excel的SUMIF函数'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: '计算平均值使用哪个Excel函数？',
            type: 'multiple-choice',
            options: ['SUM', 'AVERAGE', 'COUNT', 'MEAN'],
            answer: 'AVERAGE',
            explanation: 'AVERAGE函数用于计算平均值'
          },
          {
            id: 'ex2',
            question: '哪个函数用于垂直查找数据？',
            type: 'multiple-choice',
            options: ['HLOOKUP', 'VLOOKUP', 'LOOKUP', 'FIND'],
            answer: 'VLOOKUP',
            explanation: 'VLOOKUP函数用于在表格中垂直查找数据'
          },
          {
            id: 'ex3',
            question: '计算列表 [50, 100, 150, 200] 的平均值',
            type: 'coding',
            answer: 'data = [50, 100, 150, 200]\navg = sum(data) / len(data)',
            explanation: '使用sum和len计算平均值'
          }
        ]
      },
      {
        id: 'pivot-tables',
        title: '数据透视表',
        content: `
# 数据透视表

## 什么是数据透视表

数据透视表是Excel中最强大的数据分析工具之一，可以快速汇总、分析和展示大量数据。

## 基本操作

1. 选择数据区域
2. 插入数据透视表
3. 选择字段并拖放到行、列、值区域
4. 自定义计算方式

## 常用功能

- 分组汇总
- 筛选过滤
- 排序排列
- 值显示方式（百分比、累计等）
        `,
        examples: [
          {
            id: 'ex1',
            code: '# 数据透视表示例（Python模拟）\nimport pandas as pd\n\ndata = {\n    "部门": ["销售", "技术", "销售", "技术", "销售"],\n    "员工": ["张三", "李四", "王五", "赵六", "孙七"],\n    "销售额": [10000, 0, 15000, 0, 12000],\n    "项目数": [0, 5, 0, 8, 0]\n}\ndf = pd.DataFrame(data)\n\n# 创建透视表\npivot = df.pivot_table(values="销售额", index="部门", aggfunc="sum")\nprint("按部门汇总销售额:")\nprint(pivot)',
            explanation: '使用Pandas创建透视表'
          },
          {
            id: 'ex2',
            code: '# 复杂透视表\npivot_multi = df.pivot_table(\n    values=["销售额", "项目数"],\n    index="部门",\n    aggfunc={"销售额": "sum", "项目数": "count"}\n)\nprint("多指标透视表:")\nprint(pivot_multi)',
            explanation: '创建包含多个指标的透视表'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: '数据透视表主要用于？',
            type: 'multiple-choice',
            options: ['数据存储', '数据汇总分析', '数据录入', '数据打印'],
            answer: '数据汇总分析',
            explanation: '数据透视表是强大的数据分析汇总工具'
          },
          {
            id: 'ex2',
            question: '在Python中，哪个库可以实现Excel透视表功能？',
            type: 'multiple-choice',
            options: ['NumPy', 'Matplotlib', 'Pandas', 'Scikit-learn'],
            answer: 'Pandas',
            explanation: 'Pandas的pivot_table方法可以实现透视表功能'
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
plt.xlabel('月份')
plt.ylabel('销售额')
plt.show()
\`\`\`

## 常用图表类型

- 折线图：趋势分析
- 柱状图：对比分析
- 饼图：占比分析
- 散点图：相关性分析
- 直方图：分布分析
        `,
        examples: [
          {
            id: 'ex1',
            code: 'import matplotlib.pyplot as plt\n\n# 数据\nmonths = ["1月", "2月", "3月", "4月", "5月"]\nsales = [1000, 1500, 1200, 1800, 2000]\n\n# 创建图表\nplt.figure(figsize=(10, 6))\nplt.plot(months, sales, marker="o", linewidth=2)\nplt.title("月度销售趋势", fontsize=16)\nplt.xlabel("月份", fontsize=12)\nplt.ylabel("销售额(万元)", fontsize=12)\nplt.grid(True)\nplt.show()',
            explanation: '创建折线图展示销售趋势'
          },
          {
            id: 'ex2',
            code: 'import matplotlib.pyplot as plt\n\n# 数据\ncategories = ["产品A", "产品B", "产品C", "产品D"]\nvalues = [35, 25, 20, 20]\ncolors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A"]\n\n# 创建饼图\nplt.figure(figsize=(8, 8))\nplt.pie(values, labels=categories, colors=colors, autopct="%1.1f%%")\nplt.title("产品销售占比", fontsize=16)\nplt.show()',
            explanation: '创建饼图展示数据占比'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: '显示数据趋势变化最适合用哪种图表？',
            type: 'multiple-choice',
            options: ['饼图', '折线图', '散点图', '热力图'],
            answer: '折线图',
            explanation: '折线图最适合展示数据随时间的变化趋势'
          },
          {
            id: 'ex2',
            question: '展示各部分占比关系最适合用哪种图表？',
            type: 'multiple-choice',
            options: ['折线图', '柱状图', '饼图', '散点图'],
            answer: '饼图',
            explanation: '饼图最适合展示整体的各部分占比'
          },
          {
            id: 'ex3',
            question: '创建柱状图展示数据 [30, 50, 40, 60]',
            type: 'coding',
            answer: 'import matplotlib.pyplot as plt\ndata = [30, 50, 40, 60]\nplt.bar(["A", "B", "C", "D"], data)',
            explanation: '使用matplotlib创建柱状图'
          }
        ]
      },
      {
        id: 'seaborn-visualization',
        title: 'Seaborn高级可视化',
        content: `
# Seaborn高级可视化

## Seaborn特点

- 基于Matplotlib
- 更美观的默认样式
- 支持复杂统计图形
- 内置数据集

## 常用图表

\`\`\`python
import seaborn as sns
import pandas as pd

# 加载示例数据
tips = sns.load_dataset("tips")

# 散点图
sns.scatterplot(x="total_bill", y="tip", data=tips)

# 箱线图
sns.boxplot(x="day", y="total_bill", data=tips)

# 热力图
correlation = tips.corr()
sns.heatmap(correlation, annot=True)
\`\`\`
        `,
        examples: [
          {
            id: 'ex1',
            code: 'import matplotlib.pyplot as plt\nimport seaborn as sns\nimport pandas as pd\nimport numpy as np\n\n# 创建示例数据\ndata = {\n    "月份": ["1月", "2月", "3月", "4月", "5月"] * 3,\n    "销售额": [1000, 1500, 1200, 1800, 2000, 1100, 1600, 1300, 1900, 2100, 1050, 1550, 1250, 1850, 2050],\n    "产品": ["A"] * 5 + ["B"] * 5 + ["C"] * 5\n}\ndf = pd.DataFrame(data)\n\n# 使用seaborn创建分组柱状图\nplt.figure(figsize=(12, 6))\nsns.barplot(x="月份", y="销售额", hue="产品", data=df)\nplt.title("各产品月度销售额对比")\nplt.show()',
            explanation: '使用Seaborn创建分组柱状图'
          },
          {
            id: 'ex2',
            code: 'import matplotlib.pyplot as plt\nimport seaborn as sns\nimport pandas as pd\nimport numpy as np\n\n# 创建相关性数据\nnp.random.seed(42)\ndata = {\n    "X": np.random.randn(100),\n    "Y": np.random.randn(100),\n    "Z": np.random.randn(100)\n}\ndf = pd.DataFrame(data)\n\n# 计算相关性矩阵\ncorr = df.corr()\n\n# 绘制热力图\nplt.figure(figsize=(8, 6))\nsns.heatmap(corr, annot=True, cmap="coolwarm", center=0)\nplt.title("数据相关性热力图")\nplt.show()',
            explanation: '创建相关性热力图'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: 'Seaborn是基于哪个库构建的？',
            type: 'multiple-choice',
            options: ['Pandas', 'NumPy', 'Matplotlib', 'SciPy'],
            answer: 'Matplotlib',
            explanation: 'Seaborn是建立在Matplotlib之上的高级可视化库'
          },
          {
            id: 'ex2',
            question: '展示数据分布的最佳图表是？',
            type: 'multiple-choice',
            options: ['折线图', '饼图', '箱线图', '散点图'],
            answer: '箱线图',
            explanation: '箱线图能很好地展示数据的分布和异常值'
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

- 均值（Mean）：所有数值的平均值
- 中位数（Median）：排序后的中间值
- 众数（Mode）：出现频率最高的值

## 离散程度

- 方差（Variance）：数据偏离均值的程度
- 标准差（Standard Deviation）：方差的平方根
- 四分位数（Quartiles）：将数据分为四等份

## 分布形态

- 偏度（Skewness）：数据分布的对称性
- 峰度（Kurtosis）：数据分布的尖锐程度
        `,
        examples: [
          {
            id: 'ex1',
            code: 'import numpy as np\nimport statistics\n\ndata = [25, 30, 35, 40, 45, 50, 55, 60, 65, 70]\n\nprint("基本统计量:")\nprint(f"均值: {np.mean(data)}")\nprint(f"中位数: {np.median(data)}")\nprint(f"众数: {statistics.mode(data)}")\nprint(f"方差: {np.var(data)}")\nprint(f"标准差: {np.std(data)}")\nprint(f"最小值: {np.min(data)}")\nprint(f"最大值: {np.max(data)}")',
            explanation: '计算数据集的基本描述性统计量'
          },
          {
            id: 'ex2',
            code: 'import numpy as np\n\n# 分位数计算\ndata = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]\n\nq1 = np.percentile(data, 25)  # 第一四分位数\nq2 = np.percentile(data, 50)  # 中位数\nq3 = np.percentile(data, 75)  # 第三四分位数\niqr = q3 - q1  # 四分位距\n\nprint(f"Q1 (25%): {q1}")\nprint(f"Q2 (50%): {q2}")\nprint(f"Q3 (75%): {q3}")\nprint(f"IQR (四分位距): {iqr}")',
            explanation: '计算四分位数和四分位距'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: '不受极端值影响的集中趋势指标是？',
            type: 'multiple-choice',
            options: ['均值', '中位数', '众数', '方差'],
            answer: '中位数',
            explanation: '中位数是位置指标，不受极端值影响'
          },
          {
            id: 'ex2',
            question: '标准差是方差的？',
            type: 'multiple-choice',
            options: ['立方根', '平方根', '倒数', '相反数'],
            answer: '平方根',
            explanation: '标准差是方差的平方根'
          },
          {
            id: 'ex3',
            question: '计算 [15, 25, 35, 45] 的均值',
            type: 'coding',
            answer: 'data = [15, 25, 35, 45]\nmean = sum(data) / len(data)',
            explanation: '均值 = 所有数值之和 / 数值个数'
          }
        ]
      },
      {
        id: 'hypothesis-testing',
        title: '假设检验',
        content: `
# 假设检验

## 基本概念

- 原假设（H0）：被默认接受的假设
- 备择假设（H1）：与原假设对立
- P值：假设H0为真时，观察到当前结果的概率

## 常用检验

1. **t检验**：比较两组均值差异
2. **卡方检验**：检验分类变量独立性
3. **ANOVA**：多组均值比较
4. **相关性检验**：检验变量间相关性

## 判断标准

- P < 0.05：拒绝原假设，差异显著
- P >= 0.05：不能拒绝原假设
        `,
        examples: [
          {
            id: 'ex1',
            code: 'import numpy as np\nfrom scipy import stats\n\n# 两组数据\ngroup1 = [85, 90, 88, 92, 87]\ngroup2 = [78, 82, 80, 85, 79]\n\n# 进行独立样本t检验\nt_stat, p_value = stats.ttest_ind(group1, group2)\n\nprint(f"t统计量: {t_stat:.4f}")\nprint(f"P值: {p_value:.4f}")\n\nif p_value < 0.05:\n    print("结论：两组存在显著差异")\nelse:\n    print("结论：两组无显著差异")',
            explanation: '使用t检验比较两组数据'
          },
          {
            id: 'ex2',
            code: 'import numpy as np\nfrom scipy import stats\n\n# 计算相关性\nx = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\ny = [2, 4, 5, 4, 5, 6, 7, 8, 9, 10]\n\n# 皮尔逊相关系数\ncorrelation, p_value = stats.pearsonr(x, y)\n\nprint(f"相关系数: {correlation:.4f}")\nprint(f"P值: {p_value:.6f}")\n\nif p_value < 0.05:\n    print("结论：变量间存在显著相关性")',
            explanation: '计算两个变量间的相关性'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: '当P值小于0.05时，我们应该？',
            type: 'multiple-choice',
            options: ['接受原假设', '拒绝原假设', '无法判断', '重新收集数据'],
            answer: '拒绝原假设',
            explanation: 'P<0.05表示差异显著，应拒绝原假设'
          },
          {
            id: 'ex2',
            question: '比较两组独立数据的均值差异应该使用哪种检验？',
            type: 'multiple-choice',
            options: ['卡方检验', 't检验', '方差分析', '相关性检验'],
            answer: 't检验',
            explanation: 't检验用于比较两组独立样本的均值差异'
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
- HAVING: 分组后筛选
- ORDER BY: 排序
- LIMIT: 限制结果数量

## 聚合函数

- COUNT(): 计数
- SUM(): 求和
- AVG(): 平均值
- MAX(): 最大值
- MIN(): 最小值
        `,
        examples: [
          {
            id: 'ex1',
            code: '# SQL查询示例（Python模拟）\nsales_data = [\n    {"产品": "A", "销售额": 1000, "地区": "北京"},\n    {"产品": "B", "销售额": 2000, "地区": "上海"},\n    {"产品": "A", "销售额": 1500, "地区": "北京"},\n    {"产品": "B", "销售额": 1800, "地区": "上海"},\n    {"产品": "A", "销售额": 1200, "地区": "广州"}\n]\n\n# 模拟SELECT * FROM sales\nprint("所有数据:")\nfor row in sales_data:\n    print(row)\n\n# 模拟SELECT * FROM sales WHERE 销售额 > 1500\nprint("\\n销售额大于1500的记录:")\nfiltered = [r for r in sales_data if r["销售额"] > 1500]\nfor row in filtered:\n    print(row)',
            explanation: 'SQL查询的Python模拟实现'
          },
          {
            id: 'ex2',
            code: '# SQL聚合查询模拟\nsales_data = [\n    {"产品": "A", "销售额": 1000, "地区": "北京"},\n    {"产品": "B", "销售额": 2000, "地区": "上海"},\n    {"产品": "A", "销售额": 1500, "地区": "北京"},\n    {"产品": "B", "销售额": 1800, "地区": "上海"},\n    {"产品": "A", "销售额": 1200, "地区": "广州"}\n]\n\n# 模拟GROUP BY产品, SUM(销售额)\nfrom collections import defaultdict\nproduct_sales = defaultdict(int)\nfor sale in sales_data:\n    product_sales[sale["产品"]] += sale["销售额"]\n\nprint("按产品汇总销售额:")\nfor product, total in product_sales.items():\n    print(f"{product}: {total}")',
            explanation: '模拟SQL的GROUP BY和SUM'
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
          },
          {
            id: 'ex2',
            question: '计算总额应该使用哪个聚合函数？',
            type: 'multiple-choice',
            options: ['COUNT', 'SUM', 'AVG', 'MAX'],
            answer: 'SUM',
            explanation: 'SUM函数用于计算数值字段的总和'
          },
          {
            id: 'ex3',
            question: '查询销售额大于1000的记录',
            type: 'coding',
            answer: 'sales = [1000, 2000, 1500, 800, 2500]\nresult = [s for s in sales if s > 1000]',
            explanation: '使用列表推导式过滤数据'
          }
        ]
      },
      {
        id: 'sql-joins',
        title: 'SQL表连接',
        content: `
# SQL表连接

## 连接类型

1. **INNER JOIN**：只返回两个表中匹配的记录
2. **LEFT JOIN**：返回左表所有记录和右表匹配记录
3. **RIGHT JOIN**：返回右表所有记录和左表匹配记录
4. **FULL OUTER JOIN**：返回两个表的所有记录

## 连接语法

\`\`\`sql
SELECT columns
FROM table1
INNER JOIN table2 ON table1.column = table2.column;
\`\`\`

## 多表连接

可以同时连接多个表，形成复杂查询。
        `,
        examples: [
          {
            id: 'ex1',
            code: '# 表连接示例（Python模拟）\nemployees = [\n    {"id": 1, "name": "张三", "dept_id": 101},\n    {"id": 2, "name": "李四", "dept_id": 102},\n    {"id": 3, "name": "王五", "dept_id": 101},\n    {"id": 4, "name": "赵六", "dept_id": 103}\n]\n\ndepartments = [\n    {"id": 101, "name": "销售部"},\n    {"id": 102, "name": "技术部"},\n    {"id": 104, "name": "人事部"}\n]\n\n# 模拟INNER JOIN\nprint("INNER JOIN (只匹配两表都有的部门):")\nfor emp in employees:\n    for dept in departments:\n        if emp["dept_id"] == dept["id"]:\n            print(f"{emp[\'name\']} - {dept[\'name\']}")',
            explanation: '模拟SQL的INNER JOIN连接'
          },
          {
            id: 'ex2',
            code: '# 模拟LEFT JOIN\nprint("LEFT JOIN (包含所有员工):")\nfor emp in employees:\n    matched = [d for d in departments if d["id"] == emp["dept_id"]]\n    if matched:\n        print(f"{emp[\'name\']} - {matched[0][\'name\']}")\n    else:\n        print(f"{emp[\'name\']} - NULL")',
            explanation: '模拟SQL的LEFT JOIN连接'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: '返回左表所有记录的连接类型是？',
            type: 'multiple-choice',
            options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'CROSS JOIN'],
            answer: 'LEFT JOIN',
            explanation: 'LEFT JOIN返回左表所有记录和右表匹配记录'
          },
          {
            id: 'ex2',
            question: 'INNER JOIN和LEFT JOIN的主要区别是？',
            type: 'multiple-choice',
            options: ['性能不同', 'INNER只返回匹配记录', 'LEFT更快', '没有区别'],
            answer: 'INNER只返回匹配记录',
            explanation: 'INNER JOIN只返回两表都匹配的记录'
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

## 分析目标

1. 整体销售趋势分析
2. 产品销售排名
3. 客户购买行为分析
4. 区域销售对比
5. 促销活动效果评估

## 分析步骤

1. 数据清洗与预处理
2. 探索性数据分析（EDA）
3. 趋势分析与可视化
4. 深度分析与洞察挖掘
5. 报告撰写与建议
        `,
        examples: [
          {
            id: 'ex1',
            code: 'import pandas as pd\nimport numpy as np\n\n# 创建销售数据\nnp.random.seed(42)\ndata = {\n    "日期": pd.date_range("2024-01-01", periods=365, freq="D"),\n    "销售额": np.random.randint(1000, 5000, 365),\n    "成本": np.random.randint(600, 3000, 365),\n    "产品类别": np.random.choice(["电子产品", "服装", "食品", "家居"], 365),\n    "客户地区": np.random.choice(["华北", "华东", "华南", "西南"], 365)\n}\ndf = pd.DataFrame(data)\ndf["利润"] = df["销售额"] - df["成本"]\n\nprint("数据概览:")\nprint(df.head(10))\nprint(f"\\n数据形状: {df.shape}")\nprint(f"总销售额: {df[\'销售额\'].sum()}")\nprint(f"总利润: {df[\'利润\'].sum()}")',
            explanation: '创建并查看销售数据集'
          },
          {
            id: 'ex2',
            code: 'import pandas as pd\nimport numpy as np\n\n# 按月汇总\ndata = {\n    "月份": ["1月", "2月", "3月", "4月", "5月", "6月"],\n    "销售额": [12000, 15000, 13500, 18000, 21000, 19500],\n    "成本": [7200, 9000, 8100, 10800, 12600, 11700]\n}\ndf = pd.DataFrame(data)\ndf["利润"] = df["销售额"] - df["成本"]\ndf["利润率"] = (df["利润"] / df["销售额"] * 100).round(2)\n\nprint("月度销售分析:")\nprint(df)\n\n# 找出利润最高的月份\nbest_month = df.loc[df["利润"].idxmax()]\nprint(f"\\n利润最高月份: {best_month[\'月份\']}, 利润: {best_month[\'利润\']}")',
            explanation: '按月分析销售数据'
          },
          {
            id: 'ex3',
            code: 'import pandas as pd\nimport numpy as np\n\n# 按产品类别分析\ndata = {\n    "产品类别": ["电子产品", "服装", "食品", "家居", "图书"],\n    "销售额": [50000, 35000, 28000, 42000, 15000],\n    "订单数": [500, 800, 1200, 300, 600]\n}\ndf = pd.DataFrame(data)\ndf["平均订单额"] = (df["销售额"] / df["订单数"]).round(2)\n\nprint("产品类别分析:")\nprint(df)\n\n# 按销售额排序\ndf_sorted = df.sort_values("销售额", ascending=False)\nprint("\\n销售额排名:")\nprint(df_sorted)',
            explanation: '按产品类别进行销售分析'
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
          },
          {
            id: 'ex2',
            question: '计算利润率公式是？',
            type: 'multiple-choice',
            options: ['利润/成本', '利润/销售额', '销售额/利润', '成本/利润'],
            answer: '利润/销售额',
            explanation: '利润率 = 利润 / 销售额 × 100%'
          },
          {
            id: 'ex3',
            question: '创建一个包含3个月销售数据的DataFrame',
            type: 'coding',
            answer: 'import pandas as pd\ndf = pd.DataFrame({\n    "月份": ["1月", "2月", "3月"],\n    "销售额": [10000, 15000, 12000]\n})',
            explanation: '使用Pandas创建DataFrame'
          }
        ]
      },
      {
        id: 'customer-analysis',
        title: '客户分析案例',
        content: `
# 客户分析案例

## 分析维度

1. **客户细分**：按行为或特征分组
2. **客户价值**：识别高价值客户
3. **流失分析**：预测客户流失风险
4. **RFM分析**：最近购买、购买频率、消费金额

## 分析方法

- 聚类分析（K-Means）
- 分类模型（决策树、随机森林）
- 关联规则（购物篮分析）
- 生存分析（客户生命周期）
        `,
        examples: [
          {
            id: 'ex1',
            code: 'import pandas as pd\nimport numpy as np\n\n# 创建客户数据\nnp.random.seed(42)\ncustomers = pd.DataFrame({\n    "客户ID": range(1, 101),\n    "年龄": np.random.randint(18, 65, 100),\n    "月消费": np.random.randint(100, 5000, 100),\n    "购买次数": np.random.randint(1, 50, 100),\n    "最近购买天数": np.random.randint(1, 180, 100)\n})\n\nprint("客户数据概览:")\nprint(customers.head(10))\nprint(f"\\n平均月消费: {customers[\'月消费\'].mean():.2f}")\nprint(f"平均购买次数: {customers[\'购买次数\'].mean():.2f}")',
            explanation: '创建并查看客户数据集'
          },
          {
            id: 'ex2',
            code: 'import pandas as pd\nimport numpy as np\n\n# RFM分析示例\ncustomers = pd.DataFrame({\n    "客户": ["A", "B", "C", "D", "E"],\n    "最近购买天数": [5, 30, 90, 10, 60],\n    "购买频率": [20, 15, 5, 18, 8],\n    "消费金额": [5000, 3000, 1000, 4500, 2000]\n})\n\n# RFM评分（分数越高越好）\ncustomers["R评分"] = pd.cut(customers["最近购买天数"], bins=3, labels=[3, 2, 1]).astype(int)\ncustomers["F评分"] = pd.cut(customers["购买频率"], bins=3, labels=[1, 2, 3]).astype(int)\ncustomers["M评分"] = pd.cut(customers["消费金额"], bins=3, labels=[1, 2, 3]).astype(int)\ncustomers["RFM总分"] = customers["R评分"] + customers["F评分"] + customers["M评分"]\n\nprint("RFM分析结果:")\nprint(customers.sort_values("RFM总分", ascending=False))',
            explanation: '进行RFM客户分析'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: 'RFM中的R代表什么？',
            type: 'multiple-choice',
            options: ['购买频率', '最近购买', '消费金额', '客户等级'],
            answer: '最近购买',
            explanation: 'RFM分析中R表示客户最近一次购买的时间'
          },
          {
            id: 'ex2',
            question: '客户细分的主要目的是？',
            type: 'multiple-choice',
            options: ['增加数据量', '精准营销', '降低成本', '提高库存'],
            answer: '精准营销',
            explanation: '客户细分帮助企业针对不同群体进行精准营销'
          }
        ]
      }
    ]
  }
];
