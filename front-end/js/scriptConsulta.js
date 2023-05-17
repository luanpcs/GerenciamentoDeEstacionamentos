function carregaRegistros() {
    buscarTempoReal()
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

                var vagaCell = linha.insertCell();
                vagaCell.innerHTML = dados[i].vaga;

                var entradaCell = linha.insertCell();
                entradaCell.innerHTML = formatarTimestamp(dados[i].timestampEntrada);

                var saidaCell = linha.insertCell();
                if (dados[i].timestampEntrada == dados[i].timestampSaida) {
                    saidaCell.innerHTML = "-"
                    markSpaceAsOccupied(dados[i].vaga)
                }
                else {
                    vagaCell.innerHTML = "-"
                    saidaCell.innerHTML = formatarTimestamp(dados[i].timestampSaida);
                }

                const divs = document.getElementsByClassName('parking-space');

                for (let i = 0; i < divs.length; i++) {
                    divs[i].addEventListener('mouseover', function (event) {
                        hoverVaga(event.target.id, true)
                    }
                    );

                    divs[i].addEventListener('mouseout', function (event) {
                        hoverVaga(event.target.id, false)
                    }
                    );
                }
            }
        }
        )
}