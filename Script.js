let tempoRestante;
let intervaloTempo;

async function entrarNoJogo(nome) {
    let resposta = await fetch("http://127.0.0.1:5000/entrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome })
    });

    let dados = await resposta.json();
    document.getElementById("info").textContent = dados.msg;

    if (dados.papel === "assassino") {
        iniciarModoAssassino();
    } else if (dados.papel === "detetive") {
        iniciarModoDetetive();
    }
}

async function enviarMensagem() {
    let nome = document.getElementById("nome").value;
    let mensagem = document.getElementById("mensagem").value;

    await fetch("http://127.0.0.1:5000/enviar_mensagem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, mensagem })
    });

    document.getElementById("mensagem").value = "";
    atualizarChat();
}

async function atualizarChat() {
    let resposta = await fetch("http://127.0.0.1:5000/obter_mensagens");
    let dados = await resposta.json();

    let chatBox = document.getElementById("chat");
    chatBox.innerHTML = dados.mensagens.map(msg => `<p>${msg}</p>`).join("");
}

async function enviarDica() {
    let nome = document.getElementById("nome").value;
    let dica = document.getElementById("dica").value;

    await fetch("http://127.0.0.1:5000/enviar_dica", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, dica })
    });

    document.getElementById("dica").value = "";
}

async function iniciarInvestigacao() {
    let resposta = await fetch("http://127.0.0.1:5000/investigar");
    let dados = await resposta.json();

    let pistasHTML = dados.pistas.map(pista => `<li>${pista}</li>`).join("");
    document.getElementById("pistas-list").innerHTML = pistasHTML;
}

function iniciarTimer(segundos, callback) {
    tempoRestante = segundos;
    atualizarTimer();

    intervaloTempo = setInterval(() => {
        tempoRestante--;
        atualizarTimer();

        if (tempoRestante <= 0) {
            clearInterval(intervaloTempo);
            callback();
        }
    }, 1000);
}

function atualizarTimer() {
    document.getElementById("timer").textContent = `Tempo restante: ${tempoRestante}s`;
}
