import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ChevronLeft, ChevronRight, Shuffle, BookOpen, Check, X } from 'lucide-react';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  subject: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isLearned: boolean;
}

const Flashcards: React.FC = () => {
  const [flashcards] = useState<Flashcard[]>([
    {
      id: '1',
      question: 'What is a process in operating systems?',
      answer: 'A process is a program in execution. It includes the program code, current activity, and allocated resources like memory, CPU time, and file handles.',
      subject: 'Operating Systems',
      difficulty: 'Easy',
      isLearned: false
    },
    {
      id: '2',
      question: 'Explain the difference between abstract class and interface in Java.',
      answer: 'Abstract class can have both abstract and concrete methods, can have instance variables, and supports single inheritance. Interface can only have abstract methods (until Java 8), no instance variables, and supports multiple inheritance.',
      subject: 'Java',
      difficulty: 'Medium',
      isLearned: false
    },
    {
      id: '3',
      question: 'What is normalization in DBMS?',
      answer: 'Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity. It involves dividing large tables into smaller ones and defining relationships between them.',
      subject: 'DBMS',
      difficulty: 'Medium',
      isLearned: true
    },
    {
      id: '4',
      question: 'What is the time complexity of binary search?',
      answer: 'The time complexity of binary search is O(log n) where n is the number of elements in the sorted array. This is because we eliminate half of the search space in each iteration.',
      subject: 'DSA',
      difficulty: 'Easy',
      isLearned: false
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [showOnlyUnlearned, setShowOnlyUnlearned] = useState(false);
  const [learnedCards, setLearnedCards] = useState<Set<string>>(new Set());

  const subjects = ['All', 'Operating Systems', 'Java', 'DBMS', 'Computer Networks', 'DSA', 'Aptitude'];

  const filteredCards = flashcards.filter(card => {
    const matchesSubject = selectedSubject === 'All' || card.subject === selectedSubject;
    const matchesLearned = !showOnlyUnlearned || !learnedCards.has(card.id);
    return matchesSubject && matchesLearned;
  });

  const currentCard = filteredCards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setCurrentIndex(Math.floor(Math.random() * filteredCards.length));
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const markAsLearned = (cardId: string, learned: boolean) => {
    const newLearnedCards = new Set(learnedCards);
    if (learned) {
      newLearnedCards.add(cardId);
    } else {
      newLearnedCards.delete(cardId);
    }
    setLearnedCards(newLearnedCards);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'Hard': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  if (filteredCards.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No flashcards found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your filters or create some flashcards
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Flashcards
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Master concepts with interactive flashcards
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  value={selectedSubject}
                  onChange={(e) => {
                    setSelectedSubject(e.target.value);
                    setCurrentIndex(0);
                    setIsFlipped(false);
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={showOnlyUnlearned}
                    onChange={(e) => {
                      setShowOnlyUnlearned(e.target.checked);
                      setCurrentIndex(0);
                      setIsFlipped(false);
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Show only unlearned
                  </span>
                </label>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleShuffle} icon={Shuffle}>
                  Shuffle
                </Button>
                <Button variant="outline" onClick={() => setIsFlipped(false)} icon={RotateCcw}>
                  Reset
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
            <span>Card {currentIndex + 1} of {filteredCards.length}</span>
            <span>{Math.round(((currentIndex + 1) / filteredCards.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-blue-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / filteredCards.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Flashcard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="relative h-96 perspective-1000">
            <motion.div
              className="relative w-full h-full cursor-pointer"
              onClick={handleFlip}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front of card */}
              <div className="absolute inset-0 w-full h-full backface-hidden">
                <Card className="h-full p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-800">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentCard.difficulty)}`}>
                        {currentCard.difficulty}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {currentCard.subject}
                      </span>
                    </div>
                    
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                          Question
                        </h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300">
                          {currentCard.question}
                        </p>
                      </div>
                    </div>

                    <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                      Click to reveal answer
                    </div>
                  </div>
                </Card>
              </div>

              {/* Back of card */}
              <div className="absolute inset-0 w-full h-full backface-hidden" style={{ transform: 'rotateY(180deg)' }}>
                <Card className="h-full p-8 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-2 border-green-200 dark:border-green-800">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentCard.difficulty)}`}>
                        {currentCard.difficulty}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {currentCard.subject}
                      </span>
                    </div>
                    
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                          Answer
                        </h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300">
                          {currentCard.answer}
                        </p>
                      </div>
                    </div>

                    <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                      Click to see question
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={filteredCards.length <= 1}
            icon={ChevronLeft}
          >
            Previous
          </Button>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => markAsLearned(currentCard.id, false)}
              className={`${learnedCards.has(currentCard.id) ? 'bg-gray-100 dark:bg-gray-700' : 'bg-red-50 dark:bg-red-900/20'}`}
              icon={X}
            >
              Need Practice
            </Button>
            <Button
              onClick={() => markAsLearned(currentCard.id, true)}
              className={`${learnedCards.has(currentCard.id) ? 'bg-green-600 hover:bg-green-700' : 'bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400'}`}
              icon={Check}
            >
              Got It!
            </Button>
          </div>

          <Button
            variant="outline"
            onClick={handleNext}
            disabled={filteredCards.length <= 1}
            icon={ChevronRight}
          >
            Next
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Card className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {filteredCards.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Total Cards
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {learnedCards.size}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Learned
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {filteredCards.length - learnedCards.size}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  To Review
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Flashcards;