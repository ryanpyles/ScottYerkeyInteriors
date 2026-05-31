import { useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

export function useParallaxScroll(ref, offset = 25) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Reduce parallax intensity on smaller screens for better performance and usability
  const currentOffset = isMobile ? offset / 2 : offset;
  
  const imageY = useTransform(scrollYProgress, [0, 1], [`-${currentOffset}%`, `${currentOffset}%`]);
  
  // Text content fades in when section comes into view, fades out as it leaves
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [0, 1, 1, 1, 0]
  );

  return { imageY, textOpacity, scrollProgress: scrollYProgress };
}