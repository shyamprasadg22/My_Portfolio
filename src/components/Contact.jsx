import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const socialLinks = [
  { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/shyamprasad-g-a13017369/' },
  { label: 'GITHUB', href: 'https://github.com/shyamprasadg22' },
  { label: 'LEETCODE', href: 'https://leetcode.com/u/Shyamprasad_G/' },
  { label: 'INSTAGRAM', href: 'https://www.instagram.com/xhyam_22/' },
  { label: 'EMAIL', href: 'mailto:shyamprasad.g.2025.cse@rajalakshmi.edu.in' },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="section" ref={ref}>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="text-section-label"
        style={{ marginBottom: '2rem' }}
      >
        07 — CONTACT
      </motion.p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '4rem',
          alignItems: 'start',
        }}
        className="contact-grid"
      >
        {/* Left — Heading + CTA */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-section-title"
            style={{ marginBottom: '2.5rem' }}
          >
            Let's build
            <br />
            something
            <br />
            meaningful.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
              marginBottom: '0.5rem',
            }}
          >
            Have an idea? Let's talk.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              marginBottom: '2rem',
              wordBreak: 'break-all',
            }}
          >
            shyamprasad.g.2025.cse@rajalakshmi.edu.in
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <a
              href="mailto:shyamprasad.g.2025.cse@rajalakshmi.edu.in"
              className="btn-primary"
            >
              EMAIL ME <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </div>

        {/* Right — Social links */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ display: 'flex', flexDirection: 'column' }}
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
            CONNECT
          </p>
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="social-link"
            >
              {link.label}
              <ArrowUpRight size={14} />
            </a>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
