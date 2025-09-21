import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';

const features = [
    { icon: '📖', title: 'Track Progress', desc: 'Mark what you\'re reading, what you want to read, and what you\'ve finished — all in one cozy place.' },
    { icon: '🗂️', title: 'Organize Library', desc: 'Keep your personal collection tidy and discover your reading habits over time.' },
    { icon: '🔍', title: 'ISBN Search', desc: 'Instantly fill in book details using the Open Library ISBN lookup — fast and accurate.' },
];

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="page-wrapper">
            <Nav />
            <main className="hero">
                <div className="hero-eyebrow">
                    🌿 Your personal reading companion
                </div>

                <h1 className="hero-title">
                    Your Books,<br />
                    <span className="highlight">Beautifully Organized</span>
                </h1>

                <p className="hero-subtitle">
                    Bookly is your cozy digital bookshelf — track every book you read, want to read,
                    or have finished. Simple, warm, and entirely yours.
                </p>

                <div className="hero-cta">
                    <button
                        id="hero-signup-btn"
                        className="btn btn-primary btn-lg"
                        onClick={() => navigate('/signup')}
                    >
                        Start Your Shelf — Free
                    </button>
                    <button
                        id="hero-login-btn"
                        className="btn btn-ghost btn-lg"
                        onClick={() => navigate('/login')}
                    >
                        I already have an account
                    </button>
                </div>

                <div className="features-grid">
                    {features.map((f, i) => (
                        <div
                            key={i}
                            className="feature-card"
                            style={{ animationDelay: `${0.1 + i * 0.15}s` }}
                        >
                            <div className="feature-icon">{f.icon}</div>
                            <div className="feature-title">{f.title}</div>
                            <div className="feature-desc">{f.desc}</div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}