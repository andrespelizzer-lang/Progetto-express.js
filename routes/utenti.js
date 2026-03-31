// routes/utenti.js — Route per la risorsa Utenti
//
// Endpoint completo: /api/utenti (il prefisso è montato in server.js)
//
// ✅ GET lista e GET singolo sono già implementati come esempio.
// ⭐ Dovete implementare: POST, PUT, PATCH, DELETE.

import { Router } from "express";
import { utenti, post, prossimoId, trovaPerId } from "../data/database.js";

const router = Router();

// ============================================================
// ✅ ESEMPIO — GET /api/utenti — Lista tutti gli utenti
// ============================================================
router.get("/", (req, res) => {
  res.set("X-Total-Count", utenti.length);
  const { citta } = req.query;
  if (citta) {
    const filtrati = utenti.filter(
      (u) => u.citta.toLowerCase() === citta.toLowerCase(),
    );
    return res.json(filtrati);
  }
  res.json(utenti);
});

// ============================================================
// ✅ ESEMPIO — GET /api/utenti/:id — Singolo utente
// ============================================================
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const utente = trovaPerId(utenti, id);
  if (!utente)
    return res.status(404).json({ errore: `Utente con id ${id} non trovato` });
  res.json(utente);
});

// ============================================================
// ⭐ POST /api/utenti — Crea un nuovo utente
// ============================================================
router.post("/", (req, res) => {
  const { nome, email } = req.body;
  if (!nome || !email)
    return res
      .status(400)
      .json({ errore: "I campi nome ed email sono obbligatori" });
  const nuovoutente = {
    id: prossimoId("utenti"),
    nome,
    email,
    citta: req.body.citta || "",
  };
  utenti.push(nuovoutente);
  res.status(201).json(nuovoutente);
});

// ============================================================
// ⭐ PUT /api/utenti/:id — Sostituisce un utente
// ============================================================
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const indice = utenti.findIndex((u) => u.id === id);
  if (indice === -1)
    return res.status(404).json({ errore: "Utente non trovato" });
  const { nome, email } = req.body;
  if (!nome || !email)
    return res
      .status(400)
      .json({ errore: "Il metodo PUT richiede tutti i campi" });
  utenti[indice] = { id, nome, email, citta: req.body.citta || "" };
  res.json(utenti[indice]);
});

// ============================================================
// ⭐ PATCH /api/utenti/:id — Aggiorna parzialmente
// ============================================================
router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const utente = trovaPerId(utenti, id);
  if (!utente) return res.status(404).json({ errore: "Utente non trovato" });
  const { nome, email, citta } = req.body;
  if (nome !== undefined) utente.nome = nome;
  if (email !== undefined) utente.email = email;
  if (citta !== undefined) utente.citta = citta;
  res.json(utente);
});

// ============================================================
// ⭐ DELETE /api/utenti/:id — Elimina un utente
// ============================================================
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const indice = utenti.findIndex((u) => u.id === id);
  if (indice === -1)
    return res.status(404).json({ errore: "Utente non trovato" });
  const [rimosso] = utenti.splice(indice, 1);
  res.json({ messaggio: "Utente eliminato", utente: rimosso });
});

// ============================================================
// ⭐ BONUS — GET /api/utenti/:id/post — Post di un utente
// ============================================================
router.get("/:id/post", (req, res) => {
  const id = parseInt(req.params.id);
  const utente = trovaPerId(utenti, id);
  if (!utente)
    return res.status(404).json({ errore: `Utente con id ${id} non trovato` });
  const filtrati = post.filter((p) => p.userId === id);
  res.json(filtrati);
});

export default router;
