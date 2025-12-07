import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { InputField } from '@/components/Form/InputField';

interface SignUpProps {
  onSwitchToSignIn: () => void;
}

export const SignUp = ({ onSwitchToSignIn }: SignUpProps) => {
  const { register, loading } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setApiError('');

    try {
      await register(formData.username, formData.email, formData.password);
    } catch (error) {
      setApiError((error as Error).message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 mr-[40rem] w-full max-w-md relative z-10">
      <div className="mb-8">
        <div className="flex justify-between items-start mb-2">
          <p className="text-sm text-gray-600">Welcome to ITS</p>
          <div className="text-right">
            <p className="text-xs text-gray-500">Have an Account ?</p>
            <button
              onClick={onSwitchToSignIn}
              className="text-sm text-green-500 hover:text-green-600 font-medium"
            >
              Sign in
            </button>
          </div>
        </div>
        <h1 className="text-6xl text-left font-bold text-gray-900">sign up</h1>
      </div>

      {apiError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {apiError}
        </div>
      )}

      <div className='text-left'>
        <InputField
          label="Username"
          type="text"
          placeholder="Choose a username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          error={errors.username}
        />

        <InputField
          label="Email address"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
        />

        <InputField
          label="Password"
          type="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          error={errors.password}
          showPasswordToggle={true}
          onTogglePassword={() => setShowPassword(!showPassword)}
          showPassword={showPassword}
        />

        <InputField
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          error={errors.confirmPassword}
          showPasswordToggle={true}
          onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
          showPassword={showConfirmPassword}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors mb-6 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Creating account...
            </>
          ) : (
            'Sign up'
          )}
        </button>
      </div>
    </div>
  );
};
