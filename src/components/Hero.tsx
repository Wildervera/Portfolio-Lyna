import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Star } from 'lucide-react';

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
  paragraph: { left: '10%', bottom: '10%', maxWidth: '280px' },

  /** Párrafo (MOBILE/TABLET) */
  paragraphMobile: { right: '4vw', top: '24%', maxWidth: '31vw' },

  /** Píldora "3+ years of experience" */
  pillExperience: { right: '3%', top: '65%' },

  /** Píldora "B2B|B2C|Saas" */
  pillB2B: { right: '9%', top: '75%' },

  /** Píldora "Based in Medellin" */
  pillMedellin: { right: '2%', top: '85%' },

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
    <div className="relative w-full h-full text-black overflow-hidden flex items-center justify-center" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Main Content Container */}
      <div className="relative w-full h-full flex items-center justify-center">

        {/* MOBILE/TABLET: Name on one line + paragraph — LEFT side */}
        <div
          className="absolute z-20 md:hidden flex flex-col"
          style={{ left: '5vw', top: '22%', maxWidth: '38vw', gap: '80px' }}
        >
          {/* Lyna Seridji on the same horizontal line */}
          <div className="flex flex-row gap-[0.3em]">
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

          {/* Paragraph below the name */}
          <motion.p
            className="font-normal leading-[1.2] flex flex-wrap"
            style={{ fontSize: '16px' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.25, delayChildren: 0.3 } }
            }}
          >
            {"I solve complex product problem by aligning business goals, user needs, and scalable systems.".split(" ").map((word, i) => (
              <motion.span
                key={i}
                style={{ marginRight: "0.25em" }}
                variants={{
                  hidden: { color: "#C0C0C0" },
                  visible: { color: "#313131", transition: { duration: 1 } }
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        </div>

        {/* DESKTOP: Lyna y Seridji por separado para posicionar libremente */}
        <div className="absolute inset-0 hidden md:flex items-center justify-center z-0 select-none pointer-events-none" style={{ marginTop: '-5%' }}>
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

        {/* Main Image - Centered, responsive */}
        <div className="relative z-10 flex items-end justify-center pointer-events-none translate-x-[15%] md:translate-x-0" style={{ height: 'calc(100% - 15vh)' }}>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src="/Lyna/lyna-hero.png"
              alt="Lyna Seridji"
              className="h-full max-h-[70vh] md:max-h-[80vh] w-auto object-contain object-bottom"
            />
          </motion.div>
        </div>

        {/* MOBILE/TABLET: Pills */}
        <div
          className="absolute z-20 md:hidden overflow-visible"
          style={{
            right: HERO_LAYOUT.pillsMobile.right,
            bottom: HERO_LAYOUT.pillsMobile.bottom,
          }}
        >
          <motion.div
            className="flex gap-[0.8vw] items-end"
            style={{
              flexDirection: HERO_LAYOUT.pillsMobile.direction === 'col' ? 'column' : 'row',
              gap: 'clamp(6px, 1.5vw, 12px)',
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { delayChildren: 0, staggerChildren: 1 } }
            }}
          >
            <motion.div
              className="cursor-pointer pointer-events-auto z-30 relative"
              variants={{
                hidden: { opacity: 0, scale: 0.8, x: "100vw", y: -80, rotate: -15 },
                visible: { opacity: 1, scale: 1, x: 0, y: 0, rotate: 0, transition: { type: "tween", duration: 1.5, ease: "easeOut" } }
              }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.span
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                className="flex items-center gap-2 bg-white text-[#111111] rounded-full whitespace-nowrap shadow-sm"
                style={{ border: '4px solid #F0F2F5', padding: '3px 12px 3px 3px', fontSize: 'clamp(11px, 3.5vw, 16px)', fontWeight: 500 }}
              >
                <div
                  className="flex items-center justify-center bg-[#F9C500] rounded-full text-[#4C2300]"
                  style={{ width: 'clamp(24px, 6vw, 36px)', height: 'clamp(24px, 6vw, 36px)', minWidth: '20px', minHeight: '20px' }}
                >
                  <Star size="55%" strokeWidth={2.5} fill="currentColor" />
                </div>
                3+ years of experience
              </motion.span>
            </motion.div>
            <motion.div
              className="cursor-pointer pointer-events-auto z-30 relative"
              variants={{
                hidden: { opacity: 0, scale: 0.8, x: "120vw", y: -100, rotate: -35 },
                visible: { opacity: 1, scale: 1, x: 0, y: 0, rotate: 0, transition: { type: "tween", duration: 1.5, ease: "easeOut" } }
              }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.span
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                className="flex items-center gap-2 bg-white text-[#111111] rounded-full whitespace-nowrap shadow-sm"
                style={{ border: '4px solid #F0F2F5', padding: '3px 12px 3px 3px', fontSize: 'clamp(11px, 3.5vw, 16px)', fontWeight: 500 }}
              >
                <div
                  className="flex items-center justify-center bg-[#0AA2FF] rounded-full text-[#DBF0FF]"
                  style={{ width: 'clamp(24px, 6vw, 36px)', height: 'clamp(24px, 6vw, 36px)', minWidth: '20px', minHeight: '20px' }}
                >
                  <MapPin size="55%" strokeWidth={2.5} />
                </div>
                Based in Medellin
              </motion.span>
            </motion.div>
            <motion.div
              className="cursor-pointer pointer-events-auto z-30 relative"
              variants={{
                hidden: { opacity: 0, scale: 0.8, x: "140vw", y: -120, rotate: 45 },
                visible: { opacity: 1, scale: 1, x: 0, y: 0, rotate: 0, transition: { type: "tween", duration: 1.5, ease: "easeOut" } }
              }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.span
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="flex items-center gap-2 bg-white text-[#111111] rounded-full whitespace-nowrap shadow-sm"
                style={{ border: '4px solid #F0F2F5', padding: '3px 12px 3px 3px', fontSize: 'clamp(11px, 3.5vw, 16px)', fontWeight: 500 }}
              >
                <div
                  className="flex items-center justify-center bg-[#FF5C00] rounded-full text-[#FFF0D4]"
                  style={{ width: 'clamp(24px, 6vw, 36px)', height: 'clamp(24px, 6vw, 36px)', minWidth: '20px', minHeight: '20px' }}
                >
                  <Briefcase size="55%" strokeWidth={2.5} />
                </div>
                B2B | B2C | Saas
              </motion.span>
            </motion.div>
          </motion.div>
        </div>

        {/* DESKTOP: Párrafo */}
        <div
          className="absolute z-20 pointer-events-auto hidden md:block left-[3%] lg:left-[10%]"
          style={{
            bottom: HERO_LAYOUT.paragraph.bottom,
            maxWidth: HERO_LAYOUT.paragraph.maxWidth,
          }}
        >
          <motion.p
            className="font-normal flex flex-wrap"
            style={{ fontSize: 'clamp(13px, 1.758vw, 26px)', lineHeight: '1.5', fontFamily: "'Inter', sans-serif" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.25, delayChildren: 0.3 } }
            }}
          >
            {"I solve complex product problem by aligning business goals, user needs, and scalable systems.".split(" ").map((word, i) => (
              <motion.span
                key={i}
                style={{ marginRight: "0.25em" }}
                variants={{
                  hidden: { color: "#C0C0C0" },
                  visible: { color: "#313131", transition: { duration: 1 } }
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        </div>

        {/* DESKTOP: Píldoras — cada una con posición editable */}
        <motion.div
          className="hidden md:block absolute inset-0 z-20 pointer-events-none overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { delayChildren: 0, staggerChildren: 1 } }
          }}
        >
          {/* Pill 1 */}
          <motion.div
            className="absolute pointer-events-auto cursor-pointer"
            style={{
              right: HERO_LAYOUT.pillExperience.right,
              top: HERO_LAYOUT.pillExperience.top,
            }}
            variants={{
              hidden: { opacity: 0, scale: 0.8, x: "100vw", y: -80, rotate: -15 },
              visible: { opacity: 1, scale: 1, x: 0, y: 0, rotate: 0, transition: { type: "tween", duration: 1.5, ease: "easeOut" } }
            }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 }}
              className="flex items-center gap-3 bg-white text-[#111111] rounded-full whitespace-nowrap shadow-sm"
              style={{
                border: 'clamp(3px, 0.586vw, 6px) solid #F0F2F5',
                padding: 'clamp(3px, 0.39vw, 4px) clamp(10px, 1.953vw, 20px) clamp(3px, 0.39vw, 4px) clamp(3px, 0.39vw, 4px)',
                fontSize: 'clamp(13px, 1.758vw, 18px)',
                lineHeight: '22px',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
              }}
            >
              <div
                className="flex items-center justify-center bg-[#F9C500] rounded-full text-[#4C2300]"
                style={{ width: 'clamp(22px, 3.125vw, 32px)', height: 'clamp(22px, 3.125vw, 32px)' }}
              >
                <Star size="55%" strokeWidth={2.5} fill="currentColor" />
              </div>
              3+ years of experience
            </motion.div>
          </motion.div>

          {/* Pill 2 */}
          <motion.div
            className="absolute pointer-events-auto cursor-pointer"
            style={{
              right: HERO_LAYOUT.pillB2B.right,
              top: HERO_LAYOUT.pillB2B.top,
            }}
            variants={{
              hidden: { opacity: 0, scale: 0.8, x: "120vw", y: -100, rotate: 45 },
              visible: { opacity: 1, scale: 1, x: 0, y: 0, rotate: 0, transition: { type: "tween", duration: 1.5, ease: "easeOut" } }
            }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="flex items-center gap-3 bg-white text-[#111111] rounded-full whitespace-nowrap shadow-sm"
              style={{
                border: 'clamp(3px, 0.586vw, 6px) solid #F0F2F5',
                padding: 'clamp(3px, 0.39vw, 4px) clamp(10px, 1.953vw, 20px) clamp(3px, 0.39vw, 4px) clamp(3px, 0.39vw, 4px)',
                fontSize: 'clamp(13px, 1.758vw, 18px)',
                lineHeight: '22px',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
              }}
            >
              <div
                className="flex items-center justify-center bg-[#FF5C00] rounded-full text-[#FFF0D4]"
                style={{ width: 'clamp(22px, 3.125vw, 32px)', height: 'clamp(22px, 3.125vw, 32px)' }}
              >
                <Briefcase size="55%" strokeWidth={2.5} />
              </div>
              B2B | B2C | Saas
            </motion.div>
          </motion.div>

          {/* Pill 3 */}
          <motion.div
            className="absolute pointer-events-auto cursor-pointer"
            style={{
              right: HERO_LAYOUT.pillMedellin.right,
              top: HERO_LAYOUT.pillMedellin.top,
            }}
            variants={{
              hidden: { opacity: 0, scale: 0.8, x: "140vw", y: -120, rotate: -45 },
              visible: { opacity: 1, scale: 1, x: 0, y: 0, rotate: 0, transition: { type: "tween", duration: 1.5, ease: "easeOut" } }
            }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              className="flex items-center gap-3 bg-white text-[#111111] rounded-full whitespace-nowrap shadow-sm"
              style={{
                border: 'clamp(3px, 0.586vw, 6px) solid #F0F2F5',
                padding: 'clamp(3px, 0.39vw, 4px) clamp(10px, 1.953vw, 20px) clamp(3px, 0.39vw, 4px) clamp(3px, 0.39vw, 4px)',
                fontSize: 'clamp(13px, 1.758vw, 18px)',
                lineHeight: '22px',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
              }}
            >
              <div
                className="flex items-center justify-center bg-[#0AA2FF] rounded-full text-[#DBF0FF]"
                style={{ width: 'clamp(22px, 3.125vw, 32px)', height: 'clamp(22px, 3.125vw, 32px)' }}
              >
                <MapPin size="55%" strokeWidth={2.5} />
              </div>
              Based in Medellin
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
