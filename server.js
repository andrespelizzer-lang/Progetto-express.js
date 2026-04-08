// server.js — Entry point del Mini JSONPlaceholder
// ✅ Questo file è completo — non dovete modificarlo.

import express from "express";
import routeUtenti from "./routes/utenti.js";
import routePost from "./routes/post.js";
import routeCommenti from "./routes/commenti.js";
import morgan from "morgan";
import cors from "cors";

const app = express();
const PORT = 3000;

// ============================================================
// Middleware globali
// ============================================================

// Parsa automaticamente il body JSON delle richieste
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Mini logger: stampa ogni richiesta nel terminale
app.use((req, res, next) => {
  const ora = new Date().toLocaleTimeString("it-IT");
  console.log(`[${ora}] ${req.method} ${req.url}`);
  next();
});

// ============================================================
// Montaggio delle route
// ============================================================

// Ogni file in routes/ gestisce un gruppo di endpoint.
// app.use("/prefisso", router) dice a Express:
//   "tutte le route definite in questo router partono da /prefisso"
//
// Quindi se in utenti.js definiamo router.get("/", ...)
// l'endpoint completo sarà GET /api/utenti
//
// E se definiamo router.get("/:id", ...)
// l'endpoint completo sarà GET /api/utenti/:id

app.use("/api/utenti", routeUtenti);
app.use("/api/post", routePost);
app.use("/api/commenti", routeCommenti);

// ============================================================
// Route di benvenuto (home page)
// ============================================================

app.get("/", (req, res) => {
  res.json({
    messaggio: "Benvenuto nel Mini JSONPlaceholder! 🚀",
    endpoint: {
      utenti: "/api/utenti",
      post: "/api/post",
      commenti: "/api/commenti",
    },
    suggerimento:
      "Usa Thunder Client o la console del browser per testare le API",
  });
});
// 404 — route non trovata
app.use((req, res) => {
  res.status(404).json({
    errore: "Endpoint non trovato",
    percorso: `${req.method} ${req.path}`,
  });
});

// Gestore errori centralizzato
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(`[ERRORE] ${err.message}`);
  res.status(statusCode).json({
    errore: err.message || "Errore interno del server",
  });
});

// ============================================================
// Avvio del server
// ============================================================

app.listen(PORT, () => {
  console.log("╔══════════════════════════════════════════╗");
  console.log("║   🚀 Mini JSONPlaceholder avviato!       ║");
  console.log(`║   http://localhost:${PORT}                  ║`);
  console.log("╠══════════════════════════════════════════╣");
  console.log("║   Endpoint:                              ║");
  console.log("║   GET /api/utenti                        ║");
  console.log("║   GET /api/post                          ║");
  console.log("║   GET /api/commenti                      ║");
  console.log("╚══════════════════════════════════════════╝");
  console.log("");
});
