import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

interface TrailParticle {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

export function TrailParticles() {
  const [trail, setTrail] = useState<TrailParticle[]>([]);

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let particleId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const distance = Math.sqrt(
        Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2)
      );

      // Solo crear partículas si el mouse se ha movido significativamente
      if (distance > 8) {
        const newParticles: TrailParticle[] = [];

        // Crear 8-12 partículas pequeñas en cada punto
        const numParticles = Math.floor(Math.random() * 5) + 8;

        for (let i = 0; i < numParticles; i++) {
          newParticles.push({
            id: particleId++,
            x: e.clientX + (Math.random() - 0.5) * 40,
            y: e.clientY + (Math.random() - 0.5) * 40,
            timestamp: Date.now(),
          });
        }

        setTrail((prev) => [...prev, ...newParticles].slice(-150)); // Mantener las últimas 150
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };

    // Limpiar partículas antiguas cada segundo
    const interval = setInterval(() => {
      setTrail((prev) => {
        const now = Date.now();
        return prev.filter((p) => now - p.timestamp < 1000);
      });
    }, 100);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-45">
      <AnimatePresence>
        {trail.map((particle) => {
          const size = Math.random() * 1.5 + 0.5; // 0.5-2px
          return (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
              style={{ width: size, height: size }}
              initial={{
                x: particle.x,
                y: particle.y,
                opacity: 0.8,
                scale: 1,
              }}
              animate={{
                x: particle.x + (Math.random() - 0.5) * 20,
                y: particle.y + Math.random() * 40 + 20,
                opacity: 0,
                scale: 0,
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}
