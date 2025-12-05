import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';

// Import các trang của bạn
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import CreateQuiz from './pages/CreateQuiz'; // <-- Import trang của bạn
import ExaminatePage from './pages/Examinate';

import { BackgroundPattern } from './components/BackgroundPattern';
import './App.css';
import QuizResultPage from './pages/Examinate/QuizResultPage';

// Component này dùng để bảo vệ các route, chỉ cho phép user đã đăng nhập truy cập
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user) {
    // Nếu chưa đăng nhập, điều hướng về trang đăng nhập
    return <Navigate to="/" />;
  }
  return children;
};

// Component này quản lý việc hiển thị trang SignIn/SignUp
const AuthPage = () => {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<'signin' | 'signup'>('signin');

  // Nếu đã đăng nhập, tự động điều hướng đến Dashboard
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <BackgroundPattern />
      {currentView === 'signin' ? (
        <SignIn onSwitchToSignUp={() => setCurrentView('signup')} />
      ) : (
        <SignUp onSwitchToSignIn={() => setCurrentView('signin')} />
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Route cho trang đăng nhập/đăng ký */}
          <Route path="/" element={<AuthPage />} />

          {/* Các route được bảo vệ */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-quiz"
            element={
              <ProtectedRoute>
                <CreateQuiz />
              </ProtectedRoute>
            }
          />
          
          {/* Bạn có thể thêm các route được bảo vệ khác ở đây */}
          <Route
            path="/examinate"
            element={
              <ProtectedRoute>
                <ExaminatePage />
              </ProtectedRoute>
            }
          /> 
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;