"use client";

import { useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { TextReveal } from '@/lib/TextReveal';

export function HeroSection() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  // Parallax transforms
  const yHero = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scaleHero = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  // Mouse parallax for hero
  const mouseX = useMotionValue(0);
  const heroX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), {
    stiffness: 100,
    damping: 30
  });

  const handleScrollToFooter = () => {
    const footer = document.getElementById('contact');
    footer?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center">

        <motion.div
          style={{
            y: yHero,
            scale: scaleHero,
            opacity: opacityHero,
            x: heroX
          }}
          className="absolute inset-0 z-0">

          <div className="absolute inset-0 bg-black/30 z-10" />
          <video
            src="https://res.cloudinary.com/dyz8uwgnj/video/upload/v1780571309/IMG_2036_pbgfsq.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            aria-label="Luxury Architecture"
          />

        </motion.div>

        <motion.div
          style={{
            y: yText,
            x: useTransform(heroX, (val) => val * -0.5)
          }}
          className="relative z-20 text-center px-4 max-w-5xl mx-auto">

          {/* <motion.p
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.8,
              delay: 0.2
            }}
            className="text-sm md:text-base uppercase tracking-[0.3em] mb-6 text-white/80">

            Redefining Modern Living
          </motion.p> */}

          <div className="text-5xl md:text-8xl font-serif mb-8 leading-tight">
            <TextReveal
              text="Dubai Island"
              className="justify-center text-white/80"
              delay={0.4} />
{/* 
            <motion.span
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              transition={{
                delay: 0.8,
                duration: 1
              }}
              className="font-light block text-white/80">

              Live the Future
            </motion.span> */}
          </div>

          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.8,
              delay: 1
            }}>

            <motion.button
              type="button"
              onClick={handleScrollToFooter}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="mx-auto inline-flex items-center justify-center bg-white/10 px-7 py-3 text-xs md:text-sm uppercase tracking-[0.22em] text-white/90 ring-1 ring-white/25 backdrop-blur transition-all duration-300 hover:bg-white/15 hover:text-white hover:ring-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black/30"
              aria-label="Scroll to footer contact section"
            >
              Contact us
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            delay: 1.5,
            duration: 1
          }}
          className="absolute bottom-10 left-0 right-0 flex justify-center">

          <div className="w-[1px] h-24 bg-gradient-to-b from-white to-transparent opacity-50 animate-pulse"></div>
        </motion.div>
    </section>
  )
}