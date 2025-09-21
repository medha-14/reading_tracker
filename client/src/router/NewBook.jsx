import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UserNav from '../components/UserNav';
import BookPreview from '../components/BookPreview';

export default function NewBook() {
    const { username } = useParams();

    const [searchQuery, setSearchQuery] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [pubYear, setPubYear] = useState('');
    const [imgUrl, setImageUrl] = useState('');
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState('');
    const [success, setSuccess] = useState(false);

    const bookSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery) return;
        setSearchLoading(true);
        setSearchError('');
        try {
            const res = await axios.get(
                `https://openlibrary.org/search.json?title=${encodeURIComponent(searchQuery)}&limit=1`
            );
            const book = res.data.docs[0];
            if (!book) throw new Error('Not found');

            setTitle(book.title || '');
            setAuthor(book.author_name?.[0] || '');
            setPublisher(book.publisher?.[0] || '');
            setPubYear(book.first_publish_year?.toString() || '');

            if (book.cover_i) {
                setImageUrl(`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`);
            } else {
                setImageUrl('');
            }
        } catch {
            setSearchError('Book not found. Please fill in the details manually.');
        } finally {
            setSearchLoading(false);
        }
    };

    const resetFields = () => {
        setSearchQuery(''); setTitle(''); setAuthor('');
        setPublisher(''); setPubYear(''); setImageUrl('');
        setSearchError(''); setSuccess(false);
    };

    return (
        <div className="page-wrapper">
            <UserNav username={username} />
            <div className="newbook-page">
                <div className="section-header">
                    <div>
                        <h1 className="section-title">Add a Book</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
                            Search by Title, or fill in the details yourself.
                        </p>
                    </div>
                </div>

                {success && (
                    <div className="alert alert-success" style={{ marginBottom: '24px' }}>
                        ✅ Book added to your shelf!{' '}
                        <span
                            style={{ color: 'var(--primary-light)', cursor: 'pointer', fontWeight: 600 }}
                            onClick={resetFields}
                        >
                            Add another
                        </span>
                    </div>
                )}

                <div className="newbook-grid">
                    {/* Left column: search + manual fields */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                        {/* Search panel */}
                        <div className="card">
                            <div className="panel-title">🔍 Search by Title</div>
                            <form onSubmit={bookSearch} style={{ display: 'flex', gap: '10px' }}>
                                <input
                                    id="search-input"
                                    className="form-input"
                                    type="text"
                                    placeholder="Enter book title (e.g. The Great Gatsby)"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{ flex: 1 }}
                                />
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    style={{ whiteSpace: 'nowrap' }}
                                    disabled={searchLoading}
                                >
                                    {searchLoading ? 'Searching…' : 'Search'}
                                </button>
                            </form>
                            {searchError && (
                                <p style={{ marginTop: '10px', fontSize: '0.8rem', color: 'var(--danger)' }}>
                                    ⚠ {searchError}
                                </p>
                            )}
                        </div>

                        {/* Manual fields panel */}
                        <div className="card" style={{ flex: 1 }}>
                            <div className="panel-title">✏️ Book Details</div>

                            <div className="form-group">
                                <label className="form-label">Title <span style={{ color: 'var(--danger)' }}>*</span></label>
                                <input id="book-title" className="form-input" type="text" placeholder="Book title"
                                    value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Author <span style={{ color: 'var(--danger)' }}>*</span></label>
                                <input id="book-author" className="form-input" type="text" placeholder="Author name"
                                    value={author} onChange={(e) => setAuthor(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Publisher <span style={{ color: 'var(--danger)' }}>*</span></label>
                                <input id="book-publisher" className="form-input" type="text" placeholder="Publisher name"
                                    value={publisher} onChange={(e) => setPublisher(e.target.value)} />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Year Published <span style={{ color: 'var(--danger)' }}>*</span></label>
                                <input id="book-year" className="form-input" type="number" placeholder="e.g. 2021"
                                    value={pubYear} onChange={(e) => setPubYear(e.target.value)} />
                            </div>

                            <div className="form-group" style={{ marginBottom: 0 }}>
                                <label className="form-label">Cover Image URL <span style={{ color: 'var(--text-muted)' }}>optional</span></label>
                                <input id="book-imageurl" className="form-input" type="text" placeholder="https://…"
                                    value={imgUrl} onChange={(e) => setImageUrl(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    {/* Right column: preview */}
                    <BookPreview
                        username={username}
                        title={title} setTitle={setTitle}
                        author={author} setAuthor={setAuthor}
                        publisher={publisher} setPublisher={setPublisher}
                        pubYear={pubYear} setPubYear={setPubYear}
                        imgUrl={imgUrl} setImageUrl={setImageUrl}
                        setSearchQuery={setSearchQuery}
                        onSuccess={() => { resetFields(); setSuccess(true); }}
                    />
                </div>
            </div>
        </div>
    );
}