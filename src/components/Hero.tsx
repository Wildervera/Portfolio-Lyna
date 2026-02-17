import React from 'react';
import { motion } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════════════════
 * CONFIGURACIÓN DE POSICIONAMIENTO - Modifica estos valores para mover los elementos
 * Usa % para porcentaje, px para píxeles, vw/vh para viewport
 * ═══════════════════════════════════════════════════════════════════════════ */

const HERO_LAYOUT = {
  /** Nombre "Lyna" — posición independiente (DESKTOP) */
  nameLyna: { left: '10%', top: '45%' },

  /** Nombre "Seridji" — posición independiente (DESKTOP) */
  nameSeridji: { left: '60%', top: '45%' },

  /** Párrafo "I solve complex product problem..." (DESKTOP) */
  paragraph: { left: '10%', bottom: '30%', maxWidth: '376px' },

  /** Párrafo (MOBILE/TABLET) */
  paragraphMobile: { right: '1vw', top: '24%', maxWidth: '38vw' },

  /** Píldora "3+ years of experience" */
  pillExperience: { right: '10%', top: '55%' },

  /** Píldora "B2B|B2C|Saas" */
  pillB2B: { right: '24%', top: '65%' },

  /** Píldora "Based in Medellin" */
  pillMedellin: { right: '11%', top: '75%' },

  /** Contenedor de píldoras en móvil (vertical/horizontal) */
  pillsMobile: {
    right: '4vw',
    bottom: '12%',
    /** 'col' = columna vertical, 'row' = fila horizontal */
    direction: 'col' as 'col' | 'row',
    gap: '0.8vw',
  },
};

const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-full text-black overflow-hidden flex items-center justify-center" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#FAF9F6' }}>
      {/* Main Content Container */}
      <div className="relative w-full h-full flex items-center justify-center">

        {/* MOBILE/TABLET: Name on left side — Lyna y Seridji separados */}
        <div className="absolute left-[5vw] top-[15%] z-20 lg:hidden">
          <h1
            className="leading-[0.95] tracking-[-0.03em] text-[#313131]"
            style={{ fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif", fontWeight: 590, fontSize: '12vw' }}
          >
            Lyna
          </h1>
          <h1
            className="leading-[0.95] tracking-[-0.03em] text-[#313131]"
            style={{ fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif", fontWeight: 590, fontSize: '12vw' }}
          >
            Seridji
          </h1>
        </div>

        {/* MOBILE/TABLET: Description */}
        <div
          className="absolute z-20 lg:hidden"
          style={{
            right: HERO_LAYOUT.paragraphMobile.right,
            top: HERO_LAYOUT.paragraphMobile.top,
            maxWidth: HERO_LAYOUT.paragraphMobile.maxWidth,
          }}
        >
          <p className="font-normal leading-[1.2] text-[#313131]" style={{ fontSize: '2.6vw' }}>
            I solve complex product problem by aligning business goals, user needs, and scalable systems.
          </p>
        </div>

        {/* DESKTOP: Lyna y Seridji por separado para posicionar libremente */}
        <div className="absolute inset-0 hidden lg:flex items-center justify-center z-0 select-none pointer-events-none" style={{ marginTop: '-5%' }}>
          <h1
            className="absolute text-[#313131]"
            style={{
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
              fontWeight: 590,
              fontSize: 'clamp(100px, 14vw, 180px)',
              lineHeight: '215px',
              left: HERO_LAYOUT.nameLyna.left,
              top: HERO_LAYOUT.nameLyna.top,
              transform: 'translateY(-50%)',
            }}
          >
            Lyna
          </h1>
          <h1
            className="absolute text-[#313131]"
            style={{
              fontFamily: "'SF Pro', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
              fontWeight: 590,
              fontSize: 'clamp(100px, 14vw, 180px)',
              lineHeight: '215px',
              left: HERO_LAYOUT.nameSeridji.left,
              top: HERO_LAYOUT.nameSeridji.top,
              transform: 'translateY(-50%)',
            }}
          >
            Seridji
          </h1>
        </div>

        {/* Main Image - Centered, fully responsive */}
        <motion.div
          className="relative z-10 flex items-end justify-center pointer-events-none"
          style={{ height: 'calc(100% - 15vh)' }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/Lyna/lyna-hero.png"
            alt="Lyna Seridji"
            className="h-full max-h-[88vh] lg:max-h-[80vh] w-auto object-contain object-bottom"
          />
        </motion.div>

        {/* MOBILE/TABLET: Pills — dirección configurable (vertical u horizontal) */}
        <div
          className="absolute z-20 lg:hidden"
          style={{
            right: HERO_LAYOUT.pillsMobile.right,
            bottom: HERO_LAYOUT.pillsMobile.bottom,
          }}
        >
          <div
            className="flex gap-[0.8vw] items-end"
            style={{
              flexDirection: HERO_LAYOUT.pillsMobile.direction === 'col' ? 'column' : 'row',
              gap: HERO_LAYOUT.pillsMobile.gap,
            }}
          >
            <span
              className="bg-[#313131] text-white rounded-full font-normal tracking-wide whitespace-nowrap"
              style={{ padding: '6px 16px', fontSize: '2vw' }}
            >
              3+ years of experience
            </span>
            <span
              className="bg-[#313131] text-white rounded-full font-normal tracking-wide whitespace-nowrap"
              style={{ padding: '6px 16px', fontSize: '2vw' }}
            >
              Based in Medellin
            </span>
            <span
              className="bg-[#313131] text-white rounded-full font-normal tracking-wide whitespace-nowrap"
              style={{ padding: '6px 16px', fontSize: '2vw' }}
            >
              B2B | B2C | Saas
            </span>
          </div>
        </div>

        {/* DESKTOP: Párrafo */}
        <div
          className="absolute z-20 pointer-events-auto hidden lg:block"
          style={{
            left: HERO_LAYOUT.paragraph.left,
            bottom: HERO_LAYOUT.paragraph.bottom,
            maxWidth: HERO_LAYOUT.paragraph.maxWidth,
          }}
        >
          <p
            className="font-normal text-[#313131]"
            style={{ fontSize: '24px', lineHeight: '29px', fontFamily: "'Inter', sans-serif" }}
          >
            I solve complex product problem by aligning business goals, user needs, and scalable systems.
          </p>
        </div>

        {/* DESKTOP: Píldoras — cada una con posición editable */}
        <div className="hidden lg:block">
          <span
            className="absolute bg-[#313131] text-white rounded-full font-normal tracking-wide z-20"
            style={{
              right: HERO_LAYOUT.pillExperience.right,
              top: HERO_LAYOUT.pillExperience.top,
              padding: '5px 16px',
              fontSize: '18px',
              lineHeight: '22px',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            3+ years of experience
          </span>

          <span
            className="absolute bg-[#313131] text-white rounded-full font-normal tracking-wide z-20"
            style={{
              right: HERO_LAYOUT.pillB2B.right,
              top: HERO_LAYOUT.pillB2B.top,
              padding: '5px 15px',
              fontSize: '18px',
              lineHeight: '22px',
              fontFamily: "'Inter', sans-serif",
              transform: 'rotate(-0.4deg)',
            }}
          >
            B2B | B2C | Saas
          </span>

          <span
            className="absolute bg-[#313131] text-white rounded-full font-normal tracking-wide z-20"
            style={{
              right: HERO_LAYOUT.pillMedellin.right,
              top: HERO_LAYOUT.pillMedellin.top,
              padding: '5px 21px',
              fontSize: '18px',
              lineHeight: '22px',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Based in Medellin
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
