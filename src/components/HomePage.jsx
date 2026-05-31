import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import WelcomeAnimation from '@/components/WelcomeAnimation';
import HeroSection from '@/components/HeroSection';
import SelectedWorkSection from '@/components/SelectedWorkSection';
import PhilosophySection from '@/components/PhilosophySection';
import ApproachSection from '@/components/ApproachSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';

const HomePage = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [animationPlayed, setAnimationPlayed] = useState(false);

  useEffect(() => {
    // Check if we've already shown the animation in this session
    const hasPlayed = sessionStorage.getItem('welcome_animation_played');
    
    if (hasPlayed) {
      setShowWelcome(false);
      setAnimationPlayed(true);
    }
  }, []);

  const handleWelcomeComplete = () => {
    // Mark animation as complete in session storage
    sessionStorage.setItem('welcome_animation_played', 'true');
    setShowWelcome(false);
    setAnimationPlayed(true);
  };

  return (
    <>
      <Helmet>
        <title>Scott Arthur Yerkey | Chicago Interior Designer</title>
        <meta 
          name="description" 
          content="Chicago-based interiors defined by architectural clarity and enduring materiality. Residential design with a focus on proportion, texture, and disciplined restraint." 
        />
      </Helmet>

      <main>
        {showWelcome && (
          <WelcomeAnimation onAnimationComplete={handleWelcomeComplete} />
        )}
        
        {/* 
           Conditionally render HeroSection based on animation completion.
           The rest of the sections can render immediately or wait, 
           but HeroSection specifically was requested to wait.
           To prevent layout shift, we can wrap everything in a fade-in or just conditionally render Hero.
        */}
        {animationPlayed && (
          <div className="animate-in fade-in duration-1000 fill-mode-forwards">
            <HeroSection />
            <SelectedWorkSection />
            <PhilosophySection />
            <ApproachSection />
            <AboutSection />
            <ContactSection />
          </div>
        )}
      </main>
    </>
  );
};

export default HomePage;