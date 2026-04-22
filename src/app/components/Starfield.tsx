import { motion } from "motion/react";
import { useMemo } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  z: number;
  size: number;
}

export function Starfield() {
  const stars = useMemo(() => {
    return Array.from({ length: 400 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      z: Math.random() * 1000,
      size: Math.random() * 1.5 + 0.3, // Estrellas más pequeñas: 0.3-1.8px
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-5">
      {stars.map((star) => {
        const scale = 1000 / (1000 - star.z);
        const brightness = star.z / 1000;

        return (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{
              scale: [scale, scale * 1.5, scale],
              opacity: [brightness, brightness * 1.5, brightness],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        );
      })}
    </div>
  );
}
