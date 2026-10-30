"use client";

import { useLayoutEffect, useRef } from "react";
import { MotionConfig, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scrubbed reveal for the heading, rule, and paragraphs.
 * `start` / `end` are the scroll window. `shift` is the upward travel in pixels.
 */
const ABOUT_REVEAL = {
  start: "top 90%",
  end: "top 48%",
  scrub: true,
  desktopShift: 28,
  mobileShift: 16,
  stagger: 0.16,
} as const;

export function AboutSection() {
  const copyRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const copy = copyRef.current;
    const heading = headingRef.current;
    const rule = ruleRef.current;
    if (!copy || !heading || !rule) return;

    const lines = heading.querySelectorAll("span");
    const paragraphs = copy.querySelectorAll("p");
    if (lines.length === 0 || paragraphs.length === 0) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      const reveal = (shift: number) => {
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: copy,
            start: ABOUT_REVEAL.start,
            end: ABOUT_REVEAL.end,
            scrub: ABOUT_REVEAL.scrub,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .fromTo(
            lines,
            { y: shift, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              stagger: ABOUT_REVEAL.stagger,
              duration: 0.45,
            },
          )
          .fromTo(
            rule,
            { scaleX: 0, autoAlpha: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              autoAlpha: 1,
              duration: 0.3,
              transformOrigin: "left center",
            },
            0.18,
          )
          .fromTo(
            paragraphs,
            { y: shift * 0.75, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              stagger: ABOUT_REVEAL.stagger,
              duration: 0.45,
            },
            0.32,
          );
      };

      media.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => reveal(ABOUT_REVEAL.desktopShift),
      );

      media.add(
        "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        () => reveal(ABOUT_REVEAL.mobileShift),
      );
    }, copy);

    ScrollTrigger.refresh();

    return () => context.revert();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
    <section
      id="about"
      className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24 md:px-12 md:py-32"
    >
      <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
        <div ref={copyRef}>
          <h2
            ref={headingRef}
            className="mb-8 text-4xl font-serif leading-tight text-[#0D365E] md:text-6xl"
          >
            <span className="block motion-safe:opacity-0">Dubai’s master-</span>
            <span className="mt-2 block motion-safe:opacity-0">planned city</span>
          </h2>
          <div
            ref={ruleRef}
            className="mb-8 h-px w-20 origin-left bg-[#008B95] motion-safe:opacity-0"
          />
          <p className="mb-6 text-lg leading-relaxed font-light text-black/70 motion-safe:opacity-0">
            Dubai South, the master-planned city, is built around growth, innovation, and opportunity. Designed to shape the future business, living, and connectivity of Dubai, this master community is home to a diverse range of residential communities, lifestyle destinations, commercial districts, and a thriving aviation and logistics hub.
          </p>
          <p className="text-lg leading-relaxed font-light text-black/70 motion-safe:opacity-0">
            With seamless access to the world’s largest airport (upon completion), the Al Maktoum International Airport, this community offers businesses and residents a chance to be part of Dubai’s next era of growth.
          </p>
        </div>
        <div className="relative [perspective:1000px]">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              rotateY: 10,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              rotateY: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1,
              type: "spring",
            }}
            className="relative"
          >
            <div className="aspect-[9/10] overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
              <img
                src="/assets/azizi_venice1.webp"
                alt="Architectural Detail"
                className="h-full w-full object-cover transition-all duration-700"
              />
            </div>
            <motion.div
              initial={{
                x: -20,
                opacity: 0,
              }}
              whileInView={{
                x: 0,
                opacity: 1,
              }}
              transition={{
                delay: 0.5,
                duration: 0.8,
              }}
              className="absolute -bottom-10 -left-10 hidden border border-black/10 bg-white p-8 shadow-xl md:block"
            >
              <p className="font-serif text-3xl">20+</p>
              <p className="mt-2 text-xs tracking-widest text-black/60 uppercase">
                Years of Excellence
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
    </MotionConfig>
  );
}
