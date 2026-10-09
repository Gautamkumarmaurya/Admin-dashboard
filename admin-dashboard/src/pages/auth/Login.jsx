import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin123');
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password, remember);
      navigate('/dashboard', { replace: true });
    } catch (loginError) {
      setError(loginError.message || 'Unable to sign in. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-[#080d18] p-4">
      <form onSubmit={handleSubmit} className="panel w-full max-w-md p-7">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-white">
          <ShieldCheck />
        </span>
        <h1 className="mt-5 text-3xl font-bold">Welcome back</h1>
        <p className="mt-1 muted">Sign in to ShopAdmin.</p>
        {error && <p role="alert" className="mt-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-400">{error}</p>}
        <label className="mt-6 block">
          <span className="text-sm muted">Email</span>
          <input
            className="field mt-1"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label className="mt-4 block">
          <span className="text-sm muted">Password</span>
          <div className="relative mt-1">
            <input
              className="field pr-10"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              type="button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-3 muted"
              onClick={() => setShowPassword((visible) => !visible)}
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </label>
        <div className="mt-4 flex justify-between text-xs">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-blue-300">Forgot password?</Link>
        </div>
        <button disabled={submitting} className="btn btn-primary mt-6 w-full disabled:cursor-wait disabled:opacity-60">
          {submitting ? 'Signing in…' : 'Login'}
        </button>
        <div className="mt-5 rounded-lg bg-white/[.03] p-3 text-xs muted">
          Seeded admin: admin@example.com / admin123
        </div>
      </form>
    </div>
  );
}
