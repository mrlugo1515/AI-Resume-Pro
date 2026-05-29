import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Eye, EyeOff, Check } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-hero relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative text-center px-12">
          <div className="w-16 h-16 mx-auto mb-6 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Start Your Journey</h2>
          <p className="text-blue-100 text-lg max-w-md mx-auto leading-relaxed">
            Join thousands of job seekers landing more interviews with AI-optimized resumes.
          </p>
          <div className="mt-8 space-y-4 text-left max-w-sm mx-auto">
            {[
              'AI-powered resume optimization',
              'ATS keyword targeting',
              'Professional cover letters',
              'Unlimited revisions',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-white/90">
                <Check className="w-5 h-5 text-accent-300 flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="w-8 h-8 bg-gradient-card rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-text-primary">
              AI Resume <span className="text-primary-600">Pro</span>
            </span>
          </div>

          <h1 className="text-2xl font-bold text-text-primary mb-2">Create your account</h1>
          <p className="text-text-secondary mb-8">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
              Sign in
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            <Input
              label="Full Name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-text-muted hover:text-text-secondary"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <ul className="space-y-1.5">
              {[
                { text: 'At least 8 characters', met: password.length >= 8 },
                { text: 'Contains a number', met: /\d/.test(password) },
              ].map((req) => (
                <li key={req.text} className="flex items-center gap-2 text-xs">
                  <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                    req.met ? 'bg-green-100 text-green-600' : 'bg-surface-alt text-text-muted'
                  }`}>
                    {req.met ? <Check className="w-2.5 h-2.5" /> : '•'}
                  </span>
                  <span className={req.met ? 'text-green-600' : 'text-text-muted'}>{req.text}</span>
                </li>
              ))}
            </ul>

            <Button type="submit" className="w-full" size="lg" loading={loading}>
              Create Free Account
            </Button>
          </form>

          <p className="text-center text-xs text-text-muted mt-8">
            By signing up, you agree to our{' '}
            <a href="#" className="text-primary-600 hover:underline">Terms of Service</a> and{' '}
            <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
