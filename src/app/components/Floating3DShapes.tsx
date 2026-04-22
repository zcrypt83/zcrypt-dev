import { motion } from "motion/react";

const shapes = [
  { type: "cube", color: "from-blue-500 to-cyan-500", size: 60, delay: 0 },
  { type: "sphere", color: "from-purple-500 to-pink-500", size: 80, delay: 2 },
  { type: "pyramid", color: "from-green-500 to-emerald-500", size: 70, delay: 4 },
  { type: "torus", color: "from-orange-500 to-red-500", size: 90, delay: 1 },
  { type: "octahedron", color: "from-yellow-500 to-amber-500", size: 65, delay: 3 },
];

export function Floating3DShapes() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: `${(index * 20 + 10)}%`,
            top: `${(index * 15 + 10)}%`,
            perspective: "1000px",
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 15 + index * 3,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="relative"
            style={{ transformStyle: "preserve-3d" }}
            animate={{
              rotateX: [0, 360],
              rotateY: [0, 360],
              rotateZ: [0, 360],
            }}
            transition={{
              duration: 20 + index * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {shape.type === "cube" && (
              <div className="relative" style={{ transformStyle: "preserve-3d", width: shape.size, height: shape.size }}>
                {/* Cube faces */}
                <div className={`absolute w-full h-full bg-gradient-to-br ${shape.color} opacity-30 rounded-lg`} style={{ transform: `translateZ(${shape.size / 2}px)` }} />
                <div className={`absolute w-full h-full bg-gradient-to-br ${shape.color} opacity-30 rounded-lg`} style={{ transform: `rotateY(180deg) translateZ(${shape.size / 2}px)` }} />
                <div className={`absolute w-full h-full bg-gradient-to-br ${shape.color} opacity-30 rounded-lg`} style={{ transform: `rotateY(90deg) translateZ(${shape.size / 2}px)` }} />
                <div className={`absolute w-full h-full bg-gradient-to-br ${shape.color} opacity-30 rounded-lg`} style={{ transform: `rotateY(-90deg) translateZ(${shape.size / 2}px)` }} />
                <div className={`absolute w-full h-full bg-gradient-to-br ${shape.color} opacity-30 rounded-lg`} style={{ transform: `rotateX(90deg) translateZ(${shape.size / 2}px)` }} />
                <div className={`absolute w-full h-full bg-gradient-to-br ${shape.color} opacity-30 rounded-lg`} style={{ transform: `rotateX(-90deg) translateZ(${shape.size / 2}px)` }} />
              </div>
            )}
            {shape.type === "sphere" && (
              <div className={`w-${shape.size} h-${shape.size} rounded-full bg-gradient-to-br ${shape.color} opacity-20 blur-sm`} style={{ width: shape.size, height: shape.size }} />
            )}
            {shape.type === "pyramid" && (
              <div className="relative" style={{ transformStyle: "preserve-3d", width: shape.size, height: shape.size }}>
                <div className={`absolute w-0 h-0 border-l-[${shape.size / 2}px] border-r-[${shape.size / 2}px] border-b-[${shape.size}px] border-l-transparent border-r-transparent bg-gradient-to-br ${shape.color} opacity-30`} />
              </div>
            )}
            {shape.type === "torus" && (
              <div className={`rounded-full border-8 bg-gradient-to-br ${shape.color} opacity-20`} style={{ width: shape.size, height: shape.size, borderColor: "currentColor" }} />
            )}
            {shape.type === "octahedron" && (
              <div className="relative" style={{ transformStyle: "preserve-3d" }}>
                <div className={`w-0 h-0 border-l-[30px] border-r-[30px] border-b-[50px] border-l-transparent border-r-transparent bg-gradient-to-br ${shape.color} opacity-30`} />
              </div>
            )}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
