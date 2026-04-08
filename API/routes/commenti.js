// routes/commenti.js — Route per la risorsa Commenti
//
// Endpoint completo: /api/commenti (il prefisso è montato in server.js)

import { Router } from "express";
import { commenti, prossimoId, trovaPerId } from "../data/database.js";

const router = Router();

// ============================================================
// ⭐ GET /api/commenti — Lista tutti i commenti
// ============================================================
router.get("/", (req, res) => {
  res.set("X-Total-Count", commenti.length);
  const postId = parseInt(req.query.postId);
  if (postId) {
    const filtrati = commenti.filter((c) => c.postId === postId);
    return res.json(filtrati);
  }
  res.json(commenti);
});

// ============================================================
// ⭐ GET /api/commenti/:id — Singolo commento
// ============================================================
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const commento = trovaPerId(commenti, id);
  if (!commento)
    return res.status(404).json({ errore: "Commento non trovato" });
  res.json(commento);
});

// ============================================================
// ⭐ POST /api/commenti — Crea un nuovo commento
// ============================================================
router.post("/", (req, res) => {
  const { postId, nome, email, corpo } = req.body;
  if (!postId || !nome || !email || !corpo)
    return res.status(400).json({ errore: "Campi obbligatori mancanti" });
  const nuovocommento = {
    id: prossimoId("commenti"),
    postId,
    nome,
    email,
    corpo,
  };
  commenti.push(nuovocommento);
  res.status(201).json(nuovocommento);
});

// ============================================================
// ⭐ PUT /api/commenti/:id — Sostituisce un commento
// ============================================================
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const indice = commenti.findIndex((c) => c.id === id);
  if (indice === -1)
    return res.status(404).json({ errore: "Commento non trovato" });
  const { postId, nome, email, corpo } = req.body;
  if (!postId || !nome || !email || !corpo)
    return res.status(400).json({ errore: "Campi obbligatori mancanti" });
  commenti[indice] = { id, postId, nome, email, corpo };
  res.json(commenti[indice]);
});

// ============================================================
// ⭐ PATCH /api/commenti/:id — Aggiorna parzialmente
// ============================================================
router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const commento = trovaPerId(commenti, id);
  if (!commento)
    return res.status(404).json({ errore: "Commento non trovato" });
  const { postId, nome, email, corpo } = req.body;
  if (postId !== undefined) commento.postId = postId;
  if (nome !== undefined) commento.nome = nome;
  if (email !== undefined) commento.email = email;
  if (corpo !== undefined) commento.corpo = corpo;
  res.json(commento);
});

// ============================================================
// ⭐ DELETE /api/commenti/:id — Elimina un commento
// ============================================================
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const indice = commenti.findIndex((c) => c.id === id);
  if (indice === -1)
    return res.status(404).json({ errore: "Commento non trovato" });
  const [rimosso] = commenti.splice(indice, 1);
  res.json({ messaggio: "Commento eliminato", commento: rimosso });
});

export default router;
