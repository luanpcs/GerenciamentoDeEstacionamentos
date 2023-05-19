const urlParams = new URLSearchParams(window.location.search);
const i = parseInt(urlParams.get('i'));
var currentIdRealTime = urlParams.get('id1');
var currentIdCadastro = urlParams.get('id2');

var currentDados

function reqCobrancaInfos() {
    buscarTempoReal()
        .then
        (dados => {
            currentDados = dados
            var tabela = document.getElementById("tabelaDados");
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
            saidaCell.innerHTML = formatarTimestamp(dados[i].timestampSaida);

            var valor = linha.insertCell();
            valor.innerHTML = "R$ " + dados[i].valor + ",00";

            document.getElementById("valor").textContent = "Valor total: " + valor.innerHTML;
        }
        )
}

function realizarPagamento() {
    excluirRegistroTempoReal(currentIdRealTime)
    var currentDadosRegistro = currentDados
    
    atualizarCadastro(currentIdCadastro, currentDados.nome, currentDados.modelo, currentDados.placa, false)
    enviarRegistroTotal(currentDadosRegistro[0].nome, currentDadosRegistro[0].modelo, currentDadosRegistro[0].placa, currentDadosRegistro[0].timestampEntrada, 
        currentDadosRegistro[0].timestampSaida, currentDadosRegistro[0].vaga, currentDadosRegistro[0].valor)
    showAlert1('Pagamento efetuado com sucesso!', 'success');
    window.opener.postMessage('reloadPage', '*');
    setTimeout(function () { window.close(); }, 2000);
}
