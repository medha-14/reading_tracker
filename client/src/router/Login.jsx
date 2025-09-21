import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import { BASE_URL } from '../globals';

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const res = await axios.get(`${BASE_URL}existinguser/${username}`);
            if (!res.data) {
                setError('Username not found. Would you like to sign up?');
            } else if (res.data.password !== password) {
                setError('Incorrect password. Please try again.');
            } else {
                navigate(`/${username}/bookshelf`);
            }
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-wrapper">
            <Nav />
            <div className="auth-page">
                <div className="auth-card">
                    <h2 className="auth-title">Welcome back 👋</h2>
                    <p className="auth-subtitle">
                        Log in to access your personal bookshelf.
                    </p>

                    {error && (
                        <div className="alert alert-error">
                            <span>⚠</span>
                            <span>{error}</span>
                            {error.includes('sign up') && (
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => navigate('/signup')}
                                    style={{ marginLeft: 'auto' }}
                                >
                                    Sign up
                                </button>
                            )}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Username</label>
                            <input
                                id="login-username"
                                className="form-input"
                                type="text"
                                placeholder="your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="username"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input
                                id="login-password"
                                className="form-input"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                        </div>

                        <button
                            id="login-submit-btn"
                            type="submit"
                            className="btn btn-primary btn-full btn-lg"
                            disabled={loading}
                            style={{ marginTop: '8px' }}
                        >
                            {loading ? 'Logging in…' : 'Log In'}
                        </button>
                    </form>

                    <p style={{ marginTop: '28px', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        Don't have an account?{' '}
                        <span
                            style={{ color: 'var(--primary-light)', cursor: 'pointer', fontWeight: 600 }}
                            onClick={() => navigate('/signup')}
                        >
                            Sign up for free
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}