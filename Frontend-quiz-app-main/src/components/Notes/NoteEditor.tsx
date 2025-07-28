import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, X, Lock, Unlock, Eye } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Button from '../UI/Button';
import Card from '../UI/Card';

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

interface NoteEditorProps {
  note?: Note | null;
  onSave: (noteData: Partial<Note>) => void;
  onCancel: () => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ note, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subject, setSubject] = useState('Operating Systems');
  const [isPrivate, setIsPrivate] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const subjects = ['Operating Systems', 'Java', 'DBMS', 'Computer Networks', 'DSA', 'Aptitude'];

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setSubject(note.subject);
      setIsPrivate(note.isPrivate);
    }
  }, [note]);

  const handleSave = () => {
    if (!title.trim()) {
      alert('Please enter a title for your note');
      return;
    }

    onSave({
      title: title.trim(),
      content,
      subject,
      isPrivate
    });
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'color', 'background', 'list', 'bullet', 'indent',
    'link', 'image'
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {note ? 'Edit Note' : 'Create New Note'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {isPreview ? 'Preview Mode' : 'Edit Mode'}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsPreview(!isPreview)}
              icon={Eye}
            >
              {isPreview ? 'Edit' : 'Preview'}
            </Button>
            <Button variant="outline" onClick={onCancel} icon={X}>
              Cancel
            </Button>
            <Button onClick={handleSave} icon={Save}>
              Save Note
            </Button>
          </div>
        </motion.div>

        {/* Note Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            {/* Note Settings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isPreview}
                >
                  {subjects.map(subj => (
                    <option key={subj} value={subj}>{subj}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => setIsPrivate(!isPrivate)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                    isPrivate
                      ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300'
                      : 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                  }`}
                  disabled={isPreview}
                >
                  {isPrivate ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                  <span>{isPrivate ? 'Private' : 'Public'}</span>
                </button>
              </div>
            </div>

            {/* Title */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title
              </label>
              {isPreview ? (
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {title || 'Untitled Note'}
                </h2>
              ) : (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter note title..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              )}
            </div>

            {/* Content */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content
              </label>
              {isPreview ? (
                <div 
                  className="prose dark:prose-invert max-w-none p-4 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                  dangerouslySetInnerHTML={{ __html: content || '<p>No content yet...</p>' }}
                />
              ) : (
                <div className="bg-white dark:bg-gray-700 rounded-md">
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    formats={formats}
                    placeholder="Start writing your note..."
                    style={{ height: '400px' }}
                  />
                </div>
              )}
            </div>

            {/* Save Button (bottom) */}
            {!isPreview && (
              <div className="flex justify-end space-x-2 pt-12">
                <Button variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave} icon={Save}>
                  Save Note
                </Button>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default NoteEditor;