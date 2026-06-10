import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, ChevronLeft, BookOpen, Code, Check, X, Trophy } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { courses } from '../data/courses';
import { useStore } from '../store/useStore';
import { badges } from '../data/badges';
import CodeRunner from '../components/CodeRunner';

const Learn = () => {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeExercise, setActiveExercise] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});
  const [newBadges, setNewBadges] = useState<string[]>([]);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  
  const { completeLesson, completeExercise, userProgress, checkBadges, unlockBadge, userBadges, getCourseContent } = useStore();
  
  const customCourse = getCourseContent(courseId || '');
  const course = customCourse || courses.find(c => c.id === courseId);
  const lessonIdParam = searchParams.get('lesson');
  
  const currentLessonIndex = lessonIdParam 
    ? course?.lessons.findIndex(l => l.id === lessonIdParam) ?? 0
    : 0;
  const currentLesson = course?.lessons[currentLessonIndex];
  
  useEffect(() => {
    if (currentLesson && course) {
      const progress = userProgress[course.id];
      if (!progress?.completedLessons.includes(currentLesson.id)) {
        completeLesson(course.id, currentLesson.id);
        
        const unlockedBadges = checkBadges();
        if (unlockedBadges.length > 0) {
          unlockedBadges.forEach(badgeId => unlockBadge(badgeId));
          setNewBadges(unlockedBadges);
          setShowBadgeModal(true);
        }
      }
    }
  }, [currentLesson?.id, course?.id]);
  
  const handlePrevLesson = () => {
    if (course && currentLessonIndex > 0) {
      const prevLesson = course.lessons[currentLessonIndex - 1];
      navigate(`/courses/${courseId}/learn?lesson=${prevLesson.id}`);
    }
  };
  
  const handleNextLesson = () => {
    if (course && currentLessonIndex < course.lessons.length - 1) {
      const nextLesson = course.lessons[currentLessonIndex + 1];
      navigate(`/courses/${courseId}/learn?lesson=${nextLesson.id}`);
    }
  };
  
  const handleExerciseSubmit = (index: number) => {
    if (!currentLesson) return;
    
    const exercise = currentLesson.exercises[index];
    const userAnswer = userAnswers[exercise.id]?.trim().toLowerCase();
    const correctAnswer = exercise.answer.toLowerCase();
    
    const isCorrect = userAnswer === correctAnswer;
    setShowResults(prev => ({ ...prev, [exercise.id]: isCorrect }));
    
    if (isCorrect) {
      completeExercise(exercise.id);
      
      const unlockedBadges = checkBadges();
      if (unlockedBadges.length > 0) {
        unlockedBadges.forEach(badgeId => unlockBadge(badgeId));
        setNewBadges(prev => [...prev, ...unlockedBadges]);
        setShowBadgeModal(true);
      }
    }
  };
  
  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 text-lg">课程未找到</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-slate-400 mb-2">
            <BookOpen className="w-4 h-4" />
            <span>{course.title}</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{currentLesson.title}</span>
          </div>
          <h1 className="text-3xl font-bold text-white">{currentLesson.title}</h1>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 mb-8"
        >
          <div className="text-white">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-3xl font-bold text-white mb-4 mt-0">{children}</h1>,
                h2: ({ children }) => <h2 className="text-2xl font-bold text-white mb-3 mt-8">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl font-semibold text-white mb-2 mt-6">{children}</h3>,
                p: ({ children }) => <p className="text-white leading-relaxed mb-4">{children}</p>,
                ul: ({ children }) => <ul className="text-white list-disc list-inside space-y-2 mb-4">{children}</ul>,
                ol: ({ children }) => <ol className="text-white list-decimal list-inside space-y-2 mb-4">{children}</ol>,
                li: ({ children }) => <li className="text-white leading-relaxed">{children}</li>,
                strong: ({ children }) => <strong className="text-white font-bold">{children}</strong>,
                code: ({ children }) => <code className="bg-slate-700 px-1.5 py-0.5 rounded text-yellow-200 font-mono text-sm">{children}</code>,
                pre: ({ children }) => <pre className="bg-slate-900 p-4 rounded-lg border border-slate-700 overflow-x-auto text-green-200 mb-4">{children}</pre>,
              }}
            >
              {currentLesson.content}
            </ReactMarkdown>
          </div>
          
          {currentLesson.examples.length > 0 && (
            <div className="mt-8 pt-8 border-t border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Code className="w-5 h-5 mr-2 text-blue-400" />
                代码示例
              </h3>
              
              <div className="space-y-6">
                {currentLesson.examples.map((example, index) => (
                  <div key={example.id}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-300">示例 {index + 1}</span>
                      <span className="text-xs text-slate-500">{example.explanation}</span>
                    </div>
                    <CodeRunner initialCode={example.code} />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {currentLesson.exercises.length > 0 && (
            <div className="mt-8 pt-8 border-t border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-green-400" />
                练习题
              </h3>
              
              <div className="space-y-6">
                {currentLesson.exercises.map((exercise, index) => (
                  <motion.div
                    key={exercise.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-slate-900/30 border border-slate-700 rounded-xl p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="text-lg font-medium text-white">
                        练习 {index + 1}: {exercise.question}
                      </h4>
                      {showResults[exercise.id] !== undefined && (
                        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
                          showResults[exercise.id]
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {showResults[exercise.id] ? (
                            <><Check className="w-4 h-4" /> 正确</>
                          ) : (
                            <><X className="w-4 h-4" /> 错误</>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {exercise.type === 'multiple-choice' && exercise.options && (
                      <div className="space-y-3">
                        {exercise.options.map((option, optIndex) => (
                          <button
                            key={optIndex}
                            onClick={() => setUserAnswers(prev => ({ ...prev, [exercise.id]: option }))}
                            disabled={showResults[exercise.id] !== undefined}
                            className={`w-full text-left p-4 rounded-lg border transition-all ${
                              userAnswers[exercise.id] === option
                                ? 'border-blue-500 bg-blue-500/10'
                                : 'border-slate-700 hover:border-slate-600'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                            <span className="text-slate-300">{option}</span>
                          </button>
                        ))}
                      </div>
                    )}
                    
                    {(exercise.type === 'coding' || exercise.type === 'short-answer') && (
                      <div>
                        <textarea
                          value={userAnswers[exercise.id] || ''}
                          onChange={(e) => setUserAnswers(prev => ({ ...prev, [exercise.id]: e.target.value }))}
                          disabled={showResults[exercise.id] !== undefined}
                          rows={4}
                          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono text-sm disabled:opacity-50"
                        />
                      </div>
                    )}
                    
                    {showResults[exercise.id] === undefined ? (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleExerciseSubmit(index)}
                        disabled={!userAnswers[exercise.id]}
                        className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        提交答案
                      </motion.button>
                    ) : (
                      <div className="flex items-center space-x-3 mt-4">
                        {showResults[exercise.id] ? (
                          <>
                            <Check className="w-6 h-6 text-green-400" />
                            <span className="text-green-400 font-semibold">回答正确！</span>
                          </>
                        ) : (
                          <>
                            <X className="w-6 h-6 text-red-400" />
                            <span className="text-red-400 font-semibold">回答错误</span>
                          </>
                        )}
                      </div>
                    )}
                    
                    {showResults[exercise.id] !== undefined && (
                      <div className={`mt-4 p-4 rounded-lg ${
                        showResults[exercise.id] ? 'bg-green-500/10 border border-green-500/30' : 'bg-orange-500/10 border border-orange-500/30'
                      }`}>
                        <p className="text-sm text-slate-400 mb-1">参考答案：</p>
                        <p className="text-white font-mono">{exercise.answer}</p>
                        <p className="text-sm text-slate-400 mt-2">{exercise.explanation}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
        
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePrevLesson}
            disabled={currentLessonIndex === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all ${
              currentLessonIndex === 0
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-slate-800 text-white hover:bg-slate-700'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>上一章</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNextLesson}
            disabled={currentLessonIndex === course.lessons.length - 1}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all ${
              currentLessonIndex === course.lessons.length - 1
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
            }`}
          >
            <span>下一章</span>
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
      
      {/* Badge Modal */}
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
};

export default Learn;
