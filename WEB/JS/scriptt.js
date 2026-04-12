const sezioneut = document.getElementById("lista-utenti");
const btnmostra = document.getElementById("mostra-utenti");
const btnnascondi = document.getElementById("nascondi-utenti");
const btnaggiungi = document.getElementById("btn-agg");
const inputnome = document.getElementById("input-nome");
const inputemail = document.getElementById("input-email");
const inputcitta = document.getElementById("input-citta");
const inputricerca = document.getElementById("input-ricerca");

async function caricaUtenti(citta) {
  let url = "http://localhost:3000/api/utenti";
  if (citta) url += `?citta=${citta}`;

  const risposta = await fetch(url);
  const utenti = await risposta.json();

  sezioneut.innerHTML = "";

  for (const u of utenti) {
    const divut = document.createElement("div");

    const nomeut = document.createElement("h3");
    nomeut.textContent = u.nome;
    const emailut = document.createElement("p");
    emailut.textContent = u.email;
    const cittaut = document.createElement("p");
    cittaut.textContent = u.citta;

    const btnelimina = document.createElement("button");
    btnelimina.textContent = "Elimina";
    btnelimina.addEventListener("click", async () => {
      await fetch(`http://localhost:3000/api/utenti/${u.id}`, {
        method: "DELETE",
      });
      caricaUtenti(inputricerca.value);
    });

    const btnmodifica = document.createElement("button");
    btnmodifica.textContent = "Modifica";
    btnmodifica.addEventListener("click", () => {
      divut.innerHTML = "";

      const inputNome = document.createElement("input");
      inputNome.value = u.nome;
      const inputEmail = document.createElement("input");
      inputEmail.value = u.email;
      const inputCitta = document.createElement("input");
      inputCitta.value = u.citta;

      const btnsalva = document.createElement("button");
      btnsalva.textContent = "Salva";
      btnsalva.addEventListener("click", async () => {
        await fetch(`http://localhost:3000/api/utenti/${u.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: inputNome.value,
            email: inputEmail.value,
            citta: inputCitta.value,
          }),
        });
        caricaUtenti(inputricerca.value);
      });

      divut.append(inputNome);
      divut.append(inputEmail);
      divut.append(inputCitta);
      divut.append(btnsalva);
    });

    divut.append(nomeut);
    divut.append(emailut);
    divut.append(cittaut);
    divut.append(btnelimina);
    divut.append(btnmodifica);
    sezioneut.append(divut);
  }
}

sezioneut.style.display = "none";
btnnascondi.style.display = "none";

btnmostra.addEventListener("click", () => {
  caricaUtenti(inputricerca.value);
  sezioneut.style.display = "block";
  btnmostra.style.display = "none";
  btnnascondi.style.display = "block";
});

btnnascondi.addEventListener("click", () => {
  sezioneut.style.display = "none";
  btnnascondi.style.display = "none";
  btnmostra.style.display = "block";
});

inputricerca.addEventListener("input", () => {
  if (sezioneut.style.display === "block") {
    caricaUtenti(inputricerca.value);
  }
});

btnaggiungi.addEventListener("click", async () => {
  const nome = inputnome.value;
  const email = inputemail.value;
  const citta = inputcitta.value;

  if (!nome || !email || !citta) {
    alert("Inserisci tutti i campi");
    return;
  }

  await fetch("http://localhost:3000/api/utenti", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, citta }),
  });

  caricaUtenti(inputricerca.value);
});
