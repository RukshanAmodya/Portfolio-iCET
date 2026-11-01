"use client";

import React from "react";
import HeroGrid from "./HeroGrid";
import LottiePlayer from "./LottiePlayer";
import SkillsSection from "./SkillsSection";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between pt-20 sm:pt-28 pb-10 overflow-hidden bg-black"
    >
      {/* Interactive Ripple Grid spanning across Hero & Skills */}
      <HeroGrid />

      {/* Main Hero Row */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center my-auto">
        {/* Left: Text & CTAs */}
        <div className="text-left order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-xl md:text-2xl text-neutral-300 font-medium mb-1.5 sm:mb-2"
          >
            Hi there, I'm
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight mb-2 sm:mb-3"
          >
            Rukshan Amodya
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-base sm:text-lg md:text-xl text-neutral-300 font-medium mb-4 sm:mb-6"
          >
            Full-Stack Developer | Gen AI Enthusiast
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-xs sm:text-base md:text-lg text-neutral-400 mb-6 sm:mb-8 leading-relaxed max-w-xl"
          >
            As an undergraduate passionate about leveraging the power of code and AI, I
            strive to create meaningful and innovative solutions. I explore how
            technology can transform ideas into reality. With a keen interest in
            generative AI and cutting-edge technologies, I am constantly honing my
            skills to stay at the forefront of software engineering.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap sm:flex-nowrap gap-3 sm:gap-4 items-center"
          >
            <a
              href="#projects"
              className="w-full sm:w-auto text-center px-6 sm:px-7 py-3 sm:py-3.5 bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)] text-sm sm:text-base"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto text-center px-6 sm:px-7 py-3 sm:py-3.5 border border-neutral-700 bg-neutral-900/60 hover:bg-neutral-800 text-neutral-200 font-medium rounded-xl transition-all hover:scale-105 active:scale-95 text-sm sm:text-base backdrop-blur-sm"
            >
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* Right: Dinosaur Mascot Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
          className="relative flex items-center justify-center order-1 lg:order-2"
        >
          <div className="relative w-52 h-52 sm:w-72 sm:h-72 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] flex items-center justify-center">
            <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <LottiePlayer
              src="/animations/welcome.json"
              className="w-full h-full drop-shadow-[0_16px_32px_rgba(0,0,0,0.7)]"
            />
          </div>
        </motion.div>
      </div>

      {/* Integrated Skills & Expertise Section over the grid */}
      <div className="relative z-10 w-full mt-8 sm:mt-14">
        <SkillsSection />
      </div>
    </section>
  );
}
