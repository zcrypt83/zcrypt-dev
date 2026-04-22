import { motion } from "motion/react";
import { Mail, MapPin, Phone, Send, Code2, MessageCircle, Github } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { getJsonCookie, setJsonCookie } from "../utils/cookies";

type ClientFormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
};

type CookieClientSnapshot = Pick<ClientFormData, "name" | "email" | "phone" | "company">;

const COOKIE_KEY = "portfolio_client_snapshot";
const API_BASE = import.meta.env.VITE_API_URL ?? "";
const INITIAL_FORM: ClientFormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

export function Contact() {
  const [formData, setFormData] = useState<ClientFormData>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ kind: "idle" | "success" | "error"; text: string }>({
    kind: "idle",
    text: "",
  });

  useEffect(() => {
    const snapshot = getJsonCookie<CookieClientSnapshot>(COOKIE_KEY);
    if (!snapshot) return;

    setFormData((previous) => ({
      ...previous,
      ...snapshot,
    }));
  }, []);

  const encodedSocialMessage = useMemo(() => {
    const maybeName = formData.name ? `, soy ${formData.name}` : "";
    return encodeURIComponent(
      `Hola${maybeName}. Vi tu portafolio y quiero conversar sobre un proyecto.`,
    );
  }, [formData.name]);

  const socialLinks = [
    {
      label: "WhatsApp",
      href: `https://wa.me/51904572815?text=${encodedSocialMessage}`,
      icon: MessageCircle,
      hoverColor: "hover:text-green-400",
    },
    {
      label: "GitHub",
      href: "https://github.com/zcrypt83",
      icon: Github,
      hoverColor: "hover:text-blue-400",
    },
    {
      label: "Email",
      href: `mailto:zcrypt83@proton.me?subject=Consulta%20desde%20portafolio&body=${encodedSocialMessage}`,
      icon: Mail,
      hoverColor: "hover:text-cyan-400",
    },
  ];

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus({ kind: "idle", text: "" });

    try {
      const response = await fetch(`${API_BASE}/api/clients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          source: "portfolio-contact-form",
        }),
      });

      const body = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        throw new Error(body.error ?? "No se pudo guardar la informacion del cliente.");
      }

      setJsonCookie(
        COOKIE_KEY,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
        },
        60,
      );

      setFormData((previous) => ({
        ...previous,
        message: "",
      }));
      setStatus({
        kind: "success",
        text: "Mensaje enviado correctamente. Gracias por contactarme, te respondere pronto.",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Ocurrio un error guardando los datos.";
      setStatus({ kind: "error", text: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="min-h-screen py-20 px-6 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center relative overflow-hidden"
      style={{ position: "relative" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: 200 + i * 200,
              height: 200 + i * 200,
              border: "2px solid rgba(59, 130, 246, 0.2)",
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 opacity-10">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 w-px bg-gradient-to-b from-blue-400 to-transparent h-full"
            style={{ left: `${i * 7}%` }}
            animate={{ y: ["-100%", "100%"] }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "linear",
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
          <h2 className="text-5xl md:text-6xl mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Contacto
          </h2>
          <p className="text-xl text-gray-400">
            Cuentame tu proyecto y te respondo con una propuesta clara
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl mb-6 text-white">Informacion de Contacto</h3>
              <p className="text-gray-400 mb-8">
                Tu mensaje llega directo a mi correo para darte seguimiento rapido.
              </p>
            </div>

            {[
              { icon: Mail, text: "zcrypt83@proton.me", label: "Email" },
              { icon: Phone, text: "+51 904 572 815", label: "WhatsApp" },
              { icon: MapPin, text: "Peru", label: "Ubicacion" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 10, scale: 1.05, rotateY: 5, z: 20 }}
                style={{ transformStyle: "preserve-3d" }}
                className="flex items-center gap-4 p-4 bg-slate-800/30 backdrop-blur-xl rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-xl pointer-events-none" />
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-12 h-12 rounded-lg flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-500">{item.label}</p>
                  {item.label === "Email" ? (
                    <a
                      href={`mailto:zcrypt83@proton.me?subject=Consulta%20desde%20portafolio&body=${encodedSocialMessage}`}
                      className="text-white hover:text-blue-400 transition-colors break-all"
                    >
                      {item.text}
                    </a>
                  ) : item.label === "WhatsApp" ? (
                    <a
                      href={`https://wa.me/51904572815?text=${encodedSocialMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-green-400 transition-colors"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <p className="text-white">{item.text}</p>
                  )}
                </div>
              </motion.div>
            ))}

            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={social.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  aria-label={social.label}
                  className={`bg-slate-800/40 border border-slate-700 p-3 rounded-full text-white transition-colors ${social.hoverColor}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            <div
              className="relative mt-12 h-40 flex items-center justify-center"
              style={{ perspective: "1000px" }}
            >
              <motion.div
                className="relative w-32 h-32"
                animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="absolute w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-2xl flex items-center justify-center text-white text-xl"
                  style={{ transform: "translateZ(64px)" }}
                >
                  <Code2 className="w-16 h-16" />
                </div>
                <div
                  className="absolute w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-2xl"
                  style={{ transform: "translateZ(-64px) rotateY(180deg)" }}
                />
                <div
                  className="absolute w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-2xl"
                  style={{ transform: "rotateY(90deg) translateZ(64px)" }}
                />
                <div
                  className="absolute w-32 h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-2xl"
                  style={{ transform: "rotateY(-90deg) translateZ(64px)" }}
                />
                <div
                  className="absolute w-32 h-32 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-2xl shadow-2xl"
                  style={{ transform: "rotateX(90deg) translateZ(64px)" }}
                />
                <div
                  className="absolute w-32 h-32 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl shadow-2xl"
                  style={{ transform: "rotateX(-90deg) translateZ(64px)" }}
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm text-gray-400 mb-2" htmlFor="name">
                  Nombre
                </label>
                <motion.input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  whileFocus={{ scale: 1.02, z: 10 }}
                  whileHover={{ scale: 1.01 }}
                  style={{ transformStyle: "preserve-3d" }}
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-slate-800/30 backdrop-blur-xl border border-slate-700 rounded-xl text-white focus:border-blue-500 focus:outline-none focus:shadow-lg focus:shadow-blue-500/20 transition-all duration-300"
                  placeholder="Tu nombre"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2" htmlFor="email">
                    Email
                  </label>
                  <motion.input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    whileFocus={{ scale: 1.02, z: 10 }}
                    whileHover={{ scale: 1.01 }}
                    style={{ transformStyle: "preserve-3d" }}
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-slate-800/30 backdrop-blur-xl border border-slate-700 rounded-xl text-white focus:border-blue-500 focus:outline-none focus:shadow-lg focus:shadow-blue-500/20 transition-all duration-300"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2" htmlFor="phone">
                    Telefono
                  </label>
                  <motion.input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    whileFocus={{ scale: 1.02, z: 10 }}
                    whileHover={{ scale: 1.01 }}
                    style={{ transformStyle: "preserve-3d" }}
                    type="tel"
                    required
                    className="w-full px-4 py-3 bg-slate-800/30 backdrop-blur-xl border border-slate-700 rounded-xl text-white focus:border-blue-500 focus:outline-none focus:shadow-lg focus:shadow-blue-500/20 transition-all duration-300"
                    placeholder="+51 900 000 000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2" htmlFor="company">
                  Empresa (opcional)
                </label>
                <motion.input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  whileFocus={{ scale: 1.02, z: 10 }}
                  whileHover={{ scale: 1.01 }}
                  style={{ transformStyle: "preserve-3d" }}
                  type="text"
                  className="w-full px-4 py-3 bg-slate-800/30 backdrop-blur-xl border border-slate-700 rounded-xl text-white focus:border-blue-500 focus:outline-none focus:shadow-lg focus:shadow-blue-500/20 transition-all duration-300"
                  placeholder="Nombre de tu empresa"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2" htmlFor="message">
                  Mensaje
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  whileFocus={{ scale: 1.02, z: 10 }}
                  whileHover={{ scale: 1.01 }}
                  style={{ transformStyle: "preserve-3d" }}
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-800/30 backdrop-blur-xl border border-slate-700 rounded-xl text-white focus:border-blue-500 focus:outline-none focus:shadow-lg focus:shadow-blue-500/20 transition-all duration-300 resize-none"
                  placeholder="Cuentame sobre tu proyecto..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.08, rotateX: 5, z: 30 }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: "preserve-3d" }}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-2xl hover:shadow-blue-500/50 transition-shadow relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: [-200, 200] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Send className="w-5 h-5 relative z-10" />
                </motion.div>
                <span className="relative z-10">
                  {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                </span>
              </motion.button>

              {status.kind !== "idle" ? (
                <p
                  className={
                    status.kind === "success"
                      ? "text-green-300 text-sm"
                      : "text-red-300 text-sm"
                  }
                >
                  {status.text}
                </p>
              ) : null}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
