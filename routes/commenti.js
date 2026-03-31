// routes/commenti.js — Route per la risorsa Commenti
//
// Endpoint completo: /api/commenti (il prefisso è montato in server.js)
//
// ⭐ Tutte le route sono da implementare.
// Seguite lo stesso pattern dell'esempio in utenti.js e di quello che avete
// già fatto in post.js.
//
// A questo punto dovreste aver preso il ritmo! 💪

import { Router } from "express";
import { commenti, prossimoId, trovaPerId, trovaIndicePerId } from "../data/database.js";

const router = Router();

// ============================================================
// ⭐ TODO — GET /api/commenti — Lista tutti i commenti
// ============================================================
// Deve supportare un filtro opzionale: /api/commenti?postId=4
// Se postId è presente, restituisce solo i commenti di quel post.
// Se non è presente, restituisce tutti i commenti.
//
// Stessa logica del filtro userId nei post.

router.get("/", (req, res) => {
    // TODO: implementa qui
});

// ============================================================
// ⭐ TODO — GET /api/commenti/:id — Singolo commento
// ============================================================

router.get("/:id", (req, res) => {
    // TODO: implementa qui
});

// ============================================================
// ⭐ TODO — POST /api/commenti — Crea un nuovo commento
// ============================================================
// Campi obbligatori nel body: "postId", "nome", "email", "corpo"
//
// Esempio di richiesta:
//   POST http://localhost:3000/api/commenti
//   Body: {
//       "postId": 2,
//       "nome": "Bowser Neri",
//       "email": "bowser@email.com",
//       "corpo": "Anche io voglio imparare Node.js!"
//   }

router.post("/", (req, res) => {
    // TODO: implementa qui
});

// ============================================================
// ⭐ TODO — PUT /api/commenti/:id — Sostituisce un commento
// ============================================================
// Campi obbligatori nel body: "postId", "nome", "email", "corpo"

router.put("/:id", (req, res) => {
    // TODO: implementa qui
});

// ============================================================
// ⭐ TODO — PATCH /api/commenti/:id — Aggiorna parzialmente
// ============================================================
// Accetta uno o più campi: "postId", "nome", "email", "corpo"

router.patch("/:id", (req, res) => {
    // TODO: implementa qui
});

// ============================================================
// ⭐ TODO — DELETE /api/commenti/:id — Elimina un commento
// ============================================================

router.delete("/:id", (req, res) => {
    // TODO: implementa qui
});

export default router;
