// routes/post.js — Route per la risorsa Post
//
// Endpoint completo: /api/post (il prefisso è montato in server.js)

import { Router } from "express";
import { post, commenti, prossimoId, trovaPerId } from "../data/database.js";

const router = Router();

// ============================================================
// ⭐ GET /api/post — Lista tutti i post
// ============================================================
router.get("/", (req, res) => {
  res.set("X-Total-Count", post.length);

  const userId = parseInt(req.query.userId);
  const page = parseInt(req.query._page);
  const limit = parseInt(req.query._limit);

  let risultati = post;

  if (userId) {
    risultati = risultati.filter((p) => p.userId === userId);
  }

  if (page && limit) {
    const start = (page - 1) * limit;
    risultati = risultati.slice(start, start + limit);
  }

  res.json(risultati);
});

// ============================================================
// ⭐ GET /api/post/:id — Singolo post
// ============================================================
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const singolo = trovaPerId(post, id);
  if (!singolo) return res.status(404).json({ errore: "Post non trovato" });
  res.json(singolo);
});

// ============================================================
// ⭐ BONUS — GET /api/post/:id/commenti — Commenti di un post
// ============================================================
router.get("/:id/commenti", (req, res) => {
  const id = parseInt(req.params.id);
  const filtrati = commenti.filter((c) => c.postId === id);
  res.json(filtrati);
});

// ============================================================
// ⭐ POST /api/post — Crea un nuovo post
// ============================================================
router.post("/", (req, res) => {
  const { userId, titolo, corpo } = req.body;
  if (!userId || !titolo || !corpo)
    return res.status(400).json({ errore: "Campi obbligatori mancanti" });
  const nuovopost = { id: prossimoId("post"), userId, titolo, corpo };
  post.push(nuovopost);
  res.status(201).json(nuovopost);
});

// ============================================================
// ⭐ PUT /api/post/:id — Sostituisce un post
// ============================================================
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const indice = post.findIndex((p) => p.id === id);
  if (indice === -1)
    return res.status(404).json({ errore: "Post non trovato" });
  const { userId, titolo, corpo } = req.body;
  if (!userId || !titolo || !corpo)
    return res.status(400).json({ errore: "Campi obbligatori mancanti" });
  post[indice] = { id, userId, titolo, corpo };
  res.json(post[indice]);
});

// ============================================================
// ⭐ PATCH /api/post/:id — Aggiorna parzialmente
// ============================================================
router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const singolo = trovaPerId(post, id);
  if (!singolo) return res.status(404).json({ errore: "Post non trovato" });
  const { userId, titolo, corpo } = req.body;
  if (userId !== undefined) singolo.userId = userId;
  if (titolo !== undefined) singolo.titolo = titolo;
  if (corpo !== undefined) singolo.corpo = corpo;
  res.json(singolo);
});

// ============================================================
// ⭐ DELETE /api/post/:id — Elimina un post
// ============================================================
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const indice = post.findIndex((p) => p.id === id);
  if (indice === -1)
    return res.status(404).json({ errore: "Post non trovato" });
  const [rimosso] = post.splice(indice, 1);
  res.json({ messaggio: "Post eliminato", post: rimosso });
});

export default router;
