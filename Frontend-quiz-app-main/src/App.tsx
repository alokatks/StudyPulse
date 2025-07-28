import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import QuizTaking from './pages/QuizTaking';
import QuizResult from './pages/QuizResult';
import Notes from './pages/Notes';
import Flashcards from './pages/Flashcards';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import StudyPlanner from './pages/StudyPlanner';
import LoadingSpinner from './components/UI/LoadingSpinner';
import ScrollToTop from './components/UI/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageQuizzes from './pages/admin/ManageQuizzes';

// Protected Route Component
const AuthProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
};

// Public Route Component (redirect to dashboard if logged in)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return !user ? <>{children}</> : <Navigate to="/dashboard" />;
};

function AppContent() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              } 
            />

            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <AuthProtectedRoute>
                  <Dashboard />
                </AuthProtectedRoute>
              } 
            />
            <Route 
              path="/quiz" 
              element={
                <AuthProtectedRoute>
                  <Quiz />
                </AuthProtectedRoute>
              } 
            />
            <Route 
              path="/quiz/:quizId" 
              element={
                <AuthProtectedRoute>
                  <QuizTaking />
                </AuthProtectedRoute>
              } 
            />
            <Route 
              path="/quiz-result" 
              element={
                <AuthProtectedRoute>
                  <QuizResult />
                </AuthProtectedRoute>
              } 
            />

            <Route 
              path="/notes" 
              element={
                <AuthProtectedRoute>
                  <Notes />
                </AuthProtectedRoute>
              } 
            />
            <Route 
              path="/flashcards" 
              element={
                <AuthProtectedRoute>
                  <Flashcards />
                </AuthProtectedRoute>
              } 
            />
            <Route 
              path="/leaderboard" 
              element={
                <AuthProtectedRoute>
                  <Leaderboard />
                </AuthProtectedRoute>
              } 
            />
            <Route 
              path="/planner" 
              element={
                <AuthProtectedRoute>
                  <StudyPlanner />
                </AuthProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <AuthProtectedRoute>
                  <Profile />
                </AuthProtectedRoute>
              } 
            />

            {/* Admin Routes */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/users" 
              element={
                <ProtectedRoute adminOnly>
                  <ManageUsers />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/quizzes" 
              element={
                <ProtectedRoute adminOnly>
                  <ManageQuizzes />
                </ProtectedRoute>
              } 
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        {/* Scroll to Top Button */}
        <ScrollToTop />

        {/* Toast Container */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;