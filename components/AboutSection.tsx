"use client";

import { motion } from "framer-motion";
import { TextReveal } from "@/lib/TextReveal";

export function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{
            opacity: 0,
            x: -50
          }}
          whileInView={{
            opacity: 1,
            x: 0
          }}
          viewport={{
            once: true,
            margin: '-100px'
          }}
          transition={{
            duration: 0.8
          }}>

          <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight text-[#0D365E]">
            <TextReveal text="Dubai’s master-" />
            <span className="block mt-2">planned city</span>
          </h2>
          <motion.div
            initial={{
              width: 0
            }}
            whileInView={{
              width: 80
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 1,
              delay: 0.5
            }}
            className="h-[1px] bg-[#008B95] mb-8">
          </motion.div>
          <p className="text-black/70 text-lg leading-relaxed mb-6 font-light">
            Dubai South, the master-planned city, is built around growth, innovation, and opportunity. Designed to shape the future business, living, and connectivity of Dubai, this master community is home to a diverse range of residential communities, lifestyle destinations, commercial districts, and a thriving aviation and logistics hub.
          </p>
          <p className="text-black/70 text-lg leading-relaxed font-light">
            With seamless access to the world’s largest airport (upon completion), the Al Maktoum International Airport, this community offers businesses and residents a chance to be part of Dubai’s next era of growth.
          </p>
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
            rotateY: 10
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            rotateY: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 1,
            type: 'spring'
          }}
          className="relative perspective-1000">

          <div className="aspect-[9/10] overflow-hidden shadow-2xl transform transition-transform hover:scale-[1.02] duration-700">
            <img
              src="/assets/azizi_venice1.webp"
              alt="Architectural Detail"
              className="w-full h-full object-cover transition-all duration-700" />

          </div>
          <motion.div
            initial={{
              x: -20,
              opacity: 0
            }}
            whileInView={{
              x: 0,
              opacity: 1
            }}
            transition={{
              delay: 0.5,
              duration: 0.8
            }}
            className="absolute -bottom-10 -left-10 bg-white p-8 border border-black/10 hidden md:block shadow-xl">

            <p className="font-serif text-3xl">20+</p>
            <p className="text-xs uppercase tracking-widest text-black/60 mt-2">
              Years of Excellence
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
