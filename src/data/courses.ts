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
    title: 'Project 1: Association Rule Mining',
    description: 'Discover item associations using Apriori algorithm and generate recommendations',
    icon: 'shopping-cart',
    order: 1,
    lessons: [
      {
        id: 'association-intro',
        title: 'Introduction to Association Rules',
        content: 'Learn about support, confidence, and lift - the core metrics for association rules.',
        examples: [
          {
            id: 'ex1',
            code: 'import pandas as pd\ntransactions = [[\"milk\", \"bread\", \"egg\"], [\"milk\", \"bread\"]]\ndf = pd.DataFrame({\"order_id\": range(1, len(transactions)+1), \"items\": transactions})\nprint(df)',
            explanation: 'Create transaction data'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: 'What is support?',
            type: 'multiple-choice',
            options: ['Transactions with X / Total', 'Transactions with X and Y', 'Confidence / Support', 'Lift * Confidence'],
            answer: 'Transactions with X / Total',
            explanation: 'Support measures itemset frequency'
          }
        ]
      }
    ]
  },
  {
    id: 'project2',
    title: 'Project 2: RFM Analysis',
    description: 'Analyze customer value using RFM model and KMeans clustering',
    icon: 'users',
    order: 2,
    lessons: [
      {
        id: 'rfm-intro',
        title: 'RFM Model Basics',
        content: 'RFM stands for Recency, Frequency, and Monetary value.',
        examples: [
          {
            id: 'ex1',
            code: 'import pandas as pd\nrfm = df.groupby(\"user_id\").agg({\n    \"order_date\": lambda x: (analysis_date - x.max()).days,\n    \"user_id\": \"count\",\n    \"amount\": \"sum\"\n})\nrfm.columns = [\"R\", \"F\", \"M\"]',
            explanation: 'Calculate RFM values'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: 'What does R stand for?',
            type: 'multiple-choice',
            options: ['Recency', 'Revenue', 'Retention', 'Return'],
            answer: 'Recency',
            explanation: 'R is Recency - days since last purchase'
          }
        ]
      }
    ]
  },
  {
    id: 'project3',
    title: 'Project 3: Anomaly Detection',
    description: 'Detect and handle anomalies in order data',
    icon: 'alert-circle',
    order: 3,
    lessons: [
      {
        id: 'anomaly-intro',
        title: 'Anomaly Detection Basics',
        content: 'Learn to detect null values, duplicates, outliers, and logical errors.',
        examples: [
          {
            id: 'ex1',
            code: 'import pandas as pd\nnull_check = df.isnull().sum()\nduplicate_check = df.duplicated(subset=\"order_id\").sum()',
            explanation: 'Basic anomaly detection'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: 'How to detect null values?',
            type: 'multiple-choice',
            options: ['df.isnull()', 'df.empty()', 'df.na()', 'df.null()'],
            answer: 'df.isnull()',
            explanation: 'isnull() detects null values'
          }
        ]
      }
    ]
  },
  {
    id: 'project4',
    title: 'Project 4: Funnel Analysis',
    description: 'Analyze conversion funnel from browse to purchase',
    icon: 'trending-up',
    order: 4,
    lessons: [
      {
        id: 'funnel-intro',
        title: 'Funnel Analysis Basics',
        content: 'Analyze user conversion through different stages.',
        examples: [
          {
            id: 'ex1',
            code: 'funnel = df.groupby(\"action\").nunique()[\"user_id\"]\nconversion = funnel / funnel.shift(1) * 100',
            explanation: 'Calculate funnel conversion rates'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: 'What is conversion rate?',
            type: 'multiple-choice',
            options: ['Current step / Previous step', 'Total users / Current step', 'Previous step / Current step', 'None'],
            answer: 'Current step / Previous step',
            explanation: 'Conversion rate = current / previous * 100%'
          }
        ]
      }
    ]
  },
  {
    id: 'project5',
    title: 'Project 5: Time Series Analysis',
    description: 'Analyze sales trends and predict future sales',
    icon: 'line-chart',
    order: 5,
    lessons: [
      {
        id: 'timeseries-intro',
        title: 'Time Series Basics',
        content: 'Learn time series decomposition and forecasting.',
        examples: [
          {
            id: 'ex1',
            code: 'weekly = df.resample(\"W\", on=\"date\").sum()\nrolling_mean = df[\"sales\"].rolling(7).mean()',
            explanation: 'Time series aggregation'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: 'What does resample("W") do?',
            type: 'multiple-choice',
            options: ['Resample weekly', 'Resample monthly', 'Resample daily', 'Resample yearly'],
            answer: 'Resample weekly',
            explanation: '"W" means weekly frequency'
          }
        ]
      }
    ]
  },
  {
    id: 'project6',
    title: 'Project 6: Repurchase Analysis',
    description: 'Analyze customer repurchase patterns and lifecycle',
    icon: 'clock',
    order: 6,
    lessons: [
      {
        id: 'repurchase-intro',
        title: 'Repurchase Analysis',
        content: 'Analyze repurchase intervals and customer lifecycle.',
        examples: [
          {
            id: 'ex1',
            code: 'orders[\"interval\"] = orders.groupby(\"user_id\")[\"date\"].diff().dt.days\navg_interval = orders.groupby(\"user_id\")[\"interval\"].mean()',
            explanation: 'Calculate repurchase intervals'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: 'What is repurchase interval?',
            type: 'multiple-choice',
            options: ['Days between purchases', 'Days since first purchase', 'Days since last purchase', 'Total days as customer'],
            answer: 'Days between purchases',
            explanation: 'Time between consecutive purchases'
          }
        ]
      }
    ]
  },
  {
    id: 'project7',
    title: 'Project 7: Sentiment Analysis',
    description: 'Analyze review sentiment and rating inconsistencies',
    icon: 'message-circle',
    order: 7,
    lessons: [
      {
        id: 'sentiment-intro',
        title: 'Sentiment Analysis Basics',
        content: 'Analyze text sentiment and detect rating inconsistencies.',
        examples: [
          {
            id: 'ex1',
            code: 'from snownlp import SnowNLP\nscore = SnowNLP(text).sentiments',
            explanation: 'Calculate sentiment score'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: 'What is sentiment analysis?',
            type: 'multiple-choice',
            options: ['Analyze text emotion', 'Analyze text length', 'Analyze text structure', 'Analyze text grammar'],
            answer: 'Analyze text emotion',
            explanation: 'Sentiment analysis determines emotional tone'
          }
        ]
      }
    ]
  },
  {
    id: 'project8',
    title: 'Project 8: Collaborative Filtering',
    description: 'Implement item-based collaborative filtering for recommendations',
    icon: 'shopping-bag',
    order: 8,
    lessons: [
      {
        id: 'collaborative-intro',
        title: 'Collaborative Filtering',
        content: 'Implement item-based collaborative filtering.',
        examples: [
          {
            id: 'ex1',
            code: 'from sklearn.metrics.pairwise import cosine_similarity\nitem_sim = cosine_similarity(matrix.T)',
            explanation: 'Calculate item similarity'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: 'What is cosine similarity range?',
            type: 'multiple-choice',
            options: ['-1 to 1', '0 to 1', '0 to 100', '-100 to 100'],
            answer: '-1 to 1',
            explanation: 'Cosine similarity ranges from -1 to 1'
          }
        ]
      }
    ]
  },
  {
    id: 'project9',
    title: 'Project 9: A/B Testing',
    description: 'Analyze A/B test results with statistical tests',
    icon: 'percent',
    order: 9,
    lessons: [
      {
        id: 'abtest-intro',
        title: 'A/B Testing Basics',
        content: 'Analyze experiment results using t-test and chi-square.',
        examples: [
          {
            id: 'ex1',
            code: 'from scipy import stats\nt_stat, p_value = stats.ttest_ind(treatment, control)',
            explanation: 'Perform t-test'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: 'What does p-value < 0.05 mean?',
            type: 'multiple-choice',
            options: ['Significant difference', 'No difference', 'Uncertain', 'Error'],
            answer: 'Significant difference',
            explanation: 'Reject null hypothesis'
          }
        ]
      }
    ]
  },
  {
    id: 'project10',
    title: 'Project 10: End-to-End Analysis',
    description: 'Complete data cleaning and customer profiling report',
    icon: 'file-report',
    order: 10,
    lessons: [
      {
        id: 'end2end-intro',
        title: 'End-to-End Workflow',
        content: 'Complete data cleaning, feature engineering, and reporting.',
        examples: [
          {
            id: 'ex1',
            code: '# Data cleaning workflow\norders_clean = orders.drop_duplicates()\norders_clean = orders_clean.dropna(subset=[\"user_id\"])',
            explanation: 'Data cleaning steps'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: 'First step in data analysis?',
            type: 'multiple-choice',
            options: ['Data acquisition', 'Data cleaning', 'Modeling', 'Visualization'],
            answer: 'Data acquisition',
            explanation: 'Start with getting the data'
          }
        ]
      }
    ]
  }
];
