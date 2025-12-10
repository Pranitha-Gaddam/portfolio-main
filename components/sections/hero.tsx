"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as THREE from 'three';

export function HeroSection() {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Hi! I'm Pranitha.";
  
  useEffect(() => {
    // 1. FAST TIMING: Starts at 2.6s to match slide exit
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

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // ===== Three.js background logic =====
  useEffect(() => {
    let cleanup = () => {};
    (async () => {
      if (!containerRef.current) return;

      const THREE = (await import("three")) as typeof import("three");
      const { TorusKnotGeometry, BufferGeometry, Float32BufferAttribute } = THREE;

      const isSmallScreen =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(max-width: 640px)").matches;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        canvas: canvasRef.current || undefined,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSmallScreen ? 1.75 : 2));
      const bounds = containerRef.current.getBoundingClientRect();
      renderer.setSize(bounds.width, bounds.height, false);
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, bounds.width / bounds.height, 0.1, 100);
      camera.position.set(0, 0.6, 12);

      const getThemeColors = () => {
        const isDark = document.documentElement.classList.contains("dark");
        if (isDark) {
          return {
            primary: new THREE.Color(0xd97706),
            accent: new THREE.Color(0x1f2937),
            ring: new THREE.Color(0x1f2937),
          };
        } else {
          return {
            primary: new THREE.Color(0xd97706),
            accent: new THREE.Color(0xfbbf24),
            ring: new THREE.Color(0xe5e7eb),
          };
        }
      };

      let themeColors = getThemeColors();
      const group = new THREE.Group();
      scene.add(group);

      const baseGeom = new TorusKnotGeometry(4.2, 0.9, 900, 80, 2, 3);
      const pos = baseGeom.getAttribute("position");
      const vertexCount = pos.count;
      const sampleCount = 9000;
      
      const positions: number[] = [];
      const colors: number[] = [];
      const initialIndices: number[] = [];

      for (let i = 0; i < sampleCount; i++) {
        const idx = Math.floor(Math.random() * vertexCount);
        initialIndices.push(idx);
        const x = pos.getX(idx), y = pos.getY(idx), z = pos.getZ(idx);
        positions.push(x, y, z);
        colors.push(0, 0, 0);
      }

      const geo = new BufferGeometry();
      geo.setAttribute("position", new Float32BufferAttribute(positions, 3));
      geo.setAttribute("color", new Float32BufferAttribute(colors, 3));

      const mat = new THREE.PointsMaterial({
        size: 0.04,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.NormalBlending, 
      });

      const points = new THREE.Points(geo, mat);
      group.add(points);

      const rings: THREE.Line[] = [];
      const ringMat = new THREE.LineBasicMaterial({
        color: themeColors.ring,
        transparent: true,
        opacity: 0.2,
      });

      for (let i = 0; i < 3; i++) {
        const ringGeo = new THREE.RingGeometry(3.6 + i * 0.7, 3.62 + i * 0.7, 256);
        const ringPos = ringGeo.getAttribute("position");
        const lineGeo = new THREE.BufferGeometry();
        lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(ringPos.array as ArrayLike<number>, 3));
        const line = new THREE.LineLoop(lineGeo, ringMat);
        line.rotation.x = Math.random() * 0.8 - 0.4;
        line.rotation.y = Math.random() * 0.8 - 0.4;
        line.rotation.z = Math.random() * Math.PI;
        rings.push(line);
        group.add(line);
      }

      const updateTheme = () => {
        themeColors = getThemeColors();
        const tmpColor = new THREE.Color();
        const colorAttribute = geo.getAttribute("color") as THREE.BufferAttribute;

        for (let i = 0; i < sampleCount; i++) {
            const idx = initialIndices[i];
            const x = pos.getX(idx), y = pos.getY(idx), z = pos.getZ(idx);
            const d = new THREE.Vector3(x, y, z).length();
            tmpColor.copy(themeColors.primary).lerp(themeColors.accent, THREE.MathUtils.clamp((d - 3.5) / 4.5, 0, 1));
            colorAttribute.setXYZ(i, tmpColor.r, tmpColor.g, tmpColor.b);
        }
        colorAttribute.needsUpdate = true;
        ringMat.color.copy(themeColors.ring);
      };

      updateTheme();

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                updateTheme();
            }
        });
      });
      observer.observe(document.documentElement, { attributes: true });

      const calcMotionScale = () => {
        const w = containerRef.current?.getBoundingClientRect().width ?? 1024;
        return Math.min(1, Math.max(0.6, w / 1024));
      };
      let motionScale = calcMotionScale();
      const clock = new THREE.Clock();
      let rafId = 0;

      const onResize = () => {
        if (!containerRef.current) return;
        const { width, height } = containerRef.current.getBoundingClientRect();
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        motionScale = calcMotionScale();
      };
      window.addEventListener("resize", onResize);

      const animate = () => {
        const t = clock.getElapsedTime();
        const speedY = 0.108; 
        const ringBaseSpeed = 0.048; 
        const ringIncSpeed = 0.018; 
  
        group.rotation.y = t * speedY * motionScale; 
        group.rotation.x = Math.sin(t * 0.25 * motionScale) * 0.05;
        const s = 1 + Math.sin(t * 0.6 * motionScale) * 0.02;
        group.scale.set(s, s, s);
  
        rings.forEach((r, i) => {
          r.rotation.z = t * (ringBaseSpeed + i * ringIncSpeed) * motionScale; 
        });
  
        renderer.render(scene, camera);
        rafId = requestAnimationFrame(animate);
      };
      animate();

      cleanup = () => {
        observer.disconnect();
        cancelAnimationFrame(rafId);
        window.removeEventListener("resize", onResize);
        baseGeom.dispose();
        geo.dispose();
        mat.dispose();
        ringMat.dispose();
        rings.forEach((r) => r.geometry.dispose());
        renderer.dispose();
      };
    })();

    return () => cleanup();
  }, []);

  const socialLinks = [
    { icon: Github, href: "https://github.com/Pranitha-Gaddam", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/pranitha-gaddam", label: "LinkedIn" },
    { icon: Mail, href: "#contact", label: "Email" },
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[100dvh] flex flex-col justify-center px-4 pt-24 pb-12 overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 -z-10 w-full h-full" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-white/70 dark:bg-black/40" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-b from-background/0 via-background/40 to-background" />

      <div className="container mx-auto z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 max-w-6xl">
        
        {/* TEXT COLUMN */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 order-2 lg:order-1 w-full">
          
          <div className="min-h-[3rem] sm:min-h-[4rem] flex items-center justify-center lg:justify-start">
            <h1 className="font-playfair font-bold text-3xl sm:text-5xl lg:text-6xl tracking-wide drop-shadow-sm">
              <span className="text-amber-600 dark:text-amber-500">
                {displayedText.slice(0, 8)}
              </span>
              
              <span className="
                inline-block pb-2 pr-1
                bg-gradient-to-r from-orange-700 via-amber-600 to-orange-700
                dark:from-amber-400 dark:via-yellow-300 dark:to-amber-400
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
                I&apos;m a soon-to-be Computer Science grad (4 days to go!). My primary interests are in{" "}
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
                My passion for computer science comes from my love for{" "}
                <span className="font-medium text-slate-900 dark:text-white">building things</span> and solving complex problems. In my free time, I like to play pickleball or video games, cook (and eat), and travel.
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
              <Button asChild className="bg-amber-500 group hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white px-6 shadow-md h-10 text-sm sm:text-base">
                <a 
                  href="https://drive.google.com/file/d/138G18CQ4so7Hrbc3phSTi9pR6tt_uTR1/view?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <span className="mr-1">Resume</span>
                  <ArrowUpRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </Button>
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
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[28rem] md:h-[28rem] flex items-center justify-center">
            <img
              className="w-full h-full object-contain drop-shadow-2xl"
              src="/images/real.png"
              alt="Pranitha Gaddam"
            />
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
