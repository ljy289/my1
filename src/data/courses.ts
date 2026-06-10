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
    id: 'project1',
    title: '项目1：电商购物车关联规则挖掘',
    description: '使用Apriori算法发现商品之间的关联关系，生成"买了A的用户也买了B"的推荐',
    icon: 'shopping-cart',
    order: 1,
    lessons: [
      {
        id: 'association-intro',
        title: '关联规则基础',
        content: '学习关联规则的核心指标：支持度、置信度和提升度，以及Apriori算法的基本原理。',
        examples: [
          {
            id: 'ex1',
            code: 'import pandas as pd\ntransactions = [[\"牛奶\", \"面包\", \"鸡蛋\"], [\"牛奶\", \"面包\"]]\ndf = pd.DataFrame({\"订单ID\": range(1, len(transactions)+1), \"商品\": transactions})\nprint(df)',
            explanation: '创建交易数据'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: '支持度的计算公式是？',
            type: 'multiple-choice',
            options: ['包含X的交易数/总交易数', '包含X和Y的交易数/包含X的交易数', '置信度/支持度', '提升度×置信度'],
            answer: '包含X的交易数/总交易数',
            explanation: '支持度衡量项集在数据集中出现的频率'
          }
        ]
      }
    ]
  },
  {
    id: 'project2',
    title: '项目2：用户消费行为RFM分析与价值聚类',
    description: '通过RFM模型分析用户价值，使用KMeans聚类将用户分为不同群体',
    icon: 'users',
    order: 2,
    lessons: [
      {
        id: 'rfm-intro',
        title: 'RFM模型基础',
        content: 'RFM代表最近一次消费（Recency）、消费频率（Frequency）和消费金额（Monetary）三个维度。',
        examples: [
          {
            id: 'ex1',
            code: 'import pandas as pd\nrfm = df.groupby(\"用户ID\").agg({\n    \"订单日期\": lambda x: (分析日期 - x.max()).days,\n    \"用户ID\": \"count\",\n    \"金额\": \"sum\"\n})\nrfm.columns = [\"R\", \"F\", \"M\"]',
            explanation: '计算RFM值'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: 'RFM中的R代表什么？',
            type: 'multiple-choice',
            options: ['最近一次消费', '消费频率', '消费金额', '消费人数'],
            answer: '最近一次消费',
            explanation: 'R是Recency，即最近一次消费距今天数'
          }
        ]
      }
    ]
  },
  {
    id: 'project3',
    title: '项目3：异常订单检测',
    description: '识别并处理订单数据中的异常值，包括空值、重复、离群值等',
    icon: 'alert-circle',
    order: 3,
    lessons: [
      {
        id: 'anomaly-intro',
        title: '异常检测基础',
        content: '学习如何检测空值、重复数据、离群值和逻辑错误，以及使用Z-score和IQR方法。',
        examples: [
          {
            id: 'ex1',
            code: 'import pandas as pd\n空值检查 = df.isnull().sum()\n重复检查 = df.duplicated(subset=\"订单ID\").sum()',
            explanation: '基础异常检测'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: '如何检测DataFrame中的空值？',
            type: 'multiple-choice',
            options: ['df.isnull()', 'df.empty()', 'df.na()', 'df.null()'],
            answer: 'df.isnull()',
            explanation: 'isnull()返回标记空值位置的布尔DataFrame'
          }
        ]
      }
    ]
  },
  {
    id: 'project4',
    title: '项目4：购物车转化路径分析',
    description: '分析用户从浏览到下单的转化漏斗，识别流失环节',
    icon: 'trending-up',
    order: 4,
    lessons: [
      {
        id: 'funnel-intro',
        title: '漏斗分析基础',
        content: '分析用户在不同转化阶段的转化率，识别主要流失点。',
        examples: [
          {
            id: 'ex1',
            code: '漏斗数据 = df.groupby(\"行为\").nunique()[\"用户ID\"]\n转化率 = 漏斗数据 / 漏斗数据.shift(1) * 100',
            explanation: '计算漏斗转化率'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: '转化率的计算公式是？',
            type: 'multiple-choice',
            options: ['当前步骤/上一步骤', '总用户数/当前步骤', '上一步骤/当前步骤', '当前步骤/总用户数'],
            answer: '当前步骤/上一步骤',
            explanation: '转化率 = 当前步骤用户数 / 上一步骤用户数 × 100%'
          }
        ]
      }
    ]
  },
  {
    id: 'project5',
    title: '项目5：商品销售趋势与周期性分析',
    description: '分析销售趋势和季节性，使用时间序列方法预测未来销量',
    icon: 'line-chart',
    order: 5,
    lessons: [
      {
        id: 'timeseries-intro',
        title: '时间序列分析基础',
        content: '学习时间序列分解、同比/环比分析，以及滑动窗口统计。',
        examples: [
          {
            id: 'ex1',
            code: '周汇总 = df.resample(\"W\", on=\"日期\").sum()\n滑动均值 = df[\"销售额\"].rolling(7).mean()',
            explanation: '时间序列聚合'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: 'resample(\"W\")的作用是？',
            type: 'multiple-choice',
            options: ['按周重采样', '按月重采样', '按天重采样', '按年重采样'],
            answer: '按周重采样',
            explanation: 'W代表weekly，即按周聚合'
          }
        ]
      }
    ]
  },
  {
    id: 'project6',
    title: '项目6：用户复购间隔与生命周期聚类',
    description: '分析用户的复购模式，构建活跃度衰减模型',
    icon: 'clock',
    order: 6,
    lessons: [
      {
        id: 'repurchase-intro',
        title: '复购行为分析',
        content: '分析用户复购间隔和生命周期，构建活跃度衰减模型。',
        examples: [
          {
            id: 'ex1',
            code: 'orders[\"间隔\"] = orders.groupby(\"用户ID\")[\"日期\"].diff().dt.days\n平均间隔 = orders.groupby(\"用户ID\")[\"间隔\"].mean()',
            explanation: '计算复购间隔'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: '复购间隔指的是什么？',
            type: 'multiple-choice',
            options: ['两次购买之间的天数', '距首次购买的天数', '距最近购买的天数', '成为客户的总天数'],
            answer: '两次购买之间的天数',
            explanation: '复购间隔是指连续两次购买之间的时间间隔'
          }
        ]
      }
    ]
  },
  {
    id: 'project7',
    title: '项目7：文本评论情感与评分不一致分析',
    description: '分析评论的情感倾向，识别评分与情感不一致的样本',
    icon: 'message-circle',
    order: 7,
    lessons: [
      {
        id: 'sentiment-intro',
        title: '情感分析基础',
        content: '使用SnowNLP等工具分析文本情感，识别高评价但负面内容或低评价但正面内容的矛盾样本。',
        examples: [
          {
            id: 'ex1',
            code: 'from snownlp import SnowNLP\n得分 = SnowNLP(文本).sentiments',
            explanation: '计算情感得分'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: '情感分析主要分析什么？',
            type: 'multiple-choice',
            options: ['文本的情感倾向', '文本长度', '文本结构', '文本语法'],
            answer: '文本的情感倾向',
            explanation: '情感分析判断文本表达的是正面还是负面情感'
          }
        ]
      }
    ]
  },
  {
    id: 'project8',
    title: '项目8：购物篮商品组合推荐',
    description: '基于协同过滤算法，为购物车中的商品推荐补充商品',
    icon: 'shopping-bag',
    order: 8,
    lessons: [
      {
        id: 'collaborative-intro',
        title: '协同过滤推荐',
        content: '基于物品的协同过滤，使用余弦相似度计算商品相似度并生成推荐。',
        examples: [
          {
            id: 'ex1',
            code: 'from sklearn.metrics.pairwise import cosine_similarity\n商品相似度 = cosine_similarity(矩阵.T)',
            explanation: '计算商品相似度'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: '余弦相似度的取值范围是？',
            type: 'multiple-choice',
            options: ['-1到1', '0到1', '0到100', '-100到100'],
            answer: '-1到1',
            explanation: '余弦相似度范围是-1到1，1表示完全相似'
          }
        ]
      }
    ]
  },
  {
    id: 'project9',
    title: '项目9：促销活动效果分析',
    description: '通过A/B测试和统计检验分析促销活动的真实效果',
    icon: 'percent',
    order: 9,
    lessons: [
      {
        id: 'abtest-intro',
        title: 'A/B测试基础',
        content: '使用t检验和卡方检验分析实验组和对照组的差异显著性。',
        examples: [
          {
            id: 'ex1',
            code: 'from scipy import stats\nt统计量, p值 = stats.ttest_ind(实验组, 对照组)',
            explanation: '执行t检验'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: 'p值<0.05通常意味着什么？',
            type: 'multiple-choice',
            options: ['差异显著', '无差异', '不确定', '错误'],
            answer: '差异显著',
            explanation: 'p值小于0.05时拒绝原假设，认为两组有显著差异'
          }
        ]
      }
    ]
  },
  {
    id: 'project10',
    title: '项目10：端到端数据清洗与用户画像报告',
    description: '综合应用所学技能，完成完整的数据清洗和用户画像分析',
    icon: 'file-report',
    order: 10,
    lessons: [
      {
        id: 'end2end-intro',
        title: '端到端数据分析流程',
        content: '完整的数据分析流程：数据获取、清洗、整合、特征工程、建模和报告输出。',
        examples: [
          {
            id: 'ex1',
            code: '# 数据清洗流程\n清洗后订单 = 原始订单.drop_duplicates()\n清洗后订单 = 清洗后订单.dropna(subset=[\"用户ID\"])',
            explanation: '数据清洗步骤'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: '数据分析的第一步通常是什么？',
            type: 'multiple-choice',
            options: ['数据获取', '数据清洗', '建模', '可视化'],
            answer: '数据获取',
            explanation: '分析从获取原始数据开始'
          }
        ]
      }
    ]
  }
];
