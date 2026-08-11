import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const sideInfo = [
  {
    label: 'CURRENTLY',
    items: ['B.E. CSE', '2nd Year'],
  },
  {
    label: 'ROLE',
    items: ['Web Development Enthusiast', 'Video Editor'],
  },
  {
    label: 'INTERESTS',
    items: ['Software Development', 'AI', 'Problem Solving', 'Web Development', 'Emerging Technologies'],
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section" ref={ref}>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="text-section-label"
        style={{ marginBottom: '2rem' }}
      >
        02 — ABOUT
      </motion.p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '4rem',
          alignItems: 'start',
        }}
        className="about-grid"
      >
        {/* Main content */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-section-title"
            style={{ marginBottom: '2.5rem' }}
          >
            A student who
            <br />
            likes to build
            <br />
            things.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-body-lg"
            style={{ maxWidth: '540px' }}
          >
            I am a Computer Science and Engineering student at Rajalakshmi
            Engineering College, passionate about technology, coding,
            problem-solving, software development, and emerging technologies.
            I enjoy building practical solutions and continuously expanding my
            knowledge across different domains of computer science.
          </motion.p>
        </div>

        {/* Side info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
        >
          {sideInfo.map((info) => (
            <div key={info.label}>
              <p
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  color: 'var(--text-muted)',
                  marginBottom: '0.75rem',
                }}
              >
                {info.label}
              </p>
              {info.items.map((item) => (
                <p
                  key={item}
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.8,
                  }}
                >
                  {item}
                </p>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Separator */}
      <div className="separator" style={{ marginTop: '5rem' }} />

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
