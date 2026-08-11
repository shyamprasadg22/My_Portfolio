export default function Footer() {
  return (
    <footer
      style={{
        padding: '3rem 2.5rem',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1400px',
        margin: '0 auto',
        flexWrap: 'wrap',
        gap: '1rem',
      }}
    >
      <p
        style={{
          fontSize: '0.7rem',
          fontWeight: 500,
          letterSpacing: '0.1em',
          color: 'var(--text-muted)',
        }}
      >
        © {new Date().getFullYear()} G. SHYAMPRASAD
      </p>

      <p
        style={{
          fontSize: '0.65rem',
          letterSpacing: '0.1em',
          color: 'var(--text-muted)',
        }}
      >
        BUILT WITH PASSION
      </p>
    </footer>
  );
}
