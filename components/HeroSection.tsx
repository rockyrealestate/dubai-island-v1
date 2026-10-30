"use client";

import { useLayoutEffect, useRef } from "react";
import { MotionConfig, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextReveal } from "@/lib/TextReveal";

/**
 * Scroll-scrubbed hero. The timeline maps 1:1 onto `distance`, then reverses
 * as the user scrolls back up. Native scrolling is unchanged.
 *
 * distance   — extra scroll while the hero stays pinned, as a percentage of
 *              the hero height. Increase it to slow the sequence down.
 * scrub      — `true` locks the timeline to scroll progress so it reverses
 *              immediately. A number (seconds) adds smoothing lag instead.
 * titleShift — how far the title travels upward, in pixels.
 * titleFade  — share of the timeline spent fading the title (0–1).
 * shrinkAt   — when the video starts shrinking (0–1). It runs until the end.
 * frame      — video box at the end of the pin. Width and height are
 *              percentages of the hero; radius is the corner radius in pixels.
 */
const HERO_SCROLL = {
  scrub: true,
  titleFade: 0.42,
  shrinkAt: 0.22,
  desktop: {
    distance: "+=160%",
    titleShift: -120,
    frame: { width: "70%", height: "58%", radius: 32 },
  },
  mobile: {
    distance: "+=80%",
    titleShift: -48,
    frame: { width: "90%", height: "74%", radius: 16 },
  },
} as const;

type HeroVariant = (typeof HERO_SCROLL)["desktop"];

function frameTarget(frame: HeroVariant["frame"]) {
  const width = Number.parseFloat(frame.width);
  const height = Number.parseFloat(frame.height);

  return {
    width: frame.width,
    height: frame.height,
    left: `${(100 - width) / 2}%`,
    top: `${(100 - height) / 2}%`,
    borderRadius: frame.radius,
  };
}

export function HeroSection() {
  const pinRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const pin = pinRef.current;
    const frame = frameRef.current;
    const copy = copyRef.current;
    const indicator = indicatorRef.current;
    if (!pin || !frame || !copy || !indicator) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      const play = (variant: HeroVariant) => {
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: variant.distance,
            pin: true,
            scrub: HERO_SCROLL.scrub,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(
            copy,
            {
              y: variant.titleShift,
              autoAlpha: 0,
              duration: HERO_SCROLL.titleFade,
            },
            0,
          )
          .to(
            indicator,
            {
              autoAlpha: 0,
              duration: HERO_SCROLL.titleFade * 0.75,
              immediateRender: false,
              overwrite: "auto",
            },
            0,
          )
          .fromTo(
            frame,
            {
              width: "100%",
              height: "100%",
              left: "0%",
              top: "0%",
              borderRadius: 0,
            },
            {
              ...frameTarget(variant.frame),
              duration: 1 - HERO_SCROLL.shrinkAt,
              immediateRender: false,
            },
            HERO_SCROLL.shrinkAt,
          );
      };

      media.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => play(HERO_SCROLL.desktop),
      );

      media.add(
        "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        () => play(HERO_SCROLL.mobile),
      );
    }, pin);

    const refresh = () => ScrollTrigger.refresh();
    refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      context.revert();
    };
  }, []);

  const handleScrollToFooter = () => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={pinRef}
        className="relative h-dvh w-full overflow-hidden bg-white"
      >
        <div
          ref={frameRef}
          className="absolute top-0 left-0 h-full w-full overflow-hidden backface-hidden"
        >
          <video
            src="https://rockyrealestate-website.s3.eu-north-1.amazonaws.com/videos/Dubai-Islands.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
            aria-label="Luxury Architecture"
          />
          <div className="absolute inset-0 z-10 bg-black/30" />
        </div>

        <div
          ref={copyRef}
          className="absolute inset-0 z-20 flex items-center justify-center px-4"
        >
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-8 text-5xl font-serif leading-tight md:text-8xl">
              <TextReveal
                text="Dubai Island"
                className="justify-center text-white/80"
                delay={0.4}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
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
          </div>
        </div>

        <div
          ref={indicatorRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-10 z-20 flex justify-center"
        >
          <div className="h-24 w-[1px] animate-pulse bg-gradient-to-b from-white to-transparent opacity-50" />
        </div>
      </section>
    </MotionConfig>
  );
}
