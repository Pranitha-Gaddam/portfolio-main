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

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // ===== Three.js background logic (Refined Colors) =====
  useEffect(() => {
    let cleanup = () => {};
    (async () => {
      if (!containerRef.current) return;

      const THREE = (await import("three")) as typeof import("three");

      const isMobile = window.matchMedia("(max-width: 640px)").matches;

      // Renderer Setup
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        canvas: canvasRef.current || undefined,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      const bounds = containerRef.current.getBoundingClientRect();
      renderer.setSize(bounds.width, bounds.height, false);
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      
      const camera = new THREE.PerspectiveCamera(50, bounds.width / bounds.height, 0.1, 100);
      camera.position.set(0, 18, 15);
      camera.lookAt(0, 0, 0);

      // --- CONFIGURATION ---
      const rows = isMobile ? 60 : 100;
      const cols = isMobile ? 40 : 120;
      const spacing = 0.55; 
      const particleCount = rows * cols;

      const geometry = new THREE.SphereGeometry(0.03, 8, 8); 
      
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.4, // Slight bump in opacity for better visibility of the new warm gray
      });

      const mesh = new THREE.InstancedMesh(geometry, material, particleCount);
      scene.add(mesh);

      const dummy = new THREE.Object3D();
      const color = new THREE.Color();

      // --- COLOR THEME LOGIC (UPDATED) ---
      const getThemeColors = () => {
        const isDark = document.documentElement.classList.contains("dark");
        if (isDark) {
            return {
                // Dark Mode: Neutral Gray (not blue-ish)
                base: new THREE.Color(0x525252), // Neutral-600
                // Dark Mode Hover: Bright Amber Glow
                hover: new THREE.Color(0xfbbf24), // Amber-400
            };
        } else {
            return {
                // Light Mode: Warm Stone Gray (Matches Amber theme better than Slate)
                base: new THREE.Color(0xa8a29e), // Stone-400
                // Light Mode Hover: Deep Vibrant Orange (High Contrast)
                hover: new THREE.Color(0xea580c), // Orange-600
            };
        }
      };
      let themeColors = getThemeColors();

      // Mouse State
      const mouse = new THREE.Vector2(-1000, -1000); 
      const raycaster = new THREE.Raycaster();
      const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0); 

      // Interaction Variables
      let hoverX = -1000;
      let hoverZ = -1000;
      let clickWave = 0; 

      // Initialize Grid
      const initialPositions = new Float32Array(particleCount * 3);
      let i = 0;
      for (let x = 0; x < cols; x++) {
        for (let z = 0; z < rows; z++) {
          const posX = (x - cols / 2) * spacing;
          const posZ = (z - rows / 2) * spacing;
          
          dummy.position.set(posX, 0, posZ);
          dummy.updateMatrix();
          mesh.setMatrixAt(i, dummy.matrix);
          mesh.setColorAt(i, themeColors.base);
          
          initialPositions[i * 3] = posX;
          initialPositions[i * 3 + 1] = 0;
          initialPositions[i * 3 + 2] = posZ;
          i++;
        }
      }
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

      // --- EVENT LISTENERS ---
      const onMouseMove = (event: MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      };

      const onMouseDown = () => {
        clickWave = 1; 
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mousedown", onMouseDown);

      const updateTheme = () => {
        themeColors = getThemeColors();
      };
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                updateTheme();
            }
        });
      });
      observer.observe(document.documentElement, { attributes: true });

      // --- ANIMATION LOOP ---
      const clock = new THREE.Clock();
      let rafId = 0;

      const animate = () => {
        const time = clock.getElapsedTime();

        // 1. Raycast
        raycaster.setFromCamera(mouse, camera);
        const target = new THREE.Vector3();
        raycaster.ray.intersectPlane(plane, target);
        
        if (target) {
            hoverX += (target.x - hoverX) * 0.1;
            hoverZ += (target.z - hoverZ) * 0.1;
        }

        // 2. Click Wave
        if (clickWave > 0) {
            clickWave += 0.5; 
            if (clickWave > 50) clickWave = 0; 
        }

        // 3. Update Instances
        let index = 0;
        for (let x = 0; x < cols; x++) {
            for (let z = 0; z < rows; z++) {
                
                const posX = initialPositions[index * 3];
                const posZ = initialPositions[index * 3 + 2];
                const dist = Math.sqrt((posX - hoverX) ** 2 + (posZ - hoverZ) ** 2);
                
                let y = 0;
                let scale = 1;
                let r = themeColors.base.r;
                let g = themeColors.base.g;
                let b = themeColors.base.b;

                // A. MOUSE PROXIMITY 
                if (dist < 4) {
                    const force = 1 - (dist / 4); 
                    y = force * 2; 
                    scale = 1 + force * 1.2; 
                    
                    // Boosted Color Mix: Multiplied force to make color appear faster
                    // 0.8 factor makes the orange stick around longer/stronger
                    const colorForce = Math.min(force * 1.5, 1); 
                    
                    r = r + (themeColors.hover.r - r) * colorForce;
                    g = g + (themeColors.hover.g - g) * colorForce;
                    b = b + (themeColors.hover.b - b) * colorForce;
                }

                // B. AMBIENT WAVE
                y += Math.sin(posX * 0.3 + time) * Math.cos(posZ * 0.3 + time) * 0.15;

                // C. CLICK WAVE
                if (clickWave > 0) {
                    const waveDist = Math.abs(dist - clickWave);
                    if (waveDist < 1.0) {
                        const waveForce = 1 - (waveDist / 1.0);
                        y += waveForce * 1.5;
                        scale += waveForce * 0.5;
                    }
                }

                dummy.position.set(posX, y, posZ);
                dummy.scale.set(scale, scale, scale);
                dummy.updateMatrix();
                mesh.setMatrixAt(index, dummy.matrix);
                
                color.setRGB(r, g, b);
                mesh.setColorAt(index, color);

                index++;
            }
        }
        
        mesh.instanceMatrix.needsUpdate = true;
        if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

        renderer.render(scene, camera);
        rafId = requestAnimationFrame(animate);
      };
      animate();

      const onResize = () => {
        if (!containerRef.current) return;
        const { width, height } = containerRef.current.getBoundingClientRect();
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", onResize);

      cleanup = () => {
        observer.disconnect();
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mousedown", onMouseDown);
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(rafId);
        geometry.dispose();
        material.dispose();
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
      <div className="pointer-events-none absolute inset-0 -z-10 bg-white/60 dark:bg-gray-900/40" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-b from-background/0 via-background/40 to-background" />

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
                I&apos;m a recent Computer Science grad (Dec 2025). My primary interests are in{" "}
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
                <span className="font-medium text-slate-900 dark:text-white">building things</span> and solving complex problems. In my free time, I like to play pickleball or video games, cook (and eat!), and travel.
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
              <Button asChild className="bg-amber-500 group hover:bg-amber-600 dark:bg-amber-500/90 dark:hover:bg-amber-600 text-white px-6 shadow-md h-10 text-sm sm:text-base">
                <a 
                  href="https://drive.google.com/file/d/138G18CQ4so7Hrbc3phSTi9pR6tt_uTR1/view?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <span className="mr-1">Resume</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
