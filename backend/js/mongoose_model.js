// importar o mongoose para criar o schema
const mongoose = require('mongoose')

// criar o schema
const ProjectSchema = new mongoose.Schema({
    item:{
        type:String,
        required: true
    }
})

module.exports = mongoose.model('model', ProjectSchema);