import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Plus, Target, Clock, BookOpen, CheckCircle, Circle, Trash2 } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

interface StudyTask {
  id: string;
  title: string;
  subject: string;
  duration: number; // in minutes
  completed: boolean;
  priority: 'Low' | 'Medium' | 'High';
  date: string;
  type: 'Quiz' | 'Study' | 'Review' | 'Practice';
}

interface StudyGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  subject: string;
}

const StudyPlanner: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    subject: 'Operating Systems',
    duration: 30,
    priority: 'Medium' as 'Low' | 'Medium' | 'High',
    type: 'Study' as 'Quiz' | 'Study' | 'Review' | 'Practice'
  });

  const [tasks, setTasks] = useState<StudyTask[]>([
    {
      id: '1',
      title: 'Review Process Synchronization',
      subject: 'Operating Systems',
      duration: 45,
      completed: true,
      priority: 'High',
      date: new Date().toISOString().split('T')[0],
      type: 'Review'
    },
    {
      id: '2',
      title: 'Practice Java Collections',
      subject: 'Java',
      duration: 60,
      completed: false,
      priority: 'Medium',
      date: new Date().toISOString().split('T')[0],
      type: 'Practice'
    },
    {
      id: '3',
      title: 'SQL Queries Quiz',
      subject: 'DBMS',
      duration: 30,
      completed: false,
      priority: 'High',
      date: new Date().toISOString().split('T')[0],
      type: 'Quiz'
    }
  ]);

  const [goals, setGoals] = useState<StudyGoal[]>([
    {
      id: '1',
      title: 'Complete OS Module',
      target: 15,
      current: 12,
      unit: 'quizzes',
      deadline: '2024-02-15',
      subject: 'Operating Systems'
    },
    {
      id: '2',
      title: 'Study Hours This Week',
      target: 20,
      current: 14,
      unit: 'hours',
      deadline: '2024-01-28',
      subject: 'All'
    },
    {
      id: '3',
      title: 'Java Practice Problems',
      target: 50,
      current: 32,
      unit: 'problems',
      deadline: '2024-02-01',
      subject: 'Java'
    }
  ]);

  const subjects = ['Operating Systems', 'Java', 'DBMS', 'Computer Networks', 'DSA', 'Aptitude'];
  const taskTypes = ['Quiz', 'Study', 'Review', 'Practice'];
  const priorities = ['Low', 'Medium', 'High'];

  const todayTasks = tasks.filter(task => task.date === selectedDate);
  const completedTasks = todayTasks.filter(task => task.completed);
  const totalDuration = todayTasks.reduce((sum, task) => sum + task.duration, 0);
  const completedDuration = completedTasks.reduce((sum, task) => sum + task.duration, 0);

  const handleAddTask = () => {
    const task: StudyTask = {
      id: Date.now().toString(),
      title: newTask.title,
      subject: newTask.subject,
      duration: newTask.duration,
      completed: false,
      priority: newTask.priority,
      date: selectedDate,
      type: newTask.type
    };
    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      subject: 'Operating Systems',
      duration: 30,
      priority: 'Medium',
      type: 'Study'
    });
    setShowAddTask(false);
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'Low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Quiz': return <Target className="w-4 h-4" />;
      case 'Study': return <BookOpen className="w-4 h-4" />;
      case 'Review': return <Clock className="w-4 h-4" />;
      case 'Practice': return <CheckCircle className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Study Planner
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Plan and track your daily study goals
            </p>
          </div>
          <Button onClick={() => setShowAddTask(true)} icon={Plus}>
            Add Task
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Calendar & Tasks */}
          <div className="lg:col-span-2 space-y-6">
            {/* Date Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Study Schedule
                  </h2>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {formatDate(selectedDate)}
                </p>
              </Card>
            </motion.div>

            {/* Daily Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Today's Progress
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {completedTasks.length}/{todayTasks.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Tasks Completed</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {Math.round(completedDuration / 60 * 10) / 10}h
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Time Studied</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {todayTasks.length > 0 ? Math.round((completedTasks.length / todayTasks.length) * 100) : 0}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Completion Rate</div>
                  </div>
                </div>
                {totalDuration > 0 && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                      <span>Progress</span>
                      <span>{completedDuration}/{totalDuration} minutes</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-blue-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(completedDuration / totalDuration) * 100}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>

            {/* Tasks List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Tasks for {new Date(selectedDate).toLocaleDateString()}
                </h3>
                {todayTasks.length > 0 ? (
                  <div className="space-y-3">
                    {todayTasks.map((task, index) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          task.completed
                            ? 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800'
                            : 'border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-600'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => toggleTaskCompletion(task.id)}
                              className="text-gray-400 hover:text-green-600"
                            >
                              {task.completed ? (
                                <CheckCircle className="w-6 h-6 text-green-600" />
                              ) : (
                                <Circle className="w-6 h-6" />
                              )}
                            </button>
                            <div className="flex items-center space-x-2">
                              {getTypeIcon(task.type)}
                              <div>
                                <h4 className={`font-medium ${
                                  task.completed 
                                    ? 'text-gray-500 line-through' 
                                    : 'text-gray-900 dark:text-white'
                                }`}>
                                  {task.title}
                                </h4>
                                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                                  <span>{task.subject}</span>
                                  <span>•</span>
                                  <span>{task.duration} min</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="text-gray-400 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-300">
                      No tasks scheduled for this day
                    </p>
                    <Button
                      onClick={() => setShowAddTask(true)}
                      className="mt-4"
                      icon={Plus}
                    >
                      Add Your First Task
                    </Button>
                  </div>
                )}
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Goals */}
          <div className="space-y-6">
            {/* Study Goals */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Study Goals
                </h3>
                <div className="space-y-4">
                  {goals.map((goal, index) => (
                    <motion.div
                      key={goal.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {goal.title}
                        </h4>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {goal.current}/{goal.target} {goal.unit}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                        <motion.div
                          className="bg-blue-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                        <span>{goal.subject}</span>
                        <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  This Week
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Tasks Completed</span>
                    <span className="font-semibold text-gray-900 dark:text-white">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Study Hours</span>
                    <span className="font-semibold text-gray-900 dark:text-white">14.5h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Streak</span>
                    <span className="font-semibold text-gray-900 dark:text-white">7 days</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Add Task Modal */}
        {showAddTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Add New Task
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Task Title
                  </label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter task title..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Subject
                    </label>
                    <select
                      value={newTask.subject}
                      onChange={(e) => setNewTask({ ...newTask, subject: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Type
                    </label>
                    <select
                      value={newTask.type}
                      onChange={(e) => setNewTask({ ...newTask, type: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {taskTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Duration (minutes)
                    </label>
                    <input
                      type="number"
                      value={newTask.duration}
                      onChange={(e) => setNewTask({ ...newTask, duration: parseInt(e.target.value) || 30 })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="15"
                      max="180"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Priority
                    </label>
                    <select
                      value={newTask.priority}
                      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {priorities.map(priority => (
                        <option key={priority} value={priority}>{priority}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <Button
                  onClick={handleAddTask}
                  disabled={!newTask.title.trim()}
                  className="flex-1"
                >
                  Add Task
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowAddTask(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyPlanner;