import { motion } from "motion/react";
import { ExternalLink, Github, Rocket } from "lucide-react";
import { use3DTilt } from "../hooks/use3DTilt";

const initialProjects = [
  {
    title: "Sistema de Gestión Empresarial",
    description: "Plataforma completa con React, Node.js y PostgreSQL para gestión de inventarios y ventas.",
    tech: ["React", "Node.js", "PostgreSQL", "Express"],
    gradient: "from-blue-600 to-cyan-600",
    githubUrl: "https://github.com/zcrypt83/gestion-empresarial",
    demoUrl: "#",
  },
  {
    title: "API REST Segura",
    description: "API robusta con autenticación JWT, encriptación y mejores prácticas de seguridad.",
    tech: ["Python", "FastAPI", "JWT", "PostgreSQL"],
    gradient: "from-purple-600 to-pink-600",
    githubUrl: "https://github.com/zcrypt83/api-rest-secure",
    demoUrl: "#",
  },
  {
    title: "Dashboard Analítico",
    description: "Panel interactivo con visualización de datos en tiempo real usando Angular y SQL Server.",
    tech: ["Angular", "TypeScript", "SQL Server", "D3.js"],
    gradient: "from-green-600 to-emerald-600",
    githubUrl: "https://github.com/zcrypt83/dashboard-analytics",
    demoUrl: "#",
  },
  {
    title: "Herramienta de Seguridad",
    description: "Scanner de vulnerabilidades y auditoría de seguridad para aplicaciones web.",
    tech: ["Python", "Linux", "Security", "Networking"],
    gradient: "from-red-600 to-orange-600",
    githubUrl: "https://github.com/zcrypt83/security-scanner",
    demoUrl: "#",
  },
  {
    title: "Microservicios en Java",
    description: "Arquitectura de microservicios escalable con Spring Boot y contenedores Docker.",
    tech: ["Java", "Spring Boot", "Docker", "Kubernetes"],
    gradient: "from-yellow-600 to-amber-600",
    githubUrl: "https://github.com/zcrypt83/microservices-java",
    demoUrl: "#",
  },
  {
    title: "App Mobile Full Stack",
    description: "Aplicación móvil con backend Node.js, SQLite local y sincronización en la nube.",
    tech: ["React Native", "Node.js", "SQLite", "REST API"],
    gradient: "from-indigo-600 to-blue-600",
    githubUrl: "https://github.com/zcrypt83/mobile-app-fullstack",
    demoUrl: "#",
  },
];

export function Projects() {
  return (
    <section className="min-h-screen py-20 px-6 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden" style={{ position: "relative" }}>
      {/* 3D Floating geometric shapes with depth */}
      <div className="absolute inset-0 pointer-events-none" style={{ perspective: "1000px" }}>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transformStyle: "preserve-3d",
            }}
            animate={{
              rotateX: [0, 360],
              rotateY: [0, 360],
              rotateZ: [0, 360],
              z: [0, 100, 0],
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div
              className="w-16 h-16 border-2 border-purple-500/30 rounded-lg"
              style={{
                transform: `translateZ(${i * 10}px)`,
                background: `linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))`,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Particle field */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-purple-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-5xl md:text-6xl mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            Proyectos Destacados
          </motion.h2>
          <p className="text-xl text-gray-400">Trabajos recientes y casos de estudio</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initialProjects.map((project, index) => {
            const tilt = use3DTilt(20);

            return (
              <motion.div
                key={project.title}
                ref={tilt.ref}
                initial={{ opacity: 0, y: 100, rotateX: -30 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
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
                className="group relative"
              >
              {/* 3D Glow effect with depth */}
              <motion.div
                className={`absolute -inset-1 bg-gradient-to-r ${project.gradient} rounded-2xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500`}
                style={{ transform: "translateZ(-30px)" }}
              />

              <div
                className="relative bg-slate-900/60 backdrop-blur-2xl border border-slate-800 rounded-2xl p-6 h-full hover:border-slate-700 transition-all duration-300 shadow-2xl"
                style={{ transform: "translateZ(0px)" }}
              >
                {/* Inner glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none" />
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${project.gradient.split(' ')[1].replace('from-', 'rgba(59, 130, 246, 0.1)')}, transparent 70%)`,
                  }}
                />
                {/* Floating Project Icon with 3D effect */}
                <motion.div
                  className={`bg-gradient-to-r ${project.gradient} w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                  whileHover={{
                    rotateY: 180,
                    scale: 1.2,
                  }}
                  transition={{ duration: 0.6 }}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: "translateZ(20px)"
                  }}
                >
                  <Rocket className="w-7 h-7 text-white" />
                </motion.div>

                <h3 className="text-2xl mb-3 text-white">
                  {project.title}
                </h3>

                <p className="text-gray-400 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack with 3D pop effect */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <motion.span
                      key={tech}
                      whileHover={{
                        scale: 1.15,
                        z: 20,
                        rotateZ: 5,
                      }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className="px-3 py-1 bg-slate-800/80 rounded-full text-xs text-gray-300 border border-slate-700/50 cursor-default"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Action Buttons with 3D depth */}
                <div className="flex gap-3">
                  <motion.a
                    href={project.demoUrl}
                    whileHover={{
                      scale: 1.08,
                      z: 30,
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${project.gradient} text-white rounded-lg text-sm hover:shadow-2xl transition-shadow relative`}
                    style={{
                      transformStyle: "preserve-3d",
                      transform: "translateZ(10px)"
                    }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Ver Demo
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      scale: 1.08,
                      z: 30,
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg text-sm border border-slate-700 hover:bg-slate-700 transition-colors relative"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: "translateZ(10px)"
                    }}
                  >
                    <Github className="w-4 h-4" />
                    Código
                  </motion.a>
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
