class Dados {
    constructor(nome, modelo, placa) {
        this.nome = nome;
        this.modelo = modelo;
        this.placa = placa;
    }
}

function formatarTimestamp(timestamp) {
    const data = new Date(timestamp);
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear().toString();
    const hora = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');

    const dataFormatada = `${hora}:${minutos} - ${dia}/${mes}/${ano}`;
    return dataFormatada;
}

function showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className} w-50 mx-auto`;
    div.appendChild(document.createTextNode(message));
    const formContainer = document.querySelector('.title-bold');
    const form = document.querySelector('#entryForm');
    formContainer.insertBefore(div, form);
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

function validateInputs(dados) {
    var regexVerifyPlaca = /^[A-Z]{3}-\d{4}$/;

    if (dados.nome === '' || dados.modelo === '' || dados.placa === '') {
        showAlert('Preencha todos os dados!', 'danger');
        return false;
    }

    else if (regexVerifyPlaca.test(dados.placa) == false) {
        showAlert('Placa inválida!', 'danger');
        return false;
    }

    else {
        return true;
    }
}

function searchTable() {
    var input = document.getElementById("searchInput");
    var filter = input.value.toUpperCase();
    var table = document.getElementById("tabelaDados");
    var rows = table.getElementsByTagName("tr");

    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var rowData = row.getElementsByTagName("td");

        var match = false;
        for (var j = 0; j < rowData.length; j++) {
            var cell = rowData[j];
            if (cell.innerHTML.toUpperCase().indexOf(filter) > -1) {
                match = true;
                break;
            }
        }
        row.style.display = match ? "" : "none";
    }
}

function markSpaceAsOccupied(spaceId) {
    const space = document.getElementById(`space-${spaceId}`);
    space.classList.add('occupied');
}

function hoverVaga(Div, hover) {
    const valorDiv = parseInt(Div.split("-")[1]);
    console.log('Mouse passou por cima da div com ID:', valorDiv);
    const tabela = document.getElementById('tabelaDados');
    const linhas = tabela.getElementsByTagName('tr');

    for (let i = 0; i < linhas.length; i++) {
        const celula = linhas[i].getElementsByTagName('td')[3];
        if (celula.textContent == valorDiv) {
            if (hover) {
                linhas[i].classList.add('destaque');
            }
            else {
                linhas[i].classList.remove('destaque');
            }
        }
    }
}