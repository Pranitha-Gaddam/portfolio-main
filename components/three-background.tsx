"use client";

import { useEffect, useRef } from "react";

/**
 * Fixed, full-viewport particle grid rendered once for the whole page.
 * Sits at z-0 (not a negative z-index) because `body` paints an opaque
 * bg-background that would otherwise cover it; page content sits at z-10.
 */
export function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let cleanup = () => {};
    (async () => {
      if (!canvasRef.current) return;

      const THREE = (await import("three")) as typeof import("three");

      const isMobile = window.matchMedia("(max-width: 640px)").matches;

      // Renderer Setup
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        canvas: canvasRef.current,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
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
        opacity: 0.4,
      });

      const mesh = new THREE.InstancedMesh(geometry, material, particleCount);
      scene.add(mesh);

      const dummy = new THREE.Object3D();
      const color = new THREE.Color();

      // --- COLOR THEME LOGIC ---
      const getThemeColors = () => {
        const isDark = document.documentElement.classList.contains("dark");
        if (isDark) {
          return {
            base: new THREE.Color(0x525252), // Neutral-600
            hover: new THREE.Color(0xfbbf24), // Amber-400
          };
        }
        return {
          base: new THREE.Color(0xa8a29e), // Stone-400
          hover: new THREE.Color(0xea580c), // Orange-600
        };
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
      // The canvas is viewport-fixed, so client coords map straight to NDC.
      const onMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      };

      const onMouseDown = () => {
        clickWave = 1;
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mousedown", onMouseDown);

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === "class") {
            themeColors = getThemeColors();
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
              const force = 1 - dist / 4;
              y = force * 2;
              scale = 1 + force * 1.2;

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
                const waveForce = 1 - waveDist / 1.0;
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
        renderer.setSize(window.innerWidth, window.innerHeight, false);
        camera.aspect = window.innerWidth / window.innerHeight;
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

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-0 bg-background/50" />
    </div>
  );
}
