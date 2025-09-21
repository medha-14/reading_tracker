import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import { BASE_URL } from '../globals';

export default function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [reentry, setReentry] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const unOk = username.length >= 7;
    const pwOk = password.length >= 7;
    const match = password && password === reentry;
    const canSubmit = unOk && pwOk && match;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!canSubmit) {
            setError('Please fix the requirements below before submitting.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const res = await axios.get(`${BASE_URL}existinguser/${username}`);
            if (res.data) {
                setError('That username is taken. Please choose another or log in.');
            } else {
                await axios.post(`${BASE_URL}newuser`, { username, password, books: [] });
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
                    <h2 className="auth-title">Create account 🌱</h2>
                    <p className="auth-subtitle">
                        Start building your personal bookshelf today.
                    </p>

                    {error && (
                        <div className="alert alert-error">
                            <span>⚠</span> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Username</label>
                            <input
                                id="signup-username"
                                className="form-input"
                                type="text"
                                placeholder="At least 7 characters"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="username"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input
                                id="signup-password"
                                className="form-input"
                                type="password"
                                placeholder="At least 7 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Confirm Password</label>
                            <input
                                id="signup-confirm"
                                className="form-input"
                                type="password"
                                placeholder="Re-enter password"
                                value={reentry}
                                onChange={(e) => setReentry(e.target.value)}
                                autoComplete="new-password"
                            />
                        </div>

                        <ul className="validation-list">
                            <li className={unOk ? 'valid' : ''}>Username is at least 7 characters</li>
                            <li className={pwOk ? 'valid' : ''}>Password is at least 7 characters</li>
                            <li className={match ? 'valid' : ''}>Passwords match</li>
                        </ul>

                        <button
                            id="signup-submit-btn"
                            type="submit"
                            className="btn btn-primary btn-full btn-lg"
                            disabled={loading}
                        >
                            {loading ? 'Creating account…' : 'Create Account'}
                        </button>
                    </form>

                    <p style={{ marginTop: '28px', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        Already have an account?{' '}
                        <span
                            style={{ color: 'var(--primary-light)', cursor: 'pointer', fontWeight: 600 }}
                            onClick={() => navigate('/login')}
                        >
                            Log in
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}