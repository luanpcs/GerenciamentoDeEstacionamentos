// importar o mongoose para criar o schema
const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
    ownerName: { type: String, required: true },
    model: { type: String, required: true },
    plateNumber: { type: String, required: true, unique: true },
  });
  
  const Vehicle = mongoose.model('Vehicle', vehicleSchema);
  
  module.exports = Vehicle;