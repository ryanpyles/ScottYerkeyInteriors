import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import ImageGalleryModal from '@/components/ImageGalleryModal';

function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

const MobileFurnitureCard = ({ item, index, onClick }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useParallax(scrollYProgress, 30); 

  return (
    <article 
      ref={ref}
      id={`furniture-${item.id}-mobile`}
      className="project-card flex flex-col justify-start pb-20 relative"
    >
      <div className="sticky top-[70px] z-[40] bg-warm-off-white/95 backdrop-blur-sm pt-4 pb-4 px-4 sm:px-8 shadow-sm w-full">
        <p className="text-gold font-medium tracking-wide uppercase text-xs sm:text-sm font-sans mb-1">
          Handcrafted
        </p>
        <h3 className="font-serif font-medium text-2xl sm:text-3xl text-charcoal tracking-tight">
          Furniture {index + 1}
        </h3>
      </div>

      <div className="px-4 sm:px-8 pt-8 relative z-10 flex flex-col h-full w-full">
        <button 
          onClick={onClick}
          className="w-full h-[65vh] min-h-[400px] mb-8 relative overflow-hidden rounded-sm shadow-sm bg-warm-border group cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-gold"
          aria-label="View furniture fullscreen"
        >
          <motion.div style={{ y, willChange: "transform" }} className="w-full h-[120%] -top-[10%] absolute">
            <img 
              src={item.image_url} 
              alt={`Handcrafted furniture ${index + 1}`}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </motion.div>
          <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-300" />
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-left relative z-10"
        >
          <p className="text-base sm:text-lg text-charcoal/70 leading-relaxed font-sans">
            Minimalist frame detailing focusing on raw materiality and sharp geometry.
          </p>
        </motion.div>
      </div>
    </article>
  );
};

const FurnitureGallery = () => {
  const [furniture, setFurniture] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeItem, setActiveItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetchFurniture();
  }, []);

  useEffect(() => {
    if (furniture.length > 0 && !activeItem) {
      setActiveItem(furniture[0].id);
    }
  }, [furniture, activeItem]);

  useEffect(() => {
    if (furniture.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace('furniture-', '');
            const foundItem = furniture.find(f => f.id === id);
            if (foundItem) setActiveItem(foundItem.id);
          }
        });
      },
      { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    const elements = document.querySelectorAll('.furniture-card-desktop');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [furniture]);

  const fetchFurniture = async () => {
    try {
      setHasError(false);
      const { data: projects, error: projectError } = await supabase
        .from('projects')
        .select('id')
        .eq('category', 'furniture')
        .limit(1)
        .maybeSingle();

      if (projectError) {
        console.error('Error fetching furniture project:', projectError);
        setHasError(true);
        setFurniture([]);
        setIsLoading(false);
        return;
      }

      if (!projects) {
        setFurniture([]);
        setIsLoading(false);
        return;
      }

      const { data: images, error: imagesError } = await supabase
        .from('project_images')
        .select('*')
        .eq('project_id', projects.id)
        .order('display_order');

      if (imagesError) {
        console.error('Error fetching furniture images:', imagesError);
        setHasError(true);
        setFurniture([]);
      } else {
        setFurniture(images || []);
      }
    } catch (error) {
      console.error('Error fetching furniture:', error);
      setHasError(true);
      setFurniture([]);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (index) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const handleNavigate = (direction) => {
    if (direction === 'prev') {
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : furniture.length - 1));
    } else {
      setCurrentIndex((prev) => (prev < furniture.length - 1 ? prev + 1 : 0));
    }
  };

  if (isLoading) {
    return (
      <div className="w-full py-16 text-center bg-warm-off-white">
        <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-charcoal/60 font-sans">Loading furniture gallery...</p>
      </div>
    );
  }

  if (furniture.length === 0) {
    return (
      <section className="relative bg-warm-off-white w-full min-h-screen flex items-center justify-center py-24">
        <div className="text-center max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal mb-6 tracking-tight">
              Furniture
            </h2>
            <div className="h-px w-16 bg-gold mb-8 mx-auto" aria-hidden="true" />
            <p className="text-lg sm:text-xl text-charcoal/70 font-sans leading-relaxed mb-4">
              {hasError ? 'Unable to load gallery at this time.' : 'Gallery coming soon'}
            </p>
            <p className="text-base text-charcoal/50 font-sans">
              Our handcrafted furniture collection will be available shortly.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative bg-warm-off-white w-full min-h-screen">
        <div className="flex flex-col lg:flex-row w-full max-w-[2000px] mx-auto h-full">
          
          <div className="w-full lg:w-1/2 flex flex-col py-16 sm:py-24 lg:py-0 h-full">
            <div className="px-4 sm:px-8 lg:px-16 xl:px-24 lg:py-32 w-full max-w-2xl lg:ml-auto h-full">
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-16 lg:mb-32 text-center lg:text-left"
              >
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-charcoal mb-4 sm:mb-6 tracking-tight leading-tight">
                  Furniture
                </h2>
                <p className="text-base sm:text-lg text-charcoal/80 font-sans leading-relaxed">
                  Handcrafted furniture shaped by materiality and restraint.
                </p>
              </motion.div>

              <div className="space-y-0 lg:space-y-0 h-full">
                {furniture.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <div className="lg:hidden block w-full h-full">
                      <MobileFurnitureCard item={item} index={index} onClick={() => openModal(index)} />
                    </div>

                    <article 
                      id={`furniture-${item.id}`}
                      className="furniture-card-desktop hidden lg:flex flex-col justify-center min-h-[70vh] py-12 w-full"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="text-left w-full"
                      >
                        <p className="text-gold font-medium tracking-wide uppercase text-sm font-sans mb-3">
                          Handcrafted
                        </p>
                        <h3 className="font-serif font-medium text-4xl xl:text-5xl text-charcoal tracking-tight mb-6">
                          Furniture {index + 1}
                        </h3>
                        <div className="h-px w-16 bg-gold mb-6" aria-hidden="true" />
                        <p className="text-lg text-charcoal/80 leading-relaxed font-sans mb-8 max-w-lg">
                          Minimalist detailing focusing on raw materiality and sharp geometry to enhance the natural space.
                        </p>
                      </motion.div>
                    </article>
                  </React.Fragment>
                ))}
              </div>
              
              <div className="hidden lg:block h-[30vh]" aria-hidden="true"></div>
            </div>
          </div>

          <div className="hidden lg:block w-1/2 h-[100vh] min-h-[100vh] sticky top-0 overflow-hidden bg-white">
            {furniture.map((item, index) => (
              <button
                key={`img-${item.id}`}
                onClick={() => openModal(index)}
                className={`absolute inset-0 w-full h-full min-h-[100vh] cursor-pointer group outline-none focus-visible:ring-inset focus-visible:ring-4 focus-visible:ring-gold transition-all duration-700 ease-in-out ${
                  activeItem === item.id ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'
                }`}
                aria-label={`View furniture ${index + 1} fullscreen`}
                tabIndex={activeItem === item.id ? 0 : -1}
              >
                <img
                  src={item.image_url}
                  alt={`Handcrafted furniture ${index + 1}`}
                  className="w-full h-full min-h-[100vh] object-cover object-center"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-300" />
              </button>
            ))}
          </div>

        </div>
      </section>

      <ImageGalleryModal
        isOpen={modalOpen}
        images={furniture}
        currentIndex={currentIndex}
        onClose={() => setModalOpen(false)}
        onNavigate={handleNavigate}
      />
    </>
  );
};

export default FurnitureGallery;