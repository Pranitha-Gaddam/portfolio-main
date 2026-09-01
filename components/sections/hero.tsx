"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Hi! I'm Pranitha.";
  
  useEffect(() => {
    // 1. TIMING: Starts at 2.6s
    const startDelay = 2600; 
    let typeTimer: NodeJS.Timeout;

    const startTimeout = setTimeout(() => {
      let index = 0;
      typeTimer = setInterval(() => {
        if (index < fullText.length) {
          setDisplayedText(fullText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeTimer);
        }
      }, 100); 
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      if (typeTimer) clearInterval(typeTimer);
    };
  }, []);

  const socialLinks = [
    { icon: Github, href: "https://github.com/Pranitha-Gaddam", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/pranitha-gaddam", label: "LinkedIn" },
    { icon: Mail, href: "#contact", label: "Email" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex flex-col justify-center px-4 pt-24 pb-12 overflow-hidden"
    >
      <div className="container mx-auto z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 max-w-6xl">
        
        {/* TEXT COLUMN */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 order-2 lg:order-1 w-full">
          
          <div className="min-h-[3rem] sm:min-h-[4rem] flex items-center justify-center lg:justify-start">
            <h1 className="font-playfair font-bold text-3xl sm:text-5xl lg:text-6xl tracking-wide drop-shadow-sm">
              <span className="text-amber-600 dark:text-amber-400">
                {displayedText.slice(0, 8)}
              </span>
              
              <span className="
                inline-block pb-2 pr-1
                bg-gradient-to-r from-orange-700 via-amber-600 to-orange-700
                dark:from-amber-500 dark:via-amber-400 dark:to-amber-500
                bg-clip-text text-transparent 
                font-extrabold
              ">
                {displayedText.slice(8)}
              </span>
              
              <span className="animate-pulse ml-1 text-amber-600 dark:text-amber-500">|</span>
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            // 2. FAST TIMING: Reduced from 3.8 to 2.9 (Synced with text)
            transition={{ delay: 2.9, duration: 0.6 }}
            className="w-full max-w-2xl mx-auto lg:mx-0"
          >
            {/* 3. RESPONSIVE TEXT FIX:
               - text-sm (mobile) -> text-xl (desktop)
               - leading-relaxed (mobile) -> leading-loose (desktop)
               - h-3 (mobile spacer) -> h-6 (desktop spacer)
            */}
            <div className="pl-4 sm:pl-5 border-l-4 border-amber-500/40 dark:border-amber-500/60">
              <p className="text-sm sm:text-xl leading-loose text-slate-800 dark:text-slate-100 font-medium tracking-wide">
                I&apos;m a Software Developer at Reynolds and Reynolds. My primary interests are in{" "}
                <span className="inline-block px-1 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 font-semibold">
                  full-stack engineering
                </span>{" "}
                and{" "}
                <span className="inline-block px-1 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 font-semibold">
                  applied AI
                </span>.
              </p>
              
              <div className="h-3 sm:h-6"></div>
              
              <p className="text-sm sm:text-xl leading-loose text-slate-800 dark:text-slate-100 font-medium tracking-wide">
                My passion for software development comes from my love for{" "}
                <span className="font-medium text-slate-900 dark:text-white">building things</span> and solving complex problems. In my free time, I like to read or play video games, cook (and eat!), and travel.
              </p>
            </div>
          </motion.div>

          {/* Actions & Socials */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-4 w-full justify-center lg:justify-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              // FAST TIMING: 3.1
              transition={{ delay: 3.1, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-3 sm:gap-4"
            >
              <Button
                variant="outline"
                onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
                className="border-amber-500 text-amber-600 hover:bg-amber-50 dark:border-amber-400 dark:text-amber-400 dark:hover:bg-amber-900/20 px-6 bg-white/80 dark:bg-black/50 backdrop-blur-sm h-10 text-sm sm:text-base"
              >
                View Projects
              </Button>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               // FAST TIMING: 3.2
               transition={{ delay: 3.2 }}
               className="hidden sm:block h-8 w-[1px] bg-slate-400 dark:bg-slate-600" 
            />

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              // FAST TIMING: 3.3
              transition={{ delay: 3.3, duration: 0.6 }}
              className="flex gap-4"
            >
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 rounded-full bg-white dark:bg-black shadow-md border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-200 transition-colors"
                  title={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* AVATAR COLUMN */}
        <motion.div
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 0 }}
          // FAST TIMING: 2.6 (Starts with typewriter)
          transition={{ delay: 2.6, duration: 0.8, ease: "easeOut" }}
          className="relative flex-shrink-0 flex items-center justify-center order-1 lg:order-2"
        >
          <div className="relative w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72 2xl:w-[18.5rem] aspect-[2179/3442]">
            <img
              src="images/myimage.jpeg"
              alt="Pranitha Gaddam"
              className="h-full w-full rounded-lg border border-black/30 dark:border-white/30 object-cover shadow-[0_18px_45px_rgba(0,0,0,0.35)]"
            />
            <div className="pointer-events-none absolute inset-0 "></div>
          </div>
        </motion.div>

      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        // FAST TIMING: 3.6
        transition={{ delay: 3.6, duration: 0.6 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
