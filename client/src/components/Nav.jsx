import { Link, useNavigate } from 'react-router-dom';

export default function Nav() {
    const navigate = useNavigate();
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">
                🌿 Bookly
            </Link>
            <div className="navbar-links">
                <Link to="/about" className="nav-link-btn">About</Link>
                <button className="nav-link-btn" onClick={() => navigate('/login')}>Login</button>
                <button
                    className="btn btn-primary"
                    style={{ padding: '8px 20px', fontSize: '0.85rem' }}
                    onClick={() => navigate('/signup')}
                >
                    Get Started
                </button>
            </div>
        </nav>
    );
}