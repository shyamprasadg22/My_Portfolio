import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import ProjectCard from './ProjectCard';

const projects = [
  {
    number: '01',
    title: 'NexVita',
    description:
      'Healthcare web application that tracks and monitors patient health records with an integrated emergency SOS notification feature.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Python'],
  },
  {
    number: '02',
    title: 'Algorithmic Problem Solving Tracker',
    description:
      'Personal repository tracking 25+ solved Data Structures and Algorithms problems on LeetCode with time and space complexity notes.',
    tech: ['C', 'Python', 'Java'],
  },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="work" className="section" ref={ref}>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="text-section-label"
        style={{ marginBottom: '2rem' }}
      >
        04 — WORK
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-section-title"
        style={{ marginBottom: '3.5rem' }}
      >
        Selected Work.
      </motion.h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {projects.map((project, i) => (
          <motion.div
            key={project.number}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>

      {/* Separator */}
      <div className="separator" style={{ marginTop: '5rem' }} />
    </section>
  );
}
