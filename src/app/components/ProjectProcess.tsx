import { motion } from "motion/react";
import {
  ClipboardList,
  Search,
  PenTool,
  Blocks,
  ShieldCheck,
  Rocket,
  Gauge,
} from "lucide-react";

const processSteps = [
  {
    title: "1. Reunion y Objetivos",
    summary: "Entendemos el problema, alcance, plazos y prioridades del negocio.",
    deliverables: "Brief del proyecto + alcance aprobado",
    icon: ClipboardList,
  },
  {
    title: "2. Analisis Funcional",
    summary: "Convertimos necesidades en requisitos claros y medibles.",
    deliverables: "Historias de usuario + criterios de aceptacion",
    icon: Search,
  },
  {
    title: "3. Propuesta UX/UI",
    summary: "Diseñamos el flujo del usuario y estructura visual inicial.",
    deliverables: "Wireframes + propuesta visual",
    icon: PenTool,
  },
  {
    title: "4. Arquitectura Tecnica",
    summary: "Definimos frontend, backend, base de datos, seguridad y despliegue.",
    deliverables: "Diagrama tecnico + backlog de tareas",
    icon: Blocks,
  },
  {
    title: "5. Desarrollo Iterativo",
    summary: "Construimos por sprints con demos frecuentes y feedback continuo.",
    deliverables: "MVP funcional + avances semanales",
    icon: Gauge,
  },
  {
    title: "6. QA y Seguridad",
    summary: "Probamos funcionalidad, rendimiento y validaciones criticas.",
    deliverables: "Checklist QA + correcciones cerradas",
    icon: ShieldCheck,
  },
  {
    title: "7. Produccion y Soporte",
    summary: "Publicamos en entorno real, monitoreamos y optimizamos.",
    deliverables: "Producto en produccion + soporte post-lanzamiento",
    icon: Rocket,
  },
];

export function ProjectProcess() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
            style={{ top: `${10 + i * 12}%`, left: 0, right: 0 }}
            animate={{ opacity: [0.15, 0.5, 0.15] }}
            transition={{ duration: 4, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
            Transparencia del Proceso
          </h2>
          <p className="text-gray-300 mt-4 max-w-3xl mx-auto">
            Asi se desarrolla tu proyecto, paso a paso, desde el analisis inicial hasta el
            lanzamiento en produccion.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {processSteps.map((step, index) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ scale: 1.015, y: -4 }}
              className="rounded-2xl border border-slate-700/70 bg-slate-900/60 backdrop-blur-lg p-6"
            >
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white shrink-0">
                  <step.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg text-white">{step.title}</h3>
                  <p className="text-sm text-gray-300 mt-2">{step.summary}</p>
                  <p className="text-sm text-cyan-300 mt-3">Entregable: {step.deliverables}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
