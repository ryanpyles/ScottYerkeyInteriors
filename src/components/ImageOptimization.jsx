import React from 'react';

// Utility to handle image optimization with native HTML picture/srcset
// In a real-world scenario, you would use a CDN like Cloudinary or Imgix to append size parameters.
// Here we simulate it or just use the original URL if parameters aren't supported.
const ImageOptimization = ({ 
  src, 
  alt = "", 
  className = "", 
  loading = "lazy",
  sizes = "(max-width: 480px) 100vw, (max-width: 768px) 100vw, 100vw"
}) => {
  // If the URL is from Unsplash, we can easily add formatting params
  const isUnsplash = src && src.includes('unsplash.com');
  
  const generateUrl = (width) => {
    if (isUnsplash) {
      const url = new URL(src);
      url.searchParams.set('w', width);
      url.searchParams.set('q', '75');
      url.searchParams.set('fm', 'webp');
      return url.toString();
    }
    return src;
  };

  const srcSet = isUnsplash 
    ? `${generateUrl(480)} 480w, ${generateUrl(768)} 768w, ${generateUrl(1200)} 1200w, ${generateUrl(2000)} 2000w`
    : `${src} 1x, ${src} 2x`;

  return (
    <picture className="w-full h-full block">
      {/* WebP format explicitly targeted if supported by CDN, otherwise fallback */}
      <source 
        srcSet={srcSet} 
        sizes={sizes} 
        type="image/webp" 
      />
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading={loading}
        decoding="async"
        className={`object-cover w-full h-full image-responsive ${className}`}
      />
    </picture>
  );
};

export default ImageOptimization;