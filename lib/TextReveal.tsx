import React, { useRef, Children } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}
export function TextReveal({
  text,
  className = '',
  delay = 0
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-10%'
  });
  const words = text.split(' ');
  const container = {
    hidden: {
      opacity: 0
    },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: delay * i
      }
    })
  };
  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100
      }
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100
      }
    }
  };
  return (
    <motion.div
      ref={ref}
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexWrap: 'wrap'
      }}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}>

      {words.map((word, index) =>
      <motion.span
        variants={child}
        key={index}
        style={{
          marginRight: '0.25em'
        }}>

          {word}
        </motion.span>
      )}
    </motion.div>);

}
