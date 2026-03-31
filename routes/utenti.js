// routes/utenti.js — Route per la risorsa Utenti
//
// Endpoint completo: /api/utenti (il prefisso è montato in server.js)
//
// ✅ GET lista e GET singolo sono già implementati come esempio.
// ⭐ Dovete implementare: POST, PUT, PATCH, DELETE.

import { Router } from "express";
import {
  utenti,
  prossimoId,
  trovaPerId,
  trovaIndicePerId,
} from "../data/database.js";

const router = Router();

// ============================================================
// ✅ ESEMPIO — GET /api/utenti — Lista tutti gli utenti
// ============================================================
// Questo è un esempio completo di come si scrive una route GET.
// Supporta anche un filtro opzionale per città: /api/utenti?citta=Roma

router.get("/", (req, res) => {
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
// Questo è un esempio completo di come si gestisce un parametro :id.
// Notate il pattern: parseInt → trovaPerId → if (!trovato) return 404 → res.json

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const utente = trovaPerId(utenti, id);

  if (!utente) {
    return res.status(404).json({
      errore: `Utente con id ${id} non trovato`,
    });
  }

  res.json(utente);
});

// ============================================================
// ⭐ TODO — POST /api/utenti — Crea un nuovo utente
// ============================================================
// Campi obbligatori nel body: "nome", "email"
// Campo opzionale: "citta" (default: stringa vuota "")
//
// Cosa deve fare:
//   1. Leggere nome, email, citta da req.body
//   2. Validare che nome e email siano presenti → se no, 400
//   3. Creare il nuovo oggetto utente con prossimoId("utenti")
//   4. Aggiungerlo all'array utenti con .push()
//   5. Rispondere con 201 e il nuovo utente
//
// Esempio di richiesta (Thunder Client):
//   POST http://localhost:3000/api/utenti
//   Body: { "nome": "Yoshi Verde", "email": "yoshi@email.com", "citta": "Isola Yoshi" }
//
// Esempio di risposta attesa (201):
//   { "id": 6, "nome": "Yoshi Verde", "email": "yoshi@email.com", "citta": "Isola Yoshi" }

router.post("/", (req, res) => {
  // TODO: implementa qui
});

// ============================================================
// ⭐ TODO — PUT /api/utenti/:id — Sostituisce un utente
// ============================================================
// Campi obbligatori nel body: "nome", "email"
// Campo opzionale: "citta"
//
// PUT sostituisce TUTTA la risorsa. Se un campo non è nel body,
// viene perso (o messo al default).
//
// Cosa deve fare:
//   1. Leggere l'id dai params e convertirlo in numero
//   2. Trovare l'INDICE dell'utente con trovaIndicePerId → se -1, 404
//   3. Validare che nome e email siano presenti → se no, 400
//   4. Sostituire l'utente nell'array: utenti[indice] = { id, nome, email, citta }
//   5. Rispondere con 200 e l'utente aggiornato
//
// Esempio di richiesta:
//   PUT http://localhost:3000/api/utenti/1
//   Body: { "nome": "Mario Rossi Jr.", "email": "mario.jr@email.com", "citta": "Roma" }

router.put("/:id", (req, res) => {
  // TODO: implementa qui
});

// ============================================================
// ⭐ TODO — PATCH /api/utenti/:id — Aggiorna parzialmente
// ============================================================
// Accetta UNO O PIÙ campi nel body. Aggiorna solo quelli presenti.
//
// Cosa deve fare:
//   1. Leggere l'id dai params e convertirlo in numero
//   2. Trovare l'utente con trovaPerId → se non trovato, 404
//   3. Per ogni campo presente nel body (nome, email, citta),
//      aggiornare SOLO quello sull'oggetto utente
//   4. Rispondere con 200 e l'utente aggiornato
//
// Suggerimento per il punto 3:
//   const { nome, email, citta } = req.body;
//   if (nome !== undefined) utente.nome = nome;
//   if (email !== undefined) utente.email = email;
//   if (citta !== undefined) utente.citta = citta;
//
// Esempio di richiesta:
//   PATCH http://localhost:3000/api/utenti/1
//   Body: { "email": "mario.nuovo@email.com" }
//   → Cambia solo l'email, nome e città restano invariati

router.patch("/:id", (req, res) => {
  // TODO: implementa qui
});

// ============================================================
// ⭐ TODO — DELETE /api/utenti/:id — Elimina un utente
// ============================================================
// Cosa deve fare:
//   1. Leggere l'id dai params e convertirlo in numero
//   2. Trovare l'INDICE dell'utente con trovaIndicePerId → se -1, 404
//   3. Rimuovere l'utente dall'array con .splice(indice, 1)
//   4. Rispondere con 200 e un messaggio + l'utente eliminato
//
// Suggerimento: .splice() restituisce un array con gli elementi rimossi:
//   const [rimosso] = utenti.splice(indice, 1);
//
// Esempio di risposta attesa:
//   { "messaggio": "Utente eliminato", "utente": { "id": 1, "nome": "Mario Rossi", ... } }

router.delete("/:id", (req, res) => {
  // TODO: implementa qui
});

export default router;
