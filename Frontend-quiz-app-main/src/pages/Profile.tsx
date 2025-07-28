import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Edit3, Trophy, BookOpen, Clock, Target, Calendar, Award, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  const achievements = [
    { id: 1, name: 'First Quiz', description: 'Completed your first quiz', icon: '🎯', earned: true, date: '2024-01-10' },
    { id: 2, name: 'Quick Learner', description: 'Scored 90%+ on 5 quizzes', icon: '⚡', earned: true, date: '2024-01-15' },
    { id: 3, name: 'Java Master', description: 'Completed all Java quizzes', icon: '☕', earned: true, date: '2024-01-20' },
    { id: 4, name: 'Study Streak', description: '7 days of continuous learning', icon: '🔥', earned: false, date: null },
    { id: 5, name: 'Perfect Score', description: 'Achieved 100% on any quiz', icon: '💯', earned: false, date: null },
    { id: 6, name: 'Note Taker', description: 'Created 10 study notes', icon: '📝', earned: false, date: null }
  ];

  const recentActivity = [
    { id: 1, type: 'quiz', title: 'Java OOP Concepts', score: 92, date: '2024-01-22' },
    { id: 2, type: 'note', title: 'Process Synchronization Notes', score: null, date: '2024-01-21' },
    { id: 3, type: 'quiz', title: 'Database Normalization', score: 88, date: '2024-01-20' },
    { id: 4, type: 'flashcard', title: 'Studied OS Concepts', score: null, date: '2024-01-19' },
    { id: 5, type: 'quiz', title: 'Network Protocols', score: 95, date: '2024-01-18' }
  ];

  const subjectProgress = [
    { subject: 'Operating Systems', completed: 12, total: 15, percentage: 80 },
    { subject: 'Java', completed: 18, total: 20, percentage: 90 },
    { subject: 'DBMS', completed: 8, total: 12, percentage: 67 },
    { subject: 'Computer Networks', completed: 6, total: 10, percentage: 60 },
    { subject: 'DSA', completed: 14, total: 18, percentage: 78 },
    { subject: 'Aptitude', completed: 5, total: 8, percentage: 63 }
  ];

  const handleSaveProfile = () => {
    // Here you would typically save to backend
    setIsEditing(false);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'quiz': return <BookOpen className="w-4 h-4 text-blue-600" />;
      case 'note': return <Edit3 className="w-4 h-4 text-green-600" />;
      case 'flashcard': return <Target className="w-4 h-4 text-purple-600" />;
      default: return <BookOpen className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Profile
            </h1>
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
              icon={isEditing ? Settings : Edit3}
            >
              {isEditing ? 'Settings' : 'Edit Profile'}
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card className="p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Full Name"
                    />
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Email"
                    />
                    <div className="flex space-x-2">
                      <Button onClick={handleSaveProfile} size="sm">Save</Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)} size="sm">Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {user?.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">{user?.email}</p>
                  </>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{user?.stats.quizzesTaken}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Quizzes Taken</div>
                </div>
                <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{user?.stats.averageScore}%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Average Score</div>
                </div>
                <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{user?.stats.notesSaved}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Notes Saved</div>
                </div>
                <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">7</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Day Streak</div>
                </div>
              </div>
            </Card>

            {/* Achievements */}
            <Card className="p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                Achievements
              </h3>
              <div className="space-y-3">
                {achievements.slice(0, 4).map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      achievement.earned
                        ? 'bg-yellow-50 dark:bg-yellow-900/20'
                        : 'bg-gray-50 dark:bg-gray-800 opacity-60'
                    }`}
                  >
                    <span className="text-2xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {achievement.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {achievement.description}
                      </div>
                      {achievement.earned && achievement.date && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Earned {formatDate(achievement.date)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Subject Progress */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-blue-500" />
                Subject Progress
              </h3>
              <div className="space-y-4">
                {subjectProgress.map((subject, index) => (
                  <motion.div
                    key={subject.subject}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {subject.subject}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {subject.completed}/{subject.total} ({subject.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-blue-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${subject.percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-green-500" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      {getActivityIcon(activity.type)}
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {activity.title}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {formatDate(activity.date)}
                        </div>
                      </div>
                    </div>
                    {activity.score && (
                      <div className="text-right">
                        <div className={`font-semibold ${
                          activity.score >= 90 ? 'text-green-600' :
                          activity.score >= 70 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {activity.score}%
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* All Achievements */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-purple-500" />
                All Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border-2 ${
                      achievement.earned
                        ? 'border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-600'
                        : 'border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-600 opacity-60'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {achievement.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {achievement.description}
                        </div>
                        {achievement.earned && achievement.date && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Earned {formatDate(achievement.date)}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;