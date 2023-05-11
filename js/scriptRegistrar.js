//Entry Class: Represent each entry in the parking lot
class Entry{
    constructor(owner,car,licensePlate,entryDate,exitDate){
        this.owner = owner;
        this.car = car;
        this.licensePlate = licensePlate;
        this.entryDate = entryDate;
        this.exitDate = exitDate;
    }
}

//UI Class: Handle User Interface Tasks
class UI{
    static displayEntries(){
        const entries = Store.getEntries();
        entries.forEach((entry) => UI.addEntryToTable(entry));
    }
    // static addEntryToTable(entry){

    //     const tableBody=document.querySelector('#tableBody');
    //     const row = document.createElement('tr');
    //     row.innerHTML = `   <td>${entry.owner}</td>
    //                         <td>${entry.car}</td>
    //                         <td>${entry.licensePlate}</td>
    //                         <td>${1}</td>
    //                         <td><button type="button" class="btn btn-success in">Registrar entrada</button>
    //                         <button type="button" class="btn btn-danger out">Registrar saída</button></td>
    //                         <td>${0}</td>
    //                     `;
    //     tableBody.appendChild(row);
    // }

    static clearInput(){
        //Selects all the inputs
        const inputs = document.querySelectorAll('.form-control');
        //Clear the content of each input
        inputs.forEach((input)=>input.value="");
    }
    static deleteEntry(target){
        console.log(target)
        if(target.classList.contains('in')){
            target.parentElement.parentElement.remove();
        }
    }
    static showAlert(message,className){
        const div = document.createElement('div');
        div.className=`alert alert-${className} w-50 mx-auto`;
        div.appendChild(document.createTextNode(message));
        const formContainer = document.querySelector('.form-container');
        const form = document.querySelector('#entryForm');
        formContainer.insertBefore(div,form);
        setTimeout(() => document.querySelector('.alert').remove(),3000);
    }
    static validateInputs(){
        const owner = document.querySelector('#owner').value;
        const car = document.querySelector('#car').value;
        const licensePlate = document.querySelector('#licensePlate').value;
      //  const entryDate = document.querySelector('#entryDate').value;
     //   const exitDate = document.querySelector('#exitDate').value;
        if(owner === '' || car === '' || licensePlate === ''){
            UI.showAlert('Preencha todos os dados!','danger');
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
class Store{
    static getEntries(){
        let entries;
        if(localStorage.getItem('entries') === null){
            entries = [];
        }
        else{
            entries = JSON.parse(localStorage.getItem('entries'));
        }
        return entries;
    }
    static addEntries(entry){
        const entries = Store.getEntries();
        entries.push(entry);
        localStorage.setItem('entries', JSON.stringify(entries));
    }
    static removeEntries(licensePlate){
        const entries = Store.getEntries();
        entries.forEach((entry,index) => {
            if(entry.licensePlate === licensePlate){
                entries.splice(index, 1);
            }
        });
        localStorage.setItem('entries', JSON.stringify(entries));
    }
}
//Event Display
    document.addEventListener('DOMContentLoaded',UI.displayEntries);
//Event Add
    document.querySelector('#entryForm').addEventListener('submit',(e)=>{
        e.preventDefault();
        
        //Declare Variables
        const owner = document.querySelector('#owner').value;
        const car = document.querySelector('#car').value;
        const licensePlate = document.querySelector('#licensePlate').value;
        if(!UI.validateInputs()){
            return;
        }
        //Instatiate Entry
        const entry = new Entry(owner, car, licensePlate);
        //Add the entry do de UI table
        UI.addEntryToTable(entry);
        Store.addEntries(entry);
        //Delete content of input's
        UI.clearInput();

        UI.showAlert('Car successfully added to the parking lot','success');
    });
//Event Remove
    document.querySelector('#tableBody').addEventListener('click',(e)=>{
        //Call to UI function that removes entry from the table
        console.log(e.target)
        UI.deleteEntry(e.target);
        //Get license plate to use as unique element of an entry
        // var licensePlate = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        //Call to Store function to remove entry from the local storage
        // Store.removeEntries(licensePlate);
        //Show alert that entry was removed
        // UI.showAlert('Car successfully removed from the parking lot list','success');
    })

//Event Search
    document.querySelector('#searchInput').addEventListener('keyup', function searchTable(){
        //Get value of the input search
        const searchValue = document.querySelector('#searchInput').value.toUpperCase();
        //Get all lines of table body
        const tableLine = (document.querySelector('#tableBody')).querySelectorAll('tr');
        //for loop #1 (used to pass all the lines)
        for(let i = 0; i < tableLine.length; i++){
            var count = 0;
            //Get all collumns of each line
            const lineValues = tableLine[i].querySelectorAll('td');
            //for loop #2 (used to pass all the collumns)
            for(let j = 0; j < lineValues.length - 1; j++){
                //Check if any collumn of the line starts with the input search string
                if((lineValues[j].innerHTML.toUpperCase()).startsWith(searchValue)){
                    count++;
                }
            }
            if(count > 0){
                //If any collumn contains the search value the display block
                tableLine[i].style.display = '';
            }else{
                //Else display none 
                tableLine[i].style.display = 'none';
            }
        }
    });

function buscarCadastro() {
        const url = 'http://localhost:3000/Getcadastro';
      
        return fetch(url)
          .then(response => {
            if (!response.ok) {
              throw new Error('Erro na requisição');
            }
            return response.json();
          })
          .then(data => {
            const cadastros = data.map(item => ({
                _id: item._id,
              nome: item.nome,
              modelo: item.modelo,
              placa: item.placa
            }));
            console.log(cadastros);
            return cadastros;
          })
          .catch(error => {
            console.error(error);
            throw error;
          });
      }


      function postStatus(nome, modelo, placa, timestampEntrada, timestampSaida, vaga, valor) {
        const url = 'http://localhost:3000/tempoReal';
        return fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({nome, modelo, placa, timestampEntrada, timestampSaida, vaga, valor})
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
      }
      


function displayEntries()
{
    buscarCadastro()
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
      
          var entradaCell = linha.insertCell();
          var entradaBtn = document.createElement("button");
          entradaBtn.innerHTML = "Registrar Entrada";
          entradaBtn.classList.add("btn", "btn-success"); // Adiciona classes do Bootstrap
          entradaBtn.addEventListener("click", criarFuncaoEntrada(dados[i])); // Chama a função criarFuncaoEntrada passando o índice i
          entradaCell.appendChild(entradaBtn);
      
          var saidaCell = linha.insertCell();
          var saidaBtn = document.createElement("button");
          saidaBtn.innerHTML = "Registrar Saída";
          saidaBtn.classList.add("btn", "btn-danger"); // Adiciona classes do Bootstrap
          saidaBtn.addEventListener("click", criarFuncaoSaida(dados[i])); // Chama a função criarFuncaoSaida passando o índice i
          saidaCell.appendChild(saidaBtn);
        }
      }
    )
}

// Função para criar a função de entrada
function criarFuncaoEntrada(dado) {
    return function() {
      var timestamp = Date.now();
      var vagaEscolhida = null
      var dadosVagas = [0,0,0,0,0,0,0,0,0,0,0,0]
      // enviarVagas(dadosVagas)

    obterTodosVagas()
    .then
    (dados => {
        for (let i = 0; i < dados[0].vagas.length; i++) {
            if (dados[0].vagas[i] == 0)
            {
                dados[0].vagas[i] = 1
                vagaEscolhida = i+1
                break
            }
        }
        postStatus(dado.nome, dado.modelo, dado.placa, timestamp, timestamp , vagaEscolhida, 0)
        atualizarVagas(dados[0]._id, dados[0].vagas);
    })

    };
  }
  
  // Função para criar a função de saída
  function criarFuncaoSaida(dado) {
    return function() {
      var timestamp = Date.now();
      var vagaAtual
      var vagasBanco
      buscarTempoReal()
      .then
      (dados =>{

        for (var i = 0; i < dados.length; i++)
        {
          if(dados[i].placa == dado.placa)
          {
            dado._id = dados[i]._id
            vagaAtual = dados[i].vaga
          }
        }
        atualizarRegistroTempoReal(dado._id, dado.nome, dado.modelo, dado.placa, timestamp, 0) 
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
    })
      

    };
  }


  function atualizarRegistroTempoReal(id, nome, modelo, placa, timestampSaida, valor) {
    const url = `http://localhost:3000/tempoReal/${id}`;
  
    const dadosAtualizados = {
      nome,
      modelo,
      placa,
      timestampSaida,
      valor
    };
  
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dadosAtualizados)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na requisição');
        }
        return response.json();
      })
      .then(data => {
        console.log(data.message);
        return data;
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  }

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

  function excluirRegistroTempoReal(id) {
    const url = `http://localhost:3000/tempoReal/${id}`;
  
    return fetch(url, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na requisição');
        }
        return response.json();
      })
      .then(data => {
        console.log(data.message);
        return data;
      })
      .catch(error => {
        console.error(error);
        throw error;
      });
  }


  function enviarVagas(dadosVagas) {
    const url = 'http://localhost:3000/vagas';
  
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ vagas: dadosVagas })
    })
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

  function atualizarVagas(id, dadosVagas) {
    const url = `http://localhost:3000/vagas/${id}`;
  
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ vagas: dadosVagas })
    })
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

  function obterTodosVagas() {
    const url = 'http://localhost:3000/vagas';
  
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