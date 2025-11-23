import { useState } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { BackgroundPattern } from './components/BackgroundPattern';
import './App.css';
import Dashboard from './pages/Dashboard';

const AppContent = () => {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<'signin' | 'signup'>('signin');

  if (1) {
    return <Dashboard />
  }


  return (
    <div className="min-h-screen flex items-center justify-center  relative overflow-hidden">
      <BackgroundPattern />
      {currentView === 'signin' ? (
        <SignIn onSwitchToSignUp={() => setCurrentView('signup')} />
      ) : (
        <SignUp onSwitchToSignIn={() => setCurrentView('signin')} />
      )}
    </div >
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
