import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../globals';

const STATUS_MAP = {
    'Want to Read': 'badge-want',
    'Currently Reading': 'badge-reading',
    'Finished Reading': 'badge-done',
};

const STATUS_EMOJI = {
    'Want to Read': '🔖',
    'Currently Reading': '📖',
    'Finished Reading': '✅',
};

export default function BookItem({ username, book: initialBook, deleteBook, onUpdate }) {
    const [book, setBook] = useState(initialBook);
    const [newStat, setNewStat] = useState('');
    const [updating, setUpdating] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const changeStatus = async () => {
        if (!newStat) return;
        setUpdating(true);
        try {
            const res = await axios.put(
                `${BASE_URL}${username}/bookshelf/editbook/${book._id}`,
                { readingStatus: newStat }
            );
            setBook(res.data);
            setNewStat('');
            if (onUpdate) onUpdate();
        } catch (e) {
            console.error(e);
        } finally {
            setUpdating(false);
        }
    };

    const statusClass = STATUS_MAP[book.readingStatus] || 'badge-want';

    return (
        <>
            <div className="book-card" style={{ animation: 'fadeUp 0.4s ease-out both' }}>
                <div className="book-cover-wrap">
                    {book.imageUrl ? (
                        <img
                            className="book-cover"
                            src={book.imageUrl}
                            alt={book.title}
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                    ) : (
                        <div className="book-cover-placeholder">📗</div>
                    )}
                </div>

                <div className="book-body">
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author">by {book.author}</p>
                    {book.yearPublished && (
                        <p className="book-meta">Published {book.yearPublished}</p>
                    )}

                    {book.readingStatus && (
                        <div style={{ marginBottom: '16px' }}>
                            <span className={`badge ${statusClass}`}>
                                {STATUS_EMOJI[book.readingStatus]} {book.readingStatus}
                            </span>
                        </div>
                    )}

                    <div className="book-actions">
                        <div className="status-row">
                            <select
                                className="form-select"
                                value={newStat}
                                onChange={(e) => setNewStat(e.target.value)}
                                style={{ flex: 1, fontSize: '0.8rem' }}
                            >
                                <option value=''>Update status…</option>
                                <option value='Want to Read'>Want to Read</option>
                                <option value='Currently Reading'>Currently Reading</option>
                                <option value='Finished Reading'>Finished Reading</option>
                            </select>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={changeStatus}
                                disabled={!newStat || updating}
                                style={{ whiteSpace: 'nowrap' }}
                            >
                                {updating ? '…' : 'Set'}
                            </button>
                        </div>

                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => setConfirmDelete(true)}
                        >
                            🗑 Remove
                        </button>
                    </div>
                </div>
            </div>

            {confirmDelete && (
                <div className="modal-overlay" onClick={() => setConfirmDelete(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h3>Remove book?</h3>
                        <p>
                            Are you sure you want to remove <strong>"{book.title}"</strong> from your shelf?
                        </p>
                        <div className="modal-actions">
                            <button className="btn btn-ghost" onClick={() => setConfirmDelete(false)}>
                                Cancel
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={() => { setConfirmDelete(false); deleteBook(); }}
                            >
                                Yes, remove it
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}