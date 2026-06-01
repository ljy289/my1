import { motion } from 'framer-motion';
import { BookOpen, Code, BarChart3, BrainCircuit, CheckCircle2, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { courses } from '../data/courses';

const Home = () => {
  const navigate = useNavigate();
  const { totalPoints, completedLessons, completedExercises, userProgress } = useStore();
  
  const totalLessons = courses.reduce((sum, course) => sum + course.lessons.length, 0);
  const progressPercent = Math.round((completedLessons / totalLessons) * 100);
  
  const features = [
    {
      icon: BookOpen,
      title: '完整课程体系',
      description: '从Python基础到高级数据分析，循序渐进的学习路径'
    },
    {
      icon: Code,
      title: '互动式学习',
      description: '边学边练，实时反馈，巩固所学知识'
    },
    {
      icon: BarChart3,
      title: '实战项目',
      description: '真实商业场景案例，提升实战能力'
    },
    {
      icon: BrainCircuit,
      title: '测评系统',
      description: '阶段性测评，检验学习成果'
    }
  ];
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-20 pb-16 px-4"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6"
          >
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-blue-400 text-sm font-medium">专为商务数据分析专业打造</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            掌握数据分析
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              开启数据驱动决策之旅
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 mb-10 max-w-3xl mx-auto">
            从Python编程到商业智能，系统学习数据分析核心技能，
            通过交互式练习和实战项目快速成长
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/courses')}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl text-lg"
            >
              开始学习
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/assessment')}
              className="px-8 py-4 bg-slate-800 text-white font-semibold rounded-xl text-lg border border-slate-700"
            >
              能力测评
            </motion.button>
          </div>
        </div>
      </motion.div>
      
      {/* Stats Section */}
      <div className="py-12 px-4 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: '学习积分', value: totalPoints, icon: Star },
              { label: '完成课程', value: completedLessons, icon: CheckCircle2 },
              { label: '完成练习', value: completedExercises, icon: Code },
              { label: '学习进度', value: `${progressPercent}%`, icon: BarChart3 }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-slate-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">为什么选择我们</h2>
            <p className="text-slate-400 text-lg">全方位的学习体验，助力你成为数据分析师</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Courses Preview */}
      <div className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">热门课程</h2>
            <p className="text-slate-400 text-lg">精选核心课程，快速提升数据分析能力</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.slice(0, 3).map((course, index) => {
              const progress = userProgress[course.id];
              const courseProgress = progress 
                ? Math.round((progress.completedLessons.length / course.lessons.length) * 100)
                : 0;
              
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -4 }}
                  onClick={() => navigate(`/courses/${course.id}/learn`)}
                  className="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl cursor-pointer"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{course.title}</h3>
                  <p className="text-slate-400 mb-4">{course.description}</p>
                  
                  {courseProgress > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400">学习进度</span>
                        <span className="text-blue-400">{courseProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                          style={{ width: `${courseProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center text-sm text-slate-500">
                    <span>{course.lessons.length} 章节</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          <div className="text-center mt-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/courses')}
              className="px-6 py-3 bg-slate-800 text-white font-semibold rounded-xl border border-slate-700"
            >
              查看全部课程
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
