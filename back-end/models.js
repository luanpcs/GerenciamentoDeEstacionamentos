import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ModeloCadastro = new mongoose.Schema
    (
        {
            nome: { type: String, required: true },
            modelo: { type: String, required: true },
            placa: { type: String, required: true }
        }
    );

const ModeloStatus = new mongoose.Schema
    (
        {
            nome: { type: String, required: true },
            modelo: { type: String, required: true },
            placa: { type: String, required: true },
            timestampEntrada: { type: Date },
            timestampSaida: { type: Date },
            vaga: { type: Number },
            valor: { type: Number }
        }
    );

const ModeloVagas = new mongoose.Schema
    (
        {
            vagas: { type: Array, required: true, default: new Array(12) }
        }
    );

export const ModeloEstacionamento = mongoose.model('cadastro', ModeloCadastro);
export const ModeloUtilizacao = mongoose.model('status', ModeloStatus);
export const ModeloStatusVagas = mongoose.model('statusVaga', ModeloVagas);