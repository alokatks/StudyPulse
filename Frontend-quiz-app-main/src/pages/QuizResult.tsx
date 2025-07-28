import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Trophy, Clock, Target, RotateCcw, Home, Share2 } from 'lucide-react';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';

const QuizResult: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);

  const {
    score = 0,
    totalQuestions = 0,
    correctAnswers = 0,
    timeSpent = 0,
    quizTitle = 'Quiz',
    subject = 'General'
  } = location.state || {};

  useEffect(() => {
    if (score >= 80) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [score]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return 'Outstanding! 🎉';
    if (score >= 80) return 'Excellent work! 👏';
    if (score >= 70) return 'Good job! 👍';
    if (score >= 60) return 'Not bad, keep practicing! 📚';
    return 'Keep studying, you can do better! 💪';
  };

  const shareResult = () => {
    if (navigator.share) {
      navigator.share({
        title: 'StudyPulse Quiz Result',
        text: `I scored ${score}% on ${quizTitle} quiz!`,
        url: window.location.origin
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`I scored ${score}% on ${quizTitle} quiz on StudyPulse! ${window.location.origin}`);
    }
  };

  if (!location.state) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            No quiz result found
          </h2>
          <Link to="/quiz">
            <Button>Back to Quizzes</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 relative overflow-hidden">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -10,
                rotate: 0,
              }}
              animate={{
                y: window.innerHeight + 10,
                rotate: 360,
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Quiz Complete!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {quizTitle} - {subject}
          </p>
        </motion.div>

        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-8 text-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <div className="mb-6">
              <div className={`text-6xl font-bold ${getScoreColor(score)} mb-2`}>
                <CountUp end={score} duration={2} suffix="%" />
              </div>
              <p className="text-xl text-gray-700 dark:text-gray-300">
                {getScoreMessage(score)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  <CountUp end={correctAnswers} duration={1.5} />/{totalQuestions}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Correct Answers</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatTime(timeSpent)}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Time Taken</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Trophy className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {score >= 80 ? 'A' : score >= 60 ? 'B' : 'C'}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Grade</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Performance Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Performance Analysis
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                  <span>Accuracy</span>
                  <span>{Math.round((correctAnswers / totalQuestions) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-blue-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(correctAnswers / totalQuestions) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                  <span>Speed</span>
                  <span>{Math.round(totalQuestions / (timeSpent / 60))} questions/min</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-green-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((totalQuestions / (timeSpent / 60)) * 20, 100)}%` }}
                    transition={{ duration: 1, delay: 0.7 }}
                  />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={() => navigate('/quiz')}
            icon={RotateCcw}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Take Another Quiz
          </Button>
          
          <Button
            onClick={() => navigate('/dashboard')}
            variant="outline"
            icon={Home}
          >
            Back to Dashboard
          </Button>

          <Button
            onClick={shareResult}
            variant="outline"
            icon={Share2}
          >
            Share Result
          </Button>
        </motion.div>

        {/* Motivational Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <blockquote className="text-lg italic text-gray-600 dark:text-gray-300">
            "Success is the sum of small efforts repeated day in and day out."
          </blockquote>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">— Robert Collier</p>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizResult;