import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import UserNav from '../components/UserNav';
import BookItem from '../components/BookItem';
import { BASE_URL } from '../globals';

export default function Bookshelf() {
    const { username } = useParams();
    const navigate = useNavigate();
    const [userBooks, setUserBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    const getUserBooks = async () => {
        try {
            const res = await axios.get(`${BASE_URL}${username}/bookshelf`);
            setUserBooks(res.data.books || []);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const deleteBook = async (book) => {
        const newIds = userBooks.map(b => b._id).filter(id => id !== book._id);
        const updated = await axios.put(`${BASE_URL}${username}/adduserbook`, { books: newIds });
        setUserBooks(updated.data.books || []);
        await axios.delete(`${BASE_URL}${username}/bookshelf/deletebook/${book._id}`);
    };

    useEffect(() => { getUserBooks(); }, []);

    const statuses = ['All', 'Want to Read', 'Currently Reading', 'Finished Reading'];

    const filtered = filter === 'All'
        ? userBooks
        : userBooks.filter(b => b.readingStatus === filter);

    return (
        <div className="page-wrapper">
            <UserNav username={username} />
            <div className="bookshelf-page">
                <div className="section-header">
                    <div>
                        <h1 className="section-title">{username}'s Bookshelf 📚</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
                            {userBooks.length} book{userBooks.length !== 1 ? 's' : ''} in your collection
                        </p>
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/${username}/newbook`)}
                    >
                        + Add Book
                    </button>
                </div>

                {/* Filter tabs */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
                    {statuses.map(s => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            className={`btn btn-sm ${filter === s ? 'btn-primary' : 'btn-ghost'}`}
                        >
                            {s}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '80px', color: 'var(--text-muted)' }}>
                        Loading your books…
                    </div>
                ) : (
                    <div className="books-grid">
                        {filtered.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-icon">📭</div>
                                <div className="empty-title">
                                    {filter === 'All' ? 'Your shelf is empty' : `No books in "${filter}"`}
                                </div>
                                <div className="empty-desc">
                                    {filter === 'All'
                                        ? 'Add your first book to get started.'
                                        : 'Try a different filter, or add more books.'}
                                </div>
                                {filter === 'All' && (
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => navigate(`/${username}/newbook`)}
                                    >
                                        + Add Your First Book
                                    </button>
                                )}
                            </div>
                        ) : (
                            filtered.map(book => (
                                <BookItem
                                    key={book._id}
                                    username={username}
                                    book={book}
                                    deleteBook={() => deleteBook(book)}
                                    onUpdate={getUserBooks}
                                />
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}