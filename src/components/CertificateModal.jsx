import { useEffect, useRef, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function CertificateModal({ certificates, currentIndex, onClose, onNavigate }) {
  const touchStart = useRef(null);
  const [imgError, setImgError] = useState(false);

  // Reset image error state when navigating
  useEffect(() => {
    setImgError(false);
  }, [currentIndex]);

  const goNext = useCallback(() => {
    if (currentIndex < certificates.length - 1) {
      onNavigate(currentIndex + 1);
    }
  }, [currentIndex, certificates.length, onNavigate]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    }
  }, [currentIndex, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, goNext, goPrev]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Touch swipe
  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
    touchStart.current = null;
  };

  const cert = certificates[currentIndex];
  const num = String(currentIndex + 1).padStart(2, '0');
  const total = String(certificates.length).padStart(2, '0');

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="modal-overlay"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'none',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
            cursor: 'pointer',
            zIndex: 10,
            padding: '0.6rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.5,
            transition: 'opacity 0.3s, border-color 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = 1;
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = 0.5;
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
          }}
        >
          <X size={18} />
        </button>

        {/* Previous */}
        {currentIndex > 0 && (
          <button
            onClick={goPrev}
            aria-label="Previous certificate"
            style={{
              position: 'absolute',
              left: '1.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff',
              cursor: 'pointer',
              zIndex: 10,
              padding: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0.5,
              transition: 'opacity 0.3s, border-color 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = 1;
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = 0.5;
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            }}
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {/* Next */}
        {currentIndex < certificates.length - 1 && (
          <button
            onClick={goNext}
            aria-label="Next certificate"
            style={{
              position: 'absolute',
              right: '1.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff',
              cursor: 'pointer',
              zIndex: 10,
              padding: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0.5,
              transition: 'opacity 0.3s, border-color 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = 1;
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = 0.5;
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            }}
          >
            <ChevronRight size={20} />
          </button>
        )}

        {/* Certificate content */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            maxWidth: '850px',
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          {/* Image container */}
          <div style={{
            width: '100%',
            background: '#080808',
            border: '1px solid rgba(255,255,255,0.06)',
            overflow: 'hidden',
            boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
          }}>
            {!imgError ? (
              <img
                src={cert.image}
                alt={cert.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
                onError={() => setImgError(true)}
              />
            ) : (
              <div style={{
                width: '100%',
                aspectRatio: '4 / 3',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.5rem',
                background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 100%)',
              }}>
                {/* Decorative frame */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  right: '20px',
                  bottom: '20px',
                  border: '1px solid rgba(255,255,255,0.04)',
                  pointerEvents: 'none',
                }} />
                <span style={{
                  fontSize: '3rem',
                  fontWeight: 800,
                  color: 'rgba(255,255,255,0.08)',
                  letterSpacing: '0.05em',
                }}>
                  {num}
                </span>
                <span style={{
                  fontSize: '1.2rem',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.3)',
                  textAlign: 'center',
                  maxWidth: '400px',
                  lineHeight: 1.5,
                }}>
                  {cert.title}
                </span>
                <span style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  color: 'rgba(255,255,255,0.15)',
                  textTransform: 'uppercase',
                }}>
                  G. Shyamprasad
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              color: 'var(--text-muted)',
              marginBottom: '0.5rem',
            }}>
              {num} / {total}
            </p>
            <p style={{
              fontSize: '1rem',
              fontWeight: 500,
              color: '#fff',
            }}>
              {cert.title}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
