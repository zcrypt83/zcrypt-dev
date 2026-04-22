import { Hero } from "./components/Hero";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { FloatingParticles } from "./components/FloatingParticles";
import { MouseFollower } from "./components/MouseFollower";
import { Floating3DShapes } from "./components/Floating3DShapes";
import { SectionDivider } from "./components/SectionDivider";
import { RippleEffect } from "./components/RippleEffect";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { ScrollProgress } from "./components/ScrollProgress";
import { Starfield } from "./components/Starfield";
import { MagneticParticles } from "./components/MagneticParticles";
import { TrailParticles } from "./components/TrailParticles";
import { DenseParticleField } from "./components/DenseParticleField";
import { Loader3D } from "./components/Loader3D";
import { ProjectProcess } from "./components/ProjectProcess";
import { motion } from "motion/react";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden relative">
      <Loader3D />
      <ScrollProgress />
      <Starfield />
      <DenseParticleField />
      <AnimatedBackground />
      <MouseFollower />
      <TrailParticles />
      <RippleEffect />
      <MagneticParticles />
      <FloatingParticles count={200} />
      <Floating3DShapes />
      <Hero />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <ProjectProcess />
      <SectionDivider />
      <Contact />

      {/* Animated Footer */}
      <footer className="py-8 px-6 bg-slate-950/50 border-t border-slate-800 relative overflow-hidden">
        {/* Footer background animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bottom-0 w-px h-full bg-gradient-to-t from-blue-500/20 to-transparent"
              style={{ left: `${i * 10}%` }}
              animate={{
                scaleY: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              className="text-gray-500"
              whileHover={{ scale: 1.05, color: "#60a5fa" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              © 2026 Desarrollador Full Stack. Todos los derechos reservados.
            </motion.p>

            {/* Animated code symbols */}
            <div className="flex justify-center gap-4 mt-4">
              {['<', '/', '>'].map((symbol, i) => (
                <motion.span
                  key={i}
                  className="text-blue-400/50 text-2xl"
                  animate={{
                    y: [0, -10, 0],
                    rotateZ: [0, 10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                >
                  {symbol}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
