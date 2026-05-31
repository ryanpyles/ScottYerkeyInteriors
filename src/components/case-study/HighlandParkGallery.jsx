import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import useSupabaseGallery from '@/hooks/useSupabaseGallery';
import ParallaxScrollGallery from './ParallaxScrollGallery';
import { Button } from '@/components/ui/button';

const HighlandParkGallery = () => {
  const { images, isLoading, error, retry } = useSupabaseGallery('highland-park');

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-charcoal flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-warm-off-white font-sans text-lg tracking-wide">Loading Highland Park Gallery...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-charcoal flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h3 className="font-serif text-3xl sm:text-4xl text-warm-off-white mb-4 tracking-tight">
            Unable to Load Gallery
          </h3>
          <div className="h-px w-16 bg-gold mb-6 mx-auto" aria-hidden="true" />
          <p className="text-lg text-warm-off-white/70 font-sans leading-relaxed mb-8">
            {error}
          </p>
          <Button
            onClick={retry}
            className="bg-gold text-charcoal hover:bg-gold/90 transition-colors px-8 py-3 rounded-none uppercase tracking-widest font-sans"
          >
            <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />
            Retry
          </Button>
        </motion.div>
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="w-full min-h-screen bg-charcoal flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h3 className="font-serif text-3xl sm:text-4xl text-warm-off-white mb-4 tracking-tight">
            Gallery Coming Soon
          </h3>
          <div className="h-px w-16 bg-gold mb-6 mx-auto" aria-hidden="true" />
          <p className="text-lg text-warm-off-white/70 font-sans leading-relaxed">
            Images for the Highland Park project will be available soon.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full @container">
      <ParallaxScrollGallery items={images} />
    </div>
  );
};

export default HighlandParkGallery;