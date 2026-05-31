import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LEFT_NAV  = [
  { label: 'Residences', href: '#residences' },
  { label: 'Philosophy', href: '#philosophy' },
];
const RIGHT_NAV = [
  { label: 'Approach',  href: '#approach' },
  { label: 'Inquiry',   href: '#inquiry'  },
];

// Works on main page (scroll) and project pages (navigate back to /#section)
function navigateTo(href) {
  const el = document.querySelector(href);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  } else {
    window.location.href = '/' + href;
  }
}

export default function Navigation({ introComplete = true, navWordmarkRef }) {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMobileNav = (href) => {
    setMenuOpen(false);
    setTimeout(() => navigateTo(href), 350);
  };

  // Logo click: go to homepage if on a project page, else scroll to top
  const handleLogoClick = () => {
    if (window.location.pathname !== '/') {
      window.location.href = '/';
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ── Fixed nav bar ── */}
      <motion.nav
        initial={{ opacity: 0, y: -8 }}
        animate={{
          opacity: introComplete ? 1 : 0,
          y:       introComplete ? 0 : -8,
        }}
        transition={{ duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'bg-ivory/90 backdrop-blur-md border-b border-limestone/60'
            : 'bg-transparent'
        }`}
      >
        {/* ─── Signature — absolutely centered in the nav (desktop only) ─── */}
        <button
          ref={navWordmarkRef}
          onClick={handleLogoClick}
          aria-label="Scott Arthur Yerkey — home"
          className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        >
          {/* White — over dark/hero backgrounds */}
          <img
            src="/signature-white.svg"
            alt="Scott Arthur Yerkey"
            className={`block h-20 w-auto transition-opacity duration-700 ${
              scrolled ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.4))' }}
            onLoad={(e) => e.currentTarget.classList.add('loaded')}
          />
          {/* Bold dark — over ivory background */}
          <img
            src="/signature-black-bold.svg"
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ${
              scrolled ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={(e) => e.currentTarget.classList.add('loaded')}
          />
        </button>

        <div className="editorial-container py-6 lg:py-8">

          {/* ── Desktop: links only ── */}
          <div className="hidden lg:flex items-center justify-between">
            <div className="flex items-center gap-10">
              {LEFT_NAV.map((item) => (
                <NavLink key={item.label} item={item} scrolled={scrolled} />
              ))}
            </div>
            <div className="flex items-center gap-10">
              {RIGHT_NAV.map((item) => (
                <NavLink key={item.label} item={item} scrolled={scrolled} />
              ))}
            </div>
          </div>

          {/* ── Mobile ── */}
          <div className="flex lg:hidden items-center justify-between">
            <button
              onClick={handleLogoClick}
              className="relative flex items-center min-h-[44px]"
              aria-label="Scott Arthur Yerkey — home"
            >
              <img
                src="/signature-white.svg"
                alt="Scott Arthur Yerkey"
                className={`block h-10 w-auto transition-opacity duration-700 ${
                  scrolled || menuOpen ? 'opacity-0' : 'opacity-100'
                }`}
                onLoad={(e) => e.currentTarget.classList.add('loaded')}
              />
              <img
                src="/signature-black-bold.svg"
                alt=""
                aria-hidden="true"
                className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 ${
                  scrolled || menuOpen ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={(e) => e.currentTarget.classList.add('loaded')}
              />
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className={`label-caps text-[8px] tracking-[0.25em] transition-colors duration-300
                min-h-[44px] min-w-[44px] flex items-center justify-end ${
                scrolled || menuOpen ? 'text-charcoal' : 'text-ivory'
              } hover:text-bronze`}
            >
              {menuOpen ? 'Close' : 'Menu'}
            </button>
          </div>

        </div>
      </motion.nav>

      {/* ── Mobile fullscreen overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-40 bg-ivory flex flex-col justify-center items-center lg:hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex flex-col items-center gap-10">
              {[...LEFT_NAV, ...RIGHT_NAV].map((item, i) => (
                <motion.button
                  key={item.label}
                  onClick={() => handleMobileNav(item.href)}
                  className="font-serif font-light text-5xl text-charcoal hover:text-bronze transition-colors duration-400 min-h-[44px] flex items-center"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
            <p className="absolute bottom-10 label-caps-sm text-warm-gray/50">
              Interior Architecture &amp; Design
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ item, scrolled }) {
  return (
    <button
      onClick={() => navigateTo(item.href)}
      className={`group relative label-caps text-[9px] tracking-editorial pb-0.5 transition-colors duration-500 ${
        scrolled ? 'text-charcoal hover:text-bronze' : 'text-ivory/80 hover:text-ivory'
      }`}
    >
      {item.label}
      <span className="absolute bottom-0 left-0 h-px bg-bronze w-0 group-hover:w-full transition-all duration-500 ease-refined" />
    </button>
  );
}
