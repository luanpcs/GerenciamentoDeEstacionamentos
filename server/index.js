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
const ModeloCadastro = new Schema({
  nome: String,
  modelo: String,
  placa: String,
});

const ModeloEstacionamento = mongoose.model('Cadastro', ModeloCadastro);

// Rota para enviar dados
app.post('/cadastro', async (req, res) => {
  try {
    const { nome, modelo, placa } = req.body;
    const model = new ModeloEstacionamento({ nome, modelo, placa });
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


  
