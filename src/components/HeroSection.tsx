"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] bg-yellow border-b-4 border-black overflow-hidden flex items-center">
      {/* Background texture pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #000 0px,
            #000 1px,
            transparent 1px,
            transparent 12px
          )`,
        }}
      />

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-10 right-8 w-32 h-32 bg-black rounded-none"
        animate={{ rotate: [0, 5, -5, 0], y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ opacity: 0.08 }}
      />
      <motion.div
        className="absolute bottom-20 left-6 w-20 h-20 bg-black"
        animate={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ opacity: 0.06 }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left: Text */}
        <div>
          {/* Brand tag */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-black text-yellow px-4 py-2 text-sm font-mono font-bold brut-shadow-sm mb-6 border-2 border-black"
          >
            <span className="w-2 h-2 bg-yellow rounded-full animate-pulse" />
            EST. FES, MAROC
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-none text-black mb-2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontFamily: "var(--font-archivo-black)" }}
          >
            EVERY
            <br />
            <span className="relative inline-block">
              BITE
              <motion.span
                className="absolute -bottom-1 left-0 h-1 bg-black"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.6, delay: 0.8 }}
              />
            </span>
            <br />
            DROPS A
            <br />
            <span className="text-black">BEAT.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-black/70 text-lg font-mono mt-6 mb-8 max-w-sm"
          >
            Fast food con ritmo. Burgers, tacos, shots — ordered straight to WhatsApp.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#menu"
              className="bg-black text-yellow font-black uppercase px-8 py-4 text-lg brut-shadow-sm border-4 border-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-150 inline-block"
            >
              VIEW MENU ↓
            </a>
            <a
              href="https://wa.me/212631303131"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow text-black font-black uppercase px-8 py-4 text-lg border-4 border-black hover:bg-black hover:text-yellow transition-colors duration-150 inline-block"
            >
              WhatsApp Us
            </a>
          </motion.div>
        </div>

        {/* Right: Floating Burger */}
        <div className="flex justify-center items-center">
          <motion.div
            className="relative"
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Shadow blob */}
            <motion.div
              className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-48 h-8 bg-black/20 rounded-full blur-md"
              animate={{ scaleX: [1, 0.8, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 bg-white border-4 border-black brut-shadow overflow-hidden">
              <Image
                src="/menu/classic-burger.jpg"
                alt="Latido Signature Burger"
                fill
                sizes="(max-width: 640px) 288px, 384px"
                className="object-cover"
                priority
              />
            </div>
            {/* Price tag floating */}
            <motion.div
              className="absolute -top-4 -right-4 bg-black text-yellow font-mono font-bold text-sm px-3 py-2 border-2 border-yellow"
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              FROM 40 DHS
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-0.5 h-8 bg-black/40" />
        <div className="w-3 h-3 border-2 border-black/40 rotate-45" />
      </motion.div>
    </section>
  );
}
