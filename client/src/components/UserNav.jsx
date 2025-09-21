import { Link, useNavigate } from 'react-router-dom';

export default function UserNav({ username }) {
    const navigate = useNavigate();
    return (
        <nav className="user-nav">
            <Link to="/" className="navbar-logo" style={{ fontSize: '1.15rem' }}>
                🌿 Bookly
            </Link>
            <div className="user-nav-links">
                <Link to={`/${username}/bookshelf`} className="nav-link-btn">
                    My Shelf
                </Link>
                <Link to={`/${username}/newbook`} className="btn btn-primary btn-sm">
                    + Add Book
                </Link>
                <button
                    className="nav-link-btn"
                    onClick={() => navigate('/')}
                    style={{ color: 'var(--text-muted)' }}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}