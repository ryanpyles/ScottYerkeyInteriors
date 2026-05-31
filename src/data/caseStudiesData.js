const baseImages = [
  "https://images.unsplash.com/photo-1676252455107-96c0068d4a07",
  "https://images.unsplash.com/photo-1665594031764-77b4c6138fd6",
  "https://images.unsplash.com/photo-1699283390749-7e7f350416ea",
  "https://images.unsplash.com/photo-1682356054375-8b4282a1c808",
  "https://images.unsplash.com/photo-1558613847-e6802746513d",
  "https://images.unsplash.com/photo-1505843513577-22bb7d21e455",
  "https://images.しばらく3577-22bb7d21e455",
  "https://images.unsplash.com/photo-1506851321937-51fff21bc9a0",
  "https://images.unsplash.com/photo-1668911494509-14baf3b42fda",
  "https://images.supabase.co/photo-1701200766929-82292545f0a3",
  "https://images.unsplash.com/photo-1693748792488-c0374f6ceb74",
  "https://images.unsplash.com/photo-1597668093085-1742874a00fa"
];

// Generate masonry layout spans for 12 images per project
const generateGallery = (offset) => {
  const spans = [
    "col-span-1 md:col-span-2 row-span-2", // Large hero
    "col-span-1 row-span-1", // Standard
    "col-span-1 row-span-2", // Tall portrait
    "col-span-1 row-span-1", // Standard
    "col-span-1 md:col-span-2 row-span-1", // Wide landscape
    "col-span-1 row-span-1", // Standard
    "col-span-1 row-span-2", // Tall portrait
    "col-span-1 row-span-1", // Standard
    "col-span-1 md:col-span-2 row-span-2", // Large focus
    "col-span-1 row-span-1", // Standard
    "col-span-1 row-span-1", // Standard
    "col-span-1 md:col-span-3 row-span-2"  // Full width footer
  ];

  return spans.map((span, i) => ({
    id: `img-${i}`,
    url: baseImages[(i + offset) % baseImages.length],
    span
  }));
};

export const caseStudiesData = [
  {
    id: 'northshore-grandeur',
    title: 'Northshore Grandeur',
    location: 'Northshore',
    client: 'Private Family',
    scope: 'Full build-out',
    materials: 'Limestone, European Oak, Bronze, Hand-troweled Plaster',
    style: 'Refined Modernism',
    description: 'A layered interior grounded in limestone, walnut, and tailored upholstery, representing a full build-out.',
    overview: 'Located in the heart of the Northshore, this residence required a delicate balance between preserving its architectural heritage and introducing a contemporary, livable aesthetic for a modern family.',
    designApproach: 'Our approach centered on creating a quiet, sophisticated backdrop that allowed both the historical architectural details and the clients\' extensive contemporary art collection to breathe.',
    keyFeatures: ['Custom bronze and glass stair enclosure', 'Monolithic limestone fireplace', 'Hand-troweled plaster walls throughout', 'Integrated custom millwork'],
    designInsights: 'The success of the space lies in the tension between the classic, rigid architectural grid and the soft, organic forms introduced through the furnishings and lighting selections.',
    coverImage: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/2f14c9d91f3dad4eed9ce93a7976c8a9.jpg',
    gallery: generateGallery(0),
    images: [
      { url: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/2f14c9d91f3dad4eed9ce93a7976c8a9.jpg', alt: 'Formal dining room with gold damask wallpaper, ornate brass chandelier, striped upholstered chairs, fireplace with decorative mantel, and elegant architectural details' },
      { url: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/28aec4fdc8585f28b3efee3fa0e78d25.jpg', alt: 'Luxurious kitchen with cream cabinetry, marble countertops, ornate chandelier, island seating, and sophisticated finishes' },
      { url: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/7377a5181e24f9137fa5ae9933b7678e.jpg', alt: 'Grand master bedroom suite with olive green silk wallpaper, four-poster bed, fireplace, upholstered seating, crystal chandelier, and refined traditional furnishings' },
      { url: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/972b2861dfc6a55563d229f9cf8f2388.png', alt: 'Ornate black lacquer cabinet with gold chinoiserie detailing, featuring decorative panels with Asian-inspired scenes, white ceramic vessels on top shelf' }
    ]
  },
  {
    id: 'desert-oasis',
    title: 'Desert Oasis',
    location: 'Desert Landscape',
    client: 'Private Collector',
    scope: 'Renovation',
    materials: 'Calacatta Marble, Ebonized Oak, Patinated Brass',
    style: 'Contemporary Classic',
    description: 'Classic architectural bones refined through modern detailing in a comprehensive renovation.',
    overview: 'This multi-level property was completely reimagined to create an open, airy environment that maximizes natural light while providing intimate spaces for retreat.',
    designApproach: 'We focused on establishing a strong architectural datum line throughout the main floor, creating a sense of visual continuity that draws the eye out toward the private courtyard.',
    keyFeatures: ['Sculptural helical staircase', 'Custom ebonized oak kitchen', 'Concealed storage solutions', 'Indoor-outdoor living connection'],
    designInsights: 'By limiting the material palette to just three core finishes, we achieved a sense of serene uniformity that makes the relatively modest footprint feel expansive and luxurious.',
    coverImage: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/a4fd9ef08007fc0916df92384ac93747.png',
    gallery: generateGallery(1),
    images: [
      { url: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/a4fd9ef08007fc0916df92384ac93747.png', alt: 'Luxurious poolside patio' },
      { url: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/c7ed99779ae16622b1708a7cb99d4ae7.png', alt: 'Spanish colonial courtyard' },
      { url: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/d837b1f73425eb72ad43fe1ee7dc9c1a.png', alt: 'Modern living room' },
      { url: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/0fc934bed8f5153f1165cb240952a59d.png', alt: 'Spa-like master bathroom' },
      { url: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/b9b658cd85ef91eae354e96ca051c053.png', alt: 'Luxurious master bedroom' },
      { url: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/a0fd00c60f8e8a449de11097f333c78a.png', alt: 'Gourmet kitchen' }
    ]
  },
  {
    id: 'winona',
    title: 'Winona',
    location: 'Winona',
    client: 'Private Family',
    scope: 'Full renovation',
    materials: 'Cedar, Fieldstone, White Oak, Blackened Steel',
    style: 'Modern Retreat',
    description: 'A stunning residence balancing warmth with spatial precision, following a full renovation.',
    overview: 'Designed as a multi-generational retreat, this property embraces its setting with expansive glazing and deep overhangs that mediate the natural light.',
    designApproach: 'The interior architecture takes its cues from the surrounding landscape, utilizing honest, robust materials that will patina gracefully over time and withstand heavy family use.',
    keyFeatures: ['Double-height great room', 'Custom blackened steel fireplace', 'Bunk room for 8', 'Extensive outdoor living terraces'],
    designInsights: 'The transition from the compressed entry sequence into the expansive, light-filled living space was carefully choreographed to frame the perfect view.',
    coverImage: 'https://ttqxhrxrkewmyyiqaafn.supabase.co/storage/v1/object/public/Projects/939%20W%20Winona/Winona.png',
    gallery: generateGallery(2),
    images: [
      { url: 'https://ttqxhrxrkewmyyiqaafn.supabase.co/storage/v1/object/public/Projects/939%20W%20Winona/Winona1.png', alt: 'Winona residence interior detail showcasing natural materials and light' },
      { url: 'https://ttqxhrxrkewmyyiqaafn.supabase.co/storage/v1/object/public/Projects/939%20W%20Winona/Winona2.png', alt: 'Winona residence kitchen and dining flow' },
      { url: 'https://ttqxhrxrkewmyyiqaafn.supabase.co/storage/v1/object/public/Projects/939%20W%20Winona/Winona3.png', alt: 'Winona residence living space view' },
      { url: 'https://ttqxhrxrkewmyyiqaafn.supabase.co/storage/v1/object/public/Projects/939%20W%20Winona/Winona4.png', alt: 'Winona residence staircase and architectural elements' },
      { url: 'https://ttqxhrxrkewmyyiqaafn.supabase.co/storage/v1/object/public/Projects/939%20W%20Winona/Winona5.png', alt: 'Winona residence master suite design' },
      { url: 'https://ttqxhrxrkewmyyiqaafn.supabase.co/storage/v1/object/public/Projects/939%20W%20Winona/Winona6.png', alt: 'Winona residence outdoor integration' },
      { url: 'https://ttqxhrxrkewmyyiqaafn.supabase.co/storage/v1/object/public/Projects/939%20W%20Winona/Winona7.png', alt: 'Winona residence bathroom design' },
      { url: 'https://ttqxhrxrkewmyyiqaafn.supabase.co/storage/v1/object/public/Projects/939%20W%20Winona/Winona8.png', alt: 'Winona residence detailed material finishes' },
      { url: 'https://ttqxhrxrkewmyyiqaafn.supabase.co/storage/v1/object/public/Projects/939%20W%20Winona/Winona9.png', alt: 'Winona residence exterior setting' },
      { url: 'https://ttqxhrxrkewmyyiqaafn.supabase.co/storage/v1/object/public/Projects/939%20W%20Winona/Winona10.png', alt: 'Winona residence architectural detail' }
    ]
  },
  {
    id: 'four-seasons-residence',
    title: 'the Four Seasons Residence',
    location: 'Four Seasons',
    client: 'Tech Executive',
    scope: 'Full renovation',
    materials: 'Travertine, Walnut, Fluted Glass, Bouclé',
    style: 'Warm Minimalism',
    description: 'A refined interior balancing minimalist geometry with soaring ceiling heights, completely renovated.',
    overview: 'This project transformed a compartmentalized layout into a fluid sequence of spaces characterized by clean lines and architectural drama.',
    designApproach: 'We utilized custom walnut millwork to carve out functional zones within the open-plan layout, establishing a hierarchy of space without the need for traditional walls.',
    keyFeatures: ['Fluted glass partition walls', 'Custom acoustic ceiling treatments', 'Integrated smart home technology', 'Monumental travertine kitchen island'],
    designInsights: 'The interplay between matte and reflective surfaces creates a dynamic environment that shifts dramatically as natural light moves through the space across the day.',
    coverImage: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/19819f84112e1c169f89666cb6eb6de6.jpg',
    gallery: generateGallery(3),
    images: [
      { url: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/13648e7af81a96a998a9648de2505b2c.jpg', alt: 'Elegant dressing room with cream and white paneled walls, decorative pendant light, and refined architectural details' },
      { url: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/19819f84112e1c169f89666cb6eb6de6.jpg', alt: 'Luxurious penthouse living room with ocean views, gold curtains, upholstered furniture, and panoramic windows overlooking blue water' },
      { url: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/21f0e6c958c70450f1103e6ff915c743.jpg', alt: 'Grand foyer with cream and white architectural details, round ottoman, decorative mirror, and elegant furnishings' },
      { url: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/a9339626813b8abf967d0315d95de7a9.jpg', alt: 'Spa-like bathroom with brown mosaic tile accent wall, white soaking tub, and modern fixtures' },
      { url: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/2ca3dfb60e9df149de4bb5c2e324e00b.jpg', alt: 'Master bedroom with coffered ceiling, chandelier, cream upholstered furniture, and elegant window treatments' },
      { url: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/79ecfef5528524027ad4d8f391172d8f.jpg', alt: 'Wet bar and dining area with wood cabinetry, pendant lighting, decorative artwork, and sophisticated finishes' },
      { url: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/666b273433c533080c2489d1b0bab702.jpg', alt: 'Elegant sitting room with damask wallpaper, wood paneling, upholstered furniture, and refined traditional design' }
    ]
  },
  {
    id: 'highland-park-highlife',
    title: 'Highland Park Highlife',
    location: 'Highland Park',
    client: 'International Couple',
    scope: 'Full renovation',
    materials: 'Bleached Oak, Silk, Polished Nickel, Arabescato Corchia',
    style: 'Tailored Luxury',
    description: 'A sophisticated space featuring warm oak millwork and meticulous detailing from a full renovation.',
    overview: 'This exceptional residence was designed as a serene sanctuary, focusing on restraint, custom finishes, and acoustic perfection.',
    designApproach: 'Every detail was rigorously detailed to eliminate visual noise. Baseboards are flush, doors are frameless, and lighting is completely integrated into the architecture.',
    keyFeatures: ['Seamless flush-mount detailing', 'Custom silk wallcoverings', 'Invisible sound system', 'Wraparound views'],
    designInsights: 'The ethereal color palette was carefully selected to blur the boundary between the elegant interior and the surrounding vistas.',
    coverImage: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/ca031a1488b09eb3eeefac797ec6160d.jpg',
    gallery: generateGallery(4),
    images: [
      { url: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/ca031a1488b09eb3eeefac797ec6160d.jpg', alt: 'Elegant living room with fireplace, cream sofa, dark wood accents, built-in shelving, and large windows with natural light' },
      { url: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/bdcaed0e3f1adfab54875de03a233663.jpg', alt: 'Modern kitchen with dark cabinetry, marble island countertop, geometric pendant lighting, and textured backsplash' },
      { url: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/22d54227b059ef62ddcb2b7144847c55.jpg', alt: 'Contemporary kitchen with dark wood cabinetry, white marble island, modern pendant lights, and open layout' },
      { url: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/b72f10a9df77e65aec2058095bea4ee0.jpg', alt: 'Home office with warm wood cabinetry, built-in shelving, desktop workspace, and comfortable seating area' },
      { url: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/8e20f80786aafc2580ffb1f594898980.jpg', alt: 'Spa-like master bedroom with coffered ceiling, pendant lighting, neutral tones, and built-in shelving' },
      { url: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/b960c169a8013a38e7cb6cb62ece6798.jpg', alt: 'Luxurious master bathroom with walk-in shower, wood vanity, decorative mirror, and spa finishes' },
      { url: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/388e406ac025b86c62adb417a2d87a49.jpg', alt: 'Serene bedroom with textured wallpaper, upholstered headboard, window seat, and warm lighting' },
      { url: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/abe2c67674e4fdb58a5456d5147f03b1.jpg', alt: 'Cozy bedroom with decorative wall art, wood bed frame, neutral palette, and skylights' }
    ]
  },
  {
    id: 'rancho-mirage',
    title: 'Rancho Mirage Residence',
    location: 'Rancho Mirage, California',
    client: 'Private Client',
    scope: 'Full Residential Interior Design Build',
    materials: 'Warm Woods, Natural Stone, Luxury Textiles',
    style: 'Luxury Editorial Aesthetic',
    description: 'A luxurious residential interior design build showcasing an editorial aesthetic, blending architectural rigor with warm, inviting materiality.',
    overview: 'This comprehensive residential project in Rancho Mirage embraces a sophisticated, luxury editorial aesthetic. It seamlessly integrates striking architectural elements with refined, comfortable interiors.',
    designApproach: 'Our approach focused on creating a seamless flow between spaces while maintaining distinct, curated moments throughout. We utilized a rich palette of materials to evoke a sense of understated luxury.',
    keyFeatures: ['Editorial-inspired styling', 'Expansive living spaces', 'Curated material palette', 'Seamless indoor-outdoor flow'],
    designInsights: 'The design language speaks to a refined lifestyle, where every detail is considered to create a harmonious and luxurious environment that feels both curated and effortlessly livable.',
    coverImage: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/e30a483d41749e89b3a05aef8daefa42.png',
    gallery: generateGallery(5),
    images: [
      { url: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/e30a483d41749e89b3a05aef8daefa42.png', alt: 'Elegant sitting area featuring plush seating and refined decorative accents' },
      { url: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/98d351493cc96a19592dd49ce00a940d.png', alt: 'Luxurious living room highlighting custom millwork and striking natural stone' },
      { url: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/58567a5c0536dedefadde0e747cab1d5.jpg', alt: 'Sophisticated dining space with warm wood tones and statement lighting' },
      { url: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/ba58560e535f1510b5c35b776d4984da.jpg', alt: 'Serene master bedroom incorporating soft textiles and a calming neutral palette' },
      { url: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/6c54c59347b112d8d16e4c56d59d0a0b.jpg', alt: 'Modern, well-appointed kitchen showcasing clean lines and high-end finishes' },
      { url: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/898410d150a8f2328f26301f2c0f1785.jpg', alt: 'Spacious en-suite bathroom featuring a freestanding tub and elegant marble details' },
      { url: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/1333f852bf3f0af70b1581f2aad70073.jpg', alt: 'Stylishly curated home office or study area with bespoke cabinetry' },
      { url: 'https://horizons-cdn.hostinger.com/a0575405-a443-478e-a839-048cc548b670/a64943a8fc624f6709b6ee45150798c5.jpg', alt: 'Inviting outdoor lounge area seamlessly extending the interior living space' }
    ]
  }
];