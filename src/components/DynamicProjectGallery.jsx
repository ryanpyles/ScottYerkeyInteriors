
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, FileImage as ImageIcon, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import ImageGalleryModal from '@/components/ImageGalleryModal';
import { Button } from '@/components/ui/button';

const DynamicProjectGallery = ({ folderName }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchImages = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log(`[Gallery] Starting fetch for bucket 'projects', folder: '${folderName}'`);

      const { data: files, error: listError } = await supabase.storage
        .from('projects')
        .list(folderName, {
          limit: 1000,
          sortBy: { column: 'name', order: 'asc' }
        });

      if (listError) throw listError;

      if (!files || files.length === 0) {
        console.log(`[Gallery] No files discovered in folder: '${folderName}'`);
        setImages([]);
        setLoading(false);
        return;
      }

      const imageFiles = files.filter(file => 
        !file.name.startsWith('.') && 
        /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file.name)
      );
      
      console.log(`[Gallery] Discovered ${imageFiles.length} valid images in folder: '${folderName}'`);

      const imageUrls = imageFiles.map(file => {
        const { data } = supabase.storage
          .from('projects')
          .getPublicUrl(`${folderName}/${file.name}`);
        
        return {
          image: data.publicUrl,
          url: data.publicUrl,
          title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
          description: `Image from ${folderName.replace(/[-_]/g, ' ')}`,
          name: file.name
        };
      });

      setImages(imageUrls);
      setLoading(false);
    } catch (err) {
      console.error(`[Gallery] Error loading images for '${folderName}':`, err);
      setError(err.message || 'Failed to load images');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [folderName]);

  const openModal = (index) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const handleNavigate = (direction) => {
    if (direction === 'prev') {
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    } else {
      setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    }
  };

  if (loading) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-charcoal/60 font-sans tracking-wide">Loading gallery images...</p>
        <div className="gallery-grid w-full mt-8">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="aspect-square bg-warm-border animate-pulse rounded-sm" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center text-center bg-warm-off-white/50 border border-warm-border/50 rounded-sm">
        <AlertCircle className="w-10 h-10 text-red-500/70 mb-4" />
        <p className="text-red-600 font-sans mb-2 font-medium">{error}</p>
        <p className="text-charcoal/50 font-sans text-sm mb-6">Bucket: projects | Folder: {folderName}</p>
        <Button
          onClick={fetchImages}
          variant="outline"
          className="border-gold text-charcoal hover:bg-gold hover:text-white transition-colors uppercase tracking-widest font-sans rounded-none"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry Connection
        </Button>
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center text-center border border-dashed border-warm-border bg-warm-off-white/50 rounded-sm">
        <ImageIcon className="w-12 h-12 text-charcoal/20 mb-4" />
        <p className="text-charcoal/80 font-sans tracking-wide font-medium">No images found in this gallery.</p>
        <p className="text-charcoal/50 font-sans text-sm mt-2">Bucket: projects | Folder: {folderName}</p>
      </div>
    );
  }

  return (
    <>
      <div className="gallery-grid w-full">
        {images.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="gallery-item aspect-square overflow-hidden cursor-pointer group bg-warm-border rounded-sm relative"
            onClick={() => openModal(index)}
          >
            <img
              src={item.url}
              alt={item.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 text-white font-sans tracking-widest uppercase text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 drop-shadow-md">
                View
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <ImageGalleryModal
        isOpen={modalOpen}
        images={images}
        currentIndex={currentIndex}
        onClose={() => setModalOpen(false)}
        onNavigate={handleNavigate}
      />
    </>
  );
};

export default DynamicProjectGallery;
