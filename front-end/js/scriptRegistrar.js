function carregaCadastros() {
    buscarCadastro()
        .then
        (dados => {
            var tabela = document.getElementById("tabelaDados");

            for (var i = 0; i < dados.length; i++) {
                var linha = tabela.insertRow();

                var nomeCell = linha.insertCell();
                nomeCell.innerHTML = dados[i].nome;

                var modeloCell = linha.insertCell();
                modeloCell.innerHTML = dados[i].modelo;

                var placaCell = linha.insertCell();
                placaCell.innerHTML = dados[i].placa;

                var entradaCell = linha.insertCell();
                var entradaBtn = document.createElement("button");
                entradaBtn.innerHTML = "Registrar Entrada";
                entradaBtn.classList.add("btn", "btn-success");
                entradaBtn.addEventListener("click", registraEntrada(dados[i], entradaBtn));
                entradaCell.appendChild(entradaBtn);

                var saidaCell = linha.insertCell();
                var saidaBtn = document.createElement("button");
                saidaBtn.innerHTML = "Registrar Saída";
                saidaBtn.classList.add("btn", "btn-danger");
                saidaBtn.addEventListener("click", registraSaida(dados[i]));
                saidaCell.appendChild(saidaBtn);
            }
        }
        )
}

function registraEntrada(dado, botao) {
    return function () {
        var timestamp = Date.now();
        var vagaEscolhida = null
        var dadosVagas = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        // enviarVagas(dadosVagas)

        obterTodosVagas()
            .then
            (dados => {
                for (let i = 0; i < dados[0].vagas.length; i++) {
                    if (dados[0].vagas[i] == 0) {
                        dados[0].vagas[i] = 1
                        vagaEscolhida = i + 1
                        break
                    }
                }
                postStatus(dado.nome,
                    dado.modelo,
                    dado.placa,
                    timestamp,
                    timestamp,
                    vagaEscolhida,
                    0)

                atualizarVagas(dados[0]._id, dados[0].vagas);
                console.log(botao)
                botao.disabled = true
            }
            )
    };
}

function registraSaida(dado) {
    return function () {
        var timestamp = Date.now();
        var vagaAtual
        var vagasBanco
        buscarTempoReal()
            .then
            (dados => {
                for (var i = 0; i < dados.length; i++) {
                    if (dados[i].placa == dado.placa) {
                        dado._id = dados[i]._id
                        vagaAtual = dados[i].vaga
                    }
                }
                atualizarRegistroTempoReal(dado._id,
                    dado.nome,
                    dado.modelo,
                    dado.placa,
                    timestamp,
                    0)
                obterTodosVagas()
                    .then
                    (vagas => {
                        vagasBanco = vagas[0].vagas
                        console.log(vagas[0].vagas)
                        vagasBanco[vagaAtual - 1] = 0
                        atualizarVagas(vagas[0]._id, vagasBanco);
                        console.log(vagas)
                    }
                    )
            }
            )
    };
}