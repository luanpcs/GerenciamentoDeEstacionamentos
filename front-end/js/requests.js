function enviarCadastro(nome, modelo, placa, registrado) 
{
    const url = 'http://localhost:3000/cadastro';

    fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
    },
        body: JSON.stringify({ nome, modelo, placa, registrado }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

function atualizarCadastro(id, nome, modelo, placa, registrado) {
    const url = `http://localhost:3000/cadastro/${id}`;
  
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, modelo, placa, registrado }),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }
  

function buscarCadastro() 
{
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
            placa: item.placa,
            registrado: item.registrado
    }));
        return cadastros;
    })
    .catch(error => {
        console.error(error);
        throw error;
    });
}

function deletarCadastro(id) 
{
    const url = `http://localhost:3000/descadastro/${id}`;

    fetch(url, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
    showAlert('Usuário deletado com sucesso!','success');
    setTimeout(function() {location.reload();}, 1500); 
}

function buscarTempoReal() 
{
    const url = 'http://localhost:3000/tempoReal';

    return fetch(url)
    .then(response => {
        if (!response.ok) 
        {
            throw new Error('Erro na requisição');
        }
        return response.json();
    })
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error(error);
        throw error;
    });
}

function postStatus(nome, modelo, placa, timestampEntrada, timestampSaida, vaga, valor) 
{
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

function atualizarRegistroTempoReal(id, nome, modelo, placa, timestampSaida, valor)
{
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
        return data;
    })
    .catch(error => {
        console.error(error);
        throw error;
    });
}

function excluirRegistroTempoReal(id) 
{
    const url = `http://localhost:3000/tempoReal/${id}`;

    return fetch(url, { method: 'DELETE' })
    .then(response => {
        if (!response.ok) {
        throw new Error('Erro na requisição');
    }
        return response.json();
    })
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error(error);
        throw error;
    });
}

function enviarVagas(dadosVagas) 
{
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
        return data;
    })
    .catch(error => {
        console.error(error);
        throw error;
    });
}

function atualizarVagas(id, dadosVagas) 
{
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
        return data;
    })
    .catch(error => {
        console.error(error);
        throw error;
    });
}

function obterTodosVagas() 
{
    const url = 'http://localhost:3000/vagas';

    return fetch(url)
    .then(response => {
        if (!response.ok) {
        throw new Error('Erro na requisição');
    }
        return response.json();
    })
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error(error);
        throw error;
    });
}