import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, CheckCircle2, XCircle, ChevronRight, ChevronLeft, Trophy, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { assessments } from '../data/assessments';
import { useStore } from '../store/useStore';
import { badges } from '../data/badges';

const Assessment = () => {
  const navigate = useNavigate();
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [newBadges, setNewBadges] = useState<string[]>([]);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  
  const { completeAssessment, checkBadges, unlockBadge, assessmentResults } = useStore();
  
  const assessment = selectedAssessment ? assessments.find(a => a.id === selectedAssessment) : null;
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (assessment && !isCompleted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [assessment, isCompleted, timeLeft]);
  
  const startAssessment = (assessmentId: string) => {
    setSelectedAssessment(assessmentId);
    setCurrentQuestion(0);
    setAnswers({});
    setIsCompleted(false);
    const selected = assessments.find(a => a.id === assessmentId);
    if (selected) {
      setTimeLeft(selected.timeLimit);
    }
  };
  
  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };
  
  const handleNext = () => {
    if (assessment && currentQuestion < assessment.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };
  
  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };
  
  const handleSubmit = () => {
    if (!assessment) return;
    
    let correctCount = 0;
    assessment.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    
    const score = Math.round((correctCount / assessment.questions.length) * 100);
    completeAssessment(assessment.id, score);
    
    const unlockedBadges = checkBadges();
    if (unlockedBadges.length > 0) {
      unlockedBadges.forEach(badgeId => unlockBadge(badgeId));
      setNewBadges(unlockedBadges);
      setShowBadgeModal(true);
    }
    
    setIsCompleted(true);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  if (selectedAssessment && assessment) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {!isCompleted ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-white">{assessment.title}</h1>
                  <p className="text-slate-400">{assessment.description}</p>
                </div>
                <div className={`px-4 py-2 rounded-lg font-mono font-semibold ${
                  timeLeft < 60 ? 'bg-red-500/20 text-red-400' : 'bg-slate-800 text-white'
                }`}>
                  {formatTime(timeLeft)}
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-400">
                    问题 {currentQuestion + 1} / {assessment.questions.length}
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all"
                    style={{ width: `${((currentQuestion + 1) / assessment.questions.length) * 100}%` }}
                  />
                </div>
              </div>
              
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8"
              >
                <h2 className="text-xl font-semibold text-white mb-6">
                  {assessment.questions[currentQuestion].question}
                </h2>
                
                <div className="space-y-3">
                  {assessment.questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(assessment.questions[currentQuestion].id, option)}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        answers[assessment.questions[currentQuestion].id] === option
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <span className="text-slate-300">{option}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
              
              <div className="flex items-center justify-between mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePrev}
                  disabled={currentQuestion === 0}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all ${
                    currentQuestion === 0
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-slate-800 text-white hover:bg-slate-700'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>上一题</span>
                </motion.button>
                
                {currentQuestion === assessment.questions.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl"
                  >
                    提交答案
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    disabled={!answers[assessment.questions[currentQuestion].id]}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all ${
                      !answers[assessment.questions[currentQuestion].id]
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    }`}
                  >
                    <span>下一题</span>
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                )}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <Trophy className="w-16 h-16 text-white" />
              </div>
              
              <h1 className="text-3xl font-bold text-white mb-2">测评完成！</h1>
              
              {(() => {
                let correctCount = 0;
                assessment.questions.forEach(q => {
                  if (answers[q.id] === q.correctAnswer) {
                    correctCount++;
                  }
                });
                const score = Math.round((correctCount / assessment.questions.length) * 100);
                
                return (
                  <>
                    <div className={`text-6xl font-bold mb-4 ${
                      score >= 80 ? 'text-green-400' : score >= 60 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {score}分
                    </div>
                    <p className="text-slate-400 mb-8">
                      正确 {correctCount} / {assessment.questions.length} 题
                    </p>
                  </>
                );
              })()}
              
              <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-8 text-left">
                <h3 className="text-lg font-semibold text-white mb-4">答案解析</h3>
                <div className="space-y-4">
                  {assessment.questions.map((q, index) => {
                    const isCorrect = answers[q.id] === q.correctAnswer;
                    return (
                      <div key={q.id} className="p-4 bg-slate-700/30 rounded-xl">
                        <div className="flex items-start space-x-3">
                          <div className={`mt-1 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                            {isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-white mb-2">{index + 1}. {q.question}</p>
                            {!isCorrect && (
                              <>
                                <p className="text-sm text-red-400 mb-1">
                                  你的答案：{answers[q.id]}
                                </p>
                                <p className="text-sm text-green-400 mb-1">
                                  正确答案：{q.correctAnswer}
                                </p>
                              </>
                            )}
                            <p className="text-sm text-slate-400">{q.explanation}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => startAssessment(assessment.id)}
                  className="flex items-center space-x-2 px-6 py-3 bg-slate-800 text-white font-semibold rounded-xl border border-slate-700"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>重新测试</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/courses')}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl"
                >
                  继续学习
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
        
        <AnimatePresence>
          {showBadgeModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
              onClick={() => setShowBadgeModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Trophy className="w-10 h-10 text-white" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white mb-2">
                    恭喜！获得新徽章
                  </h2>
                  
                  <p className="text-slate-400 mb-6">
                    你解锁了 {newBadges.length} 个新成就！
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {newBadges.map(badgeId => {
                      const badge = badges.find(b => b.id === badgeId);
                      if (!badge) return null;
                      const Icon = require('lucide-react')[badge.icon as keyof typeof import('lucide-react')];
                      
                      return (
                        <div key={badgeId} className="flex items-center space-x-4 p-4 bg-slate-800 rounded-xl">
                          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-lg flex items-center justify-center">
                            <Icon className="w-6 h-6 text-yellow-400" />
                          </div>
                          <div className="text-left">
                            <h3 className="text-white font-semibold">{badge.name}</h3>
                            <p className="text-slate-400 text-sm">{badge.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowBadgeModal(false)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl"
                  >
                    太棒了！
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center">
            <BrainCircuit className="w-8 h-8 mr-3 text-blue-400" />
            能力测评
          </h1>
          <p className="text-slate-400">测试你的数据分析能力，获得专业认证</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessments.map((assessment, index) => {
            const completedResult = assessmentResults.find(r => r.assessmentId === assessment.id);
            
            return (
              <motion.div
                key={assessment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                  <BrainCircuit className="w-6 h-6 text-blue-400" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">{assessment.title}</h3>
                <p className="text-slate-400 mb-4">{assessment.description}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">题目数量</span>
                    <span className="text-slate-300">{assessment.questions.length} 题</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">时间限制</span>
                    <span className="text-slate-300">{assessment.timeLimit / 60} 分钟</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">难度</span>
                    <span className={`${
                      assessment.difficulty === 'beginner' ? 'text-green-400' :
                      assessment.difficulty === 'intermediate' ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {assessment.difficulty === 'beginner' ? '初级' :
                       assessment.difficulty === 'intermediate' ? '中级' : '高级'}
                    </span>
                  </div>
                </div>
                
                {completedResult && (
                  <div className="mb-4 p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">历史最高</span>
                      <span className={`font-semibold ${
                        completedResult.score >= 80 ? 'text-green-400' :
                        completedResult.score >= 60 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {completedResult.score}分
                      </span>
                    </div>
                  </div>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => startAssessment(assessment.id)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl"
                >
                  {completedResult ? '重新测试' : '开始测评'}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Assessment;
