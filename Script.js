function escolherPersonagem(personagem) {
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");

    let roleText = personagem === "assassino" ? "Você é um Assassino" : "Você é um Detetive";
    let infoText = personagem === "assassino" 
        ? "Seu objetivo é eliminar o alvo sem deixar rastros." 
        : "Seu objetivo é encontrar o culpado antes que ele escape.";

    document.getElementById("role").textContent = roleText;
    document.getElementById("info").textContent = infoText;
}

function iniciarJogo() {
    alert("O jogo começou! (Aqui entraremos com a lógica do jogo)");
}
