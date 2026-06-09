import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const inputStyle = (focused) => ({
  width: '100%', padding: '11px 14px',
  background: 'var(--bg2)', border: `1px solid ${focused ? 'var(--accent)' : 'var(--border)'}`,
  borderRadius: 10, fontSize: 14, color: 'var(--text)',
  outline: 'none', transition: 'border-color 0.15s',
  fontFamily: 'var(--font-sf)',
});

function InputField({ label, type = 'text', value, onChange, placeholder, autoComplete }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text4)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 6 }}>{label}</label>
      <input
        type={type} value={value} onChange={onChange}
        placeholder={placeholder} autoComplete={autoComplete}
        style={inputStyle(focused)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}

function GoogleButton({ onClick, loading }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick} disabled={loading}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        width: '100%', padding: '11px', borderRadius: 10,
        background: hov ? 'var(--bg3)' : 'var(--bg2)',
        border: '1px solid var(--border)', color: 'var(--text)',
        fontSize: 14, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        transition: 'all 0.15s', opacity: loading ? 0.6 : 1,
        fontFamily: 'var(--font-sf)',
      }}
    >
      {/* Google SVG */}
      <svg width="18" height="18" viewBox="0 0 18 18">
        <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
        <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
        <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
        <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
      </svg>
      Continue with Google
    </button>
  );
}

// ── LOGIN FORM ──────────────────────────────────────────────
function LoginForm({ onSwitch, onClose }) {
  const { signIn, signInWithGoogle, authError, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [gLoading, setGLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn(email, password);
    setLoading(false);
    if (res.success) onClose();
  };

  const handleGoogle = async () => {
    setGLoading(true);
    const res = await signInWithGoogle();
    setGLoading(false);
    if (res.success) onClose();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ textAlign: 'center', marginBottom: 4 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.5px' }}>Welcome back</h2>
        <p style={{ fontSize: 13, color: 'var(--text4)', marginTop: 4 }}>Sign in to your TechGen account</p>
      </div>

      <GoogleButton onClick={handleGoogle} loading={gLoading} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        <span style={{ fontSize: 11, color: 'var(--text4)', fontWeight: 500 }}>or</span>
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <InputField label="Email" type="email" value={email} onChange={e => { setEmail(e.target.value); clearError(); }} placeholder="you@example.com" autoComplete="email" />
        <InputField label="Password" type="password" value={password} onChange={e => { setPassword(e.target.value); clearError(); }} placeholder="••••••••" autoComplete="current-password" />

        <div style={{ textAlign: 'right', marginTop: -4 }}>
          <button type="button" onClick={() => onSwitch('forgot')} style={{ fontSize: 12, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
            Forgot password?
          </button>
        </div>

        {authError && (
          <div style={{ padding: '10px 14px', background: 'rgba(255,59,48,0.08)', border: '1px solid rgba(255,59,48,0.25)', borderRadius: 9, fontSize: 13, color: 'var(--red)' }}>
            {authError}
          </div>
        )}

        <button type="submit" disabled={loading || !email || !password} style={{
          width: '100%', padding: '12px', borderRadius: 10,
          background: 'var(--accent)', color: '#fff',
          fontSize: 14, fontWeight: 700, border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
          transition: 'opacity 0.15s', fontFamily: 'var(--font-sf)',
        }}>
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>

      <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text4)' }}>
        Don't have an account?{' '}
        <button onClick={() => onSwitch('signup')} style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
          Sign up
        </button>
      </p>
    </div>
  );
}

// ── SIGNUP FORM ─────────────────────────────────────────────
function SignupForm({ onSwitch, onClose }) {
  const { signUp, signInWithGoogle, authError, clearError } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [gLoading, setGLoading] = useState(false);
  const [localErr, setLocalErr] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalErr('');
    if (password !== confirm) return setLocalErr('Passwords do not match.');
    if (password.length < 6) return setLocalErr('Password must be at least 6 characters.');
    setLoading(true);
    const res = await signUp(name, email, password, phone);
    setLoading(false);
    if (res.success) onClose();
  };

  const handleGoogle = async () => {
    setGLoading(true);
    const res = await signInWithGoogle();
    setGLoading(false);
    if (res.success) onClose();
  };

  const err = localErr || authError;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ textAlign: 'center', marginBottom: 2 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.5px' }}>Create account</h2>
        <p style={{ fontSize: 13, color: 'var(--text4)', marginTop: 4 }}>Join TechGen to build your dream PC</p>
      </div>

      <GoogleButton onClick={handleGoogle} loading={gLoading} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        <span style={{ fontSize: 11, color: 'var(--text4)', fontWeight: 500 }}>or</span>
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <InputField label="Full Name" value={name} onChange={e => { setName(e.target.value); clearError(); }} placeholder="Rahul Sharma" autoComplete="name" />
          <InputField label="Phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210" autoComplete="tel" />
        </div>
        <InputField label="Email" type="email" value={email} onChange={e => { setEmail(e.target.value); clearError(); }} placeholder="you@example.com" autoComplete="email" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <InputField label="Password" type="password" value={password} onChange={e => { setPassword(e.target.value); setLocalErr(''); clearError(); }} placeholder="Min 6 chars" autoComplete="new-password" />
          <InputField label="Confirm Password" type="password" value={confirm} onChange={e => { setConfirm(e.target.value); setLocalErr(''); }} placeholder="••••••••" autoComplete="new-password" />
        </div>

        {err && (
          <div style={{ padding: '10px 14px', background: 'rgba(255,59,48,0.08)', border: '1px solid rgba(255,59,48,0.25)', borderRadius: 9, fontSize: 13, color: 'var(--red)' }}>
            {err}
          </div>
        )}

        <button type="submit" disabled={loading || !name || !email || !password} style={{
          width: '100%', padding: '12px', borderRadius: 10,
          background: 'var(--accent)', color: '#fff',
          fontSize: 14, fontWeight: 700, border: 'none', marginTop: 2,
          cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
          transition: 'opacity 0.15s', fontFamily: 'var(--font-sf)',
        }}>
          {loading ? 'Creating account…' : 'Create Account'}
        </button>
      </form>

      <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text4)' }}>
        Already have an account?{' '}
        <button onClick={() => onSwitch('login')} style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
          Sign in
        </button>
      </p>
    </div>
  );
}

// ── FORGOT PASSWORD FORM ─────────────────────────────────────
function ForgotForm({ onSwitch }) {
  const { resetPassword, authError, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await resetPassword(email);
    setLoading(false);
    if (res.success) setSent(true);
  };

  if (sent) {
    return (
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <div style={{ fontSize: 44, marginBottom: 14 }}>📬</div>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>Check your inbox</h3>
        <p style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 20, lineHeight: 1.6 }}>
          We've sent a password reset link to <strong>{email}</strong>. Check your spam folder if you don't see it.
        </p>
        <button onClick={() => onSwitch('login')} style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
          ← Back to Sign In
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ textAlign: 'center', marginBottom: 4 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.5px' }}>Reset password</h2>
        <p style={{ fontSize: 13, color: 'var(--text4)', marginTop: 4, lineHeight: 1.5 }}>Enter your email and we'll send you a reset link</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <InputField label="Email" type="email" value={email} onChange={e => { setEmail(e.target.value); clearError(); }} placeholder="you@example.com" autoComplete="email" />

        {authError && (
          <div style={{ padding: '10px 14px', background: 'rgba(255,59,48,0.08)', border: '1px solid rgba(255,59,48,0.25)', borderRadius: 9, fontSize: 13, color: 'var(--red)' }}>
            {authError}
          </div>
        )}

        <button type="submit" disabled={loading || !email} style={{
          width: '100%', padding: '12px', borderRadius: 10,
          background: 'var(--accent)', color: '#fff',
          fontSize: 14, fontWeight: 700, border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
          transition: 'opacity 0.15s', fontFamily: 'var(--font-sf)',
        }}>
          {loading ? 'Sending…' : 'Send Reset Link'}
        </button>
      </form>

      <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text4)' }}>
        <button onClick={() => onSwitch('login')} style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
          ← Back to Sign In
        </button>
      </p>
    </div>
  );
}

// ── MAIN AUTH MODAL ──────────────────────────────────────────
export default function AuthModal({ onClose, initialView = 'login' }) {
  const [view, setView] = useState(initialView);

  // Close on backdrop click
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleBackdrop}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
        animation: 'fadeInModal 0.2s ease',
      }}
    >
      <div style={{
        background: 'var(--bg)', border: '1px solid var(--border)',
        borderRadius: 18, padding: '28px 28px 24px',
        width: '100%', maxWidth: view === 'signup' ? 480 : 400,
        position: 'relative',
        boxShadow: 'var(--shadow-lg)',
        animation: 'slideUpModal 0.22s ease',
      }}>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 14, right: 14,
            width: 30, height: 30, borderRadius: 8,
            background: 'var(--bg2)', border: '1px solid var(--border)',
            color: 'var(--text3)', cursor: 'pointer', fontSize: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--bg3)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--bg2)'}
        >
          ×
        </button>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>
            Tech<span style={{ color: 'var(--accent)' }}>Gen</span>
          </span>
        </div>

        {view === 'login'  && <LoginForm  onSwitch={setView} onClose={onClose} />}
        {view === 'signup' && <SignupForm onSwitch={setView} onClose={onClose} />}
        {view === 'forgot' && <ForgotForm onSwitch={setView} />}
      </div>

      <style>{`
        @keyframes fadeInModal  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUpModal { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
    </div>
  );
}
