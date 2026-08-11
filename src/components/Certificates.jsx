import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import CertificateCard from './CertificateCard';
import CertificateModal from './CertificateModal';

const certificates = [
  { id: 1, title: 'Fundamentals of Python Programming', image: '/assets/certificates/cert1.jpeg' },
  { id: 2, title: 'GitHub Workshop at CIT', image: '/assets/certificates/cert2.jpeg' },
  { id: 3, title: 'InternMania by ATSpeaks', image: '/assets/certificates/cert3.jpeg' },
  { id: 4, title: 'MATLAB Onramp Course', image: '/assets/certificates/cert4.jpeg' },
  { id: 5, title: 'Data Science Foundations Fundamentals : LinkedIn', image: '/assets/certificates/cert5.jpeg' },
  { id: 6, title: 'HTML Certificate from Unstop', image: '/assets/certificates/cert6.jpeg' },
  { id: 7, title: 'SRM Hackathon Finals', image: '/assets/certificates/cert7.jpeg' },
  { id: 8, title: 'Deploying AI at the Edge Workshop', image: '/assets/certificates/cert8.jpeg' },
  { id: 9, title: "LICET's Xplore '26", image: '/assets/certificates/cert9.jpeg' },
  { id: 10, title: 'Python NeoColab', image: '/assets/certificates/cert10.jpg' },
];

export default function Certificates() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <section id="certificates" className="section" ref={ref}>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="text-section-label"
        style={{ marginBottom: '2rem' }}
      >
        05 — CERTIFICATES
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-section-title"
        style={{ marginBottom: '3.5rem' }}
      >
        Proof of learning.
      </motion.h2>

      <div className="cert-grid">
        {certificates.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.05 }}
          >
            <CertificateCard
              cert={cert}
              index={i}
              onClick={() => setSelectedIndex(i)}
            />
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {selectedIndex !== null && (
        <CertificateModal
          certificates={certificates}
          currentIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onNavigate={(idx) => setSelectedIndex(idx)}
        />
      )}

      {/* Separator */}
      <div className="separator" style={{ marginTop: '5rem' }} />
    </section>
  );
}
