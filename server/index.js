import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "node:fs";
import nodemailer from "nodemailer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sqlite3 from "sqlite3";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbDirectory = path.resolve(__dirname, "data");
const dbPath = path.join(dbDirectory, "portfolio.sqlite");
const port = Number(process.env.PORT ?? 8787);
const leadRecipient = process.env.LEAD_RECIPIENT ?? "zcrypt83@proton.me";

fs.mkdirSync(dbDirectory, { recursive: true });

const db = new sqlite3.Database(dbPath, (error) => {
  if (error) {
    console.error("No se pudo abrir SQLite:", error.message);
  } else {
    console.info(`SQLite listo en: ${dbPath}`);
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS client_leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      company TEXT,
      message TEXT,
      source TEXT,
      created_at TEXT NOT NULL
    )
  `);
});

const runQuery = (query, params = []) =>
  new Promise((resolve, reject) => {
    db.run(query, params, function onQueryExecuted(error) {
      if (error) {
        reject(error);
        return;
      }

      resolve({ lastID: this.lastID, changes: this.changes });
    });
  });

const allQuery = (query, params = []) =>
  new Promise((resolve, reject) => {
    db.all(query, params, (error, rows) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(rows);
    });
  });

const toBoolean = (value, fallbackValue) => {
  if (value === undefined) return fallbackValue;
  return String(value).toLowerCase() === "true";
};

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT ?? 587);
const smtpSecure = toBoolean(process.env.SMTP_SECURE, smtpPort === 465);
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const smtpFrom = process.env.SMTP_FROM ?? smtpUser ?? "no-reply@portfolio.local";

const hasSmtpConfig = Boolean(smtpHost && smtpUser && smtpPass);

const mailTransporter = hasSmtpConfig
  ? nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })
  : null;

const sendLeadNotification = async (lead) => {
  if (!mailTransporter) {
    return { delivered: false, reason: "smtp_not_configured" };
  }

  await mailTransporter.sendMail({
    from: smtpFrom,
    to: leadRecipient,
    replyTo: lead.email,
    subject: `Nuevo contacto: ${lead.name}`,
    text: [
      "Nuevo mensaje de contacto desde el portafolio",
      `Nombre: ${lead.name}`,
      `Email: ${lead.email}`,
      `Telefono: ${lead.phone}`,
      `Empresa: ${lead.company || "No especificada"}`,
      `Origen: ${lead.source}`,
      `Fecha: ${lead.createdAt}`,
      "",
      "Mensaje:",
      lead.message || "(sin mensaje)",
    ].join("\n"),
  });

  return { delivered: true };
};

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json({ limit: "250kb" }));

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "portfolio-backend",
    database: "sqlite",
    emailNotifications: hasSmtpConfig ? "configured" : "missing_smtp_env",
    leadRecipient,
    date: new Date().toISOString(),
  });
});

app.post("/api/clients", async (req, res) => {
  try {
    const rawPayload = req.body ?? {};
    const name = String(rawPayload.name ?? "").trim();
    const email = String(rawPayload.email ?? "").trim().toLowerCase();
    const phone = String(rawPayload.phone ?? "").trim();
    const company = String(rawPayload.company ?? "").trim();
    const message = String(rawPayload.message ?? "").trim();
    const source = String(rawPayload.source ?? "portfolio-contact-form").trim();

    if (!name || !email || !phone) {
      res.status(400).json({
        error: "Los campos nombre, email y telefono son obligatorios.",
      });
      return;
    }

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isEmailValid) {
      res.status(400).json({ error: "El email no tiene un formato valido." });
      return;
    }

    const createdAt = new Date().toISOString();
    const { lastID } = await runQuery(
      `
        INSERT INTO client_leads (name, email, phone, company, message, source, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [name, email, phone, company, message, source, createdAt],
    );
    const emailResult = await sendLeadNotification({
      name,
      email,
      phone,
      company,
      message,
      source,
      createdAt,
    });

    res.status(201).json({
      id: lastID,
      message: "Cliente guardado correctamente.",
      createdAt,
      emailDelivered: emailResult.delivered,
      emailRecipient: leadRecipient,
    });
  } catch (error) {
    console.error("Error guardando cliente:", error);
    res.status(500).json({ error: "No se pudo guardar el cliente." });
  }
});

app.get("/api/clients", async (_req, res) => {
  try {
    const rows = await allQuery(
      `
        SELECT id, name, email, phone, company, message, source, created_at AS createdAt
        FROM client_leads
        ORDER BY id DESC
        LIMIT 100
      `,
    );

    res.json({ total: rows.length, data: rows });
  } catch (error) {
    console.error("Error listando clientes:", error);
    res.status(500).json({ error: "No se pudo listar clientes." });
  }
});

const clientDistPath = path.resolve(__dirname, "..", "dist");
if (process.env.NODE_ENV === "production" && fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get(/^(?!\/api\/).*/, (_req, res) => {
    res.sendFile(path.join(clientDistPath, "index.html"));
  });
}

const server = app.listen(port, () => {
  console.info(`Backend listo en http://localhost:${port}`);
  if (!hasSmtpConfig) {
    console.warn(
      "Aviso: SMTP no configurado. Los mensajes se guardaran en SQLite pero no se enviaran por correo.",
    );
  }
});

const shutdown = () => {
  server.close(() => {
    db.close();
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
