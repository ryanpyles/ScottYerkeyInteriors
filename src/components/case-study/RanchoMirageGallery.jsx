import React from 'react';
import ParallaxScrollGallery from './ParallaxScrollGallery';

const RanchoMirageGallery = ({ items }) => {
  return (
    <div className="w-full @container">
      <ParallaxScrollGallery items={items} />
    </div>
  );
};

export default RanchoMirageGallery;