import React from 'react';
import { motion } from 'framer-motion';
const AboutSection = () => {
  return <section id="about" className="bg-warm-off-white py-24 lg:py-32 relative border-t border-warm-border" aria-labelledby="about-heading">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <motion.div className="w-full lg:w-1/2 relative" initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true,
          margin: "-100px"
        }} transition={{
          duration: 0.8
        }}>
            <div className="aspect-[4/5] relative w-full max-w-md mx-auto overflow-hidden rounded-sm shadow-xl">
              <img src="https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/chatgpt-image-mar-23-2026-03_01_58-am-4O6HA.png" alt="Scott Arthur Yerkey in a refined, warm interior setting" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gold/10 mix-blend-multiply pointer-events-none" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 border border-gold/30 hidden md:block" aria-hidden="true" />
          </motion.div>

          <motion.div className="w-full lg:w-1/2 flex flex-col justify-center" initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true,
          margin: "-100px"
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }}>
            <h2 id="about-heading" className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal tracking-tight mb-8">
              A Philosophy of <span className="text-gold italic">Elegance</span>
            </h2>
            
            <div className="space-y-6 text-charcoal/80 font-sans text-lg leading-relaxed max-w-2xl">
              <p>
                At Scott Arthur Yerkey Design, we believe that true luxury lies in the harmony between architectural discipline and profound material expression. For over two decades, our studio has been dedicated to crafting environments that are not just visually arresting, but deeply resonant with the lives lived within them.
              </p>
              <p>
                Our approach is rooted in a <span className="font-semibold text-charcoal">restrained, material-forward aesthetic</span>. We draw inspiration from historical proportions while interpreting them through a distinctly contemporary lens. Every texture selected, every line drawn, and every piece of custom furniture commissioned serves a singular purpose: to elevate the everyday experience.
              </p>
              <p>
                From sweeping residential estates to intimately scaled urban sanctuaries, our commitment remains the same. We collaborate closely with artisans, craftspeople, and our clients to ensure that every space feels bespoke, timeless, and effortlessly welcoming.
              </p>
            </div>
            
            <div className="mt-12 pt-12 border-t border-charcoal/10">
              <p className="font-serif text-xl text-charcoal italic tracking-wide">
                "Design is the silent ambassador of your character."
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>;
};
export default AboutSection;