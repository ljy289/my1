import { useState } from 'react';
import { Edit2, Save, X, Plus, Trash2, ChevronDown, ChevronUp, Code, FileQuestion } from 'lucide-react';
import { courses as initialCourses, Course, Lesson, Example, Exercise } from '@/data/courses';
import { useStore } from '@/store/useStore';

export default function Admin() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [editingExampleId, setEditingExampleId] = useState<string | null>(null);
  const [editingExerciseId, setEditingExerciseId] = useState<string | null>(null);
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);
  const { setCourseContent } = useStore();

  const handleSaveCourse = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
      setCourseContent(courseId, course);
    }
    setEditingCourseId(null);
  };

  const handleSaveLesson = (courseId: string, lessonId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
      setCourseContent(courseId, course);
    }
    setEditingLessonId(null);
  };

  const addLesson = (courseId: string) => {
    setCourses(prev => prev.map(course => {
      if (course.id === courseId) {
        const newLesson: Lesson = {
          id: `lesson-${Date.now()}`,
          title: '新章节',
          content: '在这里输入章节内容...',
          examples: [],
          exercises: []
        };
        return { ...course, lessons: [...course.lessons, newLesson] };
      }
      return course;
    }));
  };

  const deleteLesson = (courseId: string, lessonId: string) => {
    setCourses(prev => prev.map(course => {
      if (course.id === courseId) {
        return { ...course, lessons: course.lessons.filter(l => l.id !== lessonId) };
      }
      return course;
    }));
  };

  const addExample = (courseId: string, lessonId: string) => {
    setCourses(prev => prev.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          lessons: course.lessons.map(lesson => {
            if (lesson.id === lessonId) {
              const newExample: Example = {
                id: `example-${Date.now()}`,
                code: '# 在这里输入代码示例',
                explanation: '代码解释'
              };
              return { ...lesson, examples: [...lesson.examples, newExample] };
            }
            return lesson;
          })
        };
      }
      return course;
    }));
  };

  const deleteExample = (courseId: string, lessonId: string, exampleId: string) => {
    setCourses(prev => prev.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          lessons: course.lessons.map(lesson => {
            if (lesson.id === lessonId) {
              return { ...lesson, examples: lesson.examples.filter(e => e.id !== exampleId) };
            }
            return lesson;
          })
        };
      }
      return course;
    }));
  };

  const addExercise = (courseId: string, lessonId: string) => {
    setCourses(prev => prev.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          lessons: course.lessons.map(lesson => {
            if (lesson.id === lessonId) {
              const newExercise: Exercise = {
                id: `exercise-${Date.now()}`,
                question: '在这里输入问题',
                type: 'multiple-choice',
                options: ['选项A', '选项B', '选项C', '选项D'],
                answer: '选项A',
                explanation: '答案解释'
              };
              return { ...lesson, exercises: [...lesson.exercises, newExercise] };
            }
            return lesson;
          })
        };
      }
      return course;
    }));
  };

  const deleteExercise = (courseId: string, lessonId: string, exerciseId: string) => {
    setCourses(prev => prev.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          lessons: course.lessons.map(lesson => {
            if (lesson.id === lessonId) {
              return { ...lesson, exercises: lesson.exercises.filter(e => e.id !== exerciseId) };
            }
            return lesson;
          })
        };
      }
      return course;
    }));
  };

  const updateCourseField = (courseId: string, field: keyof Course, value: string) => {
    setCourses(prev => prev.map(course => {
      if (course.id === courseId) {
        return { ...course, [field]: value };
      }
      return course;
    }));
  };

  const updateLessonField = (courseId: string, lessonId: string, field: keyof Lesson, value: string) => {
    setCourses(prev => prev.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          lessons: course.lessons.map(lesson => {
            if (lesson.id === lessonId) {
              return { ...lesson, [field]: value };
            }
            return lesson;
          })
        };
      }
      return course;
    }));
  };

  const updateExampleField = (courseId: string, lessonId: string, exampleId: string, field: keyof Example, value: string) => {
    setCourses(prev => prev.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          lessons: course.lessons.map(lesson => {
            if (lesson.id === lessonId) {
              return {
                ...lesson,
                examples: lesson.examples.map(example => {
                  if (example.id === exampleId) {
                    return { ...example, [field]: value };
                  }
                  return example;
                })
              };
            }
            return lesson;
          })
        };
      }
      return course;
    }));
  };

  const updateExerciseField = (courseId: string, lessonId: string, exerciseId: string, field: keyof Exercise, value: string) => {
    setCourses(prev => prev.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          lessons: course.lessons.map(lesson => {
            if (lesson.id === lessonId) {
              return {
                ...lesson,
                exercises: lesson.exercises.map(exercise => {
                  if (exercise.id === exerciseId) {
                    return { ...exercise, [field]: value };
                  }
                  return exercise;
                })
              };
            }
            return lesson;
          })
        };
      }
      return course;
    }));
  };

  const updateExerciseOption = (courseId: string, lessonId: string, exerciseId: string, optionIndex: number, value: string) => {
    setCourses(prev => prev.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          lessons: course.lessons.map(lesson => {
            if (lesson.id === lessonId) {
              return {
                ...lesson,
                exercises: lesson.exercises.map(exercise => {
                  if (exercise.id === exerciseId && exercise.options) {
                    const newOptions = [...exercise.options];
                    newOptions[optionIndex] = value;
                    return { ...exercise, options: newOptions };
                  }
                  return exercise;
                })
              };
            }
            return lesson;
          })
        };
      }
      return course;
    }));
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">课程管理</h1>
            <p className="text-gray-400 mt-2">在这里编辑课程内容，保存后立即生效</p>
          </div>
          <div className="text-sm text-gray-400">
            共 {courses.length} 个课程
          </div>
        </div>

        <div className="space-y-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden"
            >
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-750"
                onClick={() => setExpandedCourseId(expandedCourseId === course.id ? null : course.id)}
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{course.order}</span>
                  <div>
                    {editingCourseId === course.id ? (
                      <input
                        type="text"
                        value={course.title}
                        onChange={(e) => updateCourseField(course.id, 'title', e.target.value)}
                        className="bg-slate-700 text-white px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <h2 className="text-xl font-semibold text-white">{course.title}</h2>
                    )}
                    {editingCourseId === course.id ? (
                      <textarea
                        value={course.description}
                        onChange={(e) => updateCourseField(course.id, 'description', e.target.value)}
                        className="bg-slate-700 text-white px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 w-full"
                        rows={2}
                      />
                    ) : (
                      <p className="text-gray-400 text-sm mt-1">{course.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {editingCourseId === course.id ? (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveCourse(course.id);
                        }}
                        className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                      >
                        <Save size={18} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingCourseId(null);
                          setCourses(initialCourses);
                        }}
                        className="p-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingCourseId(course.id);
                      }}
                      className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                  )}
                  {expandedCourseId === course.id ? (
                    <ChevronUp size={24} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={24} className="text-gray-400" />
                  )}
                </div>
              </div>

              {expandedCourseId === course.id && (
                <div className="border-t border-slate-700">
                  <div className="p-4 space-y-4">
                    {course.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="bg-slate-750 rounded-lg border border-slate-700 overflow-hidden"
                      >
                        <div
                          className="flex items-center justify-between p-3 cursor-pointer hover:bg-slate-700"
                          onClick={() => setExpandedLessonId(expandedLessonId === lesson.id ? null : lesson.id)}
                        >
                          <div>
                            {editingLessonId === lesson.id ? (
                              <input
                                type="text"
                                value={lesson.title}
                                onChange={(e) => updateLessonField(course.id, lesson.id, 'title', e.target.value)}
                                className="bg-slate-600 text-white px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            ) : (
                              <h3 className="text-lg font-medium text-white">{lesson.title}</h3>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {editingLessonId === lesson.id ? (
                              <>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSaveLesson(course.id, lesson.id);
                                  }}
                                  className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                                >
                                  <Save size={16} />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingLessonId(null);
                                  }}
                                  className="p-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors"
                                >
                                  <X size={16} />
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingLessonId(lesson.id);
                                }}
                                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                              >
                                <Edit2 size={16} />
                              </button>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteLesson(course.id, lesson.id);
                              }}
                              className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                            {expandedLessonId === lesson.id ? (
                              <ChevronUp size={20} className="text-gray-400" />
                            ) : (
                              <ChevronDown size={20} className="text-gray-400" />
                            )}
                          </div>
                        </div>

                        {expandedLessonId === lesson.id && (
                          <div className="p-4 space-y-4">
                            <div>
                              <label className="block text-sm text-gray-400 mb-2">章节内容</label>
                              {editingLessonId === lesson.id ? (
                                <textarea
                                  value={lesson.content}
                                  onChange={(e) => updateLessonField(course.id, lesson.id, 'content', e.target.value)}
                                  className="bg-slate-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                  rows={8}
                                />
                              ) : (
                                <div className="bg-slate-700 p-4 rounded-lg text-white whitespace-pre-wrap max-h-64 overflow-y-auto">
                                  {lesson.content}
                                </div>
                              )}
                            </div>

                            {lesson.examples.length > 0 && (
                              <div className="border-t border-slate-600 pt-4">
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    <Code className="w-4 h-4 text-blue-400" />
                                    代码示例
                                  </h4>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      addExample(course.id, lesson.id);
                                    }}
                                    className="flex items-center gap-1 px-3 py-1 bg-slate-600 hover:bg-slate-500 text-white rounded-lg text-sm transition-colors"
                                  >
                                    <Plus size={14} />
                                    添加
                                  </button>
                                </div>
                                
                                <div className="space-y-4">
                                  {lesson.examples.map((example, idx) => (
                                    <div key={example.id} className="bg-slate-700 rounded-lg p-4">
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-400">示例 {idx + 1}</span>
                                        <div className="flex items-center gap-1">
                                          {editingExampleId === example.id ? (
                                            <>
                                              <button
                                                onClick={() => setEditingExampleId(null)}
                                                className="p-1 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                                              >
                                                <Save size={14} />
                                              </button>
                                              <button
                                                onClick={() => setEditingExampleId(null)}
                                                className="p-1 bg-slate-600 hover:bg-slate-500 text-white rounded transition-colors"
                                              >
                                                <X size={14} />
                                              </button>
                                            </>
                                          ) : (
                                            <>
                                              <button
                                                onClick={() => setEditingExampleId(example.id)}
                                                className="p-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                                              >
                                                <Edit2 size={14} />
                                              </button>
                                              <button
                                                onClick={() => deleteExample(course.id, lesson.id, example.id)}
                                                className="p-1 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                                              >
                                                <Trash2 size={14} />
                                              </button>
                                            </>
                                          )}
                                        </div>
                                      </div>
                                      
                                      <div className="space-y-2">
                                        <label className="text-xs text-gray-500">代码</label>
                                        {editingExampleId === example.id ? (
                                          <textarea
                                            value={example.code}
                                            onChange={(e) => updateExampleField(course.id, lesson.id, example.id, 'code', e.target.value)}
                                            className="bg-slate-900 text-green-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full font-mono text-sm"
                                            rows={6}
                                          />
                                        ) : (
                                          <pre className="bg-slate-900 p-3 rounded-lg text-green-300 font-mono text-sm overflow-x-auto">
                                            {example.code}
                                          </pre>
                                        )}
                                        
                                        <label className="text-xs text-gray-500">解释</label>
                                        {editingExampleId === example.id ? (
                                          <input
                                            type="text"
                                            value={example.explanation}
                                            onChange={(e) => updateExampleField(course.id, lesson.id, example.id, 'explanation', e.target.value)}
                                            className="bg-slate-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                          />
                                        ) : (
                                          <p className="text-gray-300 text-sm">{example.explanation}</p>
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="border-t border-slate-600 pt-4">
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                  <FileQuestion className="w-4 h-4 text-green-400" />
                                  练习题
                                </h4>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    addExercise(course.id, lesson.id);
                                  }}
                                  className="flex items-center gap-1 px-3 py-1 bg-slate-600 hover:bg-slate-500 text-white rounded-lg text-sm transition-colors"
                                >
                                  <Plus size={14} />
                                  添加
                                </button>
                              </div>
                              
                              <div className="space-y-4">
                                {lesson.exercises.map((exercise, idx) => (
                                  <div key={exercise.id} className="bg-slate-700 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-sm text-gray-400">练习 {idx + 1}</span>
                                      <div className="flex items-center gap-1">
                                        {editingExerciseId === exercise.id ? (
                                          <>
                                            <button
                                              onClick={() => setEditingExerciseId(null)}
                                              className="p-1 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                                            >
                                              <Save size={14} />
                                            </button>
                                            <button
                                              onClick={() => setEditingExerciseId(null)}
                                              className="p-1 bg-slate-600 hover:bg-slate-500 text-white rounded transition-colors"
                                            >
                                              <X size={14} />
                                            </button>
                                          </>
                                        ) : (
                                          <>
                                            <button
                                              onClick={() => setEditingExerciseId(exercise.id)}
                                              className="p-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                                            >
                                              <Edit2 size={14} />
                                            </button>
                                            <button
                                              onClick={() => deleteExercise(course.id, lesson.id, exercise.id)}
                                              className="p-1 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                                            >
                                              <Trash2 size={14} />
                                            </button>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                      <label className="text-xs text-gray-500">问题</label>
                                      {editingExerciseId === exercise.id ? (
                                        <input
                                          type="text"
                                          value={exercise.question}
                                          onChange={(e) => updateExerciseField(course.id, lesson.id, exercise.id, 'question', e.target.value)}
                                          className="bg-slate-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                        />
                                      ) : (
                                        <p className="text-white">{exercise.question}</p>
                                      )}
                                      
                                      {exercise.options && (
                                        <>
                                          <label className="text-xs text-gray-500">选项</label>
                                          {editingExerciseId === exercise.id ? (
                                            <div className="space-y-1">
                                              {exercise.options.map((option, optIdx) => (
                                                <input
                                                  key={optIdx}
                                                  type="text"
                                                  value={option}
                                                  onChange={(e) => updateExerciseOption(course.id, lesson.id, exercise.id, optIdx, e.target.value)}
                                                  className="bg-slate-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                                />
                                              ))}
                                            </div>
                                          ) : (
                                            <div className="space-y-1">
                                              {exercise.options.map((option, optIdx) => (
                                                <div key={optIdx} className={`text-gray-300 ${option === exercise.answer ? 'text-green-400 font-medium' : ''}`}>
                                                  {String.fromCharCode(65 + optIdx)}. {option}
                                                  {option === exercise.answer && ' ✓'}
                                                </div>
                                              ))}
                                            </div>
                                          )}
                                        </>
                                      )}
                                      
                                      <label className="text-xs text-gray-500">正确答案</label>
                                      {editingExerciseId === exercise.id ? (
                                        <input
                                          type="text"
                                          value={exercise.answer}
                                          onChange={(e) => updateExerciseField(course.id, lesson.id, exercise.id, 'answer', e.target.value)}
                                          className="bg-slate-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                        />
                                      ) : (
                                        <p className="text-green-400 font-medium">{exercise.answer}</p>
                                      )}
                                      
                                      <label className="text-xs text-gray-500">解释</label>
                                      {editingExerciseId === exercise.id ? (
                                        <textarea
                                          value={exercise.explanation}
                                          onChange={(e) => updateExerciseField(course.id, lesson.id, exercise.id, 'explanation', e.target.value)}
                                          className="bg-slate-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                          rows={2}
                                        />
                                      ) : (
                                        <p className="text-gray-400 text-sm">{exercise.explanation}</p>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addLesson(course.id);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                    >
                      <Plus size={18} />
                      添加章节
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}