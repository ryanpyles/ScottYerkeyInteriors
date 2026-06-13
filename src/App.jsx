import { useState, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MotionConfig, AnimatePresence } from 'framer-motion';
import Navigation     from '@/components/portfolio/Navigation';
import Hero           from '@/components/portfolio/Hero';
import Philosophy     from '@/components/portfolio/Philosophy';
import Residences     from '@/components/portfolio/Residences';
import Approach       from '@/components/portfolio/Approach';
import Recognition    from '@/components/portfolio/Recognition';
import Inquiry        from '@/components/portfolio/Inquiry';
import Footer         from '@/components/portfolio/Footer';
import IntroAnimation from '@/components/portfolio/IntroAnimation';
import ProjectPage    from '@/components/portfolio/ProjectPage';

const instant = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('instant');
const alreadySeen = typeof window !== 'undefined' && sessionStorage.getItem('introSeen') === 'true';

function MainSite() {
  // Skip intro when ?instant=1 OR when user has already seen it this session
  const [introComplete, setIntroComplete] = useState(instant || alreadySeen);
  // Ref passed to Navigation so IntroAnimation can measure the nav wordmark position
  const navWordmarkRef = useRef(null);

  return (
    <MotionConfig reducedMotion={instant ? 'always' : 'never'}>
      <div className="bg-ivory text-charcoal overflow-x-clip">

        {/* Intro plays once; AnimatePresence handles the fade-out exit */}
        <AnimatePresence>
          {!introComplete && (
            <IntroAnimation
              key="intro"
              onComplete={() => {
                sessionStorage.setItem('introSeen', 'true');
                setIntroComplete(true);
              }}
              navWordmarkRef={navWordmarkRef}
            />
          )}
        </AnimatePresence>

        <Navigation introComplete={introComplete} navWordmarkRef={navWordmarkRef} />

        <div id="home">
          <Hero introComplete={introComplete} />
        </div>
        <div id="studio"><Philosophy /></div>
        <div id="residences"><Residences /></div>
        <div id="approach"><Approach /></div>
        <div id="recognition"><Recognition /></div>
        <div id="inquiry"><Inquiry /></div>
        <Footer />

      </div>
    </MotionConfig>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  );
}
