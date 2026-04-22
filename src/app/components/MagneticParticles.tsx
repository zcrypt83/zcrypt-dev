import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const colors = [
  "from-blue-400 to-cyan-400",
  "from-purple-400 to-pink-400",
  "from-green-400 to-emerald-400",
  "from-yellow-400 to-orange-400",
  "from-indigo-400 to-blue-400",
];

export function MagneticParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const initialParticles = Array.from({ length: 500 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1.5 + 0.5, // Tamaños entre 0.5px y 2px (más pequeños)
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(initialParticles);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 opacity-50">
      {particles.map((particle) => {
        const distance = Math.sqrt(
          Math.pow(mousePos.x - particle.x, 2) + Math.pow(mousePos.y - particle.y, 2)
        );
        // Radio de atracción más grande (de 200 a 400 píxeles)
        const magneticRadius = 400;
        const magneticForce = Math.max(0, magneticRadius - distance) / magneticRadius;
        const angle = Math.atan2(mousePos.y - particle.y, mousePos.x - particle.x);

        // Fuerza de atracción más fuerte
        const pullStrength = 150;
        const pullX = Math.cos(angle) * magneticForce * pullStrength;
        const pullY = Math.sin(angle) * magneticForce * pullStrength;

        return (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full bg-gradient-to-r ${particle.color}`}
            style={{
              width: particle.size,
              height: particle.size,
            }}
            initial={{
              x: particle.x,
              y: particle.y,
            }}
            animate={{
              x: particle.x + pullX,
              y: particle.y + pullY,
              scale: 1 + magneticForce * 2,
              opacity: 0.3 + magneticForce * 0.7,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
          />
        );
      })}
    </div>
  );
}
