import { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(
      `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateZ(10px)`
    );
  };

  const handleMouseLeave = () => {
    setTransform('');
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        padding: '2.5rem',
        border: '1px solid var(--border)',
        background: isHovered ? 'rgba(255,255,255,0.02)' : 'transparent',
        transform: transform,
        transition: 'transform 0.3s ease, background 0.3s ease',
        cursor: 'pointer',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '2rem',
        alignItems: 'start',
      }}
      className="project-card"
    >
      <div>
        <p
          style={{
            fontSize: '0.65rem',
            fontWeight: 500,
            letterSpacing: '0.2em',
            color: 'var(--text-muted)',
            marginBottom: '1rem',
          }}
        >
          PROJECT {project.number}
        </p>

        <h3
          style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '1rem',
            transition: 'color 0.3s',
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            fontSize: '0.9rem',
            lineHeight: 1.7,
            color: 'var(--text-secondary)',
            marginBottom: '1.5rem',
            maxWidth: '500px',
          }}
        >
          {project.description}
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {project.tech.map((t) => (
            <span
              key={t}
              style={{
                fontSize: '0.65rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                padding: '0.4rem 0.8rem',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div
        style={{
          opacity: isHovered ? 1 : 0.3,
          transition: 'opacity 0.3s',
          marginTop: '0.5rem',
        }}
      >
        <ArrowUpRight size={20} color="var(--text-secondary)" />
      </div>

      <style>{`
        @media (max-width: 640px) {
          .project-card {
            grid-template-columns: 1fr !important;
            padding: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
