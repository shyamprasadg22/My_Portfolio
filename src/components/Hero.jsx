import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import HeroScene from './3d/HeroScene';

const stats = [
  { label: 'CGPA', value: '8.85', sub: '/ 10' },
  { label: 'TNEA CUTOFF', value: '195.5', sub: '/ 200' },
  { label: 'LEETCODE', value: '25+', sub: 'SOLVED' },
  { label: 'WORKSHOPS', value: '10+', sub: 'ATTENDED' },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.max(0, -rect.top / rect.height);
      setScrollProgress(Math.min(progress, 1));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Stagger timings for cinematic entry
  const BASE = 0.3;

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: '#050505',
      }}
    >
      {/* 3D Scene — full background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      >
        <HeroScene scrollProgress={scrollProgress} />
      </div>

      {/* Content overlay */}
      <div className="hero-grid" style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '8rem 2.5rem 4rem',
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr 0.8fr',
        gap: '2rem',
        alignItems: 'center',
        minHeight: '100vh',
        pointerEvents: 'none',
      }}>
        {/* ─── LEFT — Text content ─── */}
        <div style={{ pointerEvents: 'auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: BASE }}
            style={{
              fontSize: '0.65rem',
              fontWeight: 500,
              letterSpacing: '0.25em',
              color: 'var(--text-muted)',
              marginBottom: '2rem',
            }}
          >
            01 — PORTFOLIO
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.4,
              delay: BASE + 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-hero"
            style={{ marginBottom: '2.5rem' }}
          >
            Hello.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: BASE + 1.0 }}
          >
            <h2 style={{
              fontSize: '1.3rem',
              fontWeight: 600,
              color: '#fff',
              marginBottom: '0.3rem',
              letterSpacing: '-0.01em',
            }}>
              G. Shyamprasad
            </h2>
            <p style={{
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              marginBottom: '0.2rem',
            }}>
              B.E. Computer Science & Engineering
            </p>
            <p style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              marginBottom: '1.75rem',
            }}>
              Rajalakshmi Engineering College
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: BASE + 1.4 }}
            style={{
              fontSize: '0.9rem',
              lineHeight: 1.75,
              color: 'var(--text-secondary)',
              marginBottom: '2.5rem',
              maxWidth: '400px',
            }}
          >
            I am a Computer Science and Engineering student passionate about
            technology, coding, problem-solving, software development and
            emerging technologies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: BASE + 1.8 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <a href="#work" className="btn-primary">
              VIEW WORK <ArrowRight size={14} />
            </a>
            <a href="#contact" className="btn-secondary">
              CONTACT <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </div>

        {/* ─── CENTER — 3D object occupies this space ─── */}
        <div />

        {/* ─── RIGHT — Stats ─── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: BASE + 2.0 }}
          className="hero-stats"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            pointerEvents: 'auto',
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="stat-item"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: BASE + 2.2 + i * 0.12 }}
            >
              <p className="stat-label">{stat.label}</p>
              <p className="stat-value">
                {stat.value}{' '}
                <span className="stat-sub">{stat.sub}</span>
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: BASE + 3, duration: 1.5 }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <span style={{
          fontSize: '0.55rem',
          letterSpacing: '0.25em',
          color: 'var(--text-muted)',
          fontWeight: 500,
        }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          style={{
            width: '1px',
            height: '35px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)',
          }}
        />
      </motion.div>

      {/* Bottom gradient fade */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '120px',
        background: 'linear-gradient(to bottom, transparent, #050505)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      <style>{`
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center !important;
            padding-top: 7rem !important;
            padding-bottom: 3rem !important;
            gap: 1rem !important;
          }
          .hero-grid > div:nth-child(2) {
            min-height: 320px;
          }
          .hero-stats {
            flex-direction: row !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
            gap: 0.5rem !important;
          }
          .hero-stats .stat-item {
            flex: 1;
            min-width: 130px;
            text-align: center;
          }
          .text-hero {
            font-size: clamp(3rem, 15vw, 7rem) !important;
          }
        }
        @media (max-width: 640px) {
          .hero-grid {
            padding: 6rem 1rem 2rem !important;
          }
          .hero-stats {
            gap: 0 !important;
          }
          .hero-stats .stat-item {
            min-width: 100px;
            padding: 0.75rem 0 !important;
          }
          .stat-value {
            font-size: 1.2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
