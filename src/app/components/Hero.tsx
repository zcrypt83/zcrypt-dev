import { motion, useScroll, useTransform } from "motion/react";
import { Mail, Code2, MessageCircle, Github } from "lucide-react";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const socialMessage = encodeURIComponent(
    "Hola, vi tu portafolio y me gustaria conversar sobre un proyecto.",
  );
  const socialLinks = [
    {
      label: "WhatsApp",
      Icon: MessageCircle,
      href: `https://wa.me/51904572815?text=${socialMessage}`,
    },
    {
      label: "GitHub",
      Icon: Github,
      href: "https://github.com/zcrypt83",
    },
    {
      label: "Email",
      Icon: Mail,
      href: `mailto:zcrypt83@proton.me?subject=Consulta%20desde%20tu%20portafolio&body=${socialMessage}`,
    },
  ];

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" style={{ position: "relative" }}>
      {/* Animated background particles - densas y pequeñas */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => {
          const size = Math.random() * 1.5 + 0.5; // 0.5-2px
          return (
            <motion.div
              key={i}
              className="absolute bg-blue-400/20 rounded-full"
              style={{ width: size, height: size }}
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              }}
              animate={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              }}
              transition={{
                duration: Math.random() * 10 + 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          );
        })}
      </div>

      {/* 3D Grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(96, 165, 250, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(96, 165, 250, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'center top',
        }} />
      </div>

      <motion.div
        className="container mx-auto px-6 relative z-10"
        style={{
          y,
          opacity,
          scale,
          rotateX,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* 3D Rotating Code Icon with depth */}
          <motion.div
            className="flex justify-center mb-8 perspective-1000"
            animate={{
              rotateY: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px"
            }}
          >
            <motion.div
              className="relative"
              whileHover={{
                scale: 1.2,
                rotateX: 15,
                rotateZ: 10,
              }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Shadow layer */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-2xl blur-xl opacity-50"
                style={{ transform: "translateZ(-50px)" }}
              />
              {/* Main layer */}
              <div
                className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-2xl shadow-2xl relative"
                style={{ transform: "translateZ(0px)" }}
              >
                <Code2 className="w-16 h-16 text-white" />
              </div>
              {/* Front highlight */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-2xl"
                style={{ transform: "translateZ(25px)" }}
              />
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {["Desarrollador", "Full", "Stack"].map((word, i) => (
              <motion.span
                key={word}
                className="inline-block mr-4"
                initial={{ opacity: 0, rotateX: -90, y: 50 }}
                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                transition={{
                  delay: 0.2 + i * 0.1,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 200,
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Especializado en desarrollo web, backend y ciberseguridad
          </motion.p>

          <motion.div
            className="flex gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {socialLinks.map(({ Icon, href, label }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                aria-label={label}
                whileHover={{
                  scale: 1.3,
                  rotateZ: 360,
                  rotateY: 180,
                  z: 50,
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{ transformStyle: "preserve-3d" }}
                className="bg-white/10 backdrop-blur-sm p-4 rounded-full hover:bg-white/20 transition-colors relative"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/50 to-purple-500/50 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
                <Icon className="w-6 h-6 text-white relative z-10" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Animated Cat Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="relative"
          whileHover={{ scale: 1.3, rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          {/* Cat body */}
          <svg width="60" height="60" viewBox="0 0 60 60" className="drop-shadow-2xl">
            {/* Tail */}
            <motion.path
              d="M 45 35 Q 55 30 58 20"
              stroke="#60a5fa"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              animate={{ d: ["M 45 35 Q 55 30 58 20", "M 45 35 Q 55 35 58 30", "M 45 35 Q 55 30 58 20"] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            {/* Body */}
            <ellipse cx="30" cy="35" rx="15" ry="12" fill="#60a5fa" />
            {/* Head */}
            <circle cx="30" cy="20" r="10" fill="#60a5fa" />
            {/* Ears */}
            <motion.path
              d="M 22 12 L 20 5 L 25 10 Z"
              fill="#60a5fa"
              animate={{ rotateZ: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ transformOrigin: "23px 10px" }}
            />
            <motion.path
              d="M 38 12 L 40 5 L 35 10 Z"
              fill="#60a5fa"
              animate={{ rotateZ: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ transformOrigin: "37px 10px" }}
            />
            {/* Eyes */}
            <motion.circle
              cx="26" cy="20" r="2" fill="#1e293b"
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />
            <motion.circle
              cx="34" cy="20" r="2" fill="#1e293b"
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />
            {/* Nose */}
            <circle cx="30" cy="23" r="1.5" fill="#f472b6" />
            {/* Whiskers */}
            <line x1="18" y1="22" x2="10" y2="21" stroke="#e2e8f0" strokeWidth="1" />
            <line x1="18" y1="24" x2="10" y2="25" stroke="#e2e8f0" strokeWidth="1" />
            <line x1="42" y1="22" x2="50" y2="21" stroke="#e2e8f0" strokeWidth="1" />
            <line x1="42" y1="24" x2="50" y2="25" stroke="#e2e8f0" strokeWidth="1" />
            {/* Paws */}
            <ellipse cx="24" cy="45" rx="3" ry="4" fill="#60a5fa" />
            <ellipse cx="36" cy="45" rx="3" ry="4" fill="#60a5fa" />
          </svg>
          <p className="text-white/60 text-xs text-center mt-2">zcrypt.dev</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
