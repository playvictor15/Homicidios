from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

# Estado do jogo
jogo = {
    "assassino": None,
    "detetive": None,
    "civis": [],
    "alvo": None,
    "pistas": [],
    "mensagens": [],
    "jogo_iniciado": False
}

pistas_possiveis = {
    "furtivo": ["Pegada suspeita", "Roupa ensanguentada", "Registro de GPS"],
    "brutal": ["Arma do crime", "Testemunha ocular", "Câmeras de segurança"]
}

@app.route("/entrar", methods=["POST"])
def entrar():
    dados = request.json
    if jogo["assassino"] is None:
        jogo["assassino"] = dados["nome"]
        return jsonify({"msg": "Você é o Assassino", "papel": "assassino"})
    elif jogo["detetive"] is None:
        jogo["detetive"] = dados["nome"]
        jogo["jogo_iniciado"] = True
        return jsonify({"msg": "Você é o Detetive", "papel": "detetive"})
    else:
        jogo["civis"].append(dados["nome"])
        return jsonify({"msg": "Você é um Civil. Ajude o Detetive!", "papel": "civil"})

@app.route("/enviar_mensagem", methods=["POST"])
def enviar_mensagem():
    dados = request.json
    jogo["mensagens"].append(f"{dados['nome']}: {dados['mensagem']}")
    return jsonify({"msg": "Mensagem enviada!"})

@app.route("/obter_mensagens", methods=["GET"])
def obter_mensagens():
    return jsonify({"mensagens": jogo["mensagens"]})

@app.route("/enviar_dica", methods=["POST"])
def enviar_dica():
    dados = request.json
    dica = f"Civil {dados['nome']} diz: {dados['dica']}"
    if random.random() > 0.5:
        jogo["pistas"].append(dica)
    return jsonify({"msg": "Dica enviada!"})

@app.route("/matar", methods=["POST"])
def matar():
    if not jogo["jogo_iniciado"]:
        return jsonify({"msg": "Jogo não iniciado!"}), 400

    dados = request.json
    metodo = dados["metodo"]
    jogo["alvo"] = dados["alvo"]
    jogo["pistas"] = random.sample(pistas_possiveis[metodo], 2)
    return jsonify({"msg": "Alvo eliminado. O Detetive está investigando!"})

@app.route("/investigar", methods=["GET"])
def investigar():
    return jsonify({"pistas": jogo["pistas"]})

if __name__ == "__main__":
    app.run(debug=True)
