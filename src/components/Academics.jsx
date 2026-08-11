import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const timelineData = [
  { label: 'CLASS X', value: '465', sub: '/ 500 · 93%' },
  { label: 'CLASS XII', value: '573', sub: '/ 600 · 95.5%' },
  { label: 'TNEA CUTOFF', value: '195.5', sub: '/ 200' },
  { label: 'SEM 1 SGPA', value: '8.85', sub: '/ 10 SGPA' },
  { label: 'SEM 2 SGPA', value: '8.59', sub: '/ 10 SGPA' },
  { label: 'OVERALL CGPA', value: '8.72', sub: '/ 10 CGPA' },
];

export default function Academics() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="academics" className="section" ref={ref}>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="text-section-label"
        style={{ marginBottom: '2rem' }}
      >
        03 — EDUCATION
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-section-title"
        style={{ marginBottom: '3.5rem' }}
      >
        Academic Journey.
      </motion.h2>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="timeline-desktop"
        style={{
          border: '1px solid var(--border)',
        }}
      >
        {timelineData.map((item, i) => (
          <div key={item.label} className="timeline-item">
            <p className="timeline-label">{item.label}</p>
            <p className="timeline-value">{item.value}</p>
            <p className="timeline-sub">{item.sub}</p>
          </div>
        ))}
      </motion.div>

      {/* Separator */}
      <div className="separator" style={{ marginTop: '5rem' }} />
    </section>
  );
}
