import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('admin@example.com');
    const [password, setPassword] = useState('admin');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please enter credentials');
            return;
        }

        setIsLoading(true);

        // Simulate a small delay for the animation effect
        setTimeout(() => {
            const success = login(email, password);
            if (success) {
                navigate('/');
            } else {
                setError('Invalid credentials (try admin@example.com / admin)');
                setIsLoading(false);
            }
        }, 800);
    };

    return (
        <div className="login-page">
            <div className="bg-blob blob-a" aria-hidden="true"></div>
            <div className="bg-blob blob-b" aria-hidden="true"></div>

            <main className="login-container" role="main" aria-labelledby="login-heading">
                <section className="login-panel" aria-hidden="false">
                    <div className="brand">
                        <div className="logo">AD</div>
                        <div>
                            <h1>Admin Dashboard</h1>
                            <p>Secure access • Analytics • Config</p>
                        </div>
                    </div>

                    <div className="illustration" aria-hidden="true">
                        {/* Minimal SVG decorative graphic */}
                        <svg width="240" height="140" viewBox="0 0 240 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <rect x="6" y="10" width="88" height="60" rx="8" fill="url(#g1)" opacity="0.95" />
                            <rect x="146" y="40" width="88" height="78" rx="8" fill="url(#g2)" opacity="0.95" />
                            <circle cx="126" cy="80" r="28" fill="url(#g3)" opacity="0.9" />
                            <defs>
                                <linearGradient id="g1" x1="0" x2="1">
                                    <stop offset="0" stopColor="#2b8cff" stopOpacity="0.95" />
                                    <stop offset="1" stopColor="#6a5cff" stopOpacity="0.7" />
                                </linearGradient>
                                <linearGradient id="g2" x1="0" x2="1">
                                    <stop offset="0" stopColor="#ffd17a" stopOpacity="0.9" />
                                    <stop offset="1" stopColor="#ff7aa2" stopOpacity="0.6" />
                                </linearGradient>
                                <linearGradient id="g3" x1="0" x2="1">
                                    <stop offset="0" stopColor="#6a5cff" />
                                    <stop offset="1" stopColor="#2b8cff" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    <small>Variant 6 — modern glass card + soft gradient blobs.</small>
                </section>

                <aside className="login-card" role="form" aria-labelledby="login-heading">
                    <h2 id="login-heading">Admin Login</h2>
                    <p className="sub">Sign in to manage users, view reports and configure settings</p>

                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div style={{
                                color: '#ef4444',
                                marginBottom: '16px',
                                fontSize: '13px',
                                textAlign: 'center',
                                background: 'rgba(239, 68, 68, 0.1)',
                                padding: '8px',
                                borderRadius: '8px'
                            }}>
                                {error}
                            </div>
                        )}

                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <span className="icon" aria-hidden="true">📧</span>
                            <input
                                id="email"
                                className="login-input"
                                type="email"
                                placeholder="admin@example.com"
                                autoComplete="username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="password">Password</label>
                            <span className="icon" style={{ left: '12px', top: '36px' }}>🔒</span>
                            <input
                                id="password"
                                className="login-input"
                                type="password"
                                placeholder="••••••••"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="alt">
                            <label style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '13px', color: 'var(--muted)' }}>
                                <input type="checkbox" style={{ accentColor: '#3b82f6', width: '16px', height: '16px', borderRadius: '4px' }} />
                                Remember me
                            </label>
                            <a className="link" href="#" tabIndex="0">Forgot?</a>
                        </div>

                        <div className="action">
                            <button
                                className="login-btn"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Signing in…' : 'LOGIN'}
                            </button>
                            <div className="socials" aria-hidden="true">
                                <div className="chip">Sign in with SSO</div>
                                <div className="chip">Sign in with Google</div>
                            </div>
                        </div>
                    </form>
                </aside>
            </main>
        </div>
    );
};

export default Login;
