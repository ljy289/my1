import { motion } from 'framer-motion';
import { Trophy, Star, CheckCircle2, BookOpen, Code, BrainCircuit, TrendingUp, Award, Zap } from 'lucide-react';
import { useStore } from '../store/useStore';
import { badges } from '../data/badges';
import { courses } from '../data/courses';
import { assessments } from '../data/assessments';

const Achievements = () => {
  const { userProgress, userBadges, totalPoints, completedLessons, completedExercises, assessmentResults } = useStore();
  
  const unlockedCount = Object.values(userBadges).filter(b => b.unlocked).length;
  const totalBadges = badges.length;
  const completedCourses = Object.values(userProgress).filter(p => p.completed).length;
  
  const getBadgeIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      Trophy, Star, CheckCircle2, BookOpen, Code, BrainCircuit, TrendingUp, Award, Zap
    };
    return icons[iconName] || Trophy;
  };
  
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block mb-4"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto">
              <Trophy className="w-12 h-12 text-white" />
            </div>
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">成就中心</h1>
          <p className="text-slate-400">查看你的学习进度和获得的成就</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: '学习积分', value: totalPoints, icon: Star, color: 'from-yellow-400 to-orange-500' },
            { label: '完成课时', value: completedLessons, icon: CheckCircle2, color: 'from-green-400 to-emerald-500' },
            { label: '完成练习', value: completedExercises, icon: Code, color: 'from-blue-400 to-cyan-500' },
            { label: '获得徽章', value: `${unlockedCount}/${totalBadges}`, icon: Trophy, color: 'from-purple-400 to-pink-500' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 text-center"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
        
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
            成就徽章
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {badges.map((badge, index) => {
              const isUnlocked = userBadges[badge.id]?.unlocked;
              const Icon = getBadgeIcon(badge.icon);
              
              return (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className={`p-6 rounded-2xl border transition-all ${
                    isUnlocked
                      ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30'
                      : 'bg-slate-800/30 border-slate-700 opacity-50'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                    isUnlocked
                      ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
                      : 'bg-slate-700'
                  }`}>
                    <Icon className={`w-8 h-8 ${isUnlocked ? 'text-white' : 'text-slate-500'}`} />
                  </div>
                  <h3 className={`text-lg font-semibold text-center mb-2 ${
                    isUnlocked ? 'text-white' : 'text-slate-500'
                  }`}>
                    {badge.name}
                  </h3>
                  <p className="text-sm text-center text-slate-400">
                    {badge.description}
                  </p>
                  {isUnlocked && userBadges[badge.id]?.unlockedAt && (
                    <p className="text-xs text-center text-yellow-400 mt-2">
                      获得于 {new Date(userBadges[badge.id].unlockedAt).toLocaleDateString('zh-CN')}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
        
        {assessmentResults.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <BrainCircuit className="w-6 h-6 mr-2 text-blue-400" />
              测评记录
            </h2>
            
            <div className="space-y-4">
              {assessmentResults.map((result, index) => {
                const assessment = assessments.find(a => a.id === result.assessmentId);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 flex items-center justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {assessment?.title || '未知测评'}
                      </h3>
                      <p className="text-sm text-slate-400">
                        {new Date(result.completedAt).toLocaleDateString('zh-CN')}
                      </p>
                    </div>
                    <div className={`text-3xl font-bold ${
                      result.score >= 80 ? 'text-green-400' :
                      result.score >= 60 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {result.score}分
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Achievements;
