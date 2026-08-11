import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Academics from './components/Academics';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

/* ── Cinematic Loading Screen ── */
function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        // Accelerating progress curve
        const step = prev < 60 ? 2 : prev < 90 ? 3 : 5;
        return Math.min(prev + step, 100);
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        gap: '2rem',
      }}
    >
      {/* Name */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          fontSize: '0.65rem',
          fontWeight: 600,
          letterSpacing: '0.35em',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
        }}
      >
        G. Shyamprasad
      </motion.p>

      {/* Progress bar */}
      <div style={{
        width: '80px',
        height: '1px',
        background: 'rgba(255,255,255,0.08)',
        overflow: 'hidden',
      }}>
        <motion.div
          style={{
            height: '100%',
            background: 'rgba(255,255,255,0.5)',
            width: `${progress}%`,
            transition: 'width 0.1s ease',
          }}
        />
      </div>

      {/* Percentage */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{
          fontSize: '0.55rem',
          letterSpacing: '0.2em',
          color: 'var(--text-muted)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {progress}%
      </motion.p>
    </motion.div>
  );
}

/* ── Main App ── */
export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <Navbar />
          <main>
            <Hero />
            <About />
            <Academics />
            <Projects />
            <Certificates />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      )}
    </>
  );
}
