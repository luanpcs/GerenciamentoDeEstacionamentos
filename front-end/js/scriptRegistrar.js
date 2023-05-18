
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

                if (dados[i].registrado) {
                    entradaBtn.disabled = true
                }
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

                atualizarCadastro(dado._id, dado.nome, dado.modelo, dado.placa, true)
                atualizarVagas(dados[0]._id, dados[0].vagas);
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
        var idCadastro
        var registroEncontrado
        var valor
        buscarTempoReal()
            .then
            (dados => {
                for (var i = 0; i < dados.length; i++) {
                    if (dados[i].placa == dado.placa) {
                        idCadastro = dados[i]._id
                        vagaAtual = dados[i].vaga
                        registroEncontrado = i
                    }
                }
                const tempoUtilizado = (Date.parse(converterTimestamp(timestamp)) - Date.parse(dados[registroEncontrado].timestampEntrada)) / (1000 * 60 * 60)

                if (tempoUtilizado < 1) valor = 5
                else valor = (5 + (Math.ceil(tempoUtilizado - 1) * 2))

                atualizarRegistroTempoReal(idCadastro,
                    dado.nome,
                    dado.modelo,
                    dado.placa,
                    timestamp,
                    valor)
                    
                    
                    obterTodosVagas()
                    .then
                    (vagas => {
                        vagasBanco = vagas[0].vagas
                        vagasBanco[vagaAtual - 1] = 0
                        
                        atualizarVagas(vagas[0]._id, vagasBanco);
                        abrirCobranca(registroEncontrado, dados[registroEncontrado]._id, dado._id)
                    }
                    )
            }
            )
    };
}

window.addEventListener('message', function(event) {
    if (event.data === 'reloadPage') {
        setTimeout(function () { location.reload(); }, 1950);
    }
  });

