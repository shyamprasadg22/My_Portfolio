import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const skillCategories = [
  {
    label: 'LANGUAGES',
    skills: ['C', 'Python', 'Java'],
  },
  {
    label: 'WEB',
    skills: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    label: 'PROBLEM SOLVING',
    skills: ['LeetCode — 25+ Problems Solved'],
  },
  {
    label: 'OTHER',
    skills: ['Video Editing'],
  },
];

function SkillItem({ skill, delay }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'inline-block',
        fontSize: '1.5rem',
        fontWeight: 600,
        color: isHovered ? '#fff' : 'var(--text-secondary)',
        transform: isHovered ? 'translateZ(20px) scale(1.05)' : 'translateZ(0)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'default',
        marginRight: '2rem',
        marginBottom: '0.5rem',
      }}
    >
      {skill}
    </motion.span>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="section" ref={ref}>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="text-section-label"
        style={{ marginBottom: '2rem' }}
      >
        06 — SKILLS
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-section-title"
        style={{ marginBottom: '3.5rem' }}
      >
        Tools I work with.
      </motion.h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {skillCategories.map((category, ci) => (
          <motion.div
            key={category.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 + ci * 0.1 }}
          >
            <p
              style={{
                fontSize: '0.65rem',
                fontWeight: 500,
                letterSpacing: '0.2em',
                color: 'var(--text-muted)',
                marginBottom: '1rem',
              }}
            >
              {category.label}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline' }}>
              {category.skills.map((skill, si) => (
                <SkillItem
                  key={skill}
                  skill={skill}
                  delay={0.4 + ci * 0.1 + si * 0.05}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Separator */}
      <div className="separator" style={{ marginTop: '5rem' }} />
    </section>
  );
}
