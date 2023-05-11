//Entry Class: Represent each entry in the parking lot
class Entry {
    constructor(owner, car, licensePlate, entryDate, exitDate) {
        this.owner = owner;
        this.car = car;
        this.licensePlate = licensePlate;
        this.entryDate = entryDate;
        this.exitDate = exitDate;
    }
}
//UI Class: Handle User Interface Tasks
class UI {
    static displayEntries() {

        const entries = Store.getEntries();
        entries.forEach((entry) => UI.addEntryToTable(entry));
    }
    static addEntryToTable(entry) {
        const tableBody = document.querySelector('#tableBody');
        const row = document.createElement('tr');
        row.innerHTML = `   <td>${entry.owner}</td>
                            <td>${entry.car}</td>
                            <td>${entry.licensePlate}</td>
                        `;
        tableBody.appendChild(row);
    }
    static clearInput() {
        //Selects all the inputs
        const inputs = document.querySelectorAll('.form-control');
        //Clear the content of each input
        inputs.forEach((input) => input.value = "");
    }
    static deleteEntry(target) {
        if (target.classList.contains('delete')) {
            target.parentElement.parentElement.remove();
        }
    }
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className} w-50 mx-auto`;
        div.appendChild(document.createTextNode(message));
        const formContainer = document.querySelector('.form-container');
        const form = document.querySelector('#entryForm');
        formContainer.insertBefore(div, form);
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
    static validateInputs() {
        const owner = document.querySelector('#owner').value;
        const car = document.querySelector('#car').value;
        const licensePlate = document.querySelector('#licensePlate').value;
        //  const entryDate = document.querySelector('#entryDate').value;
        //   const exitDate = document.querySelector('#exitDate').value;
        if (owner === '' || car === '' || licensePlate === '') {
            UI.showAlert('Preencha todos os dados!', 'danger');
            return false;
        }
        /*        if(exitDate < entryDate){
                    UI.showAlert('A data de entrada precisa ser anterior ou igual a de saída!','danger');
                    return false;
                }
                 if(!licensePlateRegex.test(licensePlate)){
                    UI.showAlert('License Plate must be like NN-NN-LL, NN-LL-NN, LL-NN-NN','danger');
                    return false;
                } */
        return true;
    }
}
//Store Class: Handle Local Storage
class Store {
    static getEntries() {
        let entries;
        if (localStorage.getItem('entries') === null) {
            entries = [];
        }
        else {
            entries = JSON.parse(localStorage.getItem('entries'));
        }
        return entries;
    }
    static addEntries(entry) {
        const entries = Store.getEntries();
        entries.push(entry);
        localStorage.setItem('entries', JSON.stringify(entries));
    }
    static removeEntries(licensePlate) {
        const entries = Store.getEntries();
        entries.forEach((entry, index) => {
            if (entry.licensePlate === licensePlate) {
                entries.splice(index, 1);
            }
        });
        localStorage.setItem('entries', JSON.stringify(entries));
    }
}
//Event Display
document.addEventListener('DOMContentLoaded', UI.displayEntries);
//Event Add
document.querySelector('#entryForm').addEventListener('submit', (e) => {
    e.preventDefault();

    //Declare Variables
    const owner = document.querySelector('#owner').value;
    const car = document.querySelector('#car').value;
    const licensePlate = document.querySelector('#licensePlate').value;
    if (!UI.validateInputs()) {
        return;
    }
    //Instatiate Entry
    const entry = new Entry(owner, car, licensePlate);
    //Add the entry do de UI table
    UI.addEntryToTable(entry);
    Store.addEntries(entry);
    //Delete content of input's
    UI.clearInput();

    UI.showAlert('Car successfully added to the parking lot', 'success');
});
//Event Remove
document.querySelector('#tableBody').addEventListener('click', (e) => {
    //Call to UI function that removes entry from the table
    UI.deleteEntry(e.target);
    //Get license plate to use as unique element of an entry
    var licensePlate = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
    //Call to Store function to remove entry from the local storage
    Store.removeEntries(licensePlate);
    //Show alert that entry was removed
    UI.showAlert('Car successfully removed from the parking lot list', 'success');
})

//Event Search
document.querySelector('#searchInput').addEventListener('keyup', function searchTable() {
    //Get value of the input search
    const searchValue = document.querySelector('#searchInput').value.toUpperCase();
    //Get all lines of table body
    const tableLine = (document.querySelector('#tableBody')).querySelectorAll('tr');
    //for loop #1 (used to pass all the lines)
    for (let i = 0; i < tableLine.length; i++) {
        var count = 0;
        //Get all collumns of each line
        const lineValues = tableLine[i].querySelectorAll('td');
        //for loop #2 (used to pass all the collumns)
        for (let j = 0; j < lineValues.length - 1; j++) {
            //Check if any collumn of the line starts with the input search string
            if ((lineValues[j].innerHTML.toUpperCase()).startsWith(searchValue)) {
                count++;
            }
        }
        if (count > 0) {
            //If any collumn contains the search value the display block
            tableLine[i].style.display = '';
        } else {
            //Else display none 
            tableLine[i].style.display = 'none';
        }
    }
});

function buscarTempoReal() {
    const url = 'http://localhost:3000/tempoReal';

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => {
            console.error(error);
            throw error;
        });
}
function displayEntries() {
    let cadastros
    buscarTempoReal()
        .then
        (dados => {
            // Obtém a referência do elemento da tabela
            var tabela = document.getElementById("tabelaDados");

            // Cria as linhas da tabela com os dados
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

                // Obtém todas as divs com a classe 'minhaDiv'
                const divs = document.getElementsByClassName('parking-space');

                for (let i = 0; i < divs.length; i++) {
                    divs[i].addEventListener('mouseover', function (event) {
                        hoverVaga(event.target.id, true)
                    });

                    divs[i].addEventListener('mouseout', function (event) {
                        hoverVaga(event.target.id, false)
                    });
                }


            }
        }
        )
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

function searchTable() {
    var input = document.getElementById("searchInput");
    var filter = input.value.toUpperCase();
    var table = document.getElementById("tabelaDados");
    var rows = table.getElementsByTagName("tr");

    // Itera sobre as linhas da tabela e mostra ou oculta as linhas com base no valor de pesquisa
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

        // Mostra ou oculta a linha com base na correspondência
        row.style.display = match ? "" : "none";
    }
}

function markSpaceAsOccupied(spaceId) {
    const space = document.getElementById(`space-${spaceId}`);
    space.classList.add('occupied');
}

// Função que será chamada quando o mouse passar por cima de uma div
function hoverVaga(Div, hover) {
    
    const valorDiv = parseInt(Div.split("-")[1]);
    console.log('Mouse passou por cima da div com ID:', valorDiv);
    const tabela = document.getElementById('tabelaDados');
    const linhas = tabela.getElementsByTagName('tr');
    
    // Itera pelas linhas da tabela
    for (let i = 0; i < linhas.length; i++) {
        // Obtém a célula da quarta coluna da linha atual
        const celula = linhas[i].getElementsByTagName('td')[3];
        // Verifica se o texto da célula corresponde ao valor da div
        if (celula.textContent == valorDiv) {
            // Adiciona a classe "destaque" à linha correspondente
            if (hover) {
                linhas[i].classList.add('destaque');
            }
            else{
                linhas[i].classList.remove('destaque');
            }
        }
    }

    
}

