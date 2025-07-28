import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Brain, Trophy, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/UI/Button';

const Home: React.FC = () => {
  const { user } = useAuth();

  const subjects = [
    { name: 'Operating Systems', color: 'bg-blue-500', icon: '🖥️' },
    { name: 'Java', color: 'bg-red-500', icon: '☕' },
    { name: 'DBMS', color: 'bg-green-500', icon: '🗄️' },
    { name: 'Computer Networks', color: 'bg-purple-500', icon: '🌐' },
    { name: 'Data Structures', color: 'bg-yellow-500', icon: '🔗' },
    { name: 'Aptitude', color: 'bg-pink-500', icon: '🧮' }
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Quizzes',
      description: 'Test your knowledge with our comprehensive quiz system'
    },
    {
      icon: Brain,
      title: 'Smart Notes',
      description: 'Create and organize your study notes efficiently'
    },
    {
      icon: Trophy,
      title: 'Leaderboard',
      description: 'Compete with peers and track your progress'
    },
    {
      icon: Users,
      title: 'Study Groups',
      description: 'Collaborate with other students in your field'
    }
  ];

  const quotes = [
    "The expert in anything was once a beginner.",
    "Success is the sum of small efforts repeated day in and day out.",
    "The only way to learn mathematics is to do mathematics.",
    "Education is the most powerful weapon which you can use to change the world."
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Unlock Your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Learning Potential
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Master computer science and engineering with our comprehensive study platform. 
              Practice quizzes, take notes, and track your progress.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link to="/dashboard">
                  <Button size="lg" icon={ArrowRight}>
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/signup">
                    <Button size="lg" icon={ArrowRight}>
                      Start Learning
                    </Button>
                  </Link>
                  <Link to="/quiz">
                    <Button variant="outline" size="lg">
                      Explore Quizzes
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>

          {/* Floating animation elements */}
          <div className="absolute top-20 left-10 hidden lg:block">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center"
            >
              <BookOpen className="w-8 h-8 text-blue-500" />
            </motion.div>
          </div>
          <div className="absolute top-32 right-20 hidden lg:block">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center"
            >
              <Brain className="w-6 h-6 text-purple-500" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Master Core Subjects
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Comprehensive coverage of computer science and engineering topics
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 ${subject.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                  <span className="text-2xl">{subject.icon}</span>
                </div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  {subject.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Succeed
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <blockquote className="text-2xl md:text-3xl font-medium text-white mb-4">
              "{quotes[Math.floor(Math.random() * quotes.length)]}"
            </blockquote>
            <p className="text-blue-100">— Motivational Wisdom</p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Join thousands of students who are already mastering their subjects with StudyPulse.
              </p>
              <Link to="/signup">
                <Button size="lg" icon={ArrowRight}>
                  Get Started Free
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;