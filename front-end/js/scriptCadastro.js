document.querySelector('#formulario').addEventListener(
    'submit', (e) => {
    e.preventDefault();
    const nome = document.querySelector('#nome').value;
    const modelo = document.querySelector('#modelo').value;
    const placa = document.querySelector('#placa').value;

    const dados = new Dados(nome, modelo, placa);

    if (validateInputs(dados) == true) {
        enviarCadastro(dados.nome, dados.modelo, dados.placa);
        showAlert('Usuário cadastrado com sucesso!', 'success');
        setTimeout(function () { location.reload(); }, 1500);
    }
}
);

function carregaCadastros() {
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

                var deleteCell = linha.insertCell();

                var deleteButton = document.createElement("button");
                deleteButton.innerHTML = "Excluir";
                deleteButton.classList.add("btn", "btn-danger");
                deleteButton.dataset.id = dados[i]._id;

                deleteButton.addEventListener
                    (
                        "click", function (event) {
                        var cadastroId = event.target.dataset.id;
                        deletarCadastro(cadastroId);
                    }
                    );

                deleteCell.appendChild(deleteButton);

            }
        }
        )
}