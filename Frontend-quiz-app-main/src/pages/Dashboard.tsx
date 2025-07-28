import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { 
  BookOpen, 
  FileText, 
  CreditCard, 
  Trophy, 
  Calendar,
  Play,
  Brain,
  TrendingUp,
  Award,
  Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      title: 'Start Quiz',
      description: 'Test your knowledge',
      icon: Play,
      color: 'bg-blue-500',
      link: '/quiz'
    },
    {
      title: 'View Notes',
      description: 'Access your study notes',
      icon: FileText,
      color: 'bg-green-500',
      link: '/notes'
    },
    {
      title: 'Flashcards',
      description: 'Review with flashcards',
      icon: CreditCard,
      color: 'bg-purple-500',
      link: '/flashcards'
    },
    {
      title: 'Study Planner',
      description: 'Plan your study schedule',
      icon: Calendar,
      color: 'bg-orange-500',
      link: '/planner'
    }
  ];

  const stats = [
    {
      label: 'Quizzes Taken',
      value: user?.stats.quizzesTaken || 0,
      icon: BookOpen,
      color: 'text-blue-600'
    },
    {
      label: 'Average Score',
      value: user?.stats.averageScore || 0,
      icon: TrendingUp,
      color: 'text-green-600',
      suffix: '%'
    },
    {
      label: 'Notes Saved',
      value: user?.stats.notesSaved || 0,
      icon: FileText,
      color: 'text-purple-600'
    },
    {
      label: 'Study Streak',
      value: 7,
      icon: Clock,
      color: 'text-orange-600',
      suffix: ' days'
    }
  ];

  const recentActivity = [
    { action: 'Completed Java Quiz', score: 92, time: '2 hours ago' },
    { action: 'Added DBMS Notes', score: null, time: '1 day ago' },
    { action: 'Completed OS Quiz', score: 88, time: '2 days ago' },
    { action: 'Studied Data Structures', score: null, time: '3 days ago' }
  ];

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
            Hi {user?.name}, ready to learn? 🚀
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome back! Here's your learning progress overview.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center">
                  <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    <CountUp 
                      end={stat.value} 
                      duration={1.5}
                      suffix={stat.suffix || ''}
                    />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link key={action.title} to={action.link}>
                  <Card hover className="p-6 text-center h-full">
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {action.description}
                    </p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {activity.action}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                    {activity.score && (
                      <div className="text-right">
                        <p className="font-semibold text-green-600">
                          {activity.score}%
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Achievement Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Achievements
              </h2>
              <div className="space-y-3">
                {user?.stats.badges.map((badge, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg">
                    <Award className="w-6 h-6 text-yellow-600" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {badge}
                    </span>
                  </div>
                ))}
                <div className="text-center pt-4">
                  <Link to="/profile">
                    <Button variant="outline" size="sm">
                      View All Achievements
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>

            {/* Study Goal */}
            <Card className="p-6 mt-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Today's Goal
              </h3>
              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                  <span>Study Progress</span>
                  <span>3/5 hours</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <Link to="/planner">
                <Button variant="outline" size="sm" className="w-full">
                  Update Goals
                </Button>
              </Link>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;