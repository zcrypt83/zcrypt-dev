import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

export function Loader3D() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 3D Cube Loader */}
          <div className="relative" style={{ perspective: "1000px" }}>
            <motion.div
              className="relative w-32 h-32"
              style={{ transformStyle: "preserve-3d" }}
              animate={{
                rotateX: [0, 360],
                rotateY: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {/* Cube faces */}
              {[
                { color: "from-blue-500 to-cyan-500", transform: "translateZ(64px)" },
                { color: "from-purple-500 to-pink-500", transform: "translateZ(-64px) rotateY(180deg)" },
                { color: "from-green-500 to-emerald-500", transform: "rotateY(90deg) translateZ(64px)" },
                { color: "from-orange-500 to-red-500", transform: "rotateY(-90deg) translateZ(64px)" },
                { color: "from-yellow-500 to-amber-500", transform: "rotateX(90deg) translateZ(64px)" },
                { color: "from-indigo-500 to-blue-500", transform: "rotateX(-90deg) translateZ(64px)" },
              ].map((face, i) => (
                <div
                  key={i}
                  className={`absolute w-32 h-32 bg-gradient-to-br ${face.color} rounded-lg opacity-80`}
                  style={{ transform: face.transform }}
                />
              ))}
            </motion.div>

            {/* Loading text */}
            <motion.div
              className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <p className="text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Cargando...
              </p>
            </motion.div>

            {/* Orbiting particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-blue-400"
                style={{
                  left: "50%",
                  top: "50%",
                }}
                animate={{
                  x: [
                    Math.cos((i * Math.PI) / 4) * 100,
                    Math.cos(((i + 1) * Math.PI) / 4) * 100,
                  ],
                  y: [
                    Math.sin((i * Math.PI) / 4) * 100,
                    Math.sin(((i + 1) * Math.PI) / 4) * 100,
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.125,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
