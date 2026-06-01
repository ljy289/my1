import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { courses } from '../data/courses';
import { useStore } from '../store/useStore';

const Courses = () => {
  const navigate = useNavigate();
  const { userProgress } = useStore();
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">课程体系</h1>
          <p className="text-slate-400">系统学习数据分析，从基础到精通</p>
        </div>
        
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Course List */}
          <div className="lg:col-span-1">
            <div className="space-y-3">
              {courses.map((course) => {
                const progress = userProgress[course.id];
                const isSelected = selectedCourse.id === course.id;
                
                return (
                  <motion.button
                    key={course.id}
                    whileHover={{ x: 4 }}
                    onClick={() => setSelectedCourse(course)}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30'
                        : 'bg-slate-800/50 border border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isSelected 
                          ? 'bg-gradient-to-br from-blue-500 to-purple-600'
                          : 'bg-slate-700'
                      }`}>
                        <BookOpen className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                          {course.title}
                        </h3>
                        <p className="text-sm text-slate-500">
                          {course.lessons.length} 章节
                        </p>
                      </div>
                      {progress && (
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
          
          {/* Course Detail */}
          <div className="lg:col-span-3">
            <motion.div
              key={selectedCourse.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {selectedCourse.title}
                  </h2>
                  <p className="text-slate-400">
                    {selectedCourse.description}
                  </p>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/courses/${selectedCourse.id}/learn?lesson=${selectedCourse.lessons[0].id}`)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl"
                >
                  开始学习
                </motion.button>
              </div>
              
              {/* Progress Bar */}
              {(() => {
                const progress = userProgress[selectedCourse.id];
                const courseProgress = progress 
                  ? Math.round((progress.completedLessons.length / selectedCourse.lessons.length) * 100)
                  : 0;
                
                if (courseProgress > 0) {
                  return (
                    <div className="mb-8">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400">学习进度</span>
                        <span className="text-blue-400 font-medium">{courseProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${courseProgress}%` }}
                        />
                      </div>
                    </div>
                  );
                }
                return null;
              })()}
              
              {/* Lessons List */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">课程章节</h3>
                <div className="space-y-3">
                  {selectedCourse.lessons.map((lesson, index) => {
                    const progress = userProgress[selectedCourse.id];
                    const isCompleted = progress?.completedLessons.includes(lesson.id);
                    
                    return (
                      <motion.button
                        key={lesson.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ x: 4 }}
                        onClick={() => navigate(`/courses/${selectedCourse.id}/learn?lesson=${lesson.id}`)}
                        className="w-full p-4 bg-slate-700/30 border border-slate-700 rounded-xl flex items-center justify-between hover:border-slate-600 transition-all"
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                            isCompleted
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-slate-600 text-slate-400'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              index + 1
                            )}
                          </div>
                          <div className="text-left">
                            <h4 className={`font-medium ${isCompleted ? 'text-green-400' : 'text-white'}`}>
                              {lesson.title}
                            </h4>
                            <p className="text-sm text-slate-500">
                              {lesson.exercises.length} 道练习
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-500" />
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
