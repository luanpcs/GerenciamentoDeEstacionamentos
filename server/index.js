/* const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); */


import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// Configuração do servidor Express
const app = express();
app.use(express.json());
app.use(cors());

// Conexão com o MongoDB
const uri = 'mongodb+srv://admin:admin@cluster0.nve9cqv.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(uri)
.then(() => console.log("Conectado ao banco de dados"))
.catch(err => console.log(err))

// Definição do modelo de dados
const Schema = mongoose.Schema;
const ModeloCadastro = new mongoose.Schema({
  nome: { type: String, required: true },
  modelo: { type: String, required: true },
  placa: { type: String, required: true }
});

const ModeloU = new mongoose.Schema({
  nome: { type: String, required: true },
  modelo: { type: String, required: true },
  placa: { type: String, required: true },
  timestampEntrada: { type: Date },
  timestampSaida: { type: Date },
  vaga: {type: Number},
  valor: { type: Number }
});

const ModeloVagas = new mongoose.Schema({
  vagas: { type: Array, required: true, default: new Array(12) }
});



const ModeloEstacionamento = mongoose.model('cadastro', ModeloCadastro);
const ModeloUtilizacao = mongoose.model('status', ModeloU);
const ModeloStatusVagas = mongoose.model('statusVaga', ModeloVagas);


app.post('/tempoReal', async (req, res) => {
  try {
    const { nome, modelo, placa, timestampEntrada, timestampSaida, vaga, valor } = req.body;
    const model = new ModeloUtilizacao({ nome, modelo, placa, timestampEntrada, timestampSaida, vaga, valor });
    await model.save();
    res.status(200).json({ message: 'Dados enviados com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao enviar dados.' });
  }
});

app.put('/tempoReal/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, modelo, placa, timestampSaida, valor } = req.body;
    
    const updatedModel = await ModeloUtilizacao.findByIdAndUpdate(id, { 
      nome, 
      modelo, 
      placa, 
      timestampSaida, 
      valor 
    }, { new: true });
    
    if (!updatedModel) {
      return res.status(404).json({ message: 'Registro não encontrado.' });
    }
    
    res.status(200).json({ message: 'Registro atualizado com sucesso!', data: updatedModel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar registro.' });
  }
});


app.delete('/tempoReal/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await ModeloUtilizacao.findByIdAndDelete(id);
    res.status(200).json({ message: 'Registro excluído com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir o registro.' });
  }
});


app.get('/tempoReal', async (req, res) => {
  try {
    const dados = await ModeloUtilizacao.find();
    res.status(200).json(dados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter os dados de tempo real.' });
  }
});


app.post('/vagas', async (req, res) => {
  try {
    const { vagas } = req.body;
    const model = new ModeloStatusVagas({ vagas });
    await model.save();
    res.status(200).json({ message: 'Dados enviados com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao enviar dados.' });
  }
});

app.put('/vagas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { vagas } = req.body;
    const updatedModel = await ModeloStatusVagas.findByIdAndUpdate(id, { vagas }, { new: true });
    res.status(200).json({ message: 'Dados atualizados com sucesso!', data: updatedModel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar dados.' });
  }
});

app.get('/vagas', async (req, res) => {
  try {
    const models = await ModeloStatusVagas.find();
    res.status(200).json(models);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter dados de vagas.' });
  }
});





// Rota para enviar dados
app.post('/cadastro', async (req, res) => {
  try {
    const { nome, modelo, placa } = req.body;
    const model = new ModeloEstacionamento({nome, modelo, placa });
    await model.save();
    res.status(200).json({ message: 'Dados enviados com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao enviar dados.' });
  }
});

app.get('/Getcadastro', async (req, res) => {
  try {
    const data = await ModeloEstacionamento.find();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar dados.' });
  }
});

app.delete('/descadastro/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await ModeloEstacionamento.findByIdAndDelete(id);
    res.status(200).json({ message: 'Dados excluídos com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir dados.' });
  }
});





// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor em execução na porta ${PORT}`);
});

 export const enviarCadastro = async (nome, modelo, placa) => {
    try {
      const response = await fetch('http://localhost:3000/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, modelo, placa }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    
  };




  
