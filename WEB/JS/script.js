async function caricaUtenti() {
  const risposta = await fetch("http://localhost:3000/api/utenti");
  const utenti = await risposta.json();
  const sezione = document.getElementById("lista-utenti");
  sezione.innerHTML = "";

  document.getElementById("mostra-utenti").style.display = "none";
  document.getElementById("nascondi-utenti").style.display = "block";

  for (const u of utenti) {
    const div = document.createElement("div");
    const nome = document.createElement("h3");
    nome.textContent = u.nome;
    const email = document.createElement("p");
    email.textContent = u.email;
    const citta = document.createElement("p");
    citta.textContent = u.citta;
    const btnelimina = document.createElement("button");

    btnelimina.textContent = "Elimina";
    btnelimina.addEventListener("click", async () => {
      const risposta = await fetch(
        `http://localhost:3000/api/utenti/${u.id}`,

        {
          method: "DELETE",
        },
      );
      caricaUtenti();
    });

    div.appendChild(nome);
    div.appendChild(email);
    div.appendChild(citta);
    div.appendChild(btnelimina);
    sezione.appendChild(div);
  }
}

async function caricaPost() {
  const risposta = await fetch("http://localhost:3000/api/post");
  const post = await risposta.json();
  const sezione = document.getElementById("post");

  for (const p of post) {
    const div = document.createElement("div");

    const titolo = document.createElement("h3");
    titolo.textContent = p.titolo;

    const corpo = document.createElement("p");
    corpo.textContent = p.corpo;

    div.appendChild(titolo);
    div.appendChild(corpo);
    sezione.appendChild(div);
  }
}
caricaPost();

async function caricaCommenti() {
  const risposta = await fetch("http://localhost:3000/api/commenti");
  const commenti = await risposta.json();
  const sezione = document.getElementById("commenti");

  for (const c of commenti) {
    const div = document.createElement("div");

    const nome = document.createElement("h3");
    nome.textContent = c.nome;

    const email = document.createElement("p");
    email.textContent = c.email;

    const corpo = document.createElement("p");
    corpo.textContent = c.corpo;

    div.appendChild(nome);
    div.appendChild(email);
    div.appendChild(corpo);
    sezione.appendChild(div);
  }
}
caricaCommenti();

const aggiungi = document.getElementById("btn-agg");
const inputnome = document.getElementById("input-nome");
const inputemail = document.getElementById("input-email");
const inputcitta = document.getElementById("input-citta");

aggiungi.addEventListener("click", async () => {
  const nome = inputnome.value;
  const email = inputemail.value;
  const citta = inputcitta.value;

  const risposta = await fetch("http://localhost:3000/api/utenti", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, citta }),
  });
  const nuovoUt = await risposta.json();
  console.log(nuovoUt);
  caricaUtenti();
});
const mostrautenti = document.getElementById("mostra-utenti");
mostrautenti.addEventListener("click", () => {
  caricaUtenti();
});
const nascondiutenti = document.getElementById("nascondi-utenti");

nascondiutenti.addEventListener("click", () => {
  document.getElementById("lista-utenti").innerHTML = "";
  document.getElementById("mostra-utenti").style.display = "block";
  document.getElementById("nascondi-utenti").style.display = "none";
});
