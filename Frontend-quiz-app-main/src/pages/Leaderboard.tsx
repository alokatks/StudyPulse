import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Crown, TrendingUp, Calendar } from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

interface LeaderboardEntry {
  id: string;
  username: string;
  avatar: string;
  score: number;
  quizzesCompleted: number;
  averageScore: number;
  subject: string;
  timeSpent: number; // in minutes
  rank: number;
  badge?: string;
}

const Leaderboard: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState('Overall');
  const [selectedPeriod, setSelectedPeriod] = useState('All Time');

  const subjects = ['Overall', 'Operating Systems', 'Java', 'DBMS', 'Computer Networks', 'DSA', 'Aptitude'];
  const periods = ['All Time', 'This Month', 'This Week'];

  const leaderboardData: LeaderboardEntry[] = [
    {
      id: '1',
      username: 'CodeMaster',
      avatar: '👨‍💻',
      score: 2850,
      quizzesCompleted: 45,
      averageScore: 92,
      subject: 'Overall',
      timeSpent: 1200,
      rank: 1,
      badge: 'Champion'
    },
    {
      id: '2',
      username: 'AlgoQueen',
      avatar: '👩‍🔬',
      score: 2720,
      quizzesCompleted: 38,
      averageScore: 89,
      subject: 'Overall',
      timeSpent: 980,
      rank: 2,
      badge: 'Expert'
    },
    {
      id: '3',
      username: 'JavaNinja',
      avatar: '🥷',
      score: 2650,
      quizzesCompleted: 42,
      averageScore: 87,
      subject: 'Overall',
      timeSpent: 1100,
      rank: 3,
      badge: 'Master'
    },
    {
      id: '4',
      username: 'DBGuru',
      avatar: '🧙‍♂️',
      score: 2580,
      quizzesCompleted: 35,
      averageScore: 91,
      subject: 'Overall',
      timeSpent: 850,
      rank: 4
    },
    {
      id: '5',
      username: 'NetworkPro',
      avatar: '🌐',
      score: 2450,
      quizzesCompleted: 40,
      averageScore: 85,
      subject: 'Overall',
      timeSpent: 1050,
      rank: 5
    },
    {
      id: '6',
      username: 'OSExpert',
      avatar: '⚙️',
      score: 2380,
      quizzesCompleted: 33,
      averageScore: 88,
      subject: 'Overall',
      timeSpent: 780,
      rank: 6
    },
    {
      id: '7',
      username: 'StudyBuddy',
      avatar: '📚',
      score: 2250,
      quizzesCompleted: 28,
      averageScore: 84,
      subject: 'Overall',
      timeSpent: 650,
      rank: 7
    },
    {
      id: '8',
      username: 'QuizWhiz',
      avatar: '🎯',
      score: 2180,
      quizzesCompleted: 31,
      averageScore: 82,
      subject: 'Overall',
      timeSpent: 720,
      rank: 8
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-amber-600" />;
      default: return <span className="w-6 h-6 flex items-center justify-center text-gray-500 font-bold">{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3: return 'bg-gradient-to-r from-amber-400 to-amber-600';
      default: return 'bg-gray-100 dark:bg-gray-700';
    }
  };

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case 'Champion': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      case 'Expert': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'Master': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Trophy className="w-8 h-8 text-yellow-500 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Leaderboard
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            See how you rank against other students
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time Period
                </label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {periods.map(period => (
                    <option key={period} value={period}>{period}</option>
                  ))}
                </select>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {leaderboardData.slice(0, 3).map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`${index === 0 ? 'md:order-2' : index === 1 ? 'md:order-1' : 'md:order-3'}`}
              >
                <Card className={`p-6 text-center ${getRankColor(entry.rank)} ${entry.rank <= 3 ? 'text-white' : ''}`}>
                  <div className="mb-4">
                    {getRankIcon(entry.rank)}
                  </div>
                  <div className="text-4xl mb-2">{entry.avatar}</div>
                  <h3 className="text-lg font-semibold mb-1">{entry.username}</h3>
                  {entry.badge && (
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${getBadgeColor(entry.badge)}`}>
                      {entry.badge}
                    </span>
                  )}
                  <div className="text-2xl font-bold mb-1">{entry.score.toLocaleString()}</div>
                  <div className="text-sm opacity-90">
                    {entry.quizzesCompleted} quizzes • {entry.averageScore}% avg
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Full Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Full Rankings
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Quizzes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Avg Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Time Spent
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {leaderboardData.map((entry, index) => (
                    <motion.tr
                      key={entry.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getRankIcon(entry.rank)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-2xl mr-3">{entry.avatar}</div>
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {entry.username}
                            </div>
                            {entry.badge && (
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(entry.badge)}`}>
                                {entry.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {entry.score.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {entry.quizzesCompleted}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm text-gray-900 dark:text-white mr-2">
                            {entry.averageScore}%
                          </div>
                          <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${entry.averageScore}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {formatTime(entry.timeSpent)}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {leaderboardData.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Active Users
              </div>
            </Card>

            <Card className="p-6 text-center">
              <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round(leaderboardData.reduce((sum, entry) => sum + entry.averageScore, 0) / leaderboardData.length)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Avg Score
              </div>
            </Card>

            <Card className="p-6 text-center">
              <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {leaderboardData.reduce((sum, entry) => sum + entry.quizzesCompleted, 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Total Quizzes
              </div>
            </Card>

            <Card className="p-6 text-center">
              <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatTime(leaderboardData.reduce((sum, entry) => sum + entry.timeSpent, 0))}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Total Study Time
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;