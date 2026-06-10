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
    title: '项目1：购物车关联规则挖掘',
    description: '使用 Apriori 算法发现商品关联关系，生成"买了A的用户也买了B"的推荐',
    icon: 'shopping-cart',
    order: 1,
    lessons: [
      {
        id: 'association-intro',
        title: 'Association Rules Basics / 关联规则基础',
        content: `## Association Rules Mining 关联规则挖掘

Association Rules is a rule-based machine learning method to discover interesting relations between variables in large databases.

关联规则是一种基于规则的机器学习方法，用于在大型数据库中发现变量之间的有趣关系。

### Key Metrics 核心指标

1. **Support (支持度)**: How frequently an itemset appears in the dataset
   项集在数据集中出现的频率
   \`\`\`python
   Support(X) = count(X) / total_transactions
   \`\`\`

2. **Confidence (置信度)**: Probability that item Y is purchased when item X is purchased
   在购买商品X的条件下，同时购买商品Y的概率
   \`\`\`python
   Confidence(X -> Y) = count(X,Y) / count(X)
   \`\`\`

3. **Lift (提升度)**: How much more likely Y is purchased when X is purchased, compared to random chance
   相比随机购买，用户在买了X后购买Y的倍数
   \`\`\`python
   Lift(X -> Y) = Confidence(X -> Y) / Support(Y)
   \`\`\`

### Apriori Algorithm Principle Apriori 算法原理

If an itemset is frequent, then all its subsets must also be frequent.
如果一个项集是频繁的，那么它的所有子集也一定是频繁的。

Conversely, if an itemset is infrequent, all its supersets must be infrequent.
反之，如果一个项集不频繁，它的所有超集也一定不频繁。

This property drastically reduces the search space - we don't need to check every possible combination.
这个性质极大地减少了搜索空间，不必检查所有可能的组合。`,
        examples: [
          {
            id: 'ex1',
            code: `import pandas as pd

# Sample transaction data / 示例交易数据
transactions = [
    ["milk", "bread", "eggs"],
    ["milk", "bread"],
    ["bread", "eggs"],
    ["milk", "bread", "eggs"],
    ["bread", "eggs"]
]

# Create DataFrame / 创建数据表
df = pd.DataFrame({
    "transaction_id": range(1, len(transactions) + 1),
    "items": transactions
})

print("=== Transaction Data / 交易数据 ===")
print(df)
print(f"\nTotal transactions: {len(transactions)}")`,
            explanation: '创建并展示交易数据'
          },
          {
            id: 'ex2',
            code: `# Manual calculation of Support / 手动计算支持度
from collections import Counter

transactions = [
    ["milk", "bread", "eggs"],
    ["milk", "bread"],
    ["bread", "eggs"],
    ["milk", "bread", "eggs"],
    ["bread", "eggs"]
]

total = len(transactions)

# Count each item / 统计每个商品
single_counts = Counter()
for txn in transactions:
    for item in txn:
        single_counts[item] += 1

print("=== Support for single items / 单商品支持度 ===")
for item, count in single_counts.most_common():
    support = count / total
    print(f"{item}: {count}/{total} = {support:.2f} ({support*100:.1f}%)")

# Count pairs / 统计商品对
pair_counts = Counter()
for txn in transactions:
    for i in range(len(txn)):
        for j in range(i+1, len(txn)):
            pair = tuple(sorted([txn[i], txn[j]]))
            pair_counts[pair] += 1

print("\n=== Support for item pairs / 商品对支持度 ===")
for pair, count in pair_counts.most_common():
    support = count / total
    print(f"{pair[0]} + {pair[1]}: {count}/{total} = {support:.2f} ({support*100:.1f}%)")

# Calculate confidence for {bread} -> {eggs} / 计算置信度
bread_count = single_counts["bread"]
bread_eggs_count = pair_counts[("bread", "eggs")]
confidence = bread_eggs_count / bread_count
print(f"\nConfidence(bread -> eggs) = {bread_eggs_count}/{bread_count} = {confidence:.2f}")
print(f"解释: 买了面包的用户中，有 {confidence*100:.1f}% 也买了鸡蛋")`,
            explanation: '手动计算支持度和置信度'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: 'What is the formula for Support?',
            type: 'multiple-choice',
            options: [
              'count(X) / total_transactions (项集X出现次数 / 总交易数)',
              'count(X,Y) / count(X) (同时购买XY数 / 购买X数)',
              'Confidence / Support(Y) (置信度 / Y的支持度)',
              'Lift × Confidence'
            ],
            answer: 'count(X) / total_transactions (项集X出现次数 / 总交易数)',
            explanation: 'Support measures how frequently an itemset appears in the dataset. 支持度衡量项集在数据集中出现的频率。'
          },
          {
            id: 'ex2',
            question: 'If Lift(X->Y) = 2.5, what does it mean?',
            type: 'multiple-choice',
            options: [
              'Y is 2.5x more likely to be bought when X is bought / 买了X的用户购买Y的概率是随机购买的2.5倍',
              '250% of users buy both X and Y / 250%的用户同时购买X和Y',
              'X costs 2.5x more than Y / X比Y贵2.5倍',
              'X sells 2.5x more than Y / X销量是Y的2.5倍'
            ],
            answer: 'Y is 2.5x more likely to be bought when X is bought / 买了X的用户购买Y的概率是随机购买的2.5倍',
            explanation: 'Lift compares confidence to random chance. 提升度对比置信度与随机购买的概率。'
          }
        ]
      }
    ]
  },
  {
    id: 'project2',
    title: '项目2：RFM分析与用户聚类',
    description: '用 RFM 模型分析用户价值，结合 KMeans 聚类对用户进行分群',
    icon: 'users',
    order: 2,
    lessons: [
      {
        id: 'rfm-intro',
        title: 'RFM Model Basics / RFM 模型基础',
        content: `## RFM Analysis RFM 分析

RFM is a customer segmentation technique based on three metrics.
RFM 是基于三个核心指标的客户分群分析方法。

### What does RFM stand for? RFM 代表什么

- **R (Recency 近度)**: How recently did the customer make a purchase?
  客户最近一次购买有多近？Days since last purchase.
- **F (Frequency 频度)**: How often do they purchase?
  客户购买多频繁？Total number of purchases.
- **M (Monetary 额度)**: How much do they spend?
  客户花了多少钱？Total spend amount.

### Customer Segmentation Benefits 客户分群的好处

1. Identify high-value customers / 识别高价值客户
2. Develop targeted marketing strategies / 制定精准营销策略
3. Improve customer retention / 提升客户留存率
4. Personalize recommendations / 个性化推荐

### Scoring Method 评分方法

Each metric is scored from 1-5 (5 being best).
每个指标被评为 1-5 分（5 分为最佳）：

- **R5**: Purchased within 1 month / 最近1个月内购买过
- **R4**: 1-3 months ago / 1-3 个月前购买
- **R3**: 3-6 months ago / 3-6 个月前购买
- **R2**: 6-12 months ago / 6-12 个月前购买
- **R1**: More than 1 year / 超过1年未购买

- **F5**: 10+ purchases / 购买 10 次以上
- **F4**: 5-9 purchases / 购买 5-9 次
- **F3**: 3-4 purchases / 购买 3-4 次
- **F2**: 2 purchases / 购买 2 次
- **F1**: 1 purchase / 购买 1 次

- **M5**: Top 20% spenders / 消费前 20%
- **M4-M1**: Quintiles / 按五分位划分`,
        examples: [
          {
            id: 'ex1',
            code: `import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# Create sample customer data / 创建示例客户数据
np.random.seed(42)
n_customers = 100

customer_ids = range(1, n_customers + 1)
purchase_amounts = np.random.uniform(50, 5000, n_customers)
purchase_counts = np.random.randint(1, 20, n_customers)
days_since_purchase = np.random.randint(1, 365, n_customers)

df = pd.DataFrame({
    "customer_id": customer_ids,
    "frequency": purchase_counts,
    "monetary": purchase_amounts,
    "recency_days": days_since_purchase
})

print("=== Sample Customer Data / 示例客户数据 (前10行) ===")
print(df.head(10))
print(f"\n数据统计:")
print(f"客户总数: {len(df)}")
print(f"平均购买次数: {df['frequency'].mean():.1f}")
print(f"平均消费金额: {df['monetary'].mean():.2f}")
print(f"平均最近购买天数: {df['recency_days'].mean():.1f}")`,
            explanation: '创建示例客户购买数据'
          },
          {
            id: 'ex2',
            code: `import pandas as pd
import numpy as np

np.random.seed(42)
n_customers = 100
df = pd.DataFrame({
    "customer_id": range(1, n_customers + 1),
    "frequency": np.random.randint(1, 20, n_customers),
    "monetary": np.random.uniform(50, 5000, n_customers),
    "recency_days": np.random.randint(1, 365, n_customers)
})

# RFM Scoring / RFM 评分
# R: Lower recency_days = better, so invert for scoring / 天数越少越好，反向评分
df["R_score"] = pd.qcut(df["recency_days"], 5, labels=[5, 4, 3, 2, 1]).astype(int)

# F & M: Higher = better / 越高越好
df["F_score"] = pd.qcut(df["frequency"].rank(method="first"), 5, labels=[1, 2, 3, 4, 5]).astype(int)
df["M_score"] = pd.qcut(df["monetary"].rank(method="first"), 5, labels=[1, 2, 3, 4, 5]).astype(int)

# Combined RFM Score / 综合评分
df["RFM_total"] = df["R_score"] + df["F_score"] + df["M_score"]

# Customer Segmentation / 客户分群
def segment(row):
    total = row["RFM_total"]
    if total >= 12:
        return "重要价值客户 VIP"
    elif total >= 9:
        return "一般保持客户 Regular"
    elif total >= 6:
        return "需要关注客户 Attention"
    else:
        return "流失风险客户 At Risk"

df["segment"] = df.apply(segment, axis=1)

print("=== RFM Analysis Results / RFM 分析结果 ===")
print(df[["customer_id", "R_score", "F_score", "M_score", "RFM_total", "segment"]].head(15))

print("\n=== Customer Segments Distribution / 客户分群分布 ===")
print(df["segment"].value_counts())`,
            explanation: '计算 RFM 评分并进行客户分群'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: 'What does R (Recency) in RFM measure?',
            type: 'multiple-choice',
            options: [
              'Days since last purchase / 最近一次购买的天数',
              'Total number of purchases / 总购买次数',
              'Total money spent / 总消费金额',
              'Retention rate / 客户留存率'
            ],
            answer: 'Days since last purchase / 最近一次购买的天数',
            explanation: 'R = Recency, how recently the customer purchased. 最近购买天数越少越好。'
          },
          {
            id: 'ex2',
            question: 'Which customer segment has R=5, F=5, M=5?',
            type: 'multiple-choice',
            options: [
              'VIP / High-value active customers 高价值活跃客户',
              'At risk / 流失风险客户',
              'New customers / 新客户',
              'One-time buyers / 一次性购买客户'
            ],
            answer: 'VIP / High-value active customers 高价值活跃客户',
            explanation: 'High RFM scores = best customers. 高分 RFM 代表最优质的客户。'
          }
        ]
      }
    ]
  },
  {
    id: 'project3',
    title: '项目3：异常订单检测',
    description: '识别和处理订单数据中的异常：缺失值、重复值、异常值和逻辑错误',
    icon: 'alert-circle',
    order: 3,
    lessons: [
      {
        id: 'anomaly-intro',
        title: 'Anomaly Detection Basics / 异常检测基础',
        content: `## Data Quality & Anomaly Detection 数据质量与异常检测

Data anomalies can significantly impact analysis results.
数据异常会显著影响分析结果的准确性。

### 1. Missing Values (缺失值)
Check with df.isnull().sum()
使用 isnull() 检查缺失数量
Handle: fill with mean/median/mode, interpolate, or remove
处理方式：填充、插值或删除

### 2. Duplicate Records (重复记录)
Check with df.duplicated().sum()
用 duplicated() 检查重复行数
Handle: remove with drop_duplicates()
处理方式：drop_duplicates() 删除重复

### 3. Outliers (异常值)
Methods: Z-score, IQR (Interquartile Range)
方法：Z-score（标准化分数）、IQR（四分位距）
- Z-score: value with |z| > 3 is outlier / |z| > 3 视为异常
- IQR: value < Q1 - 1.5×IQR or > Q3 + 1.5×IQR
  小于 Q1-1.5IQR 或大于 Q3+1.5IQR 视为异常

### 4. Logical Errors (逻辑错误)
Negative quantities, future dates, invalid categories.
负数量、未来日期、无效分类等。
These require business logic validation.
这类需要业务规则来验证。`,
        examples: [
          {
            id: 'ex1',
            code: `import pandas as pd
import numpy as np

# Create sample data with issues / 创建含问题的示例数据
np.random.seed(42)
n = 100

data = {
    "order_id": range(1, n + 1),
    "customer_id": np.random.randint(1, 50, n).astype(float),
    "quantity": np.random.choice([1, 2, 3, 5, 10], n),
    "price": np.random.uniform(10, 500, n),
    "order_date": pd.date_range("2024-01-01", periods=n, freq="D")
}

df = pd.DataFrame(data)

# Introduce issues / 引入数据问题
df.loc[10, "quantity"] = np.nan
df.loc[20, "customer_id"] = np.nan
df.loc[5, "price"] = -100
df.loc[50, "quantity"] = -5

# Add a duplicate / 添加重复行
df = pd.concat([df, df.iloc[[0]]]).reset_index(drop=True)

print("=== Data Quality Check 数据质量检查 ===")
print("\n--- Missing Values 缺失值 ---")
print(df.isnull().sum())

print("\n--- Duplicate Rows 重复行 ---")
dup_count = df.duplicated(subset=["order_id"]).sum()
print(f"重复行数: {dup_count}")

print("\n--- Negative Values 负值检查 ---")
print("负数量数量:", (df["quantity"] < 0).sum())
print("负价格数量:", (df["price"] < 0).sum())`,
            explanation: '检测订单数据中的数据质量问题'
          },
          {
            id: 'ex2',
            code: `import pandas as pd
import numpy as np

# Sample data with outliers / 含异常值的示例数据
np.random.seed(42)
data = {
    "order_id": range(1, 101),
    "amount": np.random.normal(500, 100, 100)
}
df = pd.DataFrame(data)

# Add outliers / 添加异常值
df.loc[0, "amount"] = 5000
df.loc[1, "amount"] = 10
df.loc[2, "amount"] = 3000

print("=== Outlier Detection 异常值检测 ===")
print(f"原始数据统计:")
print(f"平均值: {df['amount'].mean():.2f}")
print(f"标准差: {df['amount'].std():.2f}")

# Method 1: Z-score / 方法一：Z-score
mean = df["amount"].mean()
std = df["amount"].std()
df["z_score"] = (df["amount"] - mean) / std

print("\n--- Z-score Method (|z| > 3) ---")
outliers_z = df[abs(df["z_score"]) > 3]
print("Z-score 发现的异常:")
print(outliers_z[["order_id", "amount", "z_score"]])

# Method 2: IQR / 方法二：四分位距
Q1 = df["amount"].quantile(0.25)
Q3 = df["amount"].quantile(0.75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

print(f"\n--- IQR Method (范围: {lower_bound:.2f} ~ {upper_bound:.2f}) ---")
outliers_iqr = df[(df["amount"] < lower_bound) | (df["amount"] > upper_bound)]
print("IQR 发现的异常:")
print(outliers_iqr[["order_id", "amount"]])`,
            explanation: '使用 Z-score 和 IQR 检测异常值'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: 'How to detect missing values?',
            type: 'multiple-choice',
            options: [
              'df.isnull().sum()',
              'df.empty()',
              'df.na()',
              'df.null()'
            ],
            answer: 'df.isnull().sum()',
            explanation: 'isnull() returns boolean DataFrame, sum() counts True per column. 统计每列缺失数量。'
          },
          {
            id: 'ex2',
            question: 'In IQR method, Q1=100, Q3=200. What is the upper bound?',
            type: 'multiple-choice',
            options: [
              '350',
              '250',
              '150',
              '300'
            ],
            answer: '350',
            explanation: 'IQR = 200-100=100, Upper bound = Q3 + 1.5×IQR = 200 + 150 = 350.'
          }
        ]
      }
    ]
  },
  {
    id: 'project4',
    title: '项目4：转化漏斗分析',
    description: '分析从浏览到购买的转化漏斗，识别流失环节',
    icon: 'trending-up',
    order: 4,
    lessons: [
      {
        id: 'funnel-intro',
        title: 'Funnel Analysis Basics / 漏斗分析基础',
        content: `## Conversion Funnel Analysis 转化漏斗分析

Funnel analysis tracks how many users progress through each stage of a defined journey.
漏斗分析追踪用户在每个环节的留存情况。

### Typical E-commerce Funnel 典型电商漏斗

1. **Visit (浏览)**: Users visit the site / 用户进入网站
2. **Product View (商品浏览)**: View a product page / 浏览商品页
3. **Add to Cart (加购)**: Add items to cart / 加入购物车
4. **Checkout (结算)**: Start the checkout process / 进入结算环节
5. **Purchase (购买)**: Complete the transaction / 完成支付

### Key Metrics 核心指标

- **Conversion Rate (转化率)**: Percentage moving to next stage
  进入下一环节的用户百分比
- **Drop-off Rate (流失率)**: Percentage leaving at each stage
  每个环节离开的用户百分比
- **Overall Conversion (整体转化率)**: From first to final stage
  从第一步到最后一步的整体转化率

### Formula 公式
\`\`\`python
Conversion Rate = (Users at Stage N) / (Users at Stage N-1) * 100%
Drop-off Rate = 100% - Conversion Rate
\`\`\``,
        examples: [
          {
            id: 'ex1',
            code: `import pandas as pd

# Sample funnel data / 示例漏斗数据
funnel_data = {
    "stage": ["Visit 浏览", "Product View 商品浏览", "Add to Cart 加购", "Checkout 结算", "Purchase 购买"],
    "users": [10000, 6500, 3500, 2000, 1200]
}

df = pd.DataFrame(funnel_data)

# Calculate conversion metrics / 计算转化指标
df["next_stage_users"] = df["users"].shift(-1)
df["conversion_rate"] = (df["next_stage_users"] / df["users"] * 100).round(2)
df["drop_off"] = df["users"] - df["next_stage_users"]
df["drop_off_rate"] = (100 - df["conversion_rate"]).fillna(0).round(2)

print("=== Conversion Funnel 转化漏斗 ===")
print(df[["stage", "users", "conversion_rate", "drop_off", "drop_off_rate"]].to_string())

print("\n=== Key Insights 关键洞察 ===")
worst_stage = df[df["drop_off_rate"] == df["drop_off_rate"].max()].iloc[0]
print(f"最高流失环节: {worst_stage['stage']} ({worst_stage['drop_off_rate']}%)")
print(f"整体转化率: {df.iloc[-1]['users'] / df.iloc[0]['users'] * 100:.2f}%")
print(f"平均单环节转化率: {df['conversion_rate'].mean():.2f}%")`,
            explanation: '计算转化漏斗和各环节流失率'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: 'If 100 users visit and 25 purchase, what is overall conversion rate?',
            type: 'multiple-choice',
            options: ['25%', '4%', '75%', '20%'],
            answer: '25%',
            explanation: 'Overall conversion = 25/100 * 100% = 25%. 整体转化率 = 25/100 = 25%'
          },
          {
            id: 'ex2',
            question: 'What does a high drop-off at Checkout stage suggest?',
            type: 'multiple-choice',
            options: [
              'Checkout process is too complex / 结算流程太复杂',
              'Products are too cheap / 商品太便宜',
              'Website is fast / 网站很快',
              'Too many payment options / 支付方式太多'
            ],
            answer: 'Checkout process is too complex / 结算流程太复杂',
            explanation: 'High drop-off at checkout signals friction in the payment flow. 结算环节流失高 = 支付流程有障碍。'
          }
        ]
      }
    ]
  },
  {
    id: 'project5',
    title: '项目5：销售趋势与季节性分析',
    description: '分析销售趋势和季节性，使用时间序列方法预测未来销售',
    icon: 'line-chart',
    order: 5,
    lessons: [
      {
        id: 'timeseries-intro',
        title: 'Time Series Analysis Basics / 时间序列基础',
        content: `## Time Series Analysis 时间序列分析

Time series data has four components.
时间序列数据由四个核心成分组成。

### Four Components 四个组成部分

1. **Trend (趋势)**: Long-term direction (up / down / flat)
   长期方向（上升/下降/平稳）
2. **Seasonality (季节性)**: Regular patterns (daily / monthly / yearly)
   规律的周期性模式（日/月/年）
3. **Cyclical (周期性)**: Irregular long-term fluctuations
   不规则的长期波动
4. **Noise (噪声)**: Random variation / 随机波动

### Common Analysis Methods 常用分析方法

1. **Moving Average (移动平均)**: Smooths out short-term fluctuations
   平滑短期波动，看清长期趋势
2. **YoY Comparison (同比)**: Compare with same period last year
   与去年同期比较，消除季节性影响
3. **MoM Comparison (环比)**: Compare with previous period
   与前一期比较，看短期变化
4. **Decomposition (分解)**: Separate trend from seasonality
   分离趋势与季节性成分

### Key Pandas Functions 常用函数
- resample(): Aggregate by time period / 按时间周期聚合
- rolling(): Calculate moving statistics / 计算移动统计量
- shift(): Compare with previous periods / 与前期比较计算变化`,
        examples: [
          {
            id: 'ex1',
            code: `import pandas as pd
import numpy as np

# Create synthetic sales data / 创建模拟销售数据
np.random.seed(42)
dates = pd.date_range("2023-01-01", periods=365, freq="D")

# Simulate trend + seasonality + noise / 模拟趋势+季节+噪声
trend = np.linspace(100, 200, 365)
seasonality = 30 * np.sin(np.arange(365) * 2 * np.pi / 365)
noise = np.random.normal(0, 10, 365)
sales = trend + seasonality + noise

df = pd.DataFrame({"date": dates, "sales": sales})
df = df.set_index("date")

print("=== Daily Sales 日销售数据 (前10天) ===")
print(df.head(10))

# Resample to monthly / 按月聚合
monthly = df.resample("ME").sum()
print("\n=== Monthly Sales 月度销售 ===")
print(monthly.head(12).round(2))

# Moving averages / 移动平均
df["7_day_MA"] = df["sales"].rolling(window=7).mean()
df["30_day_MA"] = df["sales"].rolling(window=30).mean()

print("\n=== With Moving Averages (含移动平均, 最后10天) ===")
print(df.tail(10).round(2))`,
            explanation: '创建并分析时间序列销售数据'
          },
          {
            id: 'ex2',
            code: `import pandas as pd
import numpy as np

# Create 2 years of data / 创建2年数据
np.random.seed(42)
dates = pd.date_range("2023-01-01", periods=730, freq="D")
trend = np.linspace(100, 150, 730)
seasonal = 20 * np.sin(np.arange(730) * 2 * np.pi / 365)
noise = np.random.normal(0, 10, 730)
sales = trend + seasonal + noise

df = pd.DataFrame({"date": dates, "sales": sales})
df = df.set_index("date")

# Monthly aggregation / 月度聚合
monthly = df.resample("ME").sum()

# YoY and MoM / 同比与环比
monthly["prev_month"] = monthly["sales"].shift(1)
monthly["mom_growth"] = ((monthly["sales"] - monthly["prev_month"]) / monthly["prev_month"] * 100).round(2)

monthly["prev_year"] = monthly["sales"].shift(12)
monthly["yoy_growth"] = ((monthly["sales"] - monthly["prev_year"]) / monthly["prev_year"] * 100).round(2)

print("=== YoY / MoM Growth 同比环比增长 (后6个月) ===")
result = monthly[["sales", "mom_growth", "yoy_growth"]].tail(6).round(2)
print(result)

print("\n=== Summary 总结 ===")
avg_yoy = monthly["yoy_growth"].dropna().mean()
avg_mom = monthly["mom_growth"].dropna().mean()
print(f"平均同比增长率: {avg_yoy:.2f}%")
print(f"平均环比增长率: {avg_mom:.2f}%")`,
            explanation: '计算同比 (YoY) 和环比 (MoM) 增长率'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: 'What does pandas resample("W") do?',
            type: 'multiple-choice',
            options: [
              'Resample by week / 按周聚合',
              'Resample by month / 按月聚合',
              'Resample by day / 按日聚合',
              'Resample by year / 按年聚合'
            ],
            answer: 'Resample by week / 按周聚合',
            explanation: 'W = Weekly aggregation. W 代表按周聚合数据。'
          },
          {
            id: 'ex2',
            question: 'Why use YoY (year-over-year) instead of MoM?',
            type: 'multiple-choice',
            options: [
              'Eliminates seasonal effects / 消除季节性影响',
              'Faster to calculate / 计算更快',
              'Uses less data / 使用数据更少',
              'Only works for daily data / 只适用于日数据'
            ],
            answer: 'Eliminates seasonal effects / 消除季节性影响',
            explanation: 'YoY compares to the same period last year, removing seasonal bias. 同比比较消除季节性影响。'
          }
        ]
      }
    ]
  },
  {
    id: 'project6',
    title: '项目6：用户复购间隔与生命周期',
    description: '分析用户复购行为，构建客户生命周期和活跃度衰减模型',
    icon: 'clock',
    order: 6,
    lessons: [
      {
        id: 'repurchase-intro',
        title: 'Customer Lifecycle Analysis / 客户生命周期分析',
        content: `## Customer Lifecycle & Repurchase Analysis 客户生命周期与复购分析

### Customer Lifecycle Stages 客户生命周期阶段

1. **Acquisition (获取)**: New customer acquisition / 吸引新客户
2. **Activation (激活)**: First purchase / 首次购买
3. **Retention (留存)**: Repeated purchases / 重复购买
4. **Revival (唤醒)**: Re-engagement of inactive users / 唤醒不活跃用户
5. **Churn (流失)**: No recent activity / 长期无活动

### Key Metrics 核心指标

- **Repurchase Interval (复购间隔)**: Average days between consecutive purchases
  连续两次购买之间的平均天数
- **Purchase Frequency (购买频次)**: Orders per customer per time period
  每个客户在单位时间内的订单数
- **Customer Lifetime Value (CLV, 客户终身价值)**: Total revenue from a customer
  一个客户的总贡献价值
- **Churn Rate (流失率)**: Percentage of customers stopping activity
  停止活动的客户百分比

### Engagement Decay Model 活跃度衰减模型

Customers become less active over time without purchases.
无购买行为时，客户活跃度随时间衰减。

Simple exponential decay:
简单指数衰减公式：
\`\`\`python
engagement(t) = initial_engagement * exp(-lambda * t)
where t = days since last purchase
t = 距上次购买的天数
lambda = decay rate / 衰减系数
\`\`\``,
        examples: [
          {
            id: 'ex1',
            code: `import pandas as pd
import numpy as np
from datetime import timedelta

# Create sample repurchase data / 创建复购数据
np.random.seed(42)

orders = []
for customer_id in range(1, 6):  # 5 customers
    n_orders = np.random.randint(3, 8)  # 3-7 orders each
    base_date = pd.Timestamp("2024-01-01")
    current_date = base_date
    
    for i in range(n_orders):
        interval_days = np.random.randint(5, 30)
        current_date = current_date + timedelta(days=interval_days)
        orders.append({
            "customer_id": customer_id,
            "order_date": current_date,
            "amount": np.random.uniform(50, 500)
        })

df = pd.DataFrame(orders)
print("=== Repurchase Orders 复购订单数据 ===")
print(df)

# Calculate intervals / 计算购买间隔
df = df.sort_values(["customer_id", "order_date"])
df["prev_order_date"] = df.groupby("customer_id")["order_date"].shift(1)
df["repurchase_interval"] = (df["order_date"] - df["prev_order_date"]).dt.days

print("\n=== Purchase Intervals 每次购买间隔 ===")
print(df[["customer_id", "order_date", "repurchase_interval"]].dropna())

# Average per customer / 按客户统计
avg_interval = df.groupby("customer_id")["repurchase_interval"].mean()
total_spend = df.groupby("customer_id")["amount"].sum()

print("\n=== Customer Summary 客户汇总 ===")
for cid in avg_interval.index:
    print(f"客户 {cid}: 平均复购间隔 {avg_interval[cid]:.1f} 天, 总消费 {total_spend[cid]:.2f}")`,
            explanation: '计算每个客户的复购间隔和消费情况'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: 'What does Repurchase Interval measure?',
            type: 'multiple-choice',
            options: [
              'Days between consecutive purchases / 连续两次购买之间的天数',
              'Days since first purchase / 距首次购买天数',
              'Days since last purchase / 距最近购买天数',
              'Total days as customer / 成为客户的总天数'
            ],
            answer: 'Days between consecutive purchases / 连续两次购买之间的天数',
            explanation: 'Repurchase interval measures frequency of repeat buys. 复购间隔衡量重复购买的频繁程度。'
          },
          {
            id: 'ex2',
            question: 'Which pandas function helps calculate purchase intervals?',
            type: 'multiple-choice',
            options: [
              'groupby + shift() / 分组 + 移位比较',
              'merge() + join()',
              'pivot_table()',
              'crosstab()'
            ],
            answer: 'groupby + shift() / 分组 + 移位比较',
            explanation: 'shift(1) gets the previous row for computing differences. shift() 获取上一行以计算差值。'
          }
        ]
      }
    ]
  },
  {
    id: 'project7',
    title: '项目7：情感分析与评分不一致检测',
    description: '分析评论文本情感，识别评分与情感不一致的样本',
    icon: 'message-circle',
    order: 7,
    lessons: [
      {
        id: 'sentiment-intro',
        title: 'Sentiment Analysis Basics / 情感分析基础',
        content: `## Sentiment Analysis 情感分析

Sentiment analysis determines the emotional tone behind text.
情感分析用于判断文本所表达的情感倾向。

### Approaches 主要方法

1. **Lexicon-based (词典法)**: Use predefined sentiment dictionaries
   使用预定义的情感词典打分
2. **Machine Learning (机器学习)**: Train models on labeled data
   在标注数据上训练分类模型
3. **Deep Learning (深度学习)**: Neural networks (BERT, etc.)
   使用神经网络模型（如 BERT）

### Common Tools 常用工具

- **SnowNLP**: Chinese text sentiment / 中文文本情感分析
- **TextBlob / VADER**: English text / 英文文本情感分析

### Rating-Sentiment Mismatch 评分与情感不一致

Sometimes ratings do not match text sentiment:
有时用户给出的星级评分与文字情感不一致：
- High rating + negative review = potential product issue
  高评分 + 负面评论 = 产品可能有问题但用户默认好评
- Low rating + positive review = rating error or quality issue
  低评分 + 正面评论 = 误操作评分或标准差异`,
        examples: [
          {
            id: 'ex1',
            code: `# Simple lexicon-based sentiment scoring
# 基于词典的简易情感评分

positive_words = ["good", "great", "excellent", "amazing", "love", "best", "perfect", "happy", "recommend", "nice"]
negative_words = ["bad", "terrible", "awful", "hate", "worst", "horrible", "poor", "never", "avoid", "broken"]

def simple_sentiment(text):
    text_lower = text.lower()
    pos_count = sum(1 for w in positive_words if w in text_lower)
    neg_count = sum(1 for w in negative_words if w in text_lower)
    score = pos_count - neg_count
    if score > 0:
        return "Positive 正面", score
    elif score < 0:
        return "Negative 负面", score
    else:
        return "Neutral 中性", score

# Sample reviews / 示例评论
reviews = [
    {"rating": 5, "text": "This product is amazing! Best purchase ever!"},
    {"rating": 1, "text": "Terrible quality, I hate it. Never recommend."},
    {"rating": 5, "text": "Good product but shipping was slow and damaged."},
    {"rating": 2, "text": "It works okay, nothing special."},
    {"rating": 4, "text": "Great value for money, very happy with this!"},
    {"rating": 5, "text": "Awful and horrible experience, worst ever."}
]

print("=== Sentiment Analysis 情感分析结果 ===")
for i, review in enumerate(reviews, 1):
    label, score = simple_sentiment(review["text"])
    
    # Check mismatch / 检查不一致
    expected = "Positive" if review["rating"] >= 4 else "Negative" if review["rating"] <= 2 else "Neutral"
    mismatch = "⚠️ MISMATCH 不一致" if "Positive" in expected and "Negative" in label or "Negative" in expected and "Positive" in label else "✓ OK"
    
    print(f"评论{i}: 评分 {review['rating']}星, 情感={label} (得分 {score:+d}), {mismatch}")`,
            explanation: '基于词典进行简易情感分析并识别评分不一致'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: 'What does sentiment analysis primarily determine?',
            type: 'multiple-choice',
            options: [
              'Emotional tone of text / 文本的情感倾向',
              'Text length / 文本长度',
              'Text grammar / 语法正确性',
              'Word frequency / 词频'
            ],
            answer: 'Emotional tone of text / 文本的情感倾向',
            explanation: 'Sentiment analysis detects positive/negative tone. 情感分析判断文本是正面还是负面。'
          },
          {
            id: 'ex2',
            question: 'What can a rating-sentiment mismatch reveal?',
            type: 'multiple-choice',
            options: [
              'Quality issues, rating errors, or hidden problems / 产品质量问题、误评分或隐性问题',
              'High conversion / 高转化率',
              'Fast delivery / 快速配送',
              'Low prices / 低价格'
            ],
            answer: 'Quality issues, rating errors, or hidden problems / 产品质量问题、误评分或隐性问题',
            explanation: 'Mismatches often signal problems like default positive ratings. 不一致通常暗示评分系统有问题。'
          }
        ]
      }
    ]
  },
  {
    id: 'project8',
    title: '项目8：购物车商品推荐系统',
    description: '基于协同过滤算法，为购物车中的商品推荐互补商品',
    icon: 'shopping-bag',
    order: 8,
    lessons: [
      {
        id: 'collaborative-intro',
        title: 'Collaborative Filtering / 协同过滤推荐',
        content: `## Collaborative Filtering 协同过滤

### Types 主要类型

1. **User-based CF (基于用户)**: "Users like you also liked..."
   "和你相似的用户也喜欢..."
2. **Item-based CF (基于商品)**: "Users who bought this also bought..."
   "买了这个的用户也买了..."

### Cosine Similarity 余弦相似度

Measures similarity between items using purchase patterns.
利用购买模式计算商品之间的相似度。

\`\`\`python
cosine(A, B) = (A · B) / (||A|| * ||B||)
Range: -1 (opposite) to 1 (identical)
范围：-1 到 1，越接近 1 越相似
\`\`\`

### Steps for Item-based CF 基于商品的协同过滤步骤

1. Build user-item matrix / 构建用户-商品矩阵
2. Calculate item-item similarity / 计算商品相似度
3. For target item, find similar items / 为目标商品找相似商品
4. Recommend top-N similar items / 推荐 Top-N 相似商品

### Advantages 优势
- No domain knowledge required / 不需要领域知识
- Captures serendipitous recommendations / 能发现意外的推荐
- Scales well with large catalogs / 适用于大规模商品目录`,
        examples: [
          {
            id: 'ex1',
            code: `import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# Sample user-item purchase matrix / 示例用户-商品购买矩阵
items = ["Milk 牛奶", "Bread 面包", "Eggs 鸡蛋", "Butter 黄油", "Cheese 奶酪"]

# Binary purchase data / 1=购买, 0=未购买
data = np.array([
    [1, 1, 1, 0, 0],
    [1, 1, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [1, 0, 1, 0, 1],
    [0, 0, 1, 1, 1],
    [1, 1, 1, 1, 0],
    [0, 1, 0, 1, 1],
])

df = pd.DataFrame(data, columns=items)
print("=== User-Item Matrix 用户-商品矩阵 ===")
print(df)

# Calculate item-item similarity / 计算商品相似度
item_similarity = cosine_similarity(df.T)
sim_df = pd.DataFrame(item_similarity, index=items, columns=items)

print("\n=== Item-Item Cosine Similarity 商品余弦相似度 ===")
print(sim_df.round(3))`,
            explanation: '构建用户-商品矩阵并计算相似度'
          },
          {
            id: 'ex2',
            code: `import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

items = ["Milk 牛奶", "Bread 面包", "Eggs 鸡蛋", "Butter 黄油", "Cheese 奶酪"]
data = np.array([
    [1, 1, 1, 0, 0],
    [1, 1, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [1, 0, 1, 0, 1],
    [0, 0, 1, 1, 1],
    [1, 1, 1, 1, 0],
    [0, 1, 0, 1, 1],
])

item_similarity = cosine_similarity(data.T)
sim_df = pd.DataFrame(item_similarity, index=items, columns=items)

# Recommendation function / 推荐函数
def recommend_items(item_name, top_n=2):
    if item_name not in items:
        return f"Item '{item_name}' not found / 未找到该商品"
    
    similarities = sim_df[item_name].drop(item_name).sort_values(ascending=False)
    top_recs = similarities.head(top_n)
    
    print(f"=== Recommendations for '{item_name}' / '{item_name}'的推荐 ===")
    print(f"基于购物车分析，购买'{item_name}'的用户也常买:")
    for i, (rec_item, score) in enumerate(top_recs.items(), 1):
        print(f"  {i}. {rec_item} (相似度: {score:.3f})")
    return top_recs

# Test recommendations / 测试推荐
print("\n")
recommend_items("Bread 面包", top_n=2)
print("\n")
recommend_items("Eggs 鸡蛋", top_n=2)
print("\n")
recommend_items("Milk 牛奶", top_n=2)`,
            explanation: '为目标商品生成个性化推荐'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: 'What is the range of Cosine Similarity?',
            type: 'multiple-choice',
            options: [
              '-1 to 1',
              '0 to 1',
              '0 to 100',
              '-100 to 100'
            ],
            answer: '-1 to 1',
            explanation: 'Cosine similarity: -1 = opposite, 1 = identical. 余弦相似度范围-1到1，越接近1越相似。'
          },
          {
            id: 'ex2',
            question: '"Users who bought this also bought X" - what type of CF?',
            type: 'multiple-choice',
            options: [
              'Item-based Collaborative Filtering / 基于商品的协同过滤',
              'User-based Collaborative Filtering / 基于用户的协同过滤',
              'Content-based Filtering / 基于内容的过滤',
              'Popularity-based / 基于热度'
            ],
            answer: 'Item-based Collaborative Filtering / 基于商品的协同过滤',
            explanation: 'Item-based CF uses item similarity to recommend complements. 基于商品的CF利用商品相似度推荐互补品。'
          }
        ]
      }
    ]
  },
  {
    id: 'project9',
    title: '项目9：营销活动效果分析',
    description: '使用 A/B 测试和统计检验分析真实促销活动效果',
    icon: 'percent',
    order: 9,
    lessons: [
      {
        id: 'abtest-intro',
        title: 'A/B Testing Basics / A/B 测试基础',
        content: `## A/B Testing A/B 测试

A/B testing compares two versions (A: Control, B: Treatment) to determine which performs better.
A/B 测试比较两个版本（A: 对照组, B: 实验组）以判断哪个效果更好。

### Statistical Tests 统计检验

1. **t-test (t检验)**: Compare means (continuous data)
   比较均值（连续型数据，如客单价）
2. **Chi-square test (卡方检验)**: Compare proportions (conversion rates)
   比较比例（转化率类数据）
3. **p-value (p值)**: Probability of observed result by chance
   结果由随机因素导致的概率

### Interpreting Results 结果解读

- **p-value < 0.05**: Statistically significant / 统计显著
- **Confidence Interval (置信区间)**: Range of plausible values
  真实值可能所在的范围
- **Effect Size (效应量)**: Magnitude of difference
  两组之间差异的大小

### Key Metrics to Test 常用指标
- Conversion Rate / 转化率
- Average Order Value / 平均订单价值
- Click-through Rate / 点击率
- Revenue per User / 每用户收入`,
        examples: [
          {
            id: 'ex1',
            code: `import numpy as np
from scipy import stats

# Simulate A/B test data / 模拟A/B测试数据
np.random.seed(42)

# Control group: 10% conversion / 对照组：10%转化率
control_group = np.random.choice([0, 1], size=1000, p=[0.9, 0.1])

# Treatment group: 14% conversion (better!) / 实验组：14%转化率
treatment_group = np.random.choice([0, 1], size=1000, p=[0.86, 0.14])

print("=== A/B Test: Conversion Rates A/B测试：转化率 ===")
print(f"Control 对照组: {control_group.mean()*100:.2f}% ({control_group.sum()} conversions / 1000 users)")
print(f"Treatment 实验组: {treatment_group.mean()*100:.2f}% ({treatment_group.sum()} conversions / 1000 users)")

# Chi-square test / 卡方检验
conversions = [control_group.sum(), treatment_group.sum()]
total_users = [len(control_group), len(treatment_group)]
non_conversions = [t - c for t, c in zip(total_users, conversions)]
contingency = [
    [conversions[0], non_conversions[0]],
    [conversions[1], non_conversions[1]]
]

chi2, p_value, dof, expected = stats.chi2_contingency(contingency)

print(f"\n=== Chi-square Test 卡方检验 ===")
print(f"Chi-square 值: {chi2:.4f}")
print(f"p-value: {p_value:.6f}")
print(f"Significant 显著? (p<0.05): {'YES 是' if p_value < 0.05 else 'NO 否'}")

if p_value < 0.05:
    lift = (treatment_group.mean() - control_group.mean()) / control_group.mean() * 100
    print(f"提升率 Lift: {lift:.2f}%")`,
            explanation: '执行 A/B 测试并用卡方检验验证结果'
          },
          {
            id: 'ex2',
            code: `import numpy as np
from scipy import stats

# A/B test for average order value / 平均订单价值的A/B测试
np.random.seed(42)

# Control: mean = $50, std = $15 / 对照组：平均50元
control = np.random.normal(50, 15, 1000)

# Treatment: mean = $55 (10% lift) / 实验组：平均55元
treatment = np.random.normal(55, 15, 1000)

print("=== A/B Test: Average Order Value / 平均订单价值 ===")
print(f"Control 对照组: mean=\${control.mean():.2f}, std=\${control.std():.2f}")
print(f"Treatment 实验组: mean=\${treatment.mean():.2f}, std=\${treatment.std():.2f}")
lift = (treatment.mean() - control.mean()) / control.mean() * 100
print(f"提升率 Lift: {lift:.2f}%")

# Two-sample t-test / 双样本 t 检验
t_stat, p_value = stats.ttest_ind(treatment, control)

print(f"\n=== Two-Sample t-test 双样本t检验 ===")
print(f"t-statistic t值: {t_stat:.4f}")
print(f"p-value: {p_value:.6f}")
print(f"Significant 显著? (p<0.05): {'YES 是' if p_value < 0.05 else 'NO 否'}")

# 95% Confidence Interval for difference / 95%置信区间
diff = treatment.mean() - control.mean()
se_diff = np.sqrt(control.var()/len(control) + treatment.var()/len(treatment))
ci_lower = diff - 1.96 * se_diff
ci_upper = diff + 1.96 * se_diff

print(f"\n95% CI for difference 差异置信区间: [\${ci_lower:.2f}, \${ci_upper:.2f}]")
print(f"解释: 实验组比对照组平均高 \${diff:.2f}，95%可能在 \${ci_lower:.2f} ~ \${ci_upper:.2f} 之间")`,
            explanation: '使用 t-test 比较两组均值差异'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: 'What does p-value < 0.05 typically mean?',
            type: 'multiple-choice',
            options: [
              'Statistically significant difference / 存在统计显著的差异',
              'No difference exists / 无差异',
              'The test is inconclusive / 测试无结论',
              'An error occurred / 计算出错'
            ],
            answer: 'Statistically significant difference / 存在统计显著的差异',
            explanation: 'p<0.05 means we reject the null hypothesis of no difference. p<0.05 表示我们拒绝"无差异"的原假设。'
          },
          {
            id: 'ex2',
            question: 'When should you use t-test vs Chi-square test?',
            type: 'multiple-choice',
            options: [
              't-test for means, Chi-square for proportions / t检验比较均值，卡方检验比较比例',
              'Both are interchangeable / 两者可互换',
              't-test for proportions / t检验比较比例',
              'Chi-square for means / 卡方检验比较均值'
            ],
            answer: 't-test for means, Chi-square for proportions / t检验比较均值，卡方检验比较比例',
            explanation: 'Continuous = t-test, categorical/conversion = Chi-square. 连续数据用t检验，分类/转化数据用卡方检验。'
          }
        ]
      }
    ]
  },
  {
    id: 'project10',
    title: '项目10：端到端数据清洗与画像分析',
    description: '综合应用技能：完整的数据清洗与用户画像分析',
    icon: 'file-report',
    order: 10,
    lessons: [
      {
        id: 'end2end-intro',
        title: 'End-to-End Analysis Pipeline / 端到端数据分析流程',
        content: `## Complete Data Analysis Pipeline 完整的数据分析流程

A complete analysis follows these stages.
一次完整的数据分析遵循以下阶段。

### 1. Data Collection (数据采集)
- Import from various sources / 从多源导入数据
- API calls, databases, CSV files / API、数据库、CSV

### 2. Data Cleaning (数据清洗)
- Handle missing values / 处理缺失值
- Remove duplicates / 删除重复
- Fix invalid values / 修正无效值
- Standardize formats / 标准化格式

### 3. Data Integration (数据整合)
- Merge multiple datasets / 合并多个数据集
- Join tables / 连接表

### 4. Feature Engineering (特征工程)
- Create new features / 创建新特征
- Encode categorical variables / 编码分类变量
- Scale numerical features / 数值标准化

### 5. Modeling & Analysis (建模与分析)
- Build predictive models / 构建预测模型
- Clustering & segmentation / 聚类与分群

### 6. Reporting & Insights (报告与洞察)
- Visualizations / 可视化
- Key findings / 关键发现
- Actionable recommendations / 可执行的建议`,
        examples: [
          {
            id: 'ex1',
            code: `import pandas as pd
import numpy as np

# Create raw data with issues / 创建含问题的原始数据
np.random.seed(42)

data = {
    "order_id": list(range(1, 101)),
    "customer_id": np.random.randint(1, 30, 100).tolist(),
    "product": np.random.choice(["A", "B", "C", "D"], 100).tolist(),
    "quantity": np.random.choice([1, 2, 3, 5, 10], 100).tolist(),
    "price": np.random.uniform(10, 500, 100).round(2),
    "order_date": pd.date_range("2024-01-01", periods=100, freq="D").tolist()
}

raw_df = pd.DataFrame(data)

# Introduce issues / 加入各种数据问题
raw_df.loc[5, "quantity"] = np.nan
raw_df.loc[10, "customer_id"] = np.nan
raw_df.loc[15, "price"] = -100
raw_df.loc[50, "quantity"] = -3
raw_df = pd.concat([raw_df, raw_df.iloc[[0]]]).reset_index(drop=True)

print("=== Raw Data Issues 原始数据问题检查 ===")
print(f"总记录数: {len(raw_df)}")
print(f"缺失值: {raw_df.isnull().sum().sum()}")
print(f"   - customer_id 缺失: {raw_df['customer_id'].isnull().sum()}")
print(f"   - quantity 缺失: {raw_df['quantity'].isnull().sum()}")
print(f"负价格记录: {(raw_df['price'] < 0).sum()}")
print(f"负数量记录: {(raw_df['quantity'] < 0).sum()}")
print(f"重复记录: {raw_df.duplicated().sum()}")`,
            explanation: '检测原始数据中的各种质量问题'
          },
          {
            id: 'ex2',
            code: `import pandas as pd
import numpy as np

# Recreate raw data / 重新创建原始数据
np.random.seed(42)
data = {
    "order_id": list(range(1, 101)),
    "customer_id": np.random.randint(1, 30, 100).tolist(),
    "product": np.random.choice(["A", "B", "C", "D"], 100).tolist(),
    "quantity": np.random.choice([1, 2, 3, 5, 10], 100).tolist(),
    "price": np.random.uniform(10, 500, 100).round(2),
    "order_date": pd.date_range("2024-01-01", periods=100, freq="D").tolist()
}
raw_df = pd.DataFrame(data)
raw_df.loc[5, "quantity"] = np.nan
raw_df.loc[10, "customer_id"] = np.nan
raw_df.loc[15, "price"] = -100
raw_df.loc[50, "quantity"] = -3
raw_df = pd.concat([raw_df, raw_df.iloc[[0]]]).reset_index(drop=True)

print("=== Step 1: Cleaning 清洗步骤 ===")

# Step 1: Remove duplicates / 去重
df = raw_df.drop_duplicates()
print(f"去重后: {len(df)} 行")

# Step 2: Handle missing values / 处理缺失值 - 删除无效客户
df = df.dropna(subset=["customer_id"])
print(f"删除缺失客户: {len(df)} 行")

# Step 3: Fill quantity missing with median / 用中位数填充数量缺失
df["quantity"] = df["quantity"].fillna(df["quantity"].median())

# Step 4: Fix invalid values / 修正异常值
df = df[df["price"] > 0]
print(f"过滤负价格: {len(df)} 行")
df["quantity"] = df["quantity"].abs()

print(f"\n=== Step 2: Feature Engineering 特征工程 ===")
df["total_amount"] = df["quantity"] * df["price"]
df["order_month"] = pd.to_datetime(df["order_date"]).dt.month

print(f"最终数据量: {len(df)} 行")
print(f"特征字段: {list(df.columns)}")

print("\n=== Step 3: Customer Profiling 用户画像 ===")
profile = df.groupby("customer_id").agg({
    "order_id": "count",
    "total_amount": ["sum", "mean"],
    "quantity": "mean"
}).round(2)
profile.columns = ["订单数 orders", "总消费 total_spend", "平均订单额 avg_order", "平均数量 avg_qty"]
print(profile.sort_values("总消费 total_spend", ascending=False).head(10))`,
            explanation: '完整的数据清洗流程与客户画像构建'
          }
        ],
        exercises: [
          {
            id: 'ex1',
            question: 'What is typically the FIRST step in a data analysis pipeline?',
            type: 'multiple-choice',
            options: [
              'Data Collection / 数据采集',
              'Data Cleaning / 数据清洗',
              'Modeling / 建模',
              'Visualization / 可视化'
            ],
            answer: 'Data Collection / 数据采集',
            explanation: 'Analysis starts with gathering raw data. 分析从采集原始数据开始，然后才是清洗和分析。'
          },
          {
            id: 'ex2',
            question: 'What should be done with negative prices in cleaning?',
            type: 'multiple-choice',
            options: [
              'Remove them or investigate source / 删除或调查产生原因',
              'Keep them as-is / 原样保留',
              'Convert to NaN only / 仅转成NaN',
              'Multiply by -1 / 乘以-1变正'
            ],
            answer: 'Remove them or investigate source / 删除或调查产生原因',
            explanation: 'Negative prices are invalid and must be removed or corrected. 负价格是无效的，需删除或修正。'
          }
        ]
      }
    ]
  }
];
