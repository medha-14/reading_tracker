import Nav from '../components/Nav';

export default function About() {
    return (
        <div className="page-wrapper">
            <Nav />
            <div className="about-page" style={{ animation: 'fadeUp 0.5s ease-out both' }}>
                <div style={{ fontSize: '2.8rem', marginBottom: '16px' }}>🌿</div>
                <h1>About Bookly</h1>
                <p>
                    Bookly was built by an avid reader and software developer who wanted a clean,
                    warm place to manage their ever-growing reading list. No clutter — just you,
                    your books, and your journey through them.
                </p>
                <p>
                    Organize books into three simple buckets: <em>Want to Read</em>,{' '}
                    <em>Currently Reading</em>, and <em>Finished Reading</em>. Add books
                    instantly by searching with an ISBN (powered by the Open Library API),
                    or fill in the details yourself.
                </p>
                <p>
                    Bookly is a living project and will grow over time. Feedback and ideas
                    are always welcome!
                </p>
                <div style={{
                    marginTop: '40px',
                    padding: '24px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    gap: '28px',
                    flexWrap: 'wrap'
                }}>
                    {[
                        { label: 'Frontend', value: 'React + Vite' },
                        { label: 'Backend', value: 'Node.js + Express' },
                        { label: 'Database', value: 'MongoDB + Mongoose' },
                        { label: 'Book Data', value: 'Open Library API' },
                    ].map(({ label, value }) => (
                        <div key={label}>
                            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '4px' }}>
                                {label}
                            </p>
                            <p style={{ fontWeight: 700, color: 'var(--primary-light)' }}>{value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}