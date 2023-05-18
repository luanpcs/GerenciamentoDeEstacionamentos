import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv'; dotenv.config();
import routes from './routes.js';

const URI_MONGO = process.env.MONGO_DB
const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(URI_MONGO)
  .then(() => console.log("Conectado ao banco"))
  .catch(err => console.log(err))

app.use(routes);


app.listen(PORT, () => {
  console.log(`Servidor em execução na porta ${PORT}`);
});