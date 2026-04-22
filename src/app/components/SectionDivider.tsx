import { motion } from "motion/react";

export function SectionDivider() {
  return (
    <div className="relative h-32 overflow-hidden">
      <svg
        className="absolute bottom-0 w-full h-32"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,50 Q300,100 600,50 T1200,50 L1200,120 L0,120 Z"
          fill="url(#gradient)"
          initial={{ d: "M0,50 Q300,100 600,50 T1200,50 L1200,120 L0,120 Z" }}
          animate={{
            d: [
              "M0,50 Q300,100 600,50 T1200,50 L1200,120 L0,120 Z",
              "M0,70 Q300,20 600,70 T1200,70 L1200,120 L0,120 Z",
              "M0,50 Q300,100 600,50 T1200,50 L1200,120 L0,120 Z",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>

      {/* 3D floating orbs */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-40"
          style={{
            left: `${i * 15 + 10}%`,
            top: "50%",
          }}
          animate={{
            y: [0, -40, 0],
            scale: [1, 1.5, 1],
            rotateZ: [0, 180, 360],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
