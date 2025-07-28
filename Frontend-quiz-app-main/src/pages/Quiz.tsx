import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, BookOpen, Zap, Users } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

interface Quiz {
  id: string;
  title: string;
  subject: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: number;
  questions: number;
  description: string;
  color: string;
  icon: string;
}

const Quiz: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const subjects = ['All', 'Operating Systems', 'Java', 'DBMS', 'Computer Networks', 'DSA', 'Aptitude'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const quizzes: Quiz[] = [
    {
      id: '1',
      title: 'Process Management',
      subject: 'Operating Systems',
      difficulty: 'Medium',
      duration: 30,
      questions: 15,
      description: 'Test your knowledge of process scheduling and management',
      color: 'bg-blue-500',
      icon: '🖥️'
    },
    {
      id: '2',
      title: 'OOP Concepts',
      subject: 'Java',
      difficulty: 'Easy',
      duration: 20,
      questions: 10,
      description: 'Object-oriented programming fundamentals',
      color: 'bg-red-500',
      icon: '☕'
    },
    {
      id: '3',
      title: 'SQL Queries',
      subject: 'DBMS',
      difficulty: 'Medium',
      duration: 25,
      questions: 12,
      description: 'Advanced SQL query writing and optimization',
      color: 'bg-green-500',
      icon: '🗄️'
    },
    {
      id: '4',
      title: 'TCP/IP Protocol',
      subject: 'Computer Networks',
      difficulty: 'Hard',
      duration: 40,
      questions: 20,
      description: 'Deep dive into TCP/IP stack and networking protocols',
      color: 'bg-purple-500',
      icon: '🌐'
    },
    {
      id: '5',
      title: 'Binary Trees',
      subject: 'DSA',
      difficulty: 'Medium',
      duration: 35,
      questions: 18,
      description: 'Tree data structures and algorithms',
      color: 'bg-yellow-500',
      icon: '🔗'
    },
    {
      id: '6',
      title: 'Logical Reasoning',
      subject: 'Aptitude',
      difficulty: 'Easy',
      duration: 15,
      questions: 8,
      description: 'Logical reasoning and problem solving',
      color: 'bg-pink-500',
      icon: '🧮'
    }
  ];

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || quiz.subject === selectedSubject;
    const matchesDifficulty = selectedDifficulty === 'All' || quiz.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'Hard': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Quiz Explorer
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Challenge yourself with our comprehensive quiz collection
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search quizzes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Subject Filter */}
              <div>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>{difficulty}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quiz Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz, index) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card hover className="p-6 h-full flex flex-col">
                {/* Quiz Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${quiz.color} rounded-lg flex items-center justify-center text-2xl`}>
                    {quiz.icon}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                    {quiz.difficulty}
                  </span>
                </div>

                {/* Quiz Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {quiz.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {quiz.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <BookOpen className="w-4 h-4 mr-2" />
                      <span>{quiz.subject}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{quiz.duration} minutes</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Zap className="w-4 h-4 mr-2" />
                      <span>{quiz.questions} questions</span>
                    </div>
                  </div>
                </div>

                {/* Quiz Actions */}
                <div className="flex space-x-2">
                  <Link to={`/quiz/${quiz.id}`} className="flex-1">
                    <Button className="w-full">
                      Start Quiz
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={() => {}}>
                    Preview
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredQuizzes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <BookOpen className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No quizzes found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your filters or search terms
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Quiz;