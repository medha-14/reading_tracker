import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../globals';

const DEFAULT_COVER = '';

export default function BookPreview({
    username, title, author, publisher, pubYear, imgUrl,
    setTitle, setAuthor, setPublisher, setPubYear, setImageUrl, setSearchQuery,
    onSuccess,
}) {
    const [readStat, setReadStat] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const hasDetails = title && author && publisher && pubYear;

    const handleSubmit = async () => {
        if (!readStat) { setError('Please select a reading status.'); return; }
        if (!hasDetails) { setError('Please fill in all required fields.'); return; }
        setSubmitting(true);
        setError('');
        try {
            const userRes = await axios.get(`${BASE_URL}existinguser/${username}`);
            const bookRes = await axios.post(`${BASE_URL}${username}/addbook`, {
                title, author, publisher,
                yearPublished: pubYear,
                readingStatus: readStat,
                imageUrl: imgUrl || DEFAULT_COVER,
                user: userRes.data._id,
            });
            await axios.put(`${BASE_URL}${username}/adduserbook`, {
                books: [...userRes.data.books, bookRes.data[0]._id],
            });
            setReadStat('');
            if (onSuccess) onSuccess();
        } catch (e) {
            setError('Failed to add book. Is the backend running?');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="preview-panel" style={{ alignSelf: 'flex-start', position: 'sticky', top: '84px' }}>
            <div className="panel-title">👁 Preview & Add</div>

            {hasDetails ? (
                <>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                        {imgUrl ? (
                            <img src={imgUrl} alt={title} className="preview-book-cover"
                                onError={(e) => { e.target.style.display = 'none'; }} />
                        ) : (
                            <div className="preview-placeholder">📗</div>
                        )}
                        <div>
                            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '6px' }}>{title}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '4px' }}>
                                by {author}
                            </p>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '4px' }}>
                                {publisher}
                            </p>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                                {pubYear}
                            </p>
                        </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Reading Status</label>
                        <select
                            id="preview-status-select"
                            className="form-select"
                            value={readStat}
                            onChange={(e) => setReadStat(e.target.value)}
                        >
                            <option value=''>Select a status…</option>
                            <option value='Want to Read'>🔖 Want to Read</option>
                            <option value='Currently Reading'>📖 Currently Reading</option>
                            <option value='Finished Reading'>✅ Finished Reading</option>
                        </select>
                    </div>

                    {error && (
                        <p style={{ fontSize: '0.8rem', color: 'var(--danger)' }}>⚠ {error}</p>
                    )}

                    <button
                        id="add-book-submit-btn"
                        className="btn btn-primary btn-full"
                        onClick={handleSubmit}
                        disabled={submitting || !readStat}
                    >
                        {submitting ? 'Adding…' : '+ Add to My Shelf'}
                    </button>
                </>
            ) : (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '12px', opacity: 0.3 }}>📚</div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        Fill in the book details on the left, or search by name, to see a preview here.
                    </p>
                </div>
            )}
        </div>
    );
}