import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, Edit3, Trash2, Eye, Lock, Unlock, BookOpen } from 'lucide-react';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import NoteEditor from '../components/Notes/NoteEditor';

interface Note {
  id: string;
  title: string;
  content: string;
  subject: string;
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
  color: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Process Synchronization',
      content: '<p>Process synchronization is crucial for...</p>',
      subject: 'Operating Systems',
      isPrivate: false,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
      color: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      id: '2',
      title: 'Java Collections Framework',
      content: '<p>The Collections Framework provides...</p>',
      subject: 'Java',
      isPrivate: true,
      createdAt: new Date('2024-01-14'),
      updatedAt: new Date('2024-01-14'),
      color: 'bg-red-100 dark:bg-red-900/20'
    },
    {
      id: '3',
      title: 'SQL Joins Explained',
      content: '<p>Different types of SQL joins...</p>',
      subject: 'DBMS',
      isPrivate: false,
      createdAt: new Date('2024-01-13'),
      updatedAt: new Date('2024-01-13'),
      color: 'bg-green-100 dark:bg-green-900/20'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [showEditor, setShowEditor] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const subjects = ['All', 'Operating Systems', 'Java', 'DBMS', 'Computer Networks', 'DSA', 'Aptitude'];

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || note.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const handleCreateNote = () => {
    setEditingNote(null);
    setShowEditor(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setShowEditor(true);
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
  };

  const handleSaveNote = (noteData: Partial<Note>) => {
    if (editingNote) {
      // Update existing note
      setNotes(notes.map(note => 
        note.id === editingNote.id 
          ? { ...note, ...noteData, updatedAt: new Date() }
          : note
      ));
    } else {
      // Create new note
      const newNote: Note = {
        id: Date.now().toString(),
        title: noteData.title || 'Untitled Note',
        content: noteData.content || '',
        subject: noteData.subject || 'General',
        isPrivate: noteData.isPrivate || false,
        createdAt: new Date(),
        updatedAt: new Date(),
        color: getRandomColor()
      };
      setNotes([newNote, ...notes]);
    }
    setShowEditor(false);
    setEditingNote(null);
  };

  const togglePrivacy = (noteId: string) => {
    setNotes(notes.map(note => 
      note.id === noteId 
        ? { ...note, isPrivate: !note.isPrivate }
        : note
    ));
  };

  const getRandomColor = () => {
    const colors = [
      'bg-blue-100 dark:bg-blue-900/20',
      'bg-red-100 dark:bg-red-900/20',
      'bg-green-100 dark:bg-green-900/20',
      'bg-yellow-100 dark:bg-yellow-900/20',
      'bg-purple-100 dark:bg-purple-900/20',
      'bg-pink-100 dark:bg-pink-900/20'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (showEditor) {
    return (
      <NoteEditor
        note={editingNote}
        onSave={handleSaveNote}
        onCancel={() => {
          setShowEditor(false);
          setEditingNote(null);
        }}
      />
    );
  }

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
              Study Notes
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Organize and manage your study materials
            </p>
          </div>
          <Button onClick={handleCreateNote} icon={Plus}>
            Create Note
          </Button>
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
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search notes..."
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
            </div>
          </Card>
        </motion.div>

        {/* Notes Grid */}
        <AnimatePresence>
          {filteredNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note, index) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card hover className={`p-6 h-full ${note.color}`}>
                    {/* Note Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                          {note.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {note.subject}
                        </p>
                      </div>
                      <button
                        onClick={() => togglePrivacy(note.id)}
                        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {note.isPrivate ? (
                          <Lock className="w-4 h-4" />
                        ) : (
                          <Unlock className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Note Content Preview */}
                    <div 
                      className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3"
                      dangerouslySetInnerHTML={{ 
                        __html: note.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...' 
                      }}
                    />

                    {/* Note Footer */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(note.updatedAt)}
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditNote(note)}
                          className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 mb-4">
                <BookOpen className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No notes found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {searchTerm || selectedSubject !== 'All' 
                  ? 'Try adjusting your filters or search terms'
                  : 'Create your first note to get started'
                }
              </p>
              {!searchTerm && selectedSubject === 'All' && (
                <Button onClick={handleCreateNote} icon={Plus}>
                  Create Your First Note
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Notes;