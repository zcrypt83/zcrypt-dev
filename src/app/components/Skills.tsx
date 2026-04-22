import { motion, useScroll, useTransform } from "motion/react";
import { Code, Database, Shield, Server, Terminal, Globe } from "lucide-react";
import { useRef } from "react";
import { use3DTilt } from "../hooks/use3DTilt";

const skillCategories = [
  {
    title: "Frontend",
    icon: Globe,
    color: "from-blue-500 to-cyan-500",
    skills: ["JavaScript", "React", "Angular", "HTML/CSS", "Tailwind CSS"],
  },
  {
    title: "Backend",
    icon: Server,
    color: "from-purple-500 to-pink-500",
    skills: ["Node.js", "Python", "Java", "NPM", "Express"],
  },
  {
    title: "Bases de Datos",
    icon: Database,
    color: "from-green-500 to-emerald-500",
    skills: ["PostgreSQL", "SQL Server", "SQLite", "MongoDB"],
  },
  {
    title: "DevOps & Sistemas",
    icon: Terminal,
    color: "from-orange-500 to-red-500",
    skills: ["Linux", "Docker", "Git", "CI/CD", "Bash"],
  },
  {
    title: "Ciberseguridad",
    icon: Shield,
    color: "from-red-500 to-rose-500",
    skills: ["Pentesting", "OWASP", "Encryption", "Network Security"],
  },
  {
    title: "Lenguajes",
    icon: Code,
    color: "from-yellow-500 to-amber-500",
    skills: ["JavaScript", "Python", "Java", "TypeScript", "SQL"],
  },
];

export function Skills() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} className="min-h-screen py-20 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden" style={{ position: "relative" }}>
      {/* Animated 3D waves */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{ y: backgroundY }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20"
            style={{
              top: `${i * 25}%`,
              transform: `perspective(500px) rotateX(45deg)`,
            }}
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </motion.div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Habilidades Técnicas
          </h2>
          <p className="text-xl text-gray-400">Tecnologías y herramientas que domino</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const tilt = use3DTilt(15);

            return (
              <motion.div
                key={category.title}
                ref={tilt.ref}
                initial={{ opacity: 0, rotateY: -90, z: -200 }}
                whileInView={{ opacity: 1, rotateY: 0, z: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100,
                }}
                onMouseMove={tilt.handleMouseMove}
                onMouseLeave={tilt.handleMouseLeave}
                style={{
                  transform: tilt.transform,
                  transformStyle: "preserve-3d",
                  transition: "transform 0.1s ease-out",
                }}
                className="relative group cursor-pointer"
              >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur-2xl -z-10"
                style={{
                  background: `linear-gradient(135deg, ${category.color.split(' ')[1]}, ${category.color.split(' ')[3]})`
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />

              <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 h-full hover:border-slate-600 transition-all duration-300 relative overflow-hidden shadow-2xl">
                {/* Glassmorphism layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" style={{ transform: "translateZ(10px)" }} />
                <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Animated border glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${category.color.split(' ')[1]}, ${category.color.split(' ')[3]})`,
                    opacity: 0,
                  }}
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.3 }}
                />

                <motion.div
                  className={`bg-gradient-to-r ${category.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 relative`}
                  whileHover={{
                    rotateZ: 360,
                    scale: 1.2,
                  }}
                  transition={{ duration: 0.6, type: "spring" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <category.icon className="w-7 h-7 text-white" />
                </motion.div>

                <h3 className="text-2xl mb-4 text-white">{category.title}</h3>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + i * 0.05 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-gray-300 border border-slate-600/50"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
