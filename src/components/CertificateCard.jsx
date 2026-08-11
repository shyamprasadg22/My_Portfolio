import { useRef, useState } from 'react';

export default function CertificateCard({ cert, index, onClick }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(
      `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(15px)`
    );
  };

  const handleTouchMove = (e) => {
    if (!cardRef.current || !e.touches[0]) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.touches[0].clientX - rect.left) / rect.width - 0.5;
    const y = (e.touches[0].clientY - rect.top) / rect.height - 0.5;
    setTransform(
      `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(10px)`
    );
  };

  const resetTransform = () => {
    setTransform('');
    setIsHovered(false);
  };

  const num = String(index + 1).padStart(2, '0');

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={resetTransform}
      onTouchMove={handleTouchMove}
      onTouchEnd={resetTransform}
      style={{
        cursor: 'pointer',
        transform: transform,
        transition: 'transform 0.2s ease-out, box-shadow 0.3s ease, border-color 0.3s ease',
        border: `1px solid ${isHovered ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.06)'}`,
        background: isHovered ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)',
        overflow: 'hidden',
        boxShadow: isHovered
          ? '0 25px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)'
          : '0 0 0 0 transparent',
      }}
    >
      {/* Certificate image / placeholder */}
      <div style={{
        width: '100%',
        aspectRatio: '4 / 3',
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {!imgError ? (
          <img
            src={cert.image}
            alt={cert.title}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: isHovered ? 'brightness(1.15)' : 'brightness(0.75)',
              transition: 'filter 0.4s ease, transform 0.4s ease',
              transform: isHovered ? 'scale(1.04)' : 'scale(1)',
            }}
            onError={() => setImgError(true)}
          />
        ) : (
          /* Elegant built-in placeholder */
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            padding: '2rem',
            background: isHovered
              ? 'linear-gradient(135deg, #0f0f0f 0%, #151515 100%)'
              : 'linear-gradient(135deg, #0a0a0a 0%, #0f0f0f 100%)',
            transition: 'background 0.4s ease',
          }}>
            {/* Decorative border */}
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              right: '12px',
              bottom: '12px',
              border: '1px solid rgba(255,255,255,0.04)',
              pointerEvents: 'none',
            }} />

            <span style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: isHovered ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)',
              letterSpacing: '0.05em',
              transition: 'color 0.3s ease',
            }}>
              {num}
            </span>
            <span style={{
              fontSize: '0.6rem',
              fontWeight: 500,
              letterSpacing: '0.2em',
              color: isHovered ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.2)',
              textTransform: 'uppercase',
              transition: 'color 0.3s ease',
              textAlign: 'center',
              maxWidth: '180px',
              lineHeight: 1.5,
            }}>
              {cert.title}
            </span>
          </div>
        )}
      </div>

      {/* Card info */}
      <div style={{ padding: '1rem 1.25rem' }}>
        <p style={{
          fontSize: '0.55rem',
          fontWeight: 500,
          letterSpacing: '0.2em',
          color: 'var(--text-muted)',
          marginBottom: '0.4rem',
        }}>
          {num}
        </p>
        <p style={{
          fontSize: '0.85rem',
          fontWeight: 500,
          color: isHovered ? '#fff' : 'var(--text-secondary)',
          transition: 'color 0.3s',
          lineHeight: 1.4,
        }}>
          {cert.title}
        </p>
      </div>
    </div>
  );
}
