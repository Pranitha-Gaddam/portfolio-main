"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as THREE from 'three';

export function HeroSection() {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const fullText = "Hi! I’m Pranitha, a software engineer who loves exploring new tools and solving hard problems";

  // === Three.js canvas holder ===
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // ===== Typing effect =====
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // ===== Three.js background: Orbital ring / torus-knot particles =====
  useEffect(() => {
    let cleanup = () => {};
    (async () => {
      if (!containerRef.current) return;

      const THREE = (await import("three")) as typeof import("three");
      const { TorusKnotGeometry, BufferGeometry, Float32BufferAttribute } = THREE;

      // — Pixel ratio: slightly lower on small screens for calmer motion/brightness —
      const isSmallScreen =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(max-width: 640px)").matches;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        canvas: canvasRef.current || undefined,
      });
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, isSmallScreen ? 1.75 : 2)
      );

      const bounds = containerRef.current.getBoundingClientRect();
      renderer.setSize(bounds.width, bounds.height, false);
      renderer.setClearColor(0x000000, 0); // transparent

      const scene = new THREE.Scene();

      // Camera
      const camera = new THREE.PerspectiveCamera(
        55,
        bounds.width / bounds.height,
        0.1,
        100
      );
      camera.position.set(0, 0.6, 12);

      // Softer dark-mode palette + normal blending to avoid glow blowout,
      // warm amber/slate in light mode.
      const primary = new THREE.Color(0xd97706); // slate-500 / amber-600
      const accent  = new THREE.Color(0x1f2937); // slate-700 / slate-800

      // Group to rotate
      const group = new THREE.Group();
      scene.add(group);

      // Build a torus-knot, then sample points to create a Points cloud
      const baseGeom = new TorusKnotGeometry(4.2, 0.9, 900, 80, 2, 3);

      const positions: number[] = [];
      const colors: number[] = [];

      const tmpColor = new THREE.Color();
      const pos = baseGeom.getAttribute("position");
      const vertexCount = pos.count;

      const sampleCount = 9000;
      for (let i = 0; i < sampleCount; i++) {
        const idx = Math.floor(Math.random() * vertexCount);
        const x = pos.getX(idx), y = pos.getY(idx), z = pos.getZ(idx);
        positions.push(x, y, z);

        const d = new THREE.Vector3(x, y, z).length();
        tmpColor.copy(primary).lerp(accent, THREE.MathUtils.clamp((d - 3.5) / 4.5, 0, 1));
        colors.push(tmpColor.r, tmpColor.g, tmpColor.b);
      }

      const geo = new BufferGeometry();
      geo.setAttribute("position", new Float32BufferAttribute(positions, 3));
      geo.setAttribute("color", new Float32BufferAttribute(colors, 3));

      const mat = new THREE.PointsMaterial({
        size: 0.04,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        blending:  THREE.AdditiveBlending,
      });

      const points = new THREE.Points(geo, mat);
      group.add(points);

      // Faint orbital rings (even fainter in dark)
      const rings: THREE.Line[] = [];
      const ringMat = new THREE.LineBasicMaterial({
        color: accent.clone(),
        transparent: true,
        opacity: 0.25,
      });
      for (let i = 0; i < 3; i++) {
        const ringGeo = new THREE.RingGeometry(3.6 + i * 0.7, 3.62 + i * 0.7, 256);
        const ringPos = ringGeo.getAttribute("position");
        const lineGeo = new THREE.BufferGeometry();
        lineGeo.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(ringPos.array as ArrayLike<number>, 3)
        );
        const line = new THREE.LineLoop(lineGeo, ringMat);
        line.rotation.x = Math.random() * 0.8 - 0.4;
        line.rotation.y = Math.random() * 0.8 - 0.4;
        line.rotation.z = Math.random() * Math.PI;
        rings.push(line);
        group.add(line);
      }

      // — Motion scaling: slower on small screens —
      const calcMotionScale = () => {
        const w = containerRef.current?.getBoundingClientRect().width ?? 1024;
        // scale ~0.6 on very small phones → 1 on desktop
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

        group.rotation.y += 0.0018 * motionScale;
        group.rotation.x = Math.sin(t * 0.25 * motionScale) * 0.05;

        const s = 1 + Math.sin(t * 0.6 * motionScale) * 0.02;
        group.scale.set(s, s, s);

        rings.forEach((r, i) => {
          r.rotation.z += (0.0008 + i * 0.0003) * motionScale;
        });

        renderer.render(scene, camera);
        rafId = requestAnimationFrame(animate);
      };
      animate();

      // Cleanup
      cleanup = () => {
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
      className="relative min-h-screen flex flex-col justify-center items-center px-4 text-center space-y-8 overflow-hidden"
    >
      {/* Three.js canvas (behind content) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-10 w-full h-full"
        aria-hidden="true"
      />

<div
  className="pointer-events-none absolute inset-0 -z-10 bg-white/40 dark:bg-black/40"
  aria-hidden="true"
/>


      {/* Optional subtle gradient under canvas for depth */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-b from-background/0 via-background/40 to-background" />

      {/* Avatar */}
      <motion.div
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        <div className="absolute -inset-1 bg-amber-500/30 blur-2xl rounded-full z-[-1]" />
        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full flex items-center justify-center shadow-2xl ring-2 ring-amber-500/30">
          <img className="rounded-full object-cover bg-opacity-0" src="/images/real.png" alt="avatar" />
        </div>
      </motion.div>


      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="tracking-wide font-playfair-display-sc text-amber-600 dark:text-amber-500 text-[clamp(2.5rem,12vw,4.5rem)]"
      >
        Pranitha Gaddam
      </motion.h1>

      {/* Typing line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <h2 className="text-xl sm:text-2xl lg:text-3xl text-amber-600 dark:text-amber-500 font-medium">
          {text}
          {isTyping && <span className="animate-pulse">|</span>}
        </h2>
      </motion.div>

      {/* Description */}
      {/* <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed"
      >
        Passionate about exploring new technologies and tackling complex problems. My
        primary interests lie in software engineering and I&apos;m currently expanding my
        knowledge in AI/ML.
      </motion.p> */}

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="flex flex-row gap-4"
      >
        <Button
        asChild
          className="bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white md:px-8 px-4 md:text-base text-sm"
        >
            <a href="/Pranitha_Gaddam_Resume.pdf" download='Pranitha_Gaddam_Resume.pdf'>
          <Download className="w-4 h-4 mr-2" />
          Download Resume
          </a>
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
          }
          className="border-amber-500 text-amber-600 hover:bg-amber-50 dark:border-amber-400 dark:text-amber-400 dark:hover:bg-amber-900/20 md:px-8 px-4 md:text-base text-sm"
        >
          View Projects
        </Button>
      </motion.div>

      {/* Socials */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="flex justify-center space-x-6"
      >
        {socialLinks.map((link) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.2, y: -5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="p-3 rounded-full bg-white dark:bg-gray-8 00 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 dark:bg-black hover:text-amber-600 dark:hover:text-amber-400"
            title={link.label}
          >
            <link.icon className="w-5 h-5" />
          </motion.a>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
