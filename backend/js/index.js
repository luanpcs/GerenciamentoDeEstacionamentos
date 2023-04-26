const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT =  5000
const rotaParkingManagement = require('./routes')
const cors = require('cors')
const uri = `mongodb+srv://user:pass@cluster0.nve9cqv.mongodb.net/?retryWrites=true&w=majority`

// obter os dados no formato json
app.use(express.json())

app.use(cors())

mongoose.connect(uri)
.then(() => console.log("Conectado ao banco de dados"))
.catch(err => console.log(err))

app.use('/', rotaParkingManagement)

// porta para a conexão com o servidor
app.listen(PORT, () => console.log("Conectado ao servidor"))